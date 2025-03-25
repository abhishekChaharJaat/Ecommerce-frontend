// productSlice.js (renamed for clarity, adjust as needed)
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "./Config";

// Add product
export const addNewProduct = createAsyncThunk(
  "product/createProduct",
  async (productData, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axiosInstance.post(
        "/api/v2/product/add-new-product",
        productData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`, // Bearer token format is common, adjust if needed
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add product"
      );
    }
  }
);

// Get all products
export const getAllProduct = createAsyncThunk(
  "product/getAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        "/api/v2/product/get-all-products",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to Fetch product"
      );
    }
  }
);

// Initial state
const initialState = {
  products: [], // Could store added products if needed
  loading: false, // Tracks async request status
  error: null, // Stores error messages
  success: false, // Indicates successful addition
  successMessage: null,
  selectedProduct:{},
  isShowSelectedProduct:false,
};

// Create slice
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSelectedProduct:(state, action) => {
       state.selectedProduct = action.payload
    },
    setShowSelectProduct: (state, action) => {
      state.isShowSelectedProduct =action.payload
    }
  },
  extraReducers: (builder) => {
    // Handle addNewProduct pending state
    builder
      .addCase(addNewProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      // Handle addNewProduct fulfilled state
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.successMessage = action.payload.message;
        // Optionally store the new product if returned in action.payload
        //   if (action.payload?.product) {
        //     state.products.push(action.payload.product);
        //   }
      })
      // Handle addNewProduct rejected state
      .addCase(addNewProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
        state.success = false;
      })
      // Get all products
      .addCase(getAllProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getAllProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.products = action.payload.products;
      })
      .addCase(getAllProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
        state.success = false;
      });
  },
});

// Export actions
export const { resetProductState, setSelectedProduct, setShowSelectProduct } = productSlice.actions;
export default productSlice.reducer;
