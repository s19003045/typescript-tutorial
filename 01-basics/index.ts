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



//=================day 6 陣列與函式 X 陣列與元組 - Array & Functions & Tuples ========

let mixFunc = [
  function hello(msg: string) { console.log(msg) },
  [1, 2, 3],
  [1, '2', 3],
  ['good', function (num: number) { return num }]
]

// 大部分情況，callback function 之參數不需要特別註記型別，例如：
let numberMix = [1, 2, 3, 4, 5]
let doubleNumbers = numberMix.map(function (val, index) { return val * 2 })
/**
 * TS 可以推論 callback function 之參數型別：
 * let doubleNumbers: number[]
 *
 */

/**聽不懂 「泛型」、型別化名（Type Alias），沒關係，之後會講到。
 *
 * 重點 1. 函式的參數不需被註記的情況
回呼函數在某些情況下不需對輸入參數部分進行註記，原因是藉由泛用型別 Generics 的機制，我們可以設計出讓 TypeScript 能夠藉由泛用型別參數所獲取的外部型別資訊，提前預知到未來的程式碼執行的狀況下，對於各種變數、函式的輸入輸出、類別屬性與方法的型別等等 ... 的型別推論。
型別化名（Type Alias）的運用在大部分的狀況下也可以取代積極註記的必要性。
 */

// ====== TS 的 Tuple  型別，javascript 中沒有此型別 =====
let BMWDetail = ['MBW', 'AX-305', new Date()]
/**
 * TS 判斷型別：
 * let BMWdetail: (string | Date)[]
 */
BMWDetail[0] = new Date()


// Tuple，宣告時即定義每個元素的型別
let BMWModal: [string, string, Date] = ['BMW', 'car', new Date(2020, 1, 1)]
let TOYOTAModal: [string, string, Date] = ['TOYOTA', 'car', new Date(2020, 1, 1)]
let BenzModal: [string, string, Date] = ['Benz', 'car', new Date(2020, 1, 1)]
let SuzukiModal: [string, string, Date] = ['Suzuki', 'car', new Date(2020, 1, 1)]
BMWModal[0] = 'Benz'
BMWModal[0] = 1234 // 指派值的型別錯誤
BMWModal[3] = new Date() // 超出當初定義的長度


/**
 * TS 判斷型別：
 * let BMWModal: [string, string, Date]
 */

/**
 * 重點 2. 元組值指派行為
當元組值被直接指派到變數時，必進行積極型別註記。

而被指派元組型別的變數也必需進行積極註記。

綜合以上觀點，只要遇到元組必須要進行註記行為。
 */


/**
 * 陣列型別與 Tuple 型別是不一樣的註記方式
 * 陣列型別註記： (string | number | Date)[]
 * => 陣列中的每個元素可以是 string, number, Date 這三種之一種
 *
 * Tuple 型別註記：[string, string, Date]
 * => 陣列中的每個元素已清楚定義型別不能混肴
 */


/**
 * 重點 3. 陣列與元組的差異
型別陣列裡，只要裡面的元素之型別為此陣列規定的範疇內（比如說 (number | string)[] 只能存取數字跟字串），除了沒有限定元素的數量外，順序也不限定；元組型別則是除了元素的個數必須固定外，格式必須完全吻合，因此裡面元素型別的順序也是固定。
 * 
 * 
 */


/**
 * 如上，若要一次宣告多個 Tuple ，而且型別是一樣的，能不能共用型別註記？
 * 可以的！如下：
 */
//型別化名（Type Alias）
type Vehicle = [string, string, Date]

// 引用型別化名，以註記型別
let MitsubishiModal: Vehicle = ['BMW', 'car', new Date(2020, 1, 1)]
let RocheModal: Vehicle = ['TOYOTA', 'car', new Date(2020, 1, 1)]
let GogoModal: Vehicle = ['Benz', 'car', new Date(2020, 1, 1)]
let CocoModal: Vehicle = ['Suzuki', 'car', new Date(2020, 1, 1)]

CocoModal = ['Suzuki', 'car'] // 不能少一個元素
CocoModal = ['Suzuki', 'car', new Date(2020, 1, 1), 'john']  // 不能多一個元素
CocoModal = ['Suzuki', 123, new Date(2020, 1, 1)]  // 型別錯誤


// 如果 tuple 的每個元素都有特定意義，用類似 JSON 的格式表達反而更好
let HyndaiModal = {
  brand: 'BMW',
  transportation: 'car',
  releasedDate: new Date(2020, 1, 1)
}


// =================DAY 7 ENUM===============
enum WeekDay {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday
}
/**
 * 錯誤寫法：(不可使用 = )
 * enum WeekDay = {  Sunday, Monday, Tuesday,...}
 * 
 */

