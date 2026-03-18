import { Link } from '../components/Router';
import { motion } from 'framer-motion';

export default function LocationsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pt-20 px-4 pb-8">
      <div className="max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-extrabold text-center mt-16 mb-4 text-foreground"
        >
          Select Location Type
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-foreground/60 text-center mb-16 text-lg"
        >
          Choose where you want to report an equipment issue
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col md:flex-row gap-8 justify-center"
        >
          <Link href="/classrooms">
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
              className="relative bg-background rounded-2xl p-12 cursor-pointer border border-foreground/10 hover:border-foreground/30 transition-colors"
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-20 h-20 bg-yellow-400/90 rounded-full flex items-center justify-center text-4xl">
                🏫
              </div>
              <div className="pt-8">
                <h2 className="text-3xl font-bold text-foreground text-center mb-2">Classrooms</h2>
                <p className="text-foreground/60 text-center">20 Classrooms (301-320)</p>
              </div>
            </motion.div>
          </Link>
          
          <Link href="/labs">
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
              className="relative bg-background rounded-2xl p-12 cursor-pointer border border-foreground/10 hover:border-foreground/30 transition-colors"
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-20 h-20 bg-yellow-400/90 rounded-full flex items-center justify-center text-4xl">
                🔬
              </div>
              <div className="pt-8">
                <h2 className="text-3xl font-bold text-foreground text-center mb-2">Labs</h2>
                <p className="text-foreground/60 text-center">15 Labs Available</p>
              </div>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
