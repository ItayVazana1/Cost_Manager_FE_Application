/** /src/pages/ReportPage.jsx
 * Project: Cost Manager Front End
 * File: src/pages/ReportPage.jsx
 * Description: Page wrapper for the Monthly Report. Renders a themed title and ReportPanel.
 * Updated: 2025-09-12
 */

import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ReportPanel from '../components/ReportPanel';

/** =========================================================================
 * Configurable constants
 * =======================================================================*/

const PAGE_TITLE = 'Monthly Report';
const TITLE_VARIANT = 'h2';
const ROOT_GAP = 2;

/** =========================================================================
 * Component
 * =======================================================================*/

/**
 * ReportPage
 * Renders the monthly report page with a themed title and report panel.
 * @returns {JSX.Element}
 */
export default function ReportPage() {
    const theme = useTheme();
    const accent = theme?.custom?.forms?.report?.label ?? theme.palette.primary.main;

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
            <Typography variant={TITLE_VARIANT} sx={{ color: accent }}>
                {PAGE_TITLE}
            </Typography>
            <ReportPanel />
        </Box>
    );
}
