class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        /* Initialise the current abd prev operand */
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {

    }
    
    appendNumber(number) {
        /* Period limited to one occurence */
        if(number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand += number;
    }

    chooseOperation(operation) {
        if(this.currentOperand === '') return; /* Ignore operation if no display. */
        if(this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        // Convert prev and current operand values to floats
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        // Stop func if curr or prev operand is not a numeric value.
        if (isNaN(prev) || isNaN(current)) return; 
        switch (this.operation) {
            case '+':
                computation = prev + current; 
                break;
            case '-':
                computation = prev - current; 
                break;
            case '*':
            computation = prev * current; 
                break;
            case '÷':
                computation = prev / current; 
                break;
            default:
                return;
        };
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';       
    };

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand;
        this.previousOperandTextElement.innerText = this.previousOperand; 
    }
}


// Declare all button elements
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText); // .innerText refers to the text of the button iteself.
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText); // .innerText refers to the text of the button iteself.
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})