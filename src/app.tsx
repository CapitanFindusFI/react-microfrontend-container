import React from 'react';
import { createBrowserHistory } from 'history';
import useMicroapps from './hooks/use-microapp';

const history = createBrowserHistory()

type PropsType = {}

const App: React.FC<PropsType> = (props: PropsType) => {
    const microapps = useMicroapps();

    return (
        <div>
            <header>Container</header>
            <main id="microapp-container"></main>
        </div>
    )
};

export default App;
