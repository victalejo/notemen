import { Note, Category } from '../types';

// Función para obtener todas las notas
export const getNotes = (): Note[] => {
  if (typeof window === 'undefined') return [];
  
  const notes = localStorage.getItem('notes');
  return notes ? JSON.parse(notes) : [];
};

// Función para obtener todas las categorías
export const getCategories = (): Category[] => {
  if (typeof window === 'undefined') return [];
  
  const categories = localStorage.getItem('categories');
  return categories ? JSON.parse(categories) : [];
};

// Función para guardar una nota
export const saveNote = (note: Note): Note => {
  const notes = getNotes();
  const existingNoteIndex = notes.findIndex(n => n.id === note.id);
  
  if (existingNoteIndex >= 0) {
    notes[existingNoteIndex] = { ...note, updatedAt: new Date().toISOString() };
  } else {
    notes.push({
      ...note,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }
  
  localStorage.setItem('notes', JSON.stringify(notes));
  return note;
};

// Función para eliminar una nota
export const deleteNote = (id: string): void => {
  const notes = getNotes().filter(note => note.id !== id);
  localStorage.setItem('notes', JSON.stringify(notes));
};

// Función para guardar una categoría
export const saveCategory = (category: Category): Category => {
  const categories = getCategories();
  const existingCategoryIndex = categories.findIndex(c => c.id === category.id);
  
  if (existingCategoryIndex >= 0) {
    categories[existingCategoryIndex] = category;
  } else {
    categories.push({
      ...category,
      id: crypto.randomUUID(),
    });
  }
  
  localStorage.setItem('categories', JSON.stringify(categories));
  return category;
};

// Función para eliminar una categoría
export const deleteCategory = (id: string): void => {
  const categories = getCategories().filter(category => category.id !== id);
  localStorage.setItem('categories', JSON.stringify(categories));
  
  // Eliminar la categoría de las notas que la usaban
  const notes = getNotes().map(note => {
    if (note.categoryId === id) {
      return { ...note, categoryId: null, updatedAt: new Date().toISOString() };
    }
    return note;
  });
  
  localStorage.setItem('notes', JSON.stringify(notes));
};