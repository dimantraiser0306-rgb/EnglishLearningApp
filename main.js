import list1 from "./list.js";

const expressionBlock = document.querySelector(".expression__block");
const button = document.querySelector(".button");
const input = document.querySelector(".input");
const list = document.querySelector(".list");
const buttonAdd = document.querySelector(".button__add");
const inputAdd = document.querySelector(".input__add");
const listBlock = document.querySelector(".list__block");
const addExpression = document.querySelector(".add__expression");
const orderedList = document.querySelector(".ordered__list");
const form = document.querySelector(".form");
const nextExpressionButton = document.querySelector(".next__expression");
const showErrorsBlock = document.querySelector(".show__errors-block");
let previousExprassion;

const values = Object.values(list1);
const keys = Object.keys(list1);

let timeout;
let interval;
let randome = 0;
let correct = 0;
let incorrect = 0;
let wrong = {};
let attempt = 0;

function clearTimers() {
  clearInterval(interval);
  clearTimeout(timeout);
}

// кнопка проверки выражений

button.addEventListener("click", function (event) {
  event.preventDefault();
  getExpression();
});

// настройка визуальных эффектов инпута и кнопки

input.addEventListener("focus", () => {
  clearTimers();
  button.classList.add("button__class");

  input.addEventListener("blur", () => {
    clearTimers();
    button.classList.remove("button__class");
  });
  timeout = setTimeout(function () {
    button.classList.remove("button__class");
  }, 1000);
  interval = setInterval(function () {
    button.classList.toggle("button__class");
  }, 2000);
});

orderedList.innerHTML = localStorage.getItem("savedListHTML") || "";

// настройка кнопки для добавления выразжений
buttonAdd.addEventListener("click", function () {
  inputAdd.classList.toggle("hidden");
  listBlock.classList.toggle("hidden");
  addExpression.classList.toggle("hidden");
  inputAdd.focus();
});

// настройка логики работы с выражениями
// addExpression

addExpression.addEventListener("click", function (action) {
  action.preventDefault();
  const newEl = document.createElement("li");

  newEl.style.cssText = "display: flex; justify-content: space-between";
  newEl.textContent = inputAdd.value + "";

  orderedList.append(newEl);
  inputAdd.value = "";

  // удаляющая выражения кнопка
  const delExpression = document.createElement("button");
  delExpression.textContent = "X";
  newEl.append(delExpression);

  delExpression.setAttribute(
    "onclick",
    "this.closest('li').remove(); localStorage.setItem('savedListHTML', this.closest('ol').innerHTML);",
  );

  delExpression.style.cssText =
    "background-color: inherit; border: none; cursor: pointer";
  localStorage.setItem("savedListHTML", orderedList.innerHTML);
});

// логика проверки выражений
// функция для создания вормирования выражения в поле показа выражений
const getExpression = function () {
  if (input.value === values[randome]) {
    ++correct;
    attempt = 0;
    previousExprassion = values[randome];
    blinkingRight();
    nextExpression();
  } else {
    ++attempt;
    blinkingWrong();
    console.log("incorrect");
    if (attempt == 2) {
      attempt = 0;
      ++incorrect;
      blinkingWrong();
      input.value = "";
      wrong[keys[randome]] = values[randome];
      const text = values[randome];
      showErrorsBlock.textContent =
        text.charAt(0).toUpperCase() + text.slice(1);

      nextExpression();
    }
  }
};

function nextExpression() {
  randome = Math.floor(Math.random() * keys.length);
  const text = keys[randome];
  expressionBlock.textContent = text.charAt(0).toUpperCase() + text.slice(1);

  input.value = "";
}

// next expression button
nextExpressionButton.addEventListener("click", () => {
  wrong[keys[randome]] = values[randome];
  showErrorsBlock.textContent = values[randome];
  ++incorrect;

  nextExpression();
});
// next expression мигание кнопки при неправильном, правильном ответе
let blinkInterval;
const blinkingWrong = () => {
  clearInterval(blinkInterval);
  blinkInterval = setInterval(() => {
    nextExpressionButton.classList.add("next__expression-wrap-style");
    setTimeout(() => {
      nextExpressionButton.classList.remove("next__expression-wrap-style");
    }, 200);
  }, 400);
  setTimeout(() => {
    clearInterval(blinkInterval);
    nextExpressionButton.classList.remove("next__expression-wrap-style");
  }, 1200);
};

const blinkingRight = () => {
  clearInterval(blinkInterval);
  blinkInterval = setInterval(() => {
    nextExpressionButton.classList.add("next__expression-wrap-style-right");
    setTimeout(() => {
      nextExpressionButton.classList.remove(
        "next__expression-wrap-style-right",
      );
    }, 200);
  }, 400);
  setTimeout(() => {
    clearInterval(blinkInterval);
    nextExpressionButton.classList.remove("next__expression-wrap-style-right");
  }, 1200);
};

// функция для отображения неправильного выражения в нижнем блоке после 2х неправильныъ попыпот иди нажатии кнопки nextExpression
function wrongEspressionToBlock() {}

nextExpression();

const myCity = {
  city: "new york",
  cityGreeting: function () {
    console.log("greetinhgs!!");
  },
};

myCity.cityGreeting();
