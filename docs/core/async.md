# 异步编程

> 本节目标:理解 JS 为什么需要异步,掌握 Promise 与 async/await。这是核心概念中**最重要的一节**,直接决定你能否写出真实项目。

## 为什么需要异步

JS 是**单线程**的:同一时刻只能做一件事。如果网络请求(可能要几秒)以"同步"方式执行,页面会完全卡死。

所以 JS 采用**异步**策略:耗时操作(网络请求、定时器、文件读取)先"挂起",主线程继续往下走,操作完成后再回来执行回调。

```js
console.log('1')
setTimeout(() => console.log('2'), 0)   // 即使是 0 毫秒!
console.log('3')
// 输出:1 3 2
```

**同步代码永远先于异步回调执行。** 这背后是事件循环(Event Loop)机制:主线程执行完所有同步代码后,才从任务队列取出异步回调执行。

::: warning 初学者第一大坑
```js
let data
setTimeout(() => { data = '拿到了' }, 1000)
console.log(data)   // undefined!同步代码不会等异步
```
"为什么我请求完数据,外面还是 undefined?"—— 因为你在异步任务完成**之前**就使用了数据。所有依赖异步结果的代码,必须写在回调/then/await 之后。
:::

## 回调地狱

用回调组织多步异步任务,会越套越深:

```js
login(user, res1 => {
  getProfile(res1.id, res2 => {
    getOrders(res2.uid, res3 => {
      // 层层嵌套,难读难维护,错误处理更是灾难
    })
  })
})
```

## Promise

Promise 是一个"**承诺未来会给你结果**"的对象,有三种状态:`pending`(等待)→ `fulfilled`(成功)或 `rejected`(失败),状态一旦改变不可逆。

```js
const p = new Promise((resolve, reject) => {
  // 模拟异步操作
  setTimeout(() => {
    const ok = Math.random() > 0.5
    ok ? resolve('成功的数据') : reject(new Error('失败原因'))
  }, 1000)
})

p.then(data => console.log(data))     // 成功时执行
 .catch(err => console.log(err))      // 失败时执行
 .finally(() => console.log('无论成败都执行'))
```

日常开发中你**很少手写 `new Promise`**,更多是使用返回 Promise 的 API(fetch、axios)。Promise 的核心价值是**链式调用**,把嵌套变成平铺:

```js
login(user)
  .then(res1 => getProfile(res1.id))
  .then(res2 => getOrders(res2.uid))
  .then(res3 => console.log(res3))
  .catch(err => console.log('任何一步出错都会到这里', err))
```

## async / await:异步的最终形态

`async/await` 是 Promise 的语法糖,让异步代码**看起来像同步**,是当前的主流写法:

```js
async function loadPage() {
  try {
    const res1 = await login(user)          // "等"Promise 出结果
    const res2 = await getProfile(res1.id)
    const res3 = await getOrders(res2.uid)
    console.log(res3)
  } catch (err) {
    console.log('出错了:', err)
  }
}
```

规则:

- `await` 只能写在 `async` 函数内(或 ES 模块顶层);
- `await` 后面跟一个 Promise,"暂停"等待其结果 —— 但只暂停这个函数,**不阻塞主线程**;
- `async` 函数的返回值自动包成 Promise;
- 错误处理用 `try/catch`。

### 并发:Promise.all

多个请求互不依赖时,不要挨个 `await`(串行浪费时间),用 `Promise.all` 并发:

```js
// ❌ 串行:总耗时 = 三个请求之和
const a = await getBanner()
const b = await getGoods()

// ✅ 并发:总耗时 = 最慢的那个
const [banner, goods] = await Promise.all([getBanner(), getGoods()])
```

## 练习

1. 预测输出顺序:
```js
console.log('A')
setTimeout(() => console.log('B'), 0)
Promise.resolve().then(() => console.log('C'))
console.log('D')
```
2. 写一个 `sleep(ms)` 函数,返回 Promise,配合 `await sleep(1000)` 实现"等待 1 秒"。
3. 用 async/await 改写:先 `sleep(1000)` 打印"3",再等 1 秒打印"2",再等 1 秒打印"1",最后打印"发射!"。

::: details 参考答案
第 1 题:`A D C B`。同步代码先执行(A、D);Promise 回调是**微任务**,优先于 `setTimeout` 的**宏任务**(面试考点,理解即可)。

第 2、3 题:
```js
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

async function launch() {
  for (let i = 3; i >= 1; i--) {
    console.log(i)
    await sleep(1000)
  }
  console.log('发射!')
}
launch()
```
:::
