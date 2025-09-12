/** /src/components/Footer.jsx
 * Project: Cost Manager Front End
 * File: src/components/Footer.jsx
 * Description: Footer with left-aligned About button that opens AboutModal. Matches footer.css animations/classes.
 * Updated: 2025-09-12
 */

import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import AboutModal from './AboutModal';
import '../styles/footer.css';

/** =========================================================================
 * Configurable constants
 * =======================================================================*/

const FOOTER_ICON = '/resources/icons/joyboy.png';

/** =========================================================================
 * Types
 * =======================================================================*/

/**
 * @typedef {import('./AboutModal').Dev} Dev
 */

/** =========================================================================
 * Data
 * =======================================================================*/

/** @type {Dev[]} */
const DEVS = [
    { name: 'Itay Vazana', linkedin: 'https://linkedin.com/in/itayvazana', github: 'https://github.com/ItayVazana1', website: 'mailto:itay.vazana.b@gmail.com' },
    { name: 'On Bonderman', linkedin: 'https://linkedin.com/in/devtwo', github: 'https://github.com/devtwo', website: 'https://devtwo.dev' }
];

/** =========================================================================
 * Component
 * =======================================================================*/

/**
 * Footer component.
 * @returns {JSX.Element}
 */
export default function Footer() {
    const [open, setOpen] = React.useState(false);
    const label = 'I can hear them . .';

    return (
        <>
            <Box
                component='footer'
                sx={(t) => ({
                    py: 2,
                    px: 3,
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    backgroundColor: t.palette.background.paper,
                    borderTop: `1px solid ${t.palette.divider}`
                })}
            >
                <Button
                    aria-label='About'
                    onClick={() => setOpen(true)}
                    sx={(t) => ({
                        textTransform: 'none',
                        color: t.palette.text.primary,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2
                    })}
                >
                    <Stack direction='row' spacing={2} alignItems='center'>
                        <img
                            src={FOOTER_ICON}
                            alt='About'
                            className='footer-icon'
                            loading='lazy'
                        />
                        <Typography
                            className='footer-text'
                            sx={(t) => ({
                                fontFamily: t.typography?.decorative?.regular?.fontFamily || t.typography.h4.fontFamily,
                                fontWeight: t.typography?.decorative?.regular?.fontWeight || t.typography.fontWeightRegular,
                                fontSize: t.typography.pxToRem(16),
                                color: t.palette.text.secondary,
                                userSelect: 'none'
                            })}
                        >
                            {label}
                        </Typography>
                    </Stack>
                </Button>
            </Box>

            <AboutModal open={open} onClose={() => setOpen(false)} devs={DEVS} />
        </>
    );
}
