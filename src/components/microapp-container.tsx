import React, {useEffect, useState} from 'react';
import {History} from 'history';
import {MicroApp} from '../types';

type PropsType = {
    history: History;
    app: MicroApp;
};

const MicroappContainer: React.FC<PropsType> = (props: PropsType) => {
    const [isMounted, setIsMounted] = useState<boolean>(false);

    const {history, app} = props;
    const {name, host, mount, unmount} = app;

    const scriptUrl = `${host}/build.js`;
    const scriptTagId = `microapp-${name}-handle`;
    const entrypointTagId = `microapp-${name}-entrypoint`;

    useEffect(() => {
        const scriptTag = document.getElementById(scriptTagId);
        if (scriptTag) {
            setIsMounted(true);
        } else {
            const tag = document.createElement('script');
            tag.src = `${host}/build.js`;
            tag.id = scriptTagId;
            tag.type = 'application/javascript';
            tag.src = scriptUrl;
            tag.onload = () => {
                setIsMounted(true);
                mount(entrypointTagId, history);
                console.log((window as any).microapps);
            }

            document.body.appendChild(tag);
        }
    }, []);

    return !isMounted ? <h2>Loading</h2> : <div id={entrypointTagId}></div>;
};

export default MicroappContainer;
