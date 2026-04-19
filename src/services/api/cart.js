import { baseApi } from ".";
import { TAG_KEYS } from "@/constants/tagKeys";

export const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFetchedPaginatedByCurrentUser: builder.query({
      query: ({ page, size }) => ({
        url: "/v1/private/carts/cart-items",
        params: { page, size },
      }),
      transformResponse: (response) => {
        return response.result;
      },
      providesTags: [TAG_KEYS.CART],
    }),
  }),
});

export const { useGetAllFetchedPaginatedByCurrentUserQuery } = cartApi;
