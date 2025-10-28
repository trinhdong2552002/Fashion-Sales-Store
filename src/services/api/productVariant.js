// services/api/productVariant.js
import { baseApi } from "./index";
import { TAG_KEYS } from "/src/constants/tagKeys.js";

export const productVariantApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listAllProductVariantsByProduct: builder.query({
      query: ({ pageNo, pageSize, id }) => ({
        url: `/v1/products/${id}/product-variants`,
        params: { pageNo, pageSize },
      }),
      providesTags: [TAG_KEYS.PRODUCT_VARIANT],
    }),
    getProductVariantByProduct: builder.query({
      query: ({ productId, colorId, sizeId }) => ({
        url: `/v1/product-variants/${productId}/${colorId}/${sizeId}`,
      }),
      providesTags: [TAG_KEYS.PRODUCT_VARIANT],
    }),
  }),
});

export const {
  useListAllProductVariantsByProductQuery,
  useGetProductVariantByProductQuery,
} = productVariantApi;
