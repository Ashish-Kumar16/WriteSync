import React, { useState, useEffect, createContext, useContext } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Page from "./pages/Page";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { useIsMobile } from "./hooks/use-mobile";
import {
  Box,
  IconButton,
  Backdrop,
  createTheme,
  ThemeProvider,
  Snackbar,
  Alert,
} from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

const queryClient = new QueryClient();

// Light Theme
const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "hsl(0, 0%, 100%)",
    },
    text: {
      primary: "hsl(224, 71.4%, 4.1%)",
    },
    primary: {
      main: "hsl(262.1, 83.3%, 57.8%)",
      contrastText: "hsl(210, 20%, 98%)",
    },
    secondary: {
      main: "hsl(220, 14.3%, 95.9%)",
      contrastText: "hsl(220.9, 39.3%, 11%)",
    },
    sidebar: {
      background: "hsl(224, 71.4%, 4.1%)",
      foreground: "hsl(210, 20%, 98%)",
      primary: "hsl(262.1, 83.3%, 57.8%)",
      primaryForeground: "hsl(210, 20%, 98%)",
      accent: "hsl(217.2, 32.6%, 17.5%)",
      accentForeground: "hsl(210, 20%, 98%)",
      border: "hsl(217.2, 32.6%, 17.5%)",
      ring: "hsl(262.1, 83.3%, 57.8%)",
    },
    editor: {
      background: "hsl(224, 71.4%, 4.1%)",
      foreground: "hsl(210, 20%, 98%)",
      block: "hsl(215, 28%, 10%)",
      blockHover: "hsl(215, 28%, 12%)",
      blockSelected: "hsl(263.4, 70%, 13%)",
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});

// Dark Theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "hsl(224, 71.4%, 4.1%)",
    },
    text: {
      primary: "hsl(210, 20%, 98%)",
    },
    primary: {
      main: "hsl(210, 20%, 98%)",
      contrastText: "hsl(210, 20%, 98%)",
    },
    secondary: {
      main: "hsl(215, 27.9%, 16.9%)",
      contrastText: "hsl(210, 20%, 98%)",
    },
    sidebar: {
      background: "hsl(224, 71.4%, 4.1%)",
      foreground: "hsl(210, 20%, 98%)",
      primary: "hsl(263.4, 70%, 50.4%)",
      primaryForeground: "hsl(210, 20%, 98%)",
      accent: "hsl(215, 27.9%, 16.9%)",
      accentForeground: "hsl(210, 20%, 98%)",
      border: "hsl(215, 27.9%, 16.9%)",
      ring: "hsl(263.4, 70%, 50.4%)",
    },
    editor: {
      background: "hsl(215, 28%, 7%)",
      foreground: "hsl(210, 20%, 98%)",
      block: "hsl(215, 28%, 10%)",
      blockHover: "hsl(215, 28%, 12%)",
      blockSelected: "hsl(215, 28%, 12%)",
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});

const prefersDarkMode = window.matchMedia(
  "(prefers-color-scheme: dark)",
).matches;
const theme = prefersDarkMode ? darkTheme : lightTheme;

// Toast Context for managing notifications
const ToastContext = createContext({
  showToast: (message, severity) => {},
});

const useToast = () => useContext(ToastContext);

// Toast Provider
const ToastProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("info");

  const showToast = (msg, sev) => {
    setMessage(msg);
    setSeverity(sev);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};

// ProtectedRoute
const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
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

  if (!user) return <Navigate to="/login" />;
  return children;
};

// AppLayout
const AppLayout = ({ children }) => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const { user } = useAuth();
  const theme = useTheme();

  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  if (!user) return children;

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        bgcolor: "editor.background",
        color: "editor.foreground",
      }}
    >
      {sidebarOpen && (
        <>
          {isMobile && (
            <Backdrop
              open={sidebarOpen}
              onClick={toggleSidebar}
              sx={{ zIndex: 40, bgcolor: "rgba(0, 0, 0, 0.5)" }}
            />
          )}
          <Box
            sx={{
              width: isMobile ? 256 : "auto",
              height: "100vh",
              zIndex: isMobile ? 50 : "auto",
            }}
            onClick={(e) => isMobile && e.stopPropagation()}
          >
            <Sidebar sx={{ height: "100%" }} />
            {isMobile && (
              <IconButton
                onClick={toggleSidebar}
                sx={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  color: "#fff",
                }}
              >
                <CloseIcon sx={{ fontSize: 20 }} />
              </IconButton>
            )}
          </Box>
        </>
      )}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          bgcolor: "editor.background",
        }}
      >
        <Header>
          {!sidebarOpen && (
            <IconButton
              onClick={toggleSidebar}
              sx={{ mr: 1, color: "editor.foreground" }}
            >
              <MenuIcon sx={{ fontSize: 24 }} />
            </IconButton>
          )}
        </Header>
        <Box
          component="main"
          sx={{
            flex: 1,
            overflowY: "auto",
            bgcolor: "editor.background",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

// Main App Component
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <ToastProvider>
            <BrowserRouter>
              <AppLayout>
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute>
                        <Index />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/page/:pageId"
                    element={
                      <ProtectedRoute>
                        <Page />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/settings"
                    element={
                      <ProtectedRoute>
                        <Settings />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AppLayout>
            </BrowserRouter>
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;

export { useToast }; // Export useToast for use in other components
