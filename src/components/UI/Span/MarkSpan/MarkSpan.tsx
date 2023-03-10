import React, {memo} from 'react';
import css from './MarkSpan.module.scss';

export interface IMarkSpan {
    color?: string,
    before?: string,
    children: any,
    className?: string
}

const MarkSpan = memo((props: IMarkSpan) => {
    return (
        <span
            className={[css.markItem, props.className ?? ''].join(' ')}
            style={{ border: `1px solid ${props.color ?? '#333'}` }}
        >
            {
                props.before ? <span className={css.before}>{ props.before }</span> : ''
            }
            <span className={css.mark}>{ props.children }</span>
        </span>
    );
});

export default MarkSpan;