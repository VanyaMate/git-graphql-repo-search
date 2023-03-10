import React from 'react';
import css from './ABlock.module.scss';

export interface IABlock {
    href: string,
    className?: string,
    children: string,
    target?: string,
    style?: any
}

const ABlock = (props: IABlock) => {
    const { target, className, children, ...other } = props;

    return (
        <a
            target={target ?? '_blank'}
            className={[css.link, className ?? ''].join(' ')}
            {...other}
        >
            { children }
        </a>
    );
};

export default ABlock;