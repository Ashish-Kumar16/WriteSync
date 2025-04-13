import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/redux/hooks";
import { signIn } from "@/redux/authSlice";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const response = await fetch(
        "https://writesync-dmuz.onrender.com/api/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        },
      );
      const data = await response.json();
      if (response.ok) {
        dispatch(signIn({ user: data.user, token: data.token }));
        navigate("/");
      } else {
        setError(data.message || "Sign up failed");
      }
    } catch (error) {
      setError("Failed to connect to server");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "grey.100",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "28rem",
          padding: 4,
          backgroundColor: "#ffffff",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", textAlign: "center", marginBottom: 3 }}
        >
          Create an Account
        </Typography>
        {error && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <Box sx={{ marginBottom: 2 }}>
            <Typography
              component="label"
              htmlFor="email"
              sx={{ marginBottom: 0.5 }}
            >
              Email
            </Typography>
            <TextField
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              fullWidth
            />
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <Typography
              component="label"
              htmlFor="password"
              sx={{ marginBottom: 0.5 }}
            >
              Password
            </Typography>
            <TextField
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              fullWidth
            />
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <Typography
              component="label"
              htmlFor="confirmPassword"
              sx={{ marginBottom: 0.5 }}
            >
              Confirm Password
            </Typography>
            <TextField
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="********"
              fullWidth
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "primary.main",
              "&:hover": { backgroundColor: "primary.dark" },
            }}
          >
            Sign Up
          </Button>
        </form>
        <Typography
          sx={{ textAlign: "center", marginTop: 3, color: "grey.600" }}
        >
          Already have an account?{" "}
          <Typography
            component="a"
            href="/signin"
            onClick={(e) => {
              e.preventDefault();
              navigate("/signin");
            }}
            sx={{
              color: "primary.main",
              textDecoration: "underline",
              "&:hover": { color: "primary.dark" },
            }}
          >
            Sign in
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignUpPage;
