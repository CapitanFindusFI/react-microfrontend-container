import {History} from "history";

export type MicroApp = {
    name: string,
    host: string,
    mount: (container: string, history: History) => void
    unmount: (container: string) => void
}