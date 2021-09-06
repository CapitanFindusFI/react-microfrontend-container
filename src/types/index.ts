import {History} from 'history';

export type MicroApp = {
    name: string;
    host: string;
    basepath?: string;
    mount: (container: string, history: History) => void;
    unmount: (container: string) => void;
};
