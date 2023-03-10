import React, {memo} from 'react';
import css from './Button.module.scss';

export interface IButton {
    children: any,
    onClick?: () => void
    className?: string
    active?: boolean
}

const Button = memo((props: IButton) => {
    return (
        <div
            className={[
                css.button,
                props.active ? css.active : '',
                props.className ?? ''
            ].join(' ')}
            onClick={props.onClick}
        >
            { props.children }
        </div>
    );
});

export default Button;