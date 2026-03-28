import { createContext, useContext, useState, type ReactNode } from 'react';

interface PCStatus {
  [roomNumber: string]: {
    [pcId: number]: 'working' | 'affected';
  };
}

interface PCStatusContextType {
  pcStatus: PCStatus;
  markAsAffected: (roomNumber: string, pcId: number) => void;
  getPCStatus: (roomNumber: string, pcId: number) => 'working' | 'affected';
}

const PCStatusContext = createContext<PCStatusContextType | undefined>(undefined);

export function PCStatusProvider({ children }: { children: ReactNode }) {
  const [pcStatus, setPcStatus] = useState<PCStatus>({});

  const markAsAffected = (roomNumber: string, pcId: number) => {
    setPcStatus(prev => ({
      ...prev,
      [roomNumber]: {
        ...prev[roomNumber],
        [pcId]: 'affected'
      }
    }));
  };

  const getPCStatus = (roomNumber: string, pcId: number): 'working' | 'affected' => {
    return pcStatus[roomNumber]?.[pcId] || 'working';
  };

  return (
    <PCStatusContext.Provider value={{ pcStatus, markAsAffected, getPCStatus }}>
      {children}
    </PCStatusContext.Provider>
  );
}

export function usePCStatus() {
  const context = useContext(PCStatusContext);
  if (!context) {
    throw new Error('usePCStatus must be used within PCStatusProvider');
  }
  return context;
}
