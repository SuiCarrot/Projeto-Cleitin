/** @format **/

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
function random(maximo, minimo = 0) {
    let max = Math.floor(maximo);
    let min = Math.ceil(minimo);
    let random = Math.random() * (max - min + 1) + min;
    random = parseInt(random);
    return random;
}


function criarMonstro(qtd) {
    const listMonstros = [];
    const listNomeMonstro = ['Monstro Elfo', 'Monstro Guerreiro', 'Monstro Arqueiro'];
    // clearMonstro();
    for (let i = 0; i < qtd; i++) {
        let nomeMonstro = random(listNomeMonstro.length - 1, 0);
        let vidaMonstro = random(100, 20);
        let danoMonstro = random(15, 5);

        let monstro = {
            nome: listNomeMonstro[nomeMonstro],
            vida: vidaMonstro,
            dano: danoMonstro,
            id: i,
        };
        listMonstros.push(monstro);
    }
    return listMonstros
}
function clearMonstro() {
    listMonstros.splice(0, listMonstros.length);
}

module.exports = {
    random,
    sleep,
    criarMonstro,
    clearMonstro,
};
