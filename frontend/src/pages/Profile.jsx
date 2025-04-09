import React from "react";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  TextField,
  Button,
  Avatar,
  IconButton,
} from "@mui/material";
import { Camera as CameraIcon } from "@mui/icons-material";

const Profile = () => {
  return (
    <Box
      sx={{
        maxWidth: 672, // Matches max-w-2xl (2xl = 42rem = 672px)
        mx: "auto",
        py: 5,
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 4 }}>
        Profile
      </Typography>
      <Card>
        <CardHeader
          title="Your Profile"
          subheader="Manage your personal information and profile settings"
          subheaderTypographyProps={{ color: "text.secondary" }}
          action={
            <Box sx={{ position: "relative" }}>
              <Avatar
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120"
                sx={{ width: 96, height: 96 }}
              >
                JD
              </Avatar>
              <IconButton
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  bgcolor: "primary.main",
                  borderRadius: "50%",
                  width: 32,
                  height: 32,
                  "&:hover": { bgcolor: "primary.dark" },
                }}
              >
                <CameraIcon fontSize="small" sx={{ color: "white" }} />
              </IconButton>
            </Box>
          }
        />
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 2,
            }}
          >
            <Box>
              <Typography variant="body2" component="label" htmlFor="firstName">
                First Name
              </Typography>
              <TextField
                id="firstName"
                defaultValue="John"
                fullWidth
                size="small"
                sx={{ mt: 1 }}
              />
            </Box>
            <Box>
              <Typography variant="body2" component="label" htmlFor="lastName">
                Last Name
              </Typography>
              <TextField
                id="lastName"
                defaultValue="Doe"
                fullWidth
                size="small"
                sx={{ mt: 1 }}
              />
            </Box>
          </Box>
          <Box>
            <Typography variant="body2" component="label" htmlFor="email">
              Email
            </Typography>
            <TextField
              id="email"
              type="email"
              defaultValue="john.doe@example.com"
              fullWidth
              size="small"
              sx={{ mt: 1 }}
            />
          </Box>
          <Box>
            <Typography variant="body2" component="label" htmlFor="bio">
              Bio
            </Typography>
            <TextField
              id="bio"
              placeholder="Tell us a bit about yourself"
              defaultValue="Product designer and developer based in San Francisco."
              fullWidth
              multiline
              rows={4}
              sx={{ mt: 1 }}
            />
          </Box>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end", gap: 1 }}>
          <Button variant="outlined">Cancel</Button>
          <Button variant="contained">Save Changes</Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default Profile;
