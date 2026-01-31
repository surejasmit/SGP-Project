import { useState, useEffect } from 'react';
import { api } from '../utils/api';
import { StarButton } from '../components/ui/star-button';
import { Typewriter } from '../components/ui/typewriter-text';

interface Query {
  _id: string;
  userName: string;
  locationType: string;
  locationId: string;
  itemType: string;
  itemNumber: number;
  query: string;
  status: string;
  createdAt: string;
  adminResponse?: string;
}

export default function AdminDashboard() {
  const [queries, setQueries] = useState<Query[]>([]);
  const [loading, setLoading] = useState(true);
  const [responses, setResponses] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    try {
      const data = await api.getAllQueries();
      setQueries(data.queries);
    } catch (error) {
      console.error('Failed to fetch queries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSolve = async (id: string) => {
    try {
      const adminResponse = responses[id] || '';
      await api.updateQueryStatus(id, 'resolved', adminResponse);
      fetchQueries();
      setResponses({ ...responses, [id]: '' });
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handleResponseChange = (id: string, value: string) => {
    setResponses({ ...responses, [id]: value });
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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-20 flex items-center justify-center">
        <p className="text-white text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-20 px-4 pb-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent mb-8">
          <Typewriter 
            text={["Admin Workplace", "Query Management", "Resolve Issues"]}
            speed={80}
            deleteSpeed={50}
            delay={2000}
            loop={true}
          />
        </h1>

        <div className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Username</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Location</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Item</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Query</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Date & Time</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Response</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {queries.map((query) => (
                  <tr key={query._id} className="hover:bg-gray-700/30">
                    <td className="px-6 py-4 text-sm text-white font-medium">{query.userName}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {getLocationDisplay(query.locationType, query.locationId)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {query.itemType} {query.itemNumber}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300 max-w-xs truncate">{query.query}</td>
                    <td className="px-6 py-4 text-sm text-gray-400">{formatDateTime(query.createdAt)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        query.status === 'resolved' ? 'bg-green-900/30 text-green-400' :
                        query.status === 'in-progress' ? 'bg-blue-900/30 text-blue-400' :
                        'bg-yellow-900/30 text-yellow-400'
                      }`}>
                        {query.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {query.status !== 'resolved' ? (
                        <textarea
                          value={responses[query._id] || ''}
                          onChange={(e) => handleResponseChange(query._id, e.target.value)}
                          placeholder="Write response to user..."
                          rows={2}
                          className="w-full px-2 py-1 bg-gray-900 border border-gray-600 rounded text-white text-sm placeholder-gray-500 focus:outline-none focus:border-gray-400"
                        />
                      ) : (
                        <span className="text-gray-400 text-sm">{query.adminResponse || 'Resolved'}</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {query.status !== 'resolved' && (
                        <StarButton
                          onClick={() => handleSolve(query._id)}
                          lightColor="#10b981"
                          className="h-auto py-1 px-4 text-sm"
                        >
                          Solve
                        </StarButton>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {queries.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              No queries submitted yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
