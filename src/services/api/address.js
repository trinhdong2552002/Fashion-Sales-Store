import { baseApi } from "./index";
import { TAG_KEYS } from "/src/constants/tagKeys.js";

export const addressApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get address by id for current user
    getAddressById: builder.query({
      query: (addressId) => ({
        url: `/v1/private/addresses/${addressId}`,
      }),
      transformResponse: (response) => {
        return response.result;
      },
      providesTags: [TAG_KEYS.ADDRESS],
    }),

    // Create new address by user
    createAddress: builder.mutation({
      query: (addressData) => ({
        url: "/v1/private/addresses",
        method: "POST",
        data: addressData,
      }),
      invalidatesTags: [TAG_KEYS.ADDRESS],
    }),

    // Update address by user
    updateAddress: builder.mutation({
      query: (addressId, ...addressData) => ({
        url: `/v1/private/addresses/${addressId}`,
        method: "PUT",
        data: addressData,
      }),
      invalidatesTags: [TAG_KEYS.ADDRESS],
    }),

    // Hide address by user
    hideAddress: builder.mutation({
      query: (addressId) => ({
        url: `/v1/addresses/${addressId}/hide`,
        method: "PATCH",
      }),
      invalidatesTags: [TAG_KEYS.ADDRESS],
    }),
  }),
});

export const {
  useGetAddressByIdQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation,
  useHideAddressMutation,
} = addressApi;
