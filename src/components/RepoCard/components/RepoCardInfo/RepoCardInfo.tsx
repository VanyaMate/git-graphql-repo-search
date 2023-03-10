import React, {useMemo} from 'react';
import {IRepositoryItem} from "../../../../graphql-queries/search";
import css from './RepoCardInfo.module.scss';
import AMarkBlock from "../../../UI/Links/AMarkBlock/AMarkBlock";
import MarkSpan from "../../../UI/Span/MarkSpan/MarkSpan";

const RepoCardInfo = (repo: IRepositoryItem) => {
    const languagesSize = useMemo<number>(() => {
        return 100 / repo.languages.edges.reduce((acc, item) => acc + item.size, 0)
    }, [repo]);

    return (
        <div className={css.info}>
            <div className={css.logo}>
                <img src={repo.owner.avatarUrl}/>
            </div>
            <div className={css.data}>
                <div className={css.owner}>
                    <div className={css.login}>
                        {repo.owner.login}
                    </div>
                    <AMarkBlock href={repo.owner.url}>[ git ]</AMarkBlock>
                </div>
                <div className={css.description}>
                    {repo.description}
                </div>
                <div className={css.languages}>
                    {
                        [...repo.languages.edges]
                            .sort((a, b) => b.size - a.size)
                            .map((item) => {
                                return <MarkSpan
                                    key={item.node.name}
                                    color={item.node.color}
                                    before={item.node.name}
                                >
                                    {(item.size * languagesSize).toFixed(2)} %
                                </MarkSpan>
                            })
                    }
                </div>
            </div>
        </div>
    );
};

export default RepoCardInfo;