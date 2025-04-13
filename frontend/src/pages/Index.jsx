import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Editor from "../components/Editor";
import useNotes from "../hooks/useNotes";
import { useIsMobile } from "../hooks/use-mobile";
import { useAppSelector } from "../redux/hooks";

const Index = () => {
  const {
    notes,
    activeNote,
    activeNoteId,
    setActiveNoteId,
    createNote,
    updateNote,
    deleteNote,
  } = useNotes();

  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const { darkMode } = useAppSelector((state) => state.theme);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSelectNote = (id) => {
    setActiveNoteId(id);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <div
      className={`flex flex-col h-screen ${
        darkMode ? "bg-gray-900 text-gray-100" : ""
      }`}
    >
      <Header
        onCreateNote={createNote}
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <main className="flex flex-1 overflow-hidden">
        <Sidebar
          notes={notes}
          activeNoteId={activeNoteId}
          onSelectNote={handleSelectNote}
          onDeleteNote={deleteNote}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <div
          className={`flex-1 transition-all duration-300 ${
            !isMobile && sidebarOpen ? "ml-72" : "ml-0"
          } ${darkMode ? "bg-gray-900" : ""}`}
        >
          <Editor note={activeNote} onUpdateNote={updateNote} />
        </div>
      </main>
    </div>
  );
};

export default Index;
