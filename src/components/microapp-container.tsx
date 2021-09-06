import React, {useEffect} from 'react';
import {History} from 'history';
import {MicroApp} from '../types';
import useMicroapp from '../hooks/use-microapp';

type PropsType = {
    history: History;
    app: MicroApp;
};

const MicroappContainer: React.FC<PropsType> = (props: PropsType) => {
    const {history, app} = props;
    const {name, host} = app;

    const [microApp, containerId] = useMicroapp({name, host});

    useEffect(() => {
        if (!microApp) {
            return null;
        }
        microApp.mount(containerId, history);
    });

    return <div id={containerId} />;
};

export default MicroappContainer;
