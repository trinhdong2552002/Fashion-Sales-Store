import { baseApi } from "/src/services/api/index.js";
import { TAG_KEYS } from "@/constants/tagKeys.js";

export const conversationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createConversation: builder.mutation({
      query: ({ dataConversation }) => ({
        url: "/v1/private/conversations",
        method: "POST",
        dataConversation,
      }),
      invalidatesTags: [TAG_KEYS.CONVERSATION],
    }),

    searchConversationsByName: builder.query({
      query: ({ name }) => ({
        url: "/v1/private/conversations/search",
        params: { name },
      }),
      providesTags: [TAG_KEYS.CONVERSATION],
    }),

    getAllConversationsByUser: builder.query({
      query: () => ({
        url: "/v1/private/conversations/my-conversations",
      }),
      providesTags: [TAG_KEYS.CONVERSATION],
    }),
  }),
});

export const {
  useCreateConversationMutation,
  useSearchConversationsByNameQuery,
  useGetAllConversationsByUserQuery,
} = conversationApi;
