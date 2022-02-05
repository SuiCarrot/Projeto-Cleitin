
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

// FUNÇÃO PARA CRIAR MONSTRO
function criarMonstro(qtd, a, b) {
    const listNomeMonstro = [
        'Bahamut',
        'Gárgula',
        'Besta-fera',
        'Demônio Ceifador',
        'Batata Assassina',
        'Assassino da Colher',
    ];

    for (let i = 0; i < qtd; i++) {
        let nomeMonstro = random(b, a);
        let vidaMonstro = random(10, 5);
        let danoMonstro = random(6, 2);

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
function clearMonstro() {
    monstros.splice(0, monstros.length);
}
//FUNÇAÕ COMBATE
function mortalKombat(a) {
    do {
        personagem.vida = personagem.vida - monstros[a].dano + personagem.defesa;
        monstros[a].vida = monstros[a].vida - personagem.dano;
    } while (personagem.vida > 0 && monstros[a].vida > 0);
}

const monstros = [];

// PERSONAGENS
const personagem = {
    nome: '',
    vida: 10,
    defesa: 3,
    dano: random(6, 4),
};

const elfo = {
    nome: 'Aerin',
    vida: 10,
    defesa: 5,
    dano: random(6, 4),
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

criarMonstro(2, 0, 2);
criarMonstro(2, 3, 5);
console.log(monstros);

//Viagem
let dias = 5;
for (i = 0; i < dias; i++) {
    if (i == 1) {
    } else if (i == 2) {
    }
}

//cidade
dias = 2;
for (i = 0; i < dias; i++) {
    if (i == 1) {
        criarMonstro();
        mortalKombat();
    } else if (i == 2) {
    }
}

//teste

while (true) {
    a = prompt(`sdijaidsaijdiaj:`).toUpperCase().replace(' ', '')
    if (a != 'nsains') break;
    else {
        console.log(`Por favor sresopsdinasd com batata.`)
    }
}


