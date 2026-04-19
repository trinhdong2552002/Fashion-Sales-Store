import { createApi } from "@reduxjs/toolkit/query/react";
import axios from "axios";

export const axiosBaseQuery =
  () =>
  async ({ url, method, data, params, headers }) => {
    const publicEndpoints = [
      "/v1/public/auth/login",
      "/v1/public/register",
      "/v1/public/auth/register/verify",
      "/v1/public/auth/refresh-token",
      "/v1/public/auth/forgot-password",
      "/v1/public/auth/forgot-password/verify-code",
      "/v1/public/auth/forgot-password/reset-password",
      "/v1/public/promotions/search",
      "/v1/public/products",
      "/v1/public/products/{productId}/reviews",
      "/v1/public/products/{id}/details",
      "/v1/public/products/search",
      "v1/public/colors",
      "/v1/public/categories",
      "/v1/public/categories/{categoryId}/products",
      "/v1/public/branches",
      "/v1/public/branches/{id}",
      "/v1/public/sizes",
      "/v1/public/qrcode",
    ];

    const token = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!publicEndpoints.includes(url) && !token && !refreshToken) {
      return {
        error: {
          status: 401,
          data: { message: "Không tìm thấy token, vui lòng đăng nhập lại" },
        },
      };
    }

    try {
      const result = await axios({
        url,
        method,
        data,
        params,
        headers: {
          ...headers,
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        baseURL: import.meta.env.VITE_API_URL,
      });

      if (result.status >= 400) {
        console.log("Server error response:", result.data);
        return {
          error: {
            status: result.status,
            data: result.data,
          },
        };
      }

      return { data: result.data };
    } catch (axiosError) {
      const error = {
        status: axiosError.response?.status,
        data: axiosError.response?.data || axiosError.message,
      };

      // HANDLE 401 / EXPIRED TOKEN HERE
      if (error.status === 401 && url !== "/v1/private/auth/logout") {
        const expiredToken = localStorage.getItem("accessToken");

        // Call logout API if token exists
        if (expiredToken) {
          try {
            await axios.post(
              "/v1/private/auth/logout",
              { accessToken: expiredToken },
              { baseURL: import.meta.env.VITE_API_URL },
            );
          } catch (logoutError) {
            console.error("Logout API call failed:", logoutError);
          }
        }

        // Clear all auth data
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("persist:root");

        return { error };
      }

      return { error };
    }
  };

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
  tagTypes: [
    "User",
    "Review",
    "Order",
    "Cart",
    "Cart_Item",
    "Auth",
    "Address",
    "Promotion",
    "Product",
    "Product_Variant",
    "Color",
    "Category",
    "Branch",
    "Conversation",
    "Size",
    "QrCode",
    "Ward",
    "Province",
    "Chat_Message",
    "District",
    "Role",
  ],
});
