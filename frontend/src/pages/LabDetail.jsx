import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import DeviceItem from '../components/DeviceItem'

// Lab Detail Page - shows grid of devices (lights, fans & computers)
function LabDetail() {
  const { labId } = useParams()
  const navigate = useNavigate()

  // Define devices for this lab
  const lights = [
    { id: 1, type: 'light', name: 'Light 1' },
    { id: 2, type: 'light', name: 'Light 2' },
    { id: 3, type: 'light', name: 'Light 3' },
    { id: 4, type: 'light', name: 'Light 4' },
    { id: 5, type: 'light', name: 'Light 5' },
    { id: 6, type: 'light', name: 'Light 6' },
    { id: 7, type: 'light', name: 'Light 7' },
    { id: 8, type: 'light', name: 'Light 8' },
  ]

  const fans = [
    { id: 9, type: 'fan', name: 'Fan 1' },
    { id: 10, type: 'fan', name: 'Fan 2' },
    { id: 11, type: 'fan', name: 'Fan 3' },
  ]

  const computers = [
    { id: 12, type: 'computer', name: 'PC 1' },
    { id: 13, type: 'computer', name: 'PC 2' },
    { id: 14, type: 'computer', name: 'PC 3' },
    { id: 15, type: 'computer', name: 'PC 4' },
    { id: 16, type: 'computer', name: 'PC 5' },
    { id: 17, type: 'computer', name: 'PC 6' },
    { id: 18, type: 'computer', name: 'PC 7' },
    { id: 19, type: 'computer', name: 'PC 8' },
  ]

  const allDevices = [...lights, ...fans, ...computers]

  // Track state for each device
  const [deviceState, setDeviceState] = useState(
    allDevices.reduce((acc, device) => ({ ...acc, [device.id]: true }), {})
  )

  const toggleDevice = (deviceId) => {
    setDeviceState(prev => ({ ...prev, [deviceId]: !prev[deviceId] }))
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

        <div className="animate-up delay-2">
          <DeviceSection title="Lights" icon="💡" devices={lights} />
          <DeviceSection title="Fans" icon="🌀" devices={fans} />
          <DeviceSection title="Computers" icon="💻" devices={computers} />
        </div>

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
