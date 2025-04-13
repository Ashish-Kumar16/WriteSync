import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/redux/hooks";
import { signIn } from "@/redux/authSlice";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:5000/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Sign in failed");
      }
      dispatch(signIn({ user: data.user, token: data.token }));
      navigate("/");
    } catch (error) {
      setError(error.message || "Failed to connect to server");
    } finally {
      setLoading(false);
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
          Sign In
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
              disabled={loading}
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
              disabled={loading}
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              backgroundColor: "primary.main",
              "&:hover": { backgroundColor: "primary.dark" },
            }}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </form>
        <Typography
          sx={{ textAlign: "center", marginTop: 3, color: "grey.600" }}
        >
          Don't have an account?{" "}
          <Typography
            component="a"
            href="/signup"
            onClick={(e) => {
              e.preventDefault();
              navigate("/signup");
            }}
            sx={{
              color: "primary.main",
              textDecoration: "underline",
              "&:hover": { color: "primary.dark" },
            }}
          >
            Sign up
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignInPage;
