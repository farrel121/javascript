class CalcController {

    //currentDate em portugues = Data atual
    //calculator em portugues = calculadora
    //initialize em portugues = iniciaçao

    constructor(){
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

    initButtonsEvents(){
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        buttons.forEach((btn, index) =>{

            btn.addEventListener('click', e =>{
                //replace serve para substituir, no caso substitui o btn- por nada ""
                console.log(btn.className.baseVal.replace("btn-", ""));
            })
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