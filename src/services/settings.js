/** /src/services/settings.js
 * Project: Cost Manager Front End
 * File: src/services/settings.js
 * Description: Local storage helper for persisting and retrieving the exchange rates URL.
 * Updated: 2025-09-12
 */

const KEY = 'exchangeRatesUrl';

/** =========================================================================
 * Service Functions
 * =======================================================================*/

/**
 * Get the saved exchange rates URL from localStorage.
 * @returns {string} Stored URL or empty string if not set.
 */
export function getRatesUrl() {
    return localStorage.getItem(KEY) || '';
}

/**
 * Save the exchange rates URL to localStorage.
 * @param {string} url - Exchange rates URL.
 * @returns {void}
 */
export function setRatesUrl(url) {
    localStorage.setItem(KEY, url.trim());
}
