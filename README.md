# React Microfrontend Container

### Introduction
This is a simple React project intended to be used within a microfrontend architecture; it comes with Webpack 5 and TypeScript, as well as React Router to provide navigation and to switch between different microfrontend applications.

#### Important notice
Both this project and the [single app](https://github.com/CapitanFindusFI/react-microfrontend-app) are based on using the `window` object with a defined custom property, named `microapps`.  

These have to be considered as following:
- `single app` exposes its React mount and unmount hooks on a `window.microapp.tmp` property;
- `container app` handles `window.microapp.tmp` (if available) and uses it to sideload multiple `single app`.

### Project Structure
The application itself, as it's just intended as a boilerplate microfrontend container, is quite simple. The `app.tsx` bootstraps the application and creates a React Router; it will read microfrontends applications (identified by `MicroApp` TypeScript type) and create a base route for each one inside `app-routes.tsx` file;

#### The `MicroApp` type
A `MicroApp` comes as following:
```
type MicroApp = {
    name: string;
    host: string;
    basepath?: string;
    mount: (container: string, history: History, basepath?: string) => void;
    unmount: (container: string) => void;
};
```

described as following:
- `name` is an identifier name, which will be used for the `<script/>` tag ID and the microfrontend ReactDOM root element ID;
- `host` is the HTTP url in which the `.js` file is located;
- `basepath` is the main React router basepath for this microfrontend;
- `mount` (defaults to `mountApplication`) is the exposed function name to be called when creating the microfrontend, which will take care of mounting react application (passing `basepath` will ensure its routes will be correct);
- `unmount` (defaults to `unmountApplication`) is the exposed function name to be called when unmounting the microfrontend.

#### Loading a MicroApp
The `useManifest` hook will create both `<div>` and `<script>` tags which ID will be named after the `MicroApp.name` property; the hook will search for `window.microapp.tmp`, which will be copied in a specific property named as the `microapp.name` property. The hook will be now set and the `<MicroappContainer>` will be now ready to serve a specific microfrontend application.  

### The rendering process
Following here the process flow:
- `app.tsx` will read the manifest file (`manifest.json` by default, but can be everything) and load `MicroApp` objects;
- `app-routes.tsx` will create a single `<Route>` for each `MicroApp`, rendering a `<MicroappContainer>` with the microfrontend specifics;
- `<MicroappContainer>` will use the `useMicroapp` hook;
- - `useMicroapp` will create the microfrontend ReactDOM root element and `<script>`;
- - will create a `window.microapps[microapp.name]` by copying `window.microapps.tmp` (and unsetting it);
- `<MicroappContainer>` will finally call the `mountApplication` (described before) and the microfrontend will be up and running.

## [As this project is in an early stage, every idea or help is much appreciated!](https://sentitilibero.com)