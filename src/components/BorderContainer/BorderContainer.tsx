import React from 'react';
import css from './BorderContainer.module.scss';

export interface IBorderContainer {
    children: any,
    className?: string
}

const BorderContainer = (props: IBorderContainer) => {
    return (
        <div className={[css.container, props.className ?? ''].join(' ')}>
            { props.children }
        </div>
    );
};

export default BorderContainer;