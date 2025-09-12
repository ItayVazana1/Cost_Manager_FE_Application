/** /src/theme.js
 * Project: Cost Manager Front End
 * File: src/theme.js
 * Description: Centralized MUI theme with neutralized focus/selection styles and custom tokens under theme.custom.
 * Updated: 2025-09-12
 */

import { createTheme, alpha } from '@mui/material/styles';
import '@fontsource/permanent-marker/400.css';

/** =========================================================================
 * Color Tokens (parametrization)
 * =======================================================================*/

/** @type {const} */
const COLOR_TOKENS = {
    brand: { main: '#7C6CF4', on: '#0A0A0E' },
    accent: { main: '#00DDB3', on: '#081615' },
    positive: '#3DDC97',
    negative: '#FF5C5C',
    warning: '#FFC857',
    info: '#4DA3FF',
    nav: {
        background: '#121214',
        text: '#E5E5EA',
        hover: '#1C1C1E',
        border: '#2C2C2E'
    },
    navTabs: {
        home: '#7C6CF4',
        add: '#00DDB3',
        report: '#FFC857',
        charts: '#eaa2b9',
        settings: '#FF5C5C'
    },
    navTabsText: {
        home: '#312e68',
        add: '#00493c',
        report: '#685021',
        charts: '#735057',
        settings: '#7e2d2d'
    },
    neutral: {
        25: '#0C0C0E',
        50: '#121214',
        100: '#1C1C1E',
        200: '#2C2C2E',
        300: '#3A3A3C',
        400: '#48484A',
        500: '#636366',
        600: '#8E8E93',
        700: '#AEAEB2',
        800: '#C7C7CC',
        900: '#E5E5EA'
    },
    surface: {
        base: '#0E0E11',
        raised: '#1C1C1E',
        overlay: 'rgba(28,28,30,0.7)',
        border: '#2C2C2E'
    },
    text: {
        primary: '#FFFFFF',
        secondary: 'rgba(235,235,245,0.6)',
        disabled: 'rgba(235,235,245,0.38)'
    },
    divider: 'rgba(255,255,255,0.12)'
};

/** =========================================================================
 * Theme Factory
 * =======================================================================*/

/**
 * Create the application theme with global overrides and a custom namespace.
 * @param {{ mode?: 'light'|'dark', colors?: typeof COLOR_TOKENS }} [opts]
 * @returns {import('@mui/material/styles').Theme}
 */
