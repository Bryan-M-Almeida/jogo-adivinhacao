/* Vida */
const vida = document.querySelector(".vida");
vida.innerHTML = 100;

/* pergunta */
const questao = document.querySelector(".pergunta");

/* respostas */
const respostas = document.querySelectorAll(".resposta");

/* pontuação */
const pontos = document.querySelector(".pontos");

/* acertos */
const certos = document.querySelector(".acertos");

/* erros */
const erro = document.querySelector(".erros")
/* questão */
let questaoIndex = Math.floor(Math.random()*35);


fetch('jogo.json')
    .then(response => response.json())
    .then(data => {
        carregarQuestao(questaoIndex, data);

        respostas.forEach(botao => {
            botao.addEventListener("click", function () {

                const clicado = this.innerText;
                const respostaCorreta = data.questoes[questaoIndex].resposta;

                if (vida.innerHTML > 0) {
                    if (clicado === respostaCorreta) {
                        this.classList.add("certa");

                        /* pontuação */
                        let score = Math.floor(Math.random() * 10)
                        let pontoAtual = parseInt(pontos.innerHTML);
                        pontoAtual += score;
                        pontos.innerHTML = pontoAtual;

                        /* vida */
                        let vidaAtual = parseInt(vida.innerHTML);

                        /* acertos */
                        let acertos = 0;
                        let acertosAtuais = parseInt(certos.innerHTML);
                        acertosAtuais += 1;
                        certos.innerHTML = acertosAtuais;


                        if (vidaAtual > 0 && vidaAtual < 66) {

                            /* vida */
                            vidaAtual += 25;
                            vida.innerHTML = vidaAtual;
                        }

                        respostas.forEach(btn => {
                            btn.disabled = true;
                        });
                        questaoIndex++;
                        setTimeout(() => carregarQuestao(questaoIndex, data), 1000);
                    }


                    else {
                        let erros = 0;
                        let errosAtuais = parseInt(erro.innerHTML);
                        errosAtuais += 1;
                        erro.innerHTML = errosAtuais;
                        this.classList.add("errada");
                        this.disabled = true;
                        let vidaAtual = parseInt(vida.innerHTML);
                        vidaAtual -= 35;
                        vida.innerHTML = vidaAtual > 0 ? vidaAtual : 0;
                    }
                }
            });
        });
    });

function carregarQuestao(index, data) {
    if (index > 34) {
        index -= 34;
    } else if  (index < 0) {
        index+=34;
    }
    questao.innerHTML = data.questoes[index].pergunta;
    respostas.forEach((element, i) => {
        element.innerHTML = data.questoes[index].alternativas[i];
        element.classList.remove("certa", "errada");
        element.disabled = false;
    });
}


setInterval(() => {
    document.querySelector('.vida').style.width = vida.innerHTML + "%";
}, 0);