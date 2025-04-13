import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

const NoteCard = ({ note, isActive, onClick, onDelete }) => {
  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete();
  };

  const timeAgo = formatDistanceToNow(new Date(note.updatedAt), {
    addSuffix: true,
  });

  return (
    <div
      className={cn(
        "note-card mb-4 p-3 rounded-md cursor-pointer transition-colors relative group",
        isActive
          ? "bg-writer-highlight border border-blue-200"
          : "hover:bg-slate-50 border border-transparent",
      )}
      onClick={onClick}
    >
      <h3 className="font-medium text-sm truncate mb-1">
        {note.title || "Untitled Note"}
      </h3>
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-400">{timeAgo}</span>
        <Button
          variant="ghost"
          size="icon"
          className="note-actions h-6 w-6"
          onClick={handleDelete}
        >
          <Trash2 size={14} className="text-slate-400 hover:text-red-500" />
        </Button>
      </div>
    </div>
  );
};

export default NoteCard;
