/** /src/services/exchange.js
 * Project: Cost Manager Front End
 * File: src/services/exchange.js
 * Description: Service for fetching currency exchange rates from a configured URL.
 * Updated: 2025-09-12
 */

import { getRatesUrl } from './settings';

/** =========================================================================
 * Configurable constants
 * =======================================================================*/

const SUPPORTED_CURRENCIES = ['USD', 'ILS', 'GBP', 'EURO'];
const ERR_NO_URL = 'No exchange rates URL set in Settings.';
const ERR_FETCH_FAIL = 'Failed fetching rates';

/** =========================================================================
 * Service Functions
 * =======================================================================*/

/**
 * Fetch exchange rates JSON from the configured URL.
 * Validates that all supported currencies exist and are numbers.
 * @async
 * @returns {Promise<Record<string, number>>} Exchange rates map
 * @throws {Error} If URL is not set, fetch fails, or rates are invalid
 */
export async function fetchRates() {
    const url = getRatesUrl();
    if (!url) {
        throw new Error(ERR_NO_URL);
    }

    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`${ERR_FETCH_FAIL}: ${res.status}`);
    }

    const data = await res.json();
    SUPPORTED_CURRENCIES.forEach((k) => {
        if (typeof data[k] !== 'number') {
            throw new Error(`Missing/invalid rate: ${k}`);
        }
    });

    return data;
}
