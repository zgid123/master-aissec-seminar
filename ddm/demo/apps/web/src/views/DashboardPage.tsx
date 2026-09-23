import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { Navigate, useNavigate } from '@tanstack/react-router'
import { useState, type FormEvent } from 'react'
import type { ExportEnvironment, Role } from '@demo/shared'
import { downloadUsersExport, fetchUsers } from '../api'
import { clearSession, getSession } from '../auth'
import { DatabaseIcon, DownloadIcon, LockIcon, LogOutIcon, SearchIcon, ShieldIcon } from '../icons'

const pageSizeOptions = [50, 100, 200, 500] as const

const rolePresentation: Record<Role, {
  avatar: string
  pill: string
  title: string
  detail: string
  columnMethods: [string, string, string, string]
}> = {
  manager: {
    avatar: 'M',
    pill: 'MANAGER · DỮ LIỆU GỐC',
    title: 'Policy trả dữ liệu gốc',
    detail: 'Role manager nhận giá trị đầy đủ của các cột được bảo vệ.',
    columnMethods: ['DỮ LIỆU GỐC', 'DỮ LIỆU GỐC', 'DỮ LIỆU GỐC', 'DỮ LIỆU GỐC'],
  },
  bi: {
    avatar: 'B',
    pill: 'BI · DỮ LIỆU ĐÃ BĂM',
    title: 'Hash ổn định cho phân tích dữ liệu',
    detail: 'Các định danh được băm một chiều để BI có thể đếm và join mà không thấy giá trị thật.',
    columnMethods: ['HASH', 'HASH', 'HASH', 'HASH'],
  },
  tester: {
    avatar: 'T',
    pill: 'TESTER · DỮ LIỆU THAY THẾ',
    title: 'Substitution cho môi trường kiểm thử',
    detail: 'Giá trị thật được thay bằng dữ liệu giả đúng định dạng để ứng dụng vẫn hoạt động.',
    columnMethods: ['SUBSTITUTION', 'SUBSTITUTION', 'SUBSTITUTION', 'SUBSTITUTION'],
  },
  support: {
    avatar: 'S',
    pill: 'SUPPORT · DỮ LIỆU ĐÃ CHE',
    title: 'Partial và full masking cho hỗ trợ',
    detail: 'Email chỉ lộ phần cần nhận diện; các trường không cần thiết được che toàn bộ.',
    columnMethods: ['CHE MỘT PHẦN', 'CHE TOÀN BỘ', 'CHE TOÀN BỘ', 'CHE TOÀN BỘ'],
  },
}

