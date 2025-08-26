import { baseApi } from "./index";
import { TAG_KEYS } from "/src/constants/tagKeys.js";

export const roleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listRoles: builder.query({
      query: ({ page, size }) => ({
        url: `/v1/roles`,
        params: { page, size },
      }),
      providesTags: [TAG_KEYS.ROLE],
      transformResponse: (response) => ({
        id: response.id,
        name: response.name,
        description: response.description,
      }),
    }),
  }),
});

export const { useListRolesQuery, useGetRoleByIdQuery } = roleApi;
