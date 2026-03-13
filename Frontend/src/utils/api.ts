const API_URL = import.meta.env.VITE_API_URL;

export const api = {
  // Get auth token from localStorage
  getToken: () => localStorage.getItem('token'),

  // Make authenticated request
  async request(endpoint: string, options: RequestInit = {}) {
    const token = this.getToken();
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Request failed');
    }

    return data;
  },

  // Submit query
  async submitQuery(queryData: {
    locationType: string;
    locationId: string;
    itemType: string;
    itemNumber: number;
    query: string;
  }) {
    return this.request('/queries/submit', {
      method: 'POST',
      body: JSON.stringify(queryData),
    });
  },

  // Get user's queries
  async getMyQueries() {
    return this.request('/queries/my-queries');
  },

  // Get all queries (admin only)
  async getAllQueries(filters?: {
    filterType?: string;
    startDate?: string;
    endDate?: string;
    status?: string;
  }) {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
    }
    const queryString = params.toString();
    return this.request(`/queries/all${queryString ? `?${queryString}` : ''}`);
  },

  // Update query status (admin only)
  async updateQueryStatus(queryId: string, status: string, adminResponse?: string) {
    return this.request(`/queries/${queryId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, adminResponse }),
    });
  },

  // Check item status
  async checkItemStatus(params: {
    locationType: string;
    locationId: string;
    itemType: string;
    itemNumber: number;
  }) {
    const query = new URLSearchParams(params as any).toString();
    return this.request(`/queries/check?${query}`);
  },

  // Get dashboard stats (admin only)
  async getDashboardStats(filters?: {
    filterType?: string;
    startDate?: string;
    endDate?: string;
  }) {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
    }
    const queryString = params.toString();
    return this.request(`/stats/dashboard${queryString ? `?${queryString}` : ''}`);
  },
};
