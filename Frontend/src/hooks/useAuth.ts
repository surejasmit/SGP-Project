import { useState, useEffect } from 'react';
import { User } from '../types';

const API_URL = 'http://localhost:5000/api';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      const user: User = {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        role: data.user.role,
      };

      setUser(user);
      setToken(data.token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', data.token);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      console.log('Attempting signup with:', { name, email });
      console.log('API URL:', `${API_URL}/auth/signup`);
      
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role: 'user' })
      });

      console.log('Response status:', response.status);
      
      const data = await response.json();
      console.log('Signup response:', data);

      if (!response.ok) {
        throw new Error(data.error || `Signup failed with status ${response.status}`);
      }

      const user: User = {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        role: data.user.role,
      };

      setUser(user);
      setToken(data.token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', data.token);
      
      console.log('✅ Signup successful!');
    } catch (error: any) {
      console.error('Signup error details:', error);
      if (error.message.includes('Failed to fetch')) {
        throw new Error('Cannot connect to server. Make sure backend is running on http://localhost:5000');
      }
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return { user, token, login, signup, logout };
}
