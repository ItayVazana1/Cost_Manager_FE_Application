/** /src/components/ChartsPanel.jsx
 * Project: Cost Manager Front End
 * File: src/components/ChartsPanel.jsx
 * Description: Responsive controls with side-by-side Pie and Stacked Bar charts for costs visualization.
 * Updated: 2025-09-12
 */

import React, { useMemo, useState } from 'react';
import {
    Card,
    CardContent,
    Stack,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Typography,
    Box
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { PieChart, BarChart } from '@mui/x-charts';
import { fetchRates } from '../services/exchange';
import { getReport } from '../services/idb';

const CURRENCIES = ['USD', 'ILS', 'GBP', 'EURO'];

/** =========================================================================
 * Configurable constants
 * =======================================================================*/

const DEFAULT_CHART_HEIGHT_MD = 420;
const DEFAULT_CHART_HEIGHT_SM = 380;
const BTN_BUILD_IDLE = 'Build Charts';
const BTN_BUILD_BUSY = 'Building…';
const PIE_TITLE_PREFIX = 'Monthly by Category';
const BAR_TITLE_PREFIX = 'Yearly Totals by Category';
const ALERT_BUILD_FAIL = 'Failed generating charts';

/** =========================================================================
 * Category color map
 * =======================================================================*/

/** @type {Record<string, string>} */
const categoryColors = {
    Food: '#1976d2',
    Transportation: '#f57c00',
    Housing: '#2e7d32',
    Utilities: '#aad4e8',
    Health: '#d32f2f',
    Education: '#9c27b0',
    Entertainment: '#ff9800',
    Shopping: '#6d4c41',
    Travel: '#00796b',
    Other: '#757575'
};

/** =========================================================================
 * Utils
 * =======================================================================*/

/**
 * Convert amount between currencies using USD-based rates.
 * @param {number|string} amount
 * @param {string} fromCurrency
 * @param {string} toCurrency
 * @param {Record<string, number>} rates
 * @returns {number}
 */
function convert(amount, fromCurrency, toCurrency, rates) {
    if (!rates) return Number(amount) || 0;
    if (fromCurrency === toCurrency) return Number(amount) || 0;
    const fromRate = rates[fromCurrency] || 1;
    const toRate = rates[toCurrency] || 1;
    return (Number(amount) / fromRate) * toRate;
}

/**
 * Build pie-series data from a monthly report.
 * @param {{ costs: Array<{category:string,sum:number,currency:string}> }} report
 * @param {string} targetCurrency
 * @param {Record<string,number>} rates
 * @returns {{ id: string, label: string, value: number }[]}
 */
function buildPie(report, targetCurrency, rates) {
    const byCat = {};
    (report?.costs ?? []).forEach((c) => {
        const val = convert(c.sum, c.currency, targetCurrency, rates);
        byCat[c.category] = (byCat[c.category] || 0) + val;
    });
    return Object.entries(byCat).map(([label, value]) => ({
        id: label,
        label,
        value: Math.round(value * 100) / 100
    }));
}

/**
 * Build stacked bar data for a full year.
 * @param {number} year
 * @param {string} targetCurrency
 * @param {Record<string,number>} rates
 * @returns {Promise<{ months: string[], series: Array<{ label: string, data: number[], color: string }> }>}
 */
async function buildStackedBar(year, targetCurrency, rates) {
    const months = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
    const reports = await Promise.all(
        months.map((m) => getReport(year, Number(m), targetCurrency, rates))
    );

    const categorySet = new Set();
    reports.forEach((r) => (r?.costs ?? []).forEach((c) => categorySet.add(c.category)));
    const categories = Array.from(categorySet);

    const monthCategoryTotals = reports.map((r) => {
        const map = {};
        (r?.costs ?? []).forEach((c) => {
            const v = convert(c.sum, c.currency, targetCurrency, rates);
            map[c.category] = (map[c.category] || 0) + v;
        });
        return map;
    });

    return {
        months,
        series: categories.map((cat) => ({
            label: cat,
            data: monthCategoryTotals.map((m) => Math.round((m[cat] || 0) * 100) / 100),
            color: categoryColors[cat] || '#9e9e9e'
        }))
    };
}

/** =========================================================================
 * Component
 * =======================================================================*/

/**
 * ChartsPanel component rendering controls and charts.
 * @returns {JSX.Element}
 */
export default function ChartsPanel() {
    const theme = useTheme();
    const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
    const chartColors = theme.custom.forms.charts;
    const now = new Date();

    const [year, setYear] = useState(now.getFullYear());
    const [month, setMonth] = useState(now.getMonth() + 1);
    const [currency, setCurrency] = useState('USD');
    const [pieData, setPieData] = useState([]);
    const [barData, setBarData] = useState({ months: [], series: [] });
    const [loading, setLoading] = useState(false);

    const panelHeight = isMdUp ? DEFAULT_CHART_HEIGHT_MD : DEFAULT_CHART_HEIGHT_SM;
    const monthLabel = useMemo(() => `${String(month).padStart(2, '0')}/${year}`, [month, year]);

    /**
     * Fetch data, build charts, and set state.
     * @returns {Promise<void>}
     */
    const onBuild = async () => {
        try {
            setLoading(true);
            const rates = await fetchRates();
            const report = await getReport(Number(year), Number(month), currency, rates);
            setPieData(buildPie(report, currency, rates));
            const bar = await buildStackedBar(Number(year), currency, rates);
            setBarData(bar);
        } catch (e) {
            alert(e?.message || ALERT_BUILD_FAIL);
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const chartKey = `${year}-${String(month).padStart(2, '0')}-${currency}`;

    return (
        <Card sx={{ width: '100%', maxWidth: 1600, mx: 'auto' }}>
            <CardContent>
                <Stack spacing={4}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ width: '100%', maxWidth: 700 }}>
                            <TextField
                                label='Year'
                                type='number'
                                value={year}
                                onChange={(e) => setYear(Number(e.target.value))}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': { borderColor: chartColors.border },
                                        '&:hover fieldset': { borderColor: chartColors.border },
                                        '&.Mui-focused fieldset': { borderColor: chartColors.border }
                                    },
                                    '& label': { color: chartColors.label },
                                    '& label.Mui-focused': { color: chartColors.label }
                                }}
                            />
                            <TextField
                                label='Month'
                                type='number'
                                value={month}
                                onChange={(e) => setMonth(Number(e.target.value))}
                                inputProps={{ min: 1, max: 12 }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': { borderColor: chartColors.border },
                                        '&:hover fieldset': { borderColor: chartColors.border },
                                        '&.Mui-focused fieldset': { borderColor: chartColors.border }
                                    },
                                    '& label': { color: chartColors.label },
                                    '& label.Mui-focused': { color: chartColors.label }
                                }}
                            />
                            <FormControl sx={{ minWidth: 140 }}>
                                <InputLabel
                                    id='currency-lab'
                                    sx={{
                                        color: chartColors.label,
                                        '&.Mui-focused': { color: chartColors.label }
                                    }}
                                >
                                    Currency
                                </InputLabel>
                                <Select
                                    labelId='currency-lab'
                                    label='Currency'
                                    value={currency}
                                    onChange={(e) => setCurrency(e.target.value)}
                                    sx={{
                                        '& .MuiOutlinedInput-notchedOutline': { borderColor: chartColors.border },
                                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: chartColors.border },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: chartColors.border }
                                    }}
                                >
                                    {CURRENCIES.map((c) => (
                                        <MenuItem key={c} value={c}>{c}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Button
                                variant='contained'
                                onClick={onBuild}
                                disabled={loading}
                                sx={{
                                    backgroundColor: chartColors.label,
                                    color: chartColors.border,
                                    fontWeight: 600,
                                    '&:hover': { backgroundColor: '#dfa3b5' }
                                }}
                            >
                                {loading ? BTN_BUILD_BUSY : BTN_BUILD_IDLE}
                            </Button>
                        </Stack>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Card variant='outlined' sx={{ height: panelHeight, display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ p: 2, display: 'flex', flexDirection: 'column', flex: 1 }}>
                                    <Typography variant='subtitle1' sx={{ mb: 1 }}>
                                        {PIE_TITLE_PREFIX} ({monthLabel})
                                    </Typography>
                                    <Box sx={{ flex: 1 }}>
                                        {pieData.length > 0 ? (
                                            <PieChart
                                                key={`pie-${chartKey}`}
                                                series={[
                                                    {
                                                        data: pieData.map((item) => ({
                                                            ...item,
                                                            color: categoryColors[item.id] || '#9e9e9e'
                                                        }))
                                                    }
                                                ]}
                                                height={panelHeight - 72}
                                            />
                                        ) : (
                                            <Typography variant='body2' color='text.secondary'>
                                                Build charts to see data.
                                            </Typography>
                                        )}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>

                        <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Card variant='outlined' sx={{ height: panelHeight, display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ p: 2, display: 'flex', flexDirection: 'column', flex: 1 }}>
                                    <Typography variant='subtitle1' sx={{ mb: 1 }}>
                                        {BAR_TITLE_PREFIX} ({year})
                                    </Typography>
                                    <Box sx={{ flex: 1 }}>
                                        {barData.series.length > 0 ? (
                                            <BarChart
                                                key={`bar-${chartKey}`}
                                                xAxis={[{ scaleType: 'band', data: barData.months }]}
                                                series={barData.series}
                                                height={panelHeight - 72}
                                            />
                                        ) : (
                                            <Typography variant='body2' color='text.secondary'>
                                                Build charts to see data.
                                            </Typography>
                                        )}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
}
