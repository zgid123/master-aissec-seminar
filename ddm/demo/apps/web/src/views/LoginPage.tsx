import { useState, type FormEvent } from 'react'
import { Navigate, useNavigate } from '@tanstack/react-router'
import type { Role } from '@demo/shared'
import { createSession, getSession } from '../auth'
import { ArrowIcon, DatabaseIcon, LockIcon, ShieldIcon } from '../icons'

const personas: Array<{ role: Role; title: string; detail: string }> = [
  { role: 'manager', title: 'Quản lý', detail: 'Được xem dữ liệu cá nhân đầy đủ' },
  { role: 'bi', title: 'Phân tích BI', detail: 'Nhận mã băm ổn định để đếm và join' },
  { role: 'tester', title: 'Kiểm thử', detail: 'Nhận dữ liệu giả đúng định dạng' },
  { role: 'support', title: 'Nhân viên hỗ trợ', detail: 'Chỉ thấy một phần dữ liệu cần nhận diện' },
]

const roleInitials: Record<Role, string> = {
  manager: 'M',
  bi: 'B',
  tester: 'T',
  support: 'S',
}

export function LoginPage() {
  const navigate = useNavigate()
  const [selectedRole, setSelectedRole] = useState<Role>('support')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (getSession()) return <Navigate to="/" />

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await createSession({ username: selectedRole, password: selectedRole })
      await navigate({ to: '/' })
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Đăng nhập thất bại')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="login-page">
      <section className="login-story">
        <div className="brand"><span className="brand-mark"><DatabaseIcon /></span><span>DuckDB <b>Masking Lab</b></span></div>
        <div className="story-copy">
          <p className="eyebrow"><span /> DEMO SEMINAR AISSEC</p>
          <h1>Cùng dữ liệu.<br /><em>Khác output.</em></h1>
          <p>Quan sát access context thay đổi kết quả DuckDB mà không sửa dữ liệu gốc.</p>
          <div className="flow-card">
            <div><span>01</span><b>Xác thực</b><small>Node.js kiểm tra identity</small></div>
            <ArrowIcon />
            <div><span>02</span><b>Bind role</b><small>Named SQL parameter</small></div>
            <ArrowIcon />
            <div><span>03</span><b>Áp dụng policy</b><small>DuckDB che output</small></div>
          </div>
        </div>
        <p className="story-foot">Dynamic Data Masking do application thực thi · Chỉ dùng để minh họa</p>
      </section>

      <section className="login-panel">
        <form className="login-card" onSubmit={handleSubmit}>
          <span className="lock-badge"><LockIcon /></span>
          <p className="eyebrow">CHỌN ROLE ĐỂ DEMO</p>
          <h2>Truy cập kho dữ liệu</h2>
          <p className="muted">Đổi role để so sánh output từ cùng bảng một triệu hàng.</p>
          <div className="persona-list">
            {personas.map((persona) => (
              <button
                className={`persona ${selectedRole === persona.role ? 'selected' : ''}`}
                key={persona.role}
                onClick={() => setSelectedRole(persona.role)}
                type="button"
              >
                <span className="avatar">{roleInitials[persona.role]}</span>
                <span><b>{persona.title}</b><small>{persona.detail}</small></span>
                <span className="radio" />
              </button>
            ))}
          </div>
          {error && <p className="form-error">{error}</p>}
          <button className="primary-button" disabled={submitting} type="submit">
            {submitting ? 'Đang xác thực…' : `Tiếp tục với role ${selectedRole}`} <ArrowIcon />
          </button>
          <div className="credentials"><ShieldIcon /><span>Thông tin demo được điền tự động<br /><code>{selectedRole} / {selectedRole}</code></span></div>
        </form>
      </section>
    </main>
  )
}
