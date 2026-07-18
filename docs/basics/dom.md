# DOM 操作

> 本节目标:会获取页面元素,修改内容、样式和属性,动态创建元素。

DOM(Document Object Model)是浏览器把 HTML 解析成的**对象树**。JS 通过操作这棵树来改变页面 —— 这就是"网页会动"的原理。

```
document
└── html
    ├── head
    └── body
        ├── h1
        └── ul
            ├── li
            └── li
```

::: tip 为什么学 Vue 前必须懂 DOM
Vue 帮你"自动操作 DOM",但你得知道它自动化的是什么,出了问题才知道去哪查。面试也常考原生 DOM。
:::

## 获取元素

```js
// 首选:CSS 选择器语法,和 CSS 怎么写这里就怎么写
const title = document.querySelector('#title')      // id
const box = document.querySelector('.box')          // 类,只取第一个
const items = document.querySelectorAll('ul li')    // 所有匹配项(伪数组)

// querySelectorAll 的结果可以 forEach
items.forEach(li => console.log(li))
```

找不到元素时返回 `null`,此时访问它的属性会报经典错误 `Cannot read properties of null` —— 通常是选择器写错了,或 script 在元素加载前就执行了(把 `<script>` 放 body 底部)。

## 修改内容

```js
title.textContent = '纯文本内容'          // 只当文本
box.innerHTML = '<strong>可以解析标签</strong>'
```

::: warning innerHTML 与安全
把**用户输入**直接塞进 `innerHTML` 会造成 XSS 攻击(用户输入 `<script>` 恶意代码)。显示用户输入一律用 `textContent`。
:::

## 修改样式与类名

```js
box.style.backgroundColor = 'pink'   // 行内样式:CSS 属性名转小驼峰
box.style.width = '200px'            // 值是字符串,别忘单位

// 更推荐:提前在 CSS 写好类,JS 只负责切换
box.classList.add('active')
box.classList.remove('active')
box.classList.toggle('active')       // 有则删,无则加
box.classList.contains('active')     // 是否包含
```

## 修改属性

```js
const img = document.querySelector('img')
img.src = './new.png'
img.alt = '新图片'

const input = document.querySelector('input')
input.value = '默认内容'      // 表单值用 value,不是 textContent!
input.disabled = true
```

## 创建与删除元素

```js
const ul = document.querySelector('ul')

const li = document.createElement('li')   // 创建
li.textContent = '新增的一项'
ul.appendChild(li)                        // 插到末尾

li.remove()                               // 删除自己
```

### 渲染列表:数据驱动的雏形

**根据数组渲染页面**是最重要的实战模式 —— Vue 的 `v-for` 干的就是这件事:

```js
const list = ['HTML', 'CSS', 'JavaScript']
const ul = document.querySelector('ul')

ul.innerHTML = list.map(item => `<li>${item}</li>`).join('')
```

体会这个思路:**不直接一个个改页面,而是先加工数据,再一次性生成页面**。数据变了,重新渲染即可。

## 练习

1. 页面放一个 `<p id="text">`,用 JS 把内容改为当前时间(`new Date().toLocaleString()`)。
2. 页面放一个空 `<ul>`,用上面的 `goodsList` 数据渲染商品列表,每个 `<li>` 显示"名称 —— 价格"。
3. 在第 2 题基础上:库存为 0 的商品,`<li>` 加上 `.sold-out` 类(CSS 里写好灰色删除线样式)。

::: details 参考答案(第 3 题)
```js
ul.innerHTML = goodsList
  .map(g => `<li class="${g.stock === 0 ? 'sold-out' : ''}">
    ${g.name} —— ¥${g.price}
  </li>`)
  .join('')
```
:::
