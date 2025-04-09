import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ChevronRight,
  ExpandMore,
  Add,
  Description,
  Settings,
  Search,
} from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputBase,
  Typography,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { mockWorkspace, createNewPage } from "../../lib/mockData";

const Sidebar = ({ className }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedPages, setExpandedPages] = useState(["page-1"]);
  const { user } = useAuth();
  const theme = useTheme();

  const toggleExpand = (pageId) => {
    setExpandedPages((prev) =>
      prev.includes(pageId)
        ? prev.filter((id) => id !== pageId)
        : [...prev, pageId],
    );
  };

  const handleCreateNewPage = () => {
    if (!user) {
      toast.error("Please login to create a new page");
      navigate("/login");
      return;
    }

    const newPage = createNewPage(`New Page`, "📄");
    toast.success(`New page created: ${newPage.title}`);
    navigate(`/page/${newPage.id}`);
  };

  const renderPageItem = (page, depth = 0) => {
    const hasChildren = page.children && page.children.length > 0;
    const isExpanded = expandedPages.includes(page.id);
    const isActive = location.pathname === `/page/${page.id}`;

    return (
      <Box key={page.id} sx={{ color: theme.palette.sidebar.foreground }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            py: 1,
            px: 2,
            borderRadius: 1,
            bgcolor: isActive ? theme.palette.sidebar.accent : "transparent",
            color: isActive
              ? theme.palette.sidebar.accentForeground
              : theme.palette.sidebar.foreground,
            "&:hover": {
              bgcolor: isActive
                ? theme.palette.sidebar.accent
                : theme.palette.sidebar.accent + "50",
            },
            pl: `${depth * 12 + 8}px`,
          }}
        >
          {hasChildren ? (
            <IconButton
              onClick={() => toggleExpand(page.id)}
              size="small"
              sx={{ mr: 1, color: theme.palette.sidebar.foreground + "70" }}
            >
              {isExpanded ? <ExpandMore /> : <ChevronRight />}
            </IconButton>
          ) : (
            <Box sx={{ width: 20, mr: 1 }} />
          )}

          <Typography sx={{ mr: 2 }}>{page.icon || "📄"}</Typography>

          <Link
            to={`/page/${page.id}`}
            style={{ flex: 1, textDecoration: "none", color: "inherit" }}
          >
            <Typography sx={{ truncate: true }}>{page.title}</Typography>
          </Link>
        </Box>

        {hasChildren && isExpanded && (
          <Box sx={{ mt: 1 }}>
            {page.children?.map((childPage) =>
              renderPageItem(childPage, depth + 1),
            )}
          </Box>
        )}
      </Box>
    );
  };

  return (
    <Box
      sx={{
        width: 256,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: theme.palette.sidebar.background,
        ...className,
      }}
    >
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: `1px solid ${theme.palette.sidebar.border}`,
        }}
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          <Typography
            variant="h6"
            sx={{ color: theme.palette.sidebar.foreground, fontWeight: "bold" }}
          >
            WriteSync
          </Typography>
        </Link>
      </Box>

      <Box sx={{ p: 2, flexGrow: 1 }}>
        <Box sx={{ position: "relative", mb: 2 }}>
          <Search
            sx={{
              position: "absolute",
              left: 8,
              top: "50%",
              transform: "translateY(-50%)",
              color: theme.palette.sidebar.foreground + "50",
            }}
          />
          <InputBase
            placeholder="Search pages..."
            sx={{
              width: "100%",
              bgcolor: theme.palette.sidebar.accent + "50",
              color: theme.palette.sidebar.foreground,
              borderRadius: 1,
              py: 1,
              pl: 4,
              pr: 1,
              "&:focus": {
                outline: `1px solid ${theme.palette.sidebar.ring}`,
              },
            }}
          />
        </Box>

        <Box sx={{ overflowY: "auto" }}>
          {mockWorkspace.pages.map((page) => renderPageItem(page))}
        </Box>
      </Box>

      <Box
        sx={{
          mt: "auto",
          p: 2,
          borderTop: `1px solid ${theme.palette.sidebar.border}`,
        }}
      >
        <Button
          variant="text"
          startIcon={<Add />}
          fullWidth
          sx={{
            justifyContent: "flex-start",
            color: theme.palette.sidebar.foreground + "80",
            "&:hover": {
              color: theme.palette.sidebar.foreground,
              bgcolor: theme.palette.sidebar.accent + "50",
            },
            mb: 1,
          }}
          onClick={handleCreateNewPage}
        >
          New Page
        </Button>
        <Button
          variant="text"
          startIcon={<Settings />}
          fullWidth
          sx={{
            justifyContent: "flex-start",
            color: theme.palette.sidebar.foreground + "80",
            "&:hover": {
              color: theme.palette.sidebar.foreground,
              bgcolor: theme.palette.sidebar.accent + "50",
            },
          }}
          onClick={() => navigate("/settings")}
        >
          Settings
        </Button>
      </Box>
    </Box>
  );
};

export default Sidebar;
