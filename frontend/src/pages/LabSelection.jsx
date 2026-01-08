import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import LabCard from '../components/LabCard'

// Lab Selection Page - displays labs from backend
function LabSelection() {
  const navigate = useNavigate()
  const [labs, setLabs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('http://localhost:5000/api/labs')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setLabs(data.labs)
        } else {
          setError('Failed to load labs')
        }
      })
      .catch(() => setError('Server error'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-dark">
      <Header />
      
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-12 bg-gradient-to-br from-dark via-dark-light to-dark-lighter">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-up delay-1">
            <h1 className="text-4xl sm:text-5xl font-bold text-text-light mb-6 leading-[1.1] tracking-tight text-spacing">Digital Classroom</h1>
            <p className="text-lg text-text-muted-light leading-relaxed text-spacing px-4">Select a lab to manage devices and resources</p>
          </div>

          {loading && (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-primary smooth-transition"></div>
              <p className="text-text-muted-light mt-6 leading-relaxed text-spacing">Loading labs...</p>
            </div>
          )}
          
          {error && (
            <div className="max-w-md mx-auto bg-red-900/30 border border-red-500/50 rounded-lg p-4 text-red-300 text-center mb-6 leading-relaxed">
              {error}
            </div>
          )}
          
          {!loading && !error && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 animate-up delay-2">
              {labs.map((lab) => (
                <LabCard 
                  key={lab.id} 
                  labNumber={lab.lab_number} 
                  onClick={() => navigate(`/lab/${lab.lab_number}`)} 
                />
              ))}
            </div>
          )}

          <div className="text-center mt-16">
            <button 
              onClick={() => navigate('/')} 
              className="px-8 py-3 border border-dark-lighter rounded-lg text-sm text-text-muted-light hover:bg-dark-lighter hover:shadow-lg hover:scale-105 smooth-transition leading-relaxed text-spacing"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default LabSelection

