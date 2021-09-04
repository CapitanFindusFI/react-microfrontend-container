import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom';
import App from './app';

const mountApplication = (
    containerId = 'react-app',
): void => {
    ReactDOM.render(
        <StrictMode>
            <App />
        </StrictMode>,
        document.getElementById(containerId),
    );
};

const unmountApplication = (containerId: string): void => {
    ReactDOM.unmountComponentAtNode(document.getElementById(containerId));
};

mountApplication();
