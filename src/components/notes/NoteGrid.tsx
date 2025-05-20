import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Note } from '../../context/NoteContext';
import NoteCard from './NoteCard';

interface NoteGridProps {
  notes: Note[];
  onEdit: (id: string, data: { title: string; content: string; color: string }) => void;
  onDelete: (id: string) => void;
  onComplete: (id: string, feedback: string) => void;
}

const NoteGrid: React.FC<NoteGridProps> = ({ notes, onEdit, onDelete, onComplete }) => {
  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <div className="bg-amber-100 rounded-full p-6 mb-4">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
            <path d="M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z" />
            <path d="M15 3v6h6" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-800 mb-2">No notes yet</h3>
        <p className="text-gray-600 max-w-md">
          Create your first note by clicking the "Add Note" button above.
        </p>
      </div>
    );
  }

  return (
    <motion.div 
      layout
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      <AnimatePresence>
        {notes.map(note => (
          <NoteCard
            key={note._id}
            note={note}
            onEdit={onEdit}
            onDelete={onDelete}
            onComplete={onComplete}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default NoteGrid;