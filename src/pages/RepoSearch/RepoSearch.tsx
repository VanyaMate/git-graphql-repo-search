import React, {memo, useEffect} from 'react';
import {useActions, useMySelector} from "../../hooks/reduxHooks";
import RepoListItem from "../../components/RepoItem/RepoListItem";
import css from './RepoSearch.module.scss';
import {useLinkParams} from "../../hooks/useLinkParams";
import LoadStatus from "../../components/LoadStatus/LoadStatus";
import {useGetViewerReposQuery} from "../../store/graphql-git/graphql-git.api";

const RepoSearch = memo(() => {
    const graphqlGit = useMySelector((state) => state["graphql-git"]);
    const {urlParams} = useLinkParams();
    const { isFetching, data } = useGetViewerReposQuery({
        first: 10
    }, { skip: !!urlParams.q })
    const {setGraphGitData} = useActions();

    useEffect(() => {
        if (data && !urlParams.q) {
            setGraphGitData({
                page: 1,
                totalPages: Math.ceil(data.totalCount / 10),
                items: data.edges
            })
        }
    }, [data, urlParams])

    return (
        <div className={[css.container, (graphqlGit.fetching || isFetching) ? css.fetching : ''].join(' ')}>
            {
                graphqlGit.items.length ?
                    graphqlGit.items.map((item) => {
                        return <RepoListItem key={item.cursor} {...item.node}/>
                    })
                    : <LoadStatus loading={graphqlGit.fetching || isFetching}/>
            }
        </div>
    );
});

export default RepoSearch;