import { motion } from 'framer-motion';

// Modern Smart Classroom Illustration
// Clean, vibrant design with rich colors and depth — matches the Smart Classroom theme
export const IsometricClassroom = ({ className }: { className?: string }) => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className={className}
    >
      <svg
        viewBox="0 0 520 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%' }}
      >
        <defs>
          {/* Warm ambient glow */}
          <filter id="amberGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="softGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="screenGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="shadow" x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.18" />
          </filter>

          {/* Gradients */}
          <linearGradient id="floorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f5f0e8" />
            <stop offset="50%" stopColor="#ebe4d6" />
            <stop offset="100%" stopColor="#e0d7c6" />
          </linearGradient>
          <linearGradient id="wallLeft" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#faf7f2" />
            <stop offset="100%" stopColor="#f0ebe0" />
          </linearGradient>
          <linearGradient id="wallRight" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f5f0e6" />
            <stop offset="100%" stopColor="#ebe3d3" />
          </linearGradient>
          <linearGradient id="boardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="screenOn" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="40%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient id="deskWood" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d4a574" />
            <stop offset="50%" stopColor="#c49565" />
            <stop offset="100%" stopColor="#b8895a" />
          </linearGradient>
          <linearGradient id="deskSide" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#b8895a" />
            <stop offset="100%" stopColor="#9e7348" />
          </linearGradient>
          <linearGradient id="ceilingLight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
          <linearGradient id="chairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#4f46e5" />
          </linearGradient>
          <linearGradient id="chairGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>

          {/* Window sky */}
          <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7dd3fc" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
        </defs>

        {/* ===== ROOM STRUCTURE ===== */}

        {/* Floor */}
        <polygon
          points="260,400 490,280 260,160 30,280"
          fill="url(#floorGrad)"
          stroke="#d4c9b5"
          strokeWidth="0.5"
        />
        {/* Floor tile lines */}
        {[1, 2, 3, 4, 5].map((i) => (
          <line
            key={`fh-${i}`}
            x1={30 + i * 38}
            y1={280 - i * 10}
            x2={260 + i * 38}
            y2={400 - i * 10}
            stroke="#d4c9b5"
            strokeWidth="0.4"
            opacity="0.5"
          />
        ))}
        {[1, 2, 3, 4, 5].map((i) => (
          <line
            key={`fv-${i}`}
            x1={260 - i * 38}
            y1={160 + i * 10}
            x2={490 - i * 38}
            y2={280 + i * 10}
            stroke="#d4c9b5"
            strokeWidth="0.4"
            opacity="0.5"
          />
        ))}

        {/* Left Wall */}
        <polygon
          points="30,280 30,80 260,0 260,160"
          fill="url(#wallLeft)"
          stroke="#d4c9b5"
          strokeWidth="0.5"
        />
        {/* Left wall baseboard */}
        <polygon
          points="30,280 30,268 260,152 260,160"
          fill="#c9b99a"
          opacity="0.4"
        />

        {/* Right Wall */}
        <polygon
          points="260,160 260,0 490,80 490,280"
          fill="url(#wallRight)"
          stroke="#d4c9b5"
          strokeWidth="0.5"
        />
        {/* Right wall baseboard */}
        <polygon
          points="260,160 260,152 490,72 490,80"
          fill="transparent"
        />

        {/* ===== WINDOW on right wall ===== */}
        <polygon
          points="340,55 340,120 430,88 430,30"
          fill="url(#skyGrad)"
          stroke="#94a3b8"
          strokeWidth="1.2"
        />
        {/* Window frame divider */}
        <line x1="385" y1="42" x2="385" y2="104" stroke="#94a3b8" strokeWidth="1" />
        <line x1="340" y1="88" x2="430" y2="59" stroke="#94a3b8" strokeWidth="1" />
        {/* Window light cast on floor */}
        <polygon
          points="340,240 380,220 420,240 380,260"
          fill="#fef9c3"
          opacity="0.15"
        />

        {/* ===== SMARTBOARD on left wall ===== */}
        <g filter="url(#shadow)">
          <polygon
            points="80,135 80,68 220,28 220,88"
            fill="url(#boardGrad)"
            stroke="#334155"
            strokeWidth="1.2"
            rx="3"
          />
          {/* Smartboard screen content */}
          <polygon
            points="88,130 88,73 212,36 212,85"
            fill="#1e3a5f"
            opacity="0.9"
          />
          {/* Screen content - code/chart lines */}
          <line x1="96" y1="82" x2="140" y2="66" stroke="#34d399" strokeWidth="1.5" opacity="0.7" />
          <line x1="96" y1="90" x2="160" y2="72" stroke="#60a5fa" strokeWidth="1.5" opacity="0.6" />
          <line x1="96" y1="98" x2="130" y2="87" stroke="#fbbf24" strokeWidth="1.5" opacity="0.5" />
          {/* Chart bars */}
          <rect x="170" y="62" width="8" height="14" fill="#34d399" opacity="0.6" transform="skewY(-16)" />
          <rect x="182" y="58" width="8" height="20" fill="#60a5fa" opacity="0.6" transform="skewY(-16)" />
          <rect x="194" y="55" width="8" height="16" fill="#fbbf24" opacity="0.6" transform="skewY(-16)" />
          {/* Power indicator */}
          <circle cx="215" cy="90" r="2.5" fill="#22c55e" filter="url(#softGlow)" />
        </g>

        {/* ===== CEILING LIGHTS ===== */}
        {[160, 260, 370].map((cx, i) => {
          const cy = i === 1 ? 18 : 48;
          return (
            <g key={`light-${i}`}>
              {/* Light fixture */}
              <rect x={cx - 18} y={cy - 3} width="36" height="6" rx="2" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="0.5" transform={`skewX(${i === 1 ? 0 : i === 0 ? -12 : 12})`} />
              {/* Light glow */}
              <ellipse cx={cx} cy={cy + 12} rx="20" ry="8" fill="#fbbf24" opacity="0.08" />
              {/* Warm light dot */}
              <circle cx={cx} cy={cy + 2} r="3" fill="url(#ceilingLight)" filter="url(#amberGlow)" opacity="0.9" />
            </g>
          );
        })}

        {/* ===== TEACHER'S DESK (front, near smartboard) ===== */}
        <g filter="url(#shadow)">
          {/* Desk top */}
          <polygon
            points="98,215 180,185 145,170 65,198"
            fill="url(#deskWood)"
            stroke="#a3784b"
            strokeWidth="0.6"
          />
          {/* Desk front face */}
          <polygon
            points="98,215 180,185 180,200 98,228"
            fill="url(#deskSide)"
            stroke="#a3784b"
            strokeWidth="0.4"
          />
          {/* Laptop on teacher desk */}
          {/* Laptop base */}
          <polygon points="115,200 155,188 142,182 103,194" fill="#374151" stroke="#4b5563" strokeWidth="0.5" />
          {/* Laptop screen */}
          <polygon points="112,194 142,182 142,170 112,180" fill="#1e293b" stroke="#4b5563" strokeWidth="0.5" />
          {/* Laptop screen glow */}
          <polygon points="114,192 140,181 140,172 114,182" fill="url(#screenOn)" opacity="0.8" />
          {/* Small content on laptop */}
          <line x1="118" y1="186" x2="132" y2="181" stroke="#93c5fd" strokeWidth="0.8" opacity="0.7" />
          <line x1="118" y1="189" x2="128" y2="186" stroke="#34d399" strokeWidth="0.8" opacity="0.6" />
        </g>

        {/* ===== STUDENT DESKS WITH MONITORS (3 rows) ===== */}

        {/* Row 1 (front, closest to viewer) */}
        {[0, 1, 2, 3].map((i) => {
          const bx = 150 + i * 60;
          const by = 330 - i * 20;
          return (
            <g key={`r1-${i}`} filter="url(#shadow)">
              {/* Desk surface */}
              <polygon
                points={`${bx},${by} ${bx + 50},${by - 17} ${bx + 30},${by - 27} ${bx - 18},${by - 11}`}
                fill="url(#deskWood)"
                stroke="#a3784b"
                strokeWidth="0.5"
              />
              {/* Desk front */}
              <polygon
                points={`${bx},${by} ${bx + 50},${by - 17} ${bx + 50},${by - 5} ${bx},${by + 12}`}
                fill="url(#deskSide)"
                stroke="#a3784b"
                strokeWidth="0.3"
              />
              {/* Monitor */}
              <polygon
                points={`${bx + 6},${by - 13} ${bx + 38},${by - 24} ${bx + 38},${by - 38} ${bx + 6},${by - 27}`}
                fill="#1e293b"
                stroke="#334155"
                strokeWidth="0.7"
              />
              {/* Monitor screen (blue glow) */}
              <polygon
                points={`${bx + 9},${by - 15} ${bx + 35},${by - 25} ${bx + 35},${by - 36} ${bx + 9},${by - 28}`}
                fill="url(#screenOn)"
                opacity="0.75"
                filter="url(#screenGlow)"
              />
              {/* Screen content lines */}
              <line x1={bx + 12} y1={by - 20} x2={bx + 28} y2={by - 26} stroke="#bfdbfe" strokeWidth="0.6" opacity="0.6" />
              <line x1={bx + 12} y1={by - 23} x2={bx + 24} y2={by - 27} stroke="#93c5fd" strokeWidth="0.6" opacity="0.5" />
              {/* Monitor stand */}
              <line x1={bx + 22} y1={by - 13} x2={bx + 22} y2={by - 8} stroke="#475569" strokeWidth="2" />
              {/* Keyboard */}
              <polygon
                points={`${bx + 10},${by - 7} ${bx + 32},${by - 14} ${bx + 28},${by - 16} ${bx + 7},${by - 10}`}
                fill="#4b5563"
                stroke="#6b7280"
                strokeWidth="0.3"
              />
            </g>
          );
        })}

        {/* Row 2 (middle) */}
        {[0, 1, 2, 3].map((i) => {
          const bx = 125 + i * 60;
          const by = 290 - i * 20;
          return (
            <g key={`r2-${i}`} filter="url(#shadow)">
              <polygon
                points={`${bx},${by} ${bx + 50},${by - 17} ${bx + 30},${by - 27} ${bx - 18},${by - 11}`}
                fill="url(#deskWood)"
                stroke="#a3784b"
                strokeWidth="0.5"
              />
              <polygon
                points={`${bx},${by} ${bx + 50},${by - 17} ${bx + 50},${by - 5} ${bx},${by + 12}`}
                fill="url(#deskSide)"
                stroke="#a3784b"
                strokeWidth="0.3"
              />
              <polygon
                points={`${bx + 6},${by - 13} ${bx + 38},${by - 24} ${bx + 38},${by - 38} ${bx + 6},${by - 27}`}
                fill="#1e293b"
                stroke="#334155"
                strokeWidth="0.7"
              />
              <polygon
                points={`${bx + 9},${by - 15} ${bx + 35},${by - 25} ${bx + 35},${by - 36} ${bx + 9},${by - 28}`}
                fill="url(#screenOn)"
                opacity="0.7"
                filter="url(#screenGlow)"
              />
              <line x1={bx + 12} y1={by - 20} x2={bx + 28} y2={by - 26} stroke="#bfdbfe" strokeWidth="0.6" opacity="0.6" />
              <line x1={bx + 12} y1={by - 23} x2={bx + 24} y2={by - 27} stroke="#93c5fd" strokeWidth="0.6" opacity="0.5" />
              <line x1={bx + 22} y1={by - 13} x2={bx + 22} y2={by - 8} stroke="#475569" strokeWidth="2" />
              <polygon
                points={`${bx + 10},${by - 7} ${bx + 32},${by - 14} ${bx + 28},${by - 16} ${bx + 7},${by - 10}`}
                fill="#4b5563"
                stroke="#6b7280"
                strokeWidth="0.3"
              />
            </g>
          );
        })}

        {/* Row 3 (back) */}
        {[0, 1, 2, 3].map((i) => {
          const bx = 100 + i * 60;
          const by = 250 - i * 20;
          return (
            <g key={`r3-${i}`} filter="url(#shadow)">
              <polygon
                points={`${bx},${by} ${bx + 50},${by - 17} ${bx + 30},${by - 27} ${bx - 18},${by - 11}`}
                fill="url(#deskWood)"
                stroke="#a3784b"
                strokeWidth="0.5"
              />
              <polygon
                points={`${bx},${by} ${bx + 50},${by - 17} ${bx + 50},${by - 5} ${bx},${by + 12}`}
                fill="url(#deskSide)"
                stroke="#a3784b"
                strokeWidth="0.3"
              />
              <polygon
                points={`${bx + 6},${by - 13} ${bx + 38},${by - 24} ${bx + 38},${by - 38} ${bx + 6},${by - 27}`}
                fill="#1e293b"
                stroke="#334155"
                strokeWidth="0.7"
              />
              <polygon
                points={`${bx + 9},${by - 15} ${bx + 35},${by - 25} ${bx + 35},${by - 36} ${bx + 9},${by - 28}`}
                fill="url(#screenOn)"
                opacity="0.65"
                filter="url(#screenGlow)"
              />
              <line x1={bx + 12} y1={by - 20} x2={bx + 28} y2={by - 26} stroke="#bfdbfe" strokeWidth="0.6" opacity="0.5" />
              <line x1={bx + 22} y1={by - 13} x2={bx + 22} y2={by - 8} stroke="#475569" strokeWidth="2" />
              <polygon
                points={`${bx + 10},${by - 7} ${bx + 32},${by - 14} ${bx + 28},${by - 16} ${bx + 7},${by - 10}`}
                fill="#4b5563"
                stroke="#6b7280"
                strokeWidth="0.3"
              />
            </g>
          );
        })}

        {/* ===== CHAIRS (colorful, modern swivel chairs) ===== */}
        {/* Row 1 chairs */}
        {[0, 1, 2, 3].map((i) => (
          <g key={`ch1-${i}`}>
            {/* Chair base */}
            <ellipse
              cx={168 + i * 60}
              cy={345 - i * 20}
              rx="6"
              ry="3"
              fill="#6b7280"
              opacity="0.5"
            />
            {/* Chair seat */}
            <ellipse
              cx={168 + i * 60}
              cy={340 - i * 20}
              rx="10"
              ry="5"
              fill={i % 2 === 0 ? 'url(#chairGrad)' : 'url(#chairGrad2)'}
              stroke={i % 2 === 0 ? '#4f46e5' : '#7c3aed'}
              strokeWidth="0.5"
            />
            {/* Chair back */}
            <rect
              x={164 + i * 60}
              y={328 - i * 20}
              width="8"
              height="10"
              rx="2"
              fill={i % 2 === 0 ? '#6366f1' : '#8b5cf6'}
              stroke={i % 2 === 0 ? '#4338ca' : '#6d28d9'}
              strokeWidth="0.4"
              transform={`skewY(${-17 + i * 0.5})`}
            />
          </g>
        ))}
        {/* Row 2 chairs */}
        {[0, 1, 2, 3].map((i) => (
          <g key={`ch2-${i}`}>
            <ellipse cx={143 + i * 60} cy={305 - i * 20} rx="6" ry="3" fill="#6b7280" opacity="0.5" />
            <ellipse
              cx={143 + i * 60}
              cy={300 - i * 20}
              rx="10"
              ry="5"
              fill={i % 2 === 0 ? 'url(#chairGrad2)' : 'url(#chairGrad)'}
              stroke={i % 2 === 0 ? '#7c3aed' : '#4f46e5'}
              strokeWidth="0.5"
            />
            <rect
              x={139 + i * 60}
              y={288 - i * 20}
              width="8"
              height="10"
              rx="2"
              fill={i % 2 === 0 ? '#8b5cf6' : '#6366f1'}
              stroke={i % 2 === 0 ? '#6d28d9' : '#4338ca'}
              strokeWidth="0.4"
              transform={`skewY(${-17 + i * 0.5})`}
            />
          </g>
        ))}
        {/* Row 3 chairs */}
        {[0, 1, 2, 3].map((i) => (
          <g key={`ch3-${i}`}>
            <ellipse cx={118 + i * 60} cy={265 - i * 20} rx="6" ry="3" fill="#6b7280" opacity="0.5" />
            <ellipse
              cx={118 + i * 60}
              cy={260 - i * 20}
              rx="10"
              ry="5"
              fill={i % 2 === 0 ? 'url(#chairGrad)' : 'url(#chairGrad2)'}
              stroke={i % 2 === 0 ? '#4f46e5' : '#7c3aed'}
              strokeWidth="0.5"
            />
            <rect
              x={114 + i * 60}
              y={248 - i * 20}
              width="8"
              height="10"
              rx="2"
              fill={i % 2 === 0 ? '#6366f1' : '#8b5cf6'}
              stroke={i % 2 === 0 ? '#4338ca' : '#6d28d9'}
              strokeWidth="0.4"
              transform={`skewY(${-17 + i * 0.5})`}
            />
          </g>
        ))}

        {/* ===== SPEAKER on left wall ===== */}
        <g>
          <polygon points="55,170 55,152 78,142 78,158" fill="#374151" stroke="#4b5563" strokeWidth="0.6" />
          <circle cx="66" cy="155" r="4" fill="#1f2937" stroke="#4b5563" strokeWidth="0.4" />
          <circle cx="66" cy="155" r="2" fill="#374151" />
        </g>

        {/* ===== PROJECTOR (ceiling mounted) ===== */}
        <g filter="url(#shadow)">
          <rect x="340" y="12" width="24" height="12" rx="2" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="0.7" transform="skewX(10)" />
          <line x1="358" y1="8" x2="358" y2="12" stroke="#9ca3af" strokeWidth="1.5" />
          {/* Projector lens */}
          <circle cx="352" cy="26" r="3" fill="#fbbf24" filter="url(#softGlow)" opacity="0.8" />
          {/* Light beam */}
          <polygon
            points="345,28 365,28 420,85 320,85"
            fill="#fbbf24"
            opacity="0.04"
          />
        </g>

        {/* ===== LABELS with clean modern style ===== */}

        {/* Smartboard label */}
        <g>
          <line x1="150" y1="105" x2="150" y2="120" stroke="#f59e0b" strokeWidth="0.8" opacity="0.7" />
          <circle cx="150" cy="125" r="3" fill="#f59e0b" opacity="0.9" filter="url(#softGlow)" />
          <text x="150" y="140" textAnchor="middle" fill="#b45309" fontSize="8" fontFamily="system-ui, sans-serif" fontWeight="600" opacity="0.85">Smartboard</text>
        </g>

        {/* Projector label */}
        <g>
          <line x1="355" y1="30" x2="355" y2="7" stroke="#f59e0b" strokeWidth="0.8" opacity="0.7" />
          <text x="355" y="4" textAnchor="middle" fill="#b45309" fontSize="8" fontFamily="system-ui, sans-serif" fontWeight="600" opacity="0.85">Projector</text>
        </g>

        {/* PCs label */}
        <g>
          <line x1="360" y1="310" x2="380" y2="330" stroke="#f59e0b" strokeWidth="0.8" opacity="0.7" />
          <circle cx="383" cy="333" r="3" fill="#f59e0b" opacity="0.9" filter="url(#softGlow)" />
          <text x="383" y="346" textAnchor="middle" fill="#b45309" fontSize="8" fontFamily="system-ui, sans-serif" fontWeight="600" opacity="0.85">Student PCs</text>
        </g>

        {/* Speaker label */}
        <g>
          <line x1="60" y1="148" x2="48" y2="135" stroke="#f59e0b" strokeWidth="0.8" opacity="0.7" />
          <text x="45" y="130" textAnchor="middle" fill="#b45309" fontSize="8" fontFamily="system-ui, sans-serif" fontWeight="600" opacity="0.85">Audio</text>
        </g>

        {/* ===== DECORATIVE ELEMENTS ===== */}

        {/* Clock on right wall */}
        <circle cx="460" cy="105" r="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.8" />
        <circle cx="460" cy="105" r="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.3" />
        <line x1="460" y1="105" x2="460" y2="99" stroke="#1e293b" strokeWidth="0.8" />
        <line x1="460" y1="105" x2="464" y2="105" stroke="#1e293b" strokeWidth="0.6" />
        <circle cx="460" cy="105" r="1" fill="#f59e0b" />

        {/* Small plant on teacher's desk */}
        <g>
          <rect x="160" y="178" width="8" height="8" rx="1" fill="#d97706" stroke="#b45309" strokeWidth="0.3" />
          {/* Leaves */}
          <ellipse cx="162" cy="174" rx="3" ry="5" fill="#22c55e" opacity="0.8" transform="rotate(-15, 162, 174)" />
          <ellipse cx="166" cy="173" rx="3" ry="5" fill="#16a34a" opacity="0.8" transform="rotate(10, 166, 173)" />
          <ellipse cx="164" cy="172" rx="2.5" ry="4.5" fill="#4ade80" opacity="0.7" transform="rotate(-5, 164, 172)" />
        </g>

        {/* WiFi router indicator on right wall */}
        <g>
          <rect x="470" y="140" width="10" height="6" rx="1" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="0.4" />
          <circle cx="475" cy="143" r="1.5" fill="#22c55e" filter="url(#softGlow)" />
          {/* Antenna */}
          <line x1="472" y1="140" x2="472" y2="134" stroke="#9ca3af" strokeWidth="0.5" />
          <line x1="478" y1="140" x2="478" y2="134" stroke="#9ca3af" strokeWidth="0.5" />
        </g>

        {/* Ambient warm light overlay at bottom */}
        <rect x="0" y="380" width="520" height="100" fill="#fbbf24" opacity="0.03" />

      </svg>
    </motion.div>
  );
};
