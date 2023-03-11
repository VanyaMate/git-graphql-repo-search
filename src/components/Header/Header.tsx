import React, {useEffect, useState} from 'react';
import {
    Link,
    useNavigate,
} from "react-router-dom";
import css from './Header.module.scss';
import {useInputValue} from "../../hooks/useInputValue";
import Input from "../UI/Inputs/Input/Input";
import Button from "../UI/Buttons/Button/Button";
import {useLinkParams} from "../../hooks/useLinkParams";
import {useDebounce} from "../../hooks/useDebounce";
import {useLazyGetReposDataQuery} from "../../store/graphql-git/graphql-git.api";
import {useActions, useMySelector} from "../../hooks/reduxHooks";
import {getQueryLink} from "../../helpers/helpers";
import {useCursorGetter} from "../../hooks/useCursorGetter";

const Header = () => {
    const {location, urlParams} = useLinkParams();
    const input = useInputValue(urlParams.q ?? '');
    const navigate = useNavigate();
    const debounce = useDebounce(input.value, 500);
    const [dispatchSearch, { isFetching }] = useLazyGetReposDataQuery();
    const {setGraphGitData, setFetching} = useActions();
    const [firstLoad, setFirstLoad] = useState(true);
    const {result, fetching} = useCursorGetter(urlParams.q, +urlParams.p - 1);
    const graphqlStore = useMySelector((state) => state["graphql-git"])

    useEffect(() => {
        setFetching(isFetching);
    }, [isFetching])

    useEffect(() => {
        if (debounce !== '' && !fetching) {
            makeQuery(debounce as string, firstLoad && urlParams.p ? +urlParams.p : 1);
        }
        setFirstLoad(false);
    }, [debounce])

    useEffect(() => {
        if (urlParams.q) {
            input.onChange(urlParams.q);
        }
        if (!fetching && urlParams.p && graphqlStore.page !== +urlParams.p) {
            makeQuery(input.value, +urlParams.p, result);
        }
    }, [urlParams, fetching])

    const makeQuery = function (value: string, page?: number, after?: string) {
        if (+urlParams.p !== page || urlParams.q !== value) {
            navigate(getQueryLink(value, page ?? 1));
        }

        if (value.length === 0) return;
        dispatchSearch({
            search: value,
            first: 10,
            after
        })
            .then(({ data }) => {
                data && setGraphGitData({
                    page: page ?? 1,
                    totalPages: Math.ceil(data.repositoryCount / 10),
                    items: data.edges
                });
            });
    }

    return (
        <div className={css.header}>
            <div className={css.content}>
                <Button
                    active
                    className={[css.backButton, css.link, location.pathname === '/' ? css.hidden : ''].join(' ')}
                    onClick={() => {
                        history.back();
                    }}
                >
                    Назад
                </Button>
                <Input
                    hook={input}
                    className={css.input}
                    placeholder={'Поиск'}
                    icon={'https://psv4.userapi.com/c235131/u290042690/docs/d21/a758e4c1a325/search-bar.png?extra=cHirmHIs-lOGn9bbVudhIqlDtwm3sn2Yzt30qDq0EXbjAgm2yGsCvN5_YHOvWrarLfuBW62lkJwrpa0D7QSza4iZme7BBFZdhGiE7-XU8Q24VzVHM_WinlcF2umBADNBvjMBl6JRasw-xszP29Nizfxo7UA'}
                    onKeyDown={(e) =>
                        e.key === 'Enter' && makeQuery(input.value)
                    }
                />
            </div>
        </div>
    );
};

export default Header;