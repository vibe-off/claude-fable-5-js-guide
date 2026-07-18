# Functions

> Goals: define and call functions; understand parameters and return values; meet arrow functions and callbacks.

A function is a **reusable block of code**. Wrap a piece of logic in a function, give it a good name, and your program turns from a run-on transcript into a book with a clear table of contents.

## Defining and Calling

```js
// Function declaration
function getSum(a, b) {
  return a + b
}

// Function expression
const getAvg = function (a, b) {
  return (a + b) / 2
}

// Arrow function (ES6 — the most common style today)
const getMax = (a, b) => {
  return a > b ? a : b
}

// With a single return statement, braces and return can be omitted
const double = n => n * 2

getSum(3, 5)   // 8
double(10)     // 20
```

The three forms are mostly equivalent. Differences: declarations are **hoisted** (usable before their definition), and arrow functions have no `this` of their own (see [Understanding this](/en/core/this)). **Beginner rule of thumb: use `function` declarations for standalone features, arrow functions for callbacks.**

## Parameters and Return Values

```js
// Default parameters
function greet(name = 'friend') {
  return `Hello, ${name}`
}
greet()        // 'Hello, friend'
greet('Amy')   // 'Hello, Amy'

// Rest parameters: gather any number of arguments into an array
function sum(...nums) {
  let total = 0
  for (const n of nums) total += n
  return total
}
sum(1, 2, 3, 4)   // 10
```

::: warning No return means undefined
`console.log` only "prints for humans"; `return` "hands the result back to the program". A classic beginner mistake: logging inside the function but never returning, then wondering why everything is `undefined`.
:::

## Callbacks: Functions Are Values

In JS a function can be assigned and passed around like a number or string. **Passing function A into function B, letting B decide when to call it — that makes A a callback.**

```js
function repeat(times, fn) {
  for (let i = 0; i < times; i++) {
    fn(i)
  }
}

repeat(3, i => console.log(`Run #${i}`))
```

Callbacks are everywhere — timers, events, array methods, network requests:

```js
// run once after 1 second
setTimeout(() => {
  console.log('Time is up')
}, 1000)

// run every second
const timer = setInterval(() => console.log('tick'), 1000)
clearInterval(timer)   // stop the timer
```

Understanding "functions as arguments" underpins event listeners, array methods, Promises, and eventually Vue. **Make sure it clicks here.**

## Scope, Briefly

Variables declared inside a function are invisible outside:

```js
function fn() {
  const secret = 42
}
// console.log(secret)   // ❌ ReferenceError
```

The deeper mechanics (scope chain, closures) are covered in [Key Concepts](/en/core/scope-closure).

## Exercises

1. Write `isEven(n)` that returns a boolean for whether n is even.
2. Write `maxOf(arr)` that returns the largest value in an array (use a loop first; no `Math.max`).
3. Write `countdown(n, fn)`: call `fn(secondsLeft)` once per second, stopping at 0.

::: details Reference answer (Q3)
```js
function countdown(n, fn) {
  const timer = setInterval(() => {
    fn(n)
    n--
    if (n < 0) clearInterval(timer)
  }, 1000)
}

countdown(5, sec => console.log(`${sec} seconds left`))
```
:::
