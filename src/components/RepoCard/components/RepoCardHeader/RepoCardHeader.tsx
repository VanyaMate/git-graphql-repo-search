import React, {useMemo} from 'react';
import css from "./RepoCardHeader.module.scss";
import MarkSpan from "../../../UI/Span/MarkSpan/MarkSpan";
import {getStringDate} from "../../../../helpers/helpers";
import {IRepositoryItem} from "../../../../graphql-queries/search";
import AMarkBlock from "../../../UI/Links/AMarkBlock/AMarkBlock";

const RepoCardHeader = (repo: IRepositoryItem) => {
    return (
        <div className={css.header}>
            <div className={css.title}>
                <div className={css.name}>{repo.name}</div>
                <AMarkBlock
                    href={repo.url}
                >
                    [ git ]
                </AMarkBlock>
            </div>
            <div className={css.marks}>
                <MarkSpan
                    color={repo.stargazerCount ? '#f72' : 'transparent'}
                    before={'stars'}
                    className={css.stars}
                >
                    {repo.stargazerCount}
                </MarkSpan>
                {
                    repo.defaultBranchRef ?
                        <MarkSpan
                            color={'#77f'}
                            before={'commit'}
                            className={css.commit}
                        >
                            {
                                getStringDate(new Date(repo.defaultBranchRef.target.committedDate).getTime())
                            }
                        </MarkSpan>
                        : ``
                }
            </div>
        </div>
    );
};

export default RepoCardHeader;