/**
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

const CURRENCIES = ['USD', 'ILS', 'GBP', 'EURO'];
const GRID_HEIGHT_PX = 360;
const BTN_IDLE = 'Generate Report';
const BTN_BUSY = 'Loading…';
const TOTAL_PLACEHOLDER = 'Total: —';

/** @type {import('@mui/x-data-grid').GridColDef[]} */
const COLUMNS = [
    { field: 'date', headerName: 'Date', width: 140, headerAlign: 'center', align: 'center', sortable: true },
    { field: 'category', headerName: 'Category', flex: 1, minWidth: 120, headerAlign: 'center', align: 'center' },
    { field: 'description', headerName: 'Description', flex: 2, minWidth: 120, headerAlign: 'center', align: 'center' },
    { field: 'currency', headerName: 'Currency', width: 120, headerAlign: 'center', align: 'center' },
    { field: 'sum', headerName: 'Sum', width: 120, type: 'number', headerAlign: 'center', align: 'center' }
];

/**
 * Map report costs to DataGrid rows.
 * @param {{ costs: Array<{ sum:number, currency:string, category:string, description:string, date:string }> }} report
 */
function buildRows(report) {
    return report.costs.map((c, i) => ({
        id: i + 1,
        date: new Date(c.date + 'T00:00:00Z').toLocaleDateString('en-GB'),
        category: c.category,
        description: c.description,
        currency: c.currency,
        sum: c.sum
    }));
}

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
    const [total, setTotal] = useState(null);
    const [busy, setBusy] = useState(false);

    const onGenerate = async () => {
        try {
            setBusy(true);
            const rates = await fetchRates();
            const report = await getReport(Number(year), Number(month), currency, rates);
            setRows(buildRows(report));
            setTotal(report.total);
        } catch (err) {
            console.error(err);
            setRows([]);
            setTotal(null);
            alert(err?.message || 'Failed to generate report');
        } finally {
            setBusy(false);
        }
    };

    return (
        <Card sx={{ width: '100%', maxWidth: 900 }}>
            <CardContent>
                <Stack spacing={2}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        {/* Year */}
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
                                    '&.Mui-focused': { color: accent }
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
                        {/* Month */}
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
                                    '&.Mui-focused': { color: accent }
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
                        {/* Currency */}
                        <FormControl fullWidth sx={{ minWidth: 140 }}>
                            <InputLabel
                                id='currency-label'
                                sx={{
                                    color: accent,
                                    '&.Mui-focused': { color: accent }
                                }}
                            >
                                Currency
                            </InputLabel>
                            <Select
                                labelId='currency-label'
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
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
                                            '&.Mui-selected': {
                                                backgroundColor: accent,
                                                color: theme.palette.getContrastText(accent)
                                            },
                                            '&.Mui-selected:hover': { backgroundColor: borderAccent }
                                        }}
                                    >
                                        {c}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Stack>
                    {/* DataGrid */}
                    <div style={{ height: GRID_HEIGHT_PX, width: '100%' }}>
                        <DataGrid
                            rows={rows}
                            columns={COLUMNS}
                            initialState={{
                                sorting: { sortModel: [{ field: 'date', sort: 'asc' }] },
                                pagination: { paginationModel: { pageSize: 5 } }
                            }}
                            pageSizeOptions={[5, 10]}
                            disableRowSelectionOnClick
                            sx={{
                                '& .MuiDataGrid-cell:focus': { outline: `2px solid ${accent}` },
                                '& .MuiDataGrid-cell:focus-within': { outline: `2px solid ${accent}` },
                                '& .MuiDataGrid-columnHeader:focus': { outline: `2px solid ${accent}` }
                            }}
                        />
                    </div>
                </Stack>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant='h6'>
                    {total ? `Total: ${total.total} ${total.currency}` : TOTAL_PLACEHOLDER}
                </Typography>
                <Button
                    variant='contained'
                    onClick={onGenerate}
                    disabled={busy}
                    sx={{
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
