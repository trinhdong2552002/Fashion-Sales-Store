import { baseApi } from "./index";
import { TAG_KEYS } from "@/constants/tagKeys";

export const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCartByUser: builder.query({
      query: () => ({
        url: "/v1/carts/cart-items",
        method: "GET",
      }),
      providesTags: [TAG_KEYS.CART],
    }),

    getAllCartItems: builder.query({
      query: () => ({
        url: "/v1/cart-items",
        method: "GET",
      }),
      providesTags: [TAG_KEYS.CART],
    }),

    addToCartItem: builder.mutation({
      query: (cartData) => ({
        url: "/v1/cart-items",
        method: "POST",
        data: cartData,
      }),
      invalidatesTags: [TAG_KEYS.CART],
    }),

    updateCartItem: builder.mutation({
      query: ({ id, ...cartData }) => ({
        url: `/v1/cart-items/${id}`,
        method: "PUT",
        data: cartData,
      }),
      invalidatesTags: [TAG_KEYS.CART],
    }),

    deleteCartItem: builder.mutation({
      query: (id) => ({
        url: `/v1/cart-items/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TAG_KEYS.CART],
    }),
  }),
});

export const {
  useGetCartByUserQuery,
  useGetAllCartItemsQuery,
  useAddToCartItemMutation,
  useUpdateCartItemMutation,
  useDeleteCartItemMutation,
} = cartApi;
