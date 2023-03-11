import React, {memo, useEffect, useMemo} from 'react';
import {useActions, useMySelector} from "../../hooks/reduxHooks";
import RepoListItem from "../../components/RepoItem/RepoListItem";
import css from './RepoSearch.module.scss';
import {useLinkParams} from "../../hooks/useLinkParams";
import LoadStatus from "../../components/LoadStatus/LoadStatus";
import {useGetViewerReposQuery, useLazyGetReposCursorQuery} from "../../store/graphql-git/graphql-git.api";
import Paginator from "../../components/Paginator/Paginator";
import {useNavigate} from "react-router-dom";
import {getQueryLink} from "../../helpers/helpers";
import {useCursorGetter} from "../../hooks/useCursorGetter";

const RepoSearch = memo(() => {
    const graphqlGit = useMySelector((state) => state["graphql-git"]);
    const {urlParams} = useLinkParams();
    const {result, fetching} = useCursorGetter(urlParams.q, +urlParams.p - 1);
    const { isFetching, data } = useGetViewerReposQuery({
        first: 10,
        after: result
    }, { skip: !!urlParams.q || fetching })
    const {setGraphGitData} = useActions();
    const navigate = useNavigate();

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
        <div className={[css.container, (graphqlGit.fetching || isFetching || fetching) ? css.fetching : ''].join(' ')}>
            {
                graphqlGit.items.length ?
                    graphqlGit.items.map((item) => {
                        return <RepoListItem key={item.cursor} {...item.node}/>
                    })
                    : <LoadStatus loading={graphqlGit.fetching || isFetching || fetching}/>
            }
            {
                graphqlGit.totalPages > 1 ? <Paginator
                    pages={graphqlGit.totalPages}
                    currentPage={+urlParams.p ?? 1}
                    maxPages={10}
                    callback={(page) => {
                        navigate(getQueryLink(urlParams.q, page));
                    }}
                /> : ''
            }
        </div>
    );
});

export default RepoSearch;