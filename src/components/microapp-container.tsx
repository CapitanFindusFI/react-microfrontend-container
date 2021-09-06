import React, {useEffect} from 'react';
import {History} from 'history';
import {MicroApp} from '../types';

type PropsType = {
    history: History;
    app: MicroApp;
};

const MicroappContainer: React.FC<PropsType> = (props: PropsType) => {
    const {history, app} = props;
    const {name, host} = app;

    const scriptUrl = `${host}/build.js`;
    const scriptTagId = `microapp-${name}-handle`;
    const entrypointTagId = `microapp-${name}-entrypoint`;

    const onAppLoaded = () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const _window = window as any;
        if (!_window.microapps) {
            throw new Error('No microapps loaded');
        }

        const _tmp = _window.microapps.tmp;
        if (_tmp) {
            _window.microapps[name] = _tmp;
            delete _window.microapps.tmp;

            const loadingApp = _window.microapps[name];
            loadingApp.mount(entrypointTagId, history);
        }
    };

    useEffect(() => {
        const scriptTag = document.getElementById(scriptTagId);
        if (scriptTag) {
            onAppLoaded();
        } else {
            const tag = document.createElement('script');
            tag.src = `${host}/build.js`;
            tag.id = scriptTagId;
            tag.type = 'application/javascript';
            tag.src = scriptUrl;
            tag.onload = () => {
                onAppLoaded();
            };

            document.body.appendChild(tag);
        }
    }, []);

    return <div id={entrypointTagId}></div>;
};

export default MicroappContainer;
