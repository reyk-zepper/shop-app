import { createSlice } from "@reduxjs/toolkit";

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState: {
    products: [],
    total: 0,
    quantity: 0,
  },
  reducers: {
    addProducts: (state, action) => {
      state.products.push(action.payload);
      state.quantity += 1;
      state.total += action.payload.price;
    },
    clear: (state) => {
      state = initialState;
    },
  },
});

export const { addProducts, clear } = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;
