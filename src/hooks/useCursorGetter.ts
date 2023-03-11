import {useLazyGetReposCursorQuery} from "../store/graphql-git/graphql-git.api";
import {useCallback, useEffect, useMemo, useState} from "react";

// Ну и жесть...
export const useCursorGetter = function (search: string, pages: number, after?: string) {
    const [dispatchRepoCursorAfter] = useLazyGetReposCursorQuery();
    const [result, setResult] = useState<string>('');
    const [fetching, setFetching] = useState<boolean>(true);

    const getRepoCursorSkipPage = async function (search: string, pages: number, after?: string): Promise<void> {
        if (!pages) {
            setResult('');
            setFetching(false);
            return;
        }

        setFetching(true);
        const first = pages > 10 ? 100 : pages * 10;
        const skipPages = pages - first / 10;

        const { data } = await dispatchRepoCursorAfter({
            search, after, first
        });

        if (skipPages !== 0 && data) {
            getRepoCursorSkipPage(search, skipPages, data.pageInfo.endCursor).then();
            return;
        }

        setResult(data?.pageInfo.endCursor || '');
        setFetching(false);
    }

    useMemo(() => {
        getRepoCursorSkipPage(search, pages, after).then();
    }, [search, pages, after])

    return {result, fetching};
}