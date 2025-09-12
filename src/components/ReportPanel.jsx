/** /src/components/ReportPanel.jsx
 * Project: Cost Manager Front End
 * File: src/components/ReportPanel.jsx
 * Description: Monthly report panel with styled inputs, centered DataGrid, and total summary.
 * Updated: 2025-09-12
 */

import React, { useState } from 'react';
import {
    Card, CardContent, CardActions, Stack, TextField, FormControl,
    InputLabel, Select, MenuItem, Button, Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import { getReport } from '../services/idb';
import { fetchRates } from '../services/exchange';

/** =========================================================================
 * Configurable constants
 * =======================================================================*/

const CURRENCIES = ['USD', 'ILS', 'GBP', 'EURO'];
const ALERT_GENERATE_FAIL = 'Failed to generate report';
const GRID_HEIGHT_PX = 360;
const BTN_IDLE = 'Generate Report';
const BTN_BUSY = 'Loading…';
const TOTAL_PLACEHOLDER = 'Total: —';

/** =========================================================================
 * DataGrid columns
 * =======================================================================*/

/** @type {import('@mui/x-data-grid').GridColDef[]} */
const COLUMNS = [
    { field: 'day', headerName: 'Day', width: 120, headerAlign: 'center', align: 'center' },
    { field: 'category', headerName: 'Category', flex: 1, minWidth: 120, headerAlign: 'center', align: 'center' },
    { field: 'description', headerName: 'Description', flex: 2, minWidth: 120, headerAlign: 'center', align: 'center' },
    { field: 'currency', headerName: 'Currency', width: 120, headerAlign: 'center', align: 'center' },
    { field: 'sum', headerName: 'Sum', width: 120, type: 'number', headerAlign: 'center', align: 'center' }
];

/** =========================================================================
 * Helpers
 * =======================================================================*/

/**
 * Map report costs to DataGrid rows.
 * @param {{ costs: Array<{ sum:number, currency:string, category:string, description:string, Date?:{day:number} }> }} report
 * @returns {Array<{ id:number, day:number, category:string, description:string, currency:string, sum:number }>}
 */
function buildRows(report) {
    return report.costs.map((c, i) => ({
        id: i + 1,
        day: c?.Date?.day ?? 0,
        category: c.category,
        description: c.description,
        currency: c.currency,
        sum: c.sum
    }));
}

/** =========================================================================
 * Component
 * =======================================================================*/

/**
 * Renders inputs, builds the monthly report from IndexedDB, and shows a table and total.
 * Accent and border colors come from theme.custom.forms.report (with fallbacks).
 * @returns {JSX.Element}
 */
export default function ReportPanel() {
    const now = new Date();
    const theme = useTheme();

    const accent = theme?.custom?.forms?.report?.label ?? '#FFC857';
    const borderAccent = theme?.custom?.forms?.report?.border ?? '#685021';
    const fieldBg = theme?.custom?.forms?.report?.fieldBg ?? theme.palette.background.paper;

    const [year, setYear] = useState(now.getFullYear());
    const [month, setMonth] = useState(now.getMonth() + 1);
    const [currency, setCurrency] = useState('USD');
    const [rows, setRows] = useState([]);
    /** @type {{currency:string,total:number}|null} */
    const [total, setTotal] = useState(null);
    const [busy, setBusy] = useState(false);

    /**
     * Generate report for the selected year, month, and currency.
     * @returns {Promise<void>}
     */
    const onGenerate = async () => {
        try {
            setBusy(true);
            const rates = await fetchRates();
            const report = await getReport(Number(year), Number(month), currency, rates);
            setRows(buildRows(report));
            setTotal(report.total);
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error(err);
            setRows([]);
            setTotal(null);
            alert(err?.message || ALERT_GENERATE_FAIL);
        } finally {
            setBusy(false);
        }
    };

    return (
        <Card sx={{ width: '100%', maxWidth: 900 }}>
            <CardContent>
                <Stack spacing={2}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <TextField
                            label='Year'
                            type='number'
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            inputProps={{ min: 1900, max: 9999 }}
                            fullWidth
                            InputLabelProps={{
                                sx: {
                                    color: accent,
                                    '&.Mui-focused': { color: accent },
                                    '& .MuiInputLabel-asterisk': { color: accent }
                                }
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: fieldBg,
                                    '& fieldset': { borderColor: borderAccent },
                                    '&:hover fieldset': { borderColor: borderAccent },
                                    '&.Mui-focused fieldset': { borderColor: borderAccent }
                                }
                            }}
                        />

                        <TextField
                            label='Month'
                            type='number'
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                            inputProps={{ min: 1, max: 12 }}
                            fullWidth
                            InputLabelProps={{
                                sx: {
                                    color: accent,
                                    '&.Mui-focused': { color: accent },
                                    '& .MuiInputLabel-asterisk': { color: accent }
                                }
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: fieldBg,
                                    '& fieldset': { borderColor: borderAccent },
                                    '&:hover fieldset': { borderColor: borderAccent },
                                    '&.Mui-focused fieldset': { borderColor: borderAccent }
                                }
                            }}
                        />

                        <FormControl fullWidth sx={{ minWidth: 140 }}>
                            <InputLabel
                                id='currency-label'
                                sx={{
                                    color: accent,
                                    '&.Mui-focused': { color: accent },
                                    '& .MuiInputLabel-asterisk': { color: accent }
                                }}
                            >
                                Currency
                            </InputLabel>
                            <Select
                                labelId='currency-label'
                                label='Currency'
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            bgcolor: fieldBg,
                                            color: theme.palette.text.primary,
                                            border: `1px solid ${borderAccent}`,
                                            boxShadow: '0 10px 30px rgba(0,0,0,0.35)'
                                        }
                                    }
                                }}
                                sx={{
                                    backgroundColor: fieldBg,
                                    '& .MuiOutlinedInput-notchedOutline': { borderColor: borderAccent },
                                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: borderAccent },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: borderAccent },
                                    '& .MuiSelect-icon': { color: accent }
                                }}
                            >
                                {CURRENCIES.map((c) => (
                                    <MenuItem
                                        key={c}
                                        value={c}
                                        sx={{
                                            color: theme.palette.text.primary,
                                            '&:hover': {
                                                backgroundColor: theme.palette.mode === 'dark' ? '#1C1C1E' : '#eee'
                                            },
                                            '&.Mui-selected': {
                                                backgroundColor: accent,
                                                color: theme.palette.getContrastText(accent)
                                            },
                                            '&.Mui-selected:hover': { backgroundColor: borderAccent },
                                            '&.Mui-focusVisible': { backgroundColor: accent }
                                        }}
                                    >
                                        {c}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Stack>

                    <div style={{ height: GRID_HEIGHT_PX, width: '100%' }}>
                        <DataGrid
                            rows={rows}
                            columns={COLUMNS}
                            pageSizeOptions={[5, 10]}
                            initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
                            disableRowSelectionOnClick
                            sx={{
                                '& .MuiDataGrid-columnHeaderTitle': { textAlign: 'center', width: '100%' },
                                '& .MuiDataGrid-cell': { textAlign: 'center' },
                                '& .MuiDataGrid-cell:focus': { outline: `2px solid ${accent}` },
                                '& .MuiDataGrid-cell:focus-within': { outline: `2px solid ${accent}` },
                                '& .MuiDataGrid-columnHeader:focus': { outline: `2px solid ${accent}` }
                            }}
                        />
                    </div>
                </Stack>
            </CardContent>

            <CardActions
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    px: 2,
                    pb: 2
                }}
            >
                <Typography variant='h6'>
                    {total ? `Total: ${total.total} ${total.currency}` : TOTAL_PLACEHOLDER}
                </Typography>

                <Button
                    variant='contained'
                    onClick={onGenerate}
                    disabled={busy}
                    sx={{
                        px: 4,
                        py: 1.5,
                        fontSize: '1rem',
                        backgroundColor: accent,
                        '&:hover': { backgroundColor: borderAccent }
                    }}
                >
                    {busy ? BTN_BUSY : BTN_IDLE}
                </Button>
            </CardActions>
        </Card>
    );
}
