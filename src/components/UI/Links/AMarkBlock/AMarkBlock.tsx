import React from 'react';
import ABlock, {IABlock} from "../ABlock/ABlock";
import css from './AMarkBlock.module.scss';

export interface IAMarkBlock extends IABlock {
    color?: string
}

const AMarkBlock = (props: IAMarkBlock) => {
    const {className, children, color, ...other} = props;

    return (
        <ABlock className={css.mark} {...other} style={{ background: color ?? '#111'}}>
            { children }
        </ABlock>
    );
};

export default AMarkBlock;