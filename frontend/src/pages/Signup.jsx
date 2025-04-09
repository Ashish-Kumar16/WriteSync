import React, { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  TextField,
  Button,
  Typography,
  Link,
} from "@mui/material";
import { useToast } from "../App"; // Import useToast from App.js

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast(); // Use the toast context

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Dummy registration
    setTimeout(() => {
      register({ name, email, password });
      showToast("Account created successfully", "success"); // Use MUI toast
      navigate("/");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        bgcolor: "editor.background",
      }}
    >
      <Card sx={{ maxWidth: 448, width: "100%" }}>
        <CardHeader
          title={
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", textAlign: "center" }}
            >
              Create an Account
            </Typography>
          }
          subheader={
            <Typography sx={{ textAlign: "center", color: "text.secondary" }}>
              Join WriteSync and start creating notes
            </Typography>
          }
        />
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box>
                <Typography
                  variant="body2"
                  component="label"
                  htmlFor="name"
                  sx={{ mb: 0.5 }}
                >
                  Name
                </Typography>
                <TextField
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  fullWidth
                  size="small"
                />
              </Box>
              <Box>
                <Typography
                  variant="body2"
                  component="label"
                  htmlFor="email"
                  sx={{ mb: 0.5 }}
                >
                  Email
                </Typography>
                <TextField
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  fullWidth
                  size="small"
                />
              </Box>
              <Box>
                <Typography
                  variant="body2"
                  component="label"
                  htmlFor="password"
                  sx={{ mb: 0.5 }}
                >
                  Password
                </Typography>
                <TextField
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  fullWidth
                  size="small"
                />
              </Box>
              <Button
                type="submit"
                variant="contained"
                disabled={isLoading}
                fullWidth
              >
                {isLoading ? "Creating account..." : "Sign Up"}
              </Button>
            </Box>
          </form>
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Already have an account?{" "}
            <Link
              component={RouterLink}
              to="/login"
              sx={{
                color: "primary.main",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Login
            </Link>
          </Typography>
        </CardActions>
      </Card>
    </Box>
  );
};

export default Signup;
