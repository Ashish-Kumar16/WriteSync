import React, { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Link,
} from "@mui/material";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (email && password) {
        login({ email, name: email.split("@")[0] });
        toast.success("Logged in successfully");
        navigate("/");
      } else {
        toast.error("Invalid credentials");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        p: 2,
      }}
    >
      <Card sx={{ maxWidth: 400, width: "100%", boxShadow: 3 }}>
        <CardHeader
          title={
            <Typography variant="h5" align="center" fontWeight="bold">
              Login to WriteSync
            </Typography>
          }
          subheader={
            <Typography variant="body2" align="center" color="text.secondary">
              Enter your credentials to access your account
            </Typography>
          }
        />
        <CardContent>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Login"
              )}
            </Button>
          </Box>
        </CardContent>
        <CardActions sx={{ justifyContent: "center", pb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Don't have an account?{" "}
            <Link
              component={RouterLink}
              to="/signup"
              underline="hover"
              color="primary"
            >
              Sign up
            </Link>
          </Typography>
        </CardActions>
      </Card>
    </Box>
  );
};

export default Login;
