const display = document.getElementById("display");
const clearBtn = document.getElementById("clear-btn");
const numBtns = document.querySelectorAll(".num");
const operatorBtns = document.querySelectorAll(".op");
const eqBtn = document.getElementById("eq-btn");
const decimalBtn = document.getElementById("decimal-btn");
const minusBtn = document.getElementById("minus-btn");

/* 
This array stores the first operand, the operator and the second operand as strings.
The length of this array also tells us which part of the operation we are at
and thus which buttons can be pressed at that moment in time.
*/
const operation = [];

clearBtn.addEventListener("click", clearDisplay);
numBtns.forEach(btn => btn.addEventListener("click", updateOperand));
operatorBtns.forEach(btn => btn.addEventListener("click", updateOperator));
eqBtn.addEventListener("click", executeOperation);
decimalBtn.addEventListener("click", addDecimal);
minusBtn.addEventListener("click", reverseSign);

// --------------------------- Below are callback and helper functions ---------------------------

function reverseSign() {
    let operationLength = operation.length;
    switch(operationLength) {
        case 1:
            if (operation[0] === "0") {
                operation[0] = "-";
                updateDisplay(operation[0]);
            }
            break;
        case 2:
            if (operation[1] === "*" || operation[1] === "/") {
                operation.push("-");
                updateDisplay(operation[2]);
            }
            break;
        case 3:
            break;
        default:
            console.log("ERROR");
    }
}

function addDecimal() {
    let operationLength = operation.length;
    switch(operationLength) {
        case 1:
            if (operation[0].length < 9 && operation[0].indexOf(".") === -1) {
                operation[0] += ".";
                updateDisplay(operation[0]);
            }
            break;
        case 2:
            operation.push("0.");
            updateDisplay(operation[2]);
            break;
        case 3:
            if (operation[2].length < 9 && operation[2].indexOf(".") === -1) {
                operation[2] += ".";
                updateDisplay(operation[2]);
            }
            break;
        default:
            console.log("ERROR");
    }
}

function executeOperation() {
    if (operation[1] === "/" && operation[2] === "0") {
        updateDisplay(">:(");
        operation.length = 0;
    } else if (operation.length === 3 && operation[2] !== "-") {
        let result = operate(operation[1], operation[0], operation[2]);
        updateDisplay(result);
        operation.length = 0;
        operation.push(result);
    }
}

function updateOperator(e) {
    let operationLength = operation.length;
    switch(operationLength) {
        case 1:
            if (operation[0] === "-") {
                break;
            } else if (operation[0] === "0" && e.target.dataset.val === "-") {
                break;
            }
            operation.push(e.target.dataset.val);
            break;
        case 2:
            if (operation[1] === "*" || operation[1] === "/") {
                if (e.target.dataset.val === "-") {
                    break;
                } 
            }
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
        case 1:
            // Prevent leading zeroes
            if (operation[0] === "0") {
                if (e.target.dataset.val === "0") {
                    break;
                } else {
                    operation[0] = e.target.dataset.val;
                    updateDisplay(operation[0]);
                    break;
                }
            }
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
            // Prevent leading zeroes
            if (operation[2] === "0") {
                if (e.target.dataset.val === "0") {
                    break;
                } else {
                    operation[2] = e.target.dataset.val;
                    updateDisplay(operation[2]);
                    break;
                }
            }
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

function clearDisplay() {
    operation.length = 0;
    operation.push("0");
    updateDisplay(operation[0]);
}

function operate(op, num1, num2) {
    let result;
    num1 = Number(num1);
    num2 = Number(num2);
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
    return truncateNumber(result);
}

// Keep number to 9 characters
function truncateNumber(num) {
    if (num > 999999999) {
        num = 999999999;
    } else if (num < 0.0000001 && num > 0) {
        num = 0.0000001;
    } else if (num > -0.000001 && num < 0) {
        num = -0.000001;
    } else if (num < -99999999) {
        num = -99999999;
    }
    num = Number(num.toFixed(8));
    return num.toString().slice(0, 9);
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