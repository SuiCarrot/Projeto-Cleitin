var prompt = require('prompt-sync')();

//FUNÇÃO PARA RETARDAR A CPU
function sleep(segundos = 1) {
    segundos = segundos * 1000;
    let start = new Date().getTime();
    for (let i = 0; i < 1e7; i++) {
        if (new Date().getTime() - start > segundos) {
            break;
        }
    }
}

//FUNÇÃO PARA RANDOMIZAR
function random(minimo = 0, maximo) {
    let max = Math.floor(maximo);
    let min = Math.ceil(minimo);
    let random = Math.random() * (max - min + 1) + min;
    random = parseInt(random);
    return random;
}

//FUNÇÃO PARA CRIAR MONSTRO
function clearMonstro() {
    monstros.splice(0, monstros.length);
}
function criarMonstro(qtd, a, b) {
    clearMonstro();
    const listNomeMonstro = [
        'Bahamut',
        'Gárgula',
        'Besta-fera',
        'Demônio Ceifador',
        'Batata Assassina',
        'Assassino da Colher',
    ];

    for (let i = 0; i < qtd; i++) {
        let nomeMonstro = random(a, b);
        let vidaMonstro = random(5, 10);
        let danoMonstro = random(2, 6);

        let monstro = {
            nome: listNomeMonstro[nomeMonstro],
            vida: vidaMonstro,
            dano: danoMonstro,
            id: i,
        };
        monstros.push(monstro);
    }
    return monstros;
}

//FUNÇAÕ COMBATE
function mortalKombat(a) {
    do {
        personagem.vida = personagem.vida - monstros[a].dano + personagem.defesa;
        monstros[a].vida = monstros[a].vida - personagem.dano;
    } while (personagem.vida > 0 && monstros[a].vida > 0);

    if (personagem.vida > 0) {
        return true;
    } else {
        return false;
    }
}

//FUNÇÃO DE PERGUNTAS

const monstros = [];
let play = false;
let resp;
let quebra = true;

//PERSONAGENS
const personagem = {
    vida: 10,
    defesa: 3,
    dano: random(4, 6),
};

const elfo = {
    nome: 'Aerin',
    vida: 10,
    defesa: 5,
    dano: random(4, 6),
};

const armas = {
    machado: function () {
        personagem.dano = personagem.dano + 3;
        personagem.defesa = personagem.defesa - 3;
    },
    espadaEscudo: function () {
        personagem.dano = personagem.dano - 1;
        personagem.defesa = personagem.defesa + 2;
    },
    arco: function () {
        personagem.dano = personagem.dano + 2;
        personagem.defesa = personagem.defesa - 2;
    },
};
//SCRIPT
let a = 0;
do {
    //INICIO DO GAME NA CAVERNA
    console.log(
        ' Personagem acorda sem memórias em uma pequena caverna. Ao analisar os arredores vê um pequeno acampamento montado. Uma fogueira, agora apenas em brasas, com comida, uma mochila e algumas armas espalhadas pelo acampamento.',
    );
    //LAÇO PARA TRAZER OPÇÕES DA CAVERNA
    do {
        //LAÇO PARA SAIR DA CAVERNA
        do {
            console.log(
                'Diga o que quer fazer:\n1) Comida\n2) Abrir Mochila\n3) Pegar uma arma\n4) Sair da caverna ',
            );
            resp = +prompt();
            //LAÇO PARA USUÁRIO ENTREGAR O VALOR CORRETO
            while (isNaN(resp) || resp < 1 || resp > 4) {
                console.log('Valor inserido não corresponde: ');
                resp = +prompt();
            }
            //CONDIÇÃO GAME OVER
            if (resp === 1) {
                console.log('A comida estava envenenada e você morreu');
                quebra = true;
                break;
                //CONDIÇÃO DA MOCHILA, MOMENTO IMPORTANTE DA HISTÓRIA PORÉM NÃO FAZ NADA
            } else if (resp == 2) {
                if (a == 0) {
                    console.log(
                        `Na mochila há algumas roupas e equipamentos básicos de viagem. Junto de um bilhete pedindo para o personagem encontrar na cidade de Erast. Assinado como Aerin. Personagem tomado por memorias de batalha, lembra de seu nome: `,
                    );
                    personagem.nome = prompt(``);
                    a = 1;
                    play = true;
                } else {
                    console.log(
                        `Você abre a mochila novamente, e vê os mesmos itens e um papel com o seu nome: ${personagem.nome}.`,
                    );
                }
                //CONDIÇÃO IPORTANTE DE SELEÇÃO DE ARMAS, MAS AINDA NÃO SAI DA CAVERNA
            } else if (resp == 3) {
                console.log(
                    'Existem 3 armas dispostas:\n1) Espada escudo = + Defesa -Ataque\n2) Machado = ++Ataque -- Defesa\n3) Arco = +Ataque - Defesa',
                );
                play = true;
                resp = +prompt();
                //LAÇO PARA USUÁRIO ENTREGAR O VALOR CORRETO
                while (isNaN(resp) || resp < 1 || resp > 3) {
                    console.log('Valor inserido não corresponde: ');
                    resp = +prompt();
                }
                personagem.defesa = 3;
                personagem.dano = random(6, 4);
                //CONDIÇÃO PARA SELECIONAR ARMAS
                if (resp == 1) {
                    armas.espadaEscudo();
                } else if (resp == 2) {
                    armas.machado();
                } else {
                    armas.arco();
                }
                console.log(personagem.dano)
                console.log(personagem.defesa)
                //CONDIÇÃO PARA SAIR DA CAVERNA
            } else if (resp == 4) {
                console.log('Você saiu da caverna');
                break;
            }
        } while (play);
        play = false;
        //CONDIÇÃO DE GAME OVER
        if (quebra == true) {
            break;
        }
    } while (play);
    //CONDIÇÃO DE GAME OVER
    if (quebra == true) {
        break;
    }

    //SAINDO DA CAVERNA 2 CAMINHOS

    //CIDADE
} while (play);

// //Viagem
// let dias = 5;
// for (i = 0; i < dias; i++) {
//     if (i == 1) {
//     } else if (i == 2) {
//     }
// }

// //cidade
// dias = 2;
// for (i = 0; i < dias; i++) {
//     if (i == 1) {
//         criarMonstro();
//         mortalKombat();
//     } else if (i == 2) {
//     }
// }

// // teste
// while (true) {
//     a = prompt(`Digite Sim:`).toUpperCase().replace(/\s/g, '');
//     console.log(a)
//     if (a === 'SIM') break;
//     else {
//         console.log(`Por favor digite Sim.`);
//     }
// }
