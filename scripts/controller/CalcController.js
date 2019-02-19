class CalcController {

    //currentDate em portugues = Data atual
    //calculator em portugues = calculadora
    //initialize em portugues = iniciaçao

    constructor(){
        this._operation = [];
        this._locale = "pt-BR";
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate;
        this.initialize();
        this.initButtonsEvents();
    }

    initialize(){
        this.setDisplayDateTime();
        //a linha abaixo fica atualizando num intervalo de 1000 milisegundos
        setInterval(() => {
            this.setDisplayDateTime();
        }, 1000);
    }

    //a função abaixo serve para adicionar varios eventos no botao
    addEventListenerAll(element, events, fn){

        events.split(' ').forEach(event =>{

            element.addEventListener(event, fn, false);

        })



    }
    //método para pegar o ultimo operador
    getLastOperation(){
        return this._operation[this._operation.length-1];
    }
    //meotdo para saber se o ultimo digitado é um operador
    //indexOf serve para procurar algo no array, se encontrar ele manda o index
    isOperator(value){
        return (['+','-','*','%','/'].indexOf(value) > -1);
    }

    //método para quando clicar no botao AC, limpa tudo
    clearAll(){
        this._operation = [];
        this.displayCalc = "";
    }
    //método para quando clicar no botao CE, limpa o ultimo valor digitado
    clearEntry(){
        //o pop deleta um valor na ultima posição de um array
        this._operation.pop();
        this.displayCalc = "";
    }

    //metodo para apresentar mensagem de erro, no caso o deafault do switch
    setError(){
        this.displayCalc = "Error";
    }

    setLastOperation(value){
        this._operation[this._operation.length-1] = value;
    }
    
    //metodo push para adicionar o operador na ultima posição do vetor
    pushOperation(value){
        this._operation.push(value); 
        
        if(this._operation.length > 3){
            this.calc();
        }
    }

    //vai atualizando os numeros assim que forem digitados no display
    setLastNumberToDisplay(){
        let lastNumber;

        for (let i = this._operation.length-1; i >= 0; i--){

            if(!this.isOperator(this._operation[i])){
                lastNumber = this._operation[i];
                break;
            }
        }
        this.displayCalc = lastNumber;
    }
    
    addOperation(value){
        if(isNaN(this.getLastOperation())){
            if(this.isOperator(value)){
                //se o anterior for um operador, troca o operador
                this.setLastOperation(value);                         
            }else if(isNaN(value)){
                console.log("outra coisa" + value);
            }else{               
                this.pushOperation(value);
                this.setLastNumberToDisplay(); 
            }
        }else{
            if(this.isOperator(value)){
                //se for um operador adiciona final do vetor
                this.pushOperation(value);      
            }else{
                let newValue = this.getLastOperation().toString() + value.toString();               
                this.setLastOperation(parseInt(newValue));
                this.setLastNumberToDisplay();
            }
        }
        console.log(this._operation);
    }

    //metodo que calcula
    calc(){
        let last = this._operation.pop();
        let result = eval(this._operation.join(""));
        this._operation = [result, last];
        this.setLastNumberToDisplay();
    }

    execBtn(value){
        
        switch (value){
            case "ac":
                this.clearAll();
                break;
            case "ce":
                this.clearEntry();
                break;
            case "soma":
                this.addOperation("+");
                break;
        
            case "porcento":
                this.addOperation("%");
                break;

            case "subtracao":
                this.addOperation("-");
                break;

            case "divisao":
                this.addOperation("/");
                break;

            case "multiplicacao":
                this.addOperation("*");
                break;

            case "igual":
                this.addOperation("=");
                break;
            case "ponto":
                this.addOperation(".");
                break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;
            
            default:
                this.setError();
        }

    }
    //inicia os eventos dos botoes, no caso click e passar o mause em cima vira a maozinha
    initButtonsEvents(){
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        buttons.forEach((btn, index) =>{
            //click drag é quando vc clica e arrasta
            this.addEventListenerAll(btn, 'click drag', e =>{
                //replace serve para substituir, no caso substitui o btn- por nada ""
                let txtBtn = btn.className.baseVal.replace("btn-", "");

                this.execBtn(txtBtn);

            });

            //troca o cursor para a mãozinha
            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e =>{
                btn.style.cursor = "pointer";

            });            
        })
    }

    

    setDisplayDateTime(){
        this.displayDate = this.currentDate.toLocaleDateString(this._locale , {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }
    //métodos getters e setters

    //data
    get displayDate(){
        return this._dateEl.innerHTML;

    }

    set displayDate(value){
        this._dateEl.innerHTML = value;

    }

    //hora
    get displayTime(){
        return this._timeEl.innerHTML;

    }

    set displayTime(value){
        this._timeEl.innerHTML = value;

    }
    //numeros do display
    get displayCalc(){

        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value){
        this._displayCalcEl.innerHTML = value;
    }

    get currentDate(){
        return new Date();
    }

    set currentDate(value){
        this._currentDate = value;
    }

}