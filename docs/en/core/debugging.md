# Errors & Debugging

> Goals: read error messages; troubleshoot with DevTools; master try/catch. **Debugging is the core competency of an AI-era frontend engineer** — AI writes code, but judging "what's wrong and why" is on you.

## Reading Error Messages

Errors aren't scary — **not reading them is**. A red console error carries three key facts: the error type, the description, and the location (file:line, clickable).

The most common ones:

| Error | Meaning | Usual cause |
| --- | --- | --- |
| `xxx is not defined` | variable doesn't exist | typo, never declared, load order |
| `Cannot read properties of null (reading 'xxx')` | property access on null | `querySelector` found nothing |
| `Cannot read properties of undefined` | property access on undefined | API data not arrived yet, wrong path |
| `xxx is not a function` | calling a non-function | misspelled method, shadowed variable |
| `Unexpected token` | syntax error | unbalanced brackets/quotes |

Three-step triage: **read the type → click the line → log the variables involved**.

## The console Family

```js
console.log('plain output', obj)
console.error('red error')
console.warn('yellow warning')
console.table(goodsList)     // arrays of objects as a table — wonderfully readable!
console.time('elapsed')
// ...some code
console.timeEnd('elapsed')   // measure execution time
```

## Breakpoint Debugging

`console.log` suits quick checks; for complex logic, **breakpoints** win:

1. DevTools → **Sources** panel → open your JS file;
2. Click a line number to set a breakpoint (blue marker);
3. Reload — execution **pauses** at the breakpoint;
4. Hover any variable to inspect it; the Scope panel shows the whole scope;
5. Controls: **Resume** (F8), **Step over** (F10), **Step into** (F11).

You can also write a `debugger` statement in code to pause automatically.

::: tip When breakpoints beat logs
"Did this function even run?" "Which iteration breaks?" "At which step does this variable go bad?" — for *process* questions, breakpoints are much faster than logging.
:::

## try / catch

Wrap **operations that can fail** (network requests, JSON parsing) so one failure doesn't kill the whole program:

```js
try {
  const data = JSON.parse(rawText)   // code that may throw
  render(data)
} catch (err) {
  console.error('Parse failed:', err.message)
  showErrorTip('The data was malformed')   // a friendly message for the user
} finally {
  hideLoading()                       // runs either way
}
```

You can also throw deliberately to surface problems early:

```js
function setAge(age) {
  if (typeof age !== 'number' || age < 0) {
    throw new Error(`Invalid age: ${age}`)
  }
}
```

::: warning Never swallow errors
An empty `catch (err) {}` makes errors vanish silently — debugging that later is misery. **At minimum, `console.error(err)`.**
:::

## Network Triage: the Network Panel

For anything API-related, open DevTools → **Network**:

- Did the request go out? Is the URL right?
- What's the status code? (200/404/500)
- **Payload**: did you send the right parameters?
- **Response**: what did the backend actually return?

The eternal "backend says the API is fine, frontend says the code is fine" dispute is settled by one look at this panel.

## The Debugging Mindset

1. **Reproduce**: make the bug appear reliably, or you can't verify the fix;
2. **Localize**: binary-search the problem — log in the middle, decide which half owns the bug;
3. **Hypothesize and test**: "I suspect X" → design the smallest experiment to check;
4. **One change at a time**: change several things at once and even a successful fix teaches you nothing.

Sending the error message, the relevant code, and your triage so far to an AI is an efficient way to get help — but **walk the process yourself first**, or your debugging skills never grow. See [Learning with AI](/en/advanced/learning-with-ai).

## Exercises

1. Deliberately trigger and read three errors: an undeclared variable, property access on `null`, calling a nonexistent method.
2. Breakpoint-debug the [todo list from the Events chapter](/en/basics/events#capstone-a-todo-list): break inside `render` and watch `todos` change.
3. Write a "safe JSON parse" `safeParse(str, fallback)`: no throw on bad input, returns the fallback instead.

::: details Reference answer (Q3)
```js
function safeParse(str, fallback = null) {
  try {
    return JSON.parse(str)
  } catch (err) {
    console.warn('JSON parse failed; using fallback', err.message)
    return fallback
  }
}
```
:::
