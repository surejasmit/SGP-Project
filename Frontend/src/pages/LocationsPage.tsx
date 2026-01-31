import { Link } from '../components/Router';
import { motion } from 'framer-motion';
import { LampContainer } from '@/components/ui/lamp';

export default function LocationsPage() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-white to-gray-300 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        Select Location Type
      </motion.h1>
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.5,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="flex flex-col md:flex-row gap-8 mt-8"
      >
        <Link href="/classrooms">
          <div className="group relative bg-gradient-to-br from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 rounded-2xl p-12 cursor-pointer transition-all duration-300 border-2 border-gray-500 hover:border-gray-400 hover:scale-105">
            <div className="text-6xl mb-4 text-center">🏫</div>
            <h2 className="text-3xl font-bold text-white text-center mb-2">Classrooms</h2>
            <p className="text-gray-200 text-center">20 Classrooms (301-320)</p>
          </div>
        </Link>
        
        <Link href="/labs">
          <div className="group relative bg-gradient-to-br from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 rounded-2xl p-12 cursor-pointer transition-all duration-300 border-2 border-gray-500 hover:border-gray-400 hover:scale-105">
            <div className="text-6xl mb-4 text-center">🔬</div>
            <h2 className="text-3xl font-bold text-white text-center mb-2">Labs</h2>
            <p className="text-gray-200 text-center">15 Labs Available</p>
          </div>
        </Link>
      </motion.div>
    </LampContainer>
  );
}
