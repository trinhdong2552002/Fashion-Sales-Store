import { baseApi } from "/src/services/api/index.js";
import { TAG_KEYS } from "@/constants/tag-keys.js";

export const qrCodeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getQrCode: builder.query({
      query: () => ({
        url: "/v1/public/qrcode",
      }),
      providesTags: [TAG_KEYS.QR_CODE],
    }),
  }),
});

export const { useGetQrCodeByProductIdQuery } = qrCodeApi;
