export type LocationType = 'classroom' | 'lab';

export type ItemType = 'PC' | 'Fan' | 'Smart Board' | 'Projector';

export type ComplaintStatus = 'pending' | 'in-progress' | 'resolved';

export interface Complaint {
  id: string;
  locationType: LocationType;
  locationName: string;
  itemType: ItemType;
  itemNumber: string;
  issue: string;
  status: ComplaintStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}
