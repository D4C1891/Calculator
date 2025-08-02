const numButtons = document.querySelectorAll('.numButtons');
const operatorButtons = document.querySelectorAll('.operatorButtons');
const equalButton = document.querySelector('.equals')
let display = document.getElementById('display');

let operand1 = '';
let operator = '';
let operand2 = '';
let displayValue = 0;

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
    
    console.log(op);

    if(operand1 !== ''){
        operator = op;
    }
}

operatorButtons.forEach(button => { button.addEventListener('click', getOperatorClick)
    console.log(operator);
})

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
    
    displayValue = result;
    display.value = displayValue;
    operand1 = result.toString();
    operator = '';
    operand2 = '';
}

equalButton.addEventListener('click',calculate);
