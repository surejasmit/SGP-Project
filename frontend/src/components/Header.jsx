import { useNavigate } from 'react-router-dom'

function Header({ isLoggedIn, adminName, onLogout }) {
  const navigate = useNavigate()

  return (
    <header className="bg-secondary text-cream px-4 py-3 shadow-md animate-up delay-1">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer hover:opacity-80" onClick={() => navigate('/')}>
          <span className="text-xl">⚡</span>
          <span className="font-serif text-lg font-bold text-accent">DES</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          {isLoggedIn ? (
            <>
              <span className="bg-primary/20 border border-accent/50 rounded-full px-3 py-1 text-accent text-xs">
                👤 {adminName}
              </span>
              <button onClick={onLogout} className="border border-accent/50 rounded px-3 py-1 text-xs hover:bg-accent hover:text-secondary transition">
                Logout
              </button>
            </>
          ) : (
            <>
              <button onClick={() => navigate('/user-login')} className="border border-accent/50 rounded px-3 py-1 text-xs hover:bg-accent hover:text-secondary transition">
                User Login
              </button>
              <button onClick={() => navigate('/admin-login')} className="bg-primary rounded px-3 py-1 text-xs text-cream hover:bg-primary-light transition">
                Admin Login
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
