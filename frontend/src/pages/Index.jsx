import React from "react";
import { getAllPages } from "../lib/mockData";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import {
  Description as FileTextIcon,
  Add as PlusIcon,
  Book as BookIcon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const Index = () => {
  const pages = getAllPages();
  const theme = useTheme();

  return (
    <Box
      sx={{
        maxWidth: 1200,
        mx: "auto",
        py: 5, // Matches py-10 (10 * 4px = 40px, adjusted for MUI spacing)
        bgcolor: "editor.background",
        color: "editor.foreground",
      }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
          Welcome to WriteSync
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontSize: "1.125rem", color: "text.secondary", mb: 4 }}
        >
          Your all-in-one workspace for notes, documents, and more.
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 3,
            mb: 6,
          }}
        >
          <Card sx={{ bgcolor: "background.paper" }}>
            <CardHeader
              title={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <FileTextIcon sx={{ mr: 1 }} />
                  Create Documents
                </Box>
              }
              subheader="Create rich documents with headings, lists, and more"
              subheaderTypographyProps={{ color: "text.secondary" }}
            />
            <CardContent>
              <Typography variant="body2">
                WriteSync gives you powerful tools to create any type of
                document with a flexible block-based editor.
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                startIcon={<PlusIcon sx={{ fontSize: 16 }} />}
              >
                New Document
              </Button>
            </CardActions>
          </Card>

          <Card sx={{ bgcolor: "background.paper" }}>
            <CardHeader
              title={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <BookIcon sx={{ mr: 1 }} />
                  Organize Your Workspace
                </Box>
              }
              subheader="Keep everything organized in a hierarchical structure"
              subheaderTypographyProps={{ color: "text.secondary" }}
            />
            <CardContent>
              <Typography variant="body2">
                Create pages within pages to organize your content just the way
                you like it.
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant="outlined">Learn More</Button>
            </CardActions>
          </Card>
        </Box>
      </Box>

      <Box>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          Recent Pages
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1fr 1fr 1fr",
            },
            gap: 2,
          }}
        >
          {pages.map((page) => (
            <Link
              to={`/page/${page.id}`}
              key={page.id}
              style={{ textDecoration: "none" }}
            >
              <Box
                sx={{
                  border: 1,
                  borderColor: "divider",
                  borderRadius: 1,
                  p: 2,
                  transition: "all 0.2s",
                  "&:hover": {
                    borderColor: "primary.main",
                    boxShadow: 3,
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                  <Typography sx={{ fontSize: "1.5rem", mr: 1.5 }}>
                    {page.icon || "📄"}
                  </Typography>
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: "medium",
                        "&:hover": { color: "primary.main" },
                        transition: "color 0.2s",
                      }}
                    >
                      {page.title}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary", mt: 0.5 }}
                    >
                      Updated {formatDate(page.updatedAt)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Link>
          ))}

          <Box
            sx={{
              border: 1,
              borderStyle: "dashed",
              borderColor: "divider",
              borderRadius: 1,
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "&:hover": {
                borderColor: "primary.main",
                bgcolor: "action.hover",
              },
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  mx: "auto",
                  borderRadius: "50%",
                  bgcolor: "action.disabledBackground",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 1,
                }}
              >
                <PlusIcon />
              </Box>
              <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                Create New Page
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Index;
