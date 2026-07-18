# 函数

> 本节目标:会定义和调用函数,理解参数、返回值,认识箭头函数和回调函数。

函数是**可以重复使用的代码块**。把一段逻辑装进函数,起个好名字,程序就从"流水账"变成了"目录清晰的书"。

## 定义与调用

```js
// 函数声明
function getSum(a, b) {
  return a + b
}

// 函数表达式
const getAvg = function (a, b) {
  return (a + b) / 2
}

// 箭头函数(ES6,现在最常用的写法)
const getMax = (a, b) => {
  return a > b ? a : b
}

// 函数体只有一句 return 时,可以省略大括号和 return
const double = n => n * 2

getSum(3, 5)   // 8
double(10)     // 20
```

三种写法功能基本等价,区别在于:函数声明会**提升**(定义在调用之后也能用),箭头函数没有自己的 `this`(详见 [this 指向](/core/this))。**入门阶段建议:独立的功能用 `function` 声明,回调用箭头函数。**

## 参数与返回值

```js
// 默认参数
function greet(name = '同学') {
  return `你好,${name}`
}
greet()       // '你好,同学'
greet('小明') // '你好,小明'

// 剩余参数:收集不定数量的参数为数组
function sum(...nums) {
  let total = 0
  for (const n of nums) total += n
  return total
}
sum(1, 2, 3, 4)   // 10
```

::: warning 没有 return 就返回 undefined
`console.log` 只是"打印给人看",`return` 才是"把结果交给程序用"。初学者常犯的错:函数里只 log 不 return,结果拿到的全是 `undefined`。
:::

## 回调函数:函数也是值

JS 中函数可以像数字、字符串一样被赋值、被当作参数传递。**把函数 A 传给函数 B,由 B 决定何时调用 A,这个 A 就叫回调函数(callback)。**

```js
function repeat(times, fn) {
  for (let i = 0; i < times; i++) {
    fn(i)
  }
}

repeat(3, i => console.log(`第 ${i} 次执行`))
```

回调无处不在:定时器、事件、数组方法、网络请求全是回调:

```js
// 1 秒后执行一次
setTimeout(() => {
  console.log('时间到')
}, 1000)

// 每隔 1 秒执行一次
const timer = setInterval(() => console.log('滴答'), 1000)
clearInterval(timer)   // 清除定时器
```

理解"函数可以作为参数",是理解事件监听、数组方法、Promise 乃至 Vue 的基础,**务必在这里搞懂**。

## 作用域初步

函数内部声明的变量,外部访问不到:

```js
function fn() {
  const secret = 42
}
// console.log(secret)   // ❌ ReferenceError
```

深入原理(作用域链、闭包)在[核心概念](/core/scope-closure)中展开。

## 练习

1. 写函数 `isEven(n)`,判断 n 是否为偶数,返回布尔值。
2. 写函数 `maxOf(arr)`,返回数组中的最大值(先用循环实现,不用 `Math.max`)。
3. 写函数 `countdown(n, fn)`:每隔 1 秒调用一次 `fn(剩余秒数)`,数到 0 停止。

::: details 参考答案(第 3 题)
```js
function countdown(n, fn) {
  const timer = setInterval(() => {
    fn(n)
    n--
    if (n < 0) clearInterval(timer)
  }, 1000)
}

countdown(5, sec => console.log(`剩余 ${sec} 秒`))
```
:::
