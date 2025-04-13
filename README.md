# WriteSync

WriteSync is a web-based writing application crafted to help users maintain focus and achieve a productive writing flow. With a clean, distraction-free interface, it enables users to create, edit, and manage notes seamlessly, making it ideal for writers, students, and anyone looking to organize their thoughts efficiently.

## Features

- **Note Creation and Editing**: Write and edit notes using a simple, intuitive editor with real-time saving to prevent data loss.
- **Note Management**: Browse and organize notes via a searchable sidebar, with each note displayed as a card showing its title and last updated time.
- **User Authentication**: Securely sign up or sign in to access your personal notes, with session persistence via local storage.
- **Responsive Design**: Enjoy a consistent experience across desktop and mobile devices, with a mobile-friendly sidebar toggle.
- **Dark Mode Support**: Switch between light and dark themes for comfortable writing in any lighting condition.
- **Search Functionality**: Quickly find notes by searching titles or content directly from the sidebar.

## Tech Stack

- **Frontend**: React with Vite for a fast and modern development experience.
- **Styling**: Tailwind CSS for utility-first styling, supplemented with custom styles in `index.css` and `darkMode.css`.
- **State Management**: Redux Toolkit for managing authentication and theme preferences.
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) for accessible, reusable components like buttons, inputs, and toasts.
- **Routing**: React Router for seamless navigation between pages (e.g., sign-in, sign-up, and main app).
- **API Interactions**: Fetch API for communicating with a backend server at `https://writesync-dmuz.onrender.com/api`.
- **Persistence**: Local Storage for storing authentication tokens and user data.
- **Utilities**: Lodash for debouncing note updates, and date-fns for formatting timestamps.

## Installation and Setup

Follow these steps to set up and run Focus Flow Writer locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Ashish-Kumar16/WriteSync.git
   ```
2. **Navigate to the Project Directory**:
   ```bash
   cd Frontend
   ```
3. **Install Dependencies**:
   ```bash
   npm install
   ```
4. **Start the Development Server**:
   ```bash
   npm run dev
   ```
5. **Open Your Browser**: Visit `http://localhost:5173` (or the port specified by Vite in the terminal).


## Usage

- **Sign Up or Sign In**: Create an account or log in via the `/signup` or `/signin` pages to access your notes.
- **Create a Note**: Click the "New Note" button in the header to start writing.
- **Edit Notes**: Select a note from the sidebar to open it in the editor; changes are saved automatically after a short delay.
- **Search Notes**: Use the search bar in the sidebar to filter notes by title or content.
- **Delete Notes**: Click the trash icon on a note card in the sidebar to remove it.
- **Toggle Dark Mode**: Use the sun/moon icon in the header to switch between light and dark themes.
- **Logout**: Access the user dropdown in the header to sign out.


## Backend Setup

Focus Flow Writer's frontend relies on a backend API for note management and authentication. The API is expected to be available at `http://localhost:5000/api`. Key endpoints include:

- `POST /api/auth/signin`: Authenticate a user.
- `POST /api/auth/signup`: Register a new user.
- `GET /api/notes`: Fetch all notes for the authenticated user.
- `POST /api/notes`: Create a new note.
- `PUT /api/notes/:id`: Update an existing note.
- `DELETE /api/notes/:id`: Delete a note.

To set up the backend:
1. Ensure you have a compatible backend server (not included in this repository).
2. Configure it to run on `http://localhost:5000`.
3. Refer to the backend's documentation for specific setup instructions.

If you don’t have the backend code, you’ll need to develop or integrate a service that matches these endpoints.
