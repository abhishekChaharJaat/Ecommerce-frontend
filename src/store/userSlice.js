// userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "./Config";
import { showToast } from "../utils/toast";
// Get user information

export const fetchUserInfo = createAsyncThunk(
  "user/fetchUserInfo", // Unique action type
  async (token, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/v1/auth/user-info", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`, // Proper Bearer token format
        },
      });
      return response.data; // Assuming API returns user data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user info"
      );
    }
  }
);

//  for login Signup users
export const signupUser = createAsyncThunk(
  "user/signupUser",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/api/v1/auth/signup",
        { name, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Sign In failed. Please try again."
      );
    }
  }
);

// Async thunk for login
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/api/v1/auth/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data; // Assuming API returns { token, user }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  }
);

// for updating user info
export const updateUser = createAsyncThunk(
  "user/updateUser", // Unique action type
  async (userData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.put(
        "/api/v1/auth/update-user-info",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`, // Proper Bearer token format
          },
        }
      );
      return response.data; // Assuming API returns updated user data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update user info"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    isOpenLoginPopup: false,
    isOpenSigninPopup: false,
    isOpenUserInfoDrawer: false,
    isOpenEditProfilePopup: false,
    isLoggedIn: false,
    user: null, // To store user data
    token: null,
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    setOpenLoginPopup: (state, action) => {
      state.isOpenLoginPopup = action.payload;
    },
    setOpenSigninPopup: (state, action) => {
      state.isOpenSigninPopup = action.payload;
    },
    setOpenUserInfoDrawer: (state, action) => {
      state.isOpenUserInfoDrawer = action.payload;
    },
    setOpenEditProfilePopup: (state, action) => {
      state.isOpenEditProfilePopup = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token");
      state.isOpenUserInfoDrawer = false;
      state.error = null;
    },
    resetErrorSucces: (state, action) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token; // Store token in state
        localStorage.setItem("token", action.payload.token);
        state.user = action.payload.user || null; // Store user data if provided
        state.isOpenLoginPopup = false; // Close login popup
        state.successMessage = action.payload.message;
        showToast.success(action.payload.message || "Login successful!");
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        showToast.error(action.payload || "Login failed");
      })
      // Signup case
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token; // Store token in state
        localStorage.setItem("token", action.payload.token); // Store token in localStorage
        state.user = action.payload.user || null; // Store user data if provided
        state.isOpenSigninPopup = false;
        state.successMessage = action.payload.message;
        showToast.success(action.payload.message || "Signup successful!");
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        showToast.error(action.payload || "Signup failed");
      })
      // Fetch user info cases
      .addCase(fetchUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isLoggedIn = true;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // Don't show toast for user info fetch failures (silent fail)
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isOpenEditProfilePopup = false; // Update the user data with the response
        state.successMessage = action.payload.message;
        showToast.success(action.payload.message || "Profile updated successfully!");
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set error message if update fails
        showToast.error(action.payload || "Failed to update profile");
      });
  },
});

export const {
  setOpenLoginPopup,
  logout,
  setOpenSigninPopup,
  setOpenUserInfoDrawer,
  setOpenEditProfilePopup,
  resetErrorSucces,
} = userSlice.actions;
export default userSlice.reducer;
