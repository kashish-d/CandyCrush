import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { HashRouter } from 'react-router-dom';
import { LevelContextProvider } from './store/levelContext';

ReactDOM.render(
    <LevelContextProvider>
        <HashRouter>
            <App />
        </HashRouter>
    </LevelContextProvider>,
    document.getElementById('root')
);
