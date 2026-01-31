import { useState, useEffect } from 'react';
import { Complaint, ComplaintStatus } from '../types';

export function useComplaints() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('complaints');
    if (stored) {
      setComplaints(JSON.parse(stored));
    }
  }, []);

  const addComplaint = (data: Omit<Complaint, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => {
    const newComplaint: Complaint = {
      ...data,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const updated = [...complaints, newComplaint];
    setComplaints(updated);
    localStorage.setItem('complaints', JSON.stringify(updated));
  };

  const updateStatus = (id: string, status: ComplaintStatus) => {
    const updated = complaints.map(c =>
      c.id === id ? { ...c, status, updatedAt: new Date() } : c
    );
    setComplaints(updated);
    localStorage.setItem('complaints', JSON.stringify(updated));
  };

  return { complaints, addComplaint, updateStatus };
}
