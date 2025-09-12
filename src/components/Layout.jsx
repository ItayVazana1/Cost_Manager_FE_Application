/** /src/components/Layout.jsx
 * Project: Cost Manager Front End
 * File: src/components/Layout.jsx
 * Description: App layout with fixed Navbar, centered content container, and bottom Footer.
 * Updated: 2025-09-12
 */

import React from 'react';
import { Box, Container, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

/** =========================================================================
 * Configurable constants
 * =======================================================================*/

/** @constant {string} ROOT_MIN_HEIGHT - Minimum viewport height */
const ROOT_MIN_HEIGHT = '100vh';
/** @constant {boolean} USE_COLUMN - Root flex direction (column layout) */
const USE_COLUMN = true;
/** @constant {string} BG_TOKEN - Background color token */
const BG_TOKEN = 'background.default';
/** @constant {string} FG_TOKEN - Foreground/text color token */
const FG_TOKEN = 'text.primary';
/** @constant {string} CONTENT_MAX_WIDTH - Container maxWidth breakpoint */
const CONTENT_MAX_WIDTH = 'md';
/** @constant {string} CONTENT_JUSTIFY - Main axis alignment for content */
const CONTENT_JUSTIFY = 'center';
/** @constant {string} CONTENT_ALIGN - Cross axis alignment for content */
const CONTENT_ALIGN = 'center';

/** =========================================================================
 * Component
 * =======================================================================*/

/**
 * Layout wrapper for pages.
 * Renders a fixed Navbar spacer, centered page content, and Footer.
 * @returns {JSX.Element}
 */
export default function Layout() {
    return (
        <Box
            sx={{
                minHeight: ROOT_MIN_HEIGHT,
                display: 'flex',
                flexDirection: USE_COLUMN ? 'column' : 'row',
                backgroundColor: BG_TOKEN,
                color: FG_TOKEN,
                overflowX: 'hidden'
            }}
        >
            <Navbar />
            <Toolbar />
            <Container
                maxWidth={CONTENT_MAX_WIDTH}
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: CONTENT_JUSTIFY,
                    alignItems: CONTENT_ALIGN,
                    textAlign: 'center'
                }}
            >
                <Outlet />
            </Container>
            <Box sx={{ mt: 'auto' }}>
                <Footer />
            </Box>
        </Box>
    );
}
