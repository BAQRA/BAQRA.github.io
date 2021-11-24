class Calculator{
    constructor(previousOperationText, courentOperationText){
        this.previousOperationText = previousOperationText;
        this.courentOperationText = courentOperationText;
        this.clear();
    }

    clear(){
        console.log('cleared');
        this.courentOperation = '';
        this.previousOperation = '';
        this.operation = undefined;
    }

    delete(){
        this.courentOperation = this.courentOperation.toString().slice(0,-1)
    }

    appendNumber(number){
        if (number === '.' && this.courentOperation.includes('.')) return
        this.courentOperation = this.courentOperation.toString() + number.toString();
    }

    chooseOperation(operation){
        if(this.courentOperation === '') return
        if(this.previousOperation !== ''){
            this.compute()
        }
        this.operation = operation
        this.previousOperation = this.courentOperation
        this.courentOperation = ''
    }

    compute(){
        let computation
        const prev = parseFloat(this.previousOperation)
        const cour = parseFloat(this.courentOperation)
        if(isNaN(prev) || isNaN(cour)) return
        switch (this.operation){
            case '+': 
                computation = prev + cour
                break
            case '-': 
                computation = prev - cour   
                break
            case '*': 
                computation = prev * cour
                break
            case '÷': 
                computation = prev / cour
                break       
            default:
                return         
        }
        this.courentOperation = computation
        this.operation = undefined
        this. previousOperation = ''
    }

    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if(isNaN(integerDigits)) {
            integerDisplay = ''
        }else{
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        }else{
            return integerDisplay
        }
    }

    updateDisplay(){
        this.courentOperationText.innerText = this.getDisplayNumber(this.courentOperation)
        if(this.operation != null){
            this.previousOperationText.innerText = `${this.getDisplayNumber(this.previousOperation)} ${this.operation}`
        }else{
            this.previousOperationText.innerText = ''
        }
    }

}


const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const delButton = document.querySelector('[data-del]');
const acButton = document.querySelector('[data-ac]');
const previousOperationText = document.querySelector('[data-previous-operation]');
const courentOperationText = document.querySelector('[data-courent-operation]');

const calculator = new Calculator(previousOperationText, courentOperationText);
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})

acButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

delButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})