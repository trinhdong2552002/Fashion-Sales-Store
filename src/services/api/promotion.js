// services/api/promotion.js
import { baseApi } from "./index";
import { TAG_KEYS } from "/src/constants/tagKeys.js";

export const promotionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    searchPromotion: builder.query({
      query: ({ page, size, sort, search }) => ({
        url: "/v1/public/promotions/search",
        params: { page, size, sort, search },
      }),
      transformResponse: (response) => {
        return response.result;
      },
      providesTags: [TAG_KEYS.PROMOTION],
    }),

    searchPromotionById: builder.query({
      query: (promotionId) => ({
        url: `/v1/private/promotions/${promotionId}`,
      }),
      transformResponse: (response) => {
        return response.result;
      },
      providesTags: [TAG_KEYS.PROMOTION],
    }),
  }),
});

export const {
  useListPromotionsQuery,
  useAddPromotionMutation,
  useUpdatePromotionMutation,
  useDeletePromotionMutation,
} = promotionApi;
