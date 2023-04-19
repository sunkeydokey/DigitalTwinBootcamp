// 1
function testElse(val) {
  let result = '';
  // Only change code below this line

  if (val > 5) {
    result = 'Bigger than 5';
  } else {
    result = '5 or Smaller';
  }

  // Only change code above this line
  return result;
}

testElse(4);

// 2
function testElseIf(val) {
  if (val > 10) {
    return 'Greater than 10';
  } else if (val < 5) {
    return 'Smaller than 5';
  } else {
    return 'Between 5 and 10';
  }
}

testElseIf(7);

// 3 2중 for문으로 구구단 작성 (continue 사용하여 5단 생략)
for (let i = 9; i > 1; i--) {
  if (i === 5) {
    console.log('5단 생략');
    continue;
  }
  console.log(i + '단');
  for (let j = 1; j < 10; j++) {
    console.log(`${i} x ${j} = ${i * j}`);
  }
}

// 4
// Setup
const myArray = [];

// Only change code below this line
let i = 5;

while (i > -1) {
  myArray.push(i);
  i--;
}

// 5
function switchOfStuff(val) {
  let answer = '';
  // Only change code below this line
  switch (val) {
    case 'a':
      answer = 'apple';
      break;
    case 'b':
      answer = 'bird';
      break;
    case 'c':
      answer = 'cat';
      break;
    default:
      answer = 'stuff';
      break;
  }

  // Only change code above this line
  return answer;
}

switchOfStuff(1);

// 6
function functionWithArgs(a, b) {
  console.log(a + b);
}

functionWithArgs(1, 3);

// 7
// Only change code below this line
const increment = (number, value = 1) => number + value;
// Only change code above this line
