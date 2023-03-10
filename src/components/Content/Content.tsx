import React from 'react';
import css from "./Content.module.scss";
import {Route, Routes} from "react-router-dom";
import RepoSearch from "../../pages/RepoSearch/RepoSearch";
import RepoInfo from "../../pages/RepoInfo/RepoInfo";
import Page404 from "../../pages/Page404/Page404";

const Content = () => {
    return (
        <div className={css.container}>
            <div className={css.content}>
                <Routes>
                    <Route path={'/'} element={<RepoSearch/>}/>
                    <Route path={'/info/:owner/:name'} element={<RepoInfo/>}/>
                    <Route path={'*'} element={<Page404/>}/>
                </Routes>
            </div>
        </div>
    );
};

export default Content;