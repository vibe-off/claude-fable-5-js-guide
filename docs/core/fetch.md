# 网络请求

> 本节目标:理解前后端交互模型,会用 fetch 获取和提交数据,并渲染到页面。

前端页面的数据来自后端**接口(API)**:前端发 HTTP 请求,后端返回 JSON 数据。这个过程俗称 AJAX(异步 JavaScript 与 XML,如今数据格式基本都是 JSON)。

```
浏览器(前端)                     服务器(后端)
    │  GET /api/goods  ────────────→  │
    │  ←──────  JSON: [{...},{...}]   │
    │  JS 把数据渲染成页面              │
```

## HTTP 基础常识

- **URL**:接口地址,如 `https://api.example.com/goods?page=1`(`?` 后是查询参数);
- **请求方法**:`GET` 获取数据、`POST` 提交数据、`PUT/PATCH` 修改、`DELETE` 删除;
- **状态码**:`200` 成功、`404` 找不到、`401` 未登录、`500` 服务器错误;
- **请求体**:POST 提交的数据,通常是 JSON 字符串。

## fetch:浏览器内置的请求 API

### GET 请求

```js
async function getUsers() {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    if (!res.ok) {                       // fetch 对 404/500 不会自动报错!
      throw new Error(`HTTP ${res.status}`)
    }
    const data = await res.json()        // 响应体解析成 JS 对象(也是异步)
    console.log(data)
    return data
  } catch (err) {
    console.error('请求失败:', err)
  }
}
```

::: tip 练手用免费接口
`jsonplaceholder.typicode.com` 提供免费的假数据接口(users、posts、todos),学习阶段随便请求,不需要注册。
:::

### POST 请求

```js
const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: '标题', body: '内容', userId: 1 })
})
const data = await res.json()
```

## 完整案例:请求数据并渲染列表

前端最核心的工作流:**请求 → 加工 → 渲染**。

```html
<ul id="user-list">加载中...</ul>
```

```js
const ul = document.querySelector('#user-list')

async function renderUsers() {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    const users = await res.json()
    ul.innerHTML = users
      .map(u => `<li>${u.name}(${u.email})</li>`)
      .join('')
  } catch (err) {
    ul.innerHTML = '<li>加载失败,请重试</li>'
  }
}

renderUsers()
```

注意这个案例覆盖了前面所有核心知识:async/await(异步)、`map/join`(数组)、`innerHTML`(DOM)、`try/catch`(错误处理)。**能独立写出它,说明你的基础过关了。**

## 关于 axios

实际项目(尤其 Vue 项目)更常用第三方库 **axios**:自动转换 JSON、自动对错误状态码报错、支持拦截器(统一加 token)。学会 fetch 后,axios 十分钟就能上手:

```js
const { data } = await axios.get('https://api.example.com/goods')
```

## 常见问题

- **CORS 跨域错误**:控制台报 `blocked by CORS policy` —— 这是浏览器的安全机制,需要后端配置允许,或开发时用代理解决(Vite 的 `server.proxy`)。先知道"这不是你代码写错了"即可;
- **数据是 undefined**:九成是没等 Promise(忘了 `await`),或取值路径不对 —— `console.log` 打印整个响应,对照着取。

## 练习

1. 请求 `https://jsonplaceholder.typicode.com/todos?_limit=10`,渲染成待办列表,已完成的(`completed: true`)加删除线。
2. 做一个"搜索用户"功能:输入框 + 按钮,点击后请求 users 接口,只显示名字包含关键词的用户(提示:`filter` + `includes`)。
3. 给第 1 题加上"加载中"和"加载失败"状态显示。
