import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IRepositorySearchItem} from "../../graphql-queries/search";

export interface IGraphqlGitState {
    fetching: boolean,
    page: number,
    totalPages: number,
    items: IRepositorySearchItem[]
}

export const graphqlGitSlice = createSlice({
    name: 'graphql-git',
    initialState: {
        fetching: false,
        page: 0,
        totalPages: 0,
        items: []
    } as IGraphqlGitState,
    reducers: {
        setGraphGitData: (state, action: PayloadAction<{
            page: number,
            totalPages: number,
            items: IRepositorySearchItem[]
        }>) => {
            state.page = action.payload.page;
            state.totalPages = action.payload.totalPages;
            state.items = action.payload.items;
        },
        setFetching: (state, action: PayloadAction<boolean>) => {
            state.fetching = action.payload;
        }
    }
})

export const graphqlGitActions = graphqlGitSlice.actions;
export const graphqlGitReducer = graphqlGitSlice.reducer;