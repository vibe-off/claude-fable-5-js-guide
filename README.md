# JavaScript 学习指南 · JavaScript Learning Guide

面向大学生的系统化 JavaScript 教程,基于 [VitePress](https://vitepress.dev) 构建,中英双语。

A structured JavaScript course for college students, built with [VitePress](https://vitepress.dev), bilingual (简体中文 / English).

**📖 在线阅读 / Read online:** https://vibe-off.github.io/claude-fable-5-js-guide/

> 🤖 Built with **Claude Fable 5**. Thanks, Fable 5, for the contribution!

## 内容结构 / Structure

| 阶段 Stage | 内容 Content |
| --- | --- |
| 基础篇 Fundamentals | 变量、流程控制、函数、数组对象、DOM、事件 |
| 核心概念 Key Concepts | 作用域与闭包、this、原型、ES6+、异步、fetch、调试 |
| 拓展篇 Beyond the Basics | 工程化、浏览器存储、防抖节流、与 AI 协作、迈向 Vue 3 |

每一节都包含可运行的示例代码、常见坑提示,以及带参考答案的练习题。

Every section ships runnable examples, pitfall warnings, and exercises with collapsible reference answers.

## 本地开发 / Local Development

```bash
npm install
npm run docs:dev     # dev server
npm run docs:build   # production build → docs/.vitepress/dist
```

## 部署 / Deployment

推送到 `main` 分支后,GitHub Actions 会自动构建并发布到 GitHub Pages。

Pushes to `main` trigger a GitHub Actions workflow that builds and deploys to GitHub Pages.
