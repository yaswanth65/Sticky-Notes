import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useAuth } from './AuthContext';

// Define note type
export type Note = {
  _id: string;
  title: string;
  content: string;
  color: string;
  isCompleted: boolean;
  completedAt: string | null;
  completionFeedback: string;
  createdAt: string;
  updatedAt: string;
};

// Define new note type
export type NewNote = {
  title: string;
  content: string;
  color: string;
};

// Define context type
type NoteContextType = {
  activeNotes: Note[];
  completedNotes: Note[];
  loading: boolean;
  error: string | null;
  fetchNotes: () => Promise<void>;
  createNote: (noteData: NewNote) => Promise<void>;
  updateNote: (id: string, noteData: Partial<NewNote>) => Promise<void>;
  completeNote: (id: string, feedback: string) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
};

// Create context
export const NoteContext = createContext<NoteContextType>({
  activeNotes: [],
  completedNotes: [],
  loading: false,
  error: null,
  fetchNotes: async () => {},
  createNote: async () => {},
  updateNote: async () => {},
  completeNote: async () => {},
  deleteNote: async () => {},
});

// Provider component
export const NoteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeNotes, setActiveNotes] = useState<Note[]>([]);
  const [completedNotes, setCompletedNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Fetch all notes
  const fetchNotes = useCallback(async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);

    try {
      // Fetch active notes
      const activeRes = await fetch('/api/notes/active', {
        credentials: 'include',
      });
      
      if (!activeRes.ok) {
        throw new Error('Failed to fetch active notes');
      }
      
      const activeData = await activeRes.json();
      setActiveNotes(activeData);

      // Fetch completed notes
      const completedRes = await fetch('/api/notes/completed', {
        credentials: 'include',
      });
      
      if (!completedRes.ok) {
        throw new Error('Failed to fetch completed notes');
      }
      
      const completedData = await completedRes.json();
      setCompletedNotes(completedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Create a new note
  const createNote = async (noteData: NewNote) => {
    if (!user) return;
    
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(noteData),
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Failed to create note');
      }

      // Refresh notes after creating
      await fetchNotes();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update an existing note
  const updateNote = async (id: string, noteData: Partial<NewNote>) => {
    if (!user) return;
    
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/notes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(noteData),
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Failed to update note');
      }

      // Refresh notes after updating
      await fetchNotes();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Mark a note as complete
  const completeNote = async (id: string, feedback: string) => {
    if (!user) return;
    
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/notes/${id}/complete`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ feedback }),
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Failed to complete note');
      }

      // Refresh notes after completing
      await fetchNotes();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete a note
  const deleteNote = async (id: string) => {
    if (!user) return;
    
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/notes/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Failed to delete note');
      }

      // Refresh notes after deleting
      await fetchNotes();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Fetch notes whenever user changes
  useEffect(() => {
    if (user) {
      fetchNotes();
    } else {
      setActiveNotes([]);
      setCompletedNotes([]);
    }
  }, [user, fetchNotes]);

  return (
    <NoteContext.Provider
      value={{
        activeNotes,
        completedNotes,
        loading,
        error,
        fetchNotes,
        createNote,
        updateNote,
        completeNote,
        deleteNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

// Custom hook for using note context
export const useNotes = () => React.useContext(NoteContext);