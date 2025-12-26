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
    <div className="min-h-screen flex flex-col bg-cream">
      <Header isLoggedIn={isLoggedIn} adminName={adminName} onLogout={handleLogout} />
      
      <main className="flex-1 px-4 py-6 max-w-5xl mx-auto w-full">
        <div className="text-center mb-6 animate-up delay-5">
          <h1 className="font-serif text-2xl md:text-3xl text-secondary mb-1">
            Digital Electronics System
          </h1>
          <p className="text-text-muted text-sm">Empowering Education Through Technology</p>
        </div>

        <div className="flex justify-center mb-6 animate-left delay-3">
          <div className="relative max-w-md w-full">
            <img 
              src="/generated-image.png" 
              alt="Digital Electronics" 
              className="w-full rounded-lg shadow-lg border-2 border-accent/30 hover:shadow-xl transition"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/500x300/faf3e8/8b4513?text=Digital+Electronics'
              }}
            />
          </div>
        </div>

        {/* Digital Classroom Button */}
        <div className="text-center mb-6 animate-up delay-3">
          <button
            onClick={() => navigate('/labs')}
            className="bg-primary text-cream px-6 py-3 rounded-lg font-medium text-sm
                       hover:bg-primary-light hover:shadow-lg transition-all duration-300
                       hover:-translate-y-1"
          >
            🔬 Enter Digital Classroom
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-up delay-4">
          {[
            { icon: '⚡', title: 'Circuit Design', desc: 'Digital circuit simulation tools' },
            { icon: '🔧', title: 'Lab Resources', desc: 'Laboratory materials & guides' },
            { icon: '📚', title: 'Study Materials', desc: 'Curated learning resources' }
          ].map((item, i) => (
            <div key={i} className="bg-white border border-accent/20 rounded-lg p-4 text-center shadow hover:shadow-md hover:-translate-y-1 transition">
              <div className="text-2xl mb-2">{item.icon}</div>
              <h3 className="font-serif text-primary text-sm mb-1">{item.title}</h3>
              <p className="text-text-muted text-xs">{item.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default MainPage
