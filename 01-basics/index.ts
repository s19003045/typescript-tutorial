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











