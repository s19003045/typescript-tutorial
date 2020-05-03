/*
Type Inference (型別推論) 以及 Type Annotation (型別註記)
*/

/**
 * 編寫完後，執行 tsc，
 * TS 會依 tsconfig.json 設定來完成編譯
 * 若正確則會建立 index.js 檔案，若失敗則會跳 error，不會建立 index.js
 * 
 * 下面，保留錯誤的編寫
 */

// ====Part 1
let myName = 'Maxwell';
let age: number = 20;
let hasPet = false;
let nothing = undefined;
let nothingLiterally = null;

nothing = 'john'
nothing = 18

nothingLiterally = 18
nothingLiterally = false

/**
 * 說明：
 * 
 * 對 TS 來說，變數 myName 為 String type；age 為 Number
 * 對 TS 來說，變數 hasPet 為 Boolean
 * 
 * 對 TS 來說，變數 nothing 及 nothingLiterally 都屬於 any 型別
 * 所以可以認意賦值，而不會警示你
 * 
 */


// ====Part 2
let msg
msg = 'I am fine.'
msg = true
msg = null
msg = undefined

/**
 * 說明：
 * 
 * 宣告 msg 卻未賦值，對 TS 來說，會將其當成 any 型別，
 * 所以可以任意賦值
 * 
 */


// ====Part 3
let myMessage: string | null | number

myMessage = 'john'
myMessage = null
myMessage = 18

myMessage = undefined

/**
 * 說明：
 *
 * 宣告變數加註可接受的型別
 * 
 * 於賦值時，TS 就會檢視值是否合格
 *
 */



// ====Part 4
let name = 'john'
/**
 * 說明：
 *
 * 不能使用 'name' 做為變數名稱，為保留字元
 *
 */


// ====Part 5
// 狀況一
let goodMsg: string
let wrongMsg = goodMsg

// 狀況二
let answer
let response = answer

// 狀況三
let answer1: undefined
let rsponse1 = answer1

// 狀況四
let answer2: null
let response2 = answer2

/**
 * 說明：
 * 狀況一 =>
 * 已宣告變數 goodMsg 為 string type，但是沒有賦值
 * 接著指派 goodMsg 給 wrongMsg 時，就會有問題，
 * 因為尚未指派值給 goodMsg ，就先使用它，就會有問題
 *
 * 狀況二 =>
 * 另一個狀況是，已宣告變數 answer，但是沒定義型別
 * 爾後，指派 answer 給 response，就不會有問題，
 * 因為 TS 認為 answer 為 any，接著賦值給 response2 時，
 * answer2 的值可以是 undefined，所以不會出問題
 *
 * 狀況三 =>
 * answer1 為 TS 的 undefined 型別，所以在賦值給 answer1 之前
 * 使用 answer1 不會出問題
 *
 * 狀況四 =>
 * answer 若為 null 型別，後續就會有問題
 *
 */


// ===================day 3==============================
let info = {
  name: 'Maxwell',
  age: 20,
  hasPet: false,
};

let someone = {
  knows: undefined,
  identity: null
};

/**
 * 物件的屬性若直接代入 Nullable Type，則不會被視為 any 型別，
 * 而是等同於該 Nullable Type 本身的值
 * （undefined 型別的值就是 undefined；null 型別的值就是 null）
 */


// TS 正確地推論型別，若不正確地賦值則警示
info.name = null
info.age = 'john'
info.hasPet = 13

someone.knows = null
someone.identity = 13


// 少了一個 key
info = {
  name: 'Maxwell',
  // age: 20,
  hasPet: false,
};

// 多了一個 key
someone = {
  knows: undefined,
  identity: null,
  age: 18
};

// 新增 key ，不行
info.school = 'jsckd'

/**
 * 因為當初未定 school 這個 key
 */


// 刪除物件的屬性後，竟然沒有警示！
delete info.hasPet;
console.log(info);

info.hasPet = true
/**
 * 這個 issue 尚未被解決
 */


let box2 = {
  size: 60,
  name: 'largeBox',
  smallBox: {
    money: 70,
    size: 30,
    name: 'smp'
  }
}
box2.size = 'john'
box2.size = 80
box2.name = 'abcde'


let box3 = {
  ...box2,
  mediumBox: {
    money: '$70',
    size: 40,
    name: 'mmp'
  }
}
console.log(box3)

typeof box3
console.log(typeof box3)


// 宣告為 object
let box5: object = {
  name: '5box',
  size: 150
}

// 不能這樣寫
box5.name = 'goodness'
box5.size = 200

// 可以覆寫
box5 = {
  name: '6box'
}

// 可以變更 key 的 value 為其他型別
box5 = {
  size: null
}
// 可以變更 key 的 value 為其他型別
box5 = {
  name: 15,
  size: undefined
}



// object type
let something: object = {
  time: '2020',
  mans: 2000
}

// 不可以賦值基本型別
something = 2000
something = null
something = undefined

// 可以賦值任何 object
something = {
  size: 50,
  name: 'JOhn'
}

