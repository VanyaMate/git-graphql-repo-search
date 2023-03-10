import React from 'react';
import css from "./LoadStatus.module.scss";

const LoadStatus = (props: { loading: boolean }) => {
    return (
        <h2 className={[css.noResultTitle, props.loading ? css.loading : ''].join(' ')}>
            {
                props.loading ?
                    <>Грузим <b>‿︵‿ヽ(°□° )ノ︵‿︵</b></> :
                    <>Ничего не найдено <b>¯\_(ツ)_/¯</b></>
            }
        </h2>
    );
};

export default LoadStatus;