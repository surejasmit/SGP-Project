import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { labsAPI, issuesAPI } from '../services/api';
import { AlertCircle, CheckCircle, Clock, TrendingUp, BookOpen, Users, Zap, Target } from 'lucide-react';
import toast from 'react-hot-toast';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalLabs: 0,
    totalIssues: 0,
    resolvedIssues: 0,
    pendingIssues: 0
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

      // Filter issues reported by current user
      const userIssues = issues.filter(issue => issue.reportedBy._id === user._id);

      setStats({
        totalLabs: labs.length,
        totalIssues: userIssues.length,
        resolvedIssues: userIssues.filter(issue => issue.status === 'resolved').length,
        pendingIssues: userIssues.filter(issue => issue.status === 'open').length
      });

      // Get recent issues (last 5)
      setRecentIssues(userIssues.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 fade-in">
      {/* Welcome Section */}
      <div className="card-elevated p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-400/10 to-primary-600/10 rounded-full blur-2xl"></div>
        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-4">
            <div className="avatar avatar-lg animate-bounce-slow">
              <Users className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Track and manage your lab equipment issues
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
              <span>System Online</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Last updated: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="stats-card group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <TrendingUp className="h-5 w-5 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stats.totalLabs}</p>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Labs Available</p>
            <div className="mt-2 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
          </div>
        </div>

        <div className="stats-card group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg">
              <AlertCircle className="h-6 w-6 text-white" />
            </div>
            <Target className="h-5 w-5 text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stats.totalIssues}</p>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">My Total Issues</p>
            <div className="mt-2 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
          </div>
        </div>

        <div className="stats-card group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <Zap className="h-5 w-5 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stats.resolvedIssues}</p>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Issues Resolved</p>
            <div className="mt-2 h-1 bg-gradient-to-r from-green-500 to-green-600 rounded-full"></div>
          </div>
        </div>

        <div className="stats-card group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <AlertCircle className="h-5 w-5 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stats.pendingIssues}</p>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Issues</p>
            <div className="mt-2 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Issues */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg">
                <AlertCircle className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Issues</h2>
            </div>
            <Link
              to="/labs"
              className="btn-ghost text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
            >
              View all →
            </Link>
          </div>

          {recentIssues.length > 0 ? (
            <div className="space-y-3">
              {recentIssues.map((issue, index) => (
                <div
                  key={issue._id}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white dark:from-dark-800 dark:to-dark-700 rounded-xl border border-gray-100 dark:border-dark-600 hover:shadow-md transition-all duration-200 hover:scale-[1.02] animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 dark:text-white">{issue.labId.labName}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 capitalize flex items-center">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mr-2"></div>
                      {issue.equipmentType}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {issue.status === 'resolved' ? (
                      <badge-success>
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Resolved
                      </badge-success>
                    ) : (
                      <badge-warning>
                        <Clock className="w-3 h-3 mr-1" />
                        Pending
                      </badge-warning>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-dark-700 dark:to-dark-600 rounded-2xl flex items-center justify-center mb-4">
                <AlertCircle className="h-8 w-8 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No issues reported yet</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Start by exploring available labs and report any equipment issues you find.
              </p>
              <Link
                to="/labs"
                className="btn-primary inline-flex items-center"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Browse Labs
              </Link>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="card p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-success-500 to-success-600 rounded-lg">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Actions</h2>
          </div>

          <div className="space-y-4">
            <Link
              to="/labs"
              className="group flex items-center p-4 bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 border border-primary-100 dark:border-primary-800/30"
            >
              <div className="p-3 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-200">
                <AlertCircle className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-700 dark:group-hover:text-primary-300">Report an Issue</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Browse labs and report equipment problems</p>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <TrendingUp className="h-4 w-4 text-primary-600" />
              </div>
            </Link>

            <div className="flex items-center p-4 bg-gradient-to-r from-gray-50 to-white dark:from-dark-800 dark:to-dark-700 rounded-xl border border-gray-100 dark:border-dark-600">
              <div className="p-3 bg-gradient-to-br from-warning-500 to-warning-600 rounded-lg mr-4">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 dark:text-white">Issue Statistics</p>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="flex items-center text-success-600 dark:text-success-400">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {stats.resolvedIssues} resolved
                  </span>
                  <span className="flex items-center text-warning-600 dark:text-warning-400">
                    <Clock className="w-3 h-3 mr-1" />
                    {stats.pendingIssues} pending
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center p-4 bg-gradient-to-r from-gray-50 to-white dark:from-dark-800 dark:to-dark-700 rounded-xl border border-gray-100 dark:border-dark-600">
              <div className="avatar mr-4">
                <Users className="text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 dark:text-white">Account Details</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{user?.email}</p>
                <div className="flex items-center mt-1">
                  <div className="w-2 h-2 bg-success-500 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-xs text-success-600 dark:text-success-400 font-medium">Active Student</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;