import React, { useContext } from "react";
import NoteCard from "../components/NoteCard";
import { NoteContext } from "../Context/NoteContext";
import Controls from "../components/Controls";

const NotesPage = () => {
  const { notes, setNotes } = useContext(NoteContext);

  return (
    <div id="app">
      {notes.map((note) => (
        <NoteCard key={note.$id} note={note} setNotes={setNotes} />
      ))}
      <Controls />
    </div>
  );
};

export default NotesPage;
