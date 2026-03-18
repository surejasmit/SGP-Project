import { useState, type FormEvent } from 'react';
import type { LocationType, ItemType, Complaint } from '../types';

interface ComplaintFormProps {
  onSubmit: (complaint: Omit<Complaint, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => void;
}

export default function ComplaintForm({ onSubmit }: ComplaintFormProps) {
  const [locationType, setLocationType] = useState<LocationType>('classroom');
  const [locationName, setLocationName] = useState('');
  const [itemType, setItemType] = useState<ItemType>('PC');
  const [itemNumber, setItemNumber] = useState('');
  const [issue, setIssue] = useState('');

  const itemTypes: ItemType[] = ['PC', 'Fan', 'Smart Board', 'Projector'];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      locationType,
      locationName,
      itemType,
      itemNumber,
      issue,
    });
    setLocationName('');
    setItemNumber('');
    setIssue('');
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-background border border-foreground/10 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-foreground mb-6">Submit Complaint</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground/60 mb-2">
                Location Type
              </label>
              <div className="flex gap-4">
                <label className="flex items-center text-foreground/80">
                  <input
                    type="radio"
                    value="classroom"
                    checked={locationType === 'classroom'}
                    onChange={(e) => setLocationType(e.target.value as LocationType)}
                    className="mr-2"
                  />
                  Classroom
                </label>
                <label className="flex items-center text-foreground/80">
                  <input
                    type="radio"
                    value="lab"
                    checked={locationType === 'lab'}
                    onChange={(e) => setLocationType(e.target.value as LocationType)}
                    className="mr-2"
                  />
                  Lab
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground/60 mb-2">
                {locationType === 'classroom' ? 'Classroom' : 'Lab'} Name
              </label>
              <input
                type="text"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                placeholder="e.g., Room 101, Physics Lab"
                className="w-full px-4 py-2 bg-background border border-foreground/20 rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-foreground/50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground/60 mb-2">
                Item Type
              </label>
              <select
                value={itemType}
                onChange={(e) => setItemType(e.target.value as ItemType)}
                className="w-full px-4 py-2 bg-background border border-foreground/20 rounded-lg text-foreground focus:outline-none focus:border-foreground/50"
              >
                {itemTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground/60 mb-2">
                Item Number
              </label>
              <input
                type="text"
                value={itemNumber}
                onChange={(e) => setItemNumber(e.target.value)}
                placeholder="e.g., PC-01, FAN-03"
                className="w-full px-4 py-2 bg-background border border-foreground/20 rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-foreground/50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground/60 mb-2">
                Issue Description
              </label>
              <textarea
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
                placeholder="Describe the issue in detail..."
                rows={5}
                className="w-full px-4 py-2 bg-background border border-foreground/20 rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-foreground/50"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full border border-foreground/20 bg-foreground text-background font-medium hover:bg-foreground/90 transition-all"
            >
              Submit Complaint
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
