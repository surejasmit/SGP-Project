import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import LabCard from '../components/LabCard'

// Lab Selection Page - displays 10 labs as clickable cards
function LabSelection() {
  const navigate = useNavigate()
  const labs = Array.from({ length: 10 }, (_, i) => i + 1)

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header />
      
      <main className="flex-1 px-4 py-6 max-w-5xl mx-auto w-full">
        <div className="text-center mb-6 animate-up delay-1">
          <h1 className="font-serif text-2xl text-secondary mb-1">Digital Classroom</h1>
          <p className="text-text-muted text-sm">Select a lab to manage devices</p>
        </div>

        {/* Grid of 10 lab cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 animate-up delay-2">
          {labs.map((labNum) => (
            <LabCard 
              key={labNum} 
              labNumber={labNum} 
              onClick={() => navigate(`/lab/${labNum}`)} 
            />
          ))}
        </div>

        <button 
          onClick={() => navigate('/')} 
          className="mt-6 mx-auto block text-sm text-text-muted hover:text-primary transition"
        >
          ← Back to Home
        </button>
      </main>

      <Footer />
    </div>
  )
}

export default LabSelection

