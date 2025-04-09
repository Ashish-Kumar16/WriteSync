import React from "react";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Tabs,
  Tab,
  Button,
  Switch,
  FormControlLabel,
} from "@mui/material";
import {
  Brightness7 as SunIcon,
  Brightness4 as MoonIcon,
  Computer as MonitorIcon,
} from "@mui/icons-material";

const Settings = () => {
  const [value, setValue] = React.useState("appearance");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        maxWidth: 960, // Matches max-w-4xl (4xl = 56rem = 896px, adjusted to 960px)
        mx: "auto",
        py: 5,
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 4 }}>
        Settings
      </Typography>
      <Tabs value={value} onChange={handleChange} sx={{ mb: 4 }}>
        <Tab label="Appearance" value="appearance" />
        <Tab label="Account" value="account" />
        <Tab label="Notifications" value="notifications" />
      </Tabs>
      {value === "appearance" && (
        <Card>
          <CardHeader
            title="Appearance"
            subheader="Customize how WriteSync looks and feels."
            subheaderTypographyProps={{ color: "text.secondary" }}
          />
          <CardContent
            sx={{ display: "flex", flexDirection: "column", gap: 3 }}
          >
            <Box>
              <Typography variant="h6" sx={{ fontWeight: "medium", mb: 1 }}>
                Theme
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="outlined"
                  sx={{ flexDirection: "column", p: 2, minHeight: "auto" }}
                >
                  <SunIcon sx={{ fontSize: 24, mb: 1 }} />
                  Light
                </Button>
                <Button
                  variant="outlined"
                  sx={{ flexDirection: "column", p: 2, minHeight: "auto" }}
                >
                  <MoonIcon sx={{ fontSize: 24, mb: 1 }} />
                  Dark
                </Button>
                <Button
                  variant="outlined"
                  sx={{ flexDirection: "column", p: 2, minHeight: "auto" }}
                >
                  <MonitorIcon sx={{ fontSize: 24, mb: 1 }} />
                  System
                </Button>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography variant="body2">Show sidebar by default</Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  Always show the sidebar when opening WriteSync
                </Typography>
              </Box>
              <Switch defaultChecked />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography variant="body2">Compact mode</Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  Use smaller spacing between elements
                </Typography>
              </Box>
              <Switch />
            </Box>
          </CardContent>
        </Card>
      )}
      {value === "account" && (
        <Card>
          <CardHeader
            title="Account Settings"
            subheader="Manage your account details and preferences."
            subheaderTypographyProps={{ color: "text.secondary" }}
          />
          <CardContent>
            <Typography variant="body2">
              Account settings will be available in a future update.
            </Typography>
          </CardContent>
        </Card>
      )}
      {value === "notifications" && (
        <Card>
          <CardHeader
            title="Notification Settings"
            subheader="Control how and when you receive notifications."
            subheaderTypographyProps={{ color: "text.secondary" }}
          />
          <CardContent>
            <Typography variant="body2">
              Notification settings will be available in a future update.
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default Settings;
