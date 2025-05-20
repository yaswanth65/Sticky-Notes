import React from 'react';
import { motion } from 'framer-motion';
import { Note } from '../../context/NoteContext';
import { CalendarCheck } from 'lucide-react';

interface CompletedNoteCardProps {
  note: Note;
}

const CompletedNoteCard: React.FC<CompletedNoteCardProps> = ({ note }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="rounded-xl overflow-hidden shadow-md opacity-80 hover:opacity-100 transition-all duration-300"
      style={{ backgroundColor: note.color }}
    >
      <div className="p-5 h-full flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-lg text-gray-800">{note.title}</h3>
          <div className="bg-green-500/20 p-1.5 rounded-full">
            <CalendarCheck size={16} className="text-green-700" />
          </div>
        </div>
        
        <p className="text-gray-700 flex-grow mb-3 whitespace-pre-line">
          {note.content}
        </p>
        
        {note.completionFeedback && (
          <div className="border-t border-gray-200/50 pt-3 mt-2">
            <h4 className="text-sm font-medium text-gray-700 mb-1">Feedback:</h4>
            <p className="text-sm text-gray-600 italic whitespace-pre-line">
              "{note.completionFeedback}"
            </p>
          </div>
        )}
        
        <div className="flex justify-between items-center mt-auto pt-2 border-t border-black/10">
          <span className="text-xs text-gray-600">
            Created: {new Date(note.createdAt).toLocaleDateString()}
          </span>
          <span className="text-xs text-gray-600">
            Completed: {note.completedAt ? new Date(note.completedAt).toLocaleDateString() : 'N/A'}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default CompletedNoteCard;