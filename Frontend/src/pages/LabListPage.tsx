import { Link } from '../components/Router';
import { GlowCard } from '@/components/ui/spotlight-card';

export default function LabListPage() {
  const labs = Array.from({ length: 15 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-gray-50 to-indigo-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black pt-20 px-4 pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
            Select a Lab
          </h1>
          <Link href="/locations" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            ← Back
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {labs.map((labNum) => (
            <Link key={labNum} href={`/lab/${labNum}`}>
              <GlowCard className="h-40 flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-white to-purple-50 dark:bg-gray-800/50 border border-purple-200 dark:border-gray-700 shadow-lg">
                <div className="text-4xl mb-2">🔬</div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Lab {labNum}</h2>
              </GlowCard>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
