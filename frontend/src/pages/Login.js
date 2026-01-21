import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg-primary dark:from-dark-900 dark:to-dark-800 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-400/20 to-primary-600/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-success-400/20 to-success-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-2xl mb-6 animate-bounce-slow">
            <User size={32} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Sign in to access your dashboard or{' '}
            <Link
              to="/register"
              className="font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors hover:underline"
            >
              create a new account
            </Link>
          </p>
        </div>

        <div className="form-container">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="label flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary-500" />
                <span>Email address</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="input pl-12 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="label flex items-center space-x-2">
                <Lock className="h-4 w-4 text-primary-500" />
                <span>Password</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  className="input pl-12 pr-12 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 text-base font-semibold hover:shadow-xl hover:shadow-primary-500/25 disabled:hover:shadow-none"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="spinner w-5 h-5 mr-3"></div>
                  Signing in...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <User className="w-5 h-5 mr-2" />
                  Sign in
                </div>
              )}
            </button>

          </form>

          {/* Demo Accounts */}
          <div className="mt-8 p-4 bg-white/60 dark:bg-dark-800/60 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-dark-700/50">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center mb-3">
              Demo Accounts
            </p>
            <div className="grid grid-cols-1 gap-2 text-xs">
              <div className="flex items-center justify-between p-2 bg-gradient-to-r from-success-50 to-success-100 dark:from-success-900/20 dark:to-success-800/20 rounded-lg">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-success-600" />
                  <span className="font-medium text-success-700 dark:text-success-400">Student</span>
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  student@example.com
                </div>
              </div>
              <div className="flex items-center justify-between p-2 bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-lg">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-primary-600" />
                  <span className="font-medium text-primary-700 dark:text-primary-400">Admin</span>
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  admin@example.com
                </div>
              </div>
              <p className="text-center text-gray-500 dark:text-gray-500 mt-2">
                Password: <code className="bg-gray-100 dark:bg-dark-700 px-1 rounded">password123</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;