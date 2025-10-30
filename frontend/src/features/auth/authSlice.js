import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/utils/api";

// ✅ Async thunk for checking auth status
export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
  const res = await axios.get("/api/auth/me", {
    withCredentials: true,
    validateStatus: (status) => status === 200 || status === 401,
  });
  if (res.status === 200) return res.data;
  throw new Error("Not authenticated");
});

// ✅ Async thunk for logout
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await axios.post("/api/auth/logout", {}, { withCredentials: true });
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    user: null,
    authCheckCompleted: false,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.authCheckCompleted = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.authCheckCompleted = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.user = null;
        state.isLoggedIn = false;
        state.authCheckCompleted = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isLoggedIn = false;
      });
  },
});

export const { loginSuccess } = authSlice.actions;
export default authSlice.reducer;
