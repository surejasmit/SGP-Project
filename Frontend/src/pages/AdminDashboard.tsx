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
      <div className="min-h-screen bg-gray-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black pt-20 flex items-center justify-center">
        <p className="text-gray-900 dark:text-white text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-indigo-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black pt-20 px-4 pb-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent mb-8">
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
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Total Queries</h3>
              <p className="text-3xl font-bold">{stats.totalQueries}</p>
              <p className="text-blue-100 text-sm mt-1">{getFilterLabel()}</p>
            </div>
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 dark:from-yellow-600 dark:to-yellow-700 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Pending</h3>
              <p className="text-3xl font-bold">{stats.pendingQueries}</p>
              <p className="text-yellow-100 text-sm mt-1">Awaiting response</p>
            </div>
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">In Progress</h3>
              <p className="text-3xl font-bold">{stats.inProgressQueries}</p>
              <p className="text-orange-100 text-sm mt-1">Being worked on</p>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Resolved</h3>
              <p className="text-3xl font-bold">{stats.resolvedQueries}</p>
              <p className="text-green-100 text-sm mt-1">Completed</p>
            </div>
          </div>
        )}

        {/* Filter Controls */}
        <div className="bg-gradient-to-r from-white to-blue-50 dark:bg-gray-800/50 border border-blue-200 dark:border-gray-700 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Filter Queries</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Date Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Time Period
              </label>
              <select
                value={filterType}
                onChange={(e) => handleFilterChange(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-gray-400"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-gray-400"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="flex items-end">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2 h-fit">
                <span className="text-sm text-gray-600 dark:text-gray-400">Results: </span>
                <span className="font-semibold text-gray-900 dark:text-white">{queries.length}</span>
              </div>
            </div>
          </div>

          {/* Custom Date Range */}
          {showCustomDate && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-gray-400"
                />
              </div>
            </div>
          )}
        </div>

        {/* Queries Table */}
        <div className="bg-gradient-to-r from-white to-blue-50 dark:bg-gray-800/50 border border-blue-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-lg">
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Queries {getFilterLabel() !== 'All Time' && `- ${getFilterLabel()}`}
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 dark:bg-gray-900/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Username</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Location</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Item</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Query</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Date & Time</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Response</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {queries.map((query) => (
                  <tr key={query._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white font-medium">{query.userName}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {getLocationDisplay(query.locationType, query.locationId)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {query.itemType} {query.itemNumber}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 max-w-xs truncate">{query.query}</td>
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
                    <td className="px-6 py-4">
                      {query.status !== 'resolved' ? (
                        <textarea
                          value={responses[query._id] || ''}
                          onChange={(e) => handleResponseChange(query._id, e.target.value)}
                          placeholder="Write response to user..."
                          rows={2}
                          className="w-full px-2 py-1 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 dark:focus:border-gray-400"
                        />
                      ) : (
                        <span className="text-gray-500 dark:text-gray-400 text-sm">{query.adminResponse || 'Resolved'}</span>
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
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
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
