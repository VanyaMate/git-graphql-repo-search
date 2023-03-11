import React, {memo, useMemo} from 'react';
import css from './Paginator.module.scss';
import PaginationItem from "./PaginatorItem/PaginationItem";
import PaginationEmpty from "./PaginatorEmptyItem/PaginationEmpty";

export interface IPaginator {
    pages: number,
    currentPage: number,
    maxPages: number,
    callback: (p: number) => void
}

const Paginator = memo((props: IPaginator) => {
    const items = useMemo(() => {
        const listOfItems: number[] = new Array(props.pages);
        const currentPageIndex = props.currentPage - 1;
        const lastPageIndex = props.pages - 1;

        listOfItems[0] = 1;
        listOfItems[currentPageIndex] = props.currentPage;
        listOfItems[lastPageIndex] = props.pages;

        for (let i = 1, j = 0; j < props.maxPages - (currentPageIndex === 0 ? 3 : 4); i++) {
            let changed = false;
            if (currentPageIndex + i < lastPageIndex) {
                listOfItems[currentPageIndex + i] = props.currentPage + i;
                j++;
                changed = true;
            }

            if (currentPageIndex - i > 0) {
                listOfItems[currentPageIndex - i] = props.currentPage - i;
                j++;
                changed = true;
            }

            if (!changed) {
                break;
            }
        }

        if (listOfItems[0] + 1 !== listOfItems[1]) {
            listOfItems[1] = 0;
        }
        if (listOfItems[lastPageIndex] - 1 !== listOfItems[lastPageIndex - 1]) {
            listOfItems[lastPageIndex - 1] = 0;
        }

        return listOfItems;
    }, [props]);

    return (
        <div className={css.paginator}>
            <div className={css.items}>
                {
                    items.map((item, index) => {
                        return item ? <PaginationItem
                            key={index}
                            value={item}
                            callback={props.callback}
                            active={item !== props.currentPage}
                        /> : <PaginationEmpty key={index}/>
                    })
                }
            </div>
        </div>
    );
});

export default Paginator;