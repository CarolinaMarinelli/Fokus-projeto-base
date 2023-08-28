const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botao = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const input = document.querySelector('.toggle-checkbox');
const musica = new Audio('/sons/luna-rise-part-one.mp3'); //instanciou para pegar a musica criando um obj
const pause = new Audio('/sons/pause.mp3');
const play = new Audio('/sons/play.wav');
const beep = new Audio('/sons/beep.mp3');
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const alterarImagem = document.querySelector('.app__card-primary-butto-icon')
const tempoNaTela = document.querySelector('#timer')
musica.loop = true; // para a musica ficar rodando o tempo inteiro

let tempoDecorridoeEmSegundos = 1500;
let IntervaloId = null; 

input.addEventListener('change', () => { //usado para adiconar a musica com função anonima 
  if (musica.paused) {
    musica.play()
  } else {
    musica.pause()
  }
})

focoBt.addEventListener('click', () => {
  tempoDecorridoeEmSegundos = 1500
  alterarContexto('foco')
  focoBt.classList.add('active')
});

curtoBt.addEventListener('click', () => {
  tempoDecorridoeEmSegundos = 300
  alterarContexto('descanso-curto')
  curtoBt.classList.add('active')
  
});

longoBt.addEventListener('click', () => {
  tempoDecorridoeEmSegundos = 900
  alterarContexto('descanso-longo')
  longoBt.classList.add('active')
});

function alterarContexto(contexto) {
   mostrarTempo()
    botao.forEach(function (contexto) { //executa uma dada função em cada elemento de um array.
    contexto.classList.remove('active')
  })

  html.setAttribute('data-contexto', contexto)
  banner.setAttribute('src', `/imagens/${contexto}.png`)

  switch (contexto) {
    case "foco":
      titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`

      break;

    case "descanso-curto":
      titulo.innerHTML = `
      Que tal dar uma respirada? <br>
      <strong class="app__title-strong">Faça uma pausa curta</strong>`

      break;

    case "descanso-longo":
      titulo.innerHTML = `Hora de voltar à superfície.<br>
      <strong class="app__title-strong">Faça uma pausa longa.</strong>`

      break;

    default:
      break;

  }
};

const contagemRegressiva = () => {
  if(tempoDecorridoeEmSegundos <= 0) {
    beep.play()
    Zerar()
    return
  }
  tempoDecorridoeEmSegundos -= 1;  
  mostrarTempo()
}

startPauseBt.addEventListener("click", IniciarOuPausar); 

function IniciarOuPausar() { //para pausar o temporizador
  if(IntervaloId) {
    pause.play()
      Zerar()
      return
    }
    play.play()
    IntervaloId = setInterval(contagemRegressiva, 1000) 
    iniciarOuPausarBt.textContent = "Pausar"
    alterarImagem.setAttribute('src', `/imagens/pause.png`)
 
}

function Zerar() { 
  clearInterval(IntervaloId) //ele vai limpar o temporizador
  iniciarOuPausarBt.textContent = "Começar"
  IntervaloId = null;
  alterarImagem.setAttribute('src', `/imagens/play_arrow.png`)
}

function mostrarTempo() {
  const tempo = new Date(tempoDecorridoeEmSegundos * 1000)
  const tempoFormado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second:'2-digit'})
  tempoNaTela.innerHTML = `${tempoFormado}`
}

mostrarTempo() // para o temporizador ficar fixo na tela




// focoBt.addEventListener('click', () => { //para adicionar o evento de click e passar uma arrow function
//     html.setAttribute('data-contexto', 'foco') // setando o atributo para alterar, coloca dois parametros (qual elemento quer alterar? e o que quer inserir )
//     banner.setAttribute('src', '/imagens/foco.png') //setou para alterar a imagem
// });



