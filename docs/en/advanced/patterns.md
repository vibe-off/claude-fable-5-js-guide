# Common Techniques

> Goals: master the classics that score in both interviews and real work: debounce & throttle, deep vs. shallow copies, and popular "write it by hand" problems.

## Debounce & Throttle

Scenario: an `input` event fires on every keystroke. Firing a search request each time is a request explosion. Two strategies:

### Debounce: wait until they stop

While events keep firing, do nothing; **execute once, n ms after they stop**. For: search suggestions, form validation, window resize.

```js
function debounce(fn, delay = 300) {
  let timer = null
  return function (...args) {
    clearTimeout(timer)              // fired again? restart the clock
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

input.addEventListener('input', debounce(e => {
  console.log('searching:', e.target.value)
}, 500))
```

### Throttle: a fixed rhythm

While events keep firing, **execute at most once every n ms**. For: scroll handlers, click-spam protection, mouse tracking.

```js
function throttle(fn, interval = 300) {
  let last = 0
  return function (...args) {
    const now = Date.now()
    if (now - last >= interval) {
      last = now
      fn.apply(this, args)
    }
  }
}

window.addEventListener('scroll', throttle(() => {
  console.log('scroll position:', window.scrollY)
}, 200))
```

::: tip One-line distinction
Debounce: **only the last one counts** (an elevator door: keeps not closing while people keep entering). Throttle: **fixed frequency** (a skill cooldown: mashing the key does nothing until the CD is up). Note both rely on a **closure** holding timer/last — closures earning their keep.
:::

## Deep Copy vs. Shallow Copy

Assigning a reference type copies the "address" — both variables point at the same object:

```js
const a = { name: 'Amy', skills: ['JS'] }
const b = a
b.name = 'Beth'
console.log(a.name)   // 'Beth' — a changed too!
```

**Shallow copy**: duplicates only the first level; nested objects stay shared:

```js
const c = { ...a }            // spread, or Object.assign({}, a)
c.name = 'Cara'               // ✅ first level independent
c.skills.push('Vue')          // ⚠️ a.skills changed too! nesting is still shared
```

**Deep copy**: a fully independent clone:

```js
const d = structuredClone(a)             // built into modern browsers — first choice
const e = JSON.parse(JSON.stringify(a))  // the old trick: simple, but drops functions/undefined and stringifies Dates
```

Interviews often ask for a handwritten recursive deep copy — understanding the idea is enough: walk the properties; when one is an object, recurse.

## Rapid-Fire "Write by Hand" Classics

```js
// Deduplicate an array
const unique = arr => [...new Set(arr)]

// Flatten an array
;[1, [2, [3]]].flat(Infinity)   // [1, 2, 3]

// Shuffle
const shuffle = arr => [...arr].sort(() => Math.random() - 0.5)

// Random integer in min~max
const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

// Thousands separators
;(1234567.89).toLocaleString()   // '1,234,567.89'

// Date formatting
new Date().toLocaleDateString()  // '7/17/2026'
```

## Exercises

1. Wire debounce onto the search box from the [fetch chapter's](/en/core/fetch) user-search exercise and watch the request count drop in the Network panel.
2. Explain the output, then fix it so `list2`'s change doesn't affect `list1`:
```js
const list1 = [{ id: 1, tags: ['a'] }]
const list2 = [...list1]
list2[0].tags.push('b')
console.log(list1[0].tags)
```
3. Handwrite a loop version of `unique(arr)` (no Set) to consolidate array basics.

::: details Reference answer (Q2)
It prints `['a', 'b']`. Spread is a shallow copy — `list2[0]` and `list1[0]` are the same object. Use a deep copy instead: `const list2 = structuredClone(list1)`.
:::
