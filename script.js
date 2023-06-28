const display = document.getElementById("display");

const numBtns = document.querySelectorAll(".num");
numBtns.forEach(btn => btn.addEventListener("click", displayNum));

function displayNum(e) {
    if (display.textContent.length < 9) {
        display.textContent += e.target.dataset.val;
    }
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