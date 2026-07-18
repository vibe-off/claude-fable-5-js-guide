import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/claude-fable-5-js-guide/',
  lastUpdated: true,
  themeConfig: {
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                displayDetails: '显示详细列表',
                footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' }
              }
            }
          }
        }
      }
    }
  },
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: 'JavaScript 学习指南',
      description: '面向大学生的 JavaScript 系统教程:基础篇 · 核心概念 · 拓展篇',
      themeConfig: {
        nav: [
          { text: '首页', link: '/' },
          { text: '基础篇', link: '/basics/getting-started' },
          { text: '核心概念', link: '/core/scope-closure' },
          { text: '拓展篇', link: '/advanced/modules' }
        ],
        sidebar: [
          {
            text: '基础篇',
            collapsed: false,
            items: [
              { text: '认识 JavaScript', link: '/basics/getting-started' },
              { text: '变量与数据类型', link: '/basics/variables' },
              { text: '运算符与流程控制', link: '/basics/flow' },
              { text: '函数', link: '/basics/functions' },
              { text: '数组与对象', link: '/basics/arrays-objects' },
              { text: 'DOM 操作', link: '/basics/dom' },
              { text: '事件', link: '/basics/events' }
            ]
          },
          {
            text: '核心概念',
            collapsed: false,
            items: [
              { text: '作用域与闭包', link: '/core/scope-closure' },
              { text: 'this 指向', link: '/core/this' },
              { text: '原型与类', link: '/core/prototype' },
              { text: 'ES6+ 常用特性', link: '/core/es6' },
              { text: '异步编程', link: '/core/async' },
              { text: '网络请求', link: '/core/fetch' },
              { text: '错误处理与调试', link: '/core/debugging' }
            ]
          },
          {
            text: '拓展篇',
            collapsed: false,
            items: [
              { text: '模块化与工程化', link: '/advanced/modules' },
              { text: '浏览器存储', link: '/advanced/storage' },
              { text: '常用编程技巧', link: '/advanced/patterns' },
              { text: '与 AI 一起学前端', link: '/advanced/learning-with-ai' },
              { text: '迈向 Vue 3', link: '/advanced/next-vue' }
            ]
          }
        ],
        outline: { level: [2, 3], label: '本页目录' },
        docFooter: { prev: '上一节', next: '下一节' },
        lastUpdatedText: '最后更新',
        returnToTopLabel: '回到顶部',
        sidebarMenuLabel: '目录',
        darkModeSwitchLabel: '外观',
        langMenuLabel: '切换语言',
        footer: {
          message: '为课堂教学而作 · 基于 VitePress 构建',
          copyright: 'Built with Claude Fable 5 · 感谢 Fable 5 的贡献'
        }
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      title: 'JavaScript Learning Guide',
      description: 'A structured JavaScript course for college students: Fundamentals · Key Concepts · Beyond the Basics',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Fundamentals', link: '/en/basics/getting-started' },
          { text: 'Key Concepts', link: '/en/core/scope-closure' },
          { text: 'Beyond', link: '/en/advanced/modules' }
        ],
        sidebar: [
          {
            text: 'Fundamentals',
            collapsed: false,
            items: [
              { text: 'Meet JavaScript', link: '/en/basics/getting-started' },
              { text: 'Variables & Types', link: '/en/basics/variables' },
              { text: 'Operators & Control Flow', link: '/en/basics/flow' },
              { text: 'Functions', link: '/en/basics/functions' },
              { text: 'Arrays & Objects', link: '/en/basics/arrays-objects' },
              { text: 'Working with the DOM', link: '/en/basics/dom' },
              { text: 'Events', link: '/en/basics/events' }
            ]
          },
          {
            text: 'Key Concepts',
            collapsed: false,
            items: [
              { text: 'Scope & Closures', link: '/en/core/scope-closure' },
              { text: 'Understanding this', link: '/en/core/this' },
              { text: 'Prototypes & Classes', link: '/en/core/prototype' },
              { text: 'Essential ES6+', link: '/en/core/es6' },
              { text: 'Asynchronous JavaScript', link: '/en/core/async' },
              { text: 'Network Requests', link: '/en/core/fetch' },
              { text: 'Errors & Debugging', link: '/en/core/debugging' }
            ]
          },
          {
            text: 'Beyond the Basics',
            collapsed: false,
            items: [
              { text: 'Modules & Tooling', link: '/en/advanced/modules' },
              { text: 'Browser Storage', link: '/en/advanced/storage' },
              { text: 'Common Techniques', link: '/en/advanced/patterns' },
              { text: 'Learning with AI', link: '/en/advanced/learning-with-ai' },
              { text: 'The Road to Vue 3', link: '/en/advanced/next-vue' }
            ]
          }
        ],
        outline: { level: [2, 3], label: 'On this page' },
        docFooter: { prev: 'Previous', next: 'Next' },
        footer: {
          message: 'Made for the classroom · Built with VitePress',
          copyright: 'Built with Claude Fable 5 · Thanks, Fable 5, for the contribution'
        }
      }
    }
  }
})
