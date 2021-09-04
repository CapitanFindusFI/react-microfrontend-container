import {useEffect} from 'react';
import {useState} from 'react';
import {MicroApp} from './../types/microapp';

const useMicroapps = (manifest: string = 'manifest.json'): MicroApp[] => {
    const [microapps, setMicroapps] = useState<MicroApp[]>([]);

    useEffect(() => {
        fetch(manifest, {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((response: MicroApp[]) => {
                setMicroapps(response)
            });
    }, [manifest]);

    return microapps;
};

export default useMicroapps;
