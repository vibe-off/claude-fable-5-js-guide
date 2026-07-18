# Scope & Closures

> Goals: understand the scope chain and variable lookup; be able to explain "what a closure is and what it's for". The number one interview question.

## Scope

Scope = **where a variable is visible**. JS has three kinds:

```js
const global = 'global scope: visible everywhere'

function fn() {
  const fnScope = 'function scope: visible only inside the function'
}

{
  let blockScope = 'block scope: let/const variables live only inside the {}'
}
```

`var` has no block scope — the main reason it was retired:

```js
for (var i = 0; i < 3; i++) {}
console.log(i)   // 3 — var leaked outside

for (let j = 0; j < 3; j++) {}
// console.log(j)   // ❌ ReferenceError — let behaves properly
```

## The Scope Chain

Inner scopes can read outer variables, never the reverse. Lookup goes **inside-out, stopping at the first match**:

```js
const a = 1
function outer() {
  const a = 2
  function inner() {
    console.log(a)   // 2: checks itself, then outer — never reaches global
  }
  inner()
}
outer()
```

## Closures

**A closure = an inner function plus the outer variables it references.** When the inner function outlives the outer one (returned, or registered as a callback), the variables it references survive with it — that's a closure.

```js
function createCounter() {
  let count = 0          // this variable is "closed over"
  return function () {
    count++
    return count
  }
}

const counter = createCounter()
counter()   // 1
counter()   // 2  ← count wasn't destroyed; it remembers
counter()   // 3

const counter2 = createCounter()
counter2()  // 1  ← each createCounter call makes an independent closure
```

### What closures are for

1. **Private variables**: `count` cannot be read or tampered with from outside — only through the returned function;
2. **Keeping state alive**: normal function variables die when the call ends; closures preserve them;
3. **Everywhere in practice**: [debounce & throttle](/en/advanced/patterns#debounce-throttle), callbacks carrying data — and Vue 3's `setup` fundamentally relies on closures too.

### The interview-ready answer

> A closure means a function can access variables from the scope where it was defined, even when executed outside that scope. Typical uses are private variables and preserved state. The trade-off: referenced variables can't be garbage-collected, so overuse can leak memory.

## Hoisting (Good to Know)

`var` declarations and `function` declarations are "hoisted" to the top of their scope:

```js
console.log(a)   // undefined (no error — the var declaration hoisted, the assignment didn't)
var a = 1

console.log(b)   // ❌ ReferenceError (let has a "temporal dead zone")
let b = 2

fn()             // ✅ function declarations hoist entirely — callable before defined
function fn() {}
```

Practical takeaway: **use `let`/`const` and declare before use, and hoisting can never bite you.**

## Exercises

1. Predict the output:
```js
let x = 10
function test() {
  let x = 20
  {
    let x = 30
    console.log(x)
  }
  console.log(x)
}
test()
console.log(x)
```
2. Write `createWallet(initial)`: returns `{ deposit(n), getBalance() }`; the balance must not be directly accessible from outside.
3. The classic: why does this print three `3`s, and how do you fix it?
```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100)
}
```

::: details Reference answer (Q3)
`var` creates one shared `i`; by the time the timer callbacks run, the loop has long finished and `i` is 3.

Fix: change `var` to `let` — `let` creates a fresh block-scoped variable each iteration, each callback closes over its own `i`, printing 0, 1, 2. This one question tests scope, closures, and async at once — an interview regular.
:::
