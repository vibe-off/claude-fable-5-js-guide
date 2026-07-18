# Variables & Types

> Goals: declare variables with `let`/`const`, know the 7 primitive types, and understand the common pitfalls of type conversion.

## Declaring Variables

```js
let age = 20        // can be reassigned
const name = 'Amy'  // constant, cannot be reassigned
age = 21            // ✅
// name = 'Bob'     // ❌ TypeError: Assignment to constant variable
```

::: tip Rule: default to const, use let only when the value changes
This is also the prevailing style in Vue projects. `var` is the legacy way from a decade ago with scoping flaws (see [Scope & Closures](/en/core/scope-closure)) — **never use it in new code**, but learn to recognize it: old codebases and AI occasionally produce it.
:::

Naming: camelCase `userName`, descriptive names, cannot start with a digit, cannot be a keyword (`let`, `class`, etc.).

## Data Types

### Primitives (7 kinds)

```js
let a = 100          // number: integers and decimals are both number
let b = 'hello'      // string: single, double, or backtick quotes
let c = true         // boolean: true / false
let d = undefined    // undefined: declared but not assigned
let e = null         // null: deliberately "empty"
let f = 123n         // bigint: very large integers (rare)
let g = Symbol('id') // symbol: unique values (rare)
```

Check a type with `typeof`:

```js
typeof 100        // 'number'
typeof 'hi'       // 'string'
typeof undefined  // 'undefined'
typeof null       // 'object'  ← a historical bug; just memorize it
```

### Reference types

Objects, arrays, and functions are reference types (`object`) — covered in later chapters. Primitives and references behave differently in assignment and comparison, which is a [classic interview topic](/en/advanced/patterns#deep-copy-vs-shallow-copy).

## Template Strings

Backtick strings can embed variables — far clearer than `+` concatenation, so **prefer them**:

```js
const user = 'Amy'
const score = 95
console.log(`${user} scored ${score} points`) // Amy scored 95 points
```

## Type Conversion

### Explicit (recommended)

```js
Number('123')   // 123
Number('12px')  // NaN (Not a Number — conversion failed)
String(123)     // '123'
Boolean(0)      // false
parseInt('12px')   // 12 (parses digits from the start; handy for style values)
parseFloat('3.14') // 3.14
```

### Implicit (beware)

```js
'1' + 2    // '12'  ← + with a string means concatenation!
'6' - 2    // 4     ← other operators convert to numbers
1 == '1'   // true  ← == converts types before comparing
1 === '1'  // false ← === compares strictly, no conversion
```

::: warning Two iron rules
1. **Always use `===` and `!==` for equality**, never `==`.
2. Values from form inputs are always strings — convert with `Number()` before doing math. This is the number one source of beginner bugs.
:::

### Truthy and falsy

These 6 values convert to `false`; everything else is `true`:

```js
false, 0, '', null, undefined, NaN
```

Commonly used to test "is there a value": `if (username) { ... }`

## Exercises

1. Declare a constant `PI = 3.14159` and a variable `radius = 5`; print the circle's area with a template string.
2. Predict, then verify: `'10' + 1`, `'10' - 1`, `typeof NaN`, `Boolean('false')`.
3. Use `prompt()` to read two numbers from the user and alert their **sum** (watch the type conversion).

::: details Reference answer (Q3)
```js
const a = Number(prompt('First number'))
const b = Number(prompt('Second number'))
alert(`The sum is: ${a + b}`)
// Without Number(), '3' + '5' would give '35'
```
:::
