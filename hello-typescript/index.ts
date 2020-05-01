/*
const message = "hello world"

function say(something: String): void {
  console.log(something)
}

say(message)
*/

var message: string | number = "hello world"

console.log(message.toUpperCase())
message = 123
console.log('message:', message + 10)

let x: number = 1.333
console.log('x:', x)
// x = undefined
console.log('x:', x)

let y: number[] = [1, 2, 3]
let z: Array<number> = [4, 5, 6]
y[3] = 3
console.log(y[3])
console.log(z)


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


let n: undefined = undefined
let tn: null = null




let unusable: void
unusable = undefined
console.log('unusable:', unusable)
// unusable = null


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