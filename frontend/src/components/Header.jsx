import { useNavigate } from 'react-router-dom'

function Header({ isLoggedIn, adminName, onLogout }) {
  const navigate = useNavigate()

  return (
    <header className="bg-dark shadow-lg border-b border-dark-lighter sticky top-0 z-50 backdrop-blur-sm bg-dark/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform">
              DES
            </div>
            <span className="text-xl font-bold text-text-light hidden sm:block">Digital Electronics</span>
          </div>

          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <button 
                  onClick={() => navigate('/admin-dashboard')} 
                  className="px-4 py-2 text-sm font-medium text-text-light hover:text-primary transition-colors"
                >
                  Dashboard
                </button>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-dark-lighter rounded-full">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
                    {adminName.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-text-light hidden sm:block">{adminName}</span>
                </div>
                <button 
                  onClick={onLogout} 
                  className="px-4 py-2 text-sm font-medium text-text-light hover:text-danger transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => navigate('/user-login')} 
                  className="px-4 py-2 text-sm font-medium text-text-light hover:text-primary transition-colors"
                >
                  User Login
                </button>
                <button 
                  onClick={() => navigate('/admin-login')} 
                  className="px-5 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark transition-all shadow-md hover:shadow-lg"
                >
                  Admin Login
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
