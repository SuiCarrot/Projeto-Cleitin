var prompt = require("prompt-sync")();

//////////////////////////////////////////////DECLARAÇÃO DAS FUNÇÕES
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
function random(minimo = 0, maximo) {
  let max = Math.floor(maximo);
  let min = Math.ceil(minimo);
  let random = Math.random() * (max - min + 1) + min;
  random = parseInt(random);
  return random;
}

//FUNÇÃO DE VALIDAÇÃO DE STRINGS
function validacaoString(resposta, a, b, c, d) {
  //Função de validação para prompt numérico
  while (true) {
    if (resposta == a || resposta == b || resposta == c || resposta == d) break;
    else {
      console.log(`Escolha uma das opçòes: `);
      resposta = prompt(``).toUpperCase().replace(/\s/g, "");
    }
  }
  return (resp = resposta);
}

// FUNÇÃO PARA CRIAR MONSTRO
function clearMonstro() {
  monstros.splice(0);
}
function criarMonstro(qtd, a, b) {
  clearMonstro();
  const listNomeMonstro = [
    "Bahamut",
    "Gárgula",
    "Besta-fera",
    "Demônio Ceifador",
    "Batata Assassina",
    "Assassino da Colher",
  ];

  for (let i = 0; i < qtd; i++) {
    let nomeMonstro = random(a, b);
    let vidaMonstro = random(5, 10);
    let danoMonstro = random(2, 4);

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

//FUNÇÃO COMBATE
function mortalKombat(a) {
  do {
    personagens.jogador.vida =
      personagens.jogador.vida - monstros[a].dano + personagens.jogador.defesa;
    monstros[a].vida = monstros[a].vida - personagens.jogador.dano;
  } while (personagens.jogador.vida > 0 && monstros[a].vida > 0);

  if (personagens.jogador.vida > 0) {
    return true;
  } else {
    return false;
  }
}

//////////////////////////////////////////////DECLARAÇÃO DE VARIAVEIS E OBJETOS
//ARRAY DE MONSTROS PARA SER USADO NA FUNÇÃO CRIARMONSTRO
const monstros = [];

// PERSONAGENS
const personagens = {
  jogador: {
    vida: 10,
    defesa: 3,
    dano: random(4, 6),
  },
  aerin: {
    nome: `Aerin`,
    vida: 10,
    defesa: 3,
    dano: random(4, 6),
  },
};

const equipamentos = {
  machado: function () {
    personagens.jogador.dano += 3;
    personagens.jogador.defesa -= 3;
  },
  espadaEscudo: function () {
    personagens.jogador.dano -= 1;
    personagens.jogador.defesa += 2;
  },
  arco: function () {
    personagens.jogador.dano += 2;
    personagens.jogador.defesa -= 2;
  },
};

let play = true;
let resp;
let quebra = false;
a = 0;

//SCRIPT
do {
  //jogar novamente
  //INICIO DO GAME NA CAVERNA
  console.log(
    " Personagem acorda sem memórias em uma pequena caverna. Ao analisar os arredores vê um pequeno acampamento montado. Uma fogueira, agora apenas em brasas, com comida, uma mochila e algumas equipamentos espalhadas pelo acampamento."
  );
  //LAÇO PARA TRAZER OPÇÕES DA CAVERNA
  do {
    //personagem na caverna
    console.log(
      "Diga o que quer fazer: \nComida \nAbrir Mochila\nPegar uma arma\nSair da caverna "
    );
    resp = prompt().toUpperCase().replace(/\s/g, "");
    validacaoString(
      resp,
      "COMIDA",
      "ABRIRMOCHILA",
      "PEGARUMAARMA",
      "SAIRDACAVERNA"
    );
    //CONDIÇÃO GAME OVER
    if (resp === "COMIDA") {
      console.log("A comida estava envenenada e você morreu");
      quebra = true;
      break;
      //CONDIÇÃO DA MOCHILA, MOMENTO IMPORTANTE DA HISTÓRIA PORÉM NÃO FAZ NADA
    } else if (resp == "ABRIRMOCHILA" && a == 0) {
      console.log(
        `Na mochila há algumas roupas e equipamentos básicos de viagem. Junto de um bilhete pedindo para o personagens.jogador encontrar na cidade de Erast. Assinado como Aerin. personagens.jogador tomado por memorias de batalha, lembra de seu nome:`);
        personagens.jogador.nome = prompt()
        
      a = 1;
    } else if (resp == "ABRIRMOCHILA" && a == 1) {
      console.log(
        `Você abre a mochila novamente, e vê os mesmos itens e um papel com o seu nome: ${personagens.jogador.nome}.`
      );
      //CONDIÇÃO IPORTANTE DE SELEÇÃO DE equipamentos, MAS AINDA NÃO SAI DA CAVERNA
    } else if (resp == "PEGARUMAARMA") {
      console.log(
        "Existem 3 equipamentos dispostas:\nEspada escudo = + Defesa -Ataque\nMachado = ++Ataque -- Defesa\nArco = +Ataque - Defesa"
      );
      //LAÇO PARA USUÁRIO ENTREGAR O VALOR C0RRETO
      resp = prompt().toUpperCase().replace(/\s/g, "");
      validacaoString(resp, "ESPADAESCUDO", "MACHADO", "ARCO");
      personagens.jogador.defesa = 3;
      personagens.jogador.dano = random(4, 6);
      if (resp == "ESPADAESCUDO") {
        equipamentos.espadaEscudo();
      } else if (resp == "MACHADO") {
        equipamentos.machado();
      } else {
        equipamentos.arco();
      }
      //CONDIÇÃO PARA SAIR DA CAVERNA
    } else if (resp == "SAIRDACAVERNA") {
      console.log("Você saiu da caverna");
      play = false
    }
    //CONDIÇÃO DE GAME OVER
    if (quebra == true) break;
  } while (play); ////// Saida da caverna

  //CONDIÇÃO DE GAME OVER
if (quebra == true) break;

console.log(`Blablablabal cenario bonito, blablabalbla, lembra de dois caminhos, blablablabla, floresta ou montanhas?`)
resp = prompt(``).toUpperCase().replace(/\s/g, "")
validacaoString(resposta, "FLORESTA", "MONTANHAS")
//////////////////////////////////////////////Floresta
/* if (resp == "FLORESTA"){
    //Viagem
    for (i = 0; i < 3; i++) {
        if (i == 0) {
      } else if (i == 1) {
        }
   }

}
//////////////////////////////////////////////Montanhas
if (resp == "MONTANHAS"){
//Viagem
 
 for (i = 0; i < 5; i++) {
     if (i == 0) {
   } else if (i == 1) {
     }
}

}

//////////////////////////////////////////////Cidade
if (montanhas){

    if()
    else()
    if()
    else()

}
  

  //SAINDO DA CAVERNA 2 CAMINHOS
 */
  //CIDADE
} while (play);
personagens.jogador.vida = 10;

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
