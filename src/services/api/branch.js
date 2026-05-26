import { TAG_KEYS } from "@/constants/tagKeys";
import { baseApi } from "./index";

export const branchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBranchesForUser: builder.query({
      query: ({ page, size, sort }) => ({
        url: "/v1/public/branches",
        params: { page, size, sort },
      }),
      providesTags: [TAG_KEYS.BRANCH],
    }),

    getBranchById: builder.query({
      query: (branchId) => ({
        url: `/v1/public/branches/${branchId}`,
      }),
      providesTags: [TAG_KEYS.BRANCH],
    }),
  }),
});

export const { useGetAllBranchesForUserQuery, useGetBranchByIdQuery } =
  branchApi;
