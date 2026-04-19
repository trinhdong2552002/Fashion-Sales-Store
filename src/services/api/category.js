import { baseApi } from "./index";
import { TAG_KEYS } from "@/constants/tagKeys";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all categories for user
    getAllCategoriesByUser: builder.query({
      query: ({ page, size, sort }) => ({
        url: "/v1/public/categories",
        params: { page, size, sort },
      }),
      transformResponse: (response) => {
        return response.result?.items || [];
      },
      providesTags: [TAG_KEYS.CATEGORIES],
    }),

    // Get all products by category for user
    getProductsByCategoryForUser: builder.query({
      query: ({ categoryId, page, size, sort }) => ({
        url: `/v1/public/categories/${categoryId}/products`,
        params: { page, size, sort },
      }),
      transformResponse: (response) => {
        return response.result;
      },
      providesTags: [TAG_KEYS.CATEGORIES],
    }),
  }),
});

export const {
  useGetAllCategoriesByUserQuery,
  useGetProductsByCategoryForUserQuery,
} = categoryApi;
