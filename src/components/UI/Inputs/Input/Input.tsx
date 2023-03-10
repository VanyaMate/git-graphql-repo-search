import React, {memo, useState} from 'react';
import {IUseInputValue} from "../../../../hooks/useInputValue";
import css from './Input.module.scss';

export interface IInput {
    hook: IUseInputValue,
    className?: string,
    type?: string,
    placeholder?: string,
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void,
    icon?: any
}

const Input = memo((props: IInput ) => {
    const [focus, setFocus] = useState<boolean>(false);

    return (
        <div
            className={[
                css.inputContainer,
                props.hook.valid ? '' : css.invalid,
                props.icon ? css.iconPadding : '',
                focus ? css.focus : '',
                props.className ?? ''
            ].join(' ')}
        >
            {
                props.icon ? <img className={css.icon} src={props.icon} alt={''}/> : ''
            }
            <input
                type={props.type ?? 'text'}
                value={props.hook.value}
                placeholder={props.placeholder ?? ''}
                className={css.input}
                onChange={(e) => props.hook.onChange(e.target.value)}
                onKeyDown={(e) => props.onKeyDown && props.onKeyDown(e)}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
            />
        </div>
    );
});

export default Input;