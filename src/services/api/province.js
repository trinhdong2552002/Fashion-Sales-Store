// services/api/province.js
import { baseApi } from "./index";
import { TAG_KEYS } from "/src/constants/tag-keys.js";

export const provinceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProvinces: builder.query({
      query: ({ page, size, sort }) => ({
        url: `/v1/private/provinces`,
        method: "GET",
        params: { page, size, sort },
      }),
      providesTags: [TAG_KEYS.PROVINCE],
    }),

    getProvinceById: builder.query({
      query: ({ provinceId, page, size, sort }) => ({
        url: `/v1/private/provinces/${provinceId}`,

        params: { page, size, sort },
      }),
      providesTags: [TAG_KEYS.PROVINCE],
    }),

    getAllDistrictsByProvince: builder.query({
      query: ({ provinceId, page, size, sort }) => ({
        url: `/v1/private/provinces/${provinceId}/districts`,
        params: { page, size, sort },
      }),
      providesTags: [TAG_KEYS.PROVINCE],
    }),
  }),
});

export const {
  useGetAllProvincesQuery,
  useGetProvinceByIdQuery,
  useGetAllDistrictsByProvinceQuery,
} = provinceApi;
