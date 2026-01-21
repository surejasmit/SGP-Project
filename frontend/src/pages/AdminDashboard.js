import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { labsAPI, issuesAPI } from '../services/api';
import { AlertCircle, CheckCircle, Clock, TrendingUp, BookOpen, Users, Settings, X, Eye, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalLabs: 0,
    totalIssues: 0,
    resolvedIssues: 0,
    pendingIssues: 0,
    labsWithIssues: 0
  });
  const [recentIssues, setRecentIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [labsResponse, issuesResponse] = await Promise.all([
        labsAPI.getAll(),
        issuesAPI.getAll()
      ]);

      const labs = labsResponse.data;
      const issues = issuesResponse.data;

      setStats({
        totalLabs: labs.length,
        totalIssues: issues.length,
        resolvedIssues: issues.filter(issue => issue.status === 'resolved').length,
        pendingIssues: issues.filter(issue => issue.status === 'open').length,
        labsWithIssues: labs.filter(lab => lab.status === 'issue').length
      });

      // Get recent issues (last 5)
      setRecentIssues(issues.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleResolveIssue = async (issueId) => {
    try {
      console.log('Resolving issue:', issueId);
      await issuesAPI.resolve(issueId);
      toast.success('Issue resolved successfully');
      fetchDashboardData(); // Refresh data
    } catch (error) {
      console.error('Error resolving issue:', error);
      toast.error('Failed to resolve issue');
    }
  };

  const IssueCard = ({ issue, onResolve }) => (
    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] animate-slide-up">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <div className="p-2 bg-blue-500/20 rounded-lg mr-3">
              <BookOpen className="h-4 w-4 text-blue-400" />
            </div>
            <h3 className="font-bold text-white">{issue.labId.labName}</h3>
          </div>
          <p className="text-gray-300 mb-3">{issue.description}</p>
          <div className="flex items-center text-sm text-gray-400">
            <Users className="h-4 w-4 mr-2" />
            <span>Reported by: {issue.reportedBy.name}</span>
            <span className="mx-2">•</span>
            <Clock className="h-4 w-4 mr-2" />
            <span>{new Date(issue.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-bold ${
          issue.status === 'resolved'
            ? 'bg-green-500/20 text-green-400'
            : 'bg-yellow-500/20 text-yellow-400'
        }`}>
          {issue.status}
        </div>
      </div>

      {issue.status === 'open' && (
        <button
          onClick={() => onResolve(issue._id)}
          className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:shadow-green-500/25 transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
        >
          <Check className="h-5 w-5 mr-2" />
          Mark as Resolved
        </button>
      )}
    </div>
  );

  const StatCard = ({ title, value, icon: Icon, color, bgColor }) => (
    <div className={`card p-6 ${bgColor}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-3xl font-bold ${color}`}>{value}</p>
        </div>
        <Icon className={`h-8 w-8 ${color}`} />
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-8 px-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="text-center mb-8 animate-slide-up">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
            Admin Dashboard
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Monitor system health, manage facilities, and resolve reported issues.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <TrendingUp className="h-6 w-6 text-blue-400 opacity-60" />
            </div>
            <div>
              <p className="text-4xl font-bold text-white mb-2">{stats.totalLabs}</p>
              <p className="text-gray-300 font-medium">Total Facilities</p>
              <div className="mt-3 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/20 animate-slide-up" style={{ animationDelay: '150ms' }}>
            <div className="flex items-center justify-between mb-6">
              <div className="p-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-xl">
                <AlertCircle className="h-8 w-8 text-white" />
              </div>
              <Clock className="h-6 w-6 text-orange-400 opacity-60" />
            </div>
            <div>
              <p className="text-4xl font-bold text-white mb-2">{stats.pendingIssues}</p>
              <p className="text-gray-300 font-medium">Pending Issues</p>
              <div className="mt-3 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20 animate-slide-up" style={{ animationDelay: '300ms' }}>
            <div className="flex items-center justify-between mb-6">
              <div className="p-4 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-xl">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <Check className="h-6 w-6 text-green-400 opacity-60" />
            </div>
            <div>
              <p className="text-4xl font-bold text-white mb-2">{stats.resolvedIssues}</p>
              <p className="text-gray-300 font-medium">Resolved Issues</p>
              <div className="mt-3 h-1 bg-gradient-to-r from-green-500 to-green-600 rounded-full"></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 animate-slide-up" style={{ animationDelay: '450ms' }}>
            <div className="flex items-center justify-between mb-6">
              <div className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-xl">
                <Users className="h-8 w-8 text-white" />
              </div>
              <Settings className="h-6 w-6 text-purple-400 opacity-60" />
            </div>
            <div>
              <p className="text-4xl font-bold text-white mb-2">1</p>
              <p className="text-gray-300 font-medium">Administrators</p>
              <div className="mt-3 h-1 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Issues Management Section */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl mr-4">
                <AlertCircle className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Issue Management</h2>
                <p className="text-gray-400">Monitor and resolve reported facility issues</p>
              </div>
            </div>
            <Link
              to="/issues"
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 flex items-center"
            >
              <Eye className="h-5 w-5 mr-2" />
              View All Issues
            </Link>
          </div>

          {recentIssues.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {recentIssues.map((issue, index) => (
                <div key={issue._id} style={{ animationDelay: `${index * 150}ms` }}>
                  <IssueCard issue={issue} onResolve={handleResolveIssue} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-12 w-12 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">All Clear!</h3>
              <p className="text-gray-400 max-w-md mx-auto">
                No pending issues at the moment. All facilities are operating normally.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;