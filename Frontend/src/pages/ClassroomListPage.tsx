import { Link } from '../components/Router';
import { motion } from 'framer-motion';

export default function ClassroomListPage() {
  const classrooms = Array.from({ length: 20 }, (_, i) => 301 + i);

  return (
    <div className="min-h-screen bg-background text-foreground pt-20 px-4 pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-foreground">
            Select Classroom
          </h1>
          <Link href="/locations" className="text-sm font-medium tracking-widest text-foreground/60 hover:text-foreground transition-colors">
            ← Back
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {classrooms.map((room, index) => (
            <Link key={room} href={`/classroom/${room}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03, duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
                className="w-full h-32 flex flex-col items-center justify-center bg-background border border-foreground/10 hover:border-foreground/30 rounded-xl transition-colors cursor-pointer"
              >
                <div className="text-4xl mb-2">🏫</div>
                <p className="text-foreground font-bold text-lg">Room {room}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
