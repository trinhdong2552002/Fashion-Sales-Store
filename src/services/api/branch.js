import { TAG_KEYS } from "@/constants/tagKeys";
import { baseApi } from "./index";

export const branchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all branches for user
    getAllBranchesByUser: builder.query({
      query: () => ({
        url: "/v1/public/branches",
      }),
      providesTags: [TAG_KEYS.BRANCH],
      transformResponse: (response) => {
        return response.result;
      },
    }),

    // Get branch by id
    getBranchById: builder.query({
      query: (branchId) => ({
        url: `/v1/public/branches/${branchId}`,
      }),
      providesTags: [TAG_KEYS.BRANCH],
    }),
  }),
});

export const { useGetAllBranchesByUserQuery, useGetBranchByIdQuery } =
  branchApi;
