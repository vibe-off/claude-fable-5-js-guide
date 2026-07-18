# Essential ES6+

> Goals: master the modern JS syntax you'll meet constantly. Vue 3 projects and AI-generated code are dense with these — without them you simply "can't read the code".

ES6 (2015) was the biggest upgrade in JS history, followed by yearly increments (collectively "ES6+"). `let`/`const`, arrow functions, and template strings were covered earlier; this section completes the high-frequency set.

## Destructuring

Extracting values "by shape" from arrays and objects — **you'll see it daily in Vue**:

```js
// Object destructuring: matches by property name
const user = { name: 'Amy', age: 20, city: 'Hangzhou' }
const { name, age } = user
// same as: const name = user.name; const age = user.age

// Renaming + defaults
const { name: userName, vip = false } = user

// Array destructuring: matches by position
const [first, second] = ['a', 'b', 'c']

// Destructuring parameters: common for API data
function printUser({ name, city }) {
  console.log(`${name} - ${city}`)
}
printUser(user)
```

In Vue 3, `const { data } = await axios.get(...)` and `const [count, setCount] = ...` are all destructuring.

## The Spread Operator ...

"Unpacks" arrays/objects — **the standard way to copy and merge**:

```js
// Arrays
const a = [1, 2]
const b = [...a, 3, 4]          // [1, 2, 3, 4]
const copy = [...a]             // shallow copy
Math.max(...[3, 7, 2])          // 7 — array to arguments

// Objects
const base = { name: 'Amy', age: 20 }
const updated = { ...base, age: 21 }   // copy and override age
```

The `{ ...obj, key: newValue }` pattern — "don't mutate, produce a new object" — is hugely important in Vue/React.

## Optional Chaining ?. and Nullish Coalescing ??

The antidote to endless null checks when handling API data:

```js
const res = { data: { user: null } }

// The old way: res.data && res.data.user && res.data.user.name
const name = res.data?.user?.name        // undefined, no crash
const showName = res.data?.user?.name ?? 'Guest'   // with a fallback
```

::: tip
`Cannot read properties of undefined` is frontend error number one. Optional chaining is its vaccine — but don't sprinkle `?.` blindly: if data should exist and doesn't, investigate instead of muting the symptom.
:::

## Object Literal Shorthands

```js
const name = 'Amy'
const age = 20

// Shorthand when the property name equals the variable name
const user = { name, age }
// same as { name: name, age: age }

// Method shorthand (we've been using it all along)
const obj = {
  sayHi() {}     // same as sayHi: function () {}
}
```

## Other High-Frequency Bits

```js
// Strings
'  hi  '.trim()               // 'hi' — strip surrounding whitespace
'abc'.includes('b')           // true
'5'.padStart(2, '0')          // '05' — zero padding

// Arrays
Array.from(document.querySelectorAll('li'))   // array-like → real array
[1, 2, 2, 3].filter((v, i, arr) => arr.indexOf(v) === i)  // dedupe
[...new Set([1, 2, 2, 3])]    // [1, 2, 3] — dedupe with Set (more common)

// Iterating objects as pairs
Object.entries({ a: 1, b: 2 })   // [['a', 1], ['b', 2]]
```

## Exercises

1. Swap two variables using destructuring (no temp variable).
2. `const res = { code: 0, data: { list: [{ id: 1, title: 'News' }] } }`: destructure `list` in one line; safely read the first item's `title` with fallback `'N/A'`.
3. Merge `defaults = { theme: 'light', size: 14 }` with `userConfig = { size: 16 }`, userConfig winning.

::: details Reference answer
```js
// 1
let x = 1, y = 2
;[x, y] = [y, x]

// 2
const { data: { list } } = res
const title = list?.[0]?.title ?? 'N/A'

// 3
const config = { ...defaults, ...userConfig }   // later spreads override earlier ones
```
:::
