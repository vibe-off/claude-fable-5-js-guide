# Events

> Goals: listen for user actions; understand the event object; master form values and event delegation; build your first complete interactive app.

An event is **a user action** (click, typing, scroll) or **a browser notification** (page loaded). "Listen for an event + run a callback" is the basic model of all web interactivity.

## Listening for Events

```js
const btn = document.querySelector('#btn')

btn.addEventListener('click', () => {
  console.log('Button clicked')
})
```

Three ingredients: the **target** (btn), the **event type** (click), and the **callback** (what to do).

Common event types:

| Type | Fires when |
| --- | --- |
| `click` | element is clicked |
| `input` | form value changes (every keystroke) |
| `change` | value changed and focus left (typical for selects) |
| `submit` | form is submitted |
| `keydown` | a key is pressed |
| `mouseenter` / `mouseleave` | pointer enters / leaves |
| `scroll` | scrolling |

## The Event Object

The callback's first parameter is the **event object**, carrying the details of the interaction:

```js
input.addEventListener('keydown', e => {
  console.log(e.key)        // which key, e.g. 'Enter'
  if (e.key === 'Enter') {
    console.log('Submit:', input.value)
  }
})

form.addEventListener('submit', e => {
  e.preventDefault()   // stop the default behavior: forms reload the page!
  // ... validation and submission logic
})
```

`e.target` is **the element actually clicked** — the key to event delegation (below).

## Reading Form Values

```js
const nameInput = document.querySelector('#name')
nameInput.value            // text field content (a string!)

const agree = document.querySelector('#agree')
agree.checked              // checkbox state (boolean)

const city = document.querySelector('#city')
city.value                 // the selected option's value
```

## Event Delegation

A list with 100 `<li>` doesn't need 100 listeners — attach one listener to the parent and use **event bubbling** (child events travel upward), then check `e.target`:

```js
ul.addEventListener('click', e => {
  if (e.target.tagName === 'LI') {
    e.target.classList.toggle('done')
  }
})
```

Benefits: better performance, and **items created later automatically work too**. A high-frequency interview topic.

## Capstone: a Todo List

This exercises everything in the Fundamentals tier — complete it on your own:

```html
<input id="task" placeholder="Type a task, press Enter">
<ul id="list"></ul>
```

```js
const input = document.querySelector('#task')
const list = document.querySelector('#list')
const todos = []

function render() {
  list.innerHTML = todos
    .map((t, i) => `<li>${t} <button data-index="${i}">Delete</button></li>`)
    .join('')
}

// Add on Enter
input.addEventListener('keydown', e => {
  if (e.key === 'Enter' && input.value.trim() !== '') {
    todos.push(input.value.trim())
    input.value = ''
    render()
  }
})

// Delete via event delegation
list.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    todos.splice(Number(e.target.dataset.index), 1)
    render()
  }
})
```

Note the architecture: **the data (the todos array) is the single source of truth; the page is always rendered from the data**. Actions only modify data, then call `render()`. This is precisely Vue's core idea — when you reach Vue, you'll see it simply automates `render()`.

## Exercises

1. Build a counter: `+1` / `-1` buttons and a number display; the count must not go below 0.
2. Build a theme picker: clicking color buttons changes the page background.
3. Add a "clear all" button and a task counter to the todo list.
4. (Challenge) Add a "done" state to each todo: clicking the text toggles a strikethrough (hint: store objects `{ text, done }`).
