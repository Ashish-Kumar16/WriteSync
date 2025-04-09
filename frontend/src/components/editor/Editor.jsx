import React, { useState, useEffect, useRef } from "react";
import { useBlockEditor } from "@/hooks/useBlockEditor";
import TextBlock from "./blocks/TextBlock";
import BlockMenu from "./blocks/BlockMenu";
import { Box, Button, IconButton, TextField } from "@mui/material";
import {
  Add as PlusIcon,
  DragHandle as GripIcon,
  ArrowUpward as ArrowUpIcon,
  ArrowDownward as ArrowDownIcon,
  Delete as Trash2Icon,
  Image as ImageIcon,
} from "@mui/icons-material";
import { toast } from "sonner";
import { useTheme } from "@mui/material/styles";

const Editor = ({ initialBlocks = [], onChange }) => {
  const {
    blocks,
    setBlocks,
    selectedBlockId,
    setSelectedBlockId,
    addBlock,
    updateBlock,
    removeBlock,
    changeBlockType,
    moveBlockUp,
    moveBlockDown,
  } = useBlockEditor(initialBlocks);

  const [showBlockMenu, setShowBlockMenu] = useState(false);
  const [blockMenuPosition, setBlockMenuPosition] = useState({
    top: 0,
    left: 0,
  });
  const [blockMenuTargetId, setBlockMenuTargetId] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedBlockId, setDraggedBlockId] = useState(null);
  const [dragOverBlockId, setDragOverBlockId] = useState(null);
  const fileInputRef = useRef(null);
  const theme = useTheme();

  useEffect(() => {
    onChange && onChange(blocks);
  }, [blocks, onChange]);

  useEffect(() => {
    if (blocks.length === 0) {
      const id = addBlock("paragraph");
      setSelectedBlockId(id);
    }
  }, [blocks.length, addBlock, setSelectedBlockId]);

  const handleBlockClick = (blockId) => {
    setSelectedBlockId(blockId);
  };

  const handleKeyDown = (e, blockId) => {
    const blockIndex = blocks.findIndex((b) => b.id === blockId);
    const block = blocks[blockIndex];

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const newBlockId = addBlock("paragraph", blockId);
      setSelectedBlockId(newBlockId);
    } else if (e.key === "Backspace" && !block.content && blocks.length > 1) {
      e.preventDefault();
      removeBlock(blockId);
      if (blockIndex > 0) {
        setSelectedBlockId(blocks[blockIndex - 1].id);
      } else if (blockIndex === 0 && blocks.length > 1) {
        setSelectedBlockId(blocks[1].id);
      }
    } else if (e.key === "/") {
      e.preventDefault();
      const rect = e.target.getBoundingClientRect();
      setBlockMenuPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
      setBlockMenuTargetId(blockId);
      setShowBlockMenu(true);
    }
  };

  const handleAddBlock = (position, targetId) => {
    if (position) {
      setBlockMenuPosition(position);
    }
    setBlockMenuTargetId(targetId || null);
    setShowBlockMenu(true);
  };

  const handleSelectBlockType = (type) => {
    if (blockMenuTargetId) {
      if (blocks.find((b) => b.id === blockMenuTargetId)?.content === "") {
        changeBlockType(blockMenuTargetId, type);
      } else {
        addBlock(type, blockMenuTargetId);
      }
    } else {
      const newId = addBlock(type);
      setSelectedBlockId(newId);
    }
    setShowBlockMenu(false);
  };

  const handleDragStart = (e, blockId) => {
    setIsDragging(true);
    setDraggedBlockId(blockId);
    e.dataTransfer.setData("text/plain", blockId);
    e.dataTransfer.effectAllowed = "move";
    const draggedElement = document.getElementById(`block-${blockId}`);
    if (draggedElement && e.dataTransfer.setDragImage) {
      e.dataTransfer.setDragImage(draggedElement, 0, 0);
    }
  };

  const handleDragOver = (e, blockId) => {
    e.preventDefault();
    if (blockId !== draggedBlockId) {
      setDragOverBlockId(blockId);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDraggedBlockId(null);
    setDragOverBlockId(null);
  };

  const handleDrop = (e, targetBlockId) => {
    e.preventDefault();
    const sourceBlockId = e.dataTransfer.getData("text/plain");

    if (sourceBlockId && targetBlockId && sourceBlockId !== targetBlockId) {
      const sourceIndex = blocks.findIndex((b) => b.id === sourceBlockId);
      const targetIndex = blocks.findIndex((b) => b.id === targetBlockId);

      if (sourceIndex !== -1 && targetIndex !== -1) {
        const updatedBlocks = [...blocks];
        const [movedBlock] = updatedBlocks.splice(sourceIndex, 1);
        updatedBlocks.splice(targetIndex, 0, movedBlock);
        setBlocks(updatedBlocks);
        setSelectedBlockId(sourceBlockId);
      }
    }

    setIsDragging(false);
    setDraggedBlockId(null);
    setDragOverBlockId(null);
  };

  const handleBlockActionClick = (action, blockId) => {
    switch (action) {
      case "moveUp":
        moveBlockUp(blockId);
        break;
      case "moveDown":
        moveBlockDown(blockId);
        break;
      case "delete":
        removeBlock(blockId);
        const blockIndex = blocks.findIndex((b) => b.id === blockId);
        if (blockIndex > 0) {
          setSelectedBlockId(blocks[blockIndex - 1].id);
        } else if (blocks.length > 1) {
          setSelectedBlockId(blocks[1].id);
        }
        break;
    }
  };

  const handleImageUpload = (blockId) => {
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute("data-block-id", blockId);
      fileInputRef.current.click();
    }
  };

  const handleFileSelected = (e) => {
    const files = e.target.files;
    const blockId = e.target.getAttribute("data-block-id");

    if (files && files.length > 0 && blockId) {
      const file = files[0];
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          changeBlockType(blockId, "image");
          updateBlock(blockId, { content: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        bgcolor: "editor.background",
        pt: 3,
        pb: 16,
      }}
    >
      <Box sx={{ px: 2 }}>
        {blocks.map((block) => {
          const isSelected = selectedBlockId === block.id;
          const isDragOver = dragOverBlockId === block.id;

          return (
            <Box
              key={block.id}
              id={`block-${block.id}`}
              sx={{
                position: "relative",
                bgcolor: isSelected ? "editor.blockSelected" : "editor.block",
                border: isDragOver ? "2px dashed" : "none",
                borderColor: isDragOver ? "primary.main" : "transparent",
                p: 1,
                mb: 1,
                borderRadius: 1,
                "&:hover": {
                  bgcolor: isSelected
                    ? "editor.blockSelected"
                    : "editor.blockHover",
                },
              }}
              onClick={() => handleBlockClick(block.id)}
              draggable
              onDragStart={(e) => handleDragStart(e, block.id)}
              onDragOver={(e) => handleDragOver(e, block.id)}
              onDragEnd={handleDragEnd}
              onDrop={(e) => handleDrop(e, block.id)}
            >
              <IconButton
                sx={{
                  position: "absolute",
                  left: 2,
                  top: "50%",
                  transform: "translateY(-50%)",
                  opacity: isSelected ? 1 : 0,
                  "&:hover": { bgcolor: "action.hover" },
                  cursor: "grab",
                }}
                onMouseDown={(e) => e.preventDefault()}
              >
                <GripIcon fontSize="small" />
              </IconButton>

              <TextBlock
                block={block}
                isSelected={isSelected}
                onChange={(content) => updateBlock(block.id, { content })}
                onKeyDown={(e) => handleKeyDown(e, block.id)}
                onClick={() => handleBlockClick(block.id)}
                placeholder={
                  block.type === "heading-1"
                    ? "Heading 1"
                    : block.type === "heading-2"
                    ? "Heading 2"
                    : block.type === "heading-3"
                    ? "Heading 3"
                    : block.type === "bulleted-list"
                    ? "List item"
                    : block.type === "numbered-list"
                    ? "List item"
                    : block.type === "image"
                    ? "Image caption"
                    : "Type '/' for commands"
                }
              />

              {isSelected && (
                <Box
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: "50%",
                    transform: "translateY(-50%)",
                    display: "flex",
                    gap: 0.5,
                    bgcolor: "secondary.main",
                    borderRadius: 1,
                    p: 0.5,
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={() => handleBlockActionClick("moveUp", block.id)}
                    disabled={blocks.indexOf(block) === 0}
                    sx={{ color: "text.primary" }}
                  >
                    <ArrowUpIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleBlockActionClick("moveDown", block.id)}
                    disabled={blocks.indexOf(block) === blocks.length - 1}
                    sx={{ color: "text.primary" }}
                  >
                    <ArrowDownIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleImageUpload(block.id)}
                    sx={{ color: "text.primary" }}
                  >
                    <ImageIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleBlockActionClick("delete", block.id)}
                    disabled={blocks.length <= 1}
                    sx={{
                      color: "error.main",
                      "&:hover": { color: "error.dark" },
                    }}
                  >
                    <Trash2Icon fontSize="small" />
                  </IconButton>
                </Box>
              )}
            </Box>
          );
        })}

        <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
          <Button
            variant="text"
            startIcon={<PlusIcon fontSize="small" />}
            onClick={() => handleAddBlock()}
            sx={{
              color: "text.secondary",
              "&:hover": { color: "text.primary" },
            }}
          >
            Add block
          </Button>
        </Box>
      </Box>

      <TextField
        type="file"
        inputRef={fileInputRef}
        inputProps={{ accept: "image/*" }}
        sx={{ display: "none" }}
        onChange={handleFileSelected}
      />

      {showBlockMenu && (
        <>
          <Box
            sx={{
              position: "fixed",
              inset: 0,
              zIndex: 10,
            }}
            onClick={() => setShowBlockMenu(false)}
          />
          <Box
            sx={{
              position: "absolute",
              zIndex: 20,
              top: blockMenuPosition.top,
              left: blockMenuPosition.left,
            }}
          >
            <BlockMenu onSelectBlockType={handleSelectBlockType} />
          </Box>
        </>
      )}
    </Box>
  );
};

export default Editor;
