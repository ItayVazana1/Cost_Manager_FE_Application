# 💰 Cost Manager Front End
Final project in **Front-End Development** course.  
A web application to manage expenses, generate reports, and visualize data.

---

## ✨ Features
- **Add Costs**: sum, currency (USD, ILS, GBP, EURO), category, description.
- **Monthly Report**: filter by year/month/currency, with totals converted to selected currency.
- **Charts**:
  - Pie Chart: monthly totals by category.
  - Bar Chart: yearly totals per category by month.
- **Settings**:
  - Configure **exchange rates URL** (with CORS).
  - Reset data (clear IndexedDB) with confirmation.
- **Persistence**: IndexedDB (via custom `idb.js` library).
- **Vanilla `idb.js`** version for testing outside React.
- **Theme**: Custom MUI theme with neutralized focus/selection colors.

---

## 🧱 Tech Stack
- **React 19** + **MUI 7** (Material UI, MUI System, MUI Lab, MUI X Charts, MUI X DataGrid)  
- **Routing**: React Router DOM 7  
- **Storage**: IndexedDB (wrapped by custom `idb.js`)  
- **Styling**: MUI Theme + CSS (glassy UI, gradient titles, custom footer)  
- **Utilities**: Fetch API for currency rates, LocalStorage for settings  

---

## 📁 Project Structure
```txt
/cost-manager-frontend
├── .gitignore
├── docs/
│   ├── Cost_Manager_Front_End.md
│   └── JS_style_and_doc_guideline.md
├── package-lock.json
├── package.json
├── README.md
├── public/
│   ├── index.html
│   └── resources/icons/…
├── src/
│   ├── App.js
│   ├── index.js
│   ├── theme.js
│   ├── components/
│   ├── pages/
│   ├── services/
│   │   ├── exchange.js
│   │   ├── idb.js         ← React module version
│   │   └── settings.js
│   └── styles/
└── vanilla_test/
    ├── idb.js             ← **Vanilla version for submission**
    └── test.html
```

---

## 🚀 Getting Started

### 1) Prerequisites
- Node.js LTS  
- Latest Google Chrome  

### 2) Install
```bash
npm install
```

### 3) Run in Development
```bash
npm start
```
App will be available at: [http://localhost:3000](http://localhost:3000)

### 4) Build for Production
```bash
npm run build
```

### 5) Refresh Lockfile
```bash
npm run refresh-lock
```

---

## ⚙️ Scripts
```json
{
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject",
  "refresh-lock": "rimraf node_modules package-lock.json && npm install"
}
```

---

## 🌍 Deployment
- Deploy on a public server (e.g., **Render.com**).  
- Ensure it runs correctly on the latest **Chrome**.  
- Configure **Exchange Rates URL** in Settings → must respond with JSON:  
  ```json
  { "USD": 1, "GBP": 1.8, "EURO": 0.7, "ILS": 3.4 }
  ```
  And include the header:  
  ```
  Access-Control-Allow-Origin: *
  ```

---

## 📤 Submission Guidelines
Submit **3 files only**:
1. **ZIP** of the project (without `node_modules/`).  
2. **PDF** with all code (unbroken lines, left-aligned, team details at top, plus unlisted YouTube demo link).  
3. **`vanilla_test/idb.js`** (vanilla IndexedDB wrapper).  

*Only the team manager submits. Treat Moodle deadline as **30 minutes earlier**.*  

---

## 🧩 Style & Documentation
- Follow [JS Style & Documentation Guidelines](./docs/JS_style_and_doc_guideline.md).  
- Key rules:  
  - Use `const`/`let`, avoid `var`.  
  - Always end statements with semicolons.  
  - camelCase for variables/functions, PascalCase for components/constructors.  
  - JSDoc at top of every file + for each function.  
  - No `with`, no wrapper objects (`new Boolean`, `new String`, etc).  
  - Centralized theme tokens in `src/theme.js`.  

---

## 🔒 Data & Privacy
- All expenses are stored **locally** in the browser (**IndexedDB**).  
- Exchange rates are fetched from a configurable URL.  
