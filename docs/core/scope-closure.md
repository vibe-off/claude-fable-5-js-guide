# 作用域与闭包

> 本节目标:理解作用域链与变量查找规则,能说清"闭包是什么、有什么用"。这是面试第一高频题。

## 作用域

作用域 = **变量的可见范围**。JS 有三种:

```js
const global = '全局作用域:哪里都能访问'

function fn() {
  const fnScope = '函数作用域:仅函数内部可见'
}

{
  let blockScope = '块级作用域:let/const 声明的变量仅 {} 内可见'
}
```

`var` 没有块级作用域,这是它被淘汰的主要原因:

```js
for (var i = 0; i < 3; i++) {}
console.log(i)   // 3 —— var 泄漏到了外面

for (let j = 0; j < 3; j++) {}
// console.log(j)   // ❌ ReferenceError —— let 正常
```

## 作用域链

内层可以访问外层变量,反之不行。查找变量时**由内向外逐层找**,找到即止:

```js
const a = 1
function outer() {
  const a = 2
  function inner() {
    console.log(a)   // 2:先找自己,再找 outer,用不到全局
  }
  inner()
}
outer()
```

## 闭包

**闭包 = 内层函数 + 它引用的外层函数变量。** 当内层函数在外层函数执行完之后仍然存活(被返回、被绑定为回调),它引用的外层变量也跟着存活 —— 这就形成了闭包。

```js
function createCounter() {
  let count = 0          // 这个变量被"关"在闭包里
  return function () {
    count++
    return count
  }
}

const counter = createCounter()
counter()   // 1
counter()   // 2  ← count 没有被销毁,一直记着
counter()   // 3

const counter2 = createCounter()
counter2()  // 1  ← 每次调用 createCounter 产生独立的闭包
```

### 闭包有什么用

1. **私有变量**:`count` 外部无法直接访问和篡改,只能通过返回的函数操作;
2. **让状态"活下来"**:普通函数执行完变量就销毁,闭包能保存状态;
3. **实战中无处不在**:[防抖节流](/advanced/patterns#防抖与节流)、回调携带数据、Vue 3 的 `setup` 本质上也依赖闭包。

### 面试标准回答

> 闭包是指函数能够访问其定义时所在作用域的变量,即使函数在该作用域之外执行。常用于创建私有变量和保存状态。缺点是被引用的变量不会被垃圾回收,滥用可能导致内存泄漏。

## 变量提升(了解)

`var` 声明和 `function` 声明会被"提升"到作用域顶部:

```js
console.log(a)   // undefined(不报错,var 声明被提升,赋值没有)
var a = 1

console.log(b)   // ❌ ReferenceError(let 有"暂时性死区")
let b = 2

fn()             // ✅ 函数声明整体提升,可以先调用后定义
function fn() {}
```

记住结论:**用 `let`/`const` + 先声明后使用,就永远不会踩提升的坑。**

## 练习

1. 预测输出:
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
2. 写一个 `createWallet(initial)`:返回 `{ deposit(n), getBalance() }` 两个方法,余额外部不可直接访问。
3. 经典题:解释为什么下面代码打印三个 `3`,如何修复?
```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100)
}
```

::: details 参考答案(第 3 题)
`var` 只有一个共享的 `i`,定时器回调执行时循环早已结束,`i` 已是 3。

修复:把 `var` 改成 `let` —— `let` 在每轮循环创建新的块级变量,每个回调闭包捕获各自的 `i`,输出 0、1、2。这道题同时考察了作用域、闭包和异步,是面试常客。
:::
