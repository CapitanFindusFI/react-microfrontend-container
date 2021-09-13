import {MicroApp} from './../types/index';
import {useState, useEffect} from 'react';

type HookReturnType = [MicroApp, string];

type HookParamsType = {
    host: string;
    name: string;
};

const useMicroapp = ({host, name}: HookParamsType): HookReturnType => {
    const [microApp, setMicroApp] = useState<MicroApp>(null);

    const scriptTagId = `microapp-${name}-handle`;
    const entrypointTagId = `microapp-${name}-entrypoint`;

    useEffect(() => {
        const setupApplication = () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const _window = window as any;
            if (!_window.microapps) {
                console.log('There are no microapps to be loaded');
            } else {
                const _app = _window.microapps[name];
                if (_app) {
                    setMicroApp(_app);
                } else {
                    const _tmp = _window.microapps.tmp;
                    if (_tmp) {
                        _window.microapps[name] = _tmp;
                        delete _window.microapps.tmp;

                        const loadingApp = _window.microapps[name];
                        setMicroApp(loadingApp);
                    }
                }
            }
        };

        if (document.getElementById(scriptTagId)) {
            setupApplication();
            return;
        }

        const scriptTag = document.createElement('script');
        scriptTag.id = scriptTagId;
        scriptTag.src = `${host}/build.js`;
        scriptTag.type = 'application/javascript';
        scriptTag.onload = () => {
            setupApplication();
        };

        document.body.appendChild(scriptTag);
    }, [host, name, scriptTagId]);

    return [microApp, entrypointTagId];
};

export default useMicroapp;
