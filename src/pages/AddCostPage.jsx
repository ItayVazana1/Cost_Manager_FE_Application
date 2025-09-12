/** /src/pages/AddCostPage.jsx
 * Project: Cost Manager Front End
 * File: src/pages/AddCostPage.jsx
 * Description: Page wrapper that renders the AddCostForm with themed heading.
 * Updated: 2025-09-12
 */

import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AddCostForm from '../components/AddCostForm';

/** =========================================================================
 * Configurable constants
 * =======================================================================*/

const PAGE_TITLE = 'Add a New Cost';
const ROOT_GAP = 1;
const TITLE_VARIANT = 'h1';
const TITLE_FONT_WEIGHT = 700;
const TITLE_LETTER_SPACING = '-0.02em';
const TITLE_MARGIN_BOTTOM = 1;

/** =========================================================================
 * Component
 * =======================================================================*/

/**
 * AddCostPage
 * Renders a titled page with the AddCostForm.
 * @returns {JSX.Element}
 */
export default function AddCostPage() {
    const theme = useTheme();
    const addColor = theme.custom.colors.navTabs.add;

    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                gap: ROOT_GAP
            }}
        >
            <Typography
                variant={TITLE_VARIANT}
                sx={{
                    mb: TITLE_MARGIN_BOTTOM,
                    fontWeight: TITLE_FONT_WEIGHT,
                    color: addColor,
                    letterSpacing: TITLE_LETTER_SPACING,
                    textAlign: 'center'
                }}
            >
                {PAGE_TITLE}
            </Typography>

            <AddCostForm />
        </Box>
    );
}
