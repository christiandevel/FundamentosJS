
const BTN_EMPEZAR = document.getElementById('btnEmpezar')

const BTN_CELESTE = document.getElementById('celeste')
const BTN_VIOLETA = document.getElementById('violeta')
const BTN_NARANJA = document.getElementById('naranja')
const BTN_VERDE = document.getElementById('verde')

const ULTIMO_NIVEL = 10

// swal("Hello world!");

class Juego {
  constructor(){
    this.inicializar()
    this.gerarSecuencia()
    this.siguienteNivel()
  }
  
  inicializar(){
    this.siguienteNivel = this.siguienteNivel.bind(this)
    this.elegirColor = this.elegirColor.bind(this)
    this.toggleBtnEmpezar()
    this.nivel = 1
    this.colores = {
      celeste: BTN_CELESTE,
      violeta: BTN_VIOLETA,
      verde: BTN_VERDE,
      naranja: BTN_NARANJA
    }
  }
  
  toggleBtnEmpezar(){
    if(BTN_EMPEZAR.classList.contains('hide')){
      BTN_EMPEZAR.classList.remove('hide')
    }else{
      BTN_EMPEZAR.classList.add('hide')
    }
  }

  gerarSecuencia() {
    this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n =>   Math.floor(Math.random() * 4))
  }

  siguienteNivel(){
    this.subnivel = 0
    this.iluminarSecuencia()
    this.agregarEventoClick()
  }

  transformarNumeroAColor(numero){
    switch (numero){
      case 0:
        return 'celeste'
      case 1:
        return 'violeta'
      case 2:
        return 'verde'
      case 3:
        return 'naranja'
    }
  }

  transformarColorANumero(color){
    switch (color){
      case 'celeste':
        return 0
      case 'violeta':
        return 1
      case 'verde':
        return 2
      case 'naranja':
        return 3
    }
  }

  iluminarSecuencia() {
    for(let i = 0; i < this.nivel; i++){
      const  color = this.transformarNumeroAColor(this.secuencia[i])
      setTimeout(() => this.iluminarColor(color), 1000 * i) 
    }
  }

  iluminarColor(color){
    this.colores[color].classList.add('light')
    setTimeout(() => this.apagarColor(color), 350)
  }

  apagarColor(color){
    this.colores[color].classList.remove('light')
  }

  agregarEventoClick(){
    this.colores.celeste.addEventListener('click', this.elegirColor)
    this.colores.verde.addEventListener('click', this.elegirColor)
    this.colores.violeta.addEventListener('click', this.elegirColor)
    this.colores.naranja.addEventListener('click', this.elegirColor)
  }

  eliminarEventosClick(){
    this.colores.celeste.removeEventListener('click', this.elegirColor)
    this.colores.verde.removeEventListener('click', this.elegirColor)
    this.colores.violeta.removeEventListener('click', this.elegirColor)
    this.colores.naranja.removeEventListener('click', this.elegirColor)
  }

  elegirColor(ev) {
    // console.log(this)
    const nombreColor = ev.target.dataset.color
    const numeroColor = this.transformarColorANumero(nombreColor)
    this.iluminarColor(nombreColor)
    if(numeroColor === this.secuencia[this.subnivel]){
      this.subnivel++
      if(this.subnivel === this.nivel){
        this.nivel++
        this.eliminarEventosClick()
        if(this.nivel === (ULTIMO_NIVEL + 1)){
          this.ganoElJuego()
        }else{
          setTimeout(this.siguienteNivel, 1500)
        }
      }
    }else{
      this.perdioElJuego()
    }
  }

  ganoElJuego() {
    swal('Platzi', "Ganaste Wuacho Ganaste", 'success')
      .then(this.inicializar.bind(this))
  }

  perdioElJuego() {
    swal('Platzi', "Que paso amigo :( ", 'error')
      .then(() => {
        this.eliminarEventosClick()
        this.inicializar()
      })
  }
}

function empezarJuego() {
  var juego = new Juego()
}