// 使用已建立的 enum
let goChurchDay = WeekDay.Sunday
console.log('goChurchDay:', goChurchDay)
console.log(WeekDay)
/**
 * TS 型別推論：
 * let goChurchDay: WeekDay
 * 1.順相取值的結果為 enum 型別

 * 2.既然 TS 會推論，所以可以選擇不標註型別
 * 可以這樣寫：
 * let goChurchDay: WeekDay = WeekDay.Monday
 */

// 印出 enum 物件
console.log(WeekDay)
/**
 *
{
  '0': 'Sunday',
  '1': 'Monday',
  '2': 'Tuesday',
  '3': 'Wednesday',
  '4': 'Thursday',
  '5': 'Friday',
  '6': 'Saturday',
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6
}
 */

//印出的方式
console.log(WeekDay[5])
console.log(WeekDay.Monday)


let goChurchDayValue = WeekDay[goChurchDay]
/**
 * 反相取值的結果為 string
 * TS 推論：
 * let goChurchDayValue: string
 */
console.log('goChurchDayValue:', goChurchDayValue)

/**
 * 重點 3. TypeScript 列舉
1.列舉可以藉由 TypeScript 的 enum 關鍵字進行定義。若我們想定義列舉型別 E，其內含的元素為 V1, V2 ... Vn，則：
enum E { V1, V2, V3, ..., Vn }
2.定義列舉型別後，使用該列舉的值並代入到變數時，TypeScript 對於該變數的型別推論是 enum 型別
3.定義列舉型別後，可直接使用列舉的名稱作為型別註記
4.列舉具有反射性，所以可以藉由列舉呼叫元素出來的結果反查該元素本身的名稱
5.列舉的潛規則：
列舉可以被當成 JSON 物件看待（比如說也可以用 for...in... 迴圈迭代列舉的元素）；但與 JSON 物件的差別在於，使用列舉會獨立為 enum 型別，而 JSON 物件本身就是一種物件型別
列舉裡的元素，每一個對應值是從數字 0 開始，每列一個元素會遞增上去
列舉裡的元素可以自訂對應的數字，後續會一直不停地遞增上去
列舉裡的元素可以自訂對應的字串，但是必須接續訂立對應的字串值下去，或者是再返回定義對應值為數字型別
可以使用列舉裡定義過後的值進行後續自訂對應值的運算
 */



//================= day 8 明文型別==============
/**
 * 在之前的學習中，都可以看到明文型別的出現
 * 
 * 型別化名(Type Alias) 則是用來把明文型別"抽象化"的方式
 */

// 參數一定要標註型別，回傳值不一定，TS 會推論回傳值的型別
let addFunc = (num1: number, num2: number) => { return num1 + num2 }
let subtractFunc = (num1: number, num2: number) => { return num1 + num2 }

// 可以把上述相同的"明文型別"抽象化，等號右邊即是"明文型別"
type MetaOperator = (num1: number, num2: number) => number

// 引用型別化名：引用型別化名後，函式的參數則不用標註型別，回傳值也不用標註型別
let powerFunc: MetaOperator = (num1, num2) => { return num1 * num2 }
let quickFunc: MetaOperator = (num1, num2) => { return num1 * (num1 + num2) * num2 }

// 當然也可以在函式參數標註型別，TS 會檢查是否符合型別化名
let powerFunc1: MetaOperator = (num1: string, num2: string) => { return num1 * num2 }
let powerFunc2: MetaOperator = (num1: number, num2: number) => { return (num1 * num2).toString() }

// 引用函式時，參數型別正確
powerFunc(1, 2)

// 引用函式時，參數型別錯誤
powerFunc('1', '2')


// 試著利用型別化名在其他明文型別中
// 將 JSON object 型別抽像化

type mixTuple = {
  name: string,
  age: number
}

// 引用型別化名，TS 會根據型別化名來檢查 JSON 裡的東西
// TS 檢查是確
let wendy: mixTuple = {
  name: 'Wendy',
  age: 19
}

// 引用型別化名，TS 會根據型別化名來檢查 JSON 裡的東西
// TS 檢查到錯誤
let john: mixTuple = {
  name: 'John',
  age: '20' //型別錯誤
}

john.name = 500  // 型別錯誤

john = {
  name: 'John',
  //age: 20  // 不可減少當初定義的屬性
}

// 完全覆寫，通過 TS 檢測
john = {
  name: 'John',
  age: 20
}

let Peter: mixTuple = {
  fistname: 'Peter',
  age: 22
}

let Johnny: mixTuple = {
  name: 'Johnny Wu',
  fistname: 'Johnny',
  age: 22
}


