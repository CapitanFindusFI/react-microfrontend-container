import React, {useEffect, useState} from 'react';
import {History, createBrowserHistory} from 'history';
import {MicroApp} from './types';
import MicroappContainer from './components/microapp-container';

const useAppManifest = (path = 'manifest.json'): [MicroApp[], boolean] => {
    const [microapps, setMicroapps] = useState<MicroApp[]>([]);
    const [loadError, setLoadError] = useState<boolean>(false);

    useEffect(() => {
        fetch(path, {
            method: 'GET',
            mode: 'no-cors',
        })
            .then((res) => res.json())
            .then((apps: MicroApp[]) => {
                setMicroapps(apps);
            })
            .catch((err: any) => {
                console.error(err);
                setLoadError(true);
            });
    }, [path]);

    return [microapps, loadError];
};

type PropsType = {
    history: History;
};

const App: React.FC<PropsType> = ({
    history = createBrowserHistory(),
}: PropsType) => {
    const [microapps, loadError] = useAppManifest();

    return loadError ? (
        <h1>Unable to load</h1>
    ) : (
        <main>
            <header>Container</header>
            <div>
                {microapps.map((item: MicroApp, index: number) => (
                    <MicroappContainer
                        history={history}
                        app={item}
                        key={index}
                    />
                ))}
            </div>
        </main>
    );
};

export default App;
