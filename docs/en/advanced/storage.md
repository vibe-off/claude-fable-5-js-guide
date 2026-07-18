# Browser Storage

> Goals: persist data with localStorage; know which storage option fits which scenario.

Refresh the page and every JS variable resets. To make data survive (remembering a login, saving a todo list), you need browser storage.

## localStorage

The workhorse: **permanent storage** (until deleted), shared across all pages of the same site:

```js
localStorage.setItem('username', 'Amy')    // write
localStorage.getItem('username')           // read: 'Amy', or null if absent
localStorage.removeItem('username')        // delete one key
localStorage.clear()                       // wipe everything
```

### Objects and arrays: JSON required

localStorage **stores strings only** — storing an object directly yields a useless `[object Object]`:

```js
const todos = [{ text: 'study', done: false }]

localStorage.setItem('todos', JSON.stringify(todos))          // write: object → string
const saved = JSON.parse(localStorage.getItem('todos')) ?? [] // read: string → object, empty-array fallback
```

::: warning Two guaranteed pitfalls
1. Forgetting `JSON.stringify/parse` — you end up storing `[object Object]`;
2. On first visit `getItem` returns `null`; `JSON.parse(null)` gives null, and a later `.map` crashes — always add the `?? []` fallback.
:::

## sessionStorage and Cookies

| Option | Lifetime | Size | Typical use |
| --- | --- | --- | --- |
| `localStorage` | permanent (manual delete) | ~5MB | theme preference, drafts, offline data |
| `sessionStorage` | cleared when the tab closes | ~5MB | per-session temporary data |
| Cookie | configurable expiry | ~4KB | login credentials (sent to the server with every request) |

`sessionStorage` has exactly the same API as `localStorage`. Cookies are usually set by the backend — awareness is enough; modern apps more often keep a token in localStorage and send it in a request header.

## Hands-On: Persisting the Todo List

Two extra lines make the [todo list](/en/basics/events#capstone-a-todo-list) survive refreshes:

```js
// On startup: read from storage
const todos = JSON.parse(localStorage.getItem('todos')) ?? []

function save() {
  localStorage.setItem('todos', JSON.stringify(todos))
}

// After every add/delete/toggle, call save() alongside render()
```

In DevTools → **Application** panel → Local Storage, you can inspect, edit, and delete what's stored.

## Exercises

1. "Remember me": an input and a save button; store the name in localStorage and refill it automatically after refresh.
2. Theme toggle: a button switches dark/light (toggling a body class); persist the choice and restore it on load.
3. Complete the todo-list persistence and verify it in the Application panel.

::: details Reference answer (Q2)
```js
// On load: restore the saved theme
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark')
}

btn.addEventListener('click', () => {
  document.body.classList.toggle('dark')
  const theme = document.body.classList.contains('dark') ? 'dark' : 'light'
  localStorage.setItem('theme', theme)
})
```
:::
