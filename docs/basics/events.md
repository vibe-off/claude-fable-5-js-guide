# 事件

> 本节目标:会监听用户操作,理解事件对象,掌握表单取值与事件委托,完成第一个完整交互案例。

事件 = **用户的操作**(点击、输入、滚动)或**浏览器的通知**(加载完成)。"监听事件 + 执行回调"是网页交互的基本模型。

## 事件监听

```js
const btn = document.querySelector('#btn')

btn.addEventListener('click', () => {
  console.log('按钮被点击了')
})
```

三要素:**事件源**(btn)、**事件类型**(click)、**回调函数**(点击后做什么)。

常用事件类型:

| 类型 | 触发时机 |
| --- | --- |
| `click` | 点击 |
| `input` | 表单内容变化(每敲一个字都触发) |
| `change` | 表单值改变且失焦(下拉框常用) |
| `submit` | 表单提交 |
| `keydown` | 按下键盘 |
| `mouseenter` / `mouseleave` | 鼠标移入 / 移出 |
| `scroll` | 滚动 |

## 事件对象

回调函数的第一个参数是**事件对象**,装着这次操作的详细信息:

```js
input.addEventListener('keydown', e => {
  console.log(e.key)        // 按了哪个键,如 'Enter'
  if (e.key === 'Enter') {
    console.log('提交:', input.value)
  }
})

form.addEventListener('submit', e => {
  e.preventDefault()   // 阻止默认行为:表单默认会刷新页面!
  // ... 校验和提交逻辑
})
```

`e.target` 是**实际被点击的元素**,配合事件委托使用(见下文)。

## 表单取值

```js
const nameInput = document.querySelector('#name')
nameInput.value            // 文本框内容(字符串!)

const agree = document.querySelector('#agree')
agree.checked              // 复选框是否勾选(布尔)

const city = document.querySelector('#city')
city.value                 // select 选中项的 value
```

## 事件委托

列表有 100 个 `<li>`,不需要绑 100 个监听器 —— 把监听器绑在父元素上,利用**事件冒泡**(子元素的事件会向上传递),通过 `e.target` 判断点了谁:

```js
ul.addEventListener('click', e => {
  if (e.target.tagName === 'LI') {
    e.target.classList.toggle('done')
  }
})
```

好处:性能更好,且**后来动态创建的 li 也自动有效**。这是高频面试题。

## 综合案例:待办清单(Todo List)

综合运用本篇全部知识,请务必独立完成:

```html
<input id="task" placeholder="输入任务,回车添加">
<ul id="list"></ul>
```

```js
const input = document.querySelector('#task')
const list = document.querySelector('#list')
const todos = []

function render() {
  list.innerHTML = todos
    .map((t, i) => `<li>${t} <button data-index="${i}">删除</button></li>`)
    .join('')
}

// 回车添加
input.addEventListener('keydown', e => {
  if (e.key === 'Enter' && input.value.trim() !== '') {
    todos.push(input.value.trim())
    input.value = ''
    render()
  }
})

// 事件委托处理删除
list.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    todos.splice(Number(e.target.dataset.index), 1)
    render()
  }
})
```

注意这个案例的架构:**数据(todos 数组)是唯一的真相,页面永远由数据渲染而来**。操作只改数据,改完调 `render()`。这正是 Vue 的核心思想 —— 学到 Vue 时你会发现,它只是把 `render()` 自动化了。

## 练习

1. 做一个计数器:两个按钮 `+1` / `-1`,页面显示当前数字,不允许小于 0。
2. 做一个简易换肤:点击不同颜色按钮,改变页面背景色。
3. 给待办清单增加"全部清空"按钮和任务计数显示。
4. (挑战)给待办清单的每一项加"完成"状态:点击文字切换删除线(提示:todos 里存对象 `{ text, done }`)。
