
import { createSlice } from '@reduxjs/toolkit';

// Check user preference or system preference
const getInitialTheme = () => {
  try {
    const storedTheme = localStorage.getItem('darkMode');
    if (storedTheme !== null) {
      return storedTheme === 'true';
    }
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return true;
    }
  } catch (error) {
    console.error('Failed to determine theme preference:', error);
  }
  return false;
};

const initialState = {
  darkMode: getInitialTheme(),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem('darkMode', String(state.darkMode));
    },
  },
});

export const { toggleDarkMode } = themeSlice.actions;
export default themeSlice.reducer;