export function DashboardPage() {
  const navigate = useNavigate()
  const session = getSession()
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState<(typeof pageSizeOptions)[number]>(50)
  const [search, setSearch] = useState('')
  const [draftSearch, setDraftSearch] = useState('')
  const [exportEnvironment, setExportEnvironment] = useState<ExportEnvironment>('staging')
  const [isExporting, setIsExporting] = useState(false)
  const [exportError, setExportError] = useState('')

  const usersQuery = useQuery({
    queryKey: ['users', session?.role, page, pageSize, search],
    queryFn: () => fetchUsers({ page, pageSize, search }),
    enabled: Boolean(session),
    placeholderData: keepPreviousData,
  })

  if (!session) return <Navigate to="/login" />

  function handleSearch(event: FormEvent) {
    event.preventDefault()
    setPage(1)
    setSearch(draftSearch.trim())
  }

  async function logout() {
    clearSession()
    await navigate({ to: '/login' })
  }

  async function handleExport() {
    setIsExporting(true)
    setExportError('')
    try {
      await downloadUsersExport(exportEnvironment, search)
    } catch (error) {
      setExportError(error instanceof Error ? error.message : 'Không thể export dữ liệu')
    } finally {
      setIsExporting(false)
    }
  }

  const response = usersQuery.data
  const isManager = session.role === 'manager'
  const presentation = rolePresentation[session.role]

  return (
    <main className="dashboard">
      <header className="topbar">
        <div className="brand"><span className="brand-mark"><DatabaseIcon /></span><span>DuckDB <b>Masking Lab</b></span></div>
        <div className="topbar-right">
          <span className={`role-pill ${session.role}`}><span /> {presentation.pill}</span>
          <div className="profile"><span className="avatar">{presentation.avatar}</span><span><b>{session.displayName}</b><small>@{session.username}</small></span></div>
          <button className="icon-button" aria-label="Log out" onClick={logout}><LogOutIcon /></button>
        </div>
      </header>

      <section className="content">
        <div className="page-heading">
          <div>
            <p className="eyebrow"><span /> DUCKDB QUERY TRỰC TIẾP</p>
            <h1>Danh sách khách hàng</h1>
            <p>Một bảng dữ liệu gốc; output thay đổi theo role tại query time.</p>
          </div>
          <div className="row-count"><small>TỔNG SỐ BẢN GHI</small><strong>{(response?.meta.total ?? 1_000_000).toLocaleString()}</strong><span><i /> DuckDB đang hoạt động</span></div>
        </div>

        <div className={`policy-banner ${session.role}`}>
          <span className="policy-icon">{isManager ? <ShieldIcon /> : <LockIcon />}</span>
          <div><b>{presentation.title}</b><p>{presentation.detail}</p></div>
          <code>viewer_role = '{session.role}'</code>
        </div>

        <div className="table-card">
          <div className="table-tools">
            <form className="search-box" onSubmit={handleSearch}><SearchIcon /><input aria-label="Tìm khách hàng" value={draftSearch} onChange={(e) => setDraftSearch(e.target.value)} placeholder="Tìm theo tên…" /><kbd>↵</kbd></form>
            <div className="table-actions">
              {isManager && (
                <div className="export-control">
                  <select aria-label="Export environment" value={exportEnvironment} onChange={(event) => setExportEnvironment(event.target.value as ExportEnvironment)}>
                    <option value="production">PRODUCTION · RAW</option>
                    <option value="staging">STAGING · MASKED</option>
                    <option value="dev">DEV · SUBSTITUTED</option>
                  </select>
                  <button type="button" onClick={handleExport} disabled={isExporting}><DownloadIcon />{isExporting ? 'ĐANG XUẤT…' : 'XUẤT CSV'}</button>
                </div>
              )}
              <div className="query-meta">
                <span>QUERY TIME <b>{response?.meta.queryMs ?? '-'} ms</b></span>
                <label className="page-size-control">
                  SỐ HÀNG
                  <select
                    aria-label="Rows per page"
                    value={pageSize}
                    onChange={(event) => {
                      setPageSize(Number(event.target.value) as (typeof pageSizeOptions)[number])
                      setPage(1)
                    }}
                  >
                    {pageSizeOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                  </select>
                </label>
              </div>
            </div>
          </div>

          {exportError && <p className="export-error">{exportError}</p>}

          <div className="table-wrap">
            <table>
              <thead><tr><th>ID</th><th>KHÁCH HÀNG</th><th>EMAIL<small>{presentation.columnMethods[0]}</small></th><th>ĐIỆN THOẠI<small>{presentation.columnMethods[1]}</small></th><th>ĐỊA CHỈ<small>{presentation.columnMethods[2]}</small></th><th>CCCD<small>{presentation.columnMethods[3]}</small></th><th>NGÀY TẠO</th></tr></thead>
              <tbody>
                {usersQuery.isPending && Array.from({ length: 8 }, (_, index) => <tr className="skeleton-row" key={index}><td colSpan={7}><span /></td></tr>)}
                {usersQuery.isError && <tr><td colSpan={7} className="table-message">{usersQuery.error.message}</td></tr>}
                {response?.data.map((user) => (
                  <tr key={user.id}>
                    <td className="mono">#{String(user.id).padStart(7, '0')}</td>
                    <td><div className="user-cell"><span className="mini-avatar">{user.fullName.charAt(0)}</span><b>{user.fullName}</b></div></td>
                    <td className={isManager ? '' : 'masked'}>{user.email}</td>
                    <td className={`mono ${isManager ? '' : 'masked'}`}>{user.phone}</td>
                    <td className={isManager ? '' : 'masked'}>{user.address}</td>
                    <td className={`mono ${isManager ? '' : 'masked'}`}>{user.nationalId}</td>
                    <td className="mono muted-cell">{user.createdAt}</td>
                  </tr>
                ))}
                {response?.data.length === 0 && <tr><td colSpan={7} className="table-message">Không tìm thấy khách hàng phù hợp.</td></tr>}
              </tbody>
            </table>
          </div>

          <footer className="table-footer">
            <p>Đang hiển thị <b>{response ? (response.meta.page - 1) * pageSize + 1 : 0}–{response ? Math.min(response.meta.page * pageSize, response.meta.total) : 0}</b> trên <b>{response?.meta.total.toLocaleString() ?? '-'}</b></p>
            <div className="pagination">
              <button disabled={page <= 1 || usersQuery.isFetching} onClick={() => setPage((current) => current - 1)}>Trước</button>
              <span>Trang <b>{page}</b> / {response?.meta.totalPages.toLocaleString() ?? '-'}</span>
              <button disabled={!response || page >= response.meta.totalPages || usersQuery.isFetching} onClick={() => setPage((current) => current + 1)}>Sau</button>
            </div>
          </footer>
        </div>
        <p className="security-note"><LockIcon /> Browser chỉ nhận output của policy dành cho role <b>{session.role}</b>; dữ liệu gốc không rời fixed DuckDB query.</p>
      </section>
    </main>
  )
}
