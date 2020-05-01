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