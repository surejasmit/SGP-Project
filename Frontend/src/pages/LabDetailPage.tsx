import { Link, useRouter } from '../components/Router';
import { usePCStatus } from '../contexts/PCStatusContext';
import { Badge } from '../components/ui/badge';
import { RadialScrollGallery } from '../components/ui/portfolio-and-image-gallery';
import { useState, useEffect } from 'react';
import { api } from '../utils/api';

export default function LabDetailPage() {
  const { path, navigate } = useRouter();
  const labNumber = path.split('/')[2] || '1';
  const { markAsAffected, getPCStatus } = usePCStatus();
  const [affectedItems, setAffectedItems] = useState<Set<string>>(new Set());
  
  useEffect(() => {
    checkAffectedItems();
  }, [labNumber]);

  const checkAffectedItems = async () => {
    const affected = new Set<string>();
    
    // Check PCs
    for (let i = 1; i <= 15; i++) {
      try {
        const result = await api.checkItemStatus({
          locationType: 'lab',
          locationId: `lab-${labNumber}`,
          itemType: 'PC',
          itemNumber: i
        });
        if (result.affected) {
          affected.add(`PC-${i}`);
        }
      } catch (error) {
        console.error('Error checking PC status:', error);
      }
    }
    
    // Check Fans
    for (let i = 1; i <= 10; i++) {
      try {
        const result = await api.checkItemStatus({
          locationType: 'lab',
          locationId: `lab-${labNumber}`,
          itemType: 'Fan',
          itemNumber: i
        });
        if (result.affected) {
          affected.add(`Fan-${i}`);
        }
      } catch (error) {
        console.error('Error checking Fan status:', error);
      }
    }
    
    // Check Smart Boards
    for (let i = 1; i <= 3; i++) {
      try {
        const result = await api.checkItemStatus({
          locationType: 'lab',
          locationId: `lab-${labNumber}`,
          itemType: 'Smart Board',
          itemNumber: i
        });
        if (result.affected) {
          affected.add(`Smart Board-${i}`);
        }
      } catch (error) {
        console.error('Error checking Smart Board status:', error);
      }
    }
    
    setAffectedItems(affected);
  };
  
  const equipment = [
    ...Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      type: 'PC' as const,
      icon: '💻',
      status: affectedItems.has(`PC-${i + 1}`) ? 'affected' as const : 'working' as const
    })),
    ...Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      type: 'Fan' as const,
      icon: '🌀',
      status: affectedItems.has(`Fan-${i + 1}`) ? 'affected' as const : 'working' as const
    })),
    ...Array.from({ length: 3 }, (_, i) => ({
      id: i + 1,
      type: 'Smart Board' as const,
      icon: '📺',
      status: affectedItems.has(`Smart Board-${i + 1}`) ? 'affected' as const : 'working' as const
    }))
  ];

  const workingCount = equipment.filter(e => e.status === 'working').length;
  const affectedCount = equipment.filter(e => e.status === 'affected').length;

  const handleItemSelect = (index: number) => {
    const item = equipment[index];
    // Navigate to report page for any equipment item
    navigate(`/report/lab-${labNumber}/${item.type}-${item.id}`);
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="h-[200px] flex flex-col items-center justify-center pt-20">
        <div className="flex justify-between items-center w-full max-w-7xl px-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
              Lab {labNumber}
            </h1>
            <div className="flex gap-6 mt-4">
              <p className="text-green-400">✓ Working: {workingCount}</p>
              <p className="text-red-400">✗ Affected: {affectedCount}</p>
            </div>
          </div>
          <Link href="/labs" className="px-4 py-2 text-gray-300 hover:text-white">
            ← Back
          </Link>
        </div>
        <div className="animate-bounce text-gray-400 text-xs mt-8">↓ Scroll</div>
      </div>

      <RadialScrollGallery
        className="!min-h-screen"
        baseRadius={400}
        mobileRadius={250}
        visiblePercentage={50}
        scrollDuration={3000}
        onItemSelect={handleItemSelect}
      >
        {(hoveredIndex) =>
          equipment.map((item, index) => {
            const isActive = hoveredIndex === index;
            return (
              <div
                key={`${item.type}-${item.id}`}
                className={`
                  group relative w-[200px] h-[280px] sm:w-[240px] sm:h-[320px] overflow-hidden rounded-xl
                  border-2 shadow-lg transition-all duration-700
                  ${item.status === 'affected'
                    ? 'bg-red-600 border-red-800'
                    : 'bg-gray-800/50 border-gray-600'
                  }
                `}
              >
                <div className="absolute inset-0 flex flex-col justify-between p-6">
                  <div className="flex justify-between items-start">
                    <Badge
                      variant={item.status === 'affected' ? 'destructive' : 'secondary'}
                      className="text-[10px] px-2 py-0 bg-background/80 backdrop-blur"
                    >
                      {item.status === 'affected' ? 'Affected' : 'Working'}
                    </Badge>
                  </div>

                  <div className="flex flex-col items-center justify-center flex-1">
                    <div className={`text-7xl mb-4 transition-transform duration-700 ${isActive ? 'scale-110' : 'scale-100'}`}>
                      {item.icon}
                    </div>
                  </div>

                  <div className={`transition-transform duration-500 ${isActive ? 'translate-y-0' : 'translate-y-2'}`}>
                    <h3 className="text-xl font-bold leading-tight text-white text-center">
                      {item.type} {item.id}
                    </h3>
                    <p className="text-gray-400 text-xs text-center mt-2">Click to report issue</p>
                    <div className={`h-0.5 bg-gray-400 mt-2 mx-auto transition-all duration-500 ${isActive ? 'w-full opacity-100' : 'w-0 opacity-0'}`} />
                  </div>
                </div>
              </div>
            );
          })
        }
      </RadialScrollGallery>

      <div className="h-[200px] flex items-center justify-center bg-gray-900/50">
        <p className="text-gray-400 text-sm">Scroll back up to continue</p>
      </div>
    </div>
  );
}
