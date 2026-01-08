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
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: `Server error: ${res.status}` }))
        setError(errorData.message || `Server error: ${res.status}`)
        return
      }
      
      const data = await res.json()
      if (data.success) {
        navigate('/user-login')
      } else {
        setError(data.message || 'Signup failed')
      }
    } catch (err) {
      console.error('Signup error:', err)
      setError(err.message === 'Failed to fetch' 
        ? 'Cannot connect to server. Make sure the backend is running on port 5000.' 
        : 'Server error: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-dark-light to-dark-lighter flex items-center justify-center p-4">
      <div className="bg-dark-lighter rounded-2xl shadow-2xl p-10 w-full max-w-lg animate-up delay-1 border border-dark-lighter/50">
        <div className="text-center mb-10">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-4xl mb-6 mx-auto shadow-lg animate-float">
            ✨
          </div>
          <h1 className="text-3xl font-bold text-text-light mb-4 leading-tight">User Signup</h1>
          <p className="text-text-muted-light text-base leading-relaxed">Create your account to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-4 text-red-300 text-sm text-center leading-relaxed">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-text-light mb-3 text-left">Full Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-dark border border-dark-lighter rounded-lg px-5 py-3.5 text-base text-text-light placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              placeholder="Enter your full name"
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-light mb-3 text-left">Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-dark border border-dark-lighter rounded-lg px-5 py-3.5 text-base text-text-light placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              placeholder="Enter your email"
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-light mb-3 text-left">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-dark border border-dark-lighter rounded-lg px-5 py-3.5 text-base text-text-light placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              placeholder="Create a password"
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-light mb-3 text-left">Confirm Password</label>
            <input 
              type="password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-dark border border-dark-lighter rounded-lg px-5 py-3.5 text-base text-text-light placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              placeholder="Confirm your password"
              required 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg py-4 text-base font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          >
            {loading ? 'Creating...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-sm text-text-muted-light mt-8 leading-relaxed">
          Have an account? <Link to="/user-login" className="text-primary font-semibold hover:underline">Login</Link>
        </p>

        <button 
          onClick={() => navigate('/')} 
          className="w-full mt-4 border border-dark-lighter rounded-lg py-3 text-sm text-text-muted-light hover:bg-dark-lighter transition"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  )
}

export default UserSignup

