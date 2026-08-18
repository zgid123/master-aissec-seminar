import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { Navigate, useNavigate } from '@tanstack/react-router'
import { useState, type FormEvent } from 'react'
import { fetchUsers } from '../api'
import { clearSession, getSession } from '../auth'
import { DatabaseIcon, LockIcon, LogOutIcon, SearchIcon, ShieldIcon } from '../icons'

const pageSizeOptions = [50, 100, 200, 500] as const

export function DashboardPage() {
  const navigate = useNavigate()
  const session = getSession()
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState<(typeof pageSizeOptions)[number]>(50)
  const [search, setSearch] = useState('')
  const [draftSearch, setDraftSearch] = useState('')

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

  const response = usersQuery.data
  const isAdmin = session.role === 'admin'

  return (
    <main className="dashboard">
      <header className="topbar">
        <div className="brand"><span className="brand-mark"><DatabaseIcon /></span><span>DuckDB <b>Masking Lab</b></span></div>
        <div className="topbar-right">
          <span className={`role-pill ${isAdmin ? 'admin' : ''}`}><span /> {isAdmin ? 'ADMIN ACCESS' : 'MASKED ACCESS'}</span>
          <div className="profile"><span className="avatar">{isAdmin ? 'A' : 'U'}</span><span><b>{session.displayName}</b><small>@{session.username}</small></span></div>
          <button className="icon-button" aria-label="Log out" onClick={logout}><LogOutIcon /></button>
        </div>
      </header>

      <section className="content">
        <div className="page-heading">
          <div>
            <p className="eyebrow"><span /> LIVE DUCKDB QUERY</p>
            <h1>User directory</h1>
            <p>One source table. Role-aware output computed at query time.</p>
          </div>
          <div className="row-count"><small>TOTAL RECORDS</small><strong>{(response?.meta.total ?? 1_000_000).toLocaleString()}</strong><span><i /> DuckDB online</span></div>
        </div>

        <div className={`policy-banner ${isAdmin ? 'admin' : ''}`}>
          <span className="policy-icon">{isAdmin ? <ShieldIcon /> : <LockIcon />}</span>
          <div><b>{isAdmin ? 'Unmasked policy active' : 'Dynamic masking policy active'}</b><p>{isAdmin ? 'Administrator role returns original values for all protected columns.' : 'Email, phone, address and national ID are transformed by DuckDB before leaving the database.'}</p></div>
          <code>viewer_role = '{session.role}'</code>
        </div>

        <div className="table-card">
          <div className="table-tools">
            <form className="search-box" onSubmit={handleSearch}><SearchIcon/><input aria-label="Search users" value={draftSearch} onChange={(e) => setDraftSearch(e.target.value)} placeholder="Search by name…"/><kbd>↵</kbd></form>
            <div className="query-meta">
              <span>QUERY TIME <b>{response?.meta.queryMs ?? '-'} ms</b></span>
              <label className="page-size-control">
                ROWS
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

          <div className="table-wrap">
            <table>
              <thead><tr><th>ID</th><th>USER</th><th>EMAIL</th><th>PHONE</th><th>ADDRESS</th><th>NATIONAL ID</th><th>CREATED</th></tr></thead>
              <tbody>
                {usersQuery.isPending && Array.from({ length: 8 }, (_, index) => <tr className="skeleton-row" key={index}><td colSpan={7}><span /></td></tr>)}
                {usersQuery.isError && <tr><td colSpan={7} className="table-message">{usersQuery.error.message}</td></tr>}
                {response?.data.map((user) => (
                  <tr key={user.id}>
                    <td className="mono">#{String(user.id).padStart(7, '0')}</td>
                    <td><div className="user-cell"><span className="mini-avatar">{user.fullName.charAt(0)}</span><b>{user.fullName}</b></div></td>
                    <td className={isAdmin ? '' : 'masked'}>{user.email}</td>
                    <td className={`mono ${isAdmin ? '' : 'masked'}`}>{user.phone}</td>
                    <td className={isAdmin ? '' : 'masked'}>{user.address}</td>
                    <td className={`mono ${isAdmin ? '' : 'masked'}`}>{user.nationalId}</td>
                    <td className="mono muted-cell">{user.createdAt}</td>
                  </tr>
                ))}
                {response?.data.length === 0 && <tr><td colSpan={7} className="table-message">No users match that search.</td></tr>}
              </tbody>
            </table>
          </div>

          <footer className="table-footer">
            <p>Showing <b>{response ? (response.meta.page - 1) * pageSize + 1 : 0}–{response ? Math.min(response.meta.page * pageSize, response.meta.total) : 0}</b> of <b>{response?.meta.total.toLocaleString() ?? '-'}</b></p>
            <div className="pagination">
              <button disabled={page <= 1 || usersQuery.isFetching} onClick={() => setPage((current) => current - 1)}>Previous</button>
              <span>Page <b>{page}</b> of {response?.meta.totalPages.toLocaleString() ?? '-'}</span>
              <button disabled={!response || page >= response.meta.totalPages || usersQuery.isFetching} onClick={() => setPage((current) => current + 1)}>Next</button>
            </div>
          </footer>
        </div>
        <p className="security-note"><LockIcon /> The browser never receives original protected values for the <b>user</b> role. Masking is applied inside the fixed DuckDB query.</p>
      </section>
    </main>
  )
}
