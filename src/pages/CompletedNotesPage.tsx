import React from 'react';
import { useNotes } from '../context/NoteContext';
import { CheckSquare } from 'lucide-react';
import CompletedNoteGrid from '../components/notes/CompletedNoteGrid';
import { motion } from 'framer-motion';

const CompletedNotesPage: React.FC = () => {
  const { completedNotes, loading, error } = useNotes();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="bg-red-50 border border-red-200 p-4 rounded-md text-red-700">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center mb-8">
        <CheckSquare className="mr-2 text-green-600" size={24} />
        <motion.h1 
          className="text-2xl font-bold text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Completed Notes
        </motion.h1>
      </div>

      <CompletedNoteGrid notes={completedNotes} />
    </div>
  );
};

export default CompletedNotesPage;