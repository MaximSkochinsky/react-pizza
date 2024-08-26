import { createSlice } from "@reduxjs/toolkit";

export const calcTotalPrice = (items) => {
  return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};

const initialState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // addItem(state, action) {
    //   state.items.push(action.payload);
    //   state.totalPrice = state.items.reduce((sum, obj) => {
    //     return obj.price + sum;
    //   }, 0);
    // },
    addItem(state, action) {
      const findItem = state.items.find(
        (obj) => obj.id == action.payload.id && obj.type == action.payload.type
      );

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }

      state.totalPrice = calcTotalPrice(state.items);
    },

    removeItem(state, action) {
      const findItem = state.items.find((obj) => obj.id == action.payload);

      if (findItem) findItem.count--;

      state.totalPrice = calcTotalPrice(state.items);
    },

    clearItem(state, action) {
      state.items = state.items.filter((obj) => obj.id != action.payload);
      state.totalPrice = calcTotalPrice(state.items);
    },

    clearItems(state, action) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, clearItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
