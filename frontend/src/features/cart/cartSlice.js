import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Fetch cart items
export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const res = await fetch("http://localhost:5000/api/cart", {
    credentials: "include",
  });
  const data = await res.json();
  return data?.items || [];
});

// ✅ Add to cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity }) => {
    await fetch("http://localhost:5000/api/cart/add", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity }),
    });
    const res = await fetch("http://localhost:5000/api/cart", {
      credentials: "include",
    });
    const data = await res.json();
    return data?.items || [];
  }
);

// ✅ Update quantity
export const updateItem = createAsyncThunk(
  "cart/updateItem",
  async ({ productId, quantity }) => {
    await fetch("http://localhost:5000/api/cart/update", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity }),
    });
    const res = await fetch("http://localhost:5000/api/cart", {
      credentials: "include",
    });
    const data = await res.json();
    return data?.items || [];
  }
);

// ✅ Remove item
export const removeItem = createAsyncThunk(
  "cart/removeItem",
  async (productId) => {
    await fetch("http://localhost:5000/api/cart/remove", {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });
    const res = await fetch("http://localhost:5000/api/cart", {
      credentials: "include",
    });
    const data = await res.json();
    return data?.items || [];
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
