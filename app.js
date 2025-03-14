//Selecionar os elementos do DOM
const tabuleiro = document.querySelector("#gameboard");
const informacaoDisplay = document.querySelector("#info");

//Array com 9 espaços vazios
const celulasJogo = [
    "", "", "", "", "", "", "", "", ""
]

//Define quem joga primeiro
let go = "circulo";
informacaoDisplay.textContent = "Círculo joga primeiro";

//Função para criar o tabuleiro
function criarTabuleiro() {
    celulasJogo.forEach((_cell, index) => {    
        const elementoCelula = document.createElement('div'); //criar div
        elementoCelula.classList.add('square'); //pegar o estilo css (para cada quadrado do tabuleiro)
        elementoCelula.id = index;
        elementoCelula.addEventListener('click', addJogadas); //ao clicar vai chamar a função
        tabuleiro.append(elementoCelula); //insere a celula dentro da div
    }) 
}

criarTabuleiro();


function addJogadas (clique) {    //Essa função é chamada quando o jogador clica em uma celula do tabuleiro
    const simboloJogador = document.createElement('div');  //Cria uma div que será inserida na celula que foi criada
    simboloJogador.classList.add(go);     //Deixa com o estilo css
    clique.target.append(simboloJogador);   //Circulo ou X aparecem no lugar clicado
    go = go === "circulo" ? "jogadorX" : "circulo";
    informacaoDisplay.textContent = "Agora é vez do " + go + ".";
    clique.target.removeEventListener('click', addJogadas);  //remove o evento de clique da célula, não deixa o jogador clicar mais de uma vez
     
    checarResultado();
}

function checarResultado() {
    const allSquares = document.querySelectorAll(".square");
    const combinacoesVencedoras = [
        [0,1,2], [3,4,5], [6,7,8],   //linhas
        [0,3,6], [1,4,7], [2,5,8],   //colunas
        [0,4,8], [2,4,6]             //diagonais
    ]

    combinacoesVencedoras.forEach(array => {     //percorre cada combinação vencedora possivel
        const circuloVencedor = array.every(cell =>   
            allSquares[cell].firstChild?.classList.contains('circulo'));  //verifica se as 3 celulas tem o mesmo simbolo

        if (circuloVencedor) {
            informacaoDisplay.textContent = "Jogador Círculo Venceu!";
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
            return;
        }
    })

    combinacoesVencedoras.forEach(array => {
        const xVencedor = array.every(cell => 
            allSquares[cell].firstChild?.classList.contains('jogadorX'));

        if (xVencedor) {
            informacaoDisplay.textContent = "Jogador X Venceu!";
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
            return;
        }
    })

}

const restartButton = document.querySelector("#restartButton");
restartButton.addEventListener("click", jogarNovamente);

function jogarNovamente() {
    //Reiniciar as variáveis do jogo
    celulasJogo.fill(""); 
    go = "circulo";
    informacaoDisplay.textContent = "Círculo joga primeiro";

    // Remover todas as marcações do tabuleiro
    const allSquares = document.querySelectorAll(".square");
    allSquares.forEach(square => {
        square.innerHTML = "";
        square.addEventListener('click', addJogadas); //reativa o evento do click
    });
}


