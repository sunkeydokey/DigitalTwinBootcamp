// let numbers = [1, 2, 3, 4, 5];
// numbers.map((elem) => console.log(elem * elem));

let data = ['apple', 'kiwi', 'banana', 'orange'];
let x = data[0];
let z = data[2];
console.log(x, z);

let [a, b, c] = data;
console.log(a, b, c);

let obj = {
  name: 'apple',
  address: 'Korea',
  age: 500,
};

let { name, age, address } = obj;
console.log(address, name, age);

let { name: myName, age: myAge } = obj;
console.log(myName, myAge);
