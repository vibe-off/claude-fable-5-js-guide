# Understanding this

> Goals: master the rules for determining `this`; understand the essential difference between arrow functions and regular functions.

`this` is a variable created automatically when a function runs, pointing at "**the object that called the function**". Its value depends **not on where the function is defined, but on how it is called**.

## The Rules (by priority)

### 1. Whoever calls it, owns it

```js
const user = {
  name: 'Amy',
  sayHi() {
    console.log(this.name)
  }
}

user.sayHi()   // 'Amy' — called by user, so this is user

const fn = user.sayHi
fn()           // undefined — no calling object; this is the global object (undefined in strict mode)
```

### 2. Plain function call: global

```js
function show() {
  console.log(this)   // window in browsers (undefined in strict mode)
}
show()
```

### 3. Arrow functions: no this of their own

An arrow function doesn't create a `this`; it uses **the `this` of the enclosing scope at definition time** (looked up along the scope chain, like any variable):

```js
const user2 = {
  name: 'Beth',
  // ❌ Wrong: arrow function as an object method
  wrong: () => {
    console.log(this.name)   // undefined — the outer scope is global
  },
  // ✅ Regular function for the method, arrow functions for callbacks inside
  right() {
    setTimeout(() => {
      console.log(this.name)   // 'Beth' — the arrow inherits right()'s this
    }, 100)
  }
}
```

::: tip A rule that prevents 90% of this-bugs
**Object methods: regular functions. Callbacks inside those methods: arrow functions.** This is exactly why Vue 2 forbids arrow functions in `methods`.
:::

### 4. this in event listeners

```js
btn.addEventListener('click', function () {
  console.log(this)   // regular function: this is btn (the element)
})

btn.addEventListener('click', () => {
  console.log(this)   // arrow function: the outer this (usually window)
  // Want the element? Use e.target / e.currentTarget — more reliable anyway
})
```

### 5. Called with new: the freshly created object

See [Prototypes & Classes](/en/core/prototype).

## Setting this by Hand: call / apply / bind

```js
function intro(city) {
  console.log(`I'm ${this.name} from ${city}`)
}
const p = { name: 'Amy' }

intro.call(p, 'Beijing')       // invoke now, args one by one
intro.apply(p, ['Beijing'])    // invoke now, args as an array
const bound = intro.bind(p)    // don't invoke; return a permanently bound function
bound('Beijing')
```

Rare in everyday business code, but frequent in interviews and essential for reading library source code.

## Exercises

1. Predict the output:
```js
const obj = {
  name: 'A',
  getName() {
    return this.name
  }
}
console.log(obj.getName())
const g = obj.getName
console.log(g())
```
2. Fix this code so it logs `Amy is studying` every second:
```js
const student = {
  name: 'Amy',
  study() {
    setInterval(function () {
      console.log(`${this.name} is studying`)
    }, 1000)
  }
}
student.study()
```

::: details Reference answer (Q2)
The `setInterval` callback is a regular function, so when invoked its `this` is the global object and `this.name` is undefined.

Fix 1 (preferred): make the callback an arrow function so it inherits `study`'s `this`:
```js
setInterval(() => {
  console.log(`${this.name} is studying`)
}, 1000)
```
Fix 2: save `const self = this` beforehand and use `self.name` (common in older code).
:::
