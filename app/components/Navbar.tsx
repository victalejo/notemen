'use client';

import { useState } from 'react';
import { useNotes } from '../context/NoteContext';

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');
  const { notes, selectNote } = useNotes();
  
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  
  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <nav className="h-14 border-b border-gray-200 dark:border-gray-800 px-4 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <span className="font-bold text-xl">NoteMen</span>
      </div>
      
      <div className="max-w-md w-full">
        <input
          type="text"
          placeholder="Buscar notas..."
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={handleSearch}
        />
        
        {searchTerm && (
          <div className="absolute w-full max-w-md mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
            {filteredNotes.length > 0 ? (
              <ul className="py-2">
                {filteredNotes.map((note) => (
                  <li 
                    key={note.id}
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    onClick={() => {
                      selectNote(note.id);
                      setSearchTerm('');
                    }}
                  >
                    <div className="font-medium">{note.title}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {note.content.replace(/<[^>]*>/g, '').slice(0, 50)}...
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-4 py-2 text-gray-500 dark:text-gray-400">
                No se encontraron resultados.
              </div>
            )}
          </div>
        )}
      </div>
      
      <div>
        <button 
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          title="Configuración"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        </button>
      </div>
    </nav>
  );
}