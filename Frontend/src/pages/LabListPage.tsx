import { Link } from '../components/Router';
import { motion } from 'framer-motion';

export default function LabListPage() {
  const labs = Array.from({ length: 15 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-background text-foreground pt-20 px-4 pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-foreground">
            Select a Lab
          </h1>
          <Link href="/locations" className="text-sm font-medium tracking-widest text-foreground/60 hover:text-foreground transition-colors">
            ← Back
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {labs.map((labNum, index) => (
            <Link key={labNum} href={`/lab/${labNum}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04, duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
                className="h-40 flex flex-col items-center justify-center cursor-pointer bg-background border border-foreground/10 hover:border-foreground/30 rounded-xl transition-colors"
              >
                <div className="text-4xl mb-2">🔬</div>
                <h2 className="text-2xl font-bold text-foreground">Lab {labNum}</h2>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
