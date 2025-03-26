// productSlice.js (renamed for clarity, adjust as needed)
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "./Config";

// Add new product
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

// Add to cart
export const addToCart = createAsyncThunk(
  "product/addToCart",
  async (productData, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axiosInstance.post(
        "/api/v2/product/add-to-cart",
        productData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add product to cart"
      );
    }
  }
);

// Get all Products
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

// Get all cart items
export const getCartItems = createAsyncThunk(
  "product/getCartItems",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axiosInstance.get(
        "/api/v2/product/fetch-cart-items",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
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

// Delete a  cart items
// Delete a cart item
export const deleteCartItem = createAsyncThunk(
  "product/deleteCartItem",
  async (cartItemId, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      // Use the DELETE method to remove the item
      const response = await axiosInstance.delete(
        `/api/v2/product/delete-cart-item/${cartItemId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      return response.data; // Return the response from the backend (success message)
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete product from cart"
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
  selectedProduct: {},
  isShowSelectedProduct: false,
  cartItems: [],
};

// Create slice
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setShowSelectProduct: (state, action) => {
      state.isShowSelectedProduct = action.payload;
    },
    resetProductErrorSuccess: (state, action) => {
      state.error = null;
      state.successMessage = null;
    },
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
        if (action.payload?.product) {
          state.products.push(action.payload.product);
        }
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
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.successMessage = action.payload.message;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(getCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.cartItems = action.payload.cartItems || [];
        // state.successMessage = action.payload.message;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // Remove the deleted item from the cartItems array in the Redux state
        state.cartItems = state.cartItems.filter(
          (item) => item._id !== action.payload.id
        );
        state.successMessage = action.payload.message;
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete product from cart";
      });
  },
});

// Export actions
export const {
  resetProductState,
  setSelectedProduct,
  setShowSelectProduct,
  resetProductErrorSuccess,
} = productSlice.actions;
export default productSlice.reducer;
