import axios from "axios";
import { baseApi } from "./index";
import { TAG_KEYS } from "@/constants/tagKeys";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateUser: builder.mutation({
      query: ({ id, ...userData }) => ({
        url: `v1/users/${id}`,
        method: "PUT",
        data: userData,
      }),
      invalidatesTags: [TAG_KEYS.USER],
    }),

    uploadAvatar: builder.mutation({
      async queryFn(file) {
        const formData = new FormData();
        formData.append("fileImage", file);

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

          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/v1/file/upload/image`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
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
  }),
});

export const { useUpdateUserMutation, useUploadAvatarMutation } = userApi;
