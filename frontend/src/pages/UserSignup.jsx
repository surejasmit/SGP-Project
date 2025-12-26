import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function UserSignup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('http://localhost:5000/api/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      })
      const data = await res.json()
      if (data.success) {
        navigate('/user-login')
      } else {
        setError(data.message || 'Signup failed')
      }
    } catch {
      setError('Server error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <div className="bg-white border border-accent/30 rounded-xl p-6 w-full max-w-sm shadow-lg animate-up delay-1">
        <div className="text-center mb-4">
          <div className="text-3xl mb-2">✨</div>
          <h1 className="font-serif text-xl text-secondary">User Signup</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {error && <div className="bg-red-50 border border-red-200 rounded p-2 text-red-600 text-xs text-center">{error}</div>}
          
          <div>
            <label className="block text-xs text-text-muted mb-1">Full Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)}
              className="w-full border border-accent/30 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary" required />
          </div>

          <div>
            <label className="block text-xs text-text-muted mb-1">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-accent/30 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary" required />
          </div>

          <div>
            <label className="block text-xs text-text-muted mb-1">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-accent/30 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary" required />
          </div>

          <div>
            <label className="block text-xs text-text-muted mb-1">Confirm Password</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-accent/30 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary" required />
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-primary text-cream rounded py-2 text-sm font-medium hover:bg-primary-light transition disabled:opacity-50">
            {loading ? 'Creating...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-xs text-text-muted mt-3">
          Have an account? <Link to="/user-login" className="text-primary hover:underline">Login</Link>
        </p>

        <button onClick={() => navigate('/')} className="w-full mt-3 border border-accent/30 rounded py-2 text-xs text-text-muted hover:border-primary transition">
          ← Back to Home
        </button>
      </div>
    </div>
  )
}

export default UserSignup

