# Network Requests

> Goals: understand the frontend-backend model; fetch and submit data with fetch; render results to the page.

Page data comes from backend **APIs**: the frontend sends an HTTP request, the backend answers with JSON. This flow is traditionally called AJAX (Asynchronous JavaScript and XML — though the format nowadays is nearly always JSON).

```
Browser (frontend)                 Server (backend)
    │  GET /api/goods  ────────────→  │
    │  ←──────  JSON: [{...},{...}]   │
    │  JS renders the data into HTML  │
```

## HTTP Essentials

- **URL**: the endpoint, e.g. `https://api.example.com/goods?page=1` (after `?` come query parameters);
- **Methods**: `GET` read, `POST` create, `PUT/PATCH` update, `DELETE` remove;
- **Status codes**: `200` OK, `404` not found, `401` not logged in, `500` server error;
- **Request body**: the data a POST submits, usually a JSON string.

## fetch: the Browser's Built-in Client

### GET

```js
async function getUsers() {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    if (!res.ok) {                       // fetch does NOT throw on 404/500!
      throw new Error(`HTTP ${res.status}`)
    }
    const data = await res.json()        // parse the body as JSON (also async)
    console.log(data)
    return data
  } catch (err) {
    console.error('Request failed:', err)
  }
}
```

::: tip Free practice APIs
`jsonplaceholder.typicode.com` serves free fake data (users, posts, todos) — request it as much as you like while learning, no signup needed.
:::

### POST

```js
const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'Title', body: 'Content', userId: 1 })
})
const data = await res.json()
```

## Full Example: Fetch and Render a List

The core frontend workflow: **request → shape → render**.

```html
<ul id="user-list">Loading...</ul>
```

```js
const ul = document.querySelector('#user-list')

async function renderUsers() {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    const users = await res.json()
    ul.innerHTML = users
      .map(u => `<li>${u.name} (${u.email})</li>`)
      .join('')
  } catch (err) {
    ul.innerHTML = '<li>Failed to load. Please retry.</li>'
  }
}

renderUsers()
```

Notice this example touches every key concept so far: async/await, `map/join` (arrays), `innerHTML` (DOM), `try/catch` (error handling). **If you can write it unaided, your fundamentals pass.**

## About axios

Real projects (Vue projects especially) usually prefer **axios**: it auto-parses JSON, throws on error status codes, and supports interceptors (e.g. attaching a token to every request). Once you know fetch, axios takes ten minutes:

```js
const { data } = await axios.get('https://api.example.com/goods')
```

## Common Problems

- **CORS errors**: the console says `blocked by CORS policy` — a browser security mechanism. The backend must allow your origin, or you proxy in development (Vite's `server.proxy`). For now, know that **it doesn't mean your code is wrong**;
- **Data is undefined**: nine times out of ten you forgot `await`, or the property path is wrong — `console.log` the whole response and read the actual shape.

## Exercises

1. Request `https://jsonplaceholder.typicode.com/todos?_limit=10` and render a todo list; completed ones (`completed: true`) get a strikethrough.
2. Build "user search": an input and a button; on click, request the users API and show only users whose name contains the keyword (hint: `filter` + `includes`).
3. Add "loading" and "failed" states to exercise 1.
