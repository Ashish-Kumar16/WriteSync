import React, { useState, useRef, useEffect } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import {
  FormatAlignLeft as TypeIcon,
  LooksOne as Heading1Icon,
  LooksTwo as Heading2Icon,
  Looks3 as Heading3Icon,
  List as ListIcon,
  FormatListNumbered as ListOrderedIcon,
  Check as CheckIcon,
  Image as ImageIcon,
  Remove as MinusIcon,
  Code as CodeIcon,
  TableChart as TableIcon,
  FormatQuote as FileTextIcon,
  Movie as FilmIcon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

const blockOptions = [
  {
    type: "paragraph",
    label: "Text",
    icon: <TypeIcon fontSize="small" />,
    description: "Plain text block for regular content",
  },
  {
    type: "heading-1",
    label: "Heading 1",
    icon: <Heading1Icon fontSize="small" />,
    description: "Large heading for main sections",
  },
  {
    type: "heading-2",
    label: "Heading 2",
    icon: <Heading2Icon fontSize="small" />,
    description: "Medium heading for subsections",
  },
  {
    type: "heading-3",
    label: "Heading 3",
    icon: <Heading3Icon fontSize="small" />,
    description: "Small heading for minor sections",
  },
  {
    type: "bulleted-list",
    label: "Bulleted List",
    icon: <ListIcon fontSize="small" />,
    description: "Unordered list with bullet points",
  },
  {
    type: "numbered-list",
    label: "Numbered List",
    icon: <ListOrderedIcon fontSize="small" />,
    description: "Ordered list with numbers",
  },
  {
    type: "to-do",
    label: "To-do List",
    icon: <CheckIcon fontSize="small" />,
    description: "Checklist for tasks and to-dos",
  },
  {
    type: "image",
    label: "Image",
    icon: <ImageIcon fontSize="small" />,
    description: "Upload or embed an image",
  },
  {
    type: "divider",
    label: "Divider",
    icon: <MinusIcon fontSize="small" />,
    description: "Visual separator between content",
  },
  {
    type: "code",
    label: "Code Block",
    icon: <CodeIcon fontSize="small" />,
    description: "Code snippet with syntax highlighting",
  },
  {
    type: "table",
    label: "Table",
    icon: <TableIcon fontSize="small" />,
    description: "Insert a table to organize data",
  },
  {
    type: "quote",
    label: "Quote",
    icon: <FileTextIcon fontSize="small" />,
    description: "Blockquote for citations or callouts",
  },
  {
    type: "callout",
    label: "Callout",
    icon: <FileTextIcon fontSize="small" />,
    description: "Highlighted text block with icon",
  },
  {
    type: "embed",
    label: "Embed",
    icon: <FilmIcon fontSize="small" />,
    description: "Embed external content or media",
  },
];

const BlockMenu = ({ onSelectBlockType, className }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef(null);
  const theme = useTheme();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const filteredOptions = searchTerm
    ? blockOptions.filter(
        (option) =>
          option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
          option.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : blockOptions;

  return (
    <Box
      sx={{
        width: 256, // Matches w-64 (64 * 4px = 256px)
        bgcolor: "background.paper",
        border: 1,
        borderColor: "divider",
        borderRadius: 1,
        boxShadow: 3,
        animation: "fadeIn 0.3s", // Matches animate-fade-in (requires CSS keyframes if needed)
        ...className,
      }}
    >
      <Box
        sx={{
          p: 1,
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <TextField
          inputRef={inputRef}
          placeholder="Search block types..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          size="small"
          sx={{
            "& .MuiInputBase-root": {
              bgcolor: "transparent",
              borderRadius: 1,
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "divider",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "grey.500",
            },
            "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "primary.main",
            },
          }}
        />
      </Box>
      <Box
        sx={{
          maxHeight: 240, // Matches max-h-60 (60 * 4px = 240px)
          overflowY: "auto",
          py: 0.5,
        }}
      >
        {filteredOptions.map((option) => (
          <Button
            key={option.type}
            variant="text"
            onClick={() => onSelectBlockType(option.type)}
            fullWidth
            sx={{
              justifyContent: "flex-start",
              px: 1.5,
              py: 1,
              textTransform: "none",
              textAlign: "left",
              "&:hover": { bgcolor: "action.hover" },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "flex-start" }}>
              <Box sx={{ mr: 1, mt: 0.5, color: "text.secondary" }}>
                {option.icon}
              </Box>
              <Box>
                <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                  {option.label}
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  {option.description}
                </Typography>
              </Box>
            </Box>
          </Button>
        ))}
        {filteredOptions.length === 0 && (
          <Typography
            variant="body2"
            sx={{ px: 1.5, py: 1, color: "text.secondary" }}
          >
            No block types match your search.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default BlockMenu;
