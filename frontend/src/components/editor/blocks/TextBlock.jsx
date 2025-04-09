import React, { useRef, useEffect } from "react";
import { Box, Typography, Divider } from "@mui/material";
import { cn } from "@/lib/utils"; // if you still need to combine class names

const TextBlock = ({
  block,
  isSelected,
  onChange,
  onKeyDown,
  onClick,
  placeholder = "Type something...",
}) => {
  const contentRef = useRef(null);

  // focus & move cursor to end when selected
  useEffect(() => {
    if (isSelected && contentRef.current && block.type !== "image") {
      contentRef.current.focus();
      const range = document.createRange();
      const sel = window.getSelection();
      const nodes = contentRef.current.childNodes;
      if (nodes.length) {
        range.setStartAfter(nodes[nodes.length - 1]);
        range.collapse(true);
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
    }
  }, [isSelected, block.type]);

  const handleContentChange = () => {
    if (contentRef.current) {
      onChange(contentRef.current.innerHTML);
    }
  };

  // map block.type to typography variants or sx
  const variantMap = {
    "heading-1": { variant: "h4", sx: { fontWeight: "bold" } },
    "heading-2": { variant: "h5", sx: { fontWeight: "bold" } },
    "heading-3": { variant: "h6", sx: { fontWeight: "bold" } },
    "bulleted-list": {
      component: "ul",
      sx: { pl: 2, "& li": { listStyle: "disc" } },
    },
    "numbered-list": {
      component: "ol",
      sx: { pl: 2, "& li": { listStyle: "decimal" } },
    },
    quote: {
      variant: "body1",
      sx: { fontStyle: "italic", borderLeft: 4, pl: 2, borderColor: "divider" },
    },
    code: {
      component: "pre",
      sx: {
        fontFamily: "Monospace",
        p: 1,
        bgcolor: "background.paper",
        borderRadius: 1,
        overflow: "auto",
      },
    },
    p: { variant: "body1" },
  };

  // IMAGE BLOCK
  if (block.type === "image") {
    return (
      <Box display="flex" flexDirection="column" gap={1} width="100%">
        <Box
          component="img"
          src={
            block.content ||
            "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
          }
          alt="Block image"
          sx={{ width: "100%", borderRadius: 1, objectFit: "cover" }}
        />
        <Typography
          ref={contentRef}
          component="div"
          contentEditable
          suppressContentEditableWarning
          onInput={handleContentChange}
          onKeyDown={onKeyDown}
          sx={{
            fontSize: "0.875rem",
            color: "text.secondary",
            fontStyle: "italic",
            textAlign: "center",
            outline: isSelected ? "1px solid" : "none",
            outlineColor: "primary.main",
            borderRadius: 1,
            p: 1,
            minHeight: "1.5em",
            "&:empty:before": {
              content: `"Add a caption..."`,
              color: "text.disabled",
            },
          }}
          dangerouslySetInnerHTML={{ __html: block.properties?.alt || "" }}
        />
      </Box>
    );
  }

  // DIVIDER BLOCK
  if (block.type === "divider") {
    return (
      <Box my={2}>
        <Divider />
      </Box>
    );
  }

  // TEXT / HEADING / LIST / QUOTE / CODE
  const mapKey = variantMap[block.type] ? block.type : "p";
  const { variant, component = "div", sx } = variantMap[mapKey];

  return (
    <Typography
      ref={contentRef}
      component={component}
      variant={variant}
      className={cn("editor-block-content", `editor-${mapKey}`)} // optional, if you have global CSS fallbacks
      contentEditable
      suppressContentEditableWarning
      onInput={handleContentChange}
      onKeyDown={onKeyDown}
      onClick={onClick}
      sx={{
        ...sx,
        outline: isSelected ? "1px solid" : "none",
        outlineColor: "primary.main",
        borderRadius: 1,
        p: 0.5,
        minHeight: "1.5em",
        "&:empty:before": {
          content: `"${placeholder}"`,
          color: "text.disabled",
        },
      }}
      dangerouslySetInnerHTML={{ __html: block.content || "" }}
    />
  );
};

export default TextBlock;
