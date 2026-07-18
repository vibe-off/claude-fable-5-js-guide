# JavaScript Learning Guide

English | [简体中文](./README.zh-CN.md)

A structured JavaScript course for college students, built with [VitePress](https://vitepress.dev), fully bilingual (English / Simplified Chinese).

**📖 Read online:** https://vibe-off.github.io/claude-fable-5-js-guide/

> 🤖 Built with **Claude Fable 5**. Thanks, Fable 5, for the contribution!

## Structure

| Stage | Content |
| --- | --- |
| Fundamentals | Variables, control flow, functions, arrays & objects, DOM, events |
| Key Concepts | Scope & closures, `this`, prototypes, ES6+, async, fetch, debugging |
| Beyond the Basics | Tooling, browser storage, debounce & throttle, learning with AI, the road to Vue 3 |

Every section ships runnable examples, pitfall warnings, and exercises with collapsible reference answers.

## Local Development

```bash
npm install
npm run docs:dev     # dev server
npm run docs:build   # production build → docs/.vitepress/dist
```

## Deployment

Pushes to `main` trigger a GitHub Actions workflow that builds the site and deploys it to GitHub Pages.