// 可以賦值任何 Array
// array 在 TS 中，被認定為 object
something = [1, 2, 3]
something = new Array()

// 這樣變更 value ，不允許
something[0] = 3

// 這樣也可以
something = new Number()
something = new Date()



// =================== day 4 ：TS 如何推論函式物件的型別 ==============================

// without parameter, no return
let aSimpleFunction = function () { console.log('Hi!', hello); };

// arrow function, no return
let arrowFunction = () => { console.log('good news') }

// with parameter
let putSomething = function (msg: string) {
  return msg
}

// with two parameter, and return something
const addition = function (num1, num2) {
  return num1 + num2;
};
/**
 * TS 建議參數要指定 type
 * 
 * TS 推論：
 * 參數 'num1' 隱含了 'any' 類型
 * 參數 'num2' 隱含了 'any' 類型
 * const addition: (num1: any, num2: any) => any
 */


// with two parameter, and return something
const plus = function (num1: string, num2: number) {
  return num1 + num2;
};

let plusResult0 = plus("abc", 2)
/**
 * TS 會推論出 plusResult0 為 string
 * 
 * TS 推論說明：
 * let plusResult0: string
 *
 */

let plusResult1: number = plus(1, 2)
/**
 * plus function's return type must be string, not number
 * argument 1 :type error
 * 
 * TS 推論說明：
 * 類型 '1' 的引數不可指派給類型 'string' 的參數。
 */


let plusResult2: void = plus('john', 2)
/**
 * plus function's return type must be string, not void
 * 
 * TS 推論說明：
 * 類型 'string' 不可指派給類型 'void'。
 */

let plusResult3: string = plus("1", 2)
/**
 * plus function's return type must be string, not number
 * argument 1 :type error
 *
 */

// TS 建議參數要指定型別，例外狀況：
const aJSONString = '{"name":"John","age":18}'

// 不建議這樣寫
let parseJSON = JSON.parse(aJSONString)
/**
 *
 * (method) JSON.parse(
 * text: string,
 * reviver?: ((this: any, key: string, value: any) => any) | undefined
 * ): any
 *
 * TS 識別 JSON.parse 輸出為 any
 * let parseJSON: any
 */


// 建議這樣寫：清楚註記要轉換出來的物件中之屬性型別
let parseJSON1 = JSON.parse(aJSONString) as { name: string, age: number }
/**
 * TS 推論：
 * let parseJSON1: {
    name: string;
    age: number;
}
 */


let minus = function (para1: number, para2: number) {
  return para1 + para2
}

// 可以這樣履寫：變換位置
minus = function (para1: number, para2: number) {
  return para2 + para1
}

// 錯誤覆寫
minus = function (para1: string, para2: number) {
  return para1 + para2
}

// 錯誤覆寫
minus = function (para1: number, para2: number) {
  para1 + para2
}
/**
 * TS 推論如下：
 * 類型 '(para1: number, para2: number) => void' 不可指派給類型 '(para1: number, para2: number) => number'。
 */



// 測試
let doesItWork1 = function doesItWork1() {
  return undefined
}

let doesItWork2 = function doesItWork2() {
  return null
}

let doesItWork3 = function doesItWork3() {
  void (8)
}

let doesItWork4 = function doesItWork4(): undefined {
  return null
}

let doesItWork5 = function doesItWork5(): undefined {

}

let doesItWork6 = function doesItWork6(): void {
  return undefined
}


// ==============day 4==================

let numbers = [1, 2, 3, 4, 5]
/**
 * TS 判定為 number 陣列
 * 
 * 也可以如下表示：
 * let numbers: number[] = [1, 2, 3, 4, 5]
 */
let numbers100: number[] = [1, 2, 3, 4, 5]

numbers[1] = 'john'
numbers[1] = 11
numbers = ['apple', 'banana', 'orange']
numbers.push('hello')
numbers.push(6)
numbers.push(null)
numbers.push(undefined)
/**
 * 不合當初定義的，會跳警示
 */


let fruits = ['apple', 'banana', 'orange']
/**
 * TS 判定為 string 陣列
 */
fruits.push(11)
fruits.push('pair')
fruits[11] = 100
fruits[10] = 'pineapple'
numbers.push(null)
numbers.push(undefined)
numbers.concat([11, 22, 33])
numbers.concat(['11', '22', 33])

numbers = [77, 88, 99]
numbers = ['77', '88', '99']
/**
 * 不合當初定義的，會跳警示
 */


let mix = ['chair', 1, 2, 3, 'table']
/**
 * TS 判定為 number | string 陣列
 */
mix.push(15)
mix.push('tree')
mix[4] = 16
mix[5] = 'soil'
numbers.push(null)
numbers.push(undefined)
/**
 * 不合當初定義的，會跳警示
 */

let mix2: (number | string)[] = [1, '2', 3, '4']
mix2.push(1)
mix2.push('hello')
mix[2] = 'good'
mix2 = [1, '2', 3, '4']
/**
 * 宣告陣列時定義陣列元素型別外，並且賦值
 * 則後續操作，TS 不會跳警示
 * 
 */

