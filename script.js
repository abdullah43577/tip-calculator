const inputEl = document.querySelectorAll(".input");
const tips = document.querySelectorAll(".box");
const data = document.querySelectorAll(".__tipAmountSect > h2");
const errorMessage = document.querySelector(".error");
const reset = document.querySelector("button");
const customBox = document.querySelector(".boxCustom");
const customInput = document.querySelector(".customInput");
const btn = document.querySelector(".btn");

let bill;
let people_No;
let tipsConverter;
let selectedTipCustom;
let result;
let result2;
let finalResult;
let test;

function operand(value) {
  // splitting the default data that comes into this function into an array and assigning to Data
  const Data = value.split("");

  // popping off the last element of the array since it'd always be the percentage
  Data.pop();

  // concatenating the array back into string
  const updatedData = Data.join("");
  // returning the converted version of the updatedData (Number)
  return Number(updatedData);
}

tips.forEach((percentageSelected) => {
  percentageSelected.addEventListener("click", () => {
    (() => {
      // just trying out the forEach() loop for the first time
      tips.forEach((active_Box) => {
        if (active_Box.classList.contains("box__active")) {
          active_Box.classList.remove("box__active");
        }
      });
    })();

    percentageSelected.classList.add("box__active");

    // converting the values of the input boxes to Number
    bill = Number(inputEl[0].value);
    people_No = Number(inputEl[1].value);

    tipsConverter = percentageSelected.innerText;
    selectedTip = operand(tipsConverter);

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
  });
});

customBox.addEventListener("click", () => {
  // console.log("I'm being clicked");
  customInput.classList.remove("hidden");
  btn.classList.remove("hidden");
});

btn.addEventListener("click", () => {
  if (customInput.value) {
    bill = Number(inputEl[0].value);
    people_No = Number(inputEl[1].value);

    tipsConverter = customInput.value;
    selectedTipCustom = operand(tipsConverter);

    if (people_No < 1) {
      errorMessage.textContent = `Can't be zero`;
      inputEl[1].classList.add("borderColor");

      setTimeout(() => {
        errorMessage.textContent = ``;
        inputEl[1].classList.remove("borderColor");
      }, 3000);
    } else {
      // doing the calculations and converting to D.P with the .toFixed() method
      result = ((bill * (selectedTipCustom / 100)) / people_No).toFixed(2);
      // console.log(result);

      result2 = (bill * selectedTipCustom) / 100;
      finalResult = ((bill + result2) / people_No).toFixed(2);

      data[0].innerHTML = `$${result}`;
      data[1].innerHTML = `$${finalResult}`;
    }

    reset.disabled = false;
  } else {
    customInput.classList.add("borderColor");

    setTimeout(() => {
      customInput.classList.remove("borderColor");
    }, 3000);
  }
});

reset.addEventListener("click", () => {
  // console.log("I'm being clicked");
  inputEl[0].value = "";
  inputEl[1].value = "";

  data[0].innerHTML = `$0.00`;
  data[1].innerHTML = `$0.00`;

  tips.forEach((activeBox) => {
    activeBox.classList.remove("box__active");
  });

  if (customInput.value) {
    customInput.value = "";
  }
  customInput.classList.add("hidden");
  btn.classList.add("hidden");

  reset.disabled = true;
});
