# React Microfrontend Container

### Introduction
This is a simple React project intended to be used within a microfrontend architecture; it comes with Webpack 5 and TypeScript, as well as React Router to provide navigation and to switch between different microfrontend applications.

### Project Structure
The application itself, as it's just intended as a boilerplate microfrontend container, is quite simple. The `app.tsx` bootstraps the application and creates a React Router; it will read microfrontends applications (identified by `MicroApp` TypeScript type)