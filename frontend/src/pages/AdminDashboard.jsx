import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

function AdminDashboard() {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [labs, setLabs] = useState([])
  const [allDevices, setAllDevices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [activeTab, setActiveTab] = useState('overview') // 'users', 'labs', 'devices', 'overview'

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      navigate('/admin-login')
      return
    }

    // Verify admin token
    fetch('http://localhost:5000/api/admin/verify', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setIsAdmin(true)
          const token = localStorage.getItem('adminToken')
          
          // Fetch all data in parallel
          Promise.all([
            fetch('http://localhost:5000/api/users', {
              headers: { Authorization: `Bearer ${token}` }
            }).then(r => r.json()),
            fetch('http://localhost:5000/api/labs').then(r => r.json()),
            fetch('http://localhost:5000/api/labs').then(r => r.json())
              .then(labsData => {
                if (labsData.success) {
                  // Fetch devices for all labs
                  return Promise.all(
                    labsData.labs.map(lab =>
                      fetch(`http://localhost:5000/api/labs/${lab.lab_number}/devices`)
                        .then(r => r.json())
                        .then(d => ({ lab, devices: d.success ? d.devices : [] }))
                    )
                  )
                }
                return []
              })
          ])
          .then(([usersData, labsData, devicesData]) => {
            if (usersData.success) setUsers(usersData.users)
            if (labsData.success) setLabs(labsData.labs)
            // Flatten all devices
            const devices = devicesData.flatMap(item => 
              item.devices.map(device => ({ ...device, lab_number: item.lab.lab_number, lab_name: item.lab.name }))
            )
            setAllDevices(devices)
          })
          .catch(() => setError('Failed to load data'))
          .finally(() => setLoading(false))
        } else {
          navigate('/admin-login')
        }
      })
      .catch(() => {
        setError('Server error')
        setLoading(false)
      })
  }, [navigate])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (!isAdmin) {
    return null
  }

  const stats = {
    totalUsers: users.length,
    totalLabs: labs.length,
    totalDevices: allDevices.length,
    devicesOn: allDevices.filter(d => d.is_on === 1).length,
    devicesOff: allDevices.filter(d => d.is_on === 0).length
  }

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header isLoggedIn={true} adminName="Admin" />
      
      <main className="flex-1 px-4 py-6 max-w-6xl mx-auto w-full">
        <div className="text-center mb-6 animate-up delay-1">
          <h1 className="font-serif text-2xl md:text-3xl text-secondary mb-1">
            Admin Dashboard
          </h1>
          <p className="text-text-muted text-sm">View and manage all system data</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto animate-up delay-2">
          {[
            { id: 'overview', label: '📊 Overview', icon: '📊' },
            { id: 'users', label: '👥 Users', icon: '👥' },
            { id: 'labs', label: '🔬 Labs', icon: '🔬' },
            { id: 'devices', label: '⚡ Devices', icon: '⚡' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-primary text-cream'
                  : 'bg-white border border-accent/30 text-text hover:bg-cream-dark'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-4 animate-up delay-2">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-white border border-accent/30 rounded-lg p-4 text-center shadow">
                <div className="text-2xl mb-2">👥</div>
                <div className="text-2xl font-bold text-secondary">{stats.totalUsers}</div>
                <div className="text-xs text-text-muted">Users</div>
              </div>
              <div className="bg-white border border-accent/30 rounded-lg p-4 text-center shadow">
                <div className="text-2xl mb-2">🔬</div>
                <div className="text-2xl font-bold text-secondary">{stats.totalLabs}</div>
                <div className="text-xs text-text-muted">Labs</div>
              </div>
              <div className="bg-white border border-accent/30 rounded-lg p-4 text-center shadow">
                <div className="text-2xl mb-2">⚡</div>
                <div className="text-2xl font-bold text-secondary">{stats.totalDevices}</div>
                <div className="text-xs text-text-muted">Devices</div>
              </div>
              <div className="bg-white border border-accent/30 rounded-lg p-4 text-center shadow">
                <div className="text-2xl mb-2">🟢</div>
                <div className="text-2xl font-bold text-green-600">{stats.devicesOn}</div>
                <div className="text-xs text-text-muted">ON</div>
              </div>
              <div className="bg-white border border-accent/30 rounded-lg p-4 text-center shadow">
                <div className="text-2xl mb-2">🔴</div>
                <div className="text-2xl font-bold text-red-600">{stats.devicesOff}</div>
                <div className="text-xs text-text-muted">OFF</div>
              </div>
            </div>

            <div className="bg-white border border-accent/30 rounded-lg shadow-lg p-6">
              <h2 className="font-serif text-lg text-secondary mb-4">Database Location</h2>
              <p className="text-sm text-text-muted mb-2">
                All data is stored in: <code className="bg-cream-dark px-2 py-1 rounded text-xs">backend/database.json</code>
              </p>
              <p className="text-xs text-text-muted">
                You can view the raw JSON file directly in the backend folder to see all data.
              </p>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-white border border-accent/30 rounded-lg shadow-lg p-6 animate-up delay-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-serif text-lg text-secondary">All Users</h2>
              <span className="text-xs text-text-muted bg-primary/10 px-3 py-1 rounded-full">
                Total: {users.length}
              </span>
            </div>

          {loading && (
            <div className="text-center py-8 text-text-muted">Loading users...</div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded p-3 text-red-600 text-sm mb-4">
              {error}
            </div>
          )}

          {!loading && !error && users.length === 0 && (
            <div className="text-center py-8 text-text-muted">
              No users found. Users will appear here once they sign up.
            </div>
          )}

            {!loading && !error && users.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-accent/20 text-left">
                      <th className="pb-3 text-text-muted font-medium">ID</th>
                      <th className="pb-3 text-text-muted font-medium">Name</th>
                      <th className="pb-3 text-text-muted font-medium">Email</th>
                      <th className="pb-3 text-text-muted font-medium">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-accent/10 hover:bg-cream-dark/50 transition">
                        <td className="py-3 text-text-muted">#{user.id}</td>
                        <td className="py-3 text-secondary font-medium">{user.name}</td>
                        <td className="py-3 text-text">{user.email}</td>
                        <td className="py-3 text-text-muted text-xs">{formatDate(user.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Labs Tab */}
        {activeTab === 'labs' && (
          <div className="bg-white border border-accent/30 rounded-lg shadow-lg p-6 animate-up delay-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-serif text-lg text-secondary">All Labs</h2>
              <span className="text-xs text-text-muted bg-primary/10 px-3 py-1 rounded-full">
                Total: {labs.length}
              </span>
            </div>

            {loading && <div className="text-center py-8 text-text-muted">Loading labs...</div>}
            {error && <div className="bg-red-50 border border-red-200 rounded p-3 text-red-600 text-sm mb-4">{error}</div>}
            
            {!loading && !error && labs.length === 0 && (
              <div className="text-center py-8 text-text-muted">No labs found.</div>
            )}

            {!loading && !error && labs.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-accent/20 text-left">
                      <th className="pb-3 text-text-muted font-medium">ID</th>
                      <th className="pb-3 text-text-muted font-medium">Lab #</th>
                      <th className="pb-3 text-text-muted font-medium">Name</th>
                      <th className="pb-3 text-text-muted font-medium">Devices</th>
                      <th className="pb-3 text-text-muted font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {labs.map((lab) => {
                      const labDevices = allDevices.filter(d => d.lab_number === lab.lab_number)
                      return (
                        <tr key={lab.id} className="border-b border-accent/10 hover:bg-cream-dark/50 transition">
                          <td className="py-3 text-text-muted">#{lab.id}</td>
                          <td className="py-3 text-secondary font-medium">Lab {lab.lab_number}</td>
                          <td className="py-3 text-text">{lab.name}</td>
                          <td className="py-3 text-text-muted">{labDevices.length} devices</td>
                          <td className="py-3">
                            <button
                              onClick={() => navigate(`/lab/${lab.lab_number}`)}
                              className="text-primary hover:underline text-xs"
                            >
                              View →
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Devices Tab */}
        {activeTab === 'devices' && (
          <div className="bg-white border border-accent/30 rounded-lg shadow-lg p-6 animate-up delay-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-serif text-lg text-secondary">All Devices</h2>
              <span className="text-xs text-text-muted bg-primary/10 px-3 py-1 rounded-full">
                Total: {allDevices.length}
              </span>
            </div>

            {loading && <div className="text-center py-8 text-text-muted">Loading devices...</div>}
            {error && <div className="bg-red-50 border border-red-200 rounded p-3 text-red-600 text-sm mb-4">{error}</div>}
            
            {!loading && !error && allDevices.length === 0 && (
              <div className="text-center py-8 text-text-muted">No devices found.</div>
            )}

            {!loading && !error && allDevices.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-accent/20 text-left">
                      <th className="pb-3 text-text-muted font-medium">ID</th>
                      <th className="pb-3 text-text-muted font-medium">Name</th>
                      <th className="pb-3 text-text-muted font-medium">Type</th>
                      <th className="pb-3 text-text-muted font-medium">Lab</th>
                      <th className="pb-3 text-text-muted font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allDevices.map((device) => (
                      <tr key={device.id} className="border-b border-accent/10 hover:bg-cream-dark/50 transition">
                        <td className="py-3 text-text-muted">#{device.id}</td>
                        <td className="py-3 text-secondary font-medium">{device.name}</td>
                        <td className="py-3 text-text capitalize">{device.type}</td>
                        <td className="py-3 text-text-muted">Lab {device.lab_number}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded text-xs ${
                            device.is_on === 1 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {device.is_on === 1 ? 'ON' : 'OFF'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        <div className="mt-6 flex gap-3 justify-center">
          <button 
            onClick={() => navigate('/')} 
            className="bg-primary text-cream px-4 py-2 rounded-lg text-sm hover:bg-primary-light transition"
          >
            ← Back to Home
          </button>
          <button 
            onClick={() => navigate('/labs')} 
            className="border border-primary text-primary px-4 py-2 rounded-lg text-sm hover:bg-primary/10 transition"
          >
            View Labs
          </button>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default AdminDashboard

