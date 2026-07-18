# The Road to Vue 3

> Goals: understand *why* frameworks exist; verify your JS fundamentals are ready; transition smoothly into Vue 3.

## Why Frameworks

Recall the pattern from the [todo list capstone](/en/basics/events#capstone-a-todo-list):

```js
// The data is the single source of truth
const todos = []

// After every data change, re-render by hand
function render() {
  list.innerHTML = todos.map(t => `<li>${t}</li>`).join('')
}
```

This "**data drives the view**" idea is sound, but doing it by hand hurts: you must remember to call `render` every time; as pages grow, render logic and state management spiral; full innerHTML swaps are slow and lose input focus.

**Vue's job is to automate this exact pattern**: you change data, the view updates itself.

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

Compare: no `querySelector`, no `addEventListener`, no `render()` — but you **know** they happen behind the curtain. Vue is not magic to you; it's an efficiency tool.

## JS Readiness Checklist

Before Vue, confirm you can do each of these unaided; patch gaps in the linked chapters:

- ☐ Fluent with `const/let`, template strings, `===` (→ [Variables & Types](/en/basics/variables))
- ☐ Fluent with `map/filter/reduce` over arrays of objects (→ [Arrays & Objects](/en/basics/arrays-objects))
- ☐ Comfortable with destructuring, spread, optional chaining (→ [Essential ES6+](/en/core/es6))
- ☐ Understand callbacks; can tell regular vs. arrow function `this` apart (→ [Understanding this](/en/core/this))
- ☐ Can fetch an API with async/await and render the result (→ [Async](/en/core/async), [Network Requests](/en/core/fetch))
- ☐ Can read errors, set breakpoints, use the Network panel (→ [Errors & Debugging](/en/core/debugging))
- ☐ Understand ESM import/export; can run a Vite project (→ [Modules & Tooling](/en/advanced/modules))

**Why these are prerequisites**: expressions in Vue templates are JS; `v-for` walks arrays; component communication passes objects and callbacks; `setup` is wall-to-wall ESM imports and destructuring; data fetching is async/await. Vue won't patch your JS — it amplifies whatever gaps you bring.

## Vue 3 Learning Path Preview

1. **Start**: `npm create vue@latest`; meet the three-block structure of a Single-File Component;
2. **Template syntax**: interpolation, `v-bind`, `v-on`, `v-if`, `v-for`, `v-model`;
3. **Reactivity core**: `ref`, `reactive`, `computed`, `watch`;
4. **Components**: splitting, `props` down, `emit` up, slots;
5. **Routing**: Vue Router for single-page navigation;
6. **State management**: Pinia for cross-component shared data;
7. **Practice**: a component library (Element Plus) + axios + a complete project.

Same method as this guide: minimal hands-on example per concept, then a capstone; let AI explain and spar with you, but **every capstone must be reproducible without it**.

## Closing Words

Frontend tech moves fast, but **the tools change while the bedrock doesn't**: HTML/CSS/JS, HTTP, data-driven thinking, and a debugging methodology. Truly digest this guide, and whether it's Vue, React, or the next framework after those, you'll pick it up in a week or two — because you'll recognize that they all solve problems you've personally run into.

Happy learning! 🚀
