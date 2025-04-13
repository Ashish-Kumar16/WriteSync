// src/redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const loadAuthStateFromStorage = () => {
  try {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      return {
        isAuthenticated: true,
        user: JSON.parse(storedUser),
        token: storedToken,
      };
    }
  } catch (error) {
    console.error("Failed to load auth state:", error);
  }
  return initialState;
};

const authSlice = createSlice({
  name: "auth",
  initialState: loadAuthStateFromStorage(),
  reducers: {
    signIn: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },
    signOut: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
