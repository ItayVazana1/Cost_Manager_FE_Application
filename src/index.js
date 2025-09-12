/** /src/index.js
 * Project: Cost Manager Front End
 * File: src/index.js
 * Description: Application entry point. Renders App inside BrowserRouter with MUI ThemeProvider and CssBaseline.
 * Updated: 2025-09-12
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import appTheme from './theme';

/** =========================================================================
 * Bootstrap
 * =======================================================================*/

/**
 * Entry point of the application.
 * Renders the root React component inside the DOM element with id="root".
 */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={appTheme}>
                <CssBaseline />
                <App />
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>
);
