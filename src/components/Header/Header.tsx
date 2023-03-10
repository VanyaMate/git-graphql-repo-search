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
import {useActions} from "../../hooks/reduxHooks";

const Header = () => {
    const {location, urlParams} = useLinkParams();
    const input = useInputValue(urlParams.q ?? '');
    const navigate = useNavigate();
    const debounce = useDebounce(input.value, 500);
    const [dispatchSearch, { isFetching }] = useLazyGetReposDataQuery();
    const {setGraphGitData, setFetching} = useActions();
    const [fillInput, setFillInput] = useState(!!input.value);

    useEffect(() => {
        setFetching(isFetching);
    }, [isFetching])

    useEffect(() => {
        if (debounce !== '') {
            makeQuery(debounce as string);
        }
    }, [debounce])

    // Нужно для заполнения строки после возвращения назад, если она пустая, а q= не пустой. Заполняется 1 раз.
    useEffect(() => {
        if (urlParams.q && !fillInput) {
            input.onChange(urlParams.q);
            setFillInput(true);
        }
    }, [urlParams])

    const getQueryLink = (value: string) => value ? `/?q=${value}` : '/';

    const makeQuery = function (value: string) {
        if (isFetching) return;

        navigate(getQueryLink(value));

        if (value.length === 0) return;
        dispatchSearch({
            search: value,
            first: 10
        })
            .then(({ data }) => {
                data && setGraphGitData({
                    page: 1,
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
                    icon={'http://localhost:5173/src/assets/icons/search-bar.png'}
                    onKeyDown={(e) =>
                        e.key === 'Enter' && makeQuery(input.value)
                    }
                />
            </div>
        </div>
    );
};

export default Header;