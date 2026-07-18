# 模块化与工程化

> 本节目标:掌握 ES 模块的导入导出,了解 npm 和 Vite,搭起通往真实项目的桥。

前面我们把代码写在一个 `main.js` 里,真实项目动辄几百个文件 —— 需要**模块化**(拆文件、管依赖)和**工程化**(构建工具、包管理)。

## ES 模块(ESM)

每个文件是一个模块,变量默认私有,通过 `export` / `import` 交流:

```js
// utils.js —— 具名导出(可以导出多个)
export function formatPrice(n) {
  return `¥${n.toFixed(2)}`
}
export const TAX_RATE = 0.06

// config.js —— 默认导出(每个文件只能有一个)
export default {
  apiBase: 'https://api.example.com'
}
```

```js
// main.js —— 导入
import config from './config.js'                    // 默认导入,名字随意
import { formatPrice, TAX_RATE } from './utils.js'  // 具名导入,名字必须对应
import { formatPrice as fp } from './utils.js'      // 重命名

console.log(formatPrice(9.9), config.apiBase)
```

浏览器中使用需要给 script 加 `type="module"`:

```html
<script type="module" src="./main.js"></script>
```

::: tip 怎么区分用哪种导出
工具函数库用**具名导出**(一个文件多个函数);一个文件就是一个"东西"(配置、组件)用**默认导出**。Vue 单文件组件就是默认导出。
:::

## npm:包管理器

npm 随 Node.js 安装,用来安装和管理第三方库:

```bash
npm init -y              # 初始化项目,生成 package.json
npm install axios        # 安装库,写入 dependencies
npm install -D vite      # -D 表示开发依赖(只在开发时用)
npm run dev              # 运行 package.json 中 scripts 定义的命令
```

三个关键角色:

- `package.json`:项目清单 —— 依赖了什么、有哪些命令;
- `node_modules/`:依赖实际存放处,体积巨大,**不进 git、不用手动改**;
- `package-lock.json`:锁定依赖的确切版本。

拿到别人的项目(或 AI 生成的项目),第一步永远是 `npm install`。

## Vite:开发服务器与构建工具

直接双击 HTML 打开的原始开发方式有很多限制(模块加载、跨域等)。**Vite** 是当前主流的前端开发工具(Vue 官方出品):

```bash
npm create vite@latest my-app    # 创建项目(可选 Vanilla / Vue 模板)
cd my-app
npm install
npm run dev                      # 启动开发服务器,改代码浏览器秒更新
npm run build                    # 打包出可部署的 dist 目录
```

Vite 提供:开发服务器(热更新)、打包压缩、代理解决跨域、对 `.vue` 等文件的支持。**学 Vue 之前,建议先用 Vite 的 Vanilla 模板写一两个纯 JS 小项目**,熟悉这套工作流。

## Git:代码的存档与协作(概览)

工程化离不开版本管理,最小可用集:

```bash
git init                  # 初始化仓库
git add .                 # 暂存所有改动
git commit -m "完成登录页" # 提交存档
git log --oneline         # 查看历史
```

配合 GitHub/Gitee 远程仓库,就能多人协作、随时回滚。建议每完成一个功能就 commit 一次,养成习惯。

## 练习

1. 把[事件章节的待办清单](/basics/events#综合案例-待办清单-todo-list)拆成两个模块:`todo.js`(数据和增删函数)和 `main.js`(DOM 和事件),用 `type="module"` 跑通。
2. 用 `npm create vite@latest` 创建一个 Vanilla 项目,把待办清单迁移进去,跑通 `npm run dev`。
3. 在项目里 `npm install axios`,用 axios 改写一个之前的 fetch 请求。
