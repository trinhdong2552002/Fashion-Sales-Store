import { baseApi } from "./index";
import { TAG_KEYS } from "@/constants/tagKeys";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listCategoriesForUser: builder.query({
      query: ({ pageNo, pageSize }) => ({
        url: "/v1/categories",
        params: { pageNo, pageSize },
      }),
      transformResponse: (response) => {
        return response.result?.items || [];
      },
      providesTags: [TAG_KEYS.CATEGORIES],
    }),
  }),
});

export const { useListCategoriesForUserQuery } = categoryApi;
