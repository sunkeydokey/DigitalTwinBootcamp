// 코드를 입력하세요.

// 1. 화면구성
// 게임 이름
let title = document.querySelector('h1');
title.textContent = '숫자 야구 게임';

const recordList = document.querySelector('#records');

// 전송 폼
let form = document.querySelector('form');

// 입력창
let input = document.querySelector('input');

// 입력 버튼
let btn = document.querySelector('#inputButton');
btn.textContent = '입력';

// 리셋 버튼
let resetButton = document.querySelector('#resetButton');
resetButton.textContent = '리셋';

// 힌트 버튼
let hintButton = document.querySelector('#hintButton');
hintButton.textContent = '힌트';

// 결과조회
let result = document.querySelector('#result');

// 남은횟수
let times = document.querySelector('#times');

// 2. 입력 버튼
form.addEventListener('submit', function (e) {
  e.preventDefault();
  // 이하 코드 작성
  game.checkIsGoal();
});

// 3. 리셋 버튼
resetButton.addEventListener('click', function (e) {
  e.preventDefault();
  // 이하 코드 작성
  game.startGame();
});

// 4. 힌트 버튼
hintButton.addEventListener('click', function (e) {
  e.preventDefault();
  const hintBox = document.querySelector('#hint');
  const h2 = document.createElement('h2');
  h2.textContent = 'Hint!!';
  hintBox.append(h2);
  const unorderedList = document.createElement('ul');
  const hintNumbers = game.hint.map((num) => {
    return `<li>${num}</li>`;
  });
  unorderedList.innerHTML = hintNumbers.join('');
  hintBox.append(unorderedList);
});

const game = {
  goal: '',
  attempts: 10,
  records: [],
  hint: [],

  startGame() {
    this.goal = '';
    this.attempts = 10;
    this.records = [];
    input.textContent = '';
    recordList.innerHTML = '';

    while (this.goal.length < 4) {
      const num = Math.floor(Math.random() * 10);
      if (!this.goal.includes(num)) {
        this.goal += num.toString();
      }
    }

    this.generateHint();
  },

  generateHint() {
    const HintList = [Number(this.goal)];
    while (HintList.length < 5) {
      let hintNumber = '';
      while (hintNumber.length < 4) {
        const num = Math.floor(Math.random() * 10);
        if (!hintNumber.includes(num)) {
          hintNumber += num.toString();
        }
      }
      HintList.push(Number(hintNumber));
    }
    HintList.sort((a, b) => b - a);
    this.hint = [...HintList];
  },

  checkIsGoal() {
    const guess = input.value;
    for (let i = 0; i < guess.length; i++) {
      if (guess.lastIndexOf(guess[i]) !== i) {
        alert('중복된 숫자를 입력할 수는 없습니다.');
        input.textContent = '';

        return;
      }
    }
    if (guess.length !== 4 || isNaN(Number(guess))) {
      alert('올바른 숫자를 입력하세요.');
      input.textContent = '';

      return;
    }

    let strike = 0;
    let ball = 0;
    for (let i = 0; i < 4; i++) {
      if (guess[i] === this.goal[i]) {
        strike++;
      } else if (this.goal.includes(guess[i])) {
        ball++;
      }
    }
    if (strike === 4) {
      this.attempts--;

      input.value = `정답입니다! ${10 - this.attempts}번만에 맞추셨습니다.`;
      return;
    } else {
      this.attempts--;
    }

    this.records.push({
      try: 10 - this.attempts,
      guessedNumber: guess,
      strike: strike,
      ball: ball,
    });

    const guessRecords = this.records.map((record) => {
      return `<li>${record.try} 회차 : 
      ${record.guessedNumber} => 
      ${record.strike}스트라이크 
      ${record.ball}볼</li>`;
    });

    recordList.innerHTML = guessRecords.join('');
    times.textContent = `남은 기회 ${this.attempts}회!`;
    input.value = '';
  },
};

game.startGame();
