# Operators & Control Flow

> Goals: master the common operators; organize program logic with branches and loops.

## Common Operators

```js
// Arithmetic: + - * / % (remainder) ** (power)
10 % 3   // 1 — checking odd/even: n % 2 === 0
2 ** 10  // 1024

// Increment / decrement
let i = 0
i++      // i becomes 1

// Comparison: > < >= <=  ===  !==
// Logical: && (and) || (or) ! (not)
const age = 20
age >= 18 && age < 60   // true
```

### Short-circuiting

`&&` and `||` return **the operand itself**, not a boolean — a behavior real code uses constantly:

```js
const name = inputName || 'Anonymous'   // fallback when inputName is empty
isLogin && showProfile()                // run the function only when isLogin is true
```

ES2020 added `??` (nullish coalescing): falls back only on `null`/`undefined`, so `0` and `''` survive:

```js
const count = data.count ?? 10   // if data.count is 0, count is 0
```

## Branching

### if / else

```js
const score = 85
if (score >= 90) {
  console.log('Excellent')
} else if (score >= 60) {
  console.log('Pass')
} else {
  console.log('Fail')
}
```

### The ternary operator

For a simple either/or, ternaries are cleaner (you'll see them in Vue templates too):

```js
const type = score >= 60 ? 'Pass' : 'Fail'
```

### switch

Multi-branching on fixed values:

```js
switch (day) {
  case 6:
  case 0:
    console.log('Weekend')
    break        // without break, execution falls through to the next case!
  default:
    console.log('Weekday')
}
```

## Loops

```js
// for: when you know how many times
for (let i = 1; i <= 5; i++) {
  console.log(`Round ${i}`)
}

// while: when you only know the stop condition
let money = 100
while (money > 0) {
  money -= 30
}

// break exits the loop; continue skips to the next iteration
for (let i = 1; i <= 10; i++) {
  if (i === 3) continue
  if (i === 8) break
  console.log(i)   // 1 2 4 5 6 7
}
```

For arrays, prefer `for...of` and array methods (next sections):

```js
const list = ['apple', 'banana', 'orange']
for (const item of list) {
  console.log(item)
}
```

::: warning Infinite loops
A `while` that forgets to update its condition variable freezes the browser. Before writing a loop, ask: **when does it end, and what changes each round?**
:::

## Worked Example: Multiplication Table

```js
for (let i = 1; i <= 9; i++) {
  let row = ''
  for (let j = 1; j <= i; j++) {
    row += `${j}×${i}=${i * j}\t`
  }
  console.log(row)
}
```

## Exercises

1. Print every number between 1 and 100 divisible by 7.
2. Compute `1 + 2 + ... + 100` with a loop.
3. FizzBuzz (interview classic): print 1–30; multiples of 3 print `Fizz`, multiples of 5 print `Buzz`, multiples of both print `FizzBuzz`, everything else prints the number.

::: details Reference answer (Q3)
```js
for (let i = 1; i <= 30; i++) {
  if (i % 15 === 0) {
    console.log('FizzBuzz')   // the 15 check must come first
  } else if (i % 3 === 0) {
    console.log('Fizz')
  } else if (i % 5 === 0) {
    console.log('Buzz')
  } else {
    console.log(i)
  }
}
```
:::
