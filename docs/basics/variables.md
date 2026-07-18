# 变量与数据类型

> 本节目标:会用 `let`/`const` 声明变量,分清 7 种基本类型,理解类型转换的常见坑。

## 声明变量

```js
let age = 20        // 可以重新赋值
const name = '小明'  // 常量,不可重新赋值
age = 21            // ✅
// name = '小红'     // ❌ TypeError: Assignment to constant variable
```

::: tip 规则:默认用 const,需要改变时才用 let
这也是 Vue 项目中的主流写法。`var` 是十几年前的旧写法,存在作用域缺陷(见[作用域与闭包](/core/scope-closure)),**新代码不要使用**,但你要认识它,因为旧代码和 AI 偶尔会生成。
:::

命名规范:小驼峰 `userName`、见名知意、不能以数字开头、不能用关键字(`let`、`class` 等)。

## 数据类型

### 基本类型(7 种)

```js
let a = 100          // number:整数和小数都是 number
let b = 'hello'      // string:单引号、双引号、反引号都行
let c = true         // boolean:true / false
let d = undefined    // undefined:声明了但没赋值
let e = null         // null:主动表示"空"
let f = 123n         // bigint:超大整数(少用)
let g = Symbol('id') // symbol:唯一值(少用)
```

用 `typeof` 查看类型:

```js
typeof 100        // 'number'
typeof 'hi'       // 'string'
typeof undefined  // 'undefined'
typeof null       // 'object'  ← 历史遗留 bug,记住即可
```

### 引用类型

对象、数组、函数都属于引用类型(`object`),后面章节详细讲。基本类型与引用类型在赋值和比较时行为不同,是[常见面试题](/advanced/patterns#深拷贝与浅拷贝)。

## 模板字符串

反引号字符串可以嵌入变量,比 `+` 拼接清晰得多,**优先使用**:

```js
const user = '小明'
const score = 95
console.log(`${user}的成绩是${score}分`) // 小明的成绩是95分
```

## 类型转换

### 显式转换(推荐)

```js
Number('123')   // 123
Number('12px')  // NaN(Not a Number,转换失败)
String(123)     // '123'
Boolean(0)      // false
parseInt('12px')   // 12(从头解析数字,常用于取样式值)
parseFloat('3.14') // 3.14
```

### 隐式转换(小心)

```js
'1' + 2    // '12'  ← + 号遇到字符串就变成拼接!
'6' - 2    // 4     ← 其他运算符会转成数字
1 == '1'   // true  ← == 会先转换类型再比较
1 === '1'  // false ← === 不转换类型,严格比较
```

::: warning 两条铁律
1. **判断相等永远用 `===` 和 `!==`**,不用 `==`。
2. 表单输入框拿到的值永远是字符串,做算术前先 `Number()` 转换 —— 这是初学者 bug 的重灾区。
:::

### 真值与假值

以下 6 个值转成布尔是 `false`,其余全是 `true`:

```js
false, 0, '', null, undefined, NaN
```

常用于判断"有没有值":`if (username) { ... }`

## 练习

1. 声明常量 `PI = 3.14159`,变量 `radius = 5`,用模板字符串打印圆的面积。
2. 预测输出再验证:`'10' + 1`、`'10' - 1`、`typeof NaN`、`Boolean('false')`。
3. 用 `prompt()` 让用户输入两个数字,弹窗显示它们的**和**(注意类型转换)。

::: details 参考答案(第 3 题)
```js
const a = Number(prompt('第一个数字'))
const b = Number(prompt('第二个数字'))
alert(`两数之和为:${a + b}`)
// 如果不转 Number,'3' + '5' 会得到 '35'
```
:::
