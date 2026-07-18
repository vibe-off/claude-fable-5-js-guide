# this 指向

> 本节目标:掌握判断 `this` 的规则,理解箭头函数与普通函数的本质区别。

`this` 是函数运行时自动产生的一个变量,指向"**调用这个函数的对象**"。它的值**不取决于函数在哪定义,而取决于函数怎么被调用**。

## 判断规则(按优先级)

### 1. 谁调用,指向谁

```js
const user = {
  name: '小明',
  sayHi() {
    console.log(this.name)
  }
}

user.sayHi()   // '小明' —— user 调用的,this 是 user

const fn = user.sayHi
fn()           // undefined —— 没有对象调用,this 是全局(严格模式下是 undefined)
```

### 2. 普通函数直接调用:指向全局

```js
function show() {
  console.log(this)   // 浏览器中是 window(严格模式 undefined)
}
show()
```

### 3. 箭头函数:没有自己的 this

箭头函数不创建 `this`,它用的是**定义时所在外层作用域的 this**(沿作用域链找,和普通变量一样):

```js
const user2 = {
  name: '小红',
  // ❌ 错误示范:对象方法用箭头函数
  wrong: () => {
    console.log(this.name)   // undefined,外层是全局
  },
  // ✅ 方法用普通函数,内部回调用箭头函数
  right() {
    setTimeout(() => {
      console.log(this.name)   // '小红',箭头函数沿用 right 的 this
    }, 100)
  }
}
```

::: tip 实用口诀
**对象的方法用普通函数,方法里面的回调用箭头函数。** 遵守这一条,90% 的 this 问题不会发生。Vue 2 的 methods 不能用箭头函数,就是这个原因。
:::

### 4. 事件监听中的 this

```js
btn.addEventListener('click', function () {
  console.log(this)   // 普通函数:this 是 btn(触发事件的元素)
})

btn.addEventListener('click', () => {
  console.log(this)   // 箭头函数:this 是外层(通常是 window)
  // 想拿元素?用 e.target / e.currentTarget,更可靠
})
```

### 5. new 调用:指向新创建的对象

见[原型与类](/core/prototype)。

## 手动指定 this:call / apply / bind

```js
function intro(city) {
  console.log(`我是${this.name},来自${city}`)
}
const p = { name: '小明' }

intro.call(p, '北京')       // 立即调用,参数逐个传
intro.apply(p, ['北京'])    // 立即调用,参数放数组
const bound = intro.bind(p) // 不调用,返回永久绑定 this 的新函数
bound('北京')
```

日常业务代码用得不多,但它们是面试高频题,也是读懂源码的基础。

## 练习

1. 预测输出:
```js
const obj = {
  name: 'A',
  getName() {
    return this.name
  }
}
console.log(obj.getName())
const g = obj.getName
console.log(g())
```
2. 修复这段代码,让它每秒打印 `小明在学习`:
```js
const student = {
  name: '小明',
  study() {
    setInterval(function () {
      console.log(`${this.name}在学习`)
    }, 1000)
  }
}
student.study()
```

::: details 参考答案(第 2 题)
`setInterval` 的回调是普通函数,直接调用时 `this` 指向全局,`this.name` 为 undefined。

改法一(推荐):回调改成箭头函数,沿用 `study` 的 `this`:
```js
setInterval(() => {
  console.log(`${this.name}在学习`)
}, 1000)
```
改法二:提前保存 `const self = this`,回调里用 `self.name`(旧代码常见)。
:::
