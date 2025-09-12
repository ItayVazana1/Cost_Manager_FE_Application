/** /src/components/HomeNavbar.jsx
 * Project: Cost Manager Front End
 * File: src/components/HomeNavbar.jsx
 * Description: Home navigation bar with centered tabs for main app pages.
 * Updated: 2025-09-12
 */

import React from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

/** =========================================================================
 * Configurable constants
 * =======================================================================*/

/** @constant {Array<{label:string, path:string, key:string}>} NAV_TABS - Navigation tabs configuration */
const NAV_TABS = [
    { label: 'Home', path: '/', key: 'home' },
    { label: 'Add', path: '/add', key: 'add' },
    { label: 'Report', path: '/report', key: 'report' },
    { label: 'Charts', path: '/charts', key: 'charts' },
    { label: 'Settings', path: '/settings', key: 'settings' }
];

/** =========================================================================
 * Component
 * =======================================================================*/

/**
 * HomeNavbar component.
 * Renders a fixed AppBar with centered navigation buttons styled from theme.
 * @returns {JSX.Element}
 */
export default function HomeNavbar() {
    const theme = useTheme();
    const tabColors = theme.custom.colors.navTabs;
    const tabTextColors = theme.custom.colors.navTabsText;

    return (
        <AppBar position='fixed' color='primary'>
            <Toolbar sx={{ justifyContent: 'center' }}>
                <Box display='flex' gap={2}>
                    {NAV_TABS.map(({ label, path, key }) => (
                        <Button
                            key={label}
                            component={Link}
                            to={path}
                            sx={{
                                color: 'inherit',
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: tabColors[key],
                                    color: tabTextColors[key]
                                }
                            }}
                        >
                            {label}
                        </Button>
                    ))}
                </Box>
            </Toolbar>
        </AppBar>
    );
}
