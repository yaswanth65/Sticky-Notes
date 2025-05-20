import React, { useState } from 'react';
import { Edit, Trash2, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Note } from '../../context/NoteContext';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import Textarea from '../ui/Textarea';

interface NoteCardProps {
  note: Note;
  onEdit: (id: string, data: { title: string; content: string; color: string }) => void;
  onDelete: (id: string) => void;
  onComplete: (id: string, feedback: string) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onEdit, onDelete, onComplete }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    title: note.title,
    content: note.content,
    color: note.color
  });
  const [feedback, setFeedback] = useState('');

  // Handle edit form changes
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  // Handle edit submit
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEdit(note._id, editForm);
    setIsEditModalOpen(false);
  };

  // Handle complete submit
  const handleCompleteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(note._id, feedback);
    setIsCompleteModalOpen(false);
    setFeedback('');
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
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
        className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
        style={{ backgroundColor: note.color }}
      >
        <div className="p-5 h-full flex flex-col">
          <h3 className="font-bold text-lg mb-2 text-gray-800">{note.title}</h3>
          <p className="text-gray-700 flex-grow mb-4 whitespace-pre-line">
            {note.content}
          </p>
          
          <div className="flex justify-between items-center mt-auto pt-2 border-t border-black/10">
            <span className="text-xs text-gray-600">
              {new Date(note.createdAt).toLocaleDateString()}
            </span>
            
            <div className="flex space-x-1">
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="p-1.5 rounded-full hover:bg-black/5 transition-colors"
                aria-label="Edit note"
              >
                <Edit size={16} className="text-gray-700" />
              </button>
              <button
                onClick={() => setIsCompleteModalOpen(true)}
                className="p-1.5 rounded-full hover:bg-black/5 transition-colors"
                aria-label="Mark as complete"
              >
                <CheckCircle size={16} className="text-gray-700" />
              </button>
              <button
                onClick={() => setIsDeleteConfirmOpen(true)}
                className="p-1.5 rounded-full hover:bg-black/5 transition-colors"
                aria-label="Delete note"
              >
                <Trash2 size={16} className="text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Note"
      >
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={editForm.title}
              onChange={handleEditChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <Textarea
              name="content"
              value={editForm.content}
              onChange={handleEditChange}
              className="min-h-[120px]"
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
                    editForm.color === color.value ? 'border-gray-800' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color.value }}
                  onClick={() => setEditForm(prev => ({ ...prev, color: color.value }))}
                  title={color.label}
                />
              ))}
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsEditModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>

      {/* Complete Modal */}
      <Modal
        isOpen={isCompleteModalOpen}
        onClose={() => setIsCompleteModalOpen(false)}
        title="Mark Note as Complete"
      >
        <form onSubmit={handleCompleteSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Completion Feedback (optional)
            </label>
            <Textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Did everything go as planned? Any reflections?"
              className="min-h-[120px]"
            />
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsCompleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Mark as Complete
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <Modal
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        title="Delete Note"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            Are you sure you want to delete this note? This action cannot be undone.
          </p>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsDeleteConfirmOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="danger"
              onClick={() => {
                onDelete(note._id);
                setIsDeleteConfirmOpen(false);
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default NoteCard;