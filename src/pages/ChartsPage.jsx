/** /src/pages/ChartsPage.jsx
 * Project: Cost Manager Front End
 * File: src/pages/ChartsPage.jsx
 * Description: Page wrapper that displays the ChartsPanel with a styled title.
 * Updated: 2025-09-12
 */

import React from 'react';
import { Box, Typography } from '@mui/material';
import ChartsPanel from '../components/ChartsPanel';

/** =========================================================================
 * Configurable constants
 * =======================================================================*/

const PAGE_TITLE = 'Charts';
const TITLE_VARIANT = 'h2';
const TITLE_COLOR = '#eaa2b9';
const ROOT_MAX_WIDTH = 1280;
const ROOT_GAP = 2;
const ROOT_PADDING_TOP = 4;

/** =========================================================================
 * Component
 * =======================================================================*/

/**
 * ChartsPage
 * Renders the charts page with a title and ChartsPanel.
 * @returns {JSX.Element}
 */
export default function ChartsPage() {
    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: ROOT_GAP,
                alignItems: 'center',
                maxWidth: ROOT_MAX_WIDTH,
                mx: 'auto',
                pt: ROOT_PADDING_TOP
            }}
        >
            <Typography variant={TITLE_VARIANT} sx={{ color: TITLE_COLOR }}>
                {PAGE_TITLE}
            </Typography>
            <ChartsPanel />
        </Box>
    );
}
