import React, {useMemo} from 'react';
import {IRepositoryItem} from "../../graphql-queries/search";
import css from './RepoCard.module.scss';
import BorderContainer from "../BorderContainer/BorderContainer";
import RepoCardHeader from "./components/RepoCardHeader/RepoCardHeader";
import RepoCardInfo from "./components/RepoCardInfo/RepoCardInfo";

export interface IRepoCard {
    data: IRepositoryItem
}

const RepoCard = (props: IRepoCard) => {
    const repo = useMemo(() => {
        return props.data;
    }, [props])

    return (
        <BorderContainer className={css.card}>
            <RepoCardHeader {...repo}/>
            <RepoCardInfo {...repo}/>
        </BorderContainer>
    );
};

export default RepoCard;