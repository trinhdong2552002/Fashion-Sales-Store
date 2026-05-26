// services/api/size.js
import { baseApi } from "./index";
import { TAG_KEYS } from "/src/constants/tagKeys.js";

export const sizeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSizes: builder.query({
      query: (page, size, sort) => ({
        url: "/v1/public/sizes",
        method: "GET",
        params: { page, size, sort },
      }),
      providesTags: [TAG_KEYS.SIZE],
    }),
  }),
});

export const { getAllSizesQuery } = sizeApi;
