// 1. Use Closure to Protect Properties

function Bird() {
  let weight = 15;
  this.getWeight = function () {
    return weight;
  };
}

// 2. Spread Operator

const arr1 = ['JAN', 'FEB', 'MAR', 'APR', 'MAY'];
let arr2;

arr2 = [...arr1]; // Change this line

console.log(arr2); // [ 'JAN', 'FEB', 'MAR', 'APR', 'MAY' ]
console.log(arr1 === arr2); // false

// 3 Write Concise Declarative Functions with ES6
const bicycle = {
  gear: 2,
  setGear(newGear) {
    this.gear = newGear;
  },
};
bicycle.setGear(3);
console.log(bicycle.gear); // 3
