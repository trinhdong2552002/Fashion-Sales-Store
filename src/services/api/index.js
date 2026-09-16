import { createApi } from "@reduxjs/toolkit/query/react";
import axios from "axios";

import { setAuth, clearAuth } from "@/store/redux/auth/reducer";

let refreshTokenPromise = null;

export const axiosBaseQuery =
  () =>
  async ({ url, method, data, params, headers }, api) => {
    const isPublicEndpoint = url.startsWith("/v1/public");

    const token = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!isPublicEndpoint && !token && !refreshToken) {
      return {
        error: {
          status: 401,
          data: { message: "Không tìm thấy token, vui lòng đăng nhập lại" },
        },
      };
    }

    const executeRequest = (tokenToUse) =>
      axios({
        url,
        method,
        data,
        params,
        headers: {
          ...headers,
          ...(tokenToUse && { Authorization: `Bearer ${tokenToUse}` }),
        },
        baseURL: import.meta.env.VITE_API_URL,
      });

    try {
      const result = await executeRequest(token);

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
      const status = axiosError.response?.status;
      const errorData = axiosError.response?.data || axiosError.message;

      const isRefreshEndpoint = url === "/v1/public/auth/refresh-token";
      const isLoginEndpoint = url === "/v1/public/auth/login";
      const isLogoutEndpoint = url === "/v1/private/auth/logout";

      // Handle 401 / expired token with auto refresh
      if (
        status === 401 &&
        !isRefreshEndpoint &&
        !isLoginEndpoint &&
        !isLogoutEndpoint
      ) {
        const storedRefreshToken = localStorage.getItem("refreshToken");

        if (storedRefreshToken) {
          try {
            if (!refreshTokenPromise) {
              refreshTokenPromise = (async () => {
                const refreshResponse = await axios({
                  url: "/v1/public/auth/refresh-token",
                  method: "POST",
                  data: { refreshToken: storedRefreshToken },
                  baseURL: import.meta.env.VITE_API_URL,
                });

                const result = refreshResponse?.data?.result;
                if (!result?.accessToken) {
                  throw new Error("Làm mới token không thành công");
                }

                localStorage.setItem("accessToken", result.accessToken);
                if (result.refreshToken) {
                  localStorage.setItem("refreshToken", result.refreshToken);
                }

                return result;
              })().finally(() => {
                refreshTokenPromise = null;
              });
            }

            const refreshResult = await refreshTokenPromise;

            if (api?.dispatch) {
              api.dispatch(
                setAuth({
                  accessToken: refreshResult.accessToken,
                  refreshToken: refreshResult.refreshToken,
                  email: refreshResult.email,
                  roles: refreshResult.roles,
                }),
              );
            }

            // Retry original request with newly obtained access token
            const retryResult = await executeRequest(refreshResult.accessToken);

            if (retryResult.status >= 400) {
              return {
                error: {
                  status: retryResult.status,
                  data: retryResult.data,
                },
              };
            }

            return { data: retryResult.data };
          } catch (refreshErr) {
            console.error("Auto refresh token failed:", refreshErr);

            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("persist:root");

            if (api?.dispatch) {
              api.dispatch(clearAuth());
              api.dispatch({ type: "RESET_STATE" });
            }

            return {
              error: {
                status: 401,
                data: refreshErr.response?.data || {
                  message: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.",
                },
              },
            };
          }
        } else {
          // No refresh token available, clean up state
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("persist:root");

          if (api?.dispatch) {
            api.dispatch(clearAuth());
            api.dispatch({ type: "RESET_STATE" });
          }
        }
      }

      return {
        error: {
          status,
          data: errorData,
        },
      };
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
    "QRCode",
    "Ward",
    "Province",
    "Chat_Message",
    "District",
    "Role",
  ],
});
