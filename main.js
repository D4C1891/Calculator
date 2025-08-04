//Get the HTML buttons that require interactivity, and get the display so it can be updated.
const numButtons = document.querySelectorAll('.numButtons');
const operatorButtons = document.querySelectorAll('.operatorButtons');
const equalButton = document.querySelector('.equals');
const decimalButton = document.querySelector('.decimal');
const clearButton = document.querySelector('.clear');
let display = document.getElementById('display');

//Initialize global variables that will be used throughout the program
let operand1 = '';
let operator = '';
let operand2 = '';
let displayValue = 0;
let resultFlag = false;

//Adds a event listener to each button that will get the values for the first and second operator,
//as well as make sure that pressing a new number once a result is done will result in a new calculation.
numButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        if (resultFlag) {
            operand1 = '';
            operand2 = '';
            operator = '';
            displayValue = '';
            resultFlag = false;
        }

        const num = e.currentTarget.dataset.value;

        if (operator === '') {
            operand1 += num;
            displayValue = operand1;
        } else {
            operand2 += num;
            displayValue = operand2;
        }

        display.value = displayValue;
    });
});

//Gets the operator for the equation on click and checks to see if the resultFlag is true to avoid errors in
//calculations performed after the first one.
operatorButtons.forEach(button => {
    button.addEventListener('click', (e) => {
       if(resultFlag) {
        resultFlag = false;
    }
    
    const op = e.currentTarget.textContent;
    
    if(operand1 !== ''){
        operator = op;
        }
    });
});

//On click a decimal is appended to the operand if one is not already. Only one decimal point is allowed.
decimalButton.addEventListener('click', () => {
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
})

//On click reset the values of every global variable to nothing.
clearButton.addEventListener('click', () => {
    operand1 = '';
    operator = '';
    operand2 = '';
    displayValue = '';
    display.value = displayValue;
});

//Calculates the result depending on which operator is selected. The result is rounded and
//then becomes operand1 so the result can be operated on. The resultFlag becomes true to
//ensure that pressing a number will start a new calculation instead of just appending to the result.
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

equalButton.addEventListener('click',calculate);

