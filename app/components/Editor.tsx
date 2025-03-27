'use client';

import { useState, useEffect } from 'react';
import { useNotes } from '../context/NoteContext';

export default function Editor() {
  const { getSelectedNote, updateNote, removeNote } = useNotes();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  
  const selectedNote = getSelectedNote();
  
  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content);
      setLastSaved(new Date(selectedNote.updatedAt));
    } else {
      setTitle('');
      setContent('');
      setLastSaved(null);
    }
  }, [selectedNote]);
  
  const handleSave = () => {
    if (!selectedNote) return;
    
    updateNote({
      ...selectedNote,
      title,
      content,
    });
    
    setLastSaved(new Date());
  };
  
  // Guardar automáticamente cuando el usuario deja de escribir por 2 segundos
  useEffect(() => {
    if (!selectedNote) return;
    
    const timer = setTimeout(() => {
      handleSave();
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [title, content]);
  
  const handleDelete = () => {
    if (!selectedNote || !confirm('¿Estás seguro de que deseas eliminar esta nota?')) return;
    
    removeNote(selectedNote.id);
  };
  
  if (!selectedNote) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
        <div className="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-lg">Selecciona una nota o crea una nueva para empezar</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-800">
        <div className="flex-1">
          {lastSaved && (
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Guardado: {lastSaved.toLocaleTimeString('es-ES')}
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleDelete}
            className="p-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
            title="Eliminar nota"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="p-4">
          <input
            type="text"
            className="w-full text-2xl font-bold bg-transparent border-0 outline-none mb-4"
            placeholder="Título de la nota"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          
          <textarea
            className="w-full h-full min-h-[300px] bg-transparent border-0 outline-none resize-none"
            placeholder="Escribe aquí el contenido de tu nota..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}