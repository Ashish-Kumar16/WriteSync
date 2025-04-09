import React, { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { getPageById, updatePageTitle } from "../lib/mockData";
import Editor from "@/components/editor/Editor";
import { toast } from "sonner";
import { Box, TextField, Button, IconButton } from "@mui/material";
import {
  Download as DownloadIcon,
  Edit as EditIcon,
  Check as CheckIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import html2pdf from "html2pdf.js";

const PageView = () => {
  const { pageId } = useParams();
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const theme = useTheme();

  useEffect(() => {
    if (pageId) {
      const currentPage = getPageById(pageId);
      if (currentPage) {
        setPage(currentPage);
        setBlocks(currentPage.blocks);
        setNewTitle(currentPage.title);
      }
    }
    setLoading(false);
  }, [pageId]);

  const handleEditorChange = (newBlocks) => {
    setBlocks(newBlocks);
  };

  const handleExportPDF = () => {
    const content = document.querySelector(".editor-content");
    if (content) {
      const opt = {
        margin: 10,
        filename: `${page ? page.title : "document"}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };
      toast("Exporting PDF...");
      html2pdf()
        .set(opt)
        .from(content)
        .save()
        .then(() => toast.success("PDF Exported Successfully"));
    } else {
      toast.error("Nothing to export");
    }
  };

  const startEditTitle = () => setIsEditingTitle(true);

  const saveTitle = () => {
    if (newTitle.trim() === "") {
      toast.error("Title cannot be empty");
      return;
    }
    if (page && updatePageTitle) {
      updatePageTitle(pageId, newTitle);
      setPage({ ...page, title: newTitle });
      toast.success("Page title updated");
    }
    setIsEditingTitle(false);
  };

  const cancelEditTitle = () => {
    setNewTitle(page?.title || "");
    setIsEditingTitle(false);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          bgcolor: "editor.background",
          color: "editor.foreground",
        }}
      >
        Loading...
      </Box>
    );
  }

  if (!pageId || !page) {
    return <Navigate to="/" />;
  }

  return (
    <Box
      sx={{
        p: 2,
        bgcolor: "editor.background",
        color: "editor.foreground",
      }}
    >
      <Box
        sx={{
          mb: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {isEditingTitle ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <TextField
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              autoFocus
              size="small"
              sx={{ maxWidth: 300 }}
            />
            <IconButton onClick={saveTitle} size="small">
              <CheckIcon fontSize="small" />
            </IconButton>
            <IconButton onClick={cancelEditTitle} size="small">
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        ) : (
          <Button
            variant="text"
            startIcon={<EditIcon fontSize="small" />}
            onClick={startEditTitle}
            sx={{ textTransform: "none", fontSize: "0.875rem" }}
          >
            Rename
          </Button>
        )}
        <Button
          variant="outlined"
          startIcon={<DownloadIcon fontSize="small" />}
          onClick={handleExportPDF}
          sx={{ textTransform: "none", fontSize: "0.875rem" }}
        >
          Export PDF
        </Button>
      </Box>
      <Editor initialBlocks={blocks} onChange={handleEditorChange} />
    </Box>
  );
};

export default PageView;
