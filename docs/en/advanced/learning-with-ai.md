# Learning with AI

> Goals: build the right mental model for AI collaboration — AI is an amplifier, not a replacement; use it to accelerate learning and development, not to bypass learning.

## First, Why Fundamentals Still Matter in the AI Era

Your post-graduation workflow will almost certainly include AI. But employers hire for your **command over AI output**:

- When an AI-generated layout collapses, can you **state the problem precisely** ("the flex container has no height, so the children overflow") — or only say "the page looks broken"?
- When AI proposes two fixes, can you **judge which is correct**?
- When a bug ships to production, the boss expects **you** to fix it. "The AI wrote it" is not an answer.

Someone who can only write prompts is indistinguishable from anyone who can type. Someone who **understands concepts, debugs, and takes ownership** is who AI amplifies. That's why this guide leans so hard on debugging and core concepts.

## Four Correct Ways to Use AI

### 1. As an on-call teaching assistant: explaining concepts and code

When code confuses you, neither grind blindly nor skip it:

> I'm a JS beginner. Explain this line by line, focusing on how reduce's callback parameters change each round:
> ```js
> const total = goodsList.reduce((sum, g) => sum + g.price * g.stock, 0)
> ```

Follow-up moves: "Explain closures with an everyday analogy", "What's the difference between these two versions?", "When would I actually use this?"

### 2. As a sparring partner: quizzes and grading

> I just finished map/filter/reduce. Give me 5 exercises from easy to hard — no answers yet. I'll send my solutions; grade them and show more elegant versions.

This beats passive reading by a wide margin — learning is **retrieval practice**, not re-reading.

### 3. As a debugging partner: the effective question template

When asking for help, give full context in one shot:

> [Goal] Clicking the button should append an item to the list
> [Symptom] Nothing happens; console shows: Cannot read properties of null (reading 'addEventListener')
> [Code] (paste the relevant HTML and JS)
> [Tried] Confirmed the button id is spelled correctly
> Explain the cause and give me the debugging approach rather than the full corrected code.

Note the last line — asking for **the approach instead of the answer**. A few rounds of this and you'll debug on your own.

### 4. As a pair programmer: AI writes, you decide

When AI generates code, your value shows **before** (a precise description) and **after** (review and verification):

- Describe with accurate vocabulary: "handle list clicks with event delegation", "add a 300ms debounce to the search box" — term density determines output quality, and that is exactly what fundamentals buy you;
- **Read every line before using it.** Ask: are the edge cases handled? (empty array? failed request?) Is there a simpler way?
- **Verify before trusting**: run it, click around, watch the console. AI writes buggy code with a straight face.

## Three Red Lines (Discipline for Yourself)

1. **Never copy code you don't understand.** You must be able to explain every line — interviewers and team leads genuinely will ask;
2. **Attempt assignments yourself first.** Ask AI after 20 minutes of being stuck — and ask for hints before answers;
3. **AI is not always right.** It cites outdated APIs and invents nonexistent methods. Trust running code and MDN over its claims.

::: tip A self-test
With AI turned off, can you still build the [todo list](/en/basics/events#capstone-a-todo-list) and the [fetch-and-render example](/en/core/fetch#full-example-fetch-and-render-a-list) independently? Yes → AI is your lever. No → AI is currently your crutch; drill more.
:::

## Exercises

1. Pick a snippet from this guide you don't fully understand, use the "line by line" prompt, then rewrite the explanation as comments in your own words.
2. Use the quiz template to get 5 closure exercises; solve them and have AI grade you.
3. Take a bug you fixed before and replay it through the debugging template: goal, symptom, cause, fix.
