import React from 'react';
import AppRoutes from './app-routes';
import {BrowserRouter, Link, useLocation} from 'react-router-dom';
import useAppManifest from './hooks/use-manifest';
import {MicroApp} from './types';

type HeaderPropsType = {
    apps: MicroApp[];
};

const AppHeader: React.FC<HeaderPropsType> = ({apps}) => {
    const location = useLocation();

    return (
        <header>
            <h2>Application header</h2>
            <h4>Current route: {location.pathname}</h4>
            <div>
                {apps.map((app: MicroApp, index: number) => (
                    <Link to={app.basepath} key={index}>
                        {app.name}
                    </Link>
                ))}
            </div>
        </header>
    );
};

const App: React.FC = () => {
    const [microapps, loadError] = useAppManifest();

    return loadError ? (
        <h1>Unable to load</h1>
    ) : (
        <BrowserRouter>
            <AppHeader apps={microapps} />
            <AppRoutes apps={microapps} />
        </BrowserRouter>
    );
};

export default App;
