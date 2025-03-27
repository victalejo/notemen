'use client';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import NoteCard from './components/NoteCard';
import { NoteProvider, useNotes } from './context/NoteContext';

function NotesList() {
  const { notes, selectedNoteId, selectedCategoryId, selectNote, getNotesByCategory } = useNotes();
  
  const filteredNotes = selectedCategoryId !== null
    ? getNotesByCategory(selectedCategoryId)
    : notes;
  
  return (
    <div className="w-72 border-r border-gray-200 dark:border-gray-800 overflow-y-auto">
      <div className="h-14 border-b border-gray-200 dark:border-gray-800 px-4 flex items-center">
        <h2 className="font-medium">
          {selectedCategoryId !== null
            ? 'Categoría'
            : 'Todas las notas'}
        </h2>
        <span className="ml-auto text-gray-500 dark:text-gray-400 text-sm">
          {filteredNotes.length} {filteredNotes.length === 1 ? 'nota' : 'notas'}
        </span>
      </div>
      
      <div>
        {filteredNotes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            isSelected={note.id === selectedNoteId}
            onSelect={() => selectNote(note.id)}
          />
        ))}
        
        {filteredNotes.length === 0 && (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
            No hay notas disponibles.
          </div>
        )}
      </div>
    </div>
  );
}

function Main() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <NotesList />
        <Editor />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <NoteProvider>
      <Main />
    </NoteProvider>
  );
}