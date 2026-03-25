import AnimatedSignup from '@/components/ui/animated-signup';
import { useRouter } from '../components/Router';

interface SignupPageProps {
  onSignup: (email: string, password: string, name: string) => void;
}

export default function SignupPage({ onSignup }: SignupPageProps) {
  const { navigate } = useRouter();

  const handleSignup = async (email: string, password: string, name: string) => {
    try {
      await onSignup(email, password, name);
      // Navigate to login page after successful signup
      alert('Account created successfully! Please sign in.');
      navigate('/login');
    } catch (error) {
      console.error('Signup failed:', error);
      alert('Signup failed: ' + (error as Error).message);
    }
  };

  const handleGoogleSignup = async (credential: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Google signup failed');
      }

      // Signup successful — redirect to login page
      alert('Account created successfully! Please sign in.');
      navigate('/login');
    } catch (error) {
      console.error('Google signup failed:', error);
      alert('Google signup failed: ' + (error as Error).message);
    }
  };

  return <AnimatedSignup onSignup={handleSignup} onGoogleSignup={handleGoogleSignup} />;
}
