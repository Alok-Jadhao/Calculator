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
    return b === 0 ? "Error: Cannot divide by zero" : a / b;
}

function operate(operator, a, b) {
    switch (operator) {
        case '+': return add(a, b);
        case '-': return subtract(a, b);
        case '*': return multiply(a, b);
        case '/': return divide(a, b);
        default: return "Error";
    }
}


let firstNumber = "";
let secondNumber = "";
let currentOperator = null;
let shouldResetDisplay = false;

const display = document.getElementById("display");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.getElementById("equals");
const clearButton = document.getElementById("clear");

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (shouldResetDisplay) {
            display.textContent = "";
            shouldResetDisplay = false;
        }
        display.textContent += button.textContent;
    });
});

document.querySelectorAll("button").forEach(button => {
    button.addEventListener("mousedown", (event) => {
        button.style.transform = "scale(0.9)"; // Shrinks button on press
        button.style.opacity = "0.7";
    });

    button.addEventListener("mouseup", () => {
        button.style.transform = "scale(1)"; // Resets size after release
        button.style.opacity = "1";
    });

    button.addEventListener("mouseleave", () => {
        button.style.transform = "scale(1)"; // Ensures reset if mouse leaves
        button.style.opacity = "1";
    });
});

operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (currentOperator !== null) {
            secondNumber = display.textContent;
            display.textContent = operate(currentOperator, parseFloat(firstNumber), parseFloat(secondNumber));
            firstNumber = display.textContent;
        } else {
            firstNumber = display.textContent;
        }
        currentOperator = button.textContent;
        shouldResetDisplay = true;
    });
});

equalsButton.addEventListener("click", () => {
    if (currentOperator === null) return;
    secondNumber = display.textContent;
    display.textContent = operate(currentOperator, parseFloat(firstNumber), parseFloat(secondNumber));
    firstNumber = display.textContent;
    currentOperator = null;
});

clearButton.addEventListener("click", () => {
    display.textContent = "0";
    firstNumber = "";
    secondNumber = "";
    currentOperator = null;
});
