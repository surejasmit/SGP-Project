import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import LabsPage from './pages/LabsPage';
import IssueHistory from './pages/IssueHistory';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

// Protected Route Component
function ProtectedRouteWrapper({ children, allowedRoles = [] }) {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-900">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

// App Routes Component
function AppRoutes() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 transition-colors duration-300">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRouteWrapper>
                {user?.role === 'admin' ? <AdminDashboard /> : <StudentDashboard />}
              </ProtectedRouteWrapper>
            }
          />

          <Route
            path="/labs"
            element={
              <ProtectedRouteWrapper>
                <LabsPage />
              </ProtectedRouteWrapper>
            }
          />

          <Route
            path="/issues"
            element={
              <ProtectedRouteWrapper allowedRoles={['admin']}>
                <IssueHistory />
              </ProtectedRouteWrapper>
            }
          />

          {/* Redirect root to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            theme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;