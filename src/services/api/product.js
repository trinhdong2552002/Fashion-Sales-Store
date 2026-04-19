import { baseApi } from "/src/services/api/index.js";
import { TAG_KEYS } from "@/constants/tagKeys.js";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all products for users
    getAllProductByUser: builder.query({
      query: ({ page, size, sort }) => ({
        url: "/v1/public/products",
        params: { page, size, sort },
      }),
      transformResponse: (response) => {
        return response.result;
      },
      providesTags: [TAG_KEYS.PRODUCT],
    }),

    // Get product review by product id
    getProductReviewById: builder.query({
      query: (id, page, size, sort) => ({
        url: `/v1/public/products/${id}/reviews`,
        params: { page, size, sort },
      }),
      transformResponse: (response) => {
        return response.result;
      },
      providesTags: [TAG_KEYS.PRODUCT],
    }),

    // Get product detail by id
    getProductDetailById: builder.query({
      query: (productId) => {
        return {
          url: `/v1/public/products/${productId}/details`,
        };
      },
      providesTags: [TAG_KEYS.PRODUCT],
    }),

    // Search products
    searchProduct: builder.query({
      query: (page, size, sort, search) => ({
        url: "/v1/public/products/search",
        params: { page, size, sort, search },
      }),
      transformResponse: (response) => {
        return response.result;
      },
      providesTags: [TAG_KEYS.PRODUCT],
    }),
  }),
});

export const {
  useGetAllProductByUserQuery,
  useSearchProductsQuery,
  useGetProductByIdQuery,
} = productApi;
