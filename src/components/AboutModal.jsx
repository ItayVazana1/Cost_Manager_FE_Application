/** /src/components/AboutModal.jsx
 * Project: Cost Manager Front End
 * File: src/components/AboutModal.jsx
 * Description: Glassy About modal (MUI Dialog) with hero section, stack & privacy info, and developers list.
 * Updated: 2025-09-12
 */

import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Button,
    Stack,
    Box,
    Typography,
    Divider,
    Chip,
    Avatar,
    Slide,
    Grid
} from '@mui/material';

/** =========================================================================
 * Configurable constants
 * =======================================================================*/

/** @constant {string} DIALOG_MAX_WIDTH - Max width of the dialog */
const DIALOG_MAX_WIDTH = 'md';
/** @constant {number} ICON_SIZE - Dimension (px) for the hero app icon */
const ICON_SIZE = 150;
/** @constant {string} VERSION_LABEL - Application version label */
const VERSION_LABEL = 'v1.0.0';
/** @constant {string} STACK_TITLE_COLOR - Color for the "Stack" section title */
const STACK_TITLE_COLOR = '#eaa2b9';
/** @constant {string} PRIVACY_TITLE_COLOR - Color for the "Data & Privacy" section title */
const PRIVACY_TITLE_COLOR = '#f4c673';
/** @constant {string} DEVS_TITLE_COLOR - Color for the "Developers" section title */
const DEVS_TITLE_COLOR = '#fa5769';
/** @constant {Object} ICONS - Social media icon sources */
const ICONS = {
    linkedin: '/resources/icons/linkedin.png',
    github: '/resources/icons/github.png',
    website: '/resources/icons/email.png'
};
/** @constant {string[]} DEFAULT_STACK_BULLETS - Default stack items list */
const DEFAULT_STACK_BULLETS = ['React + MUI', 'IndexedDB (via idb.js)', 'Charts: Pie & Bar'];

/** =========================================================================
 * Types
 * =======================================================================*/

/**
 * @typedef {Object} Dev
 * @property {string} name - Developer name
 * @property {string} [linkedin] - LinkedIn profile URL
 * @property {string} [github] - GitHub profile URL
 * @property {string} [website] - Personal website URL
 */

/** =========================================================================
 * Transitions
 * =======================================================================*/

/**
 * Slide-up transition for the dialog.
 * @param {Object} props - Component props
 * @param {React.Ref<any>} ref - Forwarded ref
 * @returns {JSX.Element} Transition element
 */
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

/** =========================================================================
 * Component
 * =======================================================================*/

/**
 * AboutModal component.
 * @param {Object} props - Component props
 * @param {boolean} props.open - Whether the dialog is open
 * @param {() => void} props.onClose - Close handler
 * @param {Dev[]} [props.devs] - Developers list
 * @param {string} [props.appIconSrc] - App icon image source
 * @returns {JSX.Element} About modal dialog
 */
