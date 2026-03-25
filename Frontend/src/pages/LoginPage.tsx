import AnimatedSignIn from '@/components/ui/animated-sign-in';
import { useRouter } from '../components/Router';

interface LoginPageProps {
  onLogin: (email: string, password: string) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const { navigate } = useRouter();

  const handleLogin = async (email: string, password: string, rememberMe: boolean) => {
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

      if (!response.ok) throw new Error('Google login failed');

      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      if (data.user.role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/locations');
      }
    } catch (error) {
      console.error('Google login failed:', error);
      alert('Google login failed: ' + (error as Error).message);
    }
  };

  return <AnimatedSignIn onLogin={handleLogin} onGoogleLogin={handleGoogleLogin} />;
}
