import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(
        item => item.plant_id === action.payload.plant_id,
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(
        item => item.plant_id !== action.payload,
      );
    },
    updateItemQuantity: (state, action) => {
      const item = state.items.find(
        item => item.plant_id === action.payload.plantId,
      );
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
  },
});

export const {addItem, removeItem, updateItemQuantity} = cartSlice.actions;
export default cartSlice.reducer;
