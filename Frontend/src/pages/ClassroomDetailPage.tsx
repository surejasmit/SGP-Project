import { Link, useRouter } from '../components/Router';
import { usePCStatus } from '../contexts/PCStatusContext';
import { Badge } from '../components/ui/badge';
import { RadialScrollGallery } from '../components/ui/portfolio-and-image-gallery';
import { useState, useEffect } from 'react';
import { api } from '../utils/api';

export default function ClassroomDetailPage() {
  const { path, navigate } = useRouter();
  const roomNumber = path.split('/')[2] || '301';
  const _pcStatus = usePCStatus();
  const [affectedItems, setAffectedItems] = useState<Set<string>>(new Set());
  
  useEffect(() => {
    checkAffectedItems();
  }, [roomNumber]);

  const checkAffectedItems = async () => {
    const affected = new Set<string>();
    
    // Check all equipment items
    for (let i = 1; i <= 10; i++) {
      try {
        const result = await api.checkItemStatus({
          locationType: 'classroom',
          locationId: roomNumber,
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
    
    for (let i = 1; i <= 3; i++) {
      try {
        const result = await api.checkItemStatus({
          locationType: 'classroom',
          locationId: roomNumber,
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
    navigate(`/report/${roomNumber}/${item.type}-${item.id}`);
  };

  return (
    <div className="bg-background text-foreground">
      <div className="h-[200px] flex flex-col items-center justify-center pt-20">
        <div className="flex justify-between items-center w-full max-w-7xl px-4">
          <div>
            <h1 className="text-4xl font-bold text-foreground">
              Classroom {roomNumber}
            </h1>
            <div className="flex gap-6 mt-4">
              <p className="text-foreground/70">✓ Working: {workingCount}</p>
              <p className="text-foreground/50">✗ Affected: {affectedCount}</p>
            </div>
          </div>
          <Link href="/classrooms" className="text-sm font-medium tracking-widest text-foreground/60 hover:text-foreground transition-colors">
            ← Back
          </Link>
        </div>
        <div className="animate-bounce text-foreground/40 text-xs mt-8">↓ Scroll</div>
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
                    : 'bg-background border-foreground/10'
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
                    <h3 className={`text-xl font-bold leading-tight text-center ${
                      item.status === 'affected' ? 'text-white' : 'text-foreground'
                    }`}>
                      {item.type} {item.id}
                    </h3>
                    <p className={`text-xs text-center mt-2 ${
                      item.status === 'affected' ? 'text-gray-200' : 'text-foreground/60'
                    }`}>Click to report issue</p>
                    <div className={`h-0.5 bg-gray-400 mt-2 mx-auto transition-all duration-500 ${isActive ? 'w-full opacity-100' : 'w-0 opacity-0'}`} />
                  </div>
                </div>
              </div>
            );
          })
        }
      </RadialScrollGallery>

      <div className="h-[200px] flex items-center justify-center bg-background border-t border-foreground/10">
        <p className="text-foreground/40 text-sm">Scroll back up to continue</p>
      </div>
    </div>
  );
}
