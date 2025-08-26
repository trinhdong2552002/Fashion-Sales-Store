import { baseApi } from "./index";
import { TAG_KEYS } from "@/constants/tagKeys";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listCategoriesForUser: builder.query({
      query: () => ({
        url: "/v1/categories",
        method: "GET",
      }),
      transformResponse: (response) => {
        return response.result?.items || [];
      },
      providesTags: [TAG_KEYS.CATEGORIES],
    }),
  }),
});

export const { useListCategoriesForUserQuery } = categoryApi;
