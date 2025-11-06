import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/src/app/lib/axios"; // ✅ centralized axios instance

// ✅ Fetch cart items
export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const res = await api.get("/api/cart");
  return res.data?.items || [];
});

// ✅ Add to cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity }) => {
    await api.post("/api/cart/add", { productId, quantity });
    const res = await api.get("/api/cart");
    return res.data?.items || [];
  }
);

// ✅ Update quantity
export const updateItem = createAsyncThunk(
  "cart/updateItem",
  async ({ productId, quantity }) => {
    await api.put("/api/cart/update", { productId, quantity });
    const res = await api.get("/api/cart");
    return res.data?.items || [];
  }
);

// ✅ Remove item
export const removeItem = createAsyncThunk(
  "cart/removeItem",
  async (productId) => {
    await api.delete("/api/cart/remove", { data: { productId } });
    const res = await api.get("/api/cart");
    return res.data?.items || [];
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(removeItem.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export default cartSlice.reducer;
