import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPageById } from "@/lib/mockData";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import html2pdf from "html2pdf.js";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import {
  MoreHoriz as MoreHorizontalIcon,
  Download as DownloadIcon,
  Share as ShareIcon,
  Person as UserIcon,
  AccessTime as ClockIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

const Header = ({ className, children }) => {
  const { pageId } = useParams();
  const navigate = useNavigate();
  const page = pageId ? getPageById(pageId) : null;
  const { user, logout } = useAuth();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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
        .then(() => {
          toast.success("PDF Exported Successfully");
        });
    } else {
      toast.error("Nothing to export");
    }
  };

  const navigateToSettings = () => {
    navigate("/settings");
    handleMenuClose();
  };

  const navigateToProfile = () => {
    navigate("/profile");
    handleMenuClose();
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
    handleMenuClose();
  };

  return (
    <Box
      component="header"
      sx={{
        height: 56, // Matches h-14 (14 * 4px = 56px)
        borderBottom: `1px solid ${theme.palette.editor.border}`,
        display: "flex",
        alignItems: "center",
        px: 2,
        bgcolor: theme.palette.editor.background,
        color: theme.palette.editor.foreground,
        ...className,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", flex: 1, gap: 2 }}>
        {children}
        {page ? (
          <>
            <Typography sx={{ fontSize: "1.5rem", mr: 2 }}>
              {page.icon || "📄"}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "medium",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {page.title}
            </Typography>
          </>
        ) : (
          <Typography variant="h6" sx={{ fontWeight: "medium" }}>
            WriteSync
          </Typography>
        )}
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {page && (
          <>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                color: theme.palette.text.secondary,
                fontSize: "0.75rem",
              }}
            >
              <ClockIcon sx={{ fontSize: 14, mr: 1 }} />
              <Typography variant="body2">
                Last edited {new Date(page.updatedAt).toLocaleDateString()}
              </Typography>
            </Box>

            <Button
              variant="text"
              startIcon={<ShareIcon sx={{ fontSize: 16 }} />}
              sx={{
                display: { xs: "none", md: "flex" },
                color: theme.palette.editor.foreground,
                textTransform: "none",
                fontSize: "0.875rem",
              }}
            >
              Share
            </Button>

            <Button
              variant="text"
              startIcon={<DownloadIcon sx={{ fontSize: 16 }} />}
              sx={{
                display: { xs: "none", md: "flex" },
                color: theme.palette.editor.foreground,
                textTransform: "none",
                fontSize: "0.875rem",
              }}
              onClick={handleExportPDF}
            >
              Export PDF
            </Button>
          </>
        )}

        <IconButton
          onClick={handleMenuClick}
          sx={{ color: theme.palette.editor.foreground }}
        >
          <UserIcon sx={{ fontSize: 18 }} />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          {user && (
            <Box sx={{ px: 2, py: 1.5 }}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {user.name || user.email}
              </Typography>
            </Box>
          )}
          <MenuItem onClick={navigateToProfile}>
            <UserIcon sx={{ mr: 1, fontSize: 16 }} />
            Profile
          </MenuItem>
          <MenuItem onClick={navigateToSettings}>
            <SettingsIcon sx={{ mr: 1, fontSize: 16 }} />
            Settings
          </MenuItem>
          {user && (
            <>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <LogoutIcon sx={{ mr: 1, fontSize: 16 }} />
                Logout
              </MenuItem>
            </>
          )}
        </Menu>

        <IconButton sx={{ color: theme.palette.editor.foreground }}>
          <MoreHorizontalIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Header;
