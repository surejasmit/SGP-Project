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
      // Navigate to home page after successful signup
      navigate('/');
    } catch (error) {
      console.error('Signup failed:', error);
      alert('Signup failed: ' + (error as Error).message);
    }
  };

  return <AnimatedSignup onSignup={handleSignup} />;
}
