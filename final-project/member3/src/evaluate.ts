import {FEATURES,profileKey} from './data.ts';
import type {Dataset} from './data.ts';
import {scored,makeScenarios} from './scenarios.ts';
import {windowRates,rocEer,replayAll,macro,pairedBootstrap,wilcoxon,meetsPolicyConstraints} from './metrics.ts';
import {seedFor} from './math.ts';
import type {Bundle,Row} from './types.ts';

export function evaluate(data:Dataset,b:Bundle):{tables:Record<string,Row[]>;report:string} {
  if(b.version!=='1.1')throw new Error('Bundle schema outdated; create a new fit with per-user validation results');
  if(JSON.stringify(data.hashes)!==JSON.stringify(b.inputHashes))throw new Error('Dataset changed after fit; use a new fit/run instead of silently changing test');
  if(JSON.stringify(b.featureColumns)!==JSON.stringify(FEATURES))throw new Error('Bundle feature contract mismatch');
  const tables:Record<string,Row[]>={fixed_windows:[],window_metrics:[],roc:[],scenarios:[],decisions:[],events:[],scenario_results:[],policy_metrics:[],macro_policy_metrics:[],paired_statistics:[],failures:[]};
  const users=Object.keys(b.validationPartition).sort();
  for(const name of b.config.scorers){
    for(const target of users){
      const key=profileKey(name,target),p=b.profiles[key],operating=b.windowThresholds[name];
      const fixed=data.windows.filter(w=>w.split==='test'&&w.window_size===b.config.windowSize).map(w=>{
        const s=scored(w,p,w.participant_id===target?'genuine':'impostor');
        const row:Row={scorer:name,claimed_profile:target,participant_id:w.participant_id,session_id:w.session_id,segment_id:w.segment_id,window_id:w.window_id,data_kind:w.data_kind,split:w.split,window_size:w.window_size,start_ms:w.start_ms,end_ms:w.end_ms,a:s.a,z:s.z,label:s.label,window_threshold:operating.threshold,rejected:s.z>=operating.threshold};
        tables.fixed_windows.push(row);return s;
      });
      const m=windowRates(fixed,operating.threshold),roc=rocEer(fixed);
      tables.window_metrics.push({scorer:name,target,split:'test',threshold:operating.threshold,validation_window_feasible:operating.feasible,...m,eer_descriptive:roc.eer});
      tables.roc.push(...roc.curve.map(r=>({scorer:name,target,...r})));
      const scenarios=makeScenarios(data,p,'test',b.config,b.validationPartition);
      tables.scenarios.push(...scenarios.map(s=>({scorer:name,scenario_id:s.id,target,kind:s.kind,split:s.split,data_kind:b.dataKind,source_sessions:s.sourceSessions.join('|'),source_segments:s.sourceSegments.join('|'),genuine_prefix_id:s.genuinePrefixId,t0_ms:s.t0,horizon_keys:s.horizonKeys,horizon_ms:s.availableHorizonMs,source_horizon_ms:s.sourceHorizonMs,unscored_tail_keys:s.unscoredTailKeys,prefix_keys:s.prefixKeys,suffix_keys:s.suffixKeys,join_down_down_ms:s.joinDownDownMs,window_count:s.windows.length,mixed_windows:s.windows.filter(w=>w.label==='mixed').length,assembly_version:'stroke-prefix-suffix-v1',followup_contract:'last-actual-decision-v2'})));
      for(const [policyId,selection] of Object.entries(b.selections[key])){
        const {results,summary}=replayAll(scenarios,selection.policy,b.config.constraints.policyHorizonKeys),common={scorer:name,target,policy_id:policyId,data_kind:b.dataKind,split:'test'};
        const validation=selection.validationByUser[target];
        if(!validation)throw new Error(`Missing per-user validation for ${key}/${policyId}; refit`);
        const testMeets=meetsPolicyConstraints(summary,b.config.constraints);
        tables.policy_metrics.push({...common,validation_feasible:validation.feasible,validation_selection_feasible:selection.feasible,test_meets_constraints:testMeets,...summary});
        for(const r of results){
          const s=scenarios.find(s=>s.id===r.scenarioId)!;
          tables.decisions.push(...r.logs.map(l=>({...common,...l})));
          tables.events.push(...r.events.map((e,i)=>({...common,...e,event_order:i})));
          const record:Row={...common,scenario_id:r.scenarioId,kind:r.kind,genuine_prefix_id:r.genuinePrefixId,detected:r.detection,detection_evidence:r.detectionEvidence,ttd_keys:r.ttdKeys,ttd_ms:r.ttdMs,censored:r.censored,pre_takeover_revoke:r.preTakeoverRevoke,horizon_keys:r.horizonKeys,horizon_ms:r.observedHorizonMs,planned_horizon_keys:s.horizonKeys,planned_horizon_ms:s.availableHorizonMs,source_suffix_keys:s.suffixKeys,source_horizon_ms:s.sourceHorizonMs,unscored_tail_keys:s.unscoredTailKeys,last_decision_ms:r.lastDecisionMs,stop_reason:r.stopReason,mfa_requests:r.mfaRequests,wrongful_revokes:r.wrongfulRevokes,observed_recording_seconds:r.observedRecordingSeconds,observed_wall_seconds:r.observedWallSeconds};
          tables.scenario_results.push(record);
          if(r.wrongfulRevokes||r.censored||r.preTakeoverRevoke||(r.ttdKeys!==null&&r.ttdKeys>b.config.constraints.maxMedianTtdKeys))tables.failures.push({...record,failure_type:r.preTakeoverRevoke?'pre_takeover_revoke':r.wrongfulRevokes?'wrongful_revoke':r.censored?'not_detected':'late_detection'});
        }
      }
    }
    const policyIds=Object.keys(b.selections[profileKey(name,users[0])]);
    for(const policyId of policyIds){
      const rows=tables.policy_metrics.filter(r=>r.scorer===name&&r.policy_id===policyId);
      tables.macro_policy_metrics.push({scorer:name,policy_id:policyId,users:rows.length,users_with_observed_ttd:rows.filter(r=>r.median_ttd_keys_detected_only!==null).length,validation_feasible_users:rows.filter(r=>r.validation_feasible).length,validation_selection_feasible_all:rows.every(r=>r.validation_selection_feasible),test_feasible_users:rows.filter(r=>r.test_meets_constraints).length,...macro(rows,['detection_rate','far_session_at_L','median_ttd_keys_detected_only','mfa_per_recording_hour','mfa_per_wall_hour']),pre_takeover_revokes:rows.reduce((s,r)=>s+Number(r.pre_takeover_revokes),0),attack_genuine_prefixes:rows.reduce((s,r)=>s+Number(r.attack_genuine_prefixes),0),pre_takeover_revoked_prefixes:rows.reduce((s,r)=>s+Number(r.pre_takeover_revoked_prefixes),0),mfa_requests_total:rows.reduce((s,r)=>s+Number(r.mfa_requests),0),recording_seconds_total:rows.reduce((s,r)=>s+Number(r.recording_seconds),0),wrongful_revokes:rows.reduce((s,r)=>s+Number(r.wrongful_revokes),0),genuine_revokes_without_prior_mfa:rows.reduce((s,r)=>s+Number(r.genuine_revokes_without_prior_mfa),0),delayed_genuine_alert_detections:rows.reduce((s,r)=>s+Number(r.delayed_genuine_alert_detections),0)});
    }
    const differences=users.map(u=>{
      const rows=tables.policy_metrics.filter(r=>r.scorer===name&&r.target===u);
      return Number(rows.find(r=>r.policy_id==='P1')!.mfa_per_recording_hour)-Number(rows.find(r=>r.policy_id==='B1')!.mfa_per_recording_hour);
    });
    const eligible=users.every(u=>['P1','B1'].every(id=>tables.policy_metrics.some(r=>r.scorer===name&&r.target===u&&r.policy_id===id&&r.validation_feasible&&r.validation_selection_feasible&&r.test_meets_constraints)));
    tables.paired_statistics.push({scorer:name,comparison:'P1-B1',metric:'mfa_per_recording_hour',interpretation:eligible?'exploratory_small_sample':'diagnostic_constraints_not_met',constraints_met_all_users:eligible,...pairedBootstrap(differences,seedFor(b.config.seed,name)),...wilcoxon(differences),dependence_note:'attacker_sources_shared_between_targets; conditional_on_current_sources'});
  }
  const lines=['# Kết quả chạy phần 3','',`Nguồn dữ liệu: **${b.dataKind}**. ${b.dataKind==='synthetic'?'Đây là dữ liệu mô phỏng, không phải bằng chứng hiệu quả trên người thật.':'Cần đối chiếu hồ sơ đồng thuận và điều kiện thu trước khi diễn giải.'}`,'',
    'Cấu hình đã được khóa sau fit. Đánh giá test không chọn lại tham số. P1 chỉ cá nhân hóa h1/h2; lambda và k giữ nguyên B1. P2 và ngưỡng theo ngữ cảnh/độ dài phiên chưa triển khai.','',
    '## Kết quả chính','',
    '| Scorer | Chính sách | Đạt validation (người) | Đạt test (người) | Cảnh báo chính sách, macro | TTD phím có điều kiện, macro | MFA/giờ ghi, macro | Thu hồi oan | Cảnh báo từ genuine trễ |',
    '|---|---|---:|---:|---:|---:|---:|---:|---:|'];
  const fmt=(v:unknown)=>v==null?'NA':typeof v==='number'?v.toFixed(3):String(v);
  for(const r of tables.macro_policy_metrics)lines.push(`| ${r.scorer} | ${r.policy_id} | ${r.validation_feasible_users}/${r.users} | ${r.test_feasible_users}/${r.users} | ${fmt(r.detection_rate)} | ${fmt(r.median_ttd_keys_detected_only)} | ${fmt(r.mfa_per_recording_hour)} | ${r.wrongful_revokes} | ${r.delayed_genuine_alert_detections} |`);
  lines.push('','## Thu hồi trước tiếp quản: kịch bản và đoạn nguồn','',
    'Một prefix chính chủ được ghép với nhiều đoạn người lạ. Các số dưới đây là hai đơn vị đếm khác nhau; số prefix không thay thế mẫu số tỷ lệ phát hiện theo kịch bản.','',
    '| Scorer | Chính sách | Kịch bản thu hồi trước N | Prefix bị thu hồi / tổng prefix |',
    '|---|---|---:|---:|');
  for(const r of tables.macro_policy_metrics)lines.push(`| ${r.scorer} | ${r.policy_id} | ${r.pre_takeover_revokes} | ${r.pre_takeover_revoked_prefixes}/${r.attack_genuine_prefixes} |`);
  lines.push('','## Số yêu cầu và thời lượng G0 để đọc so sánh B1/P1','',
    'MFA/giờ dưới đây dùng thời gian recording quan sát của từng tài khoản. Thời lượng có thể ngắn khi bị thu hồi sớm; không suy ra một giờ sử dụng thật từ vài phút mô phỏng. Bảng macro phía trên lấy trung bình tỷ lệ từng người, không lấy tổng số yêu cầu chia tổng thời lượng.','',
    '| Scorer | Tài khoản | Chính sách | Yêu cầu MFA | Phút recording | MFA/giờ | Thu hồi oan | Oan khi chưa có MFA |',
    '|---|---|---|---:|---:|---:|---:|---:|');
  for(const r of tables.policy_metrics.filter(r=>r.policy_id==='B1'||r.policy_id==='P1'))lines.push(`| ${r.scorer} | ${r.target} | ${r.policy_id} | ${r.mfa_requests} | ${fmt(Number(r.recording_seconds)/60)} | ${fmt(r.mfa_per_recording_hour)} | ${r.wrongful_revokes} | ${r.genuine_revokes_without_prior_mfa} |`);
  lines.push('','## Cách đọc kết quả','',
    '- horizon_keys/horizon_ms trong scenario_results là theo dõi thực sự đến quyết định cuối; planned_horizon_* là giới hạn lịch cửa sổ nếu chạy hết; source_suffix_keys/source_horizon_ms là độ dài nguồn. Không dùng đuôi chưa đủ cửa sổ làm mốc kiểm duyệt. Trước N, horizon_keys=0 và horizon_ms để trống.',
    `- Với W=${b.config.windowSize}, prefix=${b.config.attack.prefixKeys}, suffix=${b.config.attack.suffixKeys}, đuôi không đủ cửa sổ có ${(b.config.attack.prefixKeys+b.config.attack.suffixKeys)%b.config.windowSize} phím. Đếm keydown tại thời điểm khả dụng có thể gồm thêm phím chồng; không suy horizon chỉ từ số cửa sổ.`,
    '- TTD theo phím có bước do cửa sổ và vị trí tiếp quản. Không đổi điều kiện median TTD ≤150 thành ≤125: với hai ca 125 và 175 phím, median vẫn bằng 150. Điều kiện đã khóa trong config được giữ nguyên.',
    '- Tài khoản người lạ trong validation và test là cùng nhóm danh tính, khác phiên/ngày. Kết quả chưa chứng minh khái quát cho người lạ chưa tham gia chọn ngưỡng; nguồn tấn công dùng chung còn tạo phụ thuộc giữa các ca.',
    '- Nếu cấu hình không đạt ràng buộc validation, lựa chọn được lưu chỉ để chẩn đoán. Không coi đó là phương án đáp ứng bài toán tối ưu.',
    '- validation_feasible là cờ của từng người ở cấu hình đã chọn; validation_selection_feasible là cờ của toàn lựa chọn (chung nhiều người với B0/B1). Số người đạt validation đếm cờ từng người.',
    '- detected/TTD/detection_rate đo cảnh báo đầu tiên của toàn chính sách sau t0, có thể dẫn tới chặn phiên bằng MFA. Không coi đó là chỉ số phát hiện thuần của scorer. detection_evidence=delayed_genuine_window ghi riêng cảnh báo từ cửa sổ chính chủ hoàn tất trễ; vẫn giữ ca đó trong mẫu số và báo delayed_genuine_alert_detections. mixed/impostor được ghi post_takeover_window, không khẳng định toàn bộ bằng chứng CUSUM đến từ người lạ. Định nghĩa chính thức cho nghiên cứu người thật còn cần Minh thống nhất.',
    '- time_ms là thời điểm quyết định khả dụng theo thứ tự cửa sổ: max(source_end_ms, thời điểm quyết định trước). start_ms/source_end_ms giữ thời gian nguồn; không dùng thời gian chờ để tính lại đặc trưng. SEGMENT_RESET được ghi tại thời điểm xử lý, source_start_ms giữ mốc nguồn.',
    '- Bộ mô phỏng này đã được chạy trong quá trình phát triển phần mềm. Dù các hàm fit không dùng test để tính tham số, lần chạy này là kiểm thử phát triển, không phải nghiên cứu xác nhận trên một holdout chưa từng xem.',
    '- TTD chỉ tính median trên ca phát hiện. Phải đọc cùng tỷ lệ phát hiện, số kiểm duyệt và số thu hồi trước tiếp quản; không suy ra median của toàn bộ ca.',
    '- FAR/FRR/EER nằm trong window_metrics.csv, đo trên tập cửa sổ cố định và ngưỡng chẩn đoán riêng đã chọn bằng validation. Chúng không phải FAR/FRR của máy trạng thái CUSUM.',
    '- far_session_at_L là tỷ lệ tiếp quản chưa phát cảnh báo sau L phím, với L khóa trong config. Đây là định nghĩa vận hành được đề xuất trong phần 3, cần Minh đối chiếu trước nghiên cứu người thật. Báo riêng số ca không đủ theo dõi và thu hồi trước tiếp quản.',
    '- RQ2 chưa được kiểm chứng ở cùng FAR chính sách. So sánh B0/B1 ở đây là mô tả dưới cùng ràng buộc TTD/tỷ lệ phát hiện; không gọi là FAR-matched.',
    '- MFA được giả lập xác định và trả kết quả ngay: chính chủ qua, người lạ trượt. Không có trạng thái MFA_PENDING kéo dài; không đánh giá độ trễ MFA thực.',
    '- Nếu h2 bị vượt, thu hồi ngay cả khi đang cooldown. Báo cả thu hồi oan để tránh đánh giá thuận lợi cho cấu hình kết thúc phiên sớm.',
    '- Các cặp tấn công dùng lại phiên nguồn; không xem từng đoạn/cửa sổ là một người độc lập. Thống kê ghép cặp lấy người đích làm đơn vị, chỉ mang tính thăm dò với bốn hồ sơ mô phỏng.',
    '- Mỗi A1 ghép prefix/suffix ở mức lần gõ và trích lại đặc trưng. Khoảng down–down tại chỗ nối được cố định trong config, cần thử độ nhạy trước khi kết luận.',
    '- Các thông tin nguồn, thời điểm N và nhãn chỉ ở lớp mô phỏng/đánh giá. Bộ tạo điểm và step() không nhận các thông tin này.','',
    '## Các bảng bàn giao','',...Object.keys(tables).map(k=>`- ${k}.csv`),'',
    '## Giới hạn kết luận','',
    'Không tuyên bố xác nhận H1/H2/H3 từ lần chạy này. H1 chỉ có thể xem xét khi các ràng buộc vận hành đạt và độ lệch TTD được đánh giá; H2 còn thiếu định nghĩa FAR chính sách đã thống nhất; H3 chưa triển khai P2. Không dùng ngưỡng EER của test làm ngưỡng vận hành.');
  return {tables,report:lines.join('\n')+'\n'};
}
