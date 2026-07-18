# Arrays & Objects

> Goals: master array CRUD and the essential iteration methods; organize data with objects; understand JSON.

Arrays and objects are the two most important data structures in JS: **arrays manage "a collection", objects describe "one thing"**. Real-world data is almost always "an array of objects" — product lists and student rosters from a backend API all look like that.

## Array Basics

```js
const fruits = ['apple', 'banana', 'orange']

fruits[0]          // 'apple' — indexes start at 0
fruits.length      // 3
fruits[fruits.length - 1]   // last item

fruits.push('pear')      // append at the end
fruits.pop()             // remove from the end
fruits.unshift('peach')  // insert at the front
fruits.shift()           // remove from the front
fruits.includes('apple')        // true — contains?
fruits.indexOf('banana')        // 1 — find index, -1 if missing
fruits.splice(1, 1)             // remove 1 item starting at index 1
```

## The Big Three of Iteration

Know these three cold — **rendering lists and shaping API data in Vue uses them daily**:

```js
const scores = [88, 45, 92, 60, 73]

// forEach: plain iteration, no return value
scores.forEach((item, index) => {
  console.log(`Item ${index}: ${item}`)
})

// map: transform, returns a new array (same length)
const doubled = scores.map(n => n * 2)     // [176, 90, 184, 120, 146]

// filter: keep matches, returns a new array
const passed = scores.filter(n => n >= 60) // [88, 92, 60, 73]
```

Other frequently used methods:

```js
scores.find(n => n >= 90)     // 92 — first match
scores.some(n => n < 60)      // true — does any match?
scores.every(n => n >= 60)    // false — do all match?
scores.reduce((sum, n) => sum + n, 0)   // 358 — fold into one value
scores.sort((a, b) => a - b)  // ascending sort (mutates the array!)
scores.join(', ')             // join into a string
```

::: tip How to choose
Ask yourself what result you want: **a transformed array of the same length → map; a matching subset → filter; a single aggregate → reduce; just doing something per item → forEach.**
:::

## Objects

An object describes one thing with key-value pairs:

```js
const student = {
  name: 'Amy',
  age: 20,
  scores: [88, 92],
  sayHi() {
    console.log(`I'm ${this.name}`)
  }
}

student.name          // dot access
student['age']        // bracket access (for dynamic keys or special characters)
student.major = 'CS'  // add a property
delete student.age    // remove a property
student.sayHi()       // call a method

// Iterating over an object
for (const key in student) {
  console.log(key, student[key])
}
Object.keys(student)    // array of keys
Object.values(student)  // array of values
```

## Arrays of Objects: What Real Data Looks Like

```js
const goodsList = [
  { id: 1, name: 'Keyboard', price: 199, stock: 10 },
  { id: 2, name: 'Mouse', price: 99, stock: 0 },
  { id: 3, name: 'Monitor', price: 1299, stock: 5 }
]

// Names of in-stock products
const names = goodsList.filter(g => g.stock > 0).map(g => g.name)
// ['Keyboard', 'Monitor']

// Total inventory value
const total = goodsList.reduce((sum, g) => sum + g.price * g.stock, 0)
```

## JSON

JSON is a **data format** that looks like a JS object but is a string, used to move data between frontend and backend:

```js
const jsonStr = '{"name":"Amy","age":20}'

const obj = JSON.parse(jsonStr)   // string → object
const str = JSON.stringify(obj)   // object → string
```

Note: JSON keys must use double quotes; no functions, no comments.

## Exercises

1. Given `[3, 7, 2, 9, 5]`, use `filter` to keep numbers greater than 4, then `map` to square them.
2. With `goodsList` above: find the most expensive product object; produce a new array with all prices at 20% off (`map`, without mutating the original).
3. Define an "about me" object (name, major, array of hobbies) and print a self-introduction with a template string.

::: details Reference answer (Q2)
```js
// Most expensive: pairwise comparison with reduce
const dearest = goodsList.reduce((max, g) => g.price > max.price ? g : max)

// 20% off: spread the object, override only price
const discounted = goodsList.map(g => ({ ...g, price: g.price * 0.8 }))
```
`...g` is the spread operator — see [Essential ES6+](/en/core/es6).
:::
