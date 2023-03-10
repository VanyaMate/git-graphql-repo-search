import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {GIT_SECRET_KEY} from "../../../consts/secrets";
import {
    IRepoGetProps,
    IRepoSearchProps, IRepositoriesOfViewer, IRepositoryItem, IRepositorySearchCursors,
    IRepositorySearchData, IRepoViewerProps, repositoryGetQuery, repositorySearchCursor,
    repositorySearchData,
    repositorySearchQuery, repositoryViewerQuery
} from "../../graphql-queries/search";

const defaultHeaders = {
    'Content-Type': 'application/json',
    'authorization': `bearer ${GIT_SECRET_KEY}`,
};

export const graphqlGitApi = createApi({
    reducerPath: 'graphql-git/api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.github.com/graphql'
    }),
    endpoints: (build) => ({
        getReposData: build.query<
            IRepositorySearchData,
            IRepoSearchProps
        >({
            query: (props) => ({
                url: '',
                method: 'post',
                headers: defaultHeaders,
                body: JSON.stringify({
                    query: repositorySearchQuery({...props, searchType: repositorySearchData})
                })
            }),
            transformResponse: (response: { data: { search: IRepositorySearchData } }) => {
                return response.data.search;
            }
        }),
        getReposCursors: build.query<
            IRepositorySearchCursors,
            IRepoSearchProps
        >({
            query: (props) => ({
                url: '',
                method: 'post',
                headers: defaultHeaders,
                body: JSON.stringify({
                    query: repositorySearchQuery({...props, searchType: repositorySearchCursor})
                })
            }),
            transformResponse: (response: { data: { search: IRepositorySearchCursors } }) => {
                return response.data.search;
            }
        }),
        getRepo: build.query<
            IRepositoryItem,
            IRepoGetProps
            >({
            query: (props) => ({
                url: '',
                method: 'post',
                headers: defaultHeaders,
                body: JSON.stringify({
                    query: repositoryGetQuery(props)
                })
            }),
            transformResponse: (response: { data: { repository: IRepositoryItem } }) => {
                return response.data.repository;
            }
        }),
        getViewerRepos: build.query<
            IRepositoriesOfViewer,
            IRepoViewerProps
            >({
            query: (props) => ({
                url: '',
                method: 'post',
                headers: defaultHeaders,
                body: JSON.stringify({
                    query: repositoryViewerQuery(props)
                })
            }),
            transformResponse: (response: { data: { viewer: { repositories: IRepositoriesOfViewer } } }) => {
                return response.data.viewer.repositories;
            }
        }),
    })
})

export const {useLazyGetReposDataQuery, useLazyGetRepoQuery, useGetViewerReposQuery} = graphqlGitApi;