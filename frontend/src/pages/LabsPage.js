import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { labsAPI, issuesAPI } from '../services/api';
import { Monitor, Lightbulb, Fan, Tv, AlertTriangle, CheckCircle, BookOpen, AlertCircle, X, Upload, Send, Camera, Cpu, Zap, Sun, Wind } from 'lucide-react';
import toast from 'react-hot-toast';
import IssueModal from '../components/IssueModal';

const LabsPage = () => {
  const { user, isAuthenticated } = useAuth();
  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [showAssets, setShowAssets] = useState(false);
  const [showReportIssue, setShowReportIssue] = useState(false);
  const [issueForm, setIssueForm] = useState({
    equipmentType: 'general',
    description: '',
    image: null,
    imagePreview: null
  });
  const [submittingIssue, setSubmittingIssue] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) {
      fetchLabs();
    } else {
      setLoading(false);
      console.log('User not authenticated, cannot fetch facilities');
    }
  }, [isAuthenticated]);

  const fetchLabs = async () => {
    try {
      console.log('Fetching facilities...');
      const response = await labsAPI.getAll();
      console.log('Facilities response:', response.data);
      setLabs(response.data);
    } catch (error) {
      console.error('Error fetching facilities:', error);
      console.error('Error response:', error.response);
      toast.error('Failed to load facilities. Please try logging in again.');
      setLabs([]); // Ensure labs is empty on error
    } finally {
      setLoading(false);
    }
  };

  const handleFacilityClick = (facility) => {
    console.log('Facility clicked:', facility.labName);
    setSelectedFacility(facility);
    setShowAssets(true);
    setShowReportIssue(false);
    console.log('State after clicking facility - selectedFacility:', facility, 'showAssets:', true);
  };

  const handleCloseAssets = () => {
    setShowAssets(false);
    setSelectedFacility(null);
    setShowReportIssue(false);
  };

  const handleReportIssueClick = () => {
    console.log('Opening report issue modal for facility:', selectedFacility);
    console.log('Current state - showAssets:', showAssets, 'showReportIssue:', showReportIssue);
    setShowReportIssue(true);
    console.log('After setting - showReportIssue should be true');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setIssueForm(prev => ({
          ...prev,
          image: file,
          imagePreview: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitIssue = async () => {
    if (!issueForm.description.trim()) {
      toast.error('Please describe the issue');
      return;
    }

    setSubmittingIssue(true);
    try {
      console.log('Submitting issue for facility:', selectedFacility);
      console.log('Issue data:', {
        labId: selectedFacility._id,
        equipmentType: 'general',
        description: issueForm.description.trim()
      });

      const response = await issuesAPI.create({
        labId: selectedFacility._id,
        equipmentType: issueForm.equipmentType,
        description: issueForm.description.trim()
      });

      console.log('Issue created successfully:', response.data);
      toast.success('Issue reported successfully!');
      setIssueForm({ equipmentType: 'general', description: '', image: null, imagePreview: null });
      setShowReportIssue(false);
      setShowAssets(false);
      setSelectedFacility(null);
      fetchLabs();
    } catch (error) {
      console.error('Error reporting issue:', error);
      console.error('Error response:', error.response);
      toast.error('Failed to report issue: ' + (error.response?.data?.message || error.message));
    } finally {
      setSubmittingIssue(false);
    }
  };

  const FacilityCard = ({ facility, index }) => {
    const isIssue = facility.status === 'issue';
    const isLab = facility.type === 'Lab';

    return (
      <div
        className={`group relative overflow-hidden bg-gradient-to-br ${
          isLab
            ? 'from-blue-500/10 to-blue-600/10 hover:from-blue-500/20 hover:to-blue-600/20'
            : 'from-purple-500/10 to-purple-600/10 hover:from-purple-500/20 hover:to-purple-600/20'
        } backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-black/20 cursor-pointer animate-slide-up`}
        style={{ animationDelay: `${index * 150}ms` }}
        onClick={() => handleFacilityClick(facility)}
      >
        {/* Animated background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${
          isLab ? 'from-blue-600/5 to-cyan-600/5' : 'from-purple-600/5 to-pink-600/5'
        } opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

        {/* Floating particles effect */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-current opacity-30 rounded-full animate-ping" />
        <div className="absolute bottom-4 left-4 w-1 h-1 bg-current opacity-20 rounded-full animate-pulse" />

        {/* Status indicator */}
        <div className={`absolute top-6 right-6 w-4 h-4 rounded-full ${
          isIssue ? 'bg-red-500 shadow-red-500/50' : 'bg-green-500 shadow-green-500/50'
        } shadow-lg animate-pulse`} />

        <div className="relative z-10">
          {/* Icon and title */}
          <div className="flex items-center justify-between mb-6">
            <div className={`p-4 rounded-2xl ${
              isLab
                ? 'bg-gradient-to-br from-blue-500 to-blue-600'
                : 'bg-gradient-to-br from-purple-500 to-purple-600'
            } shadow-xl group-hover:scale-110 transition-transform duration-300`}>
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <div className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide ${
              isIssue
                ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                : 'bg-green-500/20 text-green-300 border border-green-500/30'
            }`}>
              {isIssue ? 'Issue' : 'Normal'}
            </div>
          </div>

          {/* Facility details */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-yellow-300 transition-colors duration-300">
              {facility.labName}
            </h3>
            <p className="text-gray-300 text-sm flex items-center">
              <span className={`inline-block w-3 h-3 rounded-full mr-3 ${
                isLab ? 'bg-blue-400' : 'bg-purple-400'
              }`} />
              {facility.type}
            </p>
          </div>

          {/* Equipment preview */}
          <div className="space-y-3 mb-6">
            {facility.equipment.computers > 0 && (
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-gray-300">
                  <Monitor className="h-4 w-4 mr-3 text-blue-400" />
                  <span>Computers</span>
                </div>
                <span className="font-bold text-white">{facility.equipment.computers}</span>
              </div>
            )}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center text-gray-300">
                <Lightbulb className="h-4 w-4 mr-3 text-yellow-400" />
                <span>Lights</span>
              </div>
              <span className="font-bold text-white">{facility.equipment.lights}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center text-gray-300">
                <Fan className="h-4 w-4 mr-3 text-green-400" />
                <span>Fans</span>
              </div>
              <span className="font-bold text-white">{facility.equipment.fans}</span>
            </div>
            {facility.equipment.smartBoard && (
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-gray-300">
                  <Tv className="h-4 w-4 mr-3 text-purple-400" />
                  <span>Smart Board</span>
                </div>
                <span className="font-bold text-white">✓</span>
              </div>
            )}
          </div>

          {/* Click prompt */}
          <div className="flex items-center justify-center pt-4 border-t border-white/10">
            <div className="flex items-center text-sm text-gray-400 group-hover:text-white transition-colors duration-300">
              <Zap className="h-4 w-4 mr-2 animate-pulse" />
              <span>Click to view assets</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AssetCard = ({ icon: Icon, title, count, color, bgColor, description }) => (
    <div className={`group relative overflow-hidden ${bgColor} backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-black/20 animate-slide-up`}>
      {/* Animated background */}
      <div className={`absolute inset-0 ${bgColor} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl ${color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-white">{count}</span>
        </div>

        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-300">{description}</p>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading facilities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-8 px-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="text-center mb-8 animate-slide-up">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
            College Facilities
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore our state-of-the-art labs and classrooms. Click on any facility to view its assets and report issues.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {labs.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 text-lg">
                {!isAuthenticated() ? 'Please log in to view facilities.' : 'No facilities found.'}
              </div>
            </div>
          ) : (
            labs.map((facility, index) => (
              <FacilityCard key={facility._id} facility={facility} index={index} />
            ))
          )}
        </div>
      </div>

      {/* Assets Modal */}
      {showAssets && selectedFacility && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-white/10">
            {/* Header */}
            <div className="flex items-center justify-between p-8 border-b border-white/10">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">{selectedFacility.labName}</h2>
                <p className="text-gray-400 flex items-center">
                  <span className={`inline-block w-3 h-3 rounded-full mr-3 ${
                    selectedFacility.type === 'Lab' ? 'bg-blue-400' : 'bg-purple-400'
                  }`} />
                  {selectedFacility.type}
                </p>
              </div>
              <button
                onClick={handleCloseAssets}
                className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors duration-300"
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>

            {/* Assets Grid */}
            <div className="p-8">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                <Cpu className="h-7 w-7 mr-3 text-blue-400" />
                Equipment & Assets
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {selectedFacility.equipment.computers > 0 && (
                  <AssetCard
                    icon={Monitor}
                    title="Computers"
                    count={selectedFacility.equipment.computers}
                    color="bg-blue-500"
                    bgColor="bg-blue-500/10"
                    description="High-performance workstations"
                  />
                )}
                <AssetCard
                  icon={Lightbulb}
                  title="Lights"
                  count={selectedFacility.equipment.lights}
                  color="bg-yellow-500"
                  bgColor="bg-yellow-500/10"
                  description="LED lighting system"
                />
                <AssetCard
                  icon={Fan}
                  title="Fans"
                  count={selectedFacility.equipment.fans}
                  color="bg-green-500"
                  bgColor="bg-green-500/10"
                  description="Air conditioning units"
                />
                {selectedFacility.equipment.smartBoard && (
                  <AssetCard
                    icon={Tv}
                    title="Smart Board"
                    count={1}
                    color="bg-purple-500"
                    bgColor="bg-purple-500/10"
                    description="Interactive display system"
                  />
                )}
              </div>

              {/* Report Issue Button */}
              <div className="flex justify-center">
                <button
                  onClick={handleReportIssueClick}
                  className="px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-red-500/25 transform hover:scale-105 transition-all duration-300 flex items-center"
                >
                  <AlertTriangle className="h-6 w-6 mr-3" />
                  Report Issue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Report Issue Modal */}
      {showReportIssue && selectedFacility && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          {/* Debug info */}
          <div className="absolute top-4 left-4 bg-white text-black p-2 rounded">
            DEBUG: Modal should be visible. Facility: {selectedFacility.labName}
          </div>

          {/* Simple test modal */}
          <div className="bg-white p-8 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Report Issue for {selectedFacility.labName}</h2>
            <p className="mb-4">This is a test modal. If you can see this, the modal is working!</p>
            <button
              onClick={() => setShowReportIssue(false)}
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            >
              Close
            </button>
            <button
              onClick={handleSubmitIssue}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Submit Issue
            </button>
          </div>
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl max-w-2xl w-full shadow-2xl border border-white/10">
            {/* Header */}
            <div className="flex items-center justify-between p-8 border-b border-white/10">
              <div className="flex items-center">
                <div className="p-3 bg-red-500/20 rounded-xl mr-4">
                  <AlertCircle className="h-6 w-6 text-red-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Report Issue</h2>
                  <p className="text-gray-400">{selectedFacility.labName}</p>
                </div>
              </div>
              <button
                onClick={() => setShowReportIssue(false)}
                className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors duration-300"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>

            {/* Form */}
            <div className="p-8 space-y-6">
              {/* Equipment Type */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3 flex items-center">
                  <Cpu className="h-4 w-4 mr-2 text-blue-400" />
                  Equipment Type
                </label>
                <select
                  value={issueForm.equipmentType}
                  onChange={(e) => setIssueForm(prev => ({ ...prev, equipmentType: e.target.value }))}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="general">General Issue</option>
                  <option value="computers">Computers</option>
                  <option value="lights">Lights</option>
                  <option value="fans">Fans</option>
                  <option value="smartBoard">Smart Board</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2 text-red-400" />
                  Issue Description
                </label>
                <textarea
                  value={issueForm.description}
                  onChange={(e) => setIssueForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full h-32 px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  placeholder="Describe the issue in detail..."
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3 flex items-center">
                  <Camera className="h-4 w-4 mr-2 text-blue-400" />
                  Issue Photo (Optional)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center hover:border-blue-500 transition-colors duration-300">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-300 mb-2">Click to upload an image</p>
                    <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                  </div>
                </div>
                {issueForm.imagePreview && (
                  <div className="mt-4 relative">
                    <img
                      src={issueForm.imagePreview}
                      alt="Issue preview"
                      className="w-full h-48 object-cover rounded-xl border border-gray-600"
                    />
                    <button
                      onClick={() => setIssueForm(prev => ({ ...prev, image: null, imagePreview: null }))}
                      className="absolute top-2 right-2 p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="h-4 w-4 text-white" />
                    </button>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-700">
                <button
                  onClick={() => setShowReportIssue(false)}
                  className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitIssue}
                  disabled={submittingIssue || !issueForm.description.trim()}
                  className="px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl hover:shadow-red-500/25 transform hover:scale-105 disabled:hover:scale-100 transition-all duration-300 flex items-center"
                >
                  {submittingIssue ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-3"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-3" />
                      Report Issue
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LabsPage;