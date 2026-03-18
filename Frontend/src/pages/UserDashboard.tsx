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
      <div className="min-h-screen bg-background text-foreground pt-20 flex items-center justify-center">
        <p className="text-foreground text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pt-20 px-4 pb-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-8">
          <Typewriter 
            text={["My Queries", "Track Your Reports", "View Status Updates"]}
            speed={80}
            deleteSpeed={50}
            delay={2000}
            loop={true}
          />
        </h1>

        <div className="bg-background border border-foreground/10 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-foreground/10">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium tracking-widest text-foreground/60 uppercase">Location</th>
                  <th className="px-6 py-4 text-left text-xs font-medium tracking-widest text-foreground/60 uppercase">Item</th>
                  <th className="px-6 py-4 text-left text-xs font-medium tracking-widest text-foreground/60 uppercase">Query</th>
                  <th className="px-6 py-4 text-left text-xs font-medium tracking-widest text-foreground/60 uppercase">Submitted</th>
                  <th className="px-6 py-4 text-left text-xs font-medium tracking-widest text-foreground/60 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium tracking-widest text-foreground/60 uppercase">Admin Response</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-foreground/5">
                {queries.map((query) => (
                  <tr key={query._id} className="hover:bg-foreground/[0.03]">
                    <td className="px-6 py-4 text-sm text-foreground/80">
                      {getLocationDisplay(query.locationType, query.locationId)}
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground/80">
                      {query.itemType} {query.itemNumber}
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground/80 max-w-md">{query.query}</td>
                    <td className="px-6 py-4 text-sm text-foreground/60">{formatDateTime(query.createdAt)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        query.status === 'resolved' ? 'border-foreground/20 text-foreground/70' :
                        query.status === 'in-progress' ? 'border-yellow-500/30 text-yellow-600 dark:text-yellow-400' :
                        'border-foreground/20 text-foreground/60'
                      }`}>
                        {query.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground/80">
                      {query.adminResponse ? (
                        <div className="bg-foreground/5 border border-foreground/10 rounded p-2">
                          {query.adminResponse}
                        </div>
                      ) : (
                        <span className="text-foreground/40 italic">No response yet</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {queries.length === 0 && (
            <div className="text-center py-12 text-foreground/40">
              You haven't submitted any queries yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
