import { Link } from '../components/Router';
import { GlowCard } from '../components/ui/spotlight-card';

export default function ClassroomListPage() {
  const classrooms = Array.from({ length: 20 }, (_, i) => 301 + i);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black pt-20 px-4 pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
            Select Classroom
          </h1>
          <Link href="/locations" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            ← Back
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {classrooms.map((room) => (
            <Link key={room} href={`/classroom/${room}`}>
              <GlowCard customSize className="w-full h-32 flex items-center justify-center bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 hover:scale-105 transition-transform">
                <div className="text-center">
                  <div className="text-4xl mb-2">🏫</div>
                  <p className="text-gray-900 dark:text-white font-bold text-lg">Room {room}</p>
                </div>
              </GlowCard>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
