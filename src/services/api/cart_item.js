import { baseApi } from "./index";
import { TAG_KEYS } from "@/constants/tagKeys";

export const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCartItemById: builder.query({
      query: (cartItemId) => ({
        url: `/v1/cart-items/${cartItemId}`,
      }),
      transformResponse: (response) => {
        return response.result;
      },
      providesTags: [TAG_KEYS.CART],
    }),

    updateCartItem: builder.mutation({
      query: (cartItemId, ...cartData) => ({
        url: `/v1/private/cart-items/${cartItemId}`,
        method: "PUT",
        data: cartData,
      }),
      invalidatesTags: [TAG_KEYS.CART],
    }),

    deleteCartItemById: builder.mutation({
      query: (cartItemId) => ({
        url: `/v1/private/cart-items/${cartItemId}`,
        method: "DELETE",
      }),
      invalidatesTags: [TAG_KEYS.CART],
    }),

    createCartItem: builder.mutation({
      query: (cartItemData) => ({
        url: "/v1/private/cart-items",
        method: "POST",
        data: cartItemData,
      }),
      invalidatesTags: [TAG_KEYS.CART],
    }),

    deleteAllCartItems: builder.mutation({
      query: () => ({
        url: "/v1/private/cart-items",
        method: "DELETE",
      }),
      invalidatesTags: [TAG_KEYS.CART],
    }),
  }),
});

export const {
  useGetCartItemByIdQuery,
  useUpdateCartItemMutation,
  useDeleteCartItemByIdMutation,
  useCreateCartItemMutation,
  useDeleteAllCartItemsMutation,
} = cartApi;
