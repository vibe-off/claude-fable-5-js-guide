# 错误处理与调试

> 本节目标:看得懂报错信息,会用 DevTools 排查问题,掌握 try/catch。**调试能力是 AI 时代前端工程师的核心竞争力** —— AI 能写代码,但判断"哪里错了、为什么错"需要你。

## 读懂报错信息

报错不可怕,**不读报错才可怕**。控制台的红色报错包含三个关键信息:错误类型、错误描述、发生位置(文件名:行号,可点击跳转)。

最常见的几种错误:

| 报错 | 含义 | 常见原因 |
| --- | --- | --- |
| `xxx is not defined` | 变量不存在 | 拼写错误、未声明、加载顺序不对 |
| `Cannot read properties of null (reading 'xxx')` | 在 null 上取属性 | `querySelector` 没找到元素 |
| `Cannot read properties of undefined` | 在 undefined 上取属性 | 接口数据还没回来、取值路径写错 |
| `xxx is not a function` | 把非函数当函数调用 | 拼错方法名、变量被覆盖 |
| `Unexpected token` | 语法错误 | 括号/引号不配对 |

排查三步法:**看类型 → 点行号 → 打印相关变量**。

## console 家族

```js
console.log('普通输出', obj)
console.error('红色错误')
console.warn('黄色警告')
console.table(goodsList)     // 对象数组以表格展示,非常直观!
console.time('耗时')
// ...一段代码
console.timeEnd('耗时')      // 测量执行时间
```

## 断点调试

`console.log` 适合快速查看;逻辑复杂时用**断点**更高效:

1. DevTools → **Sources** 面板 → 找到你的 JS 文件;
2. 点击行号设置断点(蓝色标记);
3. 刷新页面,代码在断点处**暂停**;
4. 悬停查看任意变量当前值,右侧 Scope 面板看整个作用域;
5. 控制按钮:**继续**(F8)、**单步跳过**(F10)、**单步进入**(F11)。

也可以在代码里写 `debugger` 语句,执行到就自动暂停。

::: tip 什么时候用断点
"这个函数到底有没有执行?""循环到第几次出的问题?""这个变量是在哪一步变坏的?"—— 这类"过程"问题,断点比 log 快得多。
:::

## try / catch

对**可能失败的操作**(网络请求、JSON 解析)做兜底,避免一处报错整个程序停摆:

```js
try {
  const data = JSON.parse(rawText)   // 可能抛错的代码
  render(data)
} catch (err) {
  console.error('解析失败:', err.message)
  showErrorTip('数据格式有误')        // 给用户友好提示
} finally {
  hideLoading()                       // 无论成败都执行
}
```

也可以主动抛错,让问题尽早暴露:

```js
function setAge(age) {
  if (typeof age !== 'number' || age < 0) {
    throw new Error(`非法年龄:${age}`)
  }
}
```

::: warning 不要吞掉错误
`catch (err) {}` 里什么都不写,错误会无声消失,排查起来生不如死。**至少要 `console.error(err)`。**
:::

## 网络问题排查:Network 面板

接口相关的问题,去 DevTools 的 **Network** 面板:

- 请求发出去了吗?URL 对吗?
- 状态码是多少?(200/404/500)
- **Payload**:你发给后端的参数对吗?
- **Response**:后端实际返回了什么?

"后端说接口没问题,前端说代码没问题"的争论,Network 面板一看便知。

## 调试的思维模式

1. **复现**:稳定让 bug 出现,才能验证是否修好;
2. **定位**:用二分法缩小范围 —— 在中间打印,判断问题在前半还是后半;
3. **假设与验证**:"我猜是 X 导致的" → 设计一个最小实验验证;
4. **只改一处**:一次改一个地方,否则修好了也不知道是哪个改动起效。

把报错信息、相关代码、你的排查过程发给 AI,是高效的求助方式 —— 但**先自己走一遍上述流程**,你的排查能力才会成长。详见[与 AI 一起学前端](/advanced/learning-with-ai)。

## 练习

1. 故意制造并读懂三种报错:访问未声明变量、对 `null` 取属性、调用不存在的方法。
2. 用断点调试[事件章节的待办清单](/basics/events#综合案例-待办清单-todo-list):在 `render` 函数设断点,观察每次 `todos` 的变化。
3. 写一个"安全的 JSON 解析"函数 `safeParse(str, fallback)`:解析失败不报错,返回 fallback。

::: details 参考答案(第 3 题)
```js
function safeParse(str, fallback = null) {
  try {
    return JSON.parse(str)
  } catch (err) {
    console.warn('JSON 解析失败,已使用默认值', err.message)
    return fallback
  }
}
```
:::
