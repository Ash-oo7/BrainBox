import { useEffect, useState, createContext } from "react";
import Spinner from "../icons/Spinner";
import { db } from "../appwrite/databases";
import { useAuth } from "./AuthContext";

export const NoteContext = createContext();

const NoteProvider = ({ children }) => {
  const { userId, loading, setLoading } = useAuth();
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  const contextData = { notes, setNotes, selectedNote, setSelectedNote };

  useEffect(() => {
    if (userId) {
      init();
    }
  }, [userId]);

  const init = async () => {
    try {
      const response = await db.notes.list(userId);

      setNotes(response.documents);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <NoteContext.Provider value={contextData}>
      {loading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Spinner size="100" />
        </div>
      ) : (
        children
      )}
    </NoteContext.Provider>
  );
};

export default NoteProvider;
