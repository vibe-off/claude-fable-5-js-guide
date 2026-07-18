# 常用编程技巧

> 本节目标:掌握面试和实战双高频的几个经典技巧:防抖节流、深浅拷贝、常见"手写题"。

## 防抖与节流

场景:`input` 事件每敲一个字触发一次,如果每次都发请求搜索,请求量爆炸。解决方案有两种思路:

### 防抖(debounce):等你停下来再执行

事件持续触发时不执行,**停止触发 n 毫秒后才执行一次**。适合:搜索联想、表单校验、窗口 resize。

```js
function debounce(fn, delay = 300) {
  let timer = null
  return function (...args) {
    clearTimeout(timer)              // 又触发了?重新计时
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

input.addEventListener('input', debounce(e => {
  console.log('搜索:', e.target.value)
}, 500))
```

### 节流(throttle):按固定频率执行

事件持续触发时,**每 n 毫秒最多执行一次**。适合:滚动监听、按钮防连点、鼠标移动。

```js
function throttle(fn, interval = 300) {
  let last = 0
  return function (...args) {
    const now = Date.now()
    if (now - last >= interval) {
      last = now
      fn.apply(this, args)
    }
  }
}

window.addEventListener('scroll', throttle(() => {
  console.log('滚动位置:', window.scrollY)
}, 200))
```

::: tip 一句话区分
防抖:**只认最后一次**(电梯关门:一直有人进就一直不关)。节流:**固定频率**(技能冷却:CD 没好按了也没用)。注意两者都用了**闭包**保存 timer/last —— 这就是闭包的实战价值。
:::

## 深拷贝与浅拷贝

引用类型赋值只是复制"地址",两个变量指向同一个对象:

```js
const a = { name: '小明', skills: ['JS'] }
const b = a
b.name = '小红'
console.log(a.name)   // '小红' —— a 也被改了!
```

**浅拷贝**:只复制第一层,嵌套的对象仍然共享:

```js
const c = { ...a }            // 展开运算符,或 Object.assign({}, a)
c.name = '小刚'               // ✅ 第一层独立
c.skills.push('Vue')          // ⚠️ a.skills 也变了!嵌套层还是共享的
```

**深拷贝**:完全独立的副本:

```js
const d = structuredClone(a)         // 现代浏览器内置,首选
const e = JSON.parse(JSON.stringify(a))  // 老办法:简单但丢函数、undefined、Date 变字符串
```

面试常要求手写递归版深拷贝,理解思路即可:遍历属性,遇到对象就递归拷贝。

## 高频"手写题"速览

```js
// 数组去重
const unique = arr => [...new Set(arr)]

// 数组扁平化
;[1, [2, [3]]].flat(Infinity)   // [1, 2, 3]

// 打乱数组(洗牌)
const shuffle = arr => [...arr].sort(() => Math.random() - 0.5)

// 取 min~max 随机整数
const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

// 千分位格式化
;(1234567.89).toLocaleString()   // '1,234,567.89'

// 日期格式化
new Date().toLocaleDateString()  // '2026/7/17'
```

## 练习

1. 给搜索框接上防抖 + [fetch 章节](/core/fetch)的用户搜索接口,观察 Network 面板请求次数的变化。
2. 解释输出并改正,使 `list2` 的修改不影响 `list1`:
```js
const list1 = [{ id: 1, tags: ['a'] }]
const list2 = [...list1]
list2[0].tags.push('b')
console.log(list1[0].tags)
```
3. 手写 `unique(arr)` 的循环版(不用 Set),巩固数组基础。

::: details 参考答案(第 2 题)
输出 `['a', 'b']`。展开运算符是浅拷贝,`list2[0]` 和 `list1[0]` 是同一个对象。改用深拷贝:`const list2 = structuredClone(list1)`。
:::
