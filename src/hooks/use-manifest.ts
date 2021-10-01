import {useState, useEffect} from 'react';
import {MicroApp} from '../types';

const useAppManifest = (
    path = 'manifest.json',
    options: RequestInit = {method: 'GET', mode: 'no-cors'},
): [MicroApp[], boolean] => {
    const [microapps, setMicroapps] = useState<MicroApp[]>([]);
    const [loadError, setLoadError] = useState<boolean>(false);

    useEffect(() => {
        fetch(path, options)
            .then((res) => res.json())
            .then((apps: MicroApp[]) => {
                setMicroapps(apps);
            })
            .catch((err: unknown) => {
                console.error(err);
                setLoadError(true);
            });
    }, [path]);

    return [microapps, loadError];
};

export default useAppManifest;
