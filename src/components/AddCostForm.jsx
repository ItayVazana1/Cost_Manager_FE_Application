/** /src/components/AddCostForm.jsx
 * Project: Cost Manager Front End
 * File: src/components/AddCostForm.jsx
 * Description: Form for adding a new cost entry with validation and theme-based styling.
 * Updated: 2025-09-11
 */

import React, { useState } from 'react';
import {
    Stack,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Snackbar,
    Alert,
    Card,
    CardContent,
    CardActions
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { addCost } from '../services/idb';

const CURRENCIES = ['USD', 'ILS', 'GBP', 'EURO'];
const CATEGORIES = [
    'Food', 'Transportation', 'Housing', 'Utilities', 'Health',
    'Education', 'Entertainment', 'Shopping', 'Travel', 'Other'
];

/** =========================================================================
 * Configurable constants
 * =======================================================================*/

/** @constant {number} SNACK_DURATION_MS - Snackbar auto-hide duration */
const SNACK_DURATION_MS = 3000;
/** @constant {string} DEFAULT_CURRENCY - Default selected currency */
const DEFAULT_CURRENCY = 'USD';
/** @constant {string} SAVE_BUSY_LABEL - Button text while saving */
const SAVE_BUSY_LABEL = 'Saving…';
/** @constant {string} SAVE_IDLE_LABEL - Button text when idle */
const SAVE_IDLE_LABEL = 'Add Cost';
/** @constant {string} ERR_SUM_REQUIRED - Validation message for sum */
const ERR_SUM_REQUIRED = 'Sum must be a positive number';
/** @constant {string} ERR_CURRENCY_REQUIRED - Validation message for currency */
const ERR_CURRENCY_REQUIRED = 'Currency is required';
/** @constant {string} ERR_CATEGORY_REQUIRED - Validation message for category */
const ERR_CATEGORY_REQUIRED = 'Category is required';
/** @constant {string} ERR_DESC_REQUIRED - Validation message for description */
const ERR_DESC_REQUIRED = 'Description is required';
/** @constant {string} MSG_ADD_OK - Success message on add */
const MSG_ADD_OK = 'Cost added successfully';
/** @constant {string} MSG_ADD_FAIL - Error message on add failure */
const MSG_ADD_FAIL = 'Failed to add cost';

/** =========================================================================
 * Component
 * =======================================================================*/

/**
 * Renders a validated form for adding a cost record into IndexedDB.
 * @returns {JSX.Element}
 */
export default function AddCostForm() {
    const theme = useTheme();

    const accentColor = theme.custom.colors.navTabs.add;
    const borderColor = theme.custom.colors.navTabsText.add;
    const fieldBg = theme.custom.colors.surface.raised;
    const textColor = theme.custom.colors.text.primary;

    const [sum, setSum] = useState('');
    const [currency, setCurrency] = useState(DEFAULT_CURRENCY);
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [busy, setBusy] = useState(false);
    const [snack, setSnack] = useState({ open: false, type: 'success', msg: '' });

    /**
     * Close snackbar.
     * @returns {void}
     */
    const closeSnack = () => setSnack((s) => ({ ...s, open: false }));

    /**
     * Basic form validation.
     * @returns {boolean} True if valid, otherwise false.
     */
    const validate = () => {
        const num = Number(sum);
        if (!sum || Number.isNaN(num) || num <= 0) {
            setSnack({ open: true, type: 'error', msg: ERR_SUM_REQUIRED });
            return false;
        }
        if (!currency) {
            setSnack({ open: true, type: 'error', msg: ERR_CURRENCY_REQUIRED });
            return false;
        }
        if (!category) {
            setSnack({ open: true, type: 'error', msg: ERR_CATEGORY_REQUIRED });
            return false;
        }
        if (!description.trim()) {
            setSnack({ open: true, type: 'error', msg: ERR_DESC_REQUIRED });
            return false;
        }
        return true;
    };

    /**
     * Handle submit and persist the cost item.
     * @param {React.FormEvent<HTMLFormElement>} e
     * @returns {Promise<void>}
     */
    const onSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        try {
            setBusy(true);
            await addCost({ sum: Number(sum), currency, category, description: description.trim() });
            setSnack({ open: true, type: 'success', msg: MSG_ADD_OK });
            setSum('');
            setCurrency(DEFAULT_CURRENCY);
            setCategory('');
            setDescription('');
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error(err);
            setSnack({ open: true, type: 'error', msg: MSG_ADD_FAIL });
        } finally {
            setBusy(false);
        }
    };

    /** =========================================================================
     * Styles
     * =======================================================================*/

    const inputSx = {
        '& .MuiOutlinedInput-root': {
            backgroundColor: fieldBg,
            color: textColor,
            '& fieldset': { borderColor },
            '&:hover fieldset': { borderColor },
            '&.Mui-focused fieldset': { borderColor }
        },
        '& .MuiInputLabel-root': {
            color: accentColor,
            '& .MuiFormLabel-asterisk': { color: accentColor }
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: accentColor,
            '& .MuiFormLabel-asterisk': { color: accentColor }
        }
    };

    const selectSx = {
        backgroundColor: fieldBg,
        color: textColor,
        '& .MuiOutlinedInput-notchedOutline': { borderColor },
        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor },
        '& .MuiSelect-icon': { color: textColor }
    };

    /** =========================================================================
     * Render
     * =======================================================================*/

    return (
        <Card sx={{ width: '100%', maxWidth: 600 }}>
            <form onSubmit={onSubmit} noValidate>
                <CardContent>
                    <Stack spacing={2}>
                        <TextField
                            label='Sum'
                            value={sum}
                            onChange={(e) => setSum(e.target.value)}
                            type='text'
                            inputProps={{ step: '0.01', min: '0' }}
                            required
                            fullWidth
                            sx={inputSx}
                        />

                        <FormControl fullWidth required>
                            <InputLabel
                                id='currency-label'
                                sx={{
                                    color: accentColor,
                                    '&.Mui-focused': { color: accentColor },
                                    '& .MuiFormLabel-asterisk': { color: accentColor }
                                }}
                            >
                                Currency
                            </InputLabel>
                            <Select
                                labelId='currency-label'
                                label='Currency'
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                                variant='outlined'
                                sx={selectSx}
                            >
                                {CURRENCIES.map((c) => (
                                    <MenuItem key={c} value={c}>{c}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth required>
                            <InputLabel
                                id='category-label'
                                sx={{
                                    color: accentColor,
                                    '&.Mui-focused': { color: accentColor },
                                    '& .MuiFormLabel-asterisk': { color: accentColor }
                                }}
                            >
                                Category
                            </InputLabel>
                            <Select
                                labelId='category-label'
                                label='Category'
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                variant='outlined'
                                sx={selectSx}
                            >
                                {CATEGORIES.map((c) => (
                                    <MenuItem key={c} value={c}>{c}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <TextField
                            label='Description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            fullWidth
                            multiline
                            minRows={2}
                            sx={inputSx}
                        />
                    </Stack>
                </CardContent>

                <CardActions sx={{ justifyContent: 'flex-end', px: 2, pb: 2 }}>
                    <Button
                        type='submit'
                        variant='contained'
                        disabled={busy}
                        sx={{
                            backgroundColor: accentColor,
                            '&:hover': { backgroundColor: accentColor, opacity: 0.9 }
                        }}
                    >
                        {busy ? SAVE_BUSY_LABEL : SAVE_IDLE_LABEL}
                    </Button>
                </CardActions>
            </form>

            <Snackbar
                open={snack.open}
                autoHideDuration={SNACK_DURATION_MS}
                onClose={closeSnack}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={closeSnack} severity={snack.type} sx={{ width: '100%' }}>
                    {snack.msg}
                </Alert>
            </Snackbar>
        </Card>
    );
}
