/** /src/services/idb.js
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
 * @param {string} [dbName='costsdb'] - Database name.
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
 * @returns {Promise<{ sum:number, currency:string, category:string, description:string, date:Date }>} Promise resolving to the stored item.
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
 * @param {number} year - Full year (e.g., 2025).
 * @param {number} month - Month 1–12.
 * @param {string} [targetCurrency='USD'] - Target currency.
 * @param {Record<string, number>} [exchangeRates={ USD:1 }] - Exchange rates map (USD base).
 * @returns {Promise<{ year:number, month:number, costs:Array, total:{ currency:string, total:number } }>} Promise resolving to the report.
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

    const filteredCosts = allItems.filter((item) => {
        const date = new Date(item.date);
        return date.getFullYear() === year && date.getMonth() + 1 === month;
    });

    const costsWithDay = filteredCosts.map((item) => ({
        sum: item.sum,
        currency: item.currency,
        category: item.category,
        description: item.description,
        date: { day: new Date(item.date).getDate() }
    }));

    const totalUSD = filteredCosts.reduce((sum, item) => {
        const rate = exchangeRates[item.currency] || 1;
        return sum + item.sum / rate;
    }, 0);

    const convertedTotal = totalUSD * (exchangeRates[targetCurrency] || 1);

    return {
        year,
        month,
        costs: costsWithDay,
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
