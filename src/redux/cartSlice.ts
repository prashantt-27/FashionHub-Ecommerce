import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CartProduct {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  [userId: string]: CartProduct[]; // cart per user
}

const initialState: CartState = {};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ userId: string; product: CartProduct }>
    ) => {
      const { userId, product } = action.payload;
      if (!state[userId]) state[userId] = [];

      const existing = state[userId].find((item) => item.id === userId);
      if (existing) {
        existing.quantity += 1;
      } else {
        state[userId].push({ ...product, quantity: 1 });
      }
    },

    deleteFromCart: (
      state,
      action: PayloadAction<{ userId: string; productId: string }>
    ) => {
      const { userId, productId } = action.payload;
      if (state[userId]) {
        state[userId] = state[userId].filter((item) => item.id !== productId);
      }
    },

    increaseQuantity: (
      state,
      action: PayloadAction<{ userId: string; productId: string }>
    ) => {
      const { userId, productId } = action.payload;
      const item = state[userId]?.find((i) => i.id === productId);
      if (item) item.quantity += 1;
    },

    decreaseQuantity: (
      state,
      action: PayloadAction<{ userId: string; productId: string }>
    ) => {
      const { userId, productId } = action.payload;
      const item = state[userId]?.find((i) => i.id === productId);
      if (item) {
        if (item.quantity === 1) {
          state[userId] = state[userId].filter((i) => i.id !== productId);
        } else {
          item.quantity -= 1;
        }
      }
    },

    clearCart: (state, action: PayloadAction<{ userId: string }>) => {
      state[action.payload.userId] = [];
    },
  },
});

export const {
  addToCart,
  deleteFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
