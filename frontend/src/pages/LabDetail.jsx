import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import DeviceItem from '../components/DeviceItem'

// Lab Detail Page - shows grid of devices (lights, fans & computers) from backend
function LabDetail() {
  const { labId } = useParams()
  const navigate = useNavigate()
  const [devices, setDevices] = useState({ lights: [], fans: [], computers: [] })
  const [deviceState, setDeviceState] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`http://localhost:5000/api/labs/${labId}/devices/grouped`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setDevices(data.devices)
          // Initialize device states
          const states = {}
          Object.values(data.devices).flat().forEach(device => {
            states[device.id] = device.is_on === 1
          })
          setDeviceState(states)
        } else {
          setError('Failed to load devices')
        }
      })
      .catch(() => setError('Server error'))
      .finally(() => setLoading(false))
  }, [labId])

  const toggleDevice = async (deviceId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/devices/${deviceId}/toggle`, {
        method: 'PATCH'
      })
      const data = await res.json()
      if (data.success) {
        setDeviceState(prev => ({ ...prev, [deviceId]: data.device.is_on === 1 }))
      }
    } catch (err) {
      console.error('Failed to toggle device:', err)
    }
  }

  // Section component
  const DeviceSection = ({ title, icon, devices }) => (
    <div className="mb-8">
      <h2 className="font-serif text-lg text-secondary mb-3 flex items-center gap-2">
        <span>{icon}</span> {title}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {devices.map((device) => (
          <DeviceItem
            key={device.id}
            device={device}
            showBorder={deviceState[device.id]}
            onClick={() => toggleDevice(device.id)}
          />
        ))}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header />
      
      <main className="flex-1 px-4 py-6 max-w-5xl mx-auto w-full">
        <div className="text-center mb-6 animate-up delay-1">
          <h1 className="font-serif text-2xl text-secondary mb-1">Lab {labId}</h1>
          <p className="text-text-muted text-sm">Click a device to toggle ON/OFF</p>
        </div>

        {loading && <div className="text-center text-text-muted">Loading devices...</div>}
        {error && <div className="text-center text-red-600 bg-red-50 border border-red-200 rounded p-2 mb-4">{error}</div>}
        
        {!loading && !error && (
          <div className="animate-up delay-2">
            <DeviceSection title="Lights" icon="💡" devices={devices.lights} />
            <DeviceSection title="Fans" icon="🌀" devices={devices.fans} />
            <DeviceSection title="Computers" icon="💻" devices={devices.computers} />
          </div>
        )}

        <button 
          onClick={() => navigate('/labs')} 
          className="mt-4 mx-auto block text-sm text-text-muted hover:text-primary transition"
        >
          ← Back to Labs
        </button>
      </main>

      <Footer />
    </div>
  )
}

export default LabDetail
