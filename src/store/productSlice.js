// productSlice.js (renamed for clarity, adjust as needed)
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "./Config";
import { showToast } from "../utils/toast";

// Add new product
export const addNewProduct = createAsyncThunk(
  "product/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/api/v2/product/add-new-product",
        productData
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
    try {
      const response = await axiosInstance.post(
        "/api/v2/product/add-to-cart",
        productData
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
        "/api/v2/product/get-all-products"
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
    try {
      const response = await axiosInstance.get(
        "/api/v2/product/fetch-cart-items"
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to Fetch product"
      );
    }
  }
);

// Delete a cart item
export const deleteCartItem = createAsyncThunk(
  "product/deleteCartItem",
  async (cartItemId, { rejectWithValue }) => {
    try {
      // Use the DELETE method to remove the item
      const response = await axiosInstance.delete(
        `/api/v2/product/delete-cart-item/${cartItemId}`
      );
      return response.data; // Return the response from the backend (success message)
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete product from cart"
      );
    }
  }
);

// change-cart-status
export const changeCartItemStatus = createAsyncThunk(
  "product/changeCartItemStatus",
  async ({ cartItemIds, status }, { rejectWithValue }) => {
    console.log(cartItemIds, status); // Debugging line to check the values being sent

    try {
      const response = await axiosInstance.put(
        `/api/v2/product/change-cart-status`,
        { cartItemIds, status } // Properly formatted request body
      );
      return response.data; // Return the response from the backend
    } catch (error) {
      console.error("Error:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to update cart status"
      );
    }
  }
);

// Get all ordered items for Admin
export const adminGetAllOrders = createAsyncThunk(
  "product/adminGetAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        "/api/v2/product/admin/ordered-items"
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
  selectedProduct: {},
  isShowSelectedProduct: false,
  cartItems: [],
  isOrderPlaced: false,
  orderedItemsForAdmin: [], // For admin view
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
    setIsOrderPlaced: (state, action) => {
      state.isOrderPlaced = action.payload;
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
        showToast.success(action.payload.message || "Product added successfully!");
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
        showToast.error(action.payload || "Failed to add product");
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
        showToast.error(action.payload || "Failed to load products");
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
        showToast.success(action.payload.message || "Added to cart!");
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
        showToast.error(action.payload || "Failed to add to cart");
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
        if (action.payload !== "Invalid or expired token, authorization denied.") {
          showToast.error(action.payload || "Failed to load cart items");
        }
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
        showToast.success(action.payload.message || "Item removed from cart");
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete product from cart";
        showToast.error(action.payload || "Failed to remove item from cart");
      })
      .addCase(changeCartItemStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeCartItemStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        showToast.success("Order placed successfully!");
      })
      .addCase(changeCartItemStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        showToast.error(action.payload || "Failed to place order");
      })
      .addCase(adminGetAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminGetAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.orderedItemsForAdmin = action.payload.cartItems || [];
      })
      .addCase(adminGetAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        showToast.error(action.payload || "Failed to load orders");
      });
  },
});

// Export actions
export const {
  resetProductState,
  setSelectedProduct,
  setShowSelectProduct,
  resetProductErrorSuccess,
  setIsOrderPlaced,
} = productSlice.actions;
export default productSlice.reducer;
