import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/src/app/lib/axios";// ✅ centralized axios instance

// ✅ Async thunk for checking auth status
export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
  const res = await api.get("/api/auth/me", {
    validateStatus: (status) => status === 200 || status === 401,
  });
  if (res.status === 200) return res.data;
  throw new Error("Not authenticated");
});

// ✅ Async thunk for logout
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await api.post("/api/auth/logout");
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
