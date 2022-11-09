const inputEl = document.querySelectorAll(".input");
const tips = document.querySelectorAll(".box");
const data = document.querySelectorAll(".__tipAmountSect > h2");
const errorMessage = document.querySelector(".error");
const reset = document.querySelector("button");
const customBox = document.querySelector(".boxCustom");
const customInput = document.querySelector(".customInput");

let bill;
let people_No;
let tipsConverter;
let selectedTip;
let result;
let result2;
let finalResult;
let test;

for (let i = 0; i < tips.length; i++) {
  tips[i].addEventListener("click", () => {
    // console.log(tips[i].innerText);
    tips[i].classList.toggle("box__active");

    // converting the values of the input boxes to Number
    bill = Number(inputEl[0].value);
    people_No = Number(inputEl[1].value);

    //console.log(people_No);

    tipsConverter = tips[i].innerText;
    selectedTip = operand(tipsConverter);

    // console.log(bill);
    // console.log(people_No);
    // console.log(selectedTip);

    if (people_No < 1) {
      errorMessage.textContent = `Can't be zero`;
      inputEl[1].classList.add("borderColor");

      setTimeout(() => {
        errorMessage.textContent = ``;
        inputEl[1].classList.remove("borderColor");
      }, 3000);
    } else {
      // doing the calculations and converting to D.P with the .toFixed() method
      result = ((bill * (selectedTip / 100)) / people_No).toFixed(2);
      // console.log(result);

      result2 = (bill * selectedTip) / 100;
      finalResult = ((bill + result2) / people_No).toFixed(2);

      data[0].innerHTML = `$${result}`;
      data[1].innerHTML = `$${finalResult}`;
    }

    reset.disabled = false;

    function operand(value) {
      // splitting the default data that comes into this function into an array and assigning to Data
      const Data = value.split("");

      // popping off the last element of the array since it'd always be the percentage
      const newData = Data.pop();

      // concatenating the array back into string
      const updatedData = Data.join("");

      // returning the converted version of the updatedData (Number)
      return Number(updatedData);
    }
  });
}

reset.addEventListener("click", () => {
  // console.log("I'm being clicked");
  inputEl[0].value = "";
  inputEl[1].value = "";

  data[0].innerHTML = `$0.00`;
  data[1].innerHTML = `$0.00`;

  for (let i = 0; i < tips.length; i++) {
    tips[i].classList.remove("box__active");
  }

  reset.disabled = true;
});

customBox.addEventListener("click", () => {
  // console.log("I'm being clicked");
  customInput.classList.remove("hidden");
});
