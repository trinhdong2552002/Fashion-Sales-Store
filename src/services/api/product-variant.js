// services/api/productVariant.js
import { baseApi } from "./index";
import { TAG_KEYS } from "/src/constants/tag-keys.js";

export const productVariantApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProductVariantByProduct: builder.query({
      query: ({ productId, colorId, sizeId }) => ({
        url: `/v1/private/product-variants/${productId}/${colorId}/${sizeId}`,
      }),
      providesTags: [TAG_KEYS.PRODUCT_VARIANT],
    }),
  }),
});

export const { useGetProductVariantByProductQuery } = productVariantApi;
