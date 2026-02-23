import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Float, MeshDistortMaterial } from '@react-three/drei';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from '../components/Router';
import { api } from '../utils/api';
import * as THREE from 'three';

// PC Component with animations
function PC({ position, number, status, onClick }: any) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<any>();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      if (hovered) {
        meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 3) * 0.05;
      } else {
        meshRef.current.position.y = position[1];
      }
    }
  });
  
  const getColor = () => {
    if (status === 'affected') return '#ff0055'; // vibrant red
    if (hovered) return '#00d4ff'; // cyan
    return '#00ff88'; // neon green
  };

  return (
    <Float speed={status === 'affected' ? 2 : 0} rotationIntensity={0} floatIntensity={status === 'affected' ? 0.3 : 0}>
      <mesh
        ref={meshRef}
        position={position}
        onClick={() => onClick(number)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.3 : 1}
        castShadow
      >
        <cylinderGeometry args={[0.15, 0.15, 0.1, 32]} />
        <meshStandardMaterial 
          color={getColor()} 
          emissive={getColor()}
          emissiveIntensity={hovered ? 0.8 : 0.4}
          metalness={0.8}
          roughness={0.2}
        />
        {hovered && (
          <pointLight color={getColor()} intensity={2} distance={2} />
        )}
      </mesh>
    </Float>
  );
}

// Bench Component
function Bench({ position }: any) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={[1.5, 0.1, 0.6]} />
      <meshStandardMaterial 
        color="#4a3f35" 
        metalness={0.3}
        roughness={0.7}
      />
    </mesh>
  );
}

// Teacher Table
function TeacherTable({ position }: any) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={[2, 0.15, 1]} />
      <meshStandardMaterial 
        color="#3d2817" 
        metalness={0.4}
        roughness={0.6}
      />
    </mesh>
  );
}

// Animated Grid Floor
function GridFloor() {
  return (
    <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[14, 12]} />
      <meshStandardMaterial 
        color="#1a1a1a"
        metalness={0.6}
        roughness={0.4}
      />
    </mesh>
  );
}

// Classroom Walls
function Walls() {
  return (
    <group>
      <GridFloor />
      
      {/* Back Wall */}
      <mesh position={[0, 2.5, -6]} receiveShadow castShadow>
        <boxGeometry args={[14, 5.5, 0.3]} />
        <meshStandardMaterial 
          color="#2a2a3e" 
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>
      
      {/* Smart Board with glow */}
      <mesh position={[0, 2, -5.85]}>
        <boxGeometry args={[5, 2.5, 0.15]} />
        <meshStandardMaterial 
          color="#0f172a" 
          emissive="#1e40af"
          emissiveIntensity={0.3}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      {/* Left Wall */}
      <mesh position={[-7, 2.5, 0]} receiveShadow castShadow>
        <boxGeometry args={[0.3, 5.5, 12]} />
        <meshStandardMaterial color="#2a2a3e" metalness={0.3} roughness={0.7} />
      </mesh>
      
      {/* Right Wall */}
      <mesh position={[7, 2.5, 0]} receiveShadow castShadow>
        <boxGeometry args={[0.3, 5.5, 12]} />
        <meshStandardMaterial color="#2a2a3e" metalness={0.3} roughness={0.7} />
      </mesh>
      
      {/* Ceiling */}
      <mesh position={[0, 5.2, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[14, 12]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.4} roughness={0.6} />
      </mesh>
    </group>
  );
}

// Main 3D Scene
function ClassroomScene({ pcData, onPCClick }: any) {
  return (
    <>
      <color attach="background" args={['#0a0a0a']} />
      
      <PerspectiveCamera makeDefault position={[0, 10, 12]} fov={60} />
      <OrbitControls 
        enablePan={true}
        minDistance={8}
        maxDistance={20}
        maxPolarAngle={Math.PI / 2.2}
        autoRotate
        autoRotateSpeed={0.3}
        target={[0, 0, 0]}
      />
      
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[10, 15, 10]} 
        intensity={2} 
        castShadow
      />
      <pointLight position={[0, 6, 0]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-5, 4, 2]} intensity={0.8} color="#06b6d4" />
      <pointLight position={[5, 4, 2]} intensity={0.8} color="#8b5cf6" />
      <spotLight position={[0, 8, -4]} angle={0.5} intensity={1} color="#4f46e5" target-position={[0, 0, -4]} />
      
      <Walls />
      <TeacherTable position={[0, 0, -3.5]} />
      
      {/* Benches and PCs */}
      {pcData.map((pc: any, index: number) => (
        <group key={index}>
          <Bench position={pc.benchPosition} />
          <PC 
            position={pc.position} 
            number={pc.number} 
            status={pc.status}
            onClick={onPCClick}
          />
        </group>
      ))}
    </>
  );
}

