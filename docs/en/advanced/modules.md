# Modules & Tooling

> Goals: master ES module import/export; get acquainted with npm and Vite — the bridge to real projects.

So far we wrote everything in one `main.js`. Real projects span hundreds of files — which demands **modularity** (splitting files, managing dependencies) and **tooling** (build tools, package managers).

## ES Modules (ESM)

Each file is a module; variables are private by default and communicate via `export` / `import`:

```js
// utils.js — named exports (a file can have many)
export function formatPrice(n) {
  return `$${n.toFixed(2)}`
}
export const TAX_RATE = 0.06

// config.js — default export (one per file)
export default {
  apiBase: 'https://api.example.com'
}
```

```js
// main.js — importing
import config from './config.js'                    // default import, any name
import { formatPrice, TAX_RATE } from './utils.js'  // named imports, names must match
import { formatPrice as fp } from './utils.js'      // renaming

console.log(formatPrice(9.9), config.apiBase)
```

In the browser, the script tag needs `type="module"`:

```html
<script type="module" src="./main.js"></script>
```

::: tip Which export style when
Utility collections use **named exports** (many functions per file); when a file *is* one thing (a config, a component), use a **default export**. Vue single-file components are default exports.
:::

## npm: the Package Manager

npm ships with Node.js and installs/manages third-party libraries:

```bash
npm init -y              # initialize a project, generating package.json
npm install axios        # install a library into dependencies
npm install -D vite      # -D marks a dev-only dependency
npm run dev              # run a command defined in package.json scripts
```

Three key players:

- `package.json`: the project manifest — what it depends on, which commands it has;
- `node_modules/`: where dependencies actually live; huge, **never committed to git, never edited by hand**;
- `package-lock.json`: pins exact dependency versions.

When you receive someone else's project (or an AI-generated one), step one is always `npm install`.

## Vite: Dev Server and Build Tool

Double-clicking an HTML file has real limitations (module loading, CORS, and more). **Vite** is today's mainstream frontend tool (from the Vue team):

```bash
npm create vite@latest my-app    # scaffold (choose Vanilla / Vue templates)
cd my-app
npm install
npm run dev                      # dev server — edits show up in the browser instantly
npm run build                    # bundle a deployable dist directory
```

Vite provides: a dev server (hot reload), bundling and minification, a proxy for CORS, and support for `.vue` files. **Before learning Vue, build one or two plain-JS mini projects with Vite's Vanilla template** to get comfortable with the workflow.

## Git: Version Control at a Glance

Engineering means version control. The minimum viable set:

```bash
git init                  # initialize a repository
git add .                 # stage all changes
git commit -m "finish login page"  # commit a snapshot
git log --oneline         # view history
```

With a remote (GitHub/GitLab) you get collaboration and rollback. Commit after every completed feature — build the habit now.

## Exercises

1. Split the [todo list from the Events chapter](/en/basics/events#capstone-a-todo-list) into two modules: `todo.js` (data + mutation functions) and `main.js` (DOM + events); run it with `type="module"`.
2. Scaffold a Vanilla project with `npm create vite@latest`, migrate the todo list into it, and get `npm run dev` working.
3. `npm install axios` in that project and rewrite one of your earlier fetch calls with axios.
