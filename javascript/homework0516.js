// 1 Use Prototype Properties to Reduce Duplicate Code
function Dog(name) {
  this.name = name;
}

Dog.prototype.numLegs = 4;

// Only change code above this line
let beagle = new Dog('Snoopy');

// 2 Extend Constructors to Receive Arguments
function Dog(name, color) {
  this.name = name;
  this.color = color;
  this.numLegs = 4;
}

const terrier = new Dog('Bob', 'brown');

// 3 클래스 생성 및 상속, super 사용과 메소드 오버로딩
class HomeAppliance {
  constructor(name, quantities, price) {
    this.name = name;
    this.quantities = quantities;
    this.price = price;
  }

  getTotalPrice() {
    const totalPrice = this.price * this.quantities;
    const message = `${this.name}의 구매수량은 ${this.quantities}개 이므로 ${totalPrice}원입니다.`;
    return message;
  }
}

class Payment extends HomeAppliance {
  getTotalPrice() {
    return this.price * this.quantities > 1000000
      ? `${super.getTotalPrice()} 카드 지불하겠습니다.`
      : `${super.getTotalPrice()} 현금 지불하겠습니다.`;
  }
}

const tv = new Payment('LG TV', 3, 760000);
const microwave = new Payment('전자레인지', 2, 200000);

console.log(tv.getTotalPrice());
console.log(microwave.getTotalPrice());
