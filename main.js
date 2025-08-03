const numButtons = document.querySelectorAll('.numButtons');
const operatorButtons = document.querySelectorAll('.operatorButtons');
const equalButton = document.querySelector('.equals');
const decimalButton = document.querySelector('.decimal');
const clearButton = document.querySelector('.clear');
let display = document.getElementById('display');

let operand1 = '';
let operator = '';
let operand2 = '';
let displayValue = 0;
let resultFlag = false;

function getNumberClick(e){
    const num = e.currentTarget.dataset.value;

    if(operator === ''){
        operand1 += num;
        displayValue = operand1;
    }
    else {
        operand2 += num;
        displayValue = operand2;
    }
display.value = displayValue;
}

numButtons.forEach(button => { button.addEventListener('click', getNumberClick)
})

function getOperatorClick(e){
    const op = e.currentTarget.textContent;
    
    if(operand1 !== ''){
        operator = op;
    }
}

operatorButtons.forEach(button => { button.addEventListener('click', getOperatorClick)
})

function handleDecimalClick() {
    if (operator === '') {
        if (!operand1.includes('.')) {
            operand1 += '.';
            displayValue = operand1;
        }
    } else {
        if (!operand2.includes('.')) {
            operand2 += '.';
            displayValue = operand2;
        }
    }
    display.value = displayValue;
}

decimalButton.addEventListener('click', handleDecimalClick );

clearButton.addEventListener('click', () => {
    operand1 = '';
    operator = '';
    operand2 = '';
    displayValue = '';
    display.value = displayValue;
});

function calculate(){
    let result = 0;

    const num1 = parseFloat(operand1);
    const num2 = parseFloat(operand2);

    switch(operator){
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "*":
            result = num1 * num2;
            break;
        case "/":
            if(num2 === 0){
                display.value = "ERROR";
                return;
            }
            result = num1 / num2;
            break;
        default:
            display.value = "Invalid operator";
            return;
    }
    
    result  = Math.round(result * 10) /10;
    displayValue = result;
    display.value = displayValue;
    resultFlag = true;
    operand1 = result.toString();
    operator = '';
    operand2 = '';
}

numButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (resultFlag) {
            operand1 = '';
            operand2 = '';
            operator = '';
            displayValue = '';
            resultFlag = false;
        }

        if(operator === '') {
            operand1 += button.textContent;
            displayValue = operand1;
        }
        display.value = displayValue;
    });
});


equalButton.addEventListener('click',calculate);

