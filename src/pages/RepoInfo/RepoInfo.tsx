import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useLazyGetRepoQuery} from "../../store/graphql-git/graphql-git.api";
import {useMySelector} from "../../hooks/reduxHooks";
import {IRepositoryItem} from "../../graphql-queries/search";
import RepoCard from "../../components/RepoCard/RepoCard";
import LoadStatus from "../../components/LoadStatus/LoadStatus";

const RepoInfo = () => {
    const params = useParams<{owner: string, name: string}>();
    const [dispatchGetRepo, { isFetching, isLoading }] = useLazyGetRepoQuery();
    const graphqlGit = useMySelector((state) => state["graphql-git"]);
    const [activeRepo, setActiveRepo] = useState<IRepositoryItem>()

    useEffect(() => {
        if (params.owner && params.name) {
            const data = graphqlGit.items.filter((item) => {
                if (params.owner === item.node.owner.login && params.name === item.node.name) {
                    return true;
                }
            })[0];

            if (data) {
                setActiveRepo(data.node);
            } else {
                !isFetching && dispatchGetRepo({ owner: params.owner, name: params.name })
                    .then(({ data }) => {
                        if (data) {
                            setActiveRepo(data);
                        }
                    })
            }
        }
    }, [params])

    return (
        <div style={{color: "#fff"}}>
            {
                activeRepo ? <RepoCard data={activeRepo}/> : <LoadStatus loading={isFetching}/>
            }
        </div>
    );
};

export default RepoInfo;