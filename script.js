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
function random(a,b=0) {
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
    dano: ''
}
const monstros = []
function funMonstros (){
    

}



console.log('-----------------------------------------------------');