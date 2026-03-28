import AnimatedSignIn from '@/components/ui/animated-sign-in';
import { useRouter } from '../components/Router';

interface LoginPageProps {
  onLogin: (email: string, password: string) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const { navigate } = useRouter();

  const handleLogin = async (email: string, password: string, _rememberMe: boolean) => {
    try {
      await onLogin(email, password);
      
      // Get user from localStorage after login
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        // Redirect based on role
        if (userData.role === 'admin') {
          navigate('/dashboard');
        } else {
          navigate('/locations');
        }
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed: ' + (error as Error).message);
    }
  };

  const handleGoogleLogin = async (credential: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential }),
      });

      let data;
      try {
        data = await response.json();
      } catch {
        throw new Error('Server returned an invalid response. Please check that the API server is accessible.');
      }

      if (!response.ok) {
        throw new Error(data.error || 'Google login failed');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      if (data.user.role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/locations');
      }
    } catch (error: any) {
      console.error('Google login failed:', error);
      if (error.message.includes('Failed to fetch')) {
        alert('Cannot connect to server. Please check your internet connection.');
      } else {
        alert('Google login failed: ' + error.message);
      }
    }
  };

  return <AnimatedSignIn onLogin={handleLogin} onGoogleLogin={handleGoogleLogin} />;
}
