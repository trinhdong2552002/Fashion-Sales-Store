import { baseApi } from "./index";
import { TAG_KEYS } from "/src/constants/tag-keys.js";

export const districtApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllDistricts: builder.query({
      query: ({ page, size, sort }) => ({
        url: `/v1/districts`,
        params: { page, size, sort },
      }),
      providesTags: [TAG_KEYS.DISTRICT],
    }),

    getDistrictById: builder.query({
      query: ({ districtId }) => ({
        url: `/v1/private/districts/${districtId}`,
      }),
      providesTags: [TAG_KEYS.DISTRICT],
    }),

    getAllWardsByDistrict: builder.query({
      query: ({ districtId, page, size, sort }) => ({
        url: `/v1/private/districts/${districtId}/wards`,
        params: { page, size, sort },
      }),
      providesTags: [TAG_KEYS.DISTRICT],
    }),
  }),
});

export const {
  useGetAllDistrictsQuery,
  useGetDistrictByIdQuery,
  useGetAllWardsByDistrictQuery,
} = districtApi;
