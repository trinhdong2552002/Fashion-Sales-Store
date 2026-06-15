import { baseApi } from "./index";
import { TAG_KEYS } from "@/constants/tagKeys";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategoriesByUser: builder.query({
      query: ({ page, size, sort }) => ({
        url: "/v1/public/categories",
        params: { page, size, sort },
      }),
      providesTags: [TAG_KEYS.CATEGORIES],
    }),

    getProductsByCategoryByUser: builder.query({
      query: ({ categoryId, page, size, sort }) => ({
        url: `/v1/public/categories/${categoryId}/products`,
        params: { page, size, sort },
      }),
      providesTags: [TAG_KEYS.CATEGORIES],
    }),
  }),
});

export const {
  useGetAllCategoriesByUserQuery,
  useGetProductsByCategoryByUserQuery,
} = categoryApi;
