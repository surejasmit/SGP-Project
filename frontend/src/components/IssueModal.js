import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { issuesAPI } from '../services/api';
import { Monitor, Lightbulb, Fan, Tv, X, AlertTriangle, AlertCircle, BookOpen, User } from 'lucide-react';
import toast from 'react-hot-toast';

const IssueModal = ({ lab, onClose, onSubmit }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    equipmentType: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);

  const equipmentOptions = [
    {
      value: 'computers',
      label: 'Computers',
      icon: Monitor,
      available: lab.equipment.computers > 0
    },
    {
      value: 'lights',
      label: 'Lights',
      icon: Lightbulb,
      available: lab.equipment.lights > 0
    },
    {
      value: 'fans',
      label: 'Fans',
      icon: Fan,
      available: lab.equipment.fans > 0
    },
    {
      value: 'smartBoard',
      label: 'Smart Board',
      icon: Tv,
      available: lab.equipment.smartBoard
    }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.equipmentType || !formData.description.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      await issuesAPI.create({
        labId: lab._id,
        equipmentType: formData.equipmentType,
        description: formData.description.trim()
      });

      toast.success('Issue reported successfully!');
      onSubmit();
    } catch (error) {
      console.error('Error reporting issue:', error);
      toast.error('Failed to report issue. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay animate-fade-in">
      <div className="modal-content max-w-lg w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-dark-600">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-danger-100 dark:bg-danger-900/20 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-danger-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Report Issue</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Help us fix equipment problems</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-800 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Lab Info */}
          <div className="bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl p-4 border border-primary-100 dark:border-primary-800/30">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
                <BookOpen className="h-4 w-4 text-primary-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">{lab.labName}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{lab.type}</p>
              </div>
            </div>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <User className="h-4 w-4 mr-2" />
              Reported by: <span className="font-medium text-primary-600 dark:text-primary-400">{user?.name}</span>
            </div>
          </div>

          {/* Equipment Selection */}
          <div>
            <label className="label flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2 text-primary-500" />
              Select Faulty Equipment
            </label>
            <div className="grid grid-cols-2 gap-3">
              {equipmentOptions
                .filter(option => option.available)
                .map((option) => {
                  const Icon = option.icon;
                  const isSelected = formData.equipmentType === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, equipmentType: option.value })}
                      className={`group flex items-center p-4 border-2 rounded-xl transition-all duration-300 hover:scale-105 ${
                        isSelected
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 shadow-lg ring-2 ring-primary-500/20'
                          : 'border-gray-200 dark:border-dark-600 bg-white dark:bg-dark-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-700 hover:border-primary-300 dark:hover:border-primary-600'
                      }`}
                    >
                      <div className={`p-2 rounded-lg mr-3 transition-colors ${
                        isSelected
                          ? 'bg-primary-100 dark:bg-primary-900/30'
                          : 'bg-gray-100 dark:bg-dark-700 group-hover:bg-primary-50 dark:group-hover:bg-primary-900/20'
                      }`}>
                        <Icon className={`h-5 w-5 transition-colors ${
                          isSelected ? 'text-primary-600' : 'text-gray-600 dark:text-gray-400'
                        }`} />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold">{option.label}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Available</p>
                      </div>
                    </button>
                  );
                })}
            </div>
            {!formData.equipmentType && (
              <p className="mt-2 text-sm text-danger-600 flex items-center">
                <AlertTriangle className="w-4 h-4 mr-1" />
                Please select the faulty equipment type
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="label flex items-center">
              <AlertCircle className="w-4 h-4 mr-2 text-primary-500" />
              Problem Description
            </label>
            <div className="relative">
              <textarea
                id="description"
                name="description"
                rows={4}
                className="input w-full resize-none focus:ring-primary-500 focus:border-primary-500 pr-12"
                placeholder="Please describe the issue in detail. Include what you observed, when it started, and any other relevant information..."
                value={formData.description}
                onChange={handleChange}
                required
              />
              <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                {formData.description.length}/500
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 flex items-start">
              <AlertCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
              <span>Provide detailed information to help our technical team resolve the issue quickly and efficiently.</span>
            </p>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-6 border-t border-gray-200 dark:border-dark-600">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 btn-secondary py-3 font-semibold"
              disabled={loading}
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 btn-danger py-3 font-semibold shadow-xl hover:shadow-2xl hover:shadow-danger-500/25"
              disabled={loading || !formData.equipmentType || !formData.description.trim()}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="spinner w-5 h-5 mr-3 border-white"></div>
                  Submitting...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Report Issue
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IssueModal;