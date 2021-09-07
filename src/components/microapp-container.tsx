import React, {useLayoutEffect} from 'react';
import {MicroApp} from '../types';
import useMicroapp from '../hooks/use-microapp';
import {RouteComponentProps, withRouter} from 'react-router';

type PropsType = RouteComponentProps & {
    app: MicroApp;
};

const MicroappContainer: React.FC<PropsType> = ({history, app}: PropsType) => {
    const {name, host, basepath} = app;

    const [microApp, containerId] = useMicroapp({name, host});

    useLayoutEffect(() => {
        if (microApp) {
            microApp.mount(containerId, history, basepath);
        }

        return () => {
            if (microApp) {
                microApp.unmount(containerId);
            }
        };
    });

    return <div id={containerId} />;
};

export default withRouter<PropsType, React.FC<PropsType>>(MicroappContainer);
