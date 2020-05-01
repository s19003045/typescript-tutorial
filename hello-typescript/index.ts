/**
 * 參照官網的 basic 來熟悉 TS 的 type annotation
 * 
 * 
 * 編寫完後，執行 tsc，
 * TS 會依 tsconfig.json 設定來完成編譯 
 * 若正確則會建立 index.js 檔案，若失敗則會跳 error，不會建立 index.js 
 * 
 * 下面，保留錯誤的編寫
 */


const message1 = "hello world"

function sayHello(something: String): void {
  console.log(something)
}

sayHello(message1)


// ====== type: string
let message: string | number = "hello world"

console.log(message.toUpperCase())
message = 123
console.log('message:', message + 10)


// ====== type: number
let x: number = 1.333
console.log('x:', x)
x = undefined
console.log('x:', x)

/**
 * 已指定 x 的 type 為 string
 * 故不接受 undefined
 * 
 */

// ======== Array, 且 array 中為 number
// 表示法1
let y: number[] = [1, 2, 3]

// 表示法2
let z: Array<number> = [4, 5, 6]
y[3] = 3
console.log(y[3])
console.log(z)


// ========= Enum
enum Color { red, green, yellow }
let blue: Color = Color.green

let colorName: string = Color[1]

console.log('blue:', blue)
console.log('colorName:', colorName)

/* error
let notSure: any = 3
notSure.ifItExists()
notSure.toFixed()
*/


let good: string
const say = function (msg: string): void {
  good = msg
  // return msg
  return undefined
}
console.log(say('john'))

/**
 * 已宣稱不會 return 任何東西
 * 故 return msg 是有問題的 
 * 
 */



// =========type: undefined, null
let n: undefined = undefined
let tn: null = null


// =========type: void
let unusable: void
unusable = undefined
console.log('unusable:', unusable)
unusable = null

/**
 * 已宣稱 void
 * 可接受 undefined, 但不接受 null 
 * 
 */




// function error(message: string): never {
//   throw new Error(message);
// }
// error('john')

// function infiniteLoop(): never {
//   while (true) {
//   }
// }

// infiniteLoop()

// declare function create(o: object | null): void

// create({ prop: 0 }); // OK
// create(null); // OK

let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
console.log('strLength:', strLength)

let someValue1: any = "this is a string";
let strLength2: number = (someValue1 as string).length;