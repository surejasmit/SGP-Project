import { useState, useEffect } from 'react';
import { api } from '../utils/api';
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

interface DashboardStats {
  totalQueries: number;
  pendingQueries: number;
  resolvedQueries: number;
  inProgressQueries: number;
  totalUsers: number;
}

export default function AdminDashboard() {
  const [queries, setQueries] = useState<Query[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [responses, setResponses] = useState<{ [key: string]: string }>({});
  
  // Filter states
  const [filterType, setFilterType] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showCustomDate, setShowCustomDate] = useState(false);

  useEffect(() => {
    fetchData();
  }, [filterType, statusFilter, startDate, endDate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const filters = {
        filterType,
        status: statusFilter,
        ...(filterType === 'custom' && { startDate, endDate })
      };
      
      const [queriesData, statsData] = await Promise.all([
        api.getAllQueries(filters),
        api.getDashboardStats(filters)
      ]);
      
      setQueries(queriesData.queries);
      setStats(statsData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilterType: string) => {
    setFilterType(newFilterType);
    setShowCustomDate(newFilterType === 'custom');
    if (newFilterType !== 'custom') {
      setStartDate('');
      setEndDate('');
    }
  };

  const handleSolve = async (id: string) => {
    try {
      const adminResponse = responses[id] || '';
      await api.updateQueryStatus(id, 'resolved', adminResponse);
      fetchData();
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

  const getFilterLabel = () => {
    switch (filterType) {
      case 'today': return 'Today';
      case 'week': return 'This Week';
      case 'month': return 'This Month';
      case 'year': return 'This Year';
      case 'custom': return 'Custom Range';
      default: return 'All Time';
    }
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
            text={["Admin Workplace", "Query Management", "Resolve Issues"]}
            speed={80}
            deleteSpeed={50}
            delay={2000}
            loop={true}
          />
        </h1>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-background border border-foreground/10 rounded-xl p-6">
              <h3 className="text-sm font-medium tracking-widest text-foreground/60 mb-2">Total Queries</h3>
              <p className="text-3xl font-bold text-foreground">{stats.totalQueries}</p>
              <p className="text-foreground/40 text-sm mt-1">{getFilterLabel()}</p>
            </div>
            <div className="bg-background border border-foreground/10 rounded-xl p-6">
              <h3 className="text-sm font-medium tracking-widest text-foreground/60 mb-2">Pending</h3>
              <p className="text-3xl font-bold text-yellow-500">{stats.pendingQueries}</p>
              <p className="text-foreground/40 text-sm mt-1">Awaiting response</p>
            </div>
            <div className="bg-background border border-foreground/10 rounded-xl p-6">
              <h3 className="text-sm font-medium tracking-widest text-foreground/60 mb-2">In Progress</h3>
              <p className="text-3xl font-bold text-foreground">{stats.inProgressQueries}</p>
              <p className="text-foreground/40 text-sm mt-1">Being worked on</p>
            </div>
            <div className="bg-background border border-foreground/10 rounded-xl p-6">
              <h3 className="text-sm font-medium tracking-widest text-foreground/60 mb-2">Resolved</h3>
              <p className="text-3xl font-bold text-foreground">{stats.resolvedQueries}</p>
              <p className="text-foreground/40 text-sm mt-1">Completed</p>
            </div>
          </div>
        )}

        {/* Filter Controls */}
        <div className="bg-background border border-foreground/10 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Filter Queries</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground/60 mb-2">
                Time Period
              </label>
              <select
                value={filterType}
                onChange={(e) => handleFilterChange(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-foreground/20 rounded-lg text-foreground focus:outline-none focus:border-foreground/50"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground/60 mb-2">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-foreground/20 rounded-lg text-foreground focus:outline-none focus:border-foreground/50"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>

            <div className="flex items-end">
              <div className="bg-foreground/5 rounded-lg px-4 py-2 h-fit">
                <span className="text-sm text-foreground/60">Results: </span>
                <span className="font-semibold text-foreground">{queries.length}</span>
              </div>
            </div>
          </div>

          {showCustomDate && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-foreground/10">
              <div>
                <label className="block text-sm font-medium text-foreground/60 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-foreground/20 rounded-lg text-foreground focus:outline-none focus:border-foreground/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/60 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-foreground/20 rounded-lg text-foreground focus:outline-none focus:border-foreground/50"
                />
              </div>
            </div>
          )}
        </div>

        {/* Queries Table */}
        <div className="bg-background border border-foreground/10 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-foreground/10">
            <h2 className="text-lg font-semibold text-foreground">
              Queries {getFilterLabel() !== 'All Time' && `- ${getFilterLabel()}`}
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-foreground/10">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium tracking-widest text-foreground/60 uppercase">Username</th>
                  <th className="px-6 py-4 text-left text-xs font-medium tracking-widest text-foreground/60 uppercase">Location</th>
                  <th className="px-6 py-4 text-left text-xs font-medium tracking-widest text-foreground/60 uppercase">Item</th>
                  <th className="px-6 py-4 text-left text-xs font-medium tracking-widest text-foreground/60 uppercase">Query</th>
                  <th className="px-6 py-4 text-left text-xs font-medium tracking-widest text-foreground/60 uppercase">Date & Time</th>
                  <th className="px-6 py-4 text-left text-xs font-medium tracking-widest text-foreground/60 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium tracking-widest text-foreground/60 uppercase">Response</th>
                  <th className="px-6 py-4 text-left text-xs font-medium tracking-widest text-foreground/60 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-foreground/5">
                {queries.map((query) => (
                  <tr key={query._id} className="hover:bg-foreground/[0.03]">
                    <td className="px-6 py-4 text-sm text-foreground font-medium">{query.userName}</td>
                    <td className="px-6 py-4 text-sm text-foreground/80">
                      {getLocationDisplay(query.locationType, query.locationId)}
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground/80">
                      {query.itemType} {query.itemNumber}
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground/80 max-w-xs truncate">{query.query}</td>
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
                    <td className="px-6 py-4">
                      {query.status !== 'resolved' ? (
                        <textarea
                          value={responses[query._id] || ''}
                          onChange={(e) => handleResponseChange(query._id, e.target.value)}
                          placeholder="Write response to user..."
                          rows={2}
                          className="w-full px-2 py-1 bg-background border border-foreground/20 rounded text-foreground text-sm placeholder-foreground/40 focus:outline-none focus:border-foreground/50"
                        />
                      ) : (
                        <span className="text-foreground/60 text-sm">{query.adminResponse || 'Resolved'}</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {query.status !== 'resolved' && (
                        <button
                          onClick={() => handleSolve(query._id)}
                          className="px-4 py-1 text-sm rounded-full border border-foreground/20 bg-foreground text-background font-medium hover:bg-foreground/90 transition-all"
                        >
                          Solve
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {queries.length === 0 && (
            <div className="text-center py-12 text-foreground/40">
              {filterType === 'all' && statusFilter === 'all' 
                ? 'No queries submitted yet' 
                : `No queries found for the selected filters`
              }
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
