import { ApiResponse, DataArray, DataObject } from "@/types/interface";
import { apiSlice } from "../instances/instance";
import { ArticleInterface } from "./interface";

export const articleApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    articleLists: builder.query<
      ApiResponse<DataArray<ArticleInterface>>,
      Record<string, string | number | boolean | undefined>
    >({
      query: (
        params: Record<string, string | number | boolean | undefined>
      ) => {
        const queryParams = new URLSearchParams(
          Object.fromEntries(
            Object.entries(params).map(([key, value]) => [key, String(value)])
          )
        ).toString();

        console.log("queryParams", queryParams);

        return {
          url: `/article/?${queryParams}`,
          method: "GET",
          meta: {
            useAuthorization: false,
            contentType: "application/json",
          },
        };
      },
    }),
    ArticleById: builder.query<
      ApiResponse<DataObject<ArticleInterface>>,
      number
    >({
      query: (id: number) => ({
        url: `/article/${id}`,
        method: "GET",
        meta: {
          useAuthorization: false,
          contentType: "application/json",
        },
      }),
    }),
    createArticle: builder.mutation<
      ApiResponse<DataObject<ArticleInterface>>,
      { title: string; content: string; status: string; category: string }
    >({
      query: (data) => ({
        url: `/article/`,
        method: "POST",
        body: data,
        meta: {
          useAuthorization: false,
          contentType: "application/json",
        },
      }),
    }),
    deleteArticle: builder.mutation<
      ApiResponse<DataObject<ArticleInterface>>,
      { id: number; status: string }
    >({
      query: (data) => {
        const { id, ...rest } = data;
        return {
          url: `/article/delete/${id}`,
          method: "PUT",
          body: rest,
          meta: {
            useAuthorization: false,
            contentType: "application/json",
          },
        };
      },
    }),
    updateArticle: builder.mutation<
      ApiResponse<DataObject<ArticleInterface>>,
      {
        id: number;
        status: string;
        title: string;
        content: string;
        category: string;
      }
    >({
      query: (data) => {
        const { id, ...rest } = data;
        return {
          url: `/article/update/${id}`,
          method: "PUT",
          body: rest,
          meta: {
            useAuthorization: false,
            contentType: "application/json",
          },
        };
      },
    }),
  }),
});

export const {
  useArticleListsQuery,
  useArticleByIdQuery,
  useCreateArticleMutation,
  useDeleteArticleMutation,
  useUpdateArticleMutation,
} = articleApi;
