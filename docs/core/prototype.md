# 原型与类

> 本节目标:理解构造函数与原型链的基本原理,掌握 ES6 class 的写法。

需要批量创建同类对象(100 个学生、一堆商品)时,一个个写字面量不现实。JS 提供了构造函数和 class 来"批量生产对象"。

## 构造函数与 new

```js
function Student(name, score) {
  this.name = name
  this.score = score
}

const s1 = new Student('小明', 88)
const s2 = new Student('小红', 92)
```

`new` 做了四件事:创建空对象 → 让 `this` 指向它 → 执行函数体给它加属性 → 返回这个对象。构造函数约定**首字母大写**。

## 原型:方法的共享仓库

如果把方法写在构造函数里,每个实例都会复制一份,浪费内存。JS 的方案是**原型对象(prototype)**:

```js
Student.prototype.sayHi = function () {
  console.log(`我是${this.name},考了${this.score}分`)
}

s1.sayHi()   // 实例自己没有 sayHi,沿原型链向上找到了
s2.sayHi()   // 两个实例共享同一个函数
```

访问属性的规则:**先找实例自身 → 找不到就找它的原型 → 再找原型的原型……直到 null**。这条链叫**原型链**。

```js
s1.__proto__ === Student.prototype          // true
Student.prototype.__proto__ === Object.prototype   // true
// 所以每个对象都"天生"有 toString 等方法 —— 来自 Object.prototype
```

数组方法 `push`、`map` 同理,都定义在 `Array.prototype` 上。**原型链就是 JS 实现"继承"的方式。**

## ES6 class:现代写法

`class` 是构造函数 + 原型的**语法糖**,底层机制不变,写法清晰得多。**现在的新代码都用 class:**

```js
class Student {
  constructor(name, score) {
    this.name = name
    this.score = score
  }

  // 方法自动挂到原型上
  sayHi() {
    console.log(`我是${this.name}`)
  }

  // 静态方法:通过类调用,不属于实例
  static compare(a, b) {
    return a.score - b.score
  }
}

const s = new Student('小明', 88)
s.sayHi()
Student.compare(s1, s2)
```

### 继承

```js
class Monitor extends Student {
  constructor(name, score, duty) {
    super(name, score)   // 先调用父类构造函数
    this.duty = duty
  }

  sayHi() {
    super.sayHi()        // 可以调用父类方法
    console.log(`我还是${this.duty}`)
  }
}
```

## 你需要掌握到什么程度

- **会用 class** 定义类、继承 —— 写代码层面这就够了;
- **能解释原型链** —— 面试层面:"JS 通过原型链实现继承,访问属性时沿着 `__proto__` 逐级向上查找";
- 日常前端业务中 class 用得其实不算多(Vue 3 是函数风格),但**读懂它是读懂各种库源码的前提**。

## 练习

1. 用 class 写一个 `Circle` 类:构造时传半径,提供 `getArea()` 和 `getPerimeter()` 方法。
2. 预测输出并解释:
```js
const arr = [1, 2, 3]
console.log(arr.hasOwnProperty('length'))
console.log(arr.hasOwnProperty('push'))
```
3. 写一个 `Animal` 类(name,方法 `speak` 打印"..."),再写 `Dog` 继承它并重写 `speak` 打印"汪汪"。

::: details 参考答案(第 2 题)
`length` 是数组实例自身的属性,输出 `true`;`push` 定义在 `Array.prototype` 上,不是实例自身属性,输出 `false` —— 但 `arr.push` 依然能用,因为原型链会向上查找。
:::
