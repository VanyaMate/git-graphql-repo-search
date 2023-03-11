import React from 'react';
import Button from "../../UI/Buttons/Button/Button";
import css from './PaginationItem.module.scss';

export interface IPaginationItem {
    value: number,
    callback: (v: number) => void,
    active: boolean,
}

const PaginationItem = (props: IPaginationItem) => {
    return (
        <Button
            className={css.button}
            active={props.active}
            onClick={() => props.callback(props.value)}
        >
            { props.value }
        </Button>
    );
};

export default PaginationItem;