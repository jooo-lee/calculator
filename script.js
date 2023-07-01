const display = document.getElementById("display");
const clearBtn = document.getElementById("clear-btn");
const numBtns = document.querySelectorAll(".num");
const operatorBtns = document.querySelectorAll(".op");
const eqBtn = document.getElementById("eq-btn");

let currOperand = "";
let prevOperand = "";
let operator = "";

clearBtn.addEventListener("click", clearDisplay);
numBtns.forEach(btn => btn.addEventListener("click", updateCurrOperand));
operatorBtns.forEach(btn => btn.addEventListener("click", addOperator));
eqBtn.addEventListener("click", executeOperation);

function executeOperation(e) {
    if (prevOperand && operator) {
        let result = operate(operator, Number(prevOperand), Number(currOperand));
        updateDisplay(result);
        currOperand = result;
        operator = "";
    }
}

function addOperator(e) {
    prevOperand = currOperand;
    currOperand = "";
    operator = e.target.dataset.val;
}

function updateCurrOperand(e) {
    if (currOperand.length < 9) {
        currOperand += e.target.dataset.val;
        updateDisplay(currOperand);
    }
}

function updateDisplay(newContent) {
    display.textContent = newContent;
}

function clearDisplay(e) {
    currOperand = "";
    display.textContent = "";
}

function operate(op, num1, num2) {
    let result;
    switch(op) {
        case "+":
            result = add(num1, num2);
            break;
        case "-":
            result = subtract(num1, num2);
            break;
        case "*":
            result = multiply(num1, num2);
            break;
        case "/":
            result = divide(num1, num2);
            break;
        default:
            return "INVALID OPERATOR";
    }
    return result;
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}