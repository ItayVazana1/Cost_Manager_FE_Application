/** /src/components/HomeTitle.jsx
 * Project: Cost Manager Front End
 * File: src/components/HomeTitle.jsx
 * Description: Hero title with animated gradient (SVG glow) and looping typewriter subtitle.
 * Updated: 2025-09-11
 */

import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import '../styles/home-title.css';

/** =========================================================================
 * Configurable constants
 * =======================================================================*/

const DEFAULT_TITLE_FONT_SIZE = '5rem';
const DEFAULT_TITLE_LINE_HEIGHT = 2;
const DEFAULT_TITLE_LETTER_SPACING = '-0.5px';
const DEFAULT_TITLE_FONT_WEIGHT = 900;

const DEFAULT_SUBTITLE_FONT_SIZE = '20px';
const DEFAULT_SUBTITLE_LINE_HEIGHT = 1.35;
const DEFAULT_SUBTITLE_FONT_WEIGHT = 400;

const DEFAULT_ANIM_DURATION_MS = 5000;
const DEFAULT_GRADIENT = {
    g1: '#8a2be2',
    g2: '#ffa600',
    g3: '#ea356e',
    g4: '#eaa2b9',
    g5: '#00ffa8'
};
const DEFAULT_GLOW = {
    blurX: '.025',
    blurY: '.2',
    saturation: '1.3'
};

/** =========================================================================
 * Types
 * =======================================================================*/

/**
 * @typedef {Object} TypewriterProps
 * @property {string[]} phrases
 * @property {number} [typingSpeed]
 * @property {number} [deletingSpeed]
 * @property {number} [pauseMs]
 */

/**
 * @typedef {Object} HomeTitleProps
 * @property {string} [title]
 * @property {number} [animDurationMs]
 * @property {string[]} [phrases]
 * @property {number} [typingSpeed]
 * @property {number} [deletingSpeed]
 * @property {number} [pauseMs]
 */

/** =========================================================================
 * Typewriter
 * =======================================================================*/

/**
 * TypewriterText
 * @param {TypewriterProps} props
 * @returns {JSX.Element}
 */
function TypewriterText({ phrases, typingSpeed = 60, deletingSpeed = 35, pauseMs = 1200 }) {
    const [i, setI] = React.useState(0);
    const [txt, setTxt] = React.useState('');
    const [mode, setMode] = React.useState('type');

    React.useEffect(() => {
        if (!phrases?.length) return;
        const full = phrases[i % phrases.length];

        if (mode === 'type') {
            if (txt.length < full.length) {
                const t = setTimeout(() => setTxt(full.slice(0, txt.length + 1)), typingSpeed);
                return () => clearTimeout(t);
            }
            const t = setTimeout(() => setMode('pause'), pauseMs);
            return () => clearTimeout(t);
        }

        if (mode === 'pause') {
            const t = setTimeout(() => setMode('delete'), 200);
            return () => clearTimeout(t);
        }

        if (mode === 'delete') {
            if (txt.length > 0) {
                const t = setTimeout(() => setTxt(full.slice(0, txt.length - 1)), deletingSpeed);
                return () => clearTimeout(t);
            }
            setMode('type');
            setI((p) => (p + 1) % phrases.length);
        }
    }, [phrases, i, txt, mode, typingSpeed, deletingSpeed, pauseMs]);

    return (
        <span className='typewriter'>
      {txt}
            <span className='typewriter-caret' aria-hidden='true'>|</span>
    </span>
    );
}

/** =========================================================================
 * Component
 * =======================================================================*/

/**
 * HomeTitle
 * @param {HomeTitleProps} props
 * @returns {JSX.Element}
 */
export default function HomeTitle({
                                      title = 'Cost Manager',
                                      animDurationMs = DEFAULT_ANIM_DURATION_MS,
                                      phrases = [
                                          'Add costs in seconds.',
                                          'Convert currencies on the fly.',
                                          'Monthly pie & yearly bar charts.',
                                          'Crystal-clear reports.'
                                      ],
                                      typingSpeed,
                                      deletingSpeed,
                                      pauseMs
                                  }) {
    const theme = useTheme();

    const vars = {
        '--dur': `${animDurationMs}ms`,
        '--g1': DEFAULT_GRADIENT.g1,
        '--g2': DEFAULT_GRADIENT.g2,
        '--g3': DEFAULT_GRADIENT.g3,
        '--g4': DEFAULT_GRADIENT.g4,
        '--g5': DEFAULT_GRADIENT.g5,
        '--blur-x': DEFAULT_GLOW.blurX,
        '--blur-y': DEFAULT_GLOW.blurY,
        '--sat': DEFAULT_GLOW.saturation
    };

    return (
        <Stack
            spacing={3}
            alignItems='center'
            textAlign='center'
            sx={{ color: theme.palette.text.primary, px: { xs: 2, md: 4 } }}
        >
            <Box component='svg' width={0} height={0} aria-hidden='true' sx={{ position: 'fixed' }}>
                <filter id='glow' x='-50%' y='-200%' width='200%' height='500%' primitiveUnits='objectBoundingBox'>
                    <feGaussianBlur stdDeviation='var(--blur-x, .025) var(--blur-y, .2)' />
                    <feColorMatrix type='saturate' values='var(--sat, 1.3)' />
                    <feBlend in='SourceGraphic' />
                </filter>
            </Box>

            <Box className='h1-glow multi-stops slide' sx={vars}>
                <Typography
                    component='h1'
                    variant='h1'
                    sx={{
                        fontSize: DEFAULT_TITLE_FONT_SIZE,
                        lineHeight: DEFAULT_TITLE_LINE_HEIGHT,
                        letterSpacing: DEFAULT_TITLE_LETTER_SPACING,
                        fontWeight: DEFAULT_TITLE_FONT_WEIGHT
                    }}
                >
                    {title}
                </Typography>
            </Box>

            <Box
                component='p'
                sx={{
                    fontSize: DEFAULT_SUBTITLE_FONT_SIZE,
                    lineHeight: DEFAULT_SUBTITLE_LINE_HEIGHT,
                    fontWeight: DEFAULT_SUBTITLE_FONT_WEIGHT,
                    margin: 0,
                    color: theme.palette.text.primary,
                    fontFamily: theme.typography.fontFamily,
                    textAlign: 'center',
                    minHeight: '1.6em'
                }}
                aria-live='polite'
            >
                <TypewriterText
                    phrases={phrases}
                    typingSpeed={typingSpeed}
                    deletingSpeed={deletingSpeed}
                    pauseMs={pauseMs}
                />
            </Box>
        </Stack>
    );
}
