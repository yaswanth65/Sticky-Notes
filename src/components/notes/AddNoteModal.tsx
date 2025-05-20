import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Textarea from '../ui/Textarea';

interface AddNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddNote: (noteData: { title: string; content: string; color: string }) => void;
}

const AddNoteModal: React.FC<AddNoteModalProps> = ({ isOpen, onClose, onAddNote }) => {
  const [noteData, setNoteData] = useState({
    title: '',
    content: '',
    color: '#F9EAD3' // Default color
  });

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNoteData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddNote(noteData);
    setNoteData({ title: '', content: '', color: '#F9EAD3' });
    onClose();
  };

  // Color picker options
  const colorOptions = [
    { value: '#F9EAD3', label: 'Warm Sand' },
    { value: '#F8D8D8', label: 'Soft Pink' },
    { value: '#DCF8D8', label: 'Mint' },
    { value: '#D8E5F8', label: 'Sky Blue' },
    { value: '#E8D8F8', label: 'Lavender' }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Note">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={noteData.title}
            onChange={handleChange}
            placeholder="Note title"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <Textarea
            name="content"
            value={noteData.content}
            onChange={handleChange}
            placeholder="Write your note here..."
            className="min-h-[150px]"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
          <div className="flex flex-wrap gap-2">
            {colorOptions.map(color => (
              <div
                key={color.value}
                className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
                  noteData.color === color.value ? 'border-gray-800' : 'border-transparent'
                } transition-all duration-200 hover:scale-110`}
                style={{ backgroundColor: color.value }}
                onClick={() => setNoteData(prev => ({ ...prev, color: color.value }))}
                title={color.label}
              />
            ))}
          </div>
        </div>
        
        <div className="flex justify-end space-x-2 pt-4">
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setNoteData({ title: '', content: '', color: '#F9EAD3' });
              onClose();
            }}
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Create Note
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddNoteModal;