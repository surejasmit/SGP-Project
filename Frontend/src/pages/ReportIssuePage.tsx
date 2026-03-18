import { Link, useRouter } from '../components/Router';
import { useState } from 'react';
import { api } from '../utils/api';

export default function ReportIssuePage() {
  const { path } = useRouter();
  const pathParts = path.split('/');
  const roomId = pathParts[2] || '301';
  const itemInfo = pathParts[3] || 'PC-1';
  const [itemType, itemNumber] = itemInfo.split('-');
  
  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isLab = roomId.startsWith('lab-');
  const locationType = isLab ? 'lab' : 'classroom';
  const locationId = roomId;
  const displayName = isLab ? `Lab ${roomId.replace('lab-', '')}` : `Classroom ${roomId}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.submitQuery({
        locationType,
        locationId,
        itemType,
        itemNumber: parseInt(itemNumber),
        query
      });
      
      setSubmitted(true);
      setTimeout(() => {
        window.location.href = '/locations';
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to submit query');
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">✓</div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Issue Reported Successfully!</h2>
          <p className="text-foreground/60">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pt-20 px-4 pb-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-foreground">
            Report Issue
          </h1>
          <Link href={isLab ? `/lab/${roomId.replace('lab-', '')}` : `/classroom/${roomId}`} className="text-sm font-medium tracking-widest text-foreground/60 hover:text-foreground transition-colors">
            ← Back
          </Link>
        </div>

        <div className="bg-background border border-foreground/10 rounded-xl p-8">
          <div className="mb-6">
            <p className="text-foreground/60 mb-2">Location:</p>
            <p className="text-foreground text-xl font-semibold">{displayName} - {itemType} {itemNumber}</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-foreground mb-2 font-semibold">
                Describe the Issue *
              </label>
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                required
                rows={6}
                placeholder={`Please describe the problem with this ${itemType}...`}
                className="w-full px-4 py-3 bg-background border border-foreground/20 rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-foreground/50"
              />
            </div>

            <button
              type="submit"
              className="w-full h-12 rounded-full border border-foreground/20 bg-foreground text-background font-medium hover:bg-foreground/90 transition-all disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Issue Report'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
