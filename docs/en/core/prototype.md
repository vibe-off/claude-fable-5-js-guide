# Prototypes & Classes

> Goals: understand constructors and the prototype chain; master ES6 class syntax.

When you need many objects of the same shape (100 students, a pile of products), writing literals one by one doesn't scale. JS offers constructors and classes to "mass-produce" objects.

## Constructors and new

```js
function Student(name, score) {
  this.name = name
  this.score = score
}

const s1 = new Student('Amy', 88)
const s2 = new Student('Beth', 92)
```

`new` does four things: create an empty object → point `this` at it → run the function body to add properties → return the object. By convention constructors are **capitalized**.

## The Prototype: a Shared Method Store

Defining methods inside the constructor would copy them onto every instance — wasted memory. JS's answer is the **prototype object**:

```js
Student.prototype.sayHi = function () {
  console.log(`I'm ${this.name}, I scored ${this.score}`)
}

s1.sayHi()   // the instance lacks sayHi; found by walking up the prototype chain
s2.sayHi()   // both instances share one function
```

Property lookup rule: **check the instance itself → then its prototype → then the prototype's prototype… until null**. That chain is the **prototype chain**.

```js
s1.__proto__ === Student.prototype          // true
Student.prototype.__proto__ === Object.prototype   // true
// That's why every object is "born with" toString etc. — from Object.prototype
```

Array methods like `push` and `map` work the same way — they live on `Array.prototype`. **The prototype chain is how JS implements inheritance.**

## ES6 class: the Modern Syntax

`class` is syntactic sugar over constructor + prototype — same machinery, far cleaner to write. **All new code uses class:**

```js
class Student {
  constructor(name, score) {
    this.name = name
    this.score = score
  }

  // methods land on the prototype automatically
  sayHi() {
    console.log(`I'm ${this.name}`)
  }

  // static method: called on the class, not on instances
  static compare(a, b) {
    return a.score - b.score
  }
}

const s = new Student('Amy', 88)
s.sayHi()
Student.compare(s1, s2)
```

### Inheritance

```js
class Monitor extends Student {
  constructor(name, score, duty) {
    super(name, score)   // call the parent constructor first
    this.duty = duty
  }

  sayHi() {
    super.sayHi()        // parent methods remain reachable
    console.log(`I'm also the ${this.duty}`)
  }
}
```

## How Deep Do You Need to Go

- **Be fluent with class** definitions and inheritance — that covers the writing side;
- **Be able to explain the prototype chain** — the interview side: "JS inherits through the prototype chain; property access walks up `__proto__` level by level";
- Day-to-day frontend code doesn't actually use class that heavily (Vue 3 is function-flavored), but **reading it is a prerequisite for reading any library's source**.

## Exercises

1. Write a `Circle` class: takes a radius, provides `getArea()` and `getPerimeter()`.
2. Predict and explain:
```js
const arr = [1, 2, 3]
console.log(arr.hasOwnProperty('length'))
console.log(arr.hasOwnProperty('push'))
```
3. Write an `Animal` class (name, method `speak` printing "..."), then a `Dog` that extends it and overrides `speak` to print "Woof".

::: details Reference answer (Q2)
`length` is the array instance's own property → `true`. `push` lives on `Array.prototype`, not on the instance → `false` — yet `arr.push` still works, because lookup continues up the prototype chain.
:::
