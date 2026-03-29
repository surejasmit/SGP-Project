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

  return <AnimatedSignIn onLogin={handleLogin} />;
}
