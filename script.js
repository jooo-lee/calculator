const display = document.getElementById("display");
const clearBtn = document.getElementById("clear-btn");
const numBtns = document.querySelectorAll(".num");
const operatorBtns = document.querySelectorAll(".op");
const eqBtn = document.getElementById("eq-btn");

/* 
This array stores the first operand, the operator and the second operand.
The length of this array also tells us which part of the operation we are at
and thus which buttons can be pressed at that moment in time.
*/
const operation = [];

clearBtn.addEventListener("click", clearDisplay);
numBtns.forEach(btn => btn.addEventListener("click", updateOperand));
operatorBtns.forEach(btn => btn.addEventListener("click", updateOperator));
eqBtn.addEventListener("click", executeOperation);

// --------------------------- Below are callback and helper functions ---------------------------

function executeOperation() {
    if (operation.length === 3) {
        let result = operate(operation[1], Number(operation[0]), Number(operation[2]));
        updateDisplay(result);
        operation.length = 0;
        operation.push(result.toString());
    }
}

function updateOperator(e) {
    let operationLength = operation.length;
    switch(operationLength) {
        case 0:
            break;
        case 1:
            operation.push(e.target.dataset.val);
            break;
        case 2:
            operation[1] = e.target.dataset.val;
            break;
        case 3:
            executeOperation();
            operation.push(e.target.dataset.val);
            break;
        default:
            console.log("ERROR");
    }
}

function updateOperand(e) {
    let operationLength = operation.length;
    switch(operationLength) {
        case 0:
            operation.push(e.target.dataset.val);
            updateDisplay(operation[0]);
            break;
        case 1:
            if (operation[0].length < 9) {
                operation[0] += e.target.dataset.val;
            }
            updateDisplay(operation[0]);
            break;
        case 2:
            operation.push(e.target.dataset.val);
            updateDisplay(operation[2]);
            break;
        case 3:
            if (operation[2].length < 9) {
                operation[2] += e.target.dataset.val;
            }
            updateDisplay(operation[2]);
            break;
        default:
            console.log("ERROR");
    }
}

function updateDisplay(newContent) {
    display.textContent = newContent;
}

function clearDisplay(e) {
    operation.length = 0;
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