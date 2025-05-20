import express from 'express';
import jwt from 'jsonwebtoken';
import Note from '../models/Note.js';

const router = express.Router();

// Middleware to verify JWT
const authMiddleware = async (req, res, next) => {
  try {
    // Get token from cookies or authorization header
    const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'yoursecretkey123');
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token', error: error.message });
  }
};

// Get all notes for authenticated user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get active notes
router.get('/active', authMiddleware, async (req, res) => {
  try {
    const notes = await Note.find({ 
      user: req.userId,
      isCompleted: false
    }).sort({ updatedAt: -1 });
    
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get completed notes
router.get('/completed', authMiddleware, async (req, res) => {
  try {
    const notes = await Note.find({ 
      user: req.userId,
      isCompleted: true
    }).sort({ completedAt: -1 });
    
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create new note
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, content, color } = req.body;
    
    const newNote = new Note({
      user: req.userId,
      title,
      content,
      color: color || '#F9EAD3'
    });
    
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update note
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { title, content, color } = req.body;
    
    // Find note and check ownership
    const note = await Note.findById(req.params.id);
    
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    
    if (note.user.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to update this note' });
    }
    
    // Update fields if provided
    if (title) note.title = title;
    if (content) note.content = content;
    if (color) note.color = color;
    
    await note.save();
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Mark note as complete with feedback
router.put('/:id/complete', authMiddleware, async (req, res) => {
  try {
    const { feedback } = req.body;
    
    // Find note and check ownership
    const note = await Note.findById(req.params.id);
    
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    
    if (note.user.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to update this note' });
    }
    
    // Mark as complete with feedback
    note.isCompleted = true;
    note.completedAt = new Date();
    note.completionFeedback = feedback || '';
    
    await note.save();
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete note
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    // Find note and check ownership
    const note = await Note.findById(req.params.id);
    
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    
    if (note.user.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this note' });
    }
    
    await note.deleteOne();
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;