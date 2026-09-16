import { baseApi } from "./index";
import { TAG_KEYS } from "@/constants/tag-keys";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateByUser: builder.mutation({
      query: ({ id, ...userData }) => ({
        url: `/v1/private/users/${id}`,
        method: "PUT",
        data: userData,
      }),
      invalidatesTags: [TAG_KEYS.USER],
    }),

    uploadAvatar: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append("file", file);
        return {
          url: "/v1/private/users/avatar",
          method: "PUT",
          data: formData,
        };
      },
      invalidatesTags: [TAG_KEYS.USER],
    }),

    getPromotionsByUser: builder.query({
      query: ({ page, size }) => ({
        url: "/v1/private/users/promotions/available",
        params: { page, size },
      }),
      providesTags: [TAG_KEYS.USER],
    }),

    getAllAddressesByUser: builder.query({
      query: ({ page, size }) => ({
        url: "/v1/private/users/addresses",
        params: { page, size },
      }),
      providesTags: [TAG_KEYS.USER],
    }),
  }),
});

export const {
  useUpdateByUserMutation,
  useUploadAvatarMutation,
  useGetAllAddressesByUserQuery,
  useGetPromotionsByUserQuery,
} = userApi;
