import { createSlice } from "@reduxjs/toolkit";

// Define user and auth state types
interface User {
  email: string;
  name?: string;
  joined: string;
}

interface AuthState {
  isLoggedIn: boolean;
  currentUserEmail: string | null;
  users: User[];
}

// Initialize state from localStorage (client-side only)
const initialState: AuthState = {
  isLoggedIn: typeof window !== "undefined" ? localStorage.getItem("isLoggedIn") === "true" : false,
  currentUserEmail: typeof window !== "undefined" ? localStorage.getItem("currentUserEmail") || null : null,
  users: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("users") || "[]") : [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: { payload: { email: string; name?: string } }) => {
      state.isLoggedIn = true;
      state.currentUserEmail = action.payload.email;
      const existingUser = state.users.find((user) => user.email === action.payload.email);
      if (!existingUser) {
        // Add new user if not exists
        const newUser: User = { ...action.payload, joined: new Date().toISOString() };
        state.users.push(newUser);
        if (state.users.length > 100) {
          state.users.shift(); // Remove oldest user (FIFO)
        }
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("currentUserEmail", action.payload.email);
        localStorage.setItem("users", JSON.stringify(state.users));
      }
    },
    clearUser: (state) => {
      state.isLoggedIn = false;
      state.currentUserEmail = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("currentUserEmail");
        // Do NOT clear users array
      }
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;