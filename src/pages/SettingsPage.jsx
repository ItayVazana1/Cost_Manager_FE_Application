/** /src/pages/SettingsPage.jsx
 * Project: Cost Manager Front End
 * File: src/pages/SettingsPage.jsx
 * Description: Page wrapper for Settings. Renders a themed title and SettingsPanel.
 * Updated: 2025-09-12
 */

import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SettingsPanel from '../components/SettingsPanel';

/** =========================================================================
 * Configurable constants
 * =======================================================================*/

const PAGE_TITLE = 'Settings';
const TITLE_VARIANT = 'h1';
const ROOT_GAP = 2;

/** =========================================================================
 * Component
 * =======================================================================*/

/**
 * SettingsPage
 * Renders the settings page with a themed title and settings panel.
 * @returns {JSX.Element}
 */
export default function SettingsPage() {
    const theme = useTheme();
    const color = theme.custom.forms.settings.label;

    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: ROOT_GAP,
                alignItems: 'center'
            }}
        >
            <Typography variant={TITLE_VARIANT} sx={{ color }}>
                {PAGE_TITLE}
            </Typography>
            <SettingsPanel />
        </Box>
    );
}
