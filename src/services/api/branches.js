import { TAG_KEYS } from "@/constants/tagKeys";
import { baseApi } from "./index";

export const branchesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getListBranches: builder.query({
      query: () => ({
        url: "/v1/branches",
      }),
      providesTags: [TAG_KEYS.BRANCHES],
    }),
  }),
});

export const { useGetListBranchesQuery } = branchesApi;
