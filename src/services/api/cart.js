import { baseApi } from ".";
import { TAG_KEYS } from "@/constants/tag-keys";

export const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFetchedPaginatedByCurrentUser: builder.query({
      query: ({ page, size }) => ({
        url: "/v1/private/carts/cart-items",
        params: { page, size },
      }),
      providesTags: [TAG_KEYS.CART],
    }),
  }),
});

export const { useGetAllFetchedPaginatedByCurrentUserQuery } = cartApi;
