# 数组与对象

> 本节目标:掌握数组增删改查和常用遍历方法,会用对象组织数据,理解 JSON。

数组和对象是 JS 中最重要的两种数据结构:**数组管"一组",对象管"一个"**。真实项目的数据几乎都是"对象数组":后端接口返回的商品列表、学生名单,全长这样。

## 数组基础

```js
const fruits = ['苹果', '香蕉', '橘子']

fruits[0]          // '苹果',下标从 0 开始
fruits.length      // 3
fruits[fruits.length - 1]   // 最后一项

fruits.push('梨')      // 尾部添加
fruits.pop()           // 尾部删除
fruits.unshift('桃')   // 头部添加
fruits.shift()         // 头部删除
fruits.includes('苹果')       // true,是否包含
fruits.indexOf('香蕉')        // 1,找下标,找不到返回 -1
fruits.splice(1, 1)           // 从下标 1 开始删除 1 个
```

## 数组遍历三剑客

以下三个方法必须滚瓜烂熟 —— **Vue 里渲染列表、处理接口数据,天天在用**:

```js
const scores = [88, 45, 92, 60, 73]

// forEach:单纯遍历,无返回值
scores.forEach((item, index) => {
  console.log(`第 ${index} 项:${item}`)
})

// map:映射,返回加工后的新数组(长度不变)
const doubled = scores.map(n => n * 2)     // [176, 90, 184, 120, 146]

// filter:过滤,返回符合条件的新数组
const passed = scores.filter(n => n >= 60) // [88, 92, 60, 73]
```

其他常用方法:

```js
scores.find(n => n >= 90)     // 92,找第一个符合条件的元素
scores.some(n => n < 60)      // true,是否有元素满足条件
scores.every(n => n >= 60)    // false,是否全部满足
scores.reduce((sum, n) => sum + n, 0)   // 358,累加汇总
scores.sort((a, b) => a - b)  // 升序排序(会改变原数组)
scores.join(', ')             // 拼接成字符串
```

::: tip 记忆诀窍
问自己:我想要的结果是什么?**每项加工后的新数组 → map;符合条件的子集 → filter;一个汇总值 → reduce;只是挨个执行 → forEach。**
:::

## 对象

对象用"键值对"描述一个事物:

```js
const student = {
  name: '小明',
  age: 20,
  scores: [88, 92],
  sayHi() {
    console.log(`我是${this.name}`)
  }
}

student.name          // 点语法访问
student['age']        // 方括号访问(键是变量或含特殊字符时用)
student.gender = '男' // 添加属性
delete student.age    // 删除属性
student.sayHi()       // 调用方法

// 遍历对象
for (const key in student) {
  console.log(key, student[key])
}
Object.keys(student)    // 所有键组成的数组
Object.values(student)  // 所有值组成的数组
```

## 对象数组:真实项目的样子

```js
const goodsList = [
  { id: 1, name: '键盘', price: 199, stock: 10 },
  { id: 2, name: '鼠标', price: 99, stock: 0 },
  { id: 3, name: '显示器', price: 1299, stock: 5 }
]

// 有库存的商品名
const names = goodsList.filter(g => g.stock > 0).map(g => g.name)
// ['键盘', '显示器']

// 总库存价值
const total = goodsList.reduce((sum, g) => sum + g.price * g.stock, 0)
```

## JSON

JSON 是一种**数据格式**,长得像 JS 对象,但它是字符串,用于前后端传输数据:

```js
const jsonStr = '{"name":"小明","age":20}'

const obj = JSON.parse(jsonStr)   // 字符串 → 对象
const str = JSON.stringify(obj)   // 对象 → 字符串
```

注意 JSON 的键必须用双引号,不能有函数和注释。

## 练习

1. 给定 `[3, 7, 2, 9, 5]`,用 `filter` 取出大于 4 的数,再用 `map` 把它们平方。
2. 用上面的 `goodsList`:找出价格最高的商品对象;把所有商品价格打 8 折(用 `map` 生成新数组,不改原数组)。
3. 定义一个"我的信息"对象(姓名、专业、爱好数组),用模板字符串输出一段自我介绍。

::: details 参考答案(第 2 题)
```js
// 价格最高的商品:reduce 两两比较
const dearest = goodsList.reduce((max, g) => g.price > max.price ? g : max)

// 打 8 折:展开原对象,只覆盖 price
const discounted = goodsList.map(g => ({ ...g, price: g.price * 0.8 }))
```
`...g` 是展开运算符,详见 [ES6+ 常用特性](/core/es6)。
:::
