# 🧭 JavaScript Style & Documentation Guidelines (JS_style_and_doc_guideline)

This guideline defines the required style, naming, and code organization rules for JavaScript development. Follow these rules carefully in all your code. fileciteturn1file0

---

## 1. Variable Declarations
- Always declare variables with `let` or `const` (never leave variables undeclared).  
- Use `const` when the variable should not change.  
- Use `let` for variables that will be reassigned.  

---

## 2. Semicolons
- End **every statement** with a semicolon. This makes the code more consistent and avoids automatic insertion issues.  

---

## 3. Functions Inside Blocks
- Do not declare functions directly inside blocks like `if` or `for`.  
- If you need a function inside a block, assign an **anonymous function** to a variable.  

```js
if (num > 10) {
  const sum = function(a, b) { return a + b; };
}
```

---

## 4. Custom Exceptions
- Create and use specific exception objects to describe errors clearly.  
- Exceptions should carry details that help identify the cause.  

```js
function CostException(msg, id) {
  this.message = msg;
  this.id = id;
}
throw new CostException("Invalid amount", 1234);
```

---

## 5. Avoid Wrapper Objects
- Do not use `new Boolean()`, `new Number()`, or `new String()`.  
- These create objects instead of simple values and can cause unexpected behavior.  

```js
// Avoid
const state = new Boolean(false);
if (state) { /* this will run because objects are always truthy */ }
```

---

## 6. Constructors and Prototypes
- Attach new fields to the object in the constructor.  
- Attach methods to the prototype to keep them shared between instances.  

```js
function Rectangle(w, h) {
  this.width = w;
  this.height = h;
}
Rectangle.prototype.area = function() {
  return this.width * this.height;
};
```

---

## 7. Avoid `with`
- Never use the `with` statement. It makes variable resolution unclear and can cause bugs.  

---

## 8. Using `this`
- Use `this` only inside constructors and methods of objects.  
- Do not use `this` in arbitrary functions unless bound explicitly.  

---

## 9. Naming Rules
- Functions and variables: use **camelCase** (example: `totalAmount`).  
- Constructor functions: start with an **uppercase** letter (example: `TaskManager`).  
- File names: use only **lowercase** letters.  
- Object properties: use **camelCase** if multiple words.  

---

## 10. Namespaces
- To avoid polluting the global scope, group related functions and properties under one object.  

```js
const utils = {};
utils.calculate = function(a, b) { return a + b; };
```

---

## 11. Avoid Global Scope
- Do not define variables or functions in the global scope unless absolutely necessary.  
- Always encapsulate inside objects, functions, or modules.  

---

## 12. Strings
- Prefer single quotes `'text'` for string literals.  
- Do not split strings across multiple physical lines.  
- Use concatenation or template literals for multiline strings.  

```js
const str = 'hello world, ' +
            'this is a combined string';
```

---

## 13. Arrays
- Always create arrays using literal notation `[]`.  
- Avoid using the `Array` constructor.  

```js
const items = [1, 2, 3];
```

---

## 14. XMLHttpRequest / Ajax Validation
- When using XMLHttpRequest, always check:  
  - `status === 200` (successful response)  
  - `readyState === 4` (done)  

```js
const request = new XMLHttpRequest();
request.open('GET', '/data.json', true);
request.onreadystatechange = function() {
  if (request.readyState === 4 && request.status === 200) {
    console.log(request.responseText);
  }
};
request.send();
```

---

## 15. Comments
- Use comments to explain code sections and important logic.  
- Place documentation comments at the top of every file and function.  
- Keep comments clear, short, and relevant.  

---

Following these rules ensures that JavaScript code remains **consistent, reliable, and easy to review**. fileciteturn1file0
