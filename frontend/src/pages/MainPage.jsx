import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

function MainPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [adminName, setAdminName] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (token) {
      fetch('http://localhost:5000/api/admin/verify', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setIsLoggedIn(true)
            setAdminName(data.admin.username)
          } else {
            localStorage.removeItem('adminToken')
          }
        })
        .catch(() => localStorage.removeItem('adminToken'))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    setIsLoggedIn(false)
    setAdminName('')
  }

  return (
    <div className="min-h-screen flex flex-col bg-dark" style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#ffffff' }}>
      <Header isLoggedIn={isLoggedIn} adminName={adminName} onLogout={handleLogout} />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-dark via-dark-light to-dark-lighter">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"></div>
          <div className="relative max-w-7xl mx-auto">
            <div className="text-center mb-16 animate-up delay-1">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-text-light mb-8 leading-[1.1]">
                <span className="block mb-4">Digital Electronics</span>
                <span className="block gradient-text">System</span>
              </h1>
              <p className="text-lg sm:text-xl text-text-muted-light max-w-2xl mx-auto leading-relaxed px-4">
                Empowering Education Through Technology - Learn, Practice, and Master Digital Electronics
              </p>
            </div>

            {/* CTA Button */}
            <div className="text-center mb-24 animate-up delay-2">
              <button
                onClick={() => navigate('/labs')}
                className="group relative px-10 py-5 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-110 smooth-transition"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <span>🔬</span>
                  <span>Enter Digital Classroom</span>
                  <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </button>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto animate-up delay-3">
              {[
                { 
                  icon: '⚡', 
                  title: 'Circuit Design', 
                  desc: 'Advanced digital circuit simulation tools and design resources',
                  color: 'from-yellow-400 to-orange-500'
                },
                { 
                  icon: '🔧', 
                  title: 'Lab Resources', 
                  desc: 'Comprehensive laboratory materials, guides, and equipment management',
                  color: 'from-blue-400 to-cyan-500'
                },
                { 
                  icon: '📚', 
                  title: 'Study Materials', 
                  desc: 'Curated learning resources, tutorials, and reference materials',
                  color: 'from-purple-400 to-pink-500'
                }
              ].map((item, i) => (
                <div 
                  key={i} 
                  className="group bg-dark-lighter rounded-2xl p-8 shadow-lg border border-dark-lighter/50 card-hover"
                >
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-3xl mb-6 shadow-md group-hover:scale-125 transition-transform duration-500`}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-text-light mb-4 leading-tight text-spacing">{item.title}</h3>
                  <p className="text-text-muted-light text-sm leading-relaxed text-spacing">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Info Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-light">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-text-light mb-6 leading-tight text-spacing">Why Choose Our Platform?</h2>
              <p className="text-text-muted-light max-w-2xl mx-auto text-lg leading-relaxed text-spacing px-4">
                Experience a modern, intuitive interface designed for seamless learning and management
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default MainPage
