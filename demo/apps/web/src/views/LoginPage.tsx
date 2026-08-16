import { useState, type FormEvent } from 'react'
import { Navigate, useNavigate } from '@tanstack/react-router'
import type { Role } from '@demo/shared'
import { createSession, getSession } from '../auth'
import { ArrowIcon, DatabaseIcon, LockIcon, ShieldIcon } from '../icons'

const personas: Array<{ role: Role; title: string; detail: string }> = [
  { role: 'admin', title: 'Administrator', detail: 'Can view original personal data' },
  { role: 'user', title: 'Standard user', detail: 'Sees policy-masked personal data' },
]

export function LoginPage() {
  const navigate = useNavigate()
  const [selectedRole, setSelectedRole] = useState<Role>('user')
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
      setError(cause instanceof Error ? cause.message : 'Login failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="login-page">
      <section className="login-story">
        <div className="brand"><span className="brand-mark"><DatabaseIcon /></span><span>DuckDB <b>Masking Lab</b></span></div>
        <div className="story-copy">
          <p className="eyebrow"><span /> AISSEC SEMINAR DEMO</p>
          <h1>Same rows.<br/><em>Different truth.</em></h1>
          <p>Explore how application context changes what DuckDB returns—without changing the source data.</p>
          <div className="flow-card">
            <div><span>01</span><b>Authenticate</b><small>Node.js validates identity</small></div>
            <ArrowIcon />
            <div><span>02</span><b>Bind role</b><small>Prepared SQL parameter</small></div>
            <ArrowIcon />
            <div><span>03</span><b>Apply policy</b><small>DuckDB masks output</small></div>
          </div>
        </div>
        <p className="story-foot">Application-enforced dynamic data masking · Built for demonstration</p>
      </section>

      <section className="login-panel">
        <form className="login-card" onSubmit={handleSubmit}>
          <span className="lock-badge"><LockIcon /></span>
          <p className="eyebrow">CHOOSE A DEMO IDENTITY</p>
          <h2>Enter the data room</h2>
          <p className="muted">Switch roles to compare results from the same million-row table.</p>
          <div className="persona-list">
            {personas.map((persona) => (
              <button
                className={`persona ${selectedRole === persona.role ? 'selected' : ''}`}
                key={persona.role}
                onClick={() => setSelectedRole(persona.role)}
                type="button"
              >
                <span className="avatar">{persona.role === 'admin' ? 'A' : 'U'}</span>
                <span><b>{persona.title}</b><small>{persona.detail}</small></span>
                <span className="radio" />
              </button>
            ))}
          </div>
          {error && <p className="form-error">{error}</p>}
          <button className="primary-button" disabled={submitting} type="submit">
            {submitting ? 'Authenticating…' : `Continue as ${selectedRole}`} <ArrowIcon />
          </button>
          <div className="credentials"><ShieldIcon/><span>Demo credentials are filled automatically<br/><code>{selectedRole} / {selectedRole}</code></span></div>
        </form>
      </section>
    </main>
  )
}
