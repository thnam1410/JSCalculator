class Calculator{
    constructor (previousOperandTextElement,currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
        this.result = 0;
        this.temp=0;
        this.isAddNumberFlag = false;
        this.isEqualsFlag = false;
    }
    clear(){
        this.previous = [];
        this.current = [];
        this.operation = undefined;
        this.result=0;
        this.temp=0;
    }
    delete(){

    }
    appendNumber(number){
        this.isAddNumberFlag = true;
        if(number === "." && this.current.includes("."))  return;
        if(this.temp == 1){
            this.current = [];
            this.temp = 0;
            this.current.push(number);
        }else{
            this.current.push(number);
        }

    }
    chooseOperation(operation){
        let operad = ["+","-","*","/"];
        let check = this.previous[this.previous.length-1];
        if(operad.includes(check) && this.isAddNumberFlag == false) return;
        if(this.previous.length < 2 && this.isEqualsFlag == false){
            this.previous.push(this.current.join(""),operation);
            this.temp=1;      
        }else{
            if(!operad.includes(this.previous[this.previous.length-1])){
                this.previous.push(operation);
                this.temp=1;
            }else{
                this.previous.push(this.current.join(""),operation);
                this.compute(operation);
                this.temp=1;
            }
            this.isAddNumberFlag = false;
            this.isEqualsFlag = false;
        }
    }
    compute(operation){
        let computation = parseFloat(this.previous[0]);
        for(let i = 1; i<this.previous.length-1;i++){
            switch(this.previous[i]){
                case "+":
                    computation+=parseFloat(this.previous[i+1]);
                    i++;
                    break;
                case "-":
                    computation-=parseFloat(this.previous[i+1]);
                    i++;
                    break;
                case "*":
                    computation*=parseFloat(this.previous[i+1]);
                    i++;
                    break;
                case "/":
                    computation/=parseFloat(this.previous[i+1]);
                    if(this.previous[i+1] == 0){      
                        alert("Can not divide to zero");
                        this.clear();
                        computation = "";
                        break;
                    }
                    i++;
                    break;
                default:
                    break;
            }
        }
        this.current = [computation];
    }
    equals(){
        if(!isNaN(parseFloat(this.previous[this.previous.length-1])))return;
        if(this.previous.length<1){
            this.previous = [this.current.join("")];
            this.temp=1;
            this.isEqualsFlag = true;
        }else{
            this.previous.push(this.current.join(""));
            let operation = this.previous[this.previous.length-1];
            this.compute(operation);
            this.temp=1;
            console.log(this.previous);
        }
    }
    updateDisplay(){
        this.currentOperandTextElement.innerText = this.current.join("");
        this.previousOperandTextElement.innerText = this.previous.join("");
    }
}
const previousOperandTextElement = document.querySelector('.previous');
const currentOperandTextElement = document.querySelector('.current');

const allClear = document.querySelector('.clear');
const btnDelete = document.querySelector('.delete');
const operation = document.querySelectorAll('.operation');
const number = document.querySelectorAll('.number');
const equals = document .querySelector('.equals');

const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement);
number.forEach(button => {
    button.addEventListener('click',()=>{
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});
operation.forEach(button => {
    button.addEventListener('click',()=>{
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});
allClear.addEventListener('click',()=>{
    calculator.clear();
    calculator.updateDisplay();
});
equals.addEventListener('click',()=>{
    calculator.equals();
    calculator.updateDisplay();
});
btnDelete.addEventListener('click',()=>{
    calculator.delete();
    calculator.updateDisplay();
});