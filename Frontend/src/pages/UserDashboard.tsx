import { useState, useEffect } from 'react';
import { api } from '../utils/api';
import { Typewriter } from '../components/ui/typewriter-text';

interface Query {
  _id: string;
  locationType: string;
  locationId: string;
  itemType: string;
  itemNumber: number;
  query: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  adminResponse?: string;
}

export default function UserDashboard() {
  const [queries, setQueries] = useState<Query[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyQueries();
  }, []);

  const fetchMyQueries = async () => {
    try {
      const data = await api.getMyQueries();
      setQueries(data.queries);
    } catch (error) {
      console.error('Failed to fetch queries:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (date: string) => {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getLocationDisplay = (type: string, id: string) => {
    if (type === 'lab') {
      return `Lab ${id.replace('lab-', '')}`;
    }
    return `Classroom ${id}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black pt-20 flex items-center justify-center">
        <p className="text-gray-900 dark:text-white text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black pt-20 px-4 pb-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent mb-8">
          <Typewriter 
            text={["My Queries", "Track Your Reports", "View Status Updates"]}
            speed={80}
            deleteSpeed={50}
            delay={2000}
            loop={true}
          />
        </h1>

        <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 dark:bg-gray-900/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Location</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Item</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Query</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Submitted</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Admin Response</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {queries.map((query) => (
                  <tr key={query._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {getLocationDisplay(query.locationType, query.locationId)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {query.itemType} {query.itemNumber}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 max-w-md">{query.query}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{formatDateTime(query.createdAt)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        query.status === 'resolved' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                        query.status === 'in-progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}>
                        {query.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {query.adminResponse ? (
                        <div className="bg-gray-100 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded p-2">
                          {query.adminResponse}
                        </div>
                      ) : (
                        <span className="text-gray-500 italic">No response yet</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {queries.length === 0 && (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              You haven't submitted any queries yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
