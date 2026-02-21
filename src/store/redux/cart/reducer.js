import { createSlice } from "@reduxjs/toolkit";
import { cartApi } from "@/services/api/cart";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) =>
          item.productId === newItem.productId &&
          item.color === newItem.color &&
          item.size === newItem.size,
      );

      if (!existingItem) {
        // Chỉ thêm nếu sản phẩm chưa tồn tại
        state.cartItems.push(newItem);
      }

      state.cartTotalQuantity = state.cartItems.length; // Số lượng mặt hàng
      state.cartTotalAmount = state.cartItems.reduce(
        (total, item) => total + item.price,
        0,
      );
    },
    removeFromCart: (state, action) => {
      const { productId, color, size } = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) =>
          !(
            item.productId === productId &&
            item.color === color &&
            item.size === size
          ),
      );

      state.cartTotalQuantity = state.cartItems.length;
      state.cartTotalAmount = state.cartItems.reduce(
        (total, item) => total + item.price,
        0,
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.cartTotalQuantity = 0;
      state.cartTotalAmount = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
