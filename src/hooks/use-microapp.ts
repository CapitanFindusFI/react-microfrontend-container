import {useEffect} from 'react';
import {useState} from 'react';
import {MicroApp} from '../types';

type HookReturnType = [MicroApp[], boolean];

const useMicroapps = (manifest = 'manifest.json'): HookReturnType => {
    const [microapps, setMicroapps] = useState<MicroApp[]>([]);
    const [hasError, setHasError] = useState<boolean>(false);

    useEffect(() => {
        fetch(manifest, {method: 'GET'})
            .then((res) => res.json())
            .then((response: MicroApp[]) => {
                setMicroapps(response);
            })
            .catch((error: any) => {
                setHasError(true);
            });
    }, [manifest]);

    return [microapps, hasError];
};

export default useMicroapps;
