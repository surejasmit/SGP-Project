// DeviceItem Component - colorful 3D card with green/red toggle
function DeviceItem({ device, showBorder, onClick }) {
  const isLight = device.type === 'light'
  const isComputer = device.type === 'computer'

  return (
    <button
      onClick={onClick}
      className={`
        rounded-xl p-4 text-center cursor-pointer
        transition-all duration-300 ease-in-out
        hover:scale-105 active:scale-95
        ${showBorder 
          ? 'bg-gradient-to-br from-green-400 to-green-600 shadow-[0_8px_20px_rgba(34,197,94,0.5)] border-2 border-green-300' 
          : 'bg-gradient-to-br from-red-400 to-red-600 shadow-[0_8px_20px_rgba(239,68,68,0.5)] border-2 border-red-300 translate-y-1'}
        text-white
      `}
      style={{
        transform: showBorder ? 'translateY(-4px)' : 'translateY(2px)',
        boxShadow: showBorder 
          ? '0 12px 25px rgba(34,197,94,0.4), inset 0 2px 0 rgba(255,255,255,0.3)' 
          : '0 4px 15px rgba(239,68,68,0.4), inset 0 -2px 0 rgba(0,0,0,0.2)'
      }}
    >
      {/* Device icon */}
      <div className={`text-3xl mb-2 drop-shadow-lg transition-transform duration-300 ${showBorder ? 'scale-110' : 'scale-100'}`}>
        {isLight ? '💡' : isComputer ? '💻' : '🌀'}
      </div>
      
      {/* Device label */}
      <h4 className="font-bold text-sm drop-shadow">{device.name}</h4>
      <p className="text-white/80 text-xs mt-1 capitalize">{device.type}</p>
      
      {/* Status badge */}
      <div className={`mt-2 text-xs px-2 py-0.5 rounded-full inline-block font-medium
        ${showBorder ? 'bg-white/30' : 'bg-black/20'}`}>
        {showBorder ? 'ON' : 'OFF'}
      </div>
    </button>
  )
}

export default DeviceItem
