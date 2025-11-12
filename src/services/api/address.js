import { baseApi } from "./index";
import { TAG_KEYS } from "/src/constants/tagKeys.js";

export const addressApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Lấy danh sách địa chỉ của người dùng
    getAllAddressByUser: builder.query({
      query: ({ pageNo, pageSize } = {}) => ({
        url: `/v1/users/addresses`,
        method: "GET",
        params: { pageNo, pageSize },
      }),
      providesTags: [TAG_KEYS.ADDRESS],
    }),
    // Thêm địa chỉ mới
    createAddress: builder.mutation({
      query: (addressData) => ({
        url: `/v1/addresses`,
        method: "POST",
        data: addressData,
      }),
      invalidatesTags: [TAG_KEYS.ADDRESS],
    }),
    // Cập nhật địa chỉ
    updateAddress: builder.mutation({
      query: ({ addressId, addressData }) => ({
        url: `/v1/addresses/${addressId}`,
        method: "PUT",
        data: addressData,
      }),
      invalidatesTags: [TAG_KEYS.ADDRESS],
    }),
    // Xóa địa chỉ
    deleteAddress: builder.mutation({
      query: (addressId) => ({
        url: `/v1/addresses/${addressId}`,
        method: "DELETE",
      }),
      invalidatesTags: [TAG_KEYS.ADDRESS],
    }),
  }),
});

export const {
  useGetAllAddressByUserQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} = addressApi;
