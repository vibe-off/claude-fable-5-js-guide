# 迈向 Vue 3

> 本节目标:理解"为什么需要框架",检验 JS 基础是否达标,平滑衔接 Vue 3 学习。

## 为什么需要框架

回顾[待办清单案例](/basics/events#综合案例-待办清单-todo-list)的模式:

```js
// 数据是唯一的真相
const todos = []

// 每次改完数据,手动重新渲染
function render() {
  list.innerHTML = todos.map(t => `<li>${t}</li>`).join('')
}
```

这个"**数据驱动视图**"的思路很好,但手写有痛点:每次都要手动调 `render`;页面复杂后,渲染逻辑和状态管理会失控;全量 innerHTML 性能差、丢失输入焦点。

**Vue 做的事,就是把这个模式自动化**:你只管改数据,视图自动更新。

```vue
<script setup>
import { ref } from 'vue'

const todos = ref([])
const input = ref('')

function add() {
  todos.value.push(input.value)
  input.value = ''
}
</script>

<template>
  <input v-model="input" @keyup.enter="add">
  <ul>
    <li v-for="(t, i) in todos" :key="i">{{ t }}</li>
  </ul>
</template>
```

对比一下:没有 `querySelector`,没有 `addEventListener`,没有 `render()` —— 但你**知道**它们在幕后发生,所以 Vue 对你不是魔法,只是效率工具。

## JS 基础自检清单

进入 Vue 前,确认以下每一项都"能独立做到",有短板回到对应章节补:

- ☐ 熟练使用 `const/let`、模板字符串、`===`(→ [变量与数据类型](/basics/variables))
- ☐ 熟练使用 `map/filter/reduce` 处理对象数组(→ [数组与对象](/basics/arrays-objects))
- ☐ 会解构、展开运算符、可选链(→ [ES6+ 常用特性](/core/es6))
- ☐ 理解回调函数,分得清普通函数和箭头函数的 this(→ [this 指向](/core/this))
- ☐ 会用 async/await + fetch 请求接口并渲染(→ [异步编程](/core/async)、[网络请求](/core/fetch))
- ☐ 会看报错、会打断点、会用 Network 面板(→ [错误处理与调试](/core/debugging))
- ☐ 理解 ESM 导入导出,跑得起来 Vite 项目(→ [模块化与工程化](/advanced/modules))

**为什么这些是 Vue 的前置**:Vue 模板里的表达式是 JS;`v-for` 处理的是数组;组件通信传递的是对象和回调;`setup` 里全是 ESM 导入和解构;接口请求就是 async/await。Vue 不会替你补 JS,只会放大 JS 的短板。

## Vue 3 学习路线预告

1. **起步**:`npm create vue@latest`,认识单文件组件(SFC)的三段结构;
2. **模板语法**:插值、`v-bind`、`v-on`、`v-if`、`v-for`、`v-model`;
3. **响应式核心**:`ref`、`reactive`、`computed`、`watch`;
4. **组件化**:拆分组件、`props` 父传子、`emit` 子传父、插槽;
5. **路由**:Vue Router 实现单页应用的页面切换;
6. **状态管理**:Pinia 管理跨组件共享的数据;
7. **实战**:组件库(Element Plus)+ axios + 完整项目。

学习方法与本指南一致:每个概念先动手写最小示例,再做综合案例,让 AI 解释和陪练,但**案例必须能独立复现**。

## 结语

前端技术更新很快,但**变化的是工具,不变的是底层**:HTML/CSS/JS、HTTP、数据驱动的思想、调试的方法论。把本指南的内容真正吃透,后面无论是 Vue、React 还是下一个新框架,你都能在一两周内上手 —— 因为你会发现,它们解决的都是你亲手遇到过的问题。

祝学习顺利!🚀
