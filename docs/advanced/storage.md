# 浏览器存储

> 本节目标:会用 localStorage 持久化数据,了解各种存储方案的适用场景。

页面一刷新,JS 变量全部归零。想让数据"留下来"(记住登录状态、保存待办列表),就需要浏览器存储。

## localStorage

最常用的方案:**永久存储**(除非手动删除),同一网站下所有页面共享:

```js
localStorage.setItem('username', '小明')   // 存
localStorage.getItem('username')           // 取:'小明',没有则 null
localStorage.removeItem('username')        // 删单个
localStorage.clear()                       // 清空
```

### 存对象和数组:必须转 JSON

localStorage **只能存字符串**,直接存对象会变成无用的 `[object Object]`:

```js
const todos = [{ text: '学习', done: false }]

localStorage.setItem('todos', JSON.stringify(todos))          // 存:对象 → 字符串
const saved = JSON.parse(localStorage.getItem('todos')) ?? [] // 取:字符串 → 对象,兜底空数组
```

::: warning 两个必踩的坑
1. 忘了 `JSON.stringify/parse`,存进去的是 `[object Object]`;
2. 第一次访问时 `getItem` 返回 `null`,直接 `JSON.parse(null)` 得到 null,后续 `.map` 报错 —— 记得用 `?? []` 兜底。
:::

## sessionStorage 与 Cookie

| 方案 | 生命周期 | 容量 | 典型用途 |
| --- | --- | --- | --- |
| `localStorage` | 永久(手动删除) | ~5MB | 主题偏好、草稿、离线数据 |
| `sessionStorage` | 关闭标签页即清除 | ~5MB | 单次会话的临时数据 |
| Cookie | 可设过期时间 | ~4KB | 登录凭证(每次请求自动带给服务器) |

`sessionStorage` 的 API 与 `localStorage` 完全相同。Cookie 一般由后端设置,前端了解即可;现代项目登录态更多用 token 存 localStorage,请求时放在 header 里。

## 实战:待办清单持久化

给[待办清单](/basics/events#综合案例-待办清单-todo-list)加两行代码,刷新不丢数据:

```js
// 初始化时:从本地读取
const todos = JSON.parse(localStorage.getItem('todos')) ?? []

function save() {
  localStorage.setItem('todos', JSON.stringify(todos))
}

// 每次增删改后,render() 的同时调用 save()
```

在 DevTools → **Application** 面板 → Local Storage,可以直观地看到存了什么、手动修改和删除。

## 练习

1. 做"记住用户名":输入框 + 保存按钮,存入 localStorage,刷新页面后自动回填。
2. 做"主题切换":按钮切换深色/浅色主题(切换 body 类名),选择存入 localStorage,刷新保持。
3. 给待办清单完成持久化改造,并在 Application 面板验证。

::: details 参考答案(第 2 题)
```js
// 初始化:读取保存的主题
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark')
}

btn.addEventListener('click', () => {
  document.body.classList.toggle('dark')
  const theme = document.body.classList.contains('dark') ? 'dark' : 'light'
  localStorage.setItem('theme', theme)
})
```
:::
