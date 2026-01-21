import axios from 'axios';

// Labs API
export const labsAPI = {
  getAll: () => axios.get('/labs'),
  getById: (id) => axios.get(`/labs/${id}`),
  create: (data) => axios.post('/labs', data),
  update: (id, data) => axios.put(`/labs/${id}`, data),
  delete: (id) => axios.delete(`/labs/${id}`),
  updateStatus: (id, status) => axios.patch(`/labs/${id}/status`, { status })
};

// Issues API
export const issuesAPI = {
  getAll: () => axios.get('/issues'),
  getResolved: () => axios.get('/issues/resolved'),
  getById: (id) => axios.get(`/issues/${id}`),
  getByLab: (labId) => axios.get(`/issues/lab/${labId}`),
  create: (data) => axios.post('/issues', data),
  resolve: (id) => axios.patch(`/issues/${id}/resolve`),
  delete: (id) => axios.delete(`/issues/${id}`)
};

// Auth API (already handled in AuthContext, but keeping for consistency)
export const authAPI = {
  register: (data) => axios.post('/auth/register', data),
  login: (data) => axios.post('/auth/login', data),
  getProfile: () => axios.get('/auth/profile')
};