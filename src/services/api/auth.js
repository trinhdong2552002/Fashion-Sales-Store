import { setUserInfo } from "@/store/redux/user/reducer";
import { baseApi } from "./index";
import { TAG_KEYS } from "@/constants/tagKeys";
import { setAuth } from "@/store/redux/auth/reducer";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/v1/auth/login",
        method: "POST",
        data: {
          email: credentials.email,
          password: credentials.password,
        },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;

        const authData = {
          accessToken: data?.result?.accessToken,
          refreshToken: data.result?.refreshToken,
          authenticated: data?.result?.authenticated,
          email: data?.result?.email,
          roles: data?.result?.roles,
        };

        dispatch(setAuth(authData));
      },
      invalidatesTags: [TAG_KEYS.AUTH],
    }),

    logout: builder.mutation({
      query: (credentials) => {
        if (!credentials.accessToken) {
          throw new Error("accessToken is required for logout");
        }

        return {
          url: "/v1/auth/logout",
          method: "POST",
          data: {
            accessToken: credentials.accessToken,
          },
        };
      },
      invalidatesTags: [TAG_KEYS.AUTH],
    }),

    register: builder.mutation({
      query: (credentials) => ({
        url: "/v1/auth/register",
        method: "POST",
        data: {
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          confirmPassword: credentials.confirmPassword,
        },
      }),
      invalidatesTags: [TAG_KEYS.AUTH],
    }),

    verifyOtp: builder.mutation({
      query: (credentials) => ({
        url: "/v1/auth/register/verify",
        method: "POST",
        data: {
          email: credentials.email,
          verificationCode: credentials.verificationCode,
        },
      }),
      invalidatesTags: [TAG_KEYS.AUTH],
    }),

    forgotPassword: builder.mutation({
      query: (credentials) => ({
        url: "/v1/auth/forgot-password",
        method: "POST",
        data: {
          email: credentials.email,
        },
      }),
      invalidatesTags: [TAG_KEYS.AUTH],
    }),

    forgotPasswordVerify: builder.mutation({
      query: (credentials) => ({
        url: "/v1/auth/forgot-password/verify-code",
        method: "POST",
        data: {
          email: credentials.email,
          verificationCode: credentials.verificationCode,
        },
      }),
      invalidatesTags: [TAG_KEYS.AUTH],
    }),

    resetPassword: builder.mutation({
      query: (credentials) => ({
        url: "/v1/auth/forgot-password/reset-password",
        method: "POST",
        data: {
          forgotPasswordToken: credentials.forgotPasswordToken,
          newPassword: credentials.newPassword,
          confirmPassword: credentials.confirmPassword,
        },
      }),
      invalidatesTags: [TAG_KEYS.AUTH],
    }),

    changePassword: builder.mutation({
      query: ({ oldPassword, newPassword, confirmPassword }) => ({
        url: "/v1/auth/change-password",
        method: "POST",
        data: {
          oldPassword,
          newPassword,
          confirmPassword,
        },
      }),
      invalidatesTags: [TAG_KEYS.AUTH],
    }),

    getMyInfo: builder.query({
      query: () => ({
        url: "/v1/auth/myInfo",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("getMyInfo data:", data);

          dispatch(
            setUserInfo({
              id: data?.result?.id || null,
              name: data?.result?.name || null,
              email: data?.result?.email || null,
              avatarUrl: data?.result?.avatarUrl || null,
              dob: data?.result?.dob || null,
              gender: data?.result?.gender || null,
            })
          );
          console.log("getMyInfo queryFulfilled", data);
        } catch (error) {
          console.error("getMyInfo failed:", error);
        }
      },
      providesTags: [TAG_KEYS.AUTH],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useVerifyOtpMutation,
  useForgotPasswordMutation,
  useForgotPasswordVerifyMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useGetMyInfoQuery,
  useLazyGetMyInfoQuery,
} = authApi;
