import {configureStore} from "@reduxjs/toolkit";
import {graphqlGitApi} from "./graphql-git/graphql-git.api";
import {graphqlGitReducer, graphqlGitSlice} from "./graphql-git/graphql-git.slice";

export const store = configureStore({
    reducer: {
        [graphqlGitApi.reducerPath]: graphqlGitApi.reducer,
        [graphqlGitSlice.name]: graphqlGitReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat([
        graphqlGitApi.middleware
    ])
})

export type StoreType = ReturnType<typeof store.getState>;