# 💰 Cost Manager Front End
### Final Project in Front-End Development

---

⚠️ **Important Note**  
This document might change during the weeks till the semester ends.  
If changes take place, they will be listed at the bottom of this document.  
Changes will be introduced only to clarify the requirements.  
The requirements themselves won’t change.  
Make sure your final project meets the requirements listed here by the end of the semester.  

For clarifications, the fastest way is to write each question as a separate post in our course’s forum.  
Follow this forum to verify that your interpretation is accurate.  

---

## 📖 Introduction
The final project includes the development of the **front end of a website** that works as a **cost manager application**.  
The UI will be in **English**, and the main currency will be **USD**.  

---

## 🗄️ Database
- The database must be **IndexedDB**.  
- You are free to select as many object stores as needed.  

---

## 📝 Application Requirements
1. Users can **add new cost items** (sum, currency, category, description).  
   - The date attached to each cost item is the date on which it was added.  

2. Users can get a **detailed report** for a specific month and year (in a chosen currency).  
   - You must develop a **separate library (idb.js)** that wraps IndexedDB using **Promises**.  
   - Two versions of `idb.js` are required:  
     - One version compatible with **modules** (for React).  
     - One simple vanilla JS file for **automatic testing**.  
   - The submitted `idb.js` must be the **vanilla version**.  

3. Users can get a **Pie Chart** showing total costs for a selected month and year, grouped by category.  

4. Users can get a **Bar Chart** showing total costs for each month in a selected year.  

5. When showing a chart (pie or bar), the user can select a currency and get results in that currency.  
   - Supported currencies: **USD, ILS, GBP, EURO**.  
   - These four are also the symbols used in the code.  
   - Exchange rates must be retrieved from a **server-side** via **Fetch API**.  
   - The server-side can be:  
     - an existing server,  
     - or one you develop/deploy,  
     - or even a static JSON file placed on a server connected to the web.  

6. The app must include a **Settings option** to specify the **URL** for getting exchange rates.  
   - Assume the reply includes the header:  
     ```
     Access-Control-Allow-Origin: *
     ```  
   - Assume the reply is JSON of the form:  
     ```json
     { "USD":1, "GBP":1.8, "EURO":0.7, "ILS":3.4 }
     ```  

---

## 📚 The idb.js Library
The **vanilla version** of `idb.js` must define the following functions.  
When adding it via `<script>` to an HTML file, the `db` property should be added to the **global object**.

### `openCostsDB(databaseName, databaseVersion)`
- Takes a DB name (string) and version (number).  
- Returns a **Promise** that resolves to the DB object.  

### `addCost(cost)`
- Adds a new cost item.  
- Argument: object with { sum (number), currency (string), category (string), description (string) }.  
- Returns a **Promise** that resolves to the added cost item (same structure).  

### `getReport(year, month, currency)`
- Returns a **Promise** that resolves to a report object for the specified month, year, and currency.  
- Example output:  
```json
{
  "year": 2025,
  "month": 9,
  "costs": [
    {
      "sum":200,
      "currency":"USD",
      "category":"Food",
      "description":"Milk 3%",
      "Date":{"day":12}
    },
    {
      "sum":120,
      "currency":"GBP",
      "category":"Education",
      "description":"Zoom License",
      "Date":{"day":18}
    }
  ],
  "total": { "currency":"USD", "total":440 }
}
```  

---

## 🎨 User Interface
- Must be developed using **React** + **MUI components library**.  
- Must be compatible with **desktop web browsers**.  

---

## 🌍 Deployment
- Deploy the final project on a server connected to the web (e.g., **Render.com**).  
- At the end, the team manager must fill in the provided form (URL will be given).  
- One of the inputs: the project’s running URL.  
- Project must work correctly on **Google Chrome (latest version)**.  

---

## ✍️ Code Style
- JavaScript code must follow this style guide:  
  [StyleJS Rules](http://www.abelski.com/courses/stylejs/languagerules.pdf)  
- Add comments appropriately.  

---

## 📤 Submission Guidelines
1. Create a **short video (≈60s)** showing the project running.  
   - Upload to YouTube as **unlisted**.  

2. Submit three files only:  
   - ZIP of project (delete `node_modules` first).  
   - PDF with all code.  
   - `idb.js` (vanilla version).  

3. PDF file:  
   - Include all code files you wrote.  
   - Lines must not be broken; code left-aligned.  
   - File must be properly organized for code review.  
   - File name = `<firstname>_<lastname>.pdf` (team manager).  

4. At the beginning of the PDF, include:  
   a) Team manager first & last name.  
   b) Each member’s full details (name, ID, mobile, email).  
   c) Clickable YouTube video link.  
   d) Optional: additional guidelines/comments.  

5. Submission:  
   - Only team manager submits the 3 files (ZIP, PDF, idb.js).  
   - Treat the Moodle deadline as **30 min earlier** due to server time difference.  
   - No late submissions accepted.  
   - Projects by a single student not accepted.  
   - Extensions handled only via official college guidelines, separately.  

6. Deadline: (to be filled).  
   - On the specified date, there will be an **online meeting** to test the projects with team managers.  
   - If manager unavailable, another team member may attend.  

---

## 🧪 Testing Sample for idb.js
The following is a **sample HTML** to test `idb.js`.  
Note: the grading team may use a different test script.

```html
<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <title>Test idb.js</title>
</head>
<body>
   <script src="idb.js"></script>
   <script>
     async function test() {
       const db = await idb.openCostsDB("costsdb",1);
       const result1 = await db.addCost({sum:200, currency:"USD", category:"FOOD", description:"pizza"});
       const result2 = await db.addCost({sum:400, currency:"USD", category:"CAR", description:"fuel"});

       if(db) console.log("creating db succeeded");
       if(result1) console.log("adding 1st cost item succeeded");
       if(result2) console.log("adding 2nd cost item succeeded");
     }
     test()
   </script>
</body>
</html>
```