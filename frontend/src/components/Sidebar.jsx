import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import NoteCard from "./NoteCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAppSelector } from "@/redux/hooks";

const Sidebar = ({
  notes,
  activeNoteId,
  onSelectNote,
  onDeleteNote,
  isOpen,
  onClose,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const isMobile = useIsMobile();
  const { darkMode } = useAppSelector((state) => state.theme);

  const filteredNotes = searchTerm
    ? notes.filter(
        (note) =>
          note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.content.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : notes;

  const sortedNotes = [...filteredNotes].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );

  return (
    <aside
      className={cn(
        "border-r border-writer-border h-[calc(100vh-64px)] w-72 fixed top-16 left-0 z-20 transition-transform duration-300 ease-in-out",
        darkMode
          ? "bg-dark-paper text-dark-text border-dark-border"
          : "bg-white",
        isOpen
          ? "translate-x-0"
          : isMobile
          ? "-translate-x-full"
          : "translate-x-0",
      )}
    >
      <div className="flex flex-col h-full p-4">
        <div className="flex items-center space-x-2 mb-4">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={cn(
                "pl-9",
                darkMode
                  ? "bg-dark-background border-dark-border "
                  : "bg-slate-50 border-slate-200",
              )}
            />
          </div>
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="flex md:hidden"
            >
              <X size={18} />
            </Button>
          )}
        </div>

        {sortedNotes.length > 0 ? (
          <ScrollArea className="flex-grow">
            <div className="space-y-2 pr-3">
              {sortedNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  isActive={note.id === activeNoteId}
                  onClick={() => onSelectNote(note.id)}
                  onDelete={() => onDeleteNote(note.id)}
                />
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div
            className={cn(
              "flex-grow flex items-center justify-center text-center p-4",
              darkMode ? "text-slate-500" : "text-slate-400",
            )}
          >
            {searchTerm
              ? "No notes match your search"
              : "No notes yet. Create your first note!"}
          </div>
        )}

        <div
          className={cn(
            "mt-auto pt-4 text-center text-xs",
            darkMode ? "text-slate-500" : "text-slate-400",
          )}
        >
          {notes.length} {notes.length === 1 ? "note" : "notes"}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
