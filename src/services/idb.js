/**
 * Project: Cost Manager Front End
 * File: src/services/idb.js
 * Description: IndexedDB helper module for cost item storage and reporting.
 * Updated: 2025-09-12
 */

const DB_NAME = 'costsdb';
const DB_VERSION = 1;
const STORE_NAME = 'costs';

/** =========================================================================
 * Database
 * =======================================================================*/

/**
 * Open or upgrade the database.
 * @param {string} [dbName='costsdb] - Database name.
 * @param {number} [dbVersion=1] - Database version.
 * @returns {Promise<IDBDatabase>} Promise resolving to the opened database.
 */
export function openCostsDB(dbName = DB_NAME, dbVersion = DB_VERSION) {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, dbVersion);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                const store = db.createObjectStore(STORE_NAME, {
                    keyPath: 'id',
                    autoIncrement: true
                });
                store.createIndex('date', 'date', { unique: false });
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

/** =========================================================================
 * Mutations
 * =======================================================================*/

/**
 * Add a new cost item.
 * @param {{ sum:number, currency:string, category:string, description:string }} cost - Cost payload.
 * @returns {Promise<{ id?:number, sum:number, currency:string, category:string, description:string, date:Date }>} Stored item.
 */
export async function addCost(cost) {
    const db = await openCostsDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);

    const item = {
        sum: cost.sum,
        currency: cost.currency,
        category: cost.category,
        description: cost.description,
        date: new Date()
    };

    return new Promise((resolve, reject) => {
        const request = store.add(item);
        request.onsuccess = () => resolve(item);
        request.onerror = () => reject(request.error);
    });
}

/** =========================================================================
 * Queries
 * =======================================================================*/

/**
 * Get a monthly report with currency conversion.
 * Each cost will contain `date` as ISO string (YYYY-MM-DD).
 * @param {number} year - Full year (e.g., 2025).
 * @param {number} month - Month 1–12.
 * @param {string} [targetCurrency='USD'] - Target currency.
 * @param {Record<string, number>} [exchangeRates={ USD:1 }] - Exchange rates map (USD base).
 * @returns {Promise<{
 *   year:number,
 *   month:number,
 *   costs:Array<{sum:number,currency:string,category:string,description:string,date:string}>,
 *   total:{ currency:string, total:number }
 * }>}
 */
export async function getReport(year, month, targetCurrency = 'USD', exchangeRates = { USD: 1 }) {
    const db = await openCostsDB();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);

    const request = store.getAll();
    const allItems = await new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });

    // Filter for the requested (year, month)
    const filteredCosts = allItems.filter((item) => {
        const d = new Date(item.date);
        return d.getFullYear() === year && d.getMonth() + 1 === month;
    });

    // Normalize to ISO date (YYYY-MM-DD) in UTC to avoid TZ drift
    const costsWithDate = filteredCosts.map((item) => {
        const d = new Date(item.date);
        const iso = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
            .toISOString()
            .slice(0, 10);
        return {
            sum: item.sum,
            currency: item.currency,
            category: item.category,
            description: item.description,
            date: iso
        };
    });

    // Sum in USD (assuming exchangeRates are relative to USD)
    const totalUSD = filteredCosts.reduce((acc, item) => {
        const rate = exchangeRates[item.currency] || 1;
        return acc + item.sum / rate;
    }, 0);

    // Convert to target currency
    const convertedTotal = totalUSD * (exchangeRates[targetCurrency] || 1);

    return {
        year,
        month,
        costs: costsWithDate,
        total: {
            currency: targetCurrency,
            total: Math.round(convertedTotal * 100) / 100
        }
    };
}

/** =========================================================================
 * Maintenance
 * =======================================================================*/

/**
 * Clear all records from the "costs" object store.
 * @returns {Promise<void>} Promise that resolves when clearing completes.
 */
export async function clearAll() {
    const db = await openCostsDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    return new Promise((resolve, reject) => {
        const r = store.clear();
        r.onsuccess = () => resolve();
        r.onerror = () => reject(r.error);
    });
}

/**
 * Delete the entire database.
 * @param {string} [name='costsdb'] - Database name.
 * @returns {Promise<void>} Promise that resolves when deletion completes.
 */
export function deleteDB(name = DB_NAME) {
    return new Promise((resolve, reject) => {
        const req = indexedDB.deleteDatabase(name);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
        req.onblocked = () => reject(new Error('Delete blocked: database is open in another tab or context.'));
    });
}
