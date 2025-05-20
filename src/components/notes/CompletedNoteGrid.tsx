import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Note } from '../../context/NoteContext';
import CompletedNoteCard from './CompletedNoteCard';

interface CompletedNoteGridProps {
  notes: Note[];
}

const CompletedNoteGrid: React.FC<CompletedNoteGridProps> = ({ notes }) => {
  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <div className="bg-green-100 rounded-full p-6 mb-4">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-800 mb-2">No completed notes</h3>
        <p className="text-gray-600 max-w-md">
          When you mark notes as complete, they will appear here.
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
          <CompletedNoteCard key={note._id} note={note} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default CompletedNoteGrid;