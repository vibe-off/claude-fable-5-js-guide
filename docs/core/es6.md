# ES6+ 常用特性

> 本节目标:掌握现代 JS 的高频语法。Vue 3 项目和 AI 生成的代码里,这些语法密度极高,不熟悉它们就"看不懂代码"。

ES6(2015 年)是 JS 历史上最大的一次升级,此后每年小步更新(统称 ES6+)。`let`/`const`、箭头函数、模板字符串前面已讲,本节补齐剩余高频特性。

## 解构赋值

从数组或对象中"按结构取值",**Vue 里天天见**:

```js
// 对象解构:按属性名匹配
const user = { name: '小明', age: 20, city: '杭州' }
const { name, age } = user
// 等价于 const name = user.name; const age = user.age

// 重命名 + 默认值
const { name: userName, vip = false } = user

// 数组解构:按位置匹配
const [first, second] = ['a', 'b', 'c']

// 函数参数解构:接口数据处理常用
function printUser({ name, city }) {
  console.log(`${name} - ${city}`)
}
printUser(user)
```

Vue 3 中的 `const { data } = await axios.get(...)`、`const [count, setCount] = ...` 全是解构。

## 展开运算符 ...

把数组/对象"摊开",**复制与合并的标准写法**:

```js
// 数组
const a = [1, 2]
const b = [...a, 3, 4]          // [1, 2, 3, 4]
const copy = [...a]             // 浅拷贝
Math.max(...[3, 7, 2])          // 7,数组转参数

// 对象
const base = { name: '小明', age: 20 }
const updated = { ...base, age: 21 }   // 复制并覆盖 age
```

`{ ...obj, 某属性: 新值 }` 这个"不改原对象、生成新对象"的模式在 Vue/React 中极其重要。

## 可选链 ?. 与空值合并 ??

处理接口数据时,层层判空的救星:

```js
const res = { data: { user: null } }

// 以前:res.data && res.data.user && res.data.user.name
const name = res.data?.user?.name        // undefined,不报错
const showName = res.data?.user?.name ?? '游客'   // 给默认值
```

::: tip
`Cannot read properties of undefined` 是前端第一大报错。可选链是它的"疫苗",但别无脑到处加 `?.` —— 该有数据的地方拿不到数据,应该排查原因而不是掩盖。
:::

## 对象字面量增强

```js
const name = '小明'
const age = 20

// 属性名与变量名相同时可以简写
const user = { name, age }
// 等价于 { name: name, age: age }

// 方法简写(前面章节一直在用)
const obj = {
  sayHi() {}     // 等价于 sayHi: function () {}
}
```

## 其他高频小特性

```js
// 字符串
'  hi  '.trim()               // 'hi',去首尾空格
'abc'.includes('b')           // true
'5'.padStart(2, '0')          // '05',补零

// 数组
Array.from(document.querySelectorAll('li'))   // 伪数组转真数组
[1, 2, 2, 3].filter((v, i, arr) => arr.indexOf(v) === i)  // 去重
[...new Set([1, 2, 2, 3])]    // [1, 2, 3],Set 去重(更常用)

// 数字遍历对象
Object.entries({ a: 1, b: 2 })   // [['a', 1], ['b', 2]]
```

## 练习

1. 用解构交换两个变量的值(不用临时变量)。
2. `const res = { code: 0, data: { list: [{ id: 1, title: '新闻' }] } }`:一行解构拿到 `list`;安全地取第一条的 `title`,取不到时给默认值 `'暂无'`。
3. 合并两个对象 `defaults = { theme: 'light', size: 14 }` 和 `userConfig = { size: 16 }`,userConfig 优先。

::: details 参考答案
```js
// 1
let x = 1, y = 2
;[x, y] = [y, x]

// 2
const { data: { list } } = res
const title = list?.[0]?.title ?? '暂无'

// 3
const config = { ...defaults, ...userConfig }   // 后展开的覆盖前面的
```
:::
