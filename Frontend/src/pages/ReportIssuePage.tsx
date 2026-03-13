import { Link, useRouter } from '../components/Router';
import { StarButton } from '../components/ui/star-button';
import { useState } from 'react';
import { api } from '../utils/api';

export default function ReportIssuePage() {
  const { path } = useRouter();
  const pathParts = path.split('/');
  const roomId = pathParts[2] || '301';
  const itemInfo = pathParts[3] || 'PC-1';
  const [itemType, itemNumber] = itemInfo.split('-');
  
  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Determine location type
  const isLab = roomId.startsWith('lab-');
  const locationType = isLab ? 'lab' : 'classroom';
  const locationId = roomId;
  const displayName = isLab ? `Lab ${roomId.replace('lab-', '')}` : `Classroom ${roomId}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.submitQuery({
        locationType,
        locationId,
        itemType,
        itemNumber: parseInt(itemNumber),
        query
      });
      
      setSubmitted(true);
      setTimeout(() => {
        window.location.href = '/locations';
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to submit query');
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">✓</div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Issue Reported Successfully!</h2>
          <p className="text-gray-600 dark:text-gray-400">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black pt-20 px-4 pb-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
            Report Issue
          </h1>
          <Link href={isLab ? `/lab/${roomId.replace('lab-', '')}` : `/classroom/${roomId}`} className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            ← Back
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-8 shadow-sm">
          <div className="mb-6">
            <p className="text-gray-600 dark:text-gray-400 mb-2">Location:</p>
            <p className="text-gray-900 dark:text-white text-xl font-semibold">{displayName} - {itemType} {itemNumber}</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-600 rounded-lg">
              <p className="text-red-700 dark:text-red-400">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-900 dark:text-white mb-2 font-semibold">
                Describe the Issue *
              </label>
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                required
                rows={6}
                placeholder={`Please describe the problem with this ${itemType}...`}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 dark:focus:border-gray-400"
              />
            </div>

            <StarButton
              type="submit"
              lightColor="#ffffff"
              className="w-full h-12"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Issue Report'}
            </StarButton>
          </form>
        </div>
      </div>
    </div>
  );
}
