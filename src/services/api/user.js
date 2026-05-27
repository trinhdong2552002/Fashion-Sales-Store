import axios from "axios";
import { baseApi } from "./index";
import { TAG_KEYS } from "@/constants/tagKeys";

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
      async queryFn(file) {
        const formData = new FormData();
        formData.append("file", file);

        try {
          const token = localStorage.getItem("accessToken");

          if (!token) {
            return {
              error: {
                status: 401,
                data: { message: "Không tìm thấy token xác thực" },
              },
            };
          }

          const response = await axios.put(
            `${import.meta.env.VITE_API_URL}/v1/private/users/avatar`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          return { data: response.data };
        } catch (error) {
          console.error("Upload error:", error);

          return {
            error: {
              status: error.response?.status || 500,
              data: error.response?.data || {
                message: error.message || "Upload thất bại",
              },
            },
          };
        }
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
