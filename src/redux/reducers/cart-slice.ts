import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICartItem {
  petId: string;
  petName: string;
  petBreed: string;
  petAge?: number;
  petPrice: number;
  petCategory: string;
  petGender?: string;
  petImage?: string;
}

const initialState = {
  cart: [] as ICartItem[],
  totalQuantity: 0,
  totalAmount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ICartItem>) => {
      const newItem = action.payload;
      const existingItem = state.cart.find(
        (item) => item.petId === newItem.petId
      );
      if (existingItem) {
        return;
      }
      if (!existingItem) {
        state.cart.push(newItem);
        state.totalQuantity++;
        state.totalAmount = state.cart.reduce(
          (acc, item) => acc + item.petPrice,
          0
        );
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const existingItem = state.cart.find((item) => item.petId === id);
      console.log("Removing item with id:", existingItem);

      if (existingItem) {
        state.cart = state.cart.filter((item) => item.petId !== id);
        state.totalQuantity--;
        state.totalAmount = state.cart.reduce(
          (acc, item) => acc + item.petPrice,
          0
        );
      }
    },
    clearCart: (state) => {
      state.cart = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
