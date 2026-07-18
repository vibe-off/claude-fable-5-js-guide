# Asynchronous JavaScript

> Goals: understand why JS needs async; master Promises and async/await. **The most important section in Key Concepts** — it decides whether you can build real projects.

## Why Async Exists

JS is **single-threaded**: it does one thing at a time. If a network request (possibly seconds long) ran "synchronously", the page would freeze completely.

So JS goes asynchronous: slow operations (network requests, timers, file reads) are "parked", the main thread keeps going, and a callback runs when the operation completes.

```js
console.log('1')
setTimeout(() => console.log('2'), 0)   // even at 0 milliseconds!
console.log('3')
// Output: 1 3 2
```

**Synchronous code always runs before async callbacks.** Behind this sits the event loop: the main thread finishes all sync code, then pulls async callbacks off the task queue.

::: warning The number one beginner trap
```js
let data
setTimeout(() => { data = 'arrived' }, 1000)
console.log(data)   // undefined! Sync code does not wait for async
```
"Why is my variable still undefined after the request?" — because you used the data **before** the async task finished. Any code that depends on an async result must live after the callback / then / await.
:::

## Callback Hell

Organizing multi-step async work with callbacks nests deeper and deeper:

```js
login(user, res1 => {
  getProfile(res1.id, res2 => {
    getOrders(res2.uid, res3 => {
      // nested, hard to read, and error handling is a disaster
    })
  })
})
```

## Promises

A Promise is an object that "**promises a future result**". It has three states: `pending` → `fulfilled` (success) or `rejected` (failure), and the transition is one-way.

```js
const p = new Promise((resolve, reject) => {
  // simulate an async operation
  setTimeout(() => {
    const ok = Math.random() > 0.5
    ok ? resolve('the data') : reject(new Error('the reason'))
  }, 1000)
})

p.then(data => console.log(data))     // on success
 .catch(err => console.log(err))      // on failure
 .finally(() => console.log('runs either way'))
```

In practice you **rarely write `new Promise`** — you consume APIs that return Promises (fetch, axios). The real value of Promises is **chaining**, which turns nesting into a flat pipeline:

```js
login(user)
  .then(res1 => getProfile(res1.id))
  .then(res2 => getOrders(res2.uid))
  .then(res3 => console.log(res3))
  .catch(err => console.log('any failure lands here', err))
```

## async / await: the Final Form

`async/await` is syntax sugar over Promises that makes async code **read like sync code** — today's mainstream style:

```js
async function loadPage() {
  try {
    const res1 = await login(user)          // "wait" for the Promise to settle
    const res2 = await getProfile(res1.id)
    const res3 = await getOrders(res2.uid)
    console.log(res3)
  } catch (err) {
    console.log('Something failed:', err)
  }
}
```

Rules:

- `await` only works inside an `async` function (or at ES-module top level);
- `await` takes a Promise and "pauses" for its result — pausing only this function, **never blocking the main thread**;
- an `async` function's return value is automatically wrapped in a Promise;
- handle errors with `try/catch`.

### Concurrency: Promise.all

When requests don't depend on each other, don't `await` them one by one (serial = slow); run them concurrently:

```js
// ❌ Serial: total time = sum of both requests
const a = await getBanner()
const b = await getGoods()

// ✅ Concurrent: total time = the slower one
const [banner, goods] = await Promise.all([getBanner(), getGoods()])
```

## Exercises

1. Predict the output order:
```js
console.log('A')
setTimeout(() => console.log('B'), 0)
Promise.resolve().then(() => console.log('C'))
console.log('D')
```
2. Write a `sleep(ms)` function returning a Promise, so `await sleep(1000)` waits one second.
3. With async/await: print "3", wait a second, print "2", wait, print "1", then print "Liftoff!".

::: details Reference answer
Q1: `A D C B`. Sync code first (A, D); Promise callbacks are **microtasks**, which run before `setTimeout` **macrotasks** (an interview point — understanding it is enough).

Q2 & Q3:
```js
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

async function launch() {
  for (let i = 3; i >= 1; i--) {
    console.log(i)
    await sleep(1000)
  }
  console.log('Liftoff!')
}
launch()
```
:::
