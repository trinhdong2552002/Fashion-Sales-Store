import { baseApi } from "/src/services/api/index.js";
import { TAG_KEYS } from "@/constants/tag-keys.js";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProductForUser: builder.query({
      query: ({ page, size, sort }) => ({
        url: "/v1/public/products",
        params: { page, size, sort },
      }),
      providesTags: [TAG_KEYS.PRODUCT],
    }),

    getProductReviewById: builder.query({
      query: (productId, page, size, sort) => ({
        url: `/v1/public/products/${productId}/reviews`,
        params: { page, size, sort },
      }),
      providesTags: [TAG_KEYS.PRODUCT],
    }),

    // Get product detail by id
    getProductDetailById: builder.query({
      query: (productDetailId) => {
        return {
          url: `/v1/public/products/${productDetailId}/details`,
        };
      },
      providesTags: [TAG_KEYS.PRODUCT],
    }),

    searchProduct: builder.query({
      query: (page, size, sort, search) => ({
        url: "/v1/public/products/search",
        params: { page, size, sort, search },
      }),
      providesTags: [TAG_KEYS.PRODUCT],
    }),
  }),
});

export const {
  useGetAllProductForUserQuery,
  useGetProductReviewByIdQuery,
  useGetProductDetailByIdQuery,
  useSearchProductQuery,
} = productApi;
