# Meet JavaScript

> Goals: know what JS is and where it runs, set up your environment, and run your first line of code.

## What Is JavaScript

A web page is made of three parts:

- **HTML** provides structure — what is on the page (headings, buttons, images);
- **CSS** provides style — what it looks like (colors, layout, fonts);
- **JavaScript** provides behavior — what it can do (show a dialog on click, fetch data, switch views).

JS originally ran only in browsers; since Node.js appeared in 2009 it also runs on servers and the command line. Today frontend build tools (Vite, npm), desktop apps (VS Code itself), and mini-programs all run on JS. **Solid JS is the prerequisite for learning Vue, React, or any other frontend framework.**

## Setting Up

You only need three things:

1. **Chrome** — runs your code and ships great debugging tools (DevTools);
2. **VS Code** — your editor; install the `Live Server` extension for auto-reload;
3. **Node.js** (LTS) — no need to dig into it yet; the tooling chapter will use it.

## Running Your First Code

### Option 1: the browser console (fastest)

On any page press `F12` (or right-click → Inspect) to open DevTools, switch to the **Console** panel, and type:

```js
console.log('Hello, JavaScript!')
1 + 1
```

The console is your best "scratch paper" while learning — try any snippet there first.

### Option 2: load from HTML (the standard way)

Create `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>First Page</title>
</head>
<body>
  <h1>Hello</h1>
  <!-- script usually goes at the end of body, so elements load first -->
  <script src="./main.js"></script>
</body>
</html>
```

Create `main.js`:

```js
console.log('Page loaded')
alert('Welcome!')
```

Open it with VS Code's Live Server: the browser shows an alert and the console prints your message.

::: tip console.log is your most important tool
As a beginner, whenever you wonder "what value does this variable hold right now", your first reflex should be `console.log(variable)`. If you can print, you're already halfway to debugging.
:::

## A Few Conventions

- Trailing semicolons are optional — just **be consistent** (this guide omits them, matching the official Vue style);
- Comments: `// single line`, `/* multi line */`;
- Code is case-sensitive: `name` and `Name` are two different variables.

## Exercises

1. Open the Chrome console and print your name and `2026 - your birth year`.
2. Create `index.html` + `main.js`, show an `<h1>` on the page, and print anything to the console.

::: details Reference answer (Q1)
```js
console.log('Alex')
console.log(2026 - 2005)
```
:::
