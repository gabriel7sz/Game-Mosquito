/*
    Primeiro precisamos setar a altura e largura da página para que os
    mosquitos (que são elementos html) não corram o risco de randomicamente
    nascer em algum lugar que o usuário não veja.
*/

var height
var width
var vidas = 1
var tempo = 15
var criaMosquitoTempo = 1500

//metodo search para recuperar o que esta apenas na direita do caractere ancora
var nivel = window.location.search
//tirando o caractere de interrogação e substituindo po caractere vazio
nivel = nivel.replace('?', '')
if(nivel === 'normal') {
    //1500
    criaMosquitoTempo = 1500
} else if(nivel === 'dificil') {
    //1000
    criaMosquitoTempo = 1000
} else if (nivel === 'chucknorris') {
    //750
    criaMosquitoTempo = 750
}

function ajustaTamanhoPalcoJogo() {

     height = window.innerHeight
     width = window.innerWidth
     console.log(width, height)

}

ajustaTamanhoPalcoJogo()

var cronometro = setInterval(function() {
    tempo = tempo - 1
    if (tempo < 0) {
        clearInterval(cronometro)
        clearInterval(criaMosquito)
        window.location.href = 'vitoria.html'
    } else {
        document.getElementById('cronometro').innerHTML = tempo
    }
} ,1000)

/*
    Criando posições randômicas

    Para fazer a criação de valores randômicos, pode-se utilizar a biblioteca math e o método random() . 

    Como o método random cria valores aleatórios entre 0 e 1, precisa-se multiplicar pela atura e largura
    da aplicação que está sendo capturada através da função ajustaTamanhoPalcoJogo() na propriedade onresize
    no body HTML.

    O método floor() foi passado para arredondar para baixo os resultados aeátorios, a fim de que não será 
    necessário as casas decimais para a aplicação.

    Foi diminuido em seguida -90, caso a imagem do mosquito, que tem 50px, chegasse muito a beirada do limite,
    a imagem não saíria de esquadro fazendo com que a a scrolBar crescesse sozinha.

    E em seguida as condicionais criadas para evitar vaores negativos, fazendo com que o mosquito não aparecece
    na apicação do usuário.


*/ 
function posicaoRandomica() {

    //remover o mosquito anterior (caso exista)
    if (document.getElementById('mosquito')) {
        document.getElementById('mosquito').remove()
        //selecionando as vidas e mudando para coraçao vazio
        // console.log('elemento selecionado foi: ' + 'v' + vidas)
        if (vidas > 3) {
            window.location.href = 'fim_de_jogo.html'
        } else {
            document.getElementById('v' + vidas).src = 'imagens/imagens/coracao_vazio.png'
            vidas ++
        }
    }

    var posicaoX = Math.floor(Math.random() * width) - 90
    var posicaoY = Math.floor(Math.random() * height) - 90

    if (posicaoX < 0 ) {
        posicaoX = 0
    } else {
        posicaoX = posicaoX
    }

    if (posicaoY < 0 ) {
        posicaoY = 0
    } else {
        posicaoY = posicaoY
    }

    console.log(posicaoX, posicaoY)

    /*
        Criar elemento HTML de forma dinâmica com JS
    */ 

    var mosquito = document.createElement('img')
    mosquito.src = 'imagens/imagens/mosquito.png'
    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio()
    mosquito.style.left = posicaoX + 'px'
    mosquito.style.top = posicaoY + 'px'
    mosquito.style.position = 'absolute'
    mosquito.id = 'mosquito'
    mosquito.onclick = function() {
         //this faz referencia ao proprio elemento HTML que executa a função
        this.remove()                  
    }

    document.body.appendChild(mosquito)
} 

/*
    Criando randomicamente tamanhos diferentes.

*/ 

function tamanhoAleatorio() {

    var classe = Math.floor(Math.random() * 3)
    console.log(classe)

    switch(classe) {
        case 0:
            return 'mosquito1'

        case 1:
            return 'mosquito2'

        case 2:
            return 'mosquito3'
    }
}
    // Criando lado aleatório
function ladoAleatorio() {
    var classe = Math.floor(Math.random() * 2)
    switch(classe) {
        case 0:
            return 'ladoA'
        case 1:
            return 'ladoB'
    }
}