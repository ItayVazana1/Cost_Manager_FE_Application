/** /src/app/app.jsx
 * Project: Cost Manager Front End
 * File: src/app.jsx
 * Description: Root application component with routing. Wraps all pages in Layout.
 * Updated: 2025-09-12
 */

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AddCostPage from './pages/AddCostPage';
import ReportPage from './pages/ReportPage';
import ChartsPage from './pages/ChartsPage';
import SettingsPage from './pages/SettingsPage';

/** =========================================================================
 * Component
 * =======================================================================*/

/**
 * App
 * Root application component configuring React Router routes and Layout wrapper.
 * @returns {JSX.Element}
 */
export default function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path='/' element={<HomePage />} />
                <Route path='/add' element={<AddCostPage />} />
                <Route path='/report' element={<ReportPage />} />
                <Route path='/charts' element={<ChartsPage />} />
                <Route path='/settings' element={<SettingsPage />} />
            </Route>
        </Routes>
    );
}
