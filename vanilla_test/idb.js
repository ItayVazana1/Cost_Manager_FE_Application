/** vanilla_test/idb.js
 * Project: Cost Manager Front End
 * File: idb.js (Vanilla Version)
 * Description: IndexedDB wrapper with global window.idb API.
 * Updated: 2025-09-10
 */

(function () {

    /** =========================================================================
     * Configurable constants
     * =======================================================================*/
    const DB_NAME = 'costsdb';
    const DB_VERSION = 1;
    const STORE_NAME = 'costs';

    /** =========================================================================
     * Database
     * =======================================================================*/

    /**
     * Open or upgrade the database.
     * @param {string} [databaseName='costsdb'] - Database name.
     * @param {number} [databaseVersion=1] - Database version.
     * @returns {Promise<IDBDatabase>} Promise resolving to the opened database.
     */
    function openCostsDB(databaseName = DB_NAME, databaseVersion = DB_VERSION) {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(databaseName, databaseVersion);

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
    function addCost(cost) {
        return openCostsDB().then((db) => {
            return new Promise((resolve, reject) => {
                const tx = db.transaction(STORE_NAME, 'readwrite');
                const store = tx.objectStore(STORE_NAME);

                const item = {
                    sum: cost.sum,
                    currency: cost.currency,
                    category: cost.category,
                    description: cost.description,
                    date: new Date()
                };

                const request = store.add(item);
                request.onsuccess = () => resolve(item);
                request.onerror = () => reject(request.error);
            });
        });
    }

    /** =========================================================================
     * Queries
     * =======================================================================*/

    /**
     * Get a monthly report with currency conversion.
     * @param {number} year - Full year (e.g., 2025).
     * @param {number} month - Month 1–12.
     * @param {string} [currency='USD'] - Target currency.
     * @param {Record<string,number>} [exchangeRates={USD:1}] - Exchange rates map (USD base).
     * @returns {Promise<{ year:number, month:number, costs:Array, total:{ currency:string, total:number } }>} Promise resolving to the report.
     */
    function getReport(year, month, currency = 'USD', exchangeRates = { USD: 1 }) {
        return openCostsDB().then((db) => {
            return new Promise((resolve, reject) => {
                const tx = db.transaction(STORE_NAME, 'readonly');
                const store = tx.objectStore(STORE_NAME);
                const request = store.getAll();

                request.onsuccess = () => {
                    const allItems = request.result;

                    const filtered = allItems.filter((item) => {
                        const date = new Date(item.date);
                        return date.getFullYear() === year && date.getMonth() + 1 === month;
                    });

                    const costs = filtered.map((item) => ({
                        sum: item.sum,
                        currency: item.currency,
                        category: item.category,
                        description: item.description,
                        Date: { day: new Date(item.date).getDate() }
                    }));

                    const totalUSD = filtered.reduce((sum, item) => {
                        const rate = exchangeRates[item.currency] || 1;
                        return sum + item.sum / rate;
                    }, 0);

                    const converted = totalUSD * (exchangeRates[currency] || 1);

                    resolve({
                        year,
                        month,
                        costs,
                        total: {
                            currency,
                            total: Math.round(converted * 100) / 100
                        }
                    });
                };

                request.onerror = () => reject(request.error);
            });
        });
    }

    /** =========================================================================
     * Global export
     * =======================================================================*/

    /**
     * @typedef {Object} IdbAPI
     * @property {(databaseName?:string, databaseVersion?:number) => Promise<IDBDatabase>} openCostsDB
     * @property {(cost:{sum:number,currency:string,category:string,description:string}) => Promise<Object>} addCost
     * @property {(year:number,month:number,currency?:string,exchangeRates?:Record<string,number>) => Promise<Object>} getReport
     */

    /** @type {IdbAPI} */
    window.idb = {
        openCostsDB,
        addCost,
        getReport
    };
})();
