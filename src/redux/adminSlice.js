import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://yaticare-backend.onrender.com/api";

export const fetchAdminById = createAsyncThunk(
  "admin/fetchById",
  async (adminId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken") || "";
      const response = await axios.get(
        `${BASE_URL}/admin/getadmin/${adminId}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
          },
        },
      );
      return response.data?.admin || response.data?.data || response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error.message ||
          "Failed to fetch admin",
      );
    }
  },
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearAdmin: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAdminById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch admin";
      });
  },
});

export const { clearAdmin } = adminSlice.actions;
export default adminSlice.reducer;
