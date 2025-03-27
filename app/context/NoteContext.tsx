'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Note, Category } from '../types';
import { getNotes, getCategories, saveNote, deleteNote, saveCategory, deleteCategory } from '../lib/localStorage';

interface NoteContextType {
  notes: Note[];
  categories: Category[];
  selectedNoteId: string | null;
  selectedCategoryId: string | null;
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (note: Note) => void;
  removeNote: (id: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (category: Category) => void;
  removeCategory: (id: string) => void;
  selectNote: (id: string | null) => void;
  selectCategory: (id: string | null) => void;
  getSelectedNote: () => Note | undefined;
  getNotesByCategory: (categoryId: string | null) => Note[];
}

const NoteContext = createContext<NoteContextType | undefined>(undefined);

export const NoteProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  // Cargar notas y categorías cuando el componente se monta
  useEffect(() => {
    setNotes(getNotes());
    setCategories(getCategories());
  }, []);

  const addNote = (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newNote = saveNote({
      ...note,
      id: '',
      createdAt: '',
      updatedAt: '',
    });
    setNotes(getNotes());
    setSelectedNoteId(newNote.id);
  };

  const updateNote = (note: Note) => {
    saveNote(note);
    setNotes(getNotes());
  };

  const removeNote = (id: string) => {
    deleteNote(id);
    setNotes(getNotes());
    if (selectedNoteId === id) {
      setSelectedNoteId(null);
    }
  };

  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCategory = saveCategory({
      ...category,
      id: '',
    });
    setCategories(getCategories());
    return newCategory;
  };

  const updateCategory = (category: Category) => {
    saveCategory(category);
    setCategories(getCategories());
  };

  const removeCategory = (id: string) => {
    deleteCategory(id);
    setCategories(getCategories());
    if (selectedCategoryId === id) {
      setSelectedCategoryId(null);
    }
  };

  const selectNote = (id: string | null) => {
    setSelectedNoteId(id);
  };

  const selectCategory = (id: string | null) => {
    setSelectedCategoryId(id);
  };

  const getSelectedNote = () => {
    return notes.find(note => note.id === selectedNoteId);
  };

  const getNotesByCategory = (categoryId: string | null) => {
    return notes.filter(note => note.categoryId === categoryId);
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        categories,
        selectedNoteId,
        selectedCategoryId,
        addNote,
        updateNote,
        removeNote,
        addCategory,
        updateCategory,
        removeCategory,
        selectNote,
        selectCategory,
        getSelectedNote,
        getNotesByCategory,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NoteContext);
  if (context === undefined) {
    throw new Error('useNotes must be used within a NoteProvider');
  }
  return context;
};