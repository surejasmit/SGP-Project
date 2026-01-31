import { Router, useRouter } from './components/Router';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ComplaintForm from './pages/ComplaintForm';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import LocationsPage from './pages/LocationsPage';
import ClassroomListPage from './pages/ClassroomListPage';
import ClassroomDetailPage from './pages/ClassroomDetailPage';
import LabListPage from './pages/LabListPage';
import LabDetailPage from './pages/LabDetailPage';
import ReportIssuePage from './pages/ReportIssuePage';
import AboutUsPage from './pages/AboutUsPage';
import { useAuth } from './hooks/useAuth';
import { useComplaints } from './hooks/useComplaints';
import { PCStatusProvider } from './contexts/PCStatusContext';

function AppContent() {
  const { path } = useRouter();
  const { user, login, signup, logout } = useAuth();
  const { complaints, addComplaint, updateStatus } = useComplaints();

  const renderPage = () => {
    if (path === '/login') {
      return <LoginPage onLogin={login} />;
    }
    if (path === '/signup') {
      return <SignupPage onSignup={signup} />;
    }
    if (path === '/about') {
      return <AboutUsPage />;
    }
    if (path === '/locations') {
      return <LocationsPage />;
    }
    if (path === '/classrooms') {
      return <ClassroomListPage />;
    }
    if (path === '/labs') {
      return <LabListPage />;
    }
    if (path.startsWith('/classroom/')) {
      return <ClassroomDetailPage />;
    }
    if (path.startsWith('/lab/')) {
      return <LabDetailPage />;
    }
    if (path.startsWith('/report/')) {
      return <ReportIssuePage />;
    }
    if (path === '/complaint' && user) {
      return <ComplaintForm onSubmit={addComplaint} />;
    }
    if (path === '/dashboard') {
      if (!user) {
        return <LoginPage onLogin={login} />;
      }
      if (user.role === 'admin') {
        return <AdminDashboard />;
      }
      return <UserDashboard />;
    }
    return <LandingPage />;
  };

  return (
    <>
      {path !== '/login' && path !== '/signup' && (
        <Navbar isAuthenticated={!!user} userRole={user?.role} onLogout={logout} />
      )}
      {renderPage()}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <PCStatusProvider>
        <AppContent />
      </PCStatusProvider>
    </Router>
  );
}
