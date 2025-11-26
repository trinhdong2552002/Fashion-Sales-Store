import { baseApi } from "./index";
import { TAG_KEYS } from "/src/constants/tagKeys.js";

export const addressApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all addresses of user
    getAllAddressByUser: builder.query({
      query: ({ pageNo, pageSize }) => ({
        url: "/v1/users/addresses",
        method: "GET",
        params: { pageNo, pageSize },
      }),
      providesTags: [TAG_KEYS.ADDRESS],
    }),
    // Add new address
    createAddress: builder.mutation({
      query: (addressData) => ({
        url: "/v1/addresses",
        method: "POST",
        data: addressData,
      }),
      invalidatesTags: [TAG_KEYS.ADDRESS],
    }),
    // Update address
    updateAddress: builder.mutation({
      query: ({ id, ...addressData }) => ({
        url: `/v1/addresses/${id}`,
        method: "PUT",
        data: addressData,
      }),
      invalidatesTags: [TAG_KEYS.ADDRESS],
    }),
    // Hide address from user (not delete)
    hideAddress: builder.mutation({
      query: (id) => ({
        url: `/v1/addresses/${id}/hide`,
        method: "PATCH",
      }),
      invalidatesTags: [TAG_KEYS.ADDRESS],
    }),
  }),
});

export const {
  useGetAllAddressByUserQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation,
  useHideAddressMutation,
} = addressApi;
