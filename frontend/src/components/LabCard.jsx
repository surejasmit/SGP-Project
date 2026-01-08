// LabCard Component - clickable card for each lab
function LabCard({ labNumber, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-dark-lighter rounded-xl p-8 text-center shadow-lg border border-dark-lighter/50 
                 hover:shadow-2xl hover:-translate-y-3 hover:border-primary
                 transition-all duration-500 cursor-pointer group card-hover"
    >
      <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-3xl mb-6 mx-auto shadow-md group-hover:scale-125 transition-transform duration-500">
        🔬
      </div>
      <h3 className="font-bold text-text-light text-xl mb-3 leading-tight text-spacing">Lab {labNumber}</h3>
      <p className="text-text-muted-light text-sm leading-relaxed text-spacing">8 Lights • 3 Fans • 8 PCs</p>
    </button>
  )
}

export default LabCard

