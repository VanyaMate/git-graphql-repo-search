export interface ITotalCommitCount {
    target: {
        committedDate: string,
        history: {
            totalCount: number
        }
    }
}

export const totalCommitCount = `
    defaultBranchRef {
        target {
            ... on Commit {
                committedDate
                history {
                    totalCount
                }
            }
        }
    }
`;

export interface IRepositoryItem {
    name: string,
    url: string,
    description: string,
    stargazerCount: string,
    owner: {
        login: string,
        avatarUrl: string,
        url: string,
    },
    languages: {
        totalCount: number,
        edges: {
            size: number,
            node: {
                name: string,
                color: string,
            }
        }[]
    }
    defaultBranchRef?: ITotalCommitCount,
}

export interface IRepositorySearchItem {
    cursor: string,
    node: IRepositoryItem
}

export const repositoryItem = `
    ... on Repository {
        name
        url
        description
        stargazerCount
        owner {
            login
            avatarUrl
            url
        },
        languages (first:10) {
            totalCount
            edges {
                size
                node {
                    name
                    color
                }
            }
        }
        ${totalCommitCount}
    }
`;

export const repositorySearchItem = `
    cursor
    node {
        ${repositoryItem}
    }
`;

export interface IRepositorySearchData {
    repositoryCount: number,
    edges: IRepositorySearchItem[]
}

export const repositorySearchData = `
    repositoryCount
    edges {
        ${repositorySearchItem}
    }
`;

export interface IRepositorySearchCursors {
    repositoryCount: number,
    pageInfo: {
        endCursor: string
    }
}

export const repositorySearchCursor = `
    repositoryCount
    pageInfo {
        endCursor
    }
`;

export interface IRepoSearchProps {
    search: string,
    searchType?: string,
    first?: number,
    last?: number,
    after?: string,
    before?: string,
    sort?: string
}

export const repositorySearchQuery = (props : IRepoSearchProps) => `
    query {
        search(query:"${props.search}" type:REPOSITORY
           
            ${props.first ? `first:${props.first}` : ''}
            ${props.last ? `last:${props.last}` : ''}
            ${props.after ? `after:"${props.after}"` : ''}
            ${props.before ? `before:"${props.before}"` : ''}
        ) {
            ${props.searchType}
        }
    }
`;

export interface IRepoGetProps {
    owner: string,
    name: string,
}

export const repositoryGetQuery = (props: { owner: string, name: string }) => `
    query {
        repository (owner:"${ props.owner }", name:"${ props.name }") {
            ${repositoryItem}
        }
    }
`;

export interface IRepoViewerProps {
    first?: number,
    last?: number,
    after?: string,
    before?: string,
}

export interface IRepositoriesOfViewer {
    totalCount: number,
    edges: {
        cursor: string,
        node: IRepositoryItem
    }[]
}

export const repositoryViewerQuery = (props: IRepoViewerProps) => `    
    query {
        viewer {
            repositories (first: 10) {
                totalCount
                edges {
                    cursor
                    node {
                        ${repositoryItem}
                    }
                }
            }
        }
    }
`;