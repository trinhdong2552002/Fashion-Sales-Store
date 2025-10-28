import { baseApi } from "/src/services/api/index.js";
import { TAG_KEYS } from "@/constants/tagKeys.js";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listProductsForUser: builder.query({
      query: ({ pageNo, pageSize }) => ({
        url: "/v1/products",
        params: { pageNo, pageSize },
      }),
      transformResponse: (response) => {
        return response.result;
      },
      providesTags: [TAG_KEYS.PRODUCT],
    }),

    searchProducts: builder.query({
      query: (params) => {
        const { q, pageNo = 1, pageSize = 10 } = params || {};
        if (!q) throw new Error("Search term is required");
        return {
          url: `/v1/products/search`,
          method: "GET",
          params: { q, pageNo, pageSize },
        };
      },
      providesTags: [TAG_KEYS.PRODUCT],
    }),

    getProductById: builder.query({
      query: (id) => {
        return {
          url: `/v1/products/${id}`,
          method: "GET",
        };
      },
      providesTags: [TAG_KEYS.PRODUCT],
    }),
  }),
});

export const {
  useListProductsForUserQuery,
  useSearchProductsQuery,
  useGetProductByIdQuery,
} = productApi;