// ==== 特別注意，參數如何代入
// 先宣告一個型別化名
type personInfo = {
  name: string,
  age: number,
  hasPet: boolean
}
// 針對函式的參數，以事先定義好的型別化名來檢查
let printInfo = function (info: personInfo) {
  console.log(`${info.name} is ${info.age}, and he\/she has Pet? $${info.hasPet}`)
}
// 參數正確
printInfo({
  name: 'John',
  age: 20,
  hasPet: true
})

// 直接在參數中多了一個屬性，TS 不允許
printInfo({
  name: 'May',
  age: 20,
  hasPet: true,
  hasCar: false
})

// 先宣告變數存放預定要放進函式的參數，多了一個屬性 hasCar
let PeterInfo = {
  name: 'Peter',
  age: 20,
  hasPet: true,
  hasCar: false
}

// TS 允許這個狀況
printInfo(PeterInfo)

/**
 * 小結論：
若某變數 A 儲存某物件值，其中 A 沒有被積極註記（因此 TypeScript 會對 A 作型別推論，推論出 A 的明文型別格式）。
另外，若變數 A 作為某函式（或方法）的參數，其中該參數有型別 T，則 TypeScript 只會針對 A 的格式至少符合型別 T（屬性型別對應正確、少一鍵不行但多一鍵以上都可以），則變數 A 通過該型別 T 的檢測。
 */

/**
 *
此單位重點整理：
重點 1. 明文型別 Literal Types
只要是表達廣義物件的格式或者是任意型別（包含原始型別的）複合組合（union 與 intersection 也算在內）-- 就隸屬於明文型別的範疇。

也可推得，通常 TypeScript 會將任何廣義物件的型別推論為明文型別的格式。

重點 2. 型別化名 Type Alias
若我們有一個型別 T，T 可為任何的型別（包含原始型別、物件型別、TypeScript 內建型別、明文型別、複合型別、Generics 通用型別等）。其中我們想要讓該型別 T 等效於別名 A，則可以使用 TypeScript 的 type 關鍵字進行化名宣告：

type A = T;
型別化名的主要目的為簡化程式碼以及進行型別的抽象化（Type Abstraction）

重點 3. 函式型別的化名
若我們對型別 T 進行型別化名 U，其中 T 為函式型別，亦即：

https://ithelp.ithome.com.tw/upload/images/20190917/20120614B2ERkOk0tu.png

其中，任何變數 A 被型別化名 U 註記，則該變數被指派到的函式值，不需要積極註記，因為早在定義化名的時候，這個步驟就被做掉了。

重點 4. 廣義物件型別的化名
符合廣義物件完整性定律（參照 Day 03.）並且結合化名帶給開發者的功用，即是整理程式碼並且進行抽象化的動作。

重點 5. 廣義物件的註記
由於我們可以藉由存取廣義物件的表現形式在某變數裡，其中該變數沒有被積極註記，儘管該物件的值不完全符合函式（或方法）的參數所註記之型別，但只要該變數至少有符合型別的格式，依然可以通過函式（或方法）參數對於變數的值的驗證。若想避免此狀況發生，任何變數需要存取廣義物件時，必須進行積極註記型別的動作。

其中，至少有符合參數型別的條件有三，假設沒有被註記的變數為 A，而將其代入某函式（或方法）作為參數，其參數型別為 T：

A 必須與 T 規定的必填屬性與型別對應完全正確
可以忽略 A 對 T 差集出來的屬性（相對 T 多出來的屬性）
A 不能缺少任一個 T 所規定的屬性

 */



// =============day 9- Optional property===========

// 以下用在使用者註冊時的資訊欄位，使用者不一定全部填寫
enum Gender { Male, Female, Other }
type AccountInfo = {
  account: string,
  age: number,
  nickname: string,
  password: string,
  birthday: Date,
  gender: Gender,
  subscribed: boolean
}
// 若使用者沒有全部填寫，TS 就會警示。
// 不是很有彈性的做法。
var user1AccountInfo: AccountInfo = {
  account: 'user1@example.com',
  age: 18,
  subscribed: true,
  password: 'axlfdkjasfd'
}

// $$要如何使物件屬性保有一定程度的彈性???

// 試試看下面這樣可不可以：跟 undefined 這個值進行複合型別（也就是 union）的動作
type AccountInfo2 = {
  account: string,
  nickname: string | undefined,
  password: string,
  birthday: Date | undefined,
  gender: Gender | undefined,
  subscribed: boolean | undefined
}
// 若少了該有的屬性還是不會通過 TS 檢測
var user2AccountInfo: AccountInfo2 = {
  account: 'user1@example.com',
  // nickname: 'john',
  // birthday: new Date(),
  gender: Gender.Female,
  password: 'axlfdkjasfd',
  subscribed: true,
}

