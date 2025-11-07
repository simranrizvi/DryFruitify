import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/src/app/lib/axios"; // ✅ centralized axios instance

// ✅ Check Auth (Runs on page load)
export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
  const res = await api.get("/api/auth/me", {
    validateStatus: (status) => status === 200 || status === 401,
  });

  if (res.status === 200) return res.data;
  throw new Error("Not authenticated");
});

// ✅ Logout user
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await api.post("/api/auth/logout");
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    user: null,
    authCheckCompleted: false, // ✅ ensures we avoid flashing
  },
  reducers: {
    // ✅ Used after login form success
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.authCheckCompleted = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ If token is valid
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.authCheckCompleted = true;
      })
      // ❌ If token isn't valid
      .addCase(checkAuth.rejected, (state) => {
        state.user = null;
        state.isLoggedIn = false;
        state.authCheckCompleted = true;
      })
      // ✅ After logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isLoggedIn = false;
        // NOT resetting authCheckCompleted → so UI doesn't flash
      });
  },
});

export const { loginSuccess } = authSlice.actions;
export default authSlice.reducer;
