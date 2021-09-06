import React from 'react';
import AppRoutes from './app-routes';
import {BrowserRouter, useHistory} from 'react-router-dom';
import useAppManifest from './hooks/use-manifest';

const AppHeader: React.FC = () => {
    const history = useHistory();

    const _window = window as any;
    _window.microapps = _window.microapps || {};
    _window.microapps.history = history;

    return (
        <header>
            <h2>Application header</h2>
            <h4>Current route: {history.location.pathname}</h4>
        </header>
    );
};

const App: React.FC = () => {
    const [microapps, loadError] = useAppManifest();

    return loadError ? (
        <h1>Unable to load</h1>
    ) : (
        <BrowserRouter>
            <AppHeader />
            <AppRoutes apps={microapps} />
        </BrowserRouter>
    );
};

export default App;
