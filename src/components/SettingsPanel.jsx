/** /src/components/SettingsPanel.jsx
 * Project: Cost Manager Front End
 * File: src/components/SettingsPanel.jsx
 * Description: Settings panel to configure exchange rates URL and reset local data (with confirmation).
 * Updated: 2025-09-12
 */

import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    CardActions,
    TextField,
    Button,
    Stack,
    Snackbar,
    Alert,
    Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { getRatesUrl, setRatesUrl } from '../services/settings';
import { clearAll } from '../services/idb';

/** =========================================================================
 * Configurable constants
 * =======================================================================*/

const PLACEHOLDER_URL = 'https://your-host/rates.json';
const BTN_SAVE_LABEL = 'Save';
const BTN_RESET_LABEL = 'Reset Data';
const WARN_TITLE = '⚠️ Warning ⚠️';
const WARN_TEXT = 'This action is irreversible. All saved data will be permanently deleted.';
const CONFIRM_TEXT =
    '⚠️ Warning: This action is irreversible. All saved data will be permanently deleted. Are you sure?';
const MSG_URL_REQUIRED = 'Please enter an exchange rates URL';
const MSG_URL_SAVED = 'Saved exchange rates URL';
const MSG_CLEAR_OK = 'All data has been cleared';
const MSG_CLEAR_FAIL = 'Failed to clear data';
const SNACK_DURATION_MS = 2500;
const CARD_MAX_WIDTH = 700;

/** =========================================================================
 * Component
 * =======================================================================*/

/**
 * SettingsPanel component.
 * Provides configuration for exchange rates URL and a data reset option with confirmation.
 * @returns {JSX.Element}
 */
export default function SettingsPanel() {
    const theme = useTheme();
    const colors = theme.custom.forms.settings;

    const [url, setUrl] = useState('');
    const [snack, setSnack] = useState({ open: false, type: 'success', msg: '' });

    useEffect(() => {
        setUrl(getRatesUrl());
    }, []);

    /**
     * Save the exchange rates URL.
     * @returns {void}
     */
    const onSave = () => {
        if (!url.trim()) {
            setSnack({ open: true, type: 'error', msg: MSG_URL_REQUIRED });
            return;
        }
        setRatesUrl(url);
        setSnack({ open: true, type: 'success', msg: MSG_URL_SAVED });
    };

    /**
     * Clear all stored data (with user confirmation).
     * @returns {Promise<void>}
     */
    const onReset = async () => {
        const confirmDelete = window.confirm(CONFIRM_TEXT);
        if (!confirmDelete) return;
        try {
            await clearAll();
            setSnack({ open: true, type: 'success', msg: MSG_CLEAR_OK });
        } catch (err) {
            setSnack({ open: true, type: 'error', msg: MSG_CLEAR_FAIL });
        }
    };

    return (
        <>
            <Card sx={{ maxWidth: CARD_MAX_WIDTH, width: '100%', mb: 10 }}>
                <CardContent>
                    <Stack spacing={4}>
                        <TextField
                            label='Exchange Rates URL'
                            placeholder={PLACEHOLDER_URL}
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            fullWidth
                            sx={{
                                '& label': { color: colors.label },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: colors.border },
                                    '&:hover fieldset': { borderColor: colors.border },
                                    '&.Mui-focused fieldset': { borderColor: colors.border }
                                }
                            }}
                        />
                    </Stack>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end', px: 2, pb: 2 }}>
                    <Button
                        variant='contained'
                        onClick={onSave}
                        sx={{
                            backgroundColor: colors.label,
                            color: colors.border,
                            '&:hover': { backgroundColor: colors.label, opacity: 0.9 }
                        }}
                    >
                        {BTN_SAVE_LABEL}
                    </Button>
                </CardActions>
            </Card>

            <Card
                sx={{
                    maxWidth: CARD_MAX_WIDTH,
                    width: '100%',
                    border: '1px solid yellow',
                    mt: 2
                }}
            >
                <CardContent>
                    <Typography variant='h6' color='warning' gutterBottom>
                        {WARN_TITLE}
                    </Typography>
                    <Typography variant='body2' color='text.primary' sx={{ mb: 2 }}>
                        {WARN_TEXT}
                    </Typography>
                    <CardActions sx={{ justifyContent: 'center', px: 0 }}>
                        <Button variant='contained' color='warning' onClick={onReset}>
                            {BTN_RESET_LABEL}
                        </Button>
                    </CardActions>
                </CardContent>
            </Card>

            <Snackbar
                open={snack.open}
                autoHideDuration={SNACK_DURATION_MS}
                onClose={() => setSnack((s) => ({ ...s, open: false }))}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    severity={snack.type}
                    onClose={() => setSnack((s) => ({ ...s, open: false }))}
                    sx={{ width: '100%' }}
                >
                    {snack.msg}
                </Alert>
            </Snackbar>
        </>
    );
}
