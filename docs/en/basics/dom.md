# Working with the DOM

> Goals: select page elements; change content, styles, and attributes; create elements dynamically.

The DOM (Document Object Model) is the **object tree** the browser builds from your HTML. JS changes the page by manipulating this tree — that's how web pages "move".

```
document
└── html
    ├── head
    └── body
        ├── h1
        └── ul
            ├── li
            └── li
```

::: tip Why learn the DOM before Vue
Vue "operates the DOM automatically" for you — but you need to know what it automates, or you won't know where to look when something breaks. Interviews also test raw DOM regularly.
:::

## Selecting Elements

```js
// Preferred: CSS selector syntax — write it exactly like CSS
const title = document.querySelector('#title')      // by id
const box = document.querySelector('.box')          // by class, first match only
const items = document.querySelectorAll('ul li')    // all matches (array-like)

// querySelectorAll results support forEach
items.forEach(li => console.log(li))
```

When nothing matches you get `null`, and reading a property on it throws the classic `Cannot read properties of null` — usually a mistyped selector, or the script ran before the element existed (put `<script>` at the end of body).

## Changing Content

```js
title.textContent = 'Plain text only'
box.innerHTML = '<strong>Parses tags</strong>'
```

::: warning innerHTML and security
Injecting **user input** into `innerHTML` opens the door to XSS attacks (a user typing `<script>` with malicious code). Always display user input with `textContent`.
:::

## Changing Styles and Classes

```js
box.style.backgroundColor = 'pink'   // inline style: CSS property → camelCase
box.style.width = '200px'            // values are strings — don't forget units

// Better: define classes in CSS, let JS only toggle them
box.classList.add('active')
box.classList.remove('active')
box.classList.toggle('active')       // add if absent, remove if present
box.classList.contains('active')     // is it there?
```

## Changing Attributes

```js
const img = document.querySelector('img')
img.src = './new.png'
img.alt = 'New image'

const input = document.querySelector('input')
input.value = 'Default text'      // form values use value, not textContent!
input.disabled = true
```

## Creating and Removing Elements

```js
const ul = document.querySelector('ul')

const li = document.createElement('li')   // create
li.textContent = 'A new item'
ul.appendChild(li)                        // append at the end

li.remove()                               // remove itself
```

### Rendering a List: Data-Driven Thinking

**Rendering a page from an array** is the single most important practical pattern — it is exactly what Vue's `v-for` does:

```js
const list = ['HTML', 'CSS', 'JavaScript']
const ul = document.querySelector('ul')

ul.innerHTML = list.map(item => `<li>${item}</li>`).join('')
```

Absorb the mindset: **don't poke at the page piece by piece — shape the data first, then generate the page in one go**. When the data changes, just re-render.

## Exercises

1. Put a `<p id="text">` on the page; set its content to the current time (`new Date().toLocaleString()`).
2. Put an empty `<ul>` on the page and render the `goodsList` data from the previous section — each `<li>` shows "name — price".
3. Building on Q2: products with zero stock get a `.sold-out` class (style it gray with a strikethrough in CSS).

::: details Reference answer (Q3)
```js
ul.innerHTML = goodsList
  .map(g => `<li class="${g.stock === 0 ? 'sold-out' : ''}">
    ${g.name} — $${g.price}
  </li>`)
  .join('')
```
:::
