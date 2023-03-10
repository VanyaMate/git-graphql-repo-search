import React, {useState} from 'react';
import {useMySelector} from "../../hooks/reduxHooks";
import RepoListItem from "../../components/RepoItem/RepoListItem";
import css from './RepoSearch.module.scss';
import {useLinkParams} from "../../hooks/useLinkParams";
import LoadStatus from "../../components/LoadStatus/LoadStatus";

const RepoSearch = () => {
    const graphqlGit = useMySelector((state) => state["graphql-git"]);
    const {getPrams} = useLinkParams();

    return (
        <div className={[css.container, graphqlGit.fetching ? css.fetching : ''].join(' ')}>
            {
                graphqlGit.items.length ?
                    graphqlGit.items.map((item) => {
                        return <RepoListItem key={item.cursor} {...item.node}/>
                    })
                    : getPrams.q ? <LoadStatus loading={graphqlGit.fetching}/> : ''
            }
        </div>
    );
};

export default RepoSearch;