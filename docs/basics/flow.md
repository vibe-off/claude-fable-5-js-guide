# 运算符与流程控制

> 本节目标:掌握常用运算符,会用分支和循环组织程序逻辑。

## 常用运算符

```js
// 算术:+ - * / %(取余)**(幂)
10 % 3   // 1,常用于判断奇偶:n % 2 === 0
2 ** 10  // 1024

// 自增自减
let i = 0
i++      // i 变为 1

// 比较:> < >= <=  ===  !==
// 逻辑:&&(且) ||(或) !(非)
const age = 20
age >= 18 && age < 60   // true
```

### 逻辑运算符的短路特性

`&&` 和 `||` 返回的是**操作数本身**,不是布尔值,这个特性在实际代码中大量出现:

```js
const name = inputName || '匿名用户'   // inputName 为空时用默认值
isLogin && showProfile()              // isLogin 为 true 才执行函数
```

ES2020 新增 `??`(空值合并):只在 `null`/`undefined` 时取默认值,`0` 和 `''` 不会被误伤:

```js
const count = data.count ?? 10   // data.count 是 0 时,count 就是 0
```

## 分支

### if / else

```js
const score = 85
if (score >= 90) {
  console.log('优秀')
} else if (score >= 60) {
  console.log('及格')
} else {
  console.log('不及格')
}
```

### 三元运算符

简单的二选一,用三元更简洁(Vue 模板里也常用):

```js
const type = score >= 60 ? '及格' : '不及格'
```

### switch

固定值的多分支:

```js
switch (day) {
  case 6:
  case 0:
    console.log('周末')
    break        // 不写 break 会继续执行下一个 case!
  default:
    console.log('工作日')
}
```

## 循环

```js
// for:知道循环次数时使用
for (let i = 1; i <= 5; i++) {
  console.log(`第 ${i} 次`)
}

// while:只知道结束条件时使用
let money = 100
while (money > 0) {
  money -= 30
}

// break 跳出整个循环;continue 跳过本次进入下一次
for (let i = 1; i <= 10; i++) {
  if (i === 3) continue
  if (i === 8) break
  console.log(i)   // 1 2 4 5 6 7
}
```

遍历数组更常用 `for...of` 和数组方法(下节讲):

```js
const list = ['苹果', '香蕉', '橘子']
for (const item of list) {
  console.log(item)
}
```

::: warning 死循环
`while` 忘记更新条件变量会让浏览器卡死。写循环前先想清楚:**什么时候结束?每一轮谁在变化?**
:::

## 综合示例:九九乘法表

```js
for (let i = 1; i <= 9; i++) {
  let row = ''
  for (let j = 1; j <= i; j++) {
    row += `${j}×${i}=${i * j}\t`
  }
  console.log(row)
}
```

## 练习

1. 打印 1~100 之间所有能被 7 整除的数。
2. 用循环计算 `1 + 2 + ... + 100` 的和。
3. FizzBuzz(经典面试题):打印 1~30,是 3 的倍数打 `Fizz`,5 的倍数打 `Buzz`,既是 3 又是 5 的倍数打 `FizzBuzz`,其余打数字本身。

::: details 参考答案(第 3 题)
```js
for (let i = 1; i <= 30; i++) {
  if (i % 15 === 0) {
    console.log('FizzBuzz')   // 注意:15 的判断必须放最前面
  } else if (i % 3 === 0) {
    console.log('Fizz')
  } else if (i % 5 === 0) {
    console.log('Buzz')
  } else {
    console.log(i)
  }
}
```
:::
