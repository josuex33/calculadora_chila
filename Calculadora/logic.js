const botonNumero = document.querySelectorAll('[data-numero]')
const botonOperador = document.querySelectorAll('[data-operador]')
const botonIgual = document.querySelector('[data-igual]')
const botonBorrartodo = document.querySelector('[data-borrar-todo]')
const botonBorra = document.querySelector('[data-borra]')
const textoValorSuperior = document.querySelector('[data-valor-superior]')
const textoValorInferior = document.querySelector('[data-valor-inferior]')

class Calculadora {
    constructor(textoValorInferior,textoValorSuperior){
        this.textoValorInferior = textoValorInferior
        this.textoValorSuperior = textoValorSuperior
        this.valorInferior = ''
        this.valorSuperior = ''
        this.operador = undefined
    }

    agregarNumero(numero){
        this.valorInferior = this.valorInferior + numero
    }
    imprimirDisplay(){
        this.textoValorInferior.innerText = this.valorInferior
        this.textoValorSuperior.innerText = this.valorSuperior
    }

    borra (){
        this.valorInferior = this.valorInferior.slice(0,-1)
    }

    elegirOperacion(operador){
        if(this.valorInferior == '')return
        if(this.valorSuperior != ''){
            this.realizarCalculo()
        }
        this.operador = operador
        this.valorSuperior = this.valorInferior
        this.valorInferior = ''
    }

    realizarCalculo(){//el valor de parse float transforma las cadenas de texto de los botones a variables flotantes para java los reconosca
        let resultado
        let conversionValorSuperior = parseFloat(this.valorSuperior)
        let conversionValorInferior = parseFloat(this.valorInferior)

        switch(this.operador){
            case '+':
                resultado = conversionValorSuperior + conversionValorInferior
                break
            case '-':
                resultado = conversionValorSuperior - conversionValorInferior
                break
            case '*':
                resultado = conversionValorSuperior * conversionValorInferior
                break
            case '/':
                resultado = conversionValorSuperior / conversionValorInferior
                break
                default: return
        }
        this.valorInferior = resultado
        this.operador = undefined
        this.valorSuperior = ''
    }

    limpiarPantalla(){
        this.valorInferior = ''
        this.valorSuperior = ''
        this.operador = undefined
    }
}

const calculadora = new Calculadora(textoValorInferior,textoValorSuperior)

botonNumero.forEach(boton => {
    boton.addEventListener('click', () => {
        calculadora.agregarNumero(boton.innerText)
        calculadora.imprimirDisplay()
    })
})

botonBorra.addEventListener('click', () => {
    calculadora.borra()
    calculadora.imprimirDisplay()
})

botonOperador.forEach(boton => {
    boton.addEventListener('click', () => {
        calculadora.elegirOperacion(boton.innerText)
        calculadora.imprimirDisplay()
    })
})

botonIgual.addEventListener('click', () => {
    calculadora.realizarCalculo()
    calculadora.imprimirDisplay()
})

botonBorrartodo.addEventListener('click', () => {
    calculadora.limpiarPantalla()
    calculadora.imprimirDisplay()
})