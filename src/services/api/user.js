import axios from "axios";
import { baseApi } from "./index";
import { TAG_KEYS } from "@/constants/tagKeys";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserById: builder.query({
      query: ({ id }) => ({
        url: `v1/users/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, { id }) => [
        { type: TAG_KEYS.USER, id },
        TAG_KEYS.USER,
      ],
      transformResponse: (response) => {
        // Transform response nếu cần thiết
        return response.data || response;
      },
    }),

    updateUser: builder.mutation({
      query: ({ id, ...credentials }) => {
        // Chuyển đổi birthDate thành định dạng YYYY-MM-DD nếu có
        let dob = undefined;
        
        if (credentials.birthDate?.year && 
            credentials.birthDate?.month && 
            credentials.birthDate?.date) {
          dob = `${credentials.birthDate.year}-${String(
            credentials.birthDate.month
          ).padStart(2, "0")}-${String(credentials.birthDate.date).padStart(
            2, "0"
          )}`;
        }

        return {
          url: `v1/users/${id}`,
          method: "PUT",
          body: {
            name: credentials.name,
            avatarUrl: credentials.image, // Backend expect avatarUrl
            dob: dob,
            gender: credentials.gender,
            // Thêm các field khác nếu backend yêu cầu
            roleIds: credentials.roleIds || [], // Giữ roleIds nếu backend yêu cầu
          },
        };
      },
      invalidatesTags: (result, error, { id }) => [
        { type: TAG_KEYS.USER, id },
        TAG_KEYS.USER,
      ],
      transformResponse: (response) => {
        return response.data || response;
      },
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
                // Không set Content-Type, để browser tự động set với boundary
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
                message: error.message || "Upload thất bại" 
              },
            },
          };
        }
      },
      invalidatesTags: [TAG_KEYS.USER],
    }),

    // Thêm endpoint để lấy current user nếu cần
    getCurrentUser: builder.query({
      query: () => ({
        url: "v1/users/me", // hoặc endpoint phù hợp với backend
        method: "GET",
      }),
      providesTags: [TAG_KEYS.USER],
      transformResponse: (response) => {
        return response.data || response;
      },
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useUploadAvatarMutation,
  useGetCurrentUserQuery,
} = userApi;