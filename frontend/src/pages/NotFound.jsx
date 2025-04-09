import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography, Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const NotFound = () => {
  const location = useLocation();
  const theme = useTheme();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "editor.background",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", mb: 2, color: "editor.foreground" }}
        >
          404
        </Typography>
        <Typography variant="h6" sx={{ mb: 2, color: "text.secondary" }}>
          Oops! Page not found
        </Typography>
        <Link
          href="/"
          sx={{
            color: "primary.main",
            "&:hover": { color: "primary.dark" },
            textDecoration: "underline",
          }}
        >
          Return to Home
        </Link>
      </Box>
    </Box>
  );
};

export default NotFound;
