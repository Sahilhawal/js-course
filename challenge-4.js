const john = {
  name: "John",
  weight: 80,
  height: 1,
  calcBMI: function () {
    return this.weight / (this.height * this.height);
  },
};

const jim = {
  name: "Jim",
  weight: 80,
  height: 1,
  calcBMI: function () {
    return this.weight / (this.height * this.height);
  },
};

if (john.calcBMI() > jim.calcBMI())
  console.log("John has greater BMI than Jim which is " + john.calcBMI());
else if (john.calcBMI() === jim.calcBMI())
  console.log("BMI of john and jim is equal");
else console.log("Jim has greater BMI than John which is " + jim.calcBMI());
