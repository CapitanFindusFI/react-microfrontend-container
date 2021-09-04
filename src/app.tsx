import React from 'react';
import {History} from 'history';

type PropsType = {
    history: History;
};

const App: React.FC<PropsType> = (props: PropsType) => {
    return <h1>Boilerplate running!</h1>;
};

export default App;
