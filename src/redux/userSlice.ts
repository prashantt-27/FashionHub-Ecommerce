import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// Define a type for the slice state
interface User {
  username: string;
  email: string;
  password: string;
}

interface UserState {
  users: User[];
  currentUser: User | null;
}

const initialState: UserState = {
  users: JSON.parse(localStorage.getItem("register") || "[]"),
  currentUser: JSON.parse(localStorage.getItem("currentUser") || "null"),
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    register(state, action) {
      state.users.push(action.payload);
      localStorage.setItem("register", JSON.stringify(state.users));
      toast.success("Register Successfully!!");
    },

    login(state, action) {
      const loginUser = state.users.find(
        (u) =>
          u.email === action.payload.email &&
          u.password === action.payload.password
      );
      if (loginUser) {
        state.currentUser = loginUser;
        toast.success("Login Successfully...");
        localStorage.setItem("currentUser", JSON.stringify(loginUser));
        return;
      }
      console.log(loginUser);
    },

    logout(state) {
      state.currentUser = null;
      localStorage.removeItem("currentUser");
      toast("Logged out successfully!", { icon: "👋" });
    },
  },
});

export const { register, login, logout } = userSlice.actions;
export default userSlice.reducer;
