import React, { useState } from 'react';
import { useNotes } from '../context/NoteContext';
import { Plus } from 'lucide-react';
import NoteGrid from '../components/notes/NoteGrid';
import AddNoteModal from '../components/notes/AddNoteModal';
import Button from '../components/ui/Button';
import { motion } from 'framer-motion';

const ActiveNotesPage: React.FC = () => {
  const { activeNotes, loading, error, createNote, updateNote, completeNote, deleteNote } = useNotes();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddNote = async (noteData: { title: string; content: string; color: string }) => {
    try {
      await createNote(noteData);
    } catch (err) {
      console.error('Failed to create note:', err);
    }
  };

  const handleEditNote = async (
    id: string,
    data: { title: string; content: string; color: string }
  ) => {
    try {
      await updateNote(id, data);
    } catch (err) {
      console.error('Failed to update note:', err);
    }
  };

  const handleCompleteNote = async (id: string, feedback: string) => {
    try {
      await completeNote(id, feedback);
    } catch (err) {
      console.error('Failed to complete note:', err);
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      await deleteNote(id);
    } catch (err) {
      console.error('Failed to delete note:', err);
    }
  };

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
      <div className="flex justify-between items-center mb-8">
        <motion.h1 
          className="text-2xl font-bold text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          My Notes
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            onClick={() => setIsAddModalOpen(true)}
            leftIcon={<Plus size={16} />}
          >
            Add Note
          </Button>
        </motion.div>
      </div>

      <NoteGrid
        notes={activeNotes}
        onEdit={handleEditNote}
        onDelete={handleDeleteNote}
        onComplete={handleCompleteNote}
      />

      <AddNoteModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddNote={handleAddNote}
      />
    </div>
  );
};

export default ActiveNotesPage;