export default function AboutModal({
                                       open,
                                       onClose,
                                       devs = [],
                                       appIconSrc = '/resources/icons/gear5.png'
                                   }) {
    const stackBullets = DEFAULT_STACK_BULLETS;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth={DIALOG_MAX_WIDTH}
            TransitionComponent={Transition}
            keepMounted
            aria-labelledby='about-dialog-title'
            aria-describedby='about-dialog-description'
            PaperProps={{
                sx: (t) => ({
                    p: 0,
                    borderRadius: 3,
                    overflow: 'hidden',
                    backdropFilter: 'blur(10px)',
                    background: `linear-gradient(180deg,
            ${t.custom?.colors?.surface?.raised || t.palette.background.paper} 0%,
            ${t.custom?.colors?.surface?.sunken || t.palette.background.default} 100%)`,
                    border: `1px solid ${t.custom?.colors?.surface?.border || t.palette.divider}`,
                    boxShadow: t.custom?.elevations?.lg || t.shadows[6]
                })
            }}
        >
            <DialogTitle style={{ paddingTop: '20px' }}></DialogTitle>

            <DialogContent id='about-dialog-description' sx={{ pt: 0 }}>
                <Stack spacing={3} alignItems='center'>

                    {/* Hero section */}
                    <Grid container spacing={3} alignItems='center' justifyContent='center'>
                        <Grid item xs={12} md={5}>
                            <Avatar
                                alt='App icon'
                                src={appIconSrc}
                                sx={{ width: ICON_SIZE, height: ICON_SIZE }}
                                imgProps={{ loading: 'lazy' }}
                            />
                        </Grid>
                        <Grid item xs={12} md={7}>
                            <Stack spacing={1} alignItems='flex-start' sx={{ textAlign: 'left' }}>
                                <Typography variant='h3'>
                                    Cost Manager{' '}
                                    <Typography
                                        variant='caption'
                                        sx={{ fontSize: '15px', color: 'rgb(174,149,244)', userSelect: 'none' }}
                                    >
                                        (Front End Application)
                                    </Typography>
                                </Typography>
                                <Typography variant='body1' color='text.secondary'>
                                    Track your expenses, generate reports, and visualize your data.
                                </Typography>
                                <Chip label={VERSION_LABEL} size='small' />
                            </Stack>
                        </Grid>
                    </Grid>

                    <Divider sx={{ width: '100%' }} />

                    {/* Stack and Privacy section */}
                    <Grid container spacing={3} justifyContent='center' alignItems='flex-start'>
                        <Grid item xs={12} md={6}>
                            <Stack spacing={1.25} alignItems='flex-start' sx={{ textAlign: 'left' }}>
                                <Typography variant='subtitle1' sx={{ color: STACK_TITLE_COLOR }}>
                                    Stack
                                </Typography>
                                <Box component='ul' sx={{ pl: 3, m: 0 }}>
                                    {stackBullets.map((txt) => (
                                        <li key={txt}>
                                            <Typography variant='body2' color='text.secondary'>
                                                {txt}
                                            </Typography>
                                        </li>
                                    ))}
                                </Box>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Stack spacing={1.25} alignItems='flex-start' sx={{ textAlign: 'left' }}>
                                <Typography variant='subtitle1' sx={{ color: PRIVACY_TITLE_COLOR }}>
                                    Data &amp; Privacy
                                </Typography>
                                <Box component='ul' sx={{ pl: 3, m: 0 }}>
                                    <li>
                                        <Typography variant='body2' color='text.secondary'>
                                            Costs are stored locally in your browser (IndexedDB).
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography variant='body2' color='text.secondary'>
                                            Exchange rates are fetched from a configurable URL.
                                        </Typography>
                                    </li>
                                </Box>
                            </Stack>
                        </Grid>
                    </Grid>

                    <Divider sx={{ width: '100%' }} />

                    {/* Developers section */}
                    {!!devs.length && (
                        <Stack spacing={1.5} alignItems='center' sx={{ width: '100%' }}>
                            <Typography variant='subtitle1' textAlign='center' sx={{ color: DEVS_TITLE_COLOR }}>
                                Developers
                            </Typography>
                            <Stack spacing={1.25} sx={{ width: '35%', maxWidth: 720 }}>
                                {devs.map((d, i) => (
                                    <Stack
                                        key={`${d.name}-${i}`}
                                        direction='row'
                                        alignItems='center'
                                        justifyContent='space-between'
                                        sx={{ gap: 2 }}
                                    >
                                        <Typography variant='body2' sx={{ mr: 2 }}>
                                            {d.name}
                                        </Typography>
                                        <Stack direction='row' spacing={1.5} alignItems='center'>
                                            {!!d.linkedin && (
                                                <IconButton
                                                    component='a'
                                                    href={d.linkedin}
                                                    target='_blank'
                                                    rel='noreferrer'
                                                    aria-label={`${d.name} on LinkedIn`}
                                                    size='small'
                                                >
                                                    <img
                                                        src={ICONS.linkedin}
                                                        alt='LinkedIn'
                                                        width={22}
                                                        height={22}
                                                        loading='lazy'
                                                    />
                                                </IconButton>
                                            )}
                                            {!!d.github && (
                                                <IconButton
                                                    component='a'
                                                    href={d.github}
                                                    target='_blank'
                                                    rel='noreferrer'
                                                    aria-label={`${d.name} on GitHub`}
                                                    size='small'
                                                >
                                                    <img
                                                        src={ICONS.github}
                                                        alt='GitHub'
                                                        width={22}
                                                        height={22}
                                                        loading='lazy'
                                                    />
                                                </IconButton>
                                            )}
                                            {!!d.website && (
                                                <IconButton
                                                    component='a'
                                                    href={d.website}
                                                    target='_blank'
                                                    rel='noreferrer'
                                                    aria-label={`${d.name} website`}
                                                    size='small'
                                                >
                                                    <img
                                                        src={ICONS.website}
                                                        alt='Website'
                                                        width={22}
                                                        height={22}
                                                        loading='lazy'
                                                    />
                                                </IconButton>
                                            )}
                                        </Stack>
                                    </Stack>
                                ))}
                            </Stack>
                        </Stack>
                    )}
                </Stack>
            </DialogContent>

            <DialogActions sx={{ justifyContent: 'center', px: 3, pb: 2 }}>
                <Button variant='contained' onClick={onClose} sx={{ color: 'white' }}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}
