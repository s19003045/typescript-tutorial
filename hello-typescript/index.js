"use strict";
/*
const message = "hello world"

function say(something: String): void {
  console.log(something)
}

say(message)
*/
var message = "hello world";
console.log(message.toUpperCase());
message = 123;
console.log('message:', message + 10);
let x = 1.333;
console.log('x:', x);
// x = undefined
console.log('x:', x);
let y = [1, 2, 3];
let z = [4, 5, 6];
y[3] = 3;
console.log(y[3]);
console.log(z);
var Color;
(function (Color) {
    Color[Color["red"] = 0] = "red";
    Color[Color["green"] = 1] = "green";
    Color[Color["yellow"] = 2] = "yellow";
})(Color || (Color = {}));
let blue = Color.green;
let colorName = Color[1];
console.log('blue:', blue);
console.log('colorName:', colorName);
/* error
let notSure: any = 3
notSure.ifItExists()
notSure.toFixed()
*/
let good;
const say = function (msg) {
    good = msg;
    // return msg
    return undefined;
};
console.log(say('john'));
let n = undefined;
let tn = null;
let unusable;
unusable = undefined;
console.log('unusable:', unusable);
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
let someValue = "this is a string";
let strLength = someValue.length;
console.log('strLength:', strLength);
let someValue1 = "this is a string";
let strLength2 = someValue1.length;