let mix3: (number | string)[]

mix3.push(1)
mix3.push('hello')
mix3[2] = 'good'
mix3.concat([1, '2'])
mix3 = [1, '2', 3, '4']
/**
 * 宣告陣列時定義陣列元素型別外，沒有賦值
 * 則後續操作，TS 會跳警示
 * 若在指派(賦值)前操作該變數，則會跳警示
 *
 */

let mix4: (number | string)[]
mix4 = [1, '2', 3, '4']

mix4.push(1)
mix4.push('hello')
mix4[2] = 'good'
mix4.concat([1, '2'])
/**
 * 宣告陣列時定義陣列元素型別外，沒有賦值
 * 則後續操作，TS 會跳警示
 * 若在指派(賦值)後操作該變數，則不會跳警示
 *
 */


let arrayOfHash1 = [
  { message: 'john' },
  { message: 'Mary' },
  { message: 'Peter' }
]
arrayOfHash1 = [
  { message: 'john' },
  { message: 'Mary', boy: false },
  { message: 'Peter' }
]
arrayOfHash1 = [
  { message: 'john' },
  { message: 'Mary', city: 'taiwan' },
  { message: 'Peter' }
]
arrayOfHash1 = [
  { message: 'john' },
  { message: 'Mary' },
]
arrayOfHash1 = [
  { message: 'john', age: 18 },
  { message: 'Mary' },
]
/**
 * 陣列中的 object 之值只接受 string
 */

let arrayOfHash2 = [
  { message: 'john' },
  { age: 18 },
  { message: 'Peter' }
]
/**
 * TS 識別如下：
 * array 中之 object 的 key 可能有 message 而無 age，
 * 或無 message 而有 age，而有 message 之value型別為 string，
 * 而 age 之 value型別為 number
 * 
 * let arrayOfHash2: ({
    message: string;
    age?: undefined;
} | {
    age: number;
    message?: undefined;
})[]
 */
arrayOfHash2.push({ message: 'Mary' })
arrayOfHash2.push({ age: 'good' })
arrayOfHash2.push({ message: 'john', age: 18 })
/**
 * 不接受的型別，TS 則會警示
 */

let arrayOfHash3 = [
  { message: 'john', age: 20, boy: true },
  { message: 'john', age: 20 },
  { message: 'Peter', age: 18 }
]
/**
 * TS 識別如下：
 * let arrayOfHash3: ({
    message: string;
    age: number;
    boy: boolean;
} | {
    message: string;
    age: number;
    boy?: undefined;
})[]
 */
arrayOfHash3[1].boy = false
arrayOfHash3[1].boy = undefined
arrayOfHash3[1].boy = 22
arrayOfHash3[1].boy = '22'
/**
 * 上面只接受 undefined , boolean 的型別，
 * 不接受其他型別
 */


// 陣列中放入 function 
let functionsArray = [
  function addition(num1: number, num2: number) { return num1 + num2 },
  function subtraction(num1: number, num2: number) { return num1 - num2 }
]
/**
 * TS 型別推論：
 * let functionsArray: ((num1: number, num2: number) => number)[]
 */


// 陣列中放入不同型別的陣列
let mixArray = [
  [1, 2, 3],
  ['john', 'mary'],
  [true, false, true]
]
/**
 * TS 型別推論如下：
 * let mixArray: (number[] | string[] | boolean[])[]
 */

// 混合更多型別陣列，放進陣列中
let mixArray1 = [
  [1, 2, 3],
  ['john', 'mary'],
  [true, false, true],
  [1, 'john', true, null],
  [undefined, 100]
]
/**
 * TS 型別推論如下：
 * let mixArray1: ((string | number | boolean | null)[] | (number | undefined)[])[]
 *
 * 陣列中的元素接受混合型別的陣列，沒有單一型別的陣列！！
 */


// 空陣列
let blankArray = []
/**
 * TS推論：
 * let blankArray: any[]
 */

/**
 * 單元重點整理：
 *
 * 重點 1. 陣列的型別推論
若集合 S 為陣列裡所有元素各種型別的集合，大部分的情形下，該陣列被 TypeScript 型別推論的結果是：
 *
 * 重點 2. 陣列的型別推論與註記時機
大部分的狀態下，陣列型別的推論是符合開發者期待的
除非遇到以下狀況，才需要對儲存陣列型別的變數積極地作型別註記：
空陣列值必須積極註記，這是會了要革除 any 可能帶來的禍害
陣列裡的元素沒有你要求的型別，可以用 union 技巧作積極的型別註記
為了程式碼的可讀性，通常一個陣列擁有多個型別的話（也就是 Heterogenous Type Array），建議還是用 union 註記一下，不然要在陣列裡面用人眼遍歷過陣列的每一個值對應的每個型別 —— 跟直接註記比起來：型別註記是比較恰當的選擇喔
 */


