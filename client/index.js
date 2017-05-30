/* 
    ./client/index.js
*/
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import {BrowserRouter} from "react-router-dom"

/*
    E' l'entry point della nostra web app, sostanzialmente il rendering delle routes avverrà nel componente app.
 */
ReactDOM.render((
    <BrowserRouter>
            <App />
    </BrowserRouter>
), document.getElementById('root'));