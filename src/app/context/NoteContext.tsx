"use client";

import { createContext, useState, useContext, ReactNode } from "react";
import { CreateNote, UpdateNote } from "../interfaces/Note";
import { Note } from "@prisma/client";

// Definir la estructura del contexto
interface NoteContextType {
  notes: Note[];
  loadNotes: () => Promise<void>;
  createNote: (note: CreateNote) => Promise<void>;
  deleteNote: (id: number) => Promise<void>;
  selectedNote: Note | null;
  setSelectedNote: (note: Note | null) => void;
  updateNote: (id: number, note: UpdateNote) => Promise<void>;
}

// Crear el contexto con valores iniciales por defecto
export const NoteContext = createContext<NoteContextType>({
  notes: [],
  loadNotes: async () => {},
  createNote: async (note: CreateNote) => {},
  deleteNote: async (id: number) => {},
  selectedNote: null,
  setSelectedNote: (note: Note | null) => {},
  updateNote: async (id: number, note: UpdateNote) => {},
});

// Hook personalizado para usar el contexto de notas
export const useNotes = () => {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
};

// Proveedor del contexto de notas
export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  // Función para cargar notas desde la API
  async function loadNotes() {
    const res = await fetch("/api/notes");
    const data = await res.json();
    setNotes(data);
  }

  // Función para crear una nueva nota
  async function createNote(note: CreateNote) {
    const res = await fetch("/api/notes", {
      method: "POST",
      body: JSON.stringify(note),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const newNote = await res.json();
    setNotes([...notes, newNote]);
  }

  // Función para eliminar una nota
  async function deleteNote(id: number) {
    await fetch(`/api/notes/${id}`, {
      method: "DELETE",
    });
    setNotes(notes.filter((note) => note.id !== id));
  }

  // Función para actualizar una nota
  async function updateNote(id: number, note: UpdateNote) {
    const res = await fetch(`/api/notes/${id}`, {
      method: "PUT",
      body: JSON.stringify(note),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const updatedNote = await res.json();
    setNotes(notes.map((n) => (n.id === id ? updatedNote : n)));
  }

  // Proveer el contexto a los componentes hijos
  return (
    <NoteContext.Provider
      value={{
        notes,
        loadNotes,
        createNote,
        deleteNote,
        selectedNote,
        setSelectedNote,
        updateNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
