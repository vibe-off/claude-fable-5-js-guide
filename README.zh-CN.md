# JavaScript 学习指南

[English](./README.md) | 简体中文

面向大学生的系统化 JavaScript 教程,基于 [VitePress](https://vitepress.dev) 构建,中英双语。

**📖 在线阅读:** https://vibe-off.github.io/claude-fable-5-js-guide/

> 🤖 Built with **Claude Fable 5**,感谢 Fable 5 的贡献!

## 内容结构

| 阶段 | 内容 |
| --- | --- |
| 基础篇 | 变量、流程控制、函数、数组对象、DOM、事件 |
| 核心概念 | 作用域与闭包、`this`、原型、ES6+、异步、fetch、调试 |
| 拓展篇 | 工程化、浏览器存储、防抖节流、与 AI 协作、迈向 Vue 3 |

每一节都包含可运行的示例代码、常见坑提示,以及带参考答案的练习题。

## 本地开发

```bash
npm install
npm run docs:dev     # 启动开发服务器
npm run docs:build   # 生产构建 → docs/.vitepress/dist
```

## 部署

推送到 `main` 分支后,GitHub Actions 会自动构建并发布到 GitHub Pages。
