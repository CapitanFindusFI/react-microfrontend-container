import React from 'react';
import {createBrowserHistory} from 'history';
import useMicroapps from './hooks/use-microapp';
import {MicroApp} from './types';
import MicroappContainer from './components/microapp-container';

const history = createBrowserHistory();

const App: React.FC = () => {
    const [microapps, loadError] = useMicroapps();

    return loadError ? (
        <h1>Unable to load</h1>
    ) : (
        <div>
            <header>Container</header>
            <main>
                {microapps.map((item: MicroApp, index: number) => (
                    <MicroappContainer
                        history={history}
                        app={item}
                        key={index}
                    />
                ))}
            </main>
        </div>
    );
};

export default App;