// 為什麼會這樣?

// day3 曾經測試物件如下：
let someone22 = {
  name: undefined,
  age: null
}
someone22.name = 'john'
someone22.age = 333

// 定義 文明型別
type someOne = {
  name: undefined,
  age: null
}
// 套用 文明型別
let someone33: someOne = {}
/**TS 提示如下：
let someone33: someOne
Type '{}' is missing the following properties from type 'someOne': name, age
 */

//之所以會有上述的狀況，說明如下：

/**
 *
重點 1. undefined 作為物件屬性的型別
若將 undefined 作為物件某些屬性的型別，儘管 undefined 在原生 JS 的意味就是可以放置該屬性為空值，甚至是不去定義的狀態。但在 TypeScript 的世界裡：undefined 這種原始型別代表必須存取名為 undefined 這種值，並不是完全省略定義它！
 */

// 介紹今天的主角：
// 試試看下面這樣可不可以：跟 undefined 這個值進行複合型別（也就是 union）的動作
type AccountInfo3 = {
  account: string,
  nickname?: string,
  password: string,
  birthday?: Date,
  gender?: Gender,
  subscribed: boolean
}

/**
 * TS 型別推論會是下面這樣：
type AccountInfo3 = {
    account: string;
    nickname?: string | undefined;
    password: string;
    birthday?: Date | undefined;
    gender?: Gender | undefined;
    subscribed: boolean;
}

 */
// 少了該有的屬性, 而該屬性在型別化名定義中為「選用的」，就可以通過 TS 檢測
var user3AccountInfo: AccountInfo3 = {
  account: 'user1@example.com',
  nickname: undefined,  // 可以不放 nickname ，或者，給它 undefined ，都可以，
  // 因為 TS 型別化名定義中 nickname 為 string | undefined
  // birthday: new Date(),
  gender: Gender.Female,
  password: 'axlfdkjasfd',
  subscribed: true,
}


/**
重點 2. 物件屬性上的選用註記
若某屬性 P 屬於某物件的明文型別 的屬性之一，且該屬性對應的型別值為 T，而 A 是該明文型別的別名，則：

type A = {
  P?: T
};
代表的意義是，被型別化名 A 作型別註記的變數，可以：

選擇性地忽略 P 這個屬性。
因為推論出來的結果會是以下的形式，因此也可以選擇寫出 P 屬性但填入 undefined 這個值：
{ P?: T | undefined }
 */


// 大部分時候，在 VS code 中，將滑鼠移到型別化名或變數時，就可以看見明文型別。(之前的狀況都是此種)

// 有些時候我們還是會看不到型別化名背後的結構，這時候該怎麼辦？我要怎麼快速找到該化名連結到實際上在程式碼間的定義位置呢？ => 舉例如下：

type AccountSystem = {
  account: string,
  password: string
}
type AccountPersonalInfo = {
  nickname?: string,
  birth?: Date
}
// 使用複合型別的 Intersection
type PersonalAccount = AccountSystem & AccountPersonalInfo

let accountGary: PersonalAccount = {
  account: 'gagaga',
  password: '<hash-password>',
  nickname: undefined,
}
//
/**
滑鼠移到 PersonalAccount，會出現：
type PersonalAccount = AccountSystem & AccountPersonalInfo

問題：我仍然是看不到 AccountSystem 或 AccountPersonalInfo 這二個型別化名背後的明文型別結構！
 */

/** Solution:
使用 VS code 快捷鍵：滑鼠移至變數上(例如 型別化名 PersonalAccount)，按 Alt，此時變數名稱出現底線時，
點左鍵即可跳至變數宣告之處
 */

// 測試：選用型別在函式參數中
let optionPara = function (msg?: string, nickname: string) {
  console.log('msg:', msg)
  console.log('nickname:', nickname)
}
/** TS 跳警示：
(parameter) nickname: string
必要參數不得接在選擇性參數之後。
 */

// 對調位置一下： 把選擇性參數放在後方
let optionPara2 = function (nickname: string, msg?: string) {
  console.log('msg:', msg)
  console.log('nickname:', nickname)
}

// 測試：選用型別在 tuple 中
type tupleTest = [string, number, Date?, Boolean]
/** TS error:
interface Boolean
A required element cannot follow an optional element.
 */
// 修正：選用型別放在 tuple 最後面
type tupleTest22 = [string, number, Boolean, Date?]

// 少了 Date 這個值，不會跳 error
let tupleTest22: tupleTest22 = ['John', 18, true]

// 少了 Boolean 這個值，就會跳 error
let tupleTest33: tupleTest22 = ['John', 18]