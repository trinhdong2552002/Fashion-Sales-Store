// services/api/color.js
import { baseApi } from "./index";
import { TAG_KEYS } from "/src/constants/tagKeys.js";

export const colorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    useGetAllColors: builder.query({
      query: ({ page, size, sort }) => ({
        url: "/v1/public/colors",
        params: { page, size, sort },
      }),
      providesTags: [TAG_KEYS.COLOR],
    }),
  }),
});

export const { useGetAllColors } = colorApi;
