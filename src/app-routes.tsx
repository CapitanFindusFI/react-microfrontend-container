import MicroappContainer from './components/microapp-container';
import React from 'react';
import {Route, Switch} from 'react-router';
import {MicroApp} from './types';

type PropsType = {
    apps: MicroApp[];
};

const AppRoutes: React.FC<PropsType> = ({apps}: PropsType) => {
    return (
        <Switch>
            {apps.map((item: MicroApp, index: number) => (
                <Route path={item.basepath} key={index}>
                    <MicroappContainer app={item} />
                </Route>
            ))}
        </Switch>
    );
};

export default AppRoutes;
