import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toast } from "@/components/ui/use-toast";
import { signOut } from "@/redux/authSlice";

const API_URL = "http://localhost:5000/api/notes";

const useNotes = () => {
  const [notes, setNotes] = useState([]);
  const [activeNoteId, setActiveNoteId] = useState(null);
  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Fetch all notes
  const fetchNotes = async () => {
    if (!token) {
      console.warn("No token available, skipping fetchNotes");
      return;
    }
    try {
      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        if (response.status === 401) {
          dispatch(signOut());
          navigate("/signin");
          toast({
            title: "Session expired, please sign in again",
            variant: "destructive",
          });
          return;
        }
        throw new Error("Failed to fetch notes");
      }
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error("Fetch notes error:", error);
      setNotes([]);
      toast({ title: "Error fetching notes", variant: "destructive" });
    }
  };

  // Create a new note
  const createNote = async () => {
    if (!token) {
      console.warn("No token available, cannot create note");
      toast({
        title: "Please sign in to create a note",
        variant: "destructive",
      });
      navigate("/signin");
      return;
    }
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: "", content: "" }),
      });
      if (!response.ok) {
        if (response.status === 401) {
          dispatch(signOut());
          navigate("/signin");
          toast({
            title: "Session expired, please sign in again",
            variant: "destructive",
          });
          return;
        }
        throw new Error("Failed to create note");
      }
      const newNote = await response.json();
      setNotes((prevNotes) => [...prevNotes, newNote]);
      setActiveNoteId(newNote.id);
      toast({ title: "Note created successfully" });
    } catch (error) {
      console.error("Create note error:", error);
      toast({ title: "Error creating note", variant: "destructive" });
    }
  };

  // Update an existing note
  const updateNote = async (id, updates) => {
    if (!token) {
      console.warn("No token available, cannot update note");
      return;
    }
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });
      if (!response.ok) {
        if (response.status === 401) {
          dispatch(signOut());
          navigate("/signin");
          toast({
            title: "Session expired, please sign in again",
            variant: "destructive",
          });
          return;
        }
        throw new Error("Failed to update note");
      }
      const updatedNote = await response.json();
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === id ? updatedNote : note)),
      );
    } catch (error) {
      console.error("Update note error:", error);
      toast({ title: "Error saving note", variant: "destructive" });
    }
  };

  // Delete a note
  const deleteNote = async (id) => {
    if (!token) {
      console.warn("No token available, cannot delete note");
      return;
    }
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        if (response.status === 401) {
          dispatch(signOut());
          navigate("/signin");
          toast({
            title: "Session expired, please sign in again",
            variant: "destructive",
          });
          return;
        }
        throw new Error("Failed to delete note");
      }
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
      if (activeNoteId === id) {
        setActiveNoteId(notes[0]?.id || null);
      }
      toast({ title: "Note deleted successfully" });
    } catch (error) {
      console.error("Delete note error:", error);
      toast({ title: "Error deleting note", variant: "destructive" });
    }
  };

  // Fetch notes when token is available
  useEffect(() => {
    if (token) {
      fetchNotes();
    } else {
      setNotes([]);
      setActiveNoteId(null);
    }
  }, [token, dispatch, navigate]);

  return {
    notes,
    activeNote: notes.find((note) => note.id === activeNoteId) || null,
    activeNoteId,
    setActiveNoteId,
    createNote,
    updateNote,
    deleteNote,
  };
};

export default useNotes;
