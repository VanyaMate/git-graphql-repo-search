import {useLocation} from "react-router-dom";
import {useMemo} from "react";

export type getParams = { [key: string]: string };

const parseGetParams = function (link: string): getParams {
    const params: getParams = {};
    const validLink = link[0] === '?' ? link.replace('?', '') : link;
    const listOfParams: string[] = validLink.split('&');

    if (validLink.length) {
        listOfParams.forEach((param) => {
            const [key, value] = param.split('=');
            params[key] = value;
        })
    }

    return params;
}

export const useLinkParams = function () {
    const location = useLocation();
    const urlParams: getParams = useMemo(() => parseGetParams(decodeURI(location.search)), [location]);

    return { location, urlParams };
}