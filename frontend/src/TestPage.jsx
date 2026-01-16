// Simple test page to verify React is working
function TestPage() {
  return (
    <div style={{ 
      padding: '50px', 
      backgroundColor: '#0f172a', 
      color: '#ffffff',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ fontSize: '32px', marginBottom: '20px' }}>
        ✅ React is Working!
      </h1>
      <p style={{ fontSize: '18px', marginBottom: '10px' }}>
        If you see this, React is rendering correctly.
      </p>
      <p style={{ fontSize: '14px', color: '#cbd5e1' }}>
        The issue might be with Tailwind CSS or routing.
      </p>
      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#1e293b', borderRadius: '8px' }}>
        <p>Current URL: {window.location.href}</p>
        <p>Root element exists: {document.getElementById('root') ? 'Yes' : 'No'}</p>
      </div>
    </div>
  )
}

export default TestPage