function createAppTheme({ mode = 'dark', colors = COLOR_TOKENS } = {}) {
    const tokens = {
        mode,
        colors,
        radius: { xs: 6, sm: 10, md: 14, lg: 18, xl: 24, pill: 999 },
        spacingBase: 8,
        elevations: {
            card: '0 6px 18px rgba(0,0,0,0.25)',
            popover: '0 10px 30px rgba(0,0,0,0.35)',
            modal: '0 20px 60px rgba(0,0,0,0.45)'
        },
        layout: {
            headerHeight: 64,
            footerHeight: 52,
            contentMaxWidth: 1080,
            pagePaddingX: 24,
            sectionGapY: 24
        },
        focus: { ring: '0 0 0 3px rgba(124,108,244,0.35)' },
        charts: {
            categorical: [
                colors.brand.main,
                colors.accent.main,
                colors.warning,
                colors.info,
                colors.negative,
                colors.neutral[600],
                colors.neutral[500]
            ]
        },
        transition: {
            duration: { short: 150, std: 220, complex: 320 },
            easing: { inOut: 'cubic-bezier(0.4, 0, 0.2, 1)' }
        },
        density: 'comfortable'
    };

    const theme = createTheme({
        palette: {
            mode: tokens.mode,
            primary: { main: colors.brand.main, contrastText: colors.brand.on },
            secondary: { main: colors.accent.main, contrastText: colors.accent.on },
            success: { main: colors.positive },
            error: { main: colors.negative },
            warning: { main: colors.warning },
            info: { main: colors.info },
            background: { default: colors.surface.base, paper: colors.surface.raised },
            text: {
                primary: colors.text.primary,
                secondary: colors.text.secondary,
                disabled: colors.text.disabled
            },
            divider: colors.divider,
            action: {
                selected: alpha(colors.neutral[300], 0.22),
                hover: alpha(colors.neutral[300], 0.1),
                focus: alpha(colors.neutral[300], 0.24),
                selectedOpacity: 0.22,
                hoverOpacity: 0.1,
                focusOpacity: 0.24,
                activatedOpacity: 0.24
            }
        },

        typography: {
            htmlFontSize: 16,
            fontSize: 14,
            fontFamily: [
                'Inter',
                'Rubik',
                'Segoe UI',
                'Roboto',
                'Helvetica Neue',
                'Arial',
                'system-ui',
                'sans-serif'
            ].join(','),
            fontWeightLight: 300,
            fontWeightRegular: 400,
            fontWeightMedium: 500,
            fontWeightBold: 700,
            h1: { fontSize: '2.25rem', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.01em' },
            h2: { fontSize: '1.875rem', fontWeight: 700, lineHeight: 1.22 },
            h3: { fontSize: '1.5rem', fontWeight: 600, lineHeight: 1.25 },
            h4: { fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.3 },
            h5: { fontSize: '1.125rem', fontWeight: 600, lineHeight: 1.35 },
            h6: { fontSize: '1rem', fontWeight: 600, lineHeight: 1.4 },
            subtitle1: { fontSize: '0.95rem', lineHeight: 1.35 },
            subtitle2: { fontSize: '0.875rem', lineHeight: 1.35 },
            body1: { fontSize: '0.95rem', lineHeight: 1.55 },
            body2: { fontSize: '0.875rem', lineHeight: 1.5 },
            p: { fontSize: '20px', lineHeight: 1.35, fontWeight: 400 },
            button: { textTransform: 'none', fontWeight: 600, letterSpacing: 0.2 },
            caption: { fontSize: '0.75rem' },
            overline: { textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.72rem' },
            decorative: { regular: { fontFamily: '"Permanent Marker", cursive', fontWeight: 400 } }
        },

        shape: { borderRadius: tokens.radius.md },
        spacing: tokens.spacingBase,
        shadows: [
            'none',
            '0 1px 2px rgba(0,0,0,0.25)',
            '0 2px 6px rgba(0,0,0,0.25)',
            '0 3px 10px rgba(0,0,0,0.25)',
            '0 4px 14px rgba(0,0,0,0.28)',
            '0 6px 18px rgba(0,0,0,0.30)',
            '0 8px 24px rgba(0,0,0,0.32)',
            '0 10px 30px rgba(0,0,0,0.34)',
            '0 12px 36px rgba(0,0,0,0.36)',
            '0 16px 44px rgba(0,0,0,0.38)',
            ...Array(15).fill('0 20px 60px rgba(0,0,0,0.40)')
        ],
        breakpoints: { values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 } },
        zIndex: { appBar: 1100, drawer: 1200, modal: 1300, snackbar: 1400, tooltip: 1500 },
        transitions: { duration: tokens.transition.duration, easing: { easeInOut: tokens.transition.easing.inOut } },

        mixins: {
            toolbar: { minHeight: tokens.layout.headerHeight },
            section: {
                maxWidth: tokens.layout.contentMaxWidth,
                marginInline: 'auto',
                paddingInline: tokens.layout.pagePaddingX,
                paddingBlock: tokens.layout.sectionGapY
            }
        },

        components: {
            MuiContainer: {
                defaultProps: { maxWidth: 'md' },
                styleOverrides: { root: { maxWidth: tokens.layout.contentMaxWidth } }
            },
            MuiAppBar: {
                defaultProps: { elevation: 0, color: 'transparent' },
                styleOverrides: {
                    root: {
                        backdropFilter: 'saturate(120%) blur(8px)',
                        backgroundColor: tokens.colors.surface.overlay,
                        borderBottom: `1px solid ${tokens.colors.surface.border}`
                    }
                }
            },
            MuiToolbar: { styleOverrides: { root: { minHeight: tokens.layout.headerHeight } } },

            MuiCssBaseline: {
                styleOverrides: {
                    p: {
                        fontSize: '20px',
                        lineHeight: 1.35,
                        fontWeight: 400,
                        margin: 0,
                        color: tokens.colors.text.secondary
                    }
                }
            },
            MuiTypography: {
                variants: [
                    {
                        props: { variant: 'p' },
                        style: {
                            fontSize: '20px',
                            lineHeight: 1.35,
                            fontWeight: 400,
                            color: tokens.colors.text.secondary
                        }
                    }
                ]
            },

            MuiMenu: {
                styleOverrides: {
                    paper: {
                        backgroundColor: tokens.colors.surface.raised,
                        color: tokens.colors.text.primary,
                        border: `1px solid ${tokens.colors.surface.border}`,
                        boxShadow: tokens.elevations.popover
                    }
                }
            },
            MuiMenuItem: {
                styleOverrides: {
                    root: {
                        color: tokens.colors.text.primary,
                        '&:hover': { backgroundColor: tokens.colors.neutral[100] },
                        '&.Mui-focusVisible': {
                            backgroundColor: tokens.colors.neutral[200],
                            color: tokens.colors.text.primary
                        },
                        '&.Mui-selected': {
                            backgroundColor: tokens.colors.neutral[200],
                            color: tokens.colors.text.primary
                        },
                        '&.Mui-selected:hover, &.Mui-selected.Mui-focusVisible:hover': {
                            backgroundColor: tokens.colors.neutral[300]
                        }
                    }
                }
            },
            MuiSelect: {
                defaultProps: {
                    MenuProps: { PaperProps: { elevation: 0 } }
                },
                styleOverrides: {
                    outlined: {
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: tokens.colors.neutral[300] },
                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: tokens.colors.neutral[400] },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: tokens.colors.neutral[400] }
                    },
                    icon: { color: tokens.colors.neutral[800] }
                }
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    root: { backgroundColor: tokens.colors.surface.raised },
                    notchedOutline: { borderColor: tokens.colors.neutral[300] },
                    input: {
                        '&:-webkit-autofill': {
                            WebkitTextFillColor: tokens.colors.text.primary,
                            WebkitBoxShadow: `0 0 0 1000px ${tokens.colors.surface.raised} inset`
                        }
                    }
                }
            },
            MuiFormLabel: {
                styleOverrides: {
                    root: {
                        color: tokens.colors.text.secondary,
                        '&.Mui-focused': { color: tokens.colors.text.secondary }
                    },
                    asterisk: { color: tokens.colors.text.secondary }
                }
            },
            MuiDataGrid: {
                styleOverrides: {
                    root: {
                        '& .MuiDataGrid-columnHeaderTitle': { textAlign: 'center', width: '100%' },
                        '& .MuiDataGrid-cell': { textAlign: 'center' },
                        '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within, & .MuiDataGrid-columnHeader:focus': {
                            outline: `2px solid ${tokens.colors.warning}`
                        }
                    }
                }
            }
        }
    });

    theme.custom = {
        tokens,
        colors: tokens.colors,
        radius: tokens.radius,
        elevations: tokens.elevations,
        charts: tokens.charts,
        layout: tokens.layout,
        focus: tokens.focus,
        forms: {
            add: {
                fieldBg: colors.surface.raised,
                border: colors.navTabsText.add,
                label: colors.navTabs.add
            },
            report: {
                fieldBg: colors.surface.raised,
                border: colors.navTabsText.report,
                label: colors.navTabs.report
            },
            charts: {
                label: '#eaa2b9',
                border: '#735057'
            },
            settings: {
                label: '#ff5c5c',
                border: '#7e2d2d'
            }
        }
    };

    return theme;
}

/** =========================================================================
 * Export
 * =======================================================================*/

const appTheme = createAppTheme({ mode: 'dark', colors: COLOR_TOKENS });
export default appTheme;
