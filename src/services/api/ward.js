import { baseApi } from "./index";
import { TAG_KEYS } from "/src/constants/tag-keys.js";

export const wardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllWards: builder.query({
      query: ({ page, size, sort }) => ({
        url: "/v1/private/wards",
        params: { page, size, sort },
      }),
      transformResponse: (response) => {
        return response.result;
      },
      providesTags: [TAG_KEYS.WARD],
    }),

    getWardsByCode: builder.query({
      query: (code) => ({
        url: `/v1/private/wards/${code}`,
      }),
      transformResponse: (response) => {
        return response.result;
      },
      providesTags: [TAG_KEYS.WARD],
    }),
  }),
});

export const { useGetAllWards, useGetWardsByCodeQuery } = wardApi;
