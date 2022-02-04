/** @format **/

console.clear();
console.log();
console.log('-----------------------------------------------------');

var prompt = require('prompt-sync')();

// FUNÇÃO PARA RETARDAR A CPU
function sleep(segundos = 1) {
    segundos = segundos * 1000;
    let start = new Date().getTime();
    for (let i = 0; i < 1e7; i++) {
        if (new Date().getTime() - start > segundos) {
            break;
        }
    }
}

// FUNÇÃO PARA RANDOMIZAR
function random(a, b = 0) {
    let max = Math.floor(a);
    let min = Math.ceil(b);
    let random = Math.random() * (max - min + 1) + min;
    random = parseInt(random);
    return random;
}

// PERSONAGEM E MONSTROS
const personagem = {
    nome: '',
    vida: '',
    defesa: '',
    dano: '',
};

const listMonstros = [];
const listNomeMonstro = ['monst1', 'monst2', 'monst3'];
function criarMonstro(num) {
    // clearMonstro()
    for (let i = 0; i < num; i++) {
        let nomeMonstro = random(listNomeMonstro.length - 1, 0);
        let vidaMonstro = random(500, 50);
        let danoMonstro = random(15, 5);

        let monstro = {
            nome: listNomeMonstro[nomeMonstro],
            vida: vidaMonstro,
            dano: danoMonstro,
        };
        listMonstros.push(monstro);
    }
}
function clearMonstro (){
    listMonstros.splice(0,listMonstros.length);
}

console.log('-----------------------------------------------------');
