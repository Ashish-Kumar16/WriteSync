
import { useState, useEffect, useCallback } from "react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { formatDistanceToNow } from "date-fns";
import { debounce } from "lodash";
import { Textarea } from "@/components/ui/textarea";

const Editor = ({ note, onUpdateNote }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [note]);

  // Debounced save function to reduce the number of saves
  const debouncedSave = useCallback(
    debounce((id, updates) => {
      onUpdateNote(id, updates);
    }, 500),
    [onUpdateNote]
  );

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (note) {
      debouncedSave(note.id, { title: newTitle });
    }
  };

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    if (note) {
      debouncedSave(note.id, { content: newContent });
    }
  };

  if (!note) {
    return (
      <div className="editor-container flex items-center justify-center text-slate-400">
        <p>Select a note or create a new one to start writing</p>
      </div>
    );
  }

  const updatedTimeAgo = formatDistanceToNow(
    new Date(note.updatedAt),
    { addSuffix: true }
  );

  return (
    <div className="editor-container animate-fade-in p-4">
      <Input
        value={title}
        onChange={handleTitleChange}
        placeholder="Untitled Note"
        className="text-2xl font-bold border-none p-0 mb-2 focus-visible:ring-0 focus-visible:ring-offset-0"
      />
      <div className="text-xs text-slate-400 mb-4">
        Last updated {updatedTimeAgo}
      </div>
      <Separator className="my-4" />
      <Textarea
        value={content}
        onChange={handleContentChange}
        placeholder="Start writing your thoughts..."
        className="w-full min-h-[calc(100vh-200px)] resize-none border-0 bg-transparent p-0 focus:outline-none focus:ring-0 text-slate-800 dark:text-slate-200 placeholder:text-slate-400"
      />
    </div>
  );
};

export default Editor;
