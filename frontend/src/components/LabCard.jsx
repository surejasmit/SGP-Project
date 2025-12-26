// LabCard Component - clickable card for each lab
function LabCard({ labNumber, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-white border border-accent/30 rounded-lg p-4 text-center shadow 
                 hover:shadow-lg hover:-translate-y-1 hover:border-primary 
                 transition-all duration-300 cursor-pointer group"
    >
      <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">🔬</div>
      <h3 className="font-serif text-primary text-sm">Lab {labNumber}</h3>
      <p className="text-text-muted text-xs mt-1">8 Lights • 3 Fans</p>
    </button>
  )
}

export default LabCard

