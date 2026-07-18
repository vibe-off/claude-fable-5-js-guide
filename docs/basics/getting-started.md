# 认识 JavaScript

> 本节目标:知道 JS 是什么、在哪里运行,搭好开发环境,跑出第一行代码。

## JavaScript 是什么

一个网页由三部分组成:

- **HTML** 负责结构 —— 页面上有什么(标题、按钮、图片);
- **CSS** 负责样式 —— 长什么样(颜色、布局、字体);
- **JavaScript** 负责行为 —— 能做什么(点击按钮弹窗、请求数据、切换页面)。

JS 最初只能跑在浏览器里,2009 年 Node.js 出现后也能跑在服务器和命令行中。如今前端工程化工具(Vite、npm)、桌面应用(VS Code 本身)、小程序,底层都是 JS。**学好 JS,是学 Vue、React 等一切前端框架的前提。**

## 搭建开发环境

只需要三样东西:

1. **Chrome 浏览器** —— 运行代码 + 调试工具(DevTools);
2. **VS Code** —— 写代码的编辑器,装上 `Live Server` 插件可以自动刷新页面;
3. **Node.js**(LTS 版本)—— 现在先不用深究,后面工程化章节会用到。

## 运行第一段代码

### 方式一:浏览器控制台(最快)

在任意网页按 `F12`(或右键 → 检查)打开 DevTools,切到 **Console** 面板,输入:

```js
console.log('Hello, JavaScript!')
1 + 1
```

控制台是你学习期间最好的"草稿纸",任何代码片段都可以先在这里试。

### 方式二:HTML 中引入(标准方式)

新建 `index.html`:

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>第一个页面</title>
</head>
<body>
  <h1>Hello</h1>
  <!-- script 通常放在 body 底部,保证页面元素先加载 -->
  <script src="./main.js"></script>
</body>
</html>
```

新建 `main.js`:

```js
console.log('页面加载完成')
alert('欢迎!')
```

用 VS Code 的 Live Server 打开,浏览器会弹出提示框,控制台会打印文字。

::: tip console.log 是你最重要的工具
初学阶段,遇到"不知道这个变量现在是什么值"的情况,第一反应就应该是 `console.log(变量)` 打印出来看。会打印,就会调试一半了。
:::

## 一些约定

- 语句末尾的分号可写可不写,**全文保持统一**即可(本指南不写分号,与 Vue 官方风格一致);
- 注释:`// 单行注释`,`/* 多行注释 */`;
- 代码大小写敏感:`name` 和 `Name` 是两个不同的变量。

## 练习

1. 打开 Chrome 控制台,打印出你的名字和 `2026 - 你的出生年份`。
2. 创建 `index.html` + `main.js`,页面显示一个 `<h1>`,并在控制台打印任意内容。

::: details 参考答案(第 1 题)
```js
console.log('张三')
console.log(2026 - 2005)
```
:::
