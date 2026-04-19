import { baseApi } from ".";
import { TAG_KEYS } from "@/constants/tagKeys";

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateReviewByUser: builder.mutation({
      query: (reviewId, ...reviewData) => ({
        url: `/v1/private/reviews/${reviewId}`,
        method: "PUT",
        data: reviewData,
      }),
      invalidatesTags: [TAG_KEYS.REVIEW],
    }),

    deleteReviewByUser: builder.mutation({
      query: (reviewId) => ({
        url: `/v1/private/reviews/${reviewId}`,
        method: "DELETE",
      }),
      invalidatesTags: [TAG_KEYS.REVIEW],
    }),

    createReviewByUser: builder.mutation({
      query: (reviewData) => ({
        url: "/v1/private/reviews",
        method: "POST",
        data: reviewData,
      }),
      invalidatesTags: [TAG_KEYS.REVIEW],
    }),

    getReviewByOrderItemIdTheCurrentUser: builder.query({
      query: (orderItemId) => ({
        url: `/v1/private/reviews/order-item/${orderItemId}`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response.result;
      },
      providesTags: [TAG_KEYS.REVIEW],
    }),

    getCheckReviewByOrderItemIdTheCurrentUser: builder.query({
      query: (orderItemId) => ({
        url: `/v1/private/reviews/check/${orderItemId}`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response.result;
      },
      providesTags: [TAG_KEYS.REVIEW],
    }),
  }),
});

export const {
  useUpdateByUserMutation,
  useDeleteReviewByUserMutation,
  useCreateReviewByUserMutation,
  useGetReviewByOrderItemIdTheCurrentUserQuery,
  useGetCheckReviewByOrderItemIdTheCurrentUserQuery,
} = reviewApi;
