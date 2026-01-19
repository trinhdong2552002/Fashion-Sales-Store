import { baseApi } from "/src/services/api/index.js";
import { TAG_KEYS } from "@/constants/tagKeys.js";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listProductsForUser: builder.query({
      query: ({ pageNo, pageSize }) => ({
        url: "/v1/products",
        params: { pageNo, pageSize },
      }),
      transformResponse: (response) => {
        return response.result;
      },
      providesTags: [TAG_KEYS.PRODUCT],
    }),

    // TODO: Api search product for user has been error, need backend fix it
    // TODO: Because i want to use search api for admin too the BE have not support it yet
    // searchProducts: builder.query({
    //   query: ({ pageNo, pageSize, search }) => ({
    //     url: "/v1/products/search",
    //     params: { pageNo, pageSize, search },
    //   }),
    //   providesTags: [TAG_KEYS.PRODUCT],
    // }),

    getProductById: builder.query({
      query: (id) => {
        return {
          url: `/v1/products/${id}`,
          method: "GET",
        };
      },
      providesTags: [TAG_KEYS.PRODUCT],
    }),
  }),
});

export const {
  useListProductsForUserQuery,
  useSearchProductsQuery,
  useGetProductByIdQuery,
} = productApi;
