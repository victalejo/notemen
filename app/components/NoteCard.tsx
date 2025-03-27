'use client';

import { useState, useEffect } from 'react';
import { useNotes } from '../context/NoteContext';
import { Note } from '../types';

interface NoteCardProps {
  note: Note;
  isSelected: boolean;
  onSelect: () => void;
}

export default function NoteCard({ note, isSelected, onSelect }: NoteCardProps) {
  const [preview, setPreview] = useState('');
  
  useEffect(() => {
    // Eliminar etiquetas HTML para la vista previa
    const content = note.content.replace(/<[^>]*>/g, '');
    setPreview(content.slice(0, 150) + (content.length > 150 ? '...' : ''));
  }, [note.content]);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div 
      className={`p-4 border-b border-gray-200 dark:border-gray-800 cursor-pointer ${isSelected ? 'bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}
      onClick={onSelect}
    >
      <h3 className="font-medium mb-1">{note.title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{preview}</p>
      <div className="text-xs text-gray-400 dark:text-gray-500">
        Actualizado el {formatDate(note.updatedAt)}
      </div>
    </div>
  );
}