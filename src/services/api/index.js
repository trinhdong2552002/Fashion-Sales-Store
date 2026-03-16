import { createApi } from "@reduxjs/toolkit/query/react";
import axios from "axios";

let isRedirectingToLogin = false;

export const axiosBaseQuery =
  () =>
  async ({ url, method, data, params, headers }) => {
    const publicEndpoints = [
      "/v1/auth/login",
      "/v1/auth/refresh-token",
      "/v1/auth/register",
      "/v1/auth/register/verify",
      "/v1/auth/forgot-password",
      "/v1/auth/forgot-password/verify-code",
      "/v1/auth/forgot-password/reset-password",
      "/v1/products",
      "/v1/products/{productId}/reviews",
      "/v1/products/{id}/details",
      "/v1/products/search",
      "/v1/categories",
      "/v1/categories/{categoriesId}/products",
      "/v1/branches",
      "/v1/branches/{id}",
      "v1/colors",
      "/v1/sizes",
    ];

    const token = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!publicEndpoints.includes(url) && !token && !refreshToken) {
      console.log("No token found for non-public endpoint:", url);
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

      console.error("Axios error:", error);

      // HANDLE 401 / EXPIRED TOKEN HERE
      if (error.status === 401 && url !== "/v1/auth/logout") {
        const expiredToken = localStorage.getItem("accessToken");

        // Call logout API if token exists
        if (expiredToken) {
          try {
            await axios.post(
              "/v1/auth/logout",
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

        // Redirect to login (prevent multiple redirects from concurrent requests)
        // if (!isRedirectingToLogin) {
        //   isRedirectingToLogin = true;
        //   window.location.href = "/login";
        // }

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
    "Address",
    "Auth",
    "Branches",
    "Cart",
    "Categories",
    "Color",
    "District",
    "Order",
    "Product",
    "Product_Variant",
    "Promotion",
    "Province",
    "Review",
    "Role",
    "Size",
    "User",
    "Ward",
  ],
});
