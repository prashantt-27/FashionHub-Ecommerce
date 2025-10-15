import { createSlice } from "@reduxjs/toolkit";

interface cartProduct {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface cartState {
  items: cartProduct[];
}

const initialState: cartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newProduct = action.payload;
      const present = state.items.find((item) => item.id === newProduct.id);

      if (present) {
        present.quantity += 1;
      } else {
        state.items.push({ ...newProduct, quantity: 1 });
      }
    },

    deleteFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },

    increseQuantity: (state, action) => {
      const id = action.payload;
      const present = state.items.find((item) => item.id === id);

      if (present) {
        present.quantity += 1;
      }
    },

    decreseQuantity: (state, action) => {
      const id = action.payload;
      const present = state.items.find((item) => item.id === id);

      if (present && present.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else if (present) {
        present.quantity -= 1;
      }
    },
  },
});

export const { addToCart, deleteFromCart, increseQuantity, decreseQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