// Modal Form
function PCIssueModal({ isOpen, onClose, classroomName, pcNumber, onSubmit }: any) {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit(description);
    setLoading(false);
    setDescription('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200" onClick={onClose}>
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl p-6 max-w-md w-full mx-4 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 animate-in zoom-in-95 duration-300" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">Report PC Issue</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-2">Classroom</label>
            <input
              type="text"
              value={classroomName}
              disabled
              className="w-full px-4 py-2 bg-gray-700 text-gray-400 rounded-lg"
            />
          </div>
          
          <div>
            <label className="block text-gray-300 mb-2">PC Number</label>
            <input
              type="text"
              value={`PC ${pcNumber}`}
              disabled
              className="w-full px-4 py-2 bg-gray-700 text-gray-400 rounded-lg"
            />
          </div>
          
          <div>
            <label className="block text-gray-300 mb-2">Issue Description *</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
              placeholder="Describe the issue..."
              className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>
          
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-2 rounded-lg font-semibold disabled:opacity-50 shadow-lg shadow-cyan-500/50 transition-all duration-300"
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-700/50 hover:bg-gray-600/50 text-white py-2 rounded-lg font-semibold border border-gray-600 transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Main Page Component
export default function Classroom3DPage() {
  const { path } = useRouter();
  const classroomNumber = path.split('/')[2] || '301';
  const [selectedPC, setSelectedPC] = useState<number | null>(null);
  const [pcData, setPCData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Generate PC positions (3 rows, 5 PCs each)
  useEffect(() => {
    const generatePCData = async () => {
      const pcs = [];
      let pcNumber = 1;
      
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 5; col++) {
          const x = -4 + col * 2;
          const z = -1 + row * 2;
          
          // Check if PC is affected
          let status = 'available';
          try {
            const result = await api.checkItemStatus({
              locationType: 'classroom',
              locationId: classroomNumber,
              itemType: 'PC',
              itemNumber: pcNumber
            });
            if (result.affected) {
              status = 'affected';
            }
          } catch (error) {
            console.error('Error checking PC status:', error);
          }
          
          pcs.push({
            number: pcNumber,
            position: [x, 0.3, z],
            benchPosition: [x, 0, z],
            status
          });
          pcNumber++;
        }
      }
      
      setPCData(pcs);
      setLoading(false);
    };

    generatePCData();
  }, [classroomNumber]);

  const handlePCClick = (pcNumber: number) => {
    const pc = pcData.find(p => p.number === pcNumber);
    if (pc && pc.status !== 'affected') {
      setSelectedPC(pcNumber);
    }
  };

  const handleSubmit = async (description: string) => {
    try {
      await api.submitQuery({
        locationType: 'classroom',
        locationId: classroomNumber,
        itemType: 'PC',
        itemNumber: selectedPC!,
        query: description
      });
      
      // Update PC status
      setPCData(prev => prev.map(pc => 
        pc.number === selectedPC ? { ...pc, status: 'affected' } : pc
      ));
      
      setSelectedPC(null);
      alert('Issue reported successfully!');
    } catch (error: any) {
      alert(error.message || 'Failed to submit issue');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <p className="text-white text-xl">Loading 3D Classroom...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="pt-20 px-4 pb-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
              Classroom {classroomNumber} - 3D Interactive View
            </h1>
            <button
              onClick={() => window.history.back()}
              className="px-6 py-2 bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-white rounded-lg border border-cyan-500/30 shadow-lg shadow-cyan-500/20 transition-all duration-300"
            >
              ← Back
            </button>
          </div>
          
          <div className="bg-gradient-to-br from-gray-900/50 via-black/50 to-gray-900/50 border-2 border-cyan-500/30 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/20" style={{ height: '70vh' }}>
            <Canvas shadows>
              <ClassroomScene pcData={pcData} onPCClick={handlePCClick} />
            </Canvas>
          </div>
          
          <div className="mt-6 flex gap-6 justify-center">
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-900/50 rounded-lg border border-green-500/30">
              <div className="w-4 h-4 bg-green-500 rounded-full shadow-lg shadow-green-500/50 animate-pulse"></div>
              <span className="text-gray-300 font-medium">Available</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-900/50 rounded-lg border border-red-500/30">
              <div className="w-4 h-4 bg-red-500 rounded-full shadow-lg shadow-red-500/50 animate-pulse"></div>
              <span className="text-gray-300 font-medium">Issue Reported</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-900/50 rounded-lg border border-cyan-500/30">
              <div className="w-4 h-4 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50 animate-pulse"></div>
              <span className="text-gray-300 font-medium">Hover</span>
            </div>
          </div>
        </div>
      </div>

      <PCIssueModal
        isOpen={selectedPC !== null}
        onClose={() => setSelectedPC(null)}
        classroomName={`Classroom ${classroomNumber}`}
        pcNumber={selectedPC}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
