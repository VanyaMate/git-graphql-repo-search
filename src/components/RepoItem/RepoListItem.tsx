import React, {memo} from 'react';
import css from './RepoListItem.module.scss';
import {IRepositoryItem, IRepositorySearchItem} from "../../graphql-queries/search";
import {Link} from "react-router-dom";
import MarkSpan from "../UI/Span/MarkSpan/MarkSpan";
import {getStringDate} from "../../helpers/helpers";
import ABlock from "../UI/Links/ABlock/ABlock";
import BorderContainer from "../BorderContainer/BorderContainer";

const RepoListItem = memo((props: IRepositoryItem) => {
    return (
        <BorderContainer className={css.item}>
            <Link to={`/info/${props.owner.login}/${ props.name }`} className={css.link}>{ props.name }</Link>
            <ABlock
                className={css.gitLink}
                href={props.url}
            >
                git
            </ABlock>
            <MarkSpan
                color={props.stargazerCount ? '#f72' : 'transparent'}
                before={'stars'}
                className={css.stars}
            >
                {props.stargazerCount}
            </MarkSpan>
            {
                props.defaultBranchRef ?
                    <MarkSpan
                        color={'#77f'}
                        before={'commit'}
                        className={css.commit}
                    >
                        {
                            getStringDate(new Date(props.defaultBranchRef.target.committedDate).getTime())
                        }
                    </MarkSpan>
                    : ``
            }
        </BorderContainer>
    );
});

export default RepoListItem;