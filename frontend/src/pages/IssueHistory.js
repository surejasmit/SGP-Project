import React, { useState, useEffect } from 'react';
import { issuesAPI } from '../services/api';
import { CheckCircle, Calendar, User, MapPin, Search, Filter } from 'lucide-react';
import toast from 'react-hot-toast';

const IssueHistory = () => {
  const [issues, setIssues] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [equipmentFilter, setEquipmentFilter] = useState('all');

  useEffect(() => {
    fetchResolvedIssues();
  }, []);

  useEffect(() => {
    filterIssues();
  }, [issues, searchTerm, equipmentFilter]);

  const fetchResolvedIssues = async () => {
    try {
      const response = await issuesAPI.getResolved();
      setIssues(response.data);
    } catch (error) {
      console.error('Error fetching resolved issues:', error);
      toast.error('Failed to load issue history');
    } finally {
      setLoading(false);
    }
  };

  const filterIssues = () => {
    let filtered = issues;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(issue =>
        issue.labId.labName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.reportedBy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Equipment filter
    if (equipmentFilter !== 'all') {
      filtered = filtered.filter(issue => issue.equipmentType === equipmentFilter);
    }

    setFilteredIssues(filtered);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEquipmentLabel = (type) => {
    const labels = {
      computers: 'Computers',
      lights: 'Lights',
      fans: 'Fans',
      smartBoard: 'Smart Board'
    };
    return labels[type] || type;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Issue History</h1>
        <p className="text-gray-600 mt-1">
          View all resolved issues and their details
        </p>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search issues..."
                className="input pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Equipment Filter */}
          <div className="sm:w-48">
            <select
              className="input w-full"
              value={equipmentFilter}
              onChange={(e) => setEquipmentFilter(e.target.value)}
            >
              <option value="all">All Equipment</option>
              <option value="computers">Computers</option>
              <option value="lights">Lights</option>
              <option value="fans">Fans</option>
              <option value="smartBoard">Smart Board</option>
            </select>
          </div>
        </div>
      </div>

      {/* Issues List */}
      {filteredIssues.length > 0 ? (
        <div className="space-y-4">
          {filteredIssues.map((issue) => (
            <div key={issue._id} className="card p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {issue.labId.labName}
                      </h3>
                      <p className="text-sm text-gray-600 capitalize">
                        {issue.labId.type} • {getEquipmentLabel(issue.equipmentType)}
                      </p>
                    </div>
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="h-5 w-5 mr-1" />
                      <span className="text-sm font-medium">Resolved</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 mb-4">{issue.description}</p>

                  {/* Details */}
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      Reported by: {issue.reportedBy.name}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Reported: {formatDate(issue.createdAt)}
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Resolved: {formatDate(issue.resolvedAt)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <CheckCircle className="mx-auto h-12 w-12 text-green-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            {issues.length === 0 ? 'No resolved issues yet' : 'No issues match your filters'}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {issues.length === 0
              ? 'Resolved issues will appear here once they are marked as resolved.'
              : 'Try adjusting your search or filter criteria.'
            }
          </p>
        </div>
      )}

      {/* Summary */}
      {issues.length > 0 && (
        <div className="card p-4">
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Showing {filteredIssues.length} of {issues.length} resolved issues
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default IssueHistory;