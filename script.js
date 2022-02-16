var prompt = require("prompt-sync")();

/*=================================================== DECLARAÇÃO DE VARIAVEIS E OBJETOS ===========================================================*/
var gameOver; //Variável para quebra dos laços caso ocorra uma morte
let resp; // Variavel para armazenar as respostas do jogador e definir os caminhos
let dias = 0; //Variavel de dias, que será utilizada dependendo do caminho esoclhido ao sair da caverna
let vidaMAX; // Variavel para retornar a vida maxima do jogador após as batalhas
let position; //Variavel utilizada na função continuar(), para fins estéticos

// ARRAY DE OBJETOS CONTENDO TODOS OS MONSTROS UTILIZADOS NO PROGRAMA
const monstros = [
  {
    nome: "Aranha Gigante",
    vida: 10,
    defesa: 1,
    dano: [
      // Array para sorteio do ataque dos monstros
      { nome: "teia", dano: 8 },
      { nome: "mordida", dano: 6 },
    ],
    rota: "floresta", // Rota onde o monstro pode aparecer
  },
  {
    nome: "Lechen",
    vida: 15,
    defesa: 0,
    dano: [
      { nome: "pancada", dano: 10 },
      { nome: "armadilha de raízes", dano: 6 },
    ],
    rota: "floresta",
  },
  {
    nome: "Lobo Atroz",
    vida: 15,
    defesa: 1,
    dano: [
      { nome: "garras", dano: 8 },
      { nome: "mordida", dano: 9 },
    ],
    rota: "floresta",
  },
  {
    nome: "Urso Coruja",
    vida: 15,
    defesa: 1,
    dano: [
      { nome: "garras", dano: 8 },
      { nome: "bico", dano: 10 },
    ],
    rota: "floresta",
  },
  {
    nome: "Sleipnir",
    vida: 15,
    defesa: 1,
    dano: [
      { nome: "cascos", dano: 8 },
      { nome: "mordida", dano: 10 },
    ],
    rota: "montanhas",
  },
  {
    nome: "Anão Bandido",
    vida: 15,
    defesa: 2,
    dano: [
      { nome: "espada curta", dano: 7 },
      { nome: "tiro de besta", dano: 10 },
    ],
    rota: "montanhas",
  },
  {
    nome: "Fenrir",
    vida: 12,
    defesa: 2,
    dano: [
      { nome: "garras", dano: 8 },
      { nome: "mordida", dano: 10 },
    ],
    rota: "montanhas",
  },
  {
    nome: "Draugr",
    vida: 12,
    defesa: 2,
    dano: [
      { nome: "espada enferrujada", dano: 10 },
      { nome: "pancada com escudo", dano: 8 },
    ],
    rota: "montanhas",
  },
  {
    nome: "Caçador de recompensas",
    vida: 15,
    defesa: 3,
    dano: [
      { nome: "espadas curtas", dano: 12 },
      { nome: "frasco de ácido", dano: 7 },
    ],
    rota: "cidade",
  },
  {
    nome: `Aerin`,
    vida: 30,
    defesa: 8,

    dano: [
      { nome: "espada longa", dano: random(10, 12) },
      { nome: "mísseis mágicos", dano: random(10, 12) },
    ],
    rota: `aerin`,
  },
];

// OBJETOS DE DEFINIÇÃO DOS STATUS DO PERSONAGEM
const personagens = {
  jogador: {
    nome: "Cleitin",
    vida: 30,
    dano: 0,
    defesa: 0,
    equip: [
      {
        nome: "ataque desarmado",
        dano: 4,
        defesa: 3,
      },
    ],
    ataque: [
      //Objeto para calcular e aplicar no combate um ataque especial que causa mais dano
      {
        nome: "ataque carregado",
        dano: 0,
        danoADD: () => {
          personagens.jogador.ataque[0].dano = 0;
          personagens.jogador.ataque[0].dano =
            personagens.jogador.equip[0].dano + 4;
        },
      },
    ],
    funcoes: [
      {
        nome: "defesa",
        defesa: 0,
        defesaADD: () => {
          personagens.jogador.funcoes[0].defesa = 0;
          personagens.jogador.funcoes[0].defesa =
            personagens.jogador.equip[0].defesa + 10;
        },
      },
    ],
  },
};
// Objetos de equipamentos com funções que alteram os status do jogador
const equipamentos = {
  machado: () => {
    personagens.jogador.equip[0].nome = "machado";
    personagens.jogador.equip[0].dano += 3;
    personagens.jogador.equip[0].defesa -= 3;
  },
  espadaEscudo: () => {
    personagens.jogador.equip[0].nome = "espada escudo";
    personagens.jogador.equip[0].dano -= 1;
    personagens.jogador.equip[0].defesa += 2;
  },
  arco: () => {
    personagens.jogador.equip[0].nome = "arco";
    personagens.jogador.equip[0].dano += 2;
    personagens.jogador.equip[0].defesa -= 1;
  },
  armadura: () => {
    personagens.jogador.equip[0].defesa += 2;
  },
  mjolnir: () => {
    personagens.jogador.equip[0].dano += 2;
  },
};

/*======================================================= DECLARAÇÃO DAS FUNÇÕES ==================================================================*/
// FUNÇÃO PARA RETARDAR O PROMPT
function sleep(segundos = 1) {
  segundos = segundos * 1000;
  let start = new Date().getTime();
  for (let i = 0; i < 1e7; i++) {
    if (new Date().getTime() - start > segundos) {
      break;
    }
  }
}

//FUNÇÃO QUE AGUARDA O JOGADOR PRESSIONAR ENTER PARA CONTINUAR E MANTER UM PADRÃO ESTÉTICO NO CONSOLE
function continuar(x = 0) {
  if (x == 0) {
    console.log();
    a = prompt(`Pressione \x1b[33mENTER\x1b[0m para continuar...`);
    console.clear();
    if (position == "caverna") {
      console.log(
        "==================================================================== CAVERNA ===================================================================="
      );
    } else if (position == "floresta") {
      console.log(
        "==================================================================== FLORESTA ===================================================================="
      );
    } else if (position == "montanhas") {
      console.log(
        "==================================================================== MONTANHAS ===================================================================="
      );
    } else if (position == "cidade") {
      console.log(
        "==================================================================== CIDADE ===================================================================="
      );
    }
  } else {
    a = prompt(`Pressione \x1b[33mENTER\x1b[0m para continuar...`);
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
function validacaoString(resposta, a, b, c, d, e, f, g, h, i, l, m, n, o) {
  while (true) {
    if (
      resposta == a ||
      resposta == b ||
      resposta == c ||
      resposta == d ||
      resposta == e ||
      resposta == f ||
      resposta == g ||
      resposta == h ||
      resposta == i ||
      resposta == l ||
      resposta == m ||
      resposta == n ||
      resposta == o
    ) {
      return (resp = resposta);
    } else {
      console.log(`Escolha uma das opções: \n`);
      resposta = prompt(``).toUpperCase().replace(/\s/g, "");
    }
  }
}

//FUNÇAO DE COMBATE
function mortalKombat(qtd, rota) {
  for (let i = 0; i < qtd; i++) {
    // Laço de repetição a partir da quantidade desejada
    const monstroLUTA = []; // Array para adicionar apenas os montros da rota selecionada
    monstroLUTA.splice(0, monstroLUTA.length); // Cod para limpar o Array toda vez que chamar a função
    for (const m of monstros) {
      // Laço para verificar todos os objetos do array de monstros
      if (rota == m.rota) {
        monstroLUTA.push(Object.assign({}, m)); // Criando uma cópia do objeto para a nova array
      }
    }
    let escolherMONSTRO = random(0, monstroLUTA.length - 1); // Variável para randomizar qual monstro irá apaecer
    let escolherDanoMonstro = random(
      0,
      monstroLUTA[escolherMONSTRO].dano.length - 1
    ); // Variável para randomizar qual dano do monstro irá apaecer
    let monstroBATE; // Variável para definir o dano do monstro
    let personagemBATE; // Variável para definir o dano do personagem
    let nomeHABILIDADE = ""; // Variável para definir o nome da habilidade que irá aparecer
    let cooldown = 5; // Variável para definir o tempo que o ataque carregado irá voltar

    function docooldown() {
      // Função para definir quando começar e retornar do cooldown
      if (cooldown == 5) {
        if (resp == "2" || resp == personagens.jogador.ataque[0].nome) {
          cooldown--;
        }
      } else if (cooldown < 5 && cooldown > 0) {
        cooldown--;
      } else {
        cooldown = 5;
      }
    }

    sleep(2);
    console.log(
      `\nVocê encontrou \x1b[31m${monstroLUTA[escolherMONSTRO].nome}\x1b[0m`
    );//Apresentação do mosntro, já pegando o nome no array monstroLUTA.
    sleep(3);
    console.log(`\nPrepare-se para a batalha:`);
    sleep(4);

    while (
      personagens.jogador.vida > 0 &&
      monstroLUTA[escolherMONSTRO].vida > 0
    ) {
      // Laço para prender na batalha até apenas um sair vivo ("There can be only one")
      function ifElseFUNCTION() {
        // Função para definir o dano do personagem, subtraindo a defesa do monstro. Se a defesa do monstro for maior ou igual ao dano do personagem, nessa rodada o dano será zero.
        if (personagemBATE > monstroLUTA[escolherMONSTRO].defesa) {
          personagemBATE -= monstroLUTA[escolherMONSTRO].defesa;
          monstroLUTA[escolherMONSTRO].vida -= personagemBATE;
        } else {
          personagemBATE = 0;
        }
      }
      if (cooldown == 5) {
        //  Condição criada para saber se foi usado o ataque carregado
        console.log(`O que pretende fazer?`);
        console.log(
          `\n\x1b[33m1\x1b[0m - ${personagens.jogador.equip[0].nome}\n\x1b[33m2\x1b[0m - ${personagens.jogador.ataque[0].nome}\n`
        );
        resp = prompt("", "ENTER").toUpperCase().replace(/\s/g, ""); // Regex de Habilidade
        validacaoString(resp, "1", "2", "ENTER", ""); // Validação da regex de Habilidade

        if (resp == "1" || resp == "ENTER" || resp == "") {//Seleção de ataque básico, podendo apenas pressionar enter para escolher
          // Seleção da primeira Habilidade, considerando um valor randomizado de dano para o jogador, baseado no equipamento dele
          personagemBATE = random( 
            personagens.jogador.equip[0].dano - 1,
            personagens.jogador.equip[0].dano + 2
          );
          ifElseFUNCTION();
          nomeHABILIDADE = console.log(
            `\x1b[32m${personagens.jogador.nome}\x1b[0m usou \x1b[32m${personagens.jogador.equip[0].nome}\x1b[0m e tirou \x1b[32m${personagemBATE}\x1b[0m de dano`
          );
          docooldown();
        } else if (resp == "2") {
          // Seleção da segunda Habilidade
          personagens.jogador.ataque[0].danoADD();
          personagemBATE = random(
            personagens.jogador.ataque[0].dano - 1,
            personagens.jogador.ataque[0].dano + 2
          );
          ifElseFUNCTION();
          nomeHABILIDADE = console.log(
            `\x1b[32m${personagens.jogador.nome}\x1b[0m usou \x1b[32m${personagens.jogador.ataque[0].nome}\x1b[0m e tirou \x1b[32m${personagemBATE}\x1b[0m de dano`
          );
          sleep(2);
          docooldown();
        }
      } else {
        // Condição para apenas aparecer o ataque basico enquanto o ataque pesado está em cooldown/espera
        console.log(`O que pretende fazer?`);
        console.log(
          `\x1b[33m1\x1b[0m - ${personagens.jogador.equip[0].nome}\n`
        );
        resp = prompt("", "ENTER").toUpperCase().replace(/\s/g, "");
        validacaoString(resp, "1", "2", "3", "ENTER");
        if (resp == "1" || resp == "ENTER" || resp == "") {
          personagemBATE = random(
            personagens.jogador.equip[0].dano - 1,
            personagens.jogador.equip[0].dano + 2
          );
          ifElseFUNCTION();
          nomeHABILIDADE = console.log(
            `\x1b[32m${personagens.jogador.nome}\x1b[0m usou \x1b[32m${personagens.jogador.equip[0].nome}\x1b[0m e tirou \x1b[32m${personagemBATE}\x1b[0m de dano`
          );
          docooldown();
        }
      }
      // Condição para definir dano do Monstro. Mesma lógica do dano do personagem.
      if (
        monstroLUTA[escolherMONSTRO].dano[escolherDanoMonstro].dano >
        personagens.jogador.equip[0].defesa
      ) {
        monstroBATE =
          monstroLUTA[escolherMONSTRO].dano[escolherDanoMonstro].dano -
          personagens.jogador.equip[0].defesa;
        personagens.jogador.vida -= monstroBATE;
      } else {
        monstroBATE = 0;
      }
      console.log(
        `\x1b[31m${monstroLUTA[escolherMONSTRO].nome}\x1b[0m usou \x1b[31m${monstroLUTA[escolherMONSTRO].dano[escolherDanoMonstro].nome}\x1b[0m e tirou \x1b[31m${monstroBATE}\x1b[0m de dano`
      );

      sleep(3);
      console.log( //Exibição da vida atual do jogador e do monstro
        `Sua vida atual: \x1b[33m${personagens.jogador.vida}\x1b[0m\nVida do monstro: \x1b[33m${monstroLUTA[escolherMONSTRO].vida}\x1b[0m\n`
      );
    }
    //Condição para definir se o jogador está vivo ou não. Se estiver com menos de 0 de vida, encaminha para GAME OVER
    if (personagens.jogador.vida > 0) {
      console.log(
        `Parabéns \x1b[32m${personagens.jogador.nome}\x1b[0m, você conseguiu matar \x1b[31m${monstroLUTA[escolherMONSTRO].nome}\x1b[0m`
      );
      gameOver = false;
    } else {
      console.log(
        `\x1b[32m${personagens.jogador.nome}\x1b[0m morreu para um \x1b[31m${monstroLUTA[escolherMONSTRO].nome}\x1b[0m`
      );
      gameOver = true;
      break;
    }
  }
  if (gameOver == false) {
    console.log("\nSua vida foi restaurada após a batalha");
    personagens.jogador.vida = vidaMAX;
  }
}

//FUNÇÃO PARA MOSTRAR NA TELA OS STATUS DO JOGADOR
function statusJogador() {
  console.log("--------------");
  console.log(`Status de \x1b[32m${personagens.jogador.nome}\x1b[0m:`);
  console.log();
  console.log(
    `\x1b[33mVida\x1b[0m:\t\x1b[32m${personagens.jogador.vida}\x1b[0m\n\x1b[33mDefesa\x1b[0m:\t\x1b[32m${personagens.jogador.equip[0].defesa}\x1b[0m\n\x1b[33mDano\x1b[0m:\t\x1b[32m${personagens.jogador.equip[0].dano}\x1b[0m`
  );
  console.log("--------------");
}

/*================================================================= START GAME ========================================================================*/
do {
  var play = true; //Variável utilizada para jogar novamente. Linha 1119
  gameOver = false; //Definindo a variável para false, para garantir que o jogo não saia do loop.
  vidaMAX = 30;
  personagens.jogador.vida = vidaMAX; //Definindo no início do jogo que a vida do jogador volta a ser o valor correto
  let a = 0; //Variável genérica utilizada para validação de escolhas repetidas
  let respCorreta = 0; // Contador de respostas corretas na última parte da aventura. Linha 1013
  position = "caverna"; // Marcador de localização do jogador na história. Sendo utilizada na function continuar()

  /*============================================================== CAVERNA ==========================================================================*/
  console.clear();
  console.log(
    "==================================================================== CAVERNA ===================================================================="
  );
  console.log(
    `\nO gotejar na caverna te acorda subitamente. Ao abrir lentamente os olhos você sente uma dor de cabeça lancinante, com seus olhos acostumados a luz baixa da caverna vinda de algum lugar a sua direita, seus pensamentos te levam a um local um pouco aterrorizante...Quem é você?`
  );

  sleep(5);
  console.log(
    `\nEnquanto tenta vasculhar suas memórias atrás de algo, nada lhe retorna, você abre a boca e consegue falar, boas notícias. Você checa seu corpo e ele está inteiro, mais boas noticias. Ainda sem entender muita coisa você checa seus arredores, percebe que está numa caverna com estalactites acima de você.`
  );
  sleep(3);
  continuar();

  //LAÇO PARA TRAZER OPÇÕES DA CAVERNA NOVAMENTE ATÉ O JOGADOR SAIR DELA
  do {
    console.log(
      `\nHá uma fogueira, agora apenas em brasas, com \x1b[33mCOMIDA\x1b[0m, próximo a ela uma \x1b[33mMOCHILA\x1b[0m e alguns \x1b[33mEQUIPAMENTOS\x1b[0m espalhados. Além é claro, da \x1b[33mSAIDA\x1b[0m da caverna.`
    );
    console.log("\nO que você quer fazer?\n");
    resp = prompt().toUpperCase().replace(/\s/g, "");
    validacaoString(resp, "COMIDA", "MOCHILA", "EQUIPAMENTOS", "SAIDA");

    if (resp === "COMIDA") {
      ////////////////////////////////////////////////PRIMEIRO FINAL E PRIMEIRO GAME OVER
      sleep(1);
      console.log(
        "\nVocê avança até a fogueira e pega alguns pedaços de carne já quase queimados, pão e um pedaço de queijo que estavam ao lado. Sentindo seu estomago roncar você devora a comida sem pensar duas vezes. Após alguns minutos você começa a sentir sua visão embaçar, a dor de cabeça piorar e logo tudo vai ficando preto, enquanto seu corpo cai em direção ao chão... \x1b[33mVOCÊ MORREU\x1b[0m\n"
      );
      gameOver = true;
      break;
    } else if (resp === "MOCHILA" && a == 0) {
      //Laço opcional, porém aqui terá a primeira dica do jogo e a definição do nome do personagem
      sleep(1);
      console.log(
        `\nNa mochila há algumas roupas e equipamentos básicos de viagem. Junto de um bilhete pedindo para você o encontrar na cidade de Erast. Assinado como Aerin. Tomado por memorias de quando era criança, você lembra de algo:\n\n\x1b[33mQual o seu nome?\x1b[0m\n`
      );
      personagens.jogador.nome = prompt();
      continuar();
      a = 1; //Caso o jogador abra a mochila uma segunda vez, essa variável faz com que apenas a mensagem abaixo seja exibida.
    } else if (resp === "MOCHILA" && a == 1) {
      sleep(1);
      console.log(
        `\nVocê abre a mochila novamente, e vê os mesmos itens e um papel com o seu nome: \x1b[33m${personagens.jogador.nome}\x1b[0m.`
      );
      continuar();
    } else if (resp == "EQUIPAMENTOS") {
      //Laço para seleção de equipamentos, também opcional. Caso nenhum equipamento seja selecionado, jogador terá ataque desarmado como padrão
      personagens.jogador.equip[0].dano = random(4, 6);
      personagens.jogador.equip[0].defesa = 3;
      sleep(1);
      console.log(
        "\nExistem 3 armas dispostas:\n\n\x1b[33mEspada escudo\x1b[0m = \x1b[31m-1\x1b[0m Ataque / \x1b[32m+2\x1b[0m Defesa\n\x1b[33mMachado\x1b[0m = \x1b[32m+3\x1b[0m Ataque / \x1b[31m-3\x1b[0m Defesa\n\x1b[33mArco\x1b[0m = \x1b[32m+2\x1b[0m Ataque / \x1b[31m-1\x1b[0m Defesa"
      );
      console.log();
      resp = prompt().toUpperCase().replace(/\s/g, "");
      validacaoString(resp, "ESPADAESCUDO", "MACHADO", "ARCO");

      if (resp == "ESPADAESCUDO") {
        equipamentos.espadaEscudo();
      } else if (resp == "MACHADO") {
        equipamentos.machado();
      } else {
        equipamentos.arco();
      }
      sleep(1);
      statusJogador();
      continuar();
    } else if (resp == "SAIDA") {
      //Opção de saída da caverna. Única forma de progredir na história
      sleep(1);
      console.log("\nVocê saiu da caverna");
      continuar();
      break;
    }
    if (gameOver == true) break;
  } while (play); ////// Final do laço de repetição da caverna e saída da mesma

  while (play) {
    if (gameOver == true) break;
    console.log(
      `\nAo sair da caverna, seus olhos demoram alguns segundos para se acostumarem com a luz. O sol brilha alto no céu e o som de passaros e animais rasteiros chega aos seus ouvidos. Andando pela pequena trilha que sai da caverna você chega até uma estrada maior, esta logo se divide em dois caminhos.`
    );

    sleep(4);
    console.log(
      `O caminho da esquerda adentra mais na \x1b[33mFLORESTA\x1b[0m que aos poucos vai ficando mais densa com as copas das arvores competindo com os raios de sol pra ver quem vence.`
    );

    sleep(3);
    console.log(
      `A segunda trilha começa a subir as \x1b[33mMONTANHAS\x1b[0m com seus picos nevados e cavernas escuras escondendo perigos. Sem conhecer direito do que é capaz, você decide ir por qual caminho?\n`
    );

    resp = prompt().toUpperCase().replace(/\s/g, ""); //Decisão do jogador sobre qual caminho seguir. A partir daqui será definida a variável dias e as opções que ele terá durante o jogo
    validacaoString(resp, "FLORESTA", "MONTANHAS");

    /*================================================================ FLORESTA =============================================================================*/

    if (resp == "FLORESTA") {
      position = "floresta";
      dias = 3;
      continuar();
      //Viagem
      console.log(
        `\nSem pensar muito você avança pela floresta, conforme você avança os sons de pequenos animais começa a aumentar. Olhando em volta você até consegue ver alguns coelhos e pássaros seguindo com sua vida em meio as árvores. Antes de avançar você para alguns minutos para checar seu equipamento:\n`
      );
      statusJogador();
      sleep(5);
      console.log(
        `\nConforme adentra na floresta, a copa das árvores vão ficando mais altas, o sol vai iluminando o caminho com pequenos feixes de luz que passam por entre as folhas, as vezes enganando sua percepção conforme o vento faz as arvores balançarem. Atento aos seus arredores você se mantém preparado para qualquer coisa.`
      );
      continuar();
      for (i = 0; i < dias; i++) {
        //Laço de repetição com base nos dias de viagem, com condições internas para definir o que acontece em cada dia
        if (i == 0) {
          //PRIMEIRO DIA
          sleep(2);
          console.log(
            "\nConforme a noite vai caindo, você acha prudente montar um pequeno acampamento para descansar. Sem muita dificuldade você encontra uma pequena clareira, um local perfeito para passar a noite. Seu corpo trabalha mais rápido do que sua mente consegue acompanhar, quando percebe está montando o que parece ser uma armadilha de som ao redor do acampamento, apenas uma corda esticada com utensilhos barulhentos para lhe acordar. Quando percebe o que está fazendo, sua cabeça começa a doer, você fecha os olhos brevemente para suportar a dor..."
          );
          continuar();
          console.log(
            `\nAo abrir os seus olhos, você vê uma figura ainda meio disforme lhe explicando como fazer essa armadilha.\n- Se você fizer desta forma, mesmo que esteja dormindo você conseguirá acordar a tempo casao algum animal selvagem resolva visitar seu acampamento. Mantenha-se sempre atento, como as corujas.\nAo dizer isto a figura misteriosa lhe entrega uma pequena estátua de madeira, na forma de uma coruja.\n-Pegue isso como um amuleto de sorte, leve sempre com você e nunca será pego desprevenido.`
          );
          continuar();
          console.log(
            `\nVocê fecha os olhos novamente com uma pontada de dor novamente. Quando abre os olhos novamente você está novamente montando a armadilha no seu acampamento. Sem entender direito o que está acontecendo você lembra o nome dessa figura misteriosa.`
          );
          sleep(5);
          console.log(`\n\x1b[36mAerin\x1b[0m`);
          continuar();
          console.log(
            `\nVocê termina de montar a armadilha e re recosta contra uma arvore proximo a fogueira para tentar dormir um pouco. não demora muito para ouvir o som de uma das armadilhas, com um longo suspiro você levanta e se prepara para descobrir o que está se aproximando.`
          );
          sleep(2);
          mortalKombat(1, "floresta");
          if (gameOver == true) break;

          continuar();
        } else if (i == 1) {
          sleep(1);
          console.log(
            `\nApós uma noite de descanso, com um pequeno incidente, você monta acampamento e segue pela trilha floresta adentro.\nA floresta vai ficando mais densa conforme você avança. Entre as árvores você nota as vezes algumas teias de aranha enormes, talvez aranhas gigantes habitem aqui.`
          );
          sleep(5);
          let rand = random(1, 2);
          if (rand == 1) {
            //SEGUNDO DIA
            console.log(
              "Sons de movimento se aproximando chamam sua atenção, parece que algo grande está vindo. Parece que a própria floresta está lhe desafiando..."
            );
            mortalKombat(random(1, 2), "floresta");
            continuar();

            if (gameOver == true) break;

            sleep(1);
            console.log(
              "\nApós a batalha você percebe um certo brilho próximo a trilha. Ao se aproximar você encontra o esqueleto do que uma vez foi uma pessoa adulta vestindo uma armadura ainda polida, como se tivesse saído do ferreiro ainda hoje.\n-Mortos não precisam de armaduras - você sussurra antes que consiga pensar.\nSeguindo seu próprio comentário você veste a armadura e continua seguindo a trilha.\nVocê encontrou uma \x1b[33mArmadura de Mitral\x1b[0m"
            );
            vidaMAX += 5;
            personagens.jogador.vida = vidaMAX;
            equipamentos.armadura();
            statusJogador();
            continuar();
          } else {
            sleep(1);
            console.log(
              "\nConforme avança na trilha você percebe um brilho entre as arvores, um brilho metálico. Ao se aproximar você encontra o esqueleto do que uma vez foi uma pessoa adulta vestindo uma armadura ainda polida, como se tivesse saído do ferreiro ainda hoje.\n-Mortos não precisam de armaduras - você sussurra antes que consiga pensar.\nSeguindo seu próprio comentário você veste a armadura e continua seguindo a trilha.\nVocê encontrou uma \x1b[33mArmadura de Mitral\x1b[0m"
            );
            equipamentos.armadura();
            statusJogador();
            continuar();
          }
        } else if (i == 2) {
          //TERCEIRO DIA
          sleep(3);
          console.log(
            `\nNo terceiro dia de viagem, você começa realmente a achar que a floresta não lhe quer aqui. O som de animais pequenos correndo pela floresta agora não existe mais, aquelas teias que antes eram esparsas começam a ficar mais comuns e você começa a ouvir uivos distantes. Após algumas horas seguindo a trilha um silêncio incomodo começa a te incomodar.\n`
          );
          continuar();
          console.log(
            `\nApós um tempo quase interminável o silêncio finalmente é quebrado pelo som de algo se aproximando....`
          );
          sleep(1);
          console.log("Parece que encontramos algo...");
          mortalKombat(random(1, 4), "floresta");
          if (gameOver == true) break;
          continuar();
          console.log(
            `\nAo final do terceiro dia avançando pela trilha, a floresta começa a ficar menos densa, os sons de animais começam a retornar aos poucos e você já consegue ver pedaços do que seria uma cidade ao longe.\n Com o sol quase se pondo você sai da floresta, a sua frente uma grande cidade murada que você reconhece como sendo a cidade de Erast.`
          );
        }
      } //FIM DA FLORESTA

      /*================================================================= Montanhas ====================================================================*/
    } else if (resp == `MONTANHAS`) {
      position = "montanhas";
      let dias = 5;
      continuar();
      //PRÓLOGO DA MONTANHA

      console.log(
        `\nVocê começa sua jornada, conforme você avança a temperatura vai caindo, os ventos vão ficando mais gélidos e seu corpo vai começando a sentir. Quando chega ao pé da montanha você começa a entender melhor o seu corpo e suas capacidades.\n`
      );

      sleep(3);
      statusJogador();
      sleep(2);
      console.log(
        `\nViajar pelas montanhas é um grande desafio, a temperatura e o terreno são inimigos por si só, além de possíveis monstros. A escassez de animais e alimentos tornam a jornada ainda mais complicada.`
      );
      continuar();

      for (i = 0; i < dias; i++) {
        //Laço de repetição com base nos dias de viagem, com condições internas para definir o que acontece em cada dia
        if (i == 0) {
          //PRIMEIRO DIA
          sleep(1);
          console.log(
            `\nPela manhã do primeiro dia de viagem, você chega ao pé da montanha e se da conta que precisa estocar alimentos antes de continuar. Olhando em volta rapidamente você percebe algumas árvores com \x1b[33mFRUTAS\x1b[0m, além disso você vê rastros de \x1b[33mANIMAIS\x1b[0m e de pequenos \x1b[33mMONSTROS\x1b[0m, ambos dariam um belo jantar.\n`
          );
          resp = prompt().toUpperCase().replace(/\s/g, "");
          validacaoString(resp, "FRUTAS", "ANIMAIS", "MONSTROS");
          if (resp == "FRUTAS") {
            sleep(1);
            console.log(
              `Encontrando algumas árvores frutíferas você aproveita para consumir algumas frutas e guardar uma boa quantidade para alguns dias de viagem, tendo preparado seus mantimentos, você segue a trilha sinuosa que começa a subir a montanha.`
            );
          } else if (resp == "ANIMAIS") {
            sleep(1);
            console.log(
              `\nSeguindo entre as árvores você encontrou rastros de cervo. Seguir os rastros se mostrou algo fácil e rapidamente o animal é abatido, e você obtém carnes, gordura e peles, todos úteis para uma viagem pelas Montanhas Gélidas.`
            );
            sleep(2);
            console.log(
              `\nVocê ganhou 1 de defesa, confira seus STATUS atualizados\n`
            );
            personagens.jogador.equip[0].defesa += 1;
            statusJogador();
          } else if (resp == "MONSTROS") {
            sleep(1);
            console.log(
              `\nMais preocupado com sua segurança, você procura por rastros de monstros para testar seus equipamentos e habilidade. Não demora muito até encontrar um desafio.`
            );
            sleep(5);
            mortalKombat(1, "montanhas");
            if (gameOver == true) break;
            sleep(2);
            console.log(
              `Você ganhou 1 de dano, confira seus STATUS atualizados: \n`
            );
            personagens.jogador.equip[0].dano += 1;
            statusJogador();
            continuar();
            console.log(
              `\nApós o combate você analisa os arredores e percebe um pequeno acampamento, agora sem dono. Sem pensar duas vezes, você recolhe os mantimentos e se prepara para seguir viagem.`
            );
          }
          continuar();
        } else if (i == 1) {
          //SEGUNDO DIA
          sleep(1);
          console.log(
            `\nConforme você avança pela trilha, uma forte nevasca se inicia, a temperatura começa cair vertiginosamente, dificultando sua visão. O caminho segue íngreme e irregular. Pensando rapidamente no que fazer, você pensa em prucurar uma \x1b[33mCAVERNA\x1b[0m para se abrigar, ou pode \x1b[33mENFRENTAR\x1b[0m a nevasca e tentar seguir pela trilha.\n`
          );

          resp = prompt().toUpperCase().replace(/\s/g, "");
          validacaoString(resp, "CAVERNA", "ENFRENTAR");
          if (resp === "CAVERNA") {
            console.log(
              `\nVocê procura por refugio e encontra uma pequena caverna não muito longe. A salvo da nevasca, você aproveita para descansar e se alimentar. Até que, subitamente uma dor de cabeça muito forte, faz com que você feche os olhos brevemente.\n`
            );
            continuar();
            console.log(
              `\nAo abrir os seus olhos, você vê uma figura ainda meio disforme lhe explicando os perigos de uma nevasca em meio as montanhas.\n- Sempre que estiver numa situação dessas, é prudente procurar por abrigo. Nunca se sabe o que se pode encontrar nas montanhas. Seja sábio como as corujas.\nAo dizer isto a figura misteriosa lhe entrega uma pequena estátua de madeira, na forma de uma coruja.\n- Pegue esse amuleto, leve sempre com você e a decisão mais sábia, ficará clara...`
            );
            continuar();
            console.log(
              `\nVocê fecha os olhos novamente, enquanto sente a mesma pontada na cabeça. Quando abre os olhos, você está sentado na caverna, terminando de organizar seus equipamentos para seguir viagem. Sem entender direito o que está acontecendo, você lembra o nome dessa figura misteriosa.`
            );
            sleep(5);
            console.log(`\n\x1b[36mAerin\x1b[0m`);
            continuar();
          } else if (resp === "ENFRENTAR") {
            sleep(2);
            console.log(
              `\nEm meio a nevasca uma sombra parece começar a lhe seguir. Sem saber para onde fugir, sua uníca opção é lutar!`
            );
            mortalKombat(1, "montanhas");
            if (gameOver == true) break;
            sleep(1);
            console.log(
              `Você ganhou 1 de defesa, confira seus STATUS atualizados: \n`
            );
            personagens.jogador.equip[0].defesa += 1;
            statusJogador();
            continuar();
            sleep(2);
            console.log(
              `\nApós derrotar seu inimigo você decide procurar uma caverna para se recompor. Sem muita dificuldade encontrou uma pequena caverna. A salvo da nevasca, você aproveita para descansar e se alimentar. Até que, Subitamente uma dor de cabeça muito forte faz com que você feche os olhos brevemente.`
            );
            continuar();
            console.log(
              `\nAo abrir os seus olhos, você vê uma figura ainda meio disforme lhe explicando os perigos de uma nevasca em meio as montanhas.\n- Sempre que estiver numa situação dessas, é prudente procurar por abrigo. Nunca se sabe o que se pode encontrar nas montanhas. Seja sábio como as corujas.\nAo dizer isto a figura misteriosa lhe entrega uma pequena estátua de madeira, na forma de uma coruja.\n- Pegue esse amuleto, leve sempre com você e a decisão mais sábia, ficará clara...`
            );
            continuar();
            console.log(
              `\nVocê fecha os olhos novamente, enquanto sente a mesma pontada na cabeça. Quando abre os olhos, você está sentado na caverna, terminando de organizar seus equipamentos para seguir viagem. Sem entender direito o que está acontecendo, você lembra o nome dessa figura misteriosa.`
            );
            sleep(5);
            console.log(`\n\x1b[36mAerin\x1b[0m`);
            continuar();
          }
        } else if (i == 2) {
          //TERCEIRO DIA
          sleep(2);
          console.log(
            `\nO terceiro dia começa mais calmo, pelo menos é o que indica o fraco sol que não consegue vencer o frio. Após seguir pela trilha durante o dia todo você começa a sentir a fadiga da viagem. O clima das montanhas cobra um preço alto de seus visitantes.`
          );
          sleep(5);
          console.log(
            `Com o final do dia chegando, você avista uma formação de rochas que daria um bom local de descanso. Com seu corpo cansado, mas ao mesmo tempo querendo sair logo da montanha você precisa decidir entre \x1b[33mDESCANSAR\x1b[0m ou \x1b[33mSEGUIR\x1b[0m viagem por mais algumas horas.\n`
          );
          resp = prompt().toUpperCase().replace(/\s/g, "");
          validacaoString(resp, "DESCANSAR", "SEGUIR");
          if (resp === "DESCANSAR") {
            sleep(1);
            console.log(
              `\nAproveitando a formação rochosa para se proteger dos ventos, voce monta um pequeno acampamento e acende uma pequena fogueira para se manter aquecido.`
            );
            continuar();
          } else if (resp === "SEGUIR") {
            sleep(1);
            console.log(
              `\nVocê continua a caminhar, quase não consegue permanecer em linha reta e mal sente suas pernas. Até que você se depara com uma grande árvore próxima da trilha, com frutas douradas e suculentas. Com seu estomago roncando você avança em direção a árvore e rapidamente come um dos frutos. Um forte calor se espalha pelo seu corpo, retirando todo o cansaço, lhe revigorando e dando mais força.`
            );
            sleep(5);
            console.log(
              `Repentinamente você acorda em seu acampamento, sem entender como chegou lá, você olha em volta procurando pela árvore, apenas para ver grandes rochas lhe protegendo dos ventos.`
            );
            sleep(4);
            console.log(
              `\nVocê acabou de ganhar 5 de vida máxima.\nEsses são seus STATUS atualizados:\n `
            );
            vidaMAX += 5;
            personagens.jogador.vida = vidaMAX;
            statusJogador();
            continuar();
          }
        } else if (i == 3) {
          //QUARTO DIA
          console.log(
            `\nDurante o quarto dia de jornada, você avista duas figuras entre as imensas pedras de gelo que haviam acima das montanhas. Eles parecem não ter lhe notado. Pensando nas suas possibilidades você pode tentar passar \x1b[33mESCONDIDO\x1b[0m ou \x1b[33mLUTAR\x1b[0m com as duas criaturas, para seguir em segurança.\n`
          );

          resp = prompt().toUpperCase().replace(/\s/g, "");
          validacaoString(resp, "LUTAR", "ESCONDIDO");
          if (resp === "LUTAR") {
            sleep(1);
            console.log(
              `\nA vontade de lutar vence e você parte para cima delas com arma em punho.`
            );
            mortalKombat(2, "montanhas");
            if (gameOver == true) break;
            equipamentos.mjolnir();
            sleep(1);
            console.log(
              `\nAinda ofegante após a batalha você percebe que uma das figuras carregava consigo um martelo de metal fosco com algumas runas inscritas nele. Reconhecendo que o item é no mínimo interessante você pode \x1b[33mEQUIPAR\x1b[0m o novo equipamento, ou apenas \x1b[33mGUARDA-LO\x1b[0m para depois tentar vendê-lo\n`
            );

            resp = prompt().toUpperCase().replace(/\s/g, "");
            validacaoString(resp, "EQUIPAR", "GUARDA-LO");

            if (resp === "EQUIPAR") {
              sleep(2);
              personagens.jogador.equip[0].dano += 2;
              console.log(
                `\nVocê segura o martelo e dá alguns golpes no ar para senti-lo, é uma arma pesada porém muito bem equilibrada. Por fim, decide usá-lo em seus próximos combates.\nVocê ganhou 2 de dano, confira seus STATUS atualizados: \n`
              );
              statusJogador();
              continuar();
            } else if (resp === "GUARDA-LO") {
              sleep(2);
              console.log(
                `Você segura o martelo e dá alguns golpes no ar para senti-lo, é uma arma pesada porém muito bem equilibrada. Decidindo que ela não faz muito seu estilo você a guarda para depois talvez negociá-la com algum mercador.`
              );
              continuar();
            }
          } else if (resp === "ESCONDIDO") {
            sleep(1);
            console.log(
              `\nVocê passa agaichado pelas pedras a alguns metros fora de seu caminho, as duas criaturas seguem pela trilha na direção de onde você veio. Ao voltar para a trilha você verifica se não estão lhe seguindo para prosseguir.`
            );
          }
          sleep(2);
          console.log(
            `\nCom o dia quase terminando você chega ao outro lado das montanhas e avista uma grande cidade murada, que você reconhece como sendo a cidade de Erast. Enquanto desce pela trilha você observa um acampamento recém montado, porém vazio.`
          );
          continuar();
          console.log(
            `\nOlhando em volta, você não percebe nenhum movimento estranho, a fogueira do acampamento ainda está acesa, inclusive com um pouco de comida sendo preparada. Com seu estômago roncando você decide \x1b[33mINVESTIGAR\x1b[0m o acampamento e no processo comer a comida, ou apenas \x1b[33mIGNORAR\x1b[0m e seguir pela trilha?\n`
          );
          resp = prompt().toUpperCase().replace(/\s/g, "");
          validacaoString(resp, "INVESTIGAR", "IGNORAR");

          if (resp === "INVESTIGAR") {
            sleep(1);
            console.log(
              `\nO estomago ronca uma segunda vez e seu instinto é mais rapido que a lógica. Você vai até a fogueira e começa a comer. Tendo matado sua fome, você vasculha o acampamento e encontra mais algumas rações de viagem, aparentemente o suficiente para chegar até a cidade.`
            );
            continuar();
            console.log(
              `\nAlgumas dezenas de metros adiante, você cruza com um grupo de aventureiros subindo pela trilha, eles estão com alguns ferimentos mas lhe convidam para se juntar a eles.`
            );
            sleep(5);
            console.log(
              `\nEntendendo que você acabou de roubar deles, você educadamente recusa o convite, dizendo que precisa chegar rápido a cidade.`
            );
          } else if (resp === "IGNORAR") {
            sleep(1);
            console.log(
              `\nMesmo com o estômago roncando, você não se rende a algo desonroso. Engolindo em seco você segue viagem, comendo os restos dos seus suprimentos e torcendo para encontrar algo para comer no caminho. Após algumas dezenas de metros você encontra com um grupo de aventureiros. Após uma breve conversa eles lhe convidam para o acampamento e dividem seus mantimentos, suas bebidas e suas histórias.\nApós algumas horas, você segue rumo a cidade de Erast.`
            );
            continuar();
          }
        } else if (i == 4) {
          //QUINTO DIA DA VIAGEM
          sleep(1);
          console.log(
            `\nAmanhece e o frio começa a dar uma trégua, talvez por você estar quase chegando ao final da montanha. Você checa seus equipamentos e segue viagem. Após algumas horas de caminhada, você ouve o som de gritos de batalha, vindos da direção do acampamento do dia anterior.`
          );
          sleep(4);
          console.log(
            `\nImaginando que algumas criaturas tenham descido a montanha seguindo seus rastros, você se vê dividido entre, ajudar os jovens aventureiros e \x1b[33mLUTAR\x1b[0m ou ser prudente e \x1b[33mSEGUIR\x1b[0m viagem.\n`
          );
          resp = prompt().toUpperCase().replace(/\s/g, "");
          validacaoString(resp, "LUTAR", "SEGUIR");
          if (resp == "LUTAR") {
            console.log(
              `\nVocê decide ajudar e sobe a trilha rapidamente, apenas para ver os aventureiros sendo facilmente assassinados. Com sua arma em mãos você avança gritando para chamar atenção das criaturas.`
            );
            mortalKombat(3, "montanhas");
            if (gameOver == true) break;
            sleep(1);
            console.log(
              `\nVocê ganhou 2 de defesa e 2 de dano, confira seus STATUS atualizados: \n`
            );
            personagens.jogador.equip[0].dano += 2;
            personagens.jogador.equip[0].defesa += 2;
            statusJogador();
            continuar();
          } else if (resp === "SEGUIR") {
            sleep(1);
            console.log(
              `\nVocê segue a trilha enquanto os sons de batalha e gritos chegam aos seus ouvidos, porém, o som de galhos quebrando e criaturas se aproximando lhe fazem olhar para trás a tempo de ver algumas vindo em sua direção. Suspirando você empunha sua arma e se prepara para lutar.`
            );
            mortalKombat(3, "montanhas");
            if (gameOver == true) break;
            sleep(3);
            //RECOMPENSA COM BONUS DE STATUS
            console.log(
              `\nVocê ganhou 2 de defesa e 2 de dano, confira seus STATUS atualizados: \n`
            );
            personagens.jogador.equip[0].dano += 2;
            personagens.jogador.equip[0].defesa += 2;
            statusJogador();
            continuar();
          }
        }
      }
    } //FIM DA MONTANHA

    if (gameOver == true) break;

    /*=================================================================== CIDADE ===================================================================*/
    position = "cidade";
    sleep(1);
    console.log(
      `\nVocê se aproxima dos grandes muros que protegem a cidade de Erast, os portões de ferro, agora abertos apra permitir a passagem dos aldeões, é vigiado por guardas no chão e nas duas torres da entrada. Com um pouco de apreensão você passa pelo portão, os guardas nem olham para você.`
    );
    sleep(3);
    console.log(
      `\nAo caminhar pelas ruas largas da cidade, em meio ao burburinho da multidão você se sente renovado por estar de volta a civilização, longe das terras devastadas onde vivem os goblins selvagens.`
    );
    sleep(3);
    console.log(
      `\nA passos largos você avança até a praça central, olhando em volta você vê mercadores, trabalhadores e todo tipo de pessoas e raças. Ao ver todas essas pessoas uma dor de cabeça lancinante lhe deixa levemente tonto, você lembra de Aerin, na sua infância lhe dando algo. Tão rápido quanto veio a dor ela sumiu, mas a memória permanece.`
    );
    continuar();

    do {
      //Laço de repetição que mantém o jogador na cidade. Acaba apenas com o final do jogo
      sleep(2);
      console.log(
        "\nApós aproveitar brevemente a cidade você começa a pensar no que fazer. \nvocê encontra uma \x1b[33mESTALAGEM\x1b[0m próxima a praça central, pelos barulhos uma das mais movimentas. Você pode \x1b[33mPROCURAR\x1b[0m por Aerin na cidade. Parando para pensar, você poderia voltar pelo portão e \x1b[33mDESISTIR\x1b[0m de encontrar a pessoa de suas memórias também.\n"
      );
      resp = prompt().toUpperCase().replace(/\s/g, "");
      validacaoString(resp, "ESTALAGEM", "PROCURAR", "DESISTIR");
      continuar();

      if (resp === "DESISTIR") {
        sleep(1);
        console.log(
          `\nAo olhar para os grandes portões da cidade e ver toda aquela vida ali dentro subitamente uma idéia passa pela sua cabeça:`
        );

        sleep(3);
        console.log(
          `\nSe você não lembra do seu passado, é quase como se você não tivesse um.\n- Nada melhor do que começar uma vida nova em outro lugar - você fala para si mesmo, em um sussurro.`
        );
        continuar();
        sleep(1);
        console.log(
          `\nSem olhar para trás você parte para a próxima cidade, indo para longe de Erast, pronto para iniciar uma nova vida. O que o futuro lhe reserva? Ninguém sabe. Mas isso não irá lhe impedir de tentar...\n`
        );
        quebra = true;
        gameOver = true;
        break;
      } else if (resp === "ESTALAGEM") {
        sleep(1);
        console.log(
          `\nVocê encontra a estalagem do Cervo Flamejante. A taverna lotada e animada é como música em seus ouvidos, atrás do balcão um meio orc sorridente lhe encara, esperando que você peça algo. Cansado de viagem, lhe resta escolher entre \x1b[33mBEBER\x1b[0m algo ou subir para a estalgem e \x1b[33mDESCANSAR\x1b[0m.\n`
        );

        validacaoString(resp, "BEBER", "DESCANSAR");
        continuar();

        if (resp === "BEBER") {
          sleep(1);
          console.log(
            `\nNada melhor depois de uma longa viagem do que beber e comer. Principalmente quando ambos são bons como os de Erast. Enquanto sentava em sua mesa e aproveitava de sua alimentação, você ouviu rumores de um elfo misterioso que comprou uma das casas na cidade alta a pouco tempo, alguns dizem que para fazer experimentos demoníacos.`
          );
          sleep(4);
          console.log(
            `\nApós comer e beber, uma bela noite de sono em uma cama de palha lhe aguarda.`
          );
          continuar();
        } else {
          sleep(1);
          console.log(
            `\nCansado de viagem, você não tem nem vontade de se alimentar e vai direto para seu quarto onde uma cama de palha extremamente confortável lhe aguarda.`
          );
          continuar();
        }
      } else if (resp === "PROCURAR") {
        while (true) {
          //Looping de repetição para manter o jogador na opção de procura, continua quebrando apenas ao final do jogo
          sleep(1);
          console.log(
            `\nVocê sai para procurar por Aerin, com as informações do taverneiro você possui duas opções: procurar na \x1b[33mCIDADE ALTA\x1b[0m ou na \x1b[33mCIDADE BAIXA\x1b[0m, para qual você vai?\n`
          );
          resp = prompt().toUpperCase().replace(/\s/g, "");
          validacaoString(resp, "CIDADEBAIXA", "CIDADEALTA");
          continuar();

          if (resp == "CIDADEBAIXA") {
            sleep(1);
            console.log(
              `\nVocê prefere procurar na cidade baixa primeiro.\nConforme você se aproxima do porto, o cheiro de peixe e agua salgada entra mais em suas narinas, atacando os seus sentidos. Uma discussão acalorada lhe faz olhar para o lado e enquanto fazia isso você sente algo sendo tirado de você. Uma criança correndo entre a multidão agora carrega sua algibeira de moedas. Sem pensar muito e talvez por puro reflexo você corre atrás dela entre as vielas até chegar em um beco. Sua algibeira no chão, ainda com as moedas lhe faz ter um pensamento repentino: "Armadilha". Tão rapido quanto você pensa isso, um movimento as suas costas já faz com que você saque sua arma, apenas para encontrar um bandido com uma adaga em punho.`
            );
            continuar();
            sleep(1);
            console.log(
              `\n- Parece que hoje é meu dia de sorte, encontrar um cara famoso como você, com uma recompensa alta e ainda com poucos equipamentos?!?! Parece que tirei a sorte grande!`
            );
            sleep(10);
            console.log(`\nAntes que você consiga falar algo, o ladrão ataca.`);
            mortalKombat(1, "cidade");
            if (gameOver == true) break;
            console.log(
              `Após a batalha você respira aliviado e resolve sair desse lugar, é perda de tempo continuar procurando por aqui.`
            );
            continuar();
          } else {
            let aerinEncontro = 1; //Variavel para configurar o encontro com Aerin, será utilizada apenas uma vez e apenas se o jogador for para CIDADE ALTA
            sleep(1);
            console.log(
              `\nIgnorando a cidade baixa você vai para a região nobre da cidade. Casas cada vez maiores, algumas mansões e até guardas patrulhando algumas regiões. Você nao sabe o porque, mas algo lhe deixa desconfortável aqui, um embruho no estomago, como se tudo lhe deixasse enjoado. Quando você senta em um banco para retomar um ar e se recuperar da tontura uma figura se aproxima de você.`
            );
            sleep(5);
            console.log(
              `\n- Graças aos deuses você chegou, está alguns dias atrasado, comecei a ficar preocupado. Venha, vamos a minha casa para conversarmos com um pouco mais de privacidade.`
            );
            sleep(5);
            console.log(
              `\nAo olhar para a figura que fala com você de forma casual você vê um elfo com cabelos prateados, trajando uma armadura de couro. Seu rosto genuinamente sorridente apenas potencializa o rosto angular e as orelhas pontudas. Subitamente você o reconhece....`
            );
            sleep(7);
            console.log(`\n\x1b[36mAerin\x1b[0m`);
            break;
          }
        }
        if ((aerinEncontro = 1)) {
          //jogador encontra Aerin e parte para a sessão de perguntas para definir 1 entre 3 finais diferentes
          continuar();
          sleep(1);
          console.log(
            `\nAerin te leva até uma casa relativamente pequena em comparação com as casas a sua volta, mas ainda grande comparada com o resto da cidade. Ao entrarem ele lhe aponta para uma poltrona na sala, ao mesmo tempo que senta em outra diretamente a sua frente.\n-Meu amigo, é realmente muito bom lhe ver novamente, espero que tenha tido uma viagem tranquila - o sorriso em seu rosto se esvai, dando lugar a uma expressão séria - Infelizmente precisarei confirmar algumas coisas com você. Perguntas de rotina você já sabe. Vamos lá.`
          );
          continuar();
          sleep(1);
          console.log(
            //PRIMEIRA PERGUNTA
            `\nQuando você era criança e me encontrou na floresta pela primeira vez eu lhe dei um item. Era uma estátua de madeira de um animal, que animal era este?\n\x1b[33mURSO\x1b[0m\n\x1b[33mCORUJA\x1b[0m\n\x1b[33mVACA\x1b[0m.\n`
          );
          resp = prompt().toUpperCase().replace(/\s/g, "");
          validacaoString(resp, "URSO", "CORUJA", "VACA");

          if (resp === "CORUJA") {
            sleep(1);
            console.log(
              `\nAerin sorri levemente.\n- Fico comovido por você lembrar, muito bem, próxima pergunta.`
            );
            continuar();
            respCorreta++;
          } else {
            sleep(1);
            console.log(
              `\nO rosto de Aerin segue sério.\n- Sinceramente achei que você lembraria, bem, próxima pergunta.`
            );
            continuar();
          }
          sleep(1);
          console.log(
            //SEGUNDA PERGUNTA
            `\nNuma de suas primeiras batalhas, eu estava presente. Você ainda era um aventureiro iniciante, mas o seu grupo resolveu invadir um covil. O desafio se provou maior do que vocês podiam suportar e eu os resgatei. De que tipos de monstros era o covil? \x1b[33mGOBLINS\x1b[0m, \x1b[33mKOBOLDS\x1b[0m ou \x1b[33mORCS\x1b[0m?\n`
          );
          resp = prompt().toUpperCase().replace(/\s/g, "");
          validacaoString(resp, "GOBLINS", "KOBOLDS", "ORCS");

          if (resp == "GOBLINS") {
            sleep(1);
            console.log(
              `\nUm leve alívio aparece brevemente no rosto do elfo.\n- Foi um combate complicado, ter que proteger vocês e ao mesmo tempo acabar com aquelas pestes.`
            );
            continuar();
            respCorreta++;
          } else {
            sleep(1);
            console.log(
              `\nAerin suspira, seus olhos demonstram tristeza por alguns segundos e ele logo se recompõem.\n- Uma memória marcante dessas deveria estar gravada em sua mente, pelo que você passou meu amigo? para ter esquecido desse dia.`
            );
            continuar();
          }
          sleep(1);
          console.log(
            //TERCEIRA PERGUNTA. Caso o jogadores selecione VERMELHA, o jogo mostrará uma mensgem no console e terminará.
            `\nÚltima pergunta, e esse interrogatório acabará. Qual das poções você quer tomar, a \x1b[33mVERMELHA\x1b[0m ou a \x1b[33mAZUL\x1b[0m?\n`
          );
          resp = prompt().toUpperCase().replace(/\s/g, "");
          validacaoString(resp, "VERMELHA", "AZUL");
          if (resp === "VERMELHA") {
            sleep(2);
            console.log(
              /////FINAL PLOT TWIST
              `\nVocê bebe a poção vermelha, sua visão começa a ficar turva assim que você larga a poção de volta na mesa. Aos poucos sua visão fica embaçada enquanto Aerin permanece sentado na poltrona, com os dedos cruzados. Você pisca e ele subitamente é um humano negro e calvo, com óculos escuros. Você pisca novamente e ele volta a ser Aerin o elfo. Você pisca novamente e você está em sua casa, sentado em frente ao seu computador, vendo um RPG de texto se desenrolar em sua frente, talvez um pouco confuso, sem entender direito o que acabou de acontecer, mas com a certeza de que lembrará disso por algum tempo...\n`
            );

            gameOver = true;
            break;
          } else {
            sleep(1);
            console.log(
              `\nAerin senta novamente na poltrona, feliz por você ter escolhido a poção azul.`
            );
            respCorreta++;
          }
        }
        continuar();
        if (respCorreta > 2) {
          /////FINAL DA CAMARADAGEM
          sleep(1);
          console.log(
            `\nApós um momento de silêncio, Aerin abre um grande sorriso.\n-Eu sabia que você era você. Nunca que os espiões do império conseguiriam lhe pegar, muito menos quebrar a sua mente. Venha venha, vamos comemorar hoje, e botar em prática o plano para derrubar esse império maldito de Constant amanhã.\n`
          );
          continuar();

          sleep(1);
          console.log(
            `\nVocês dois passam o dia relembrando de histórias do passado, e aos poucos suas memórias retornam, você lembra de sua infancia pobre em uma fazenda, até começar a vida de aventureiro. Após perder o seu grupo para um esquema corrupto do império você e Aerin montam um grupo de resistência, com planos para derrubar os nobres corruptos de Erast. Você não descobre o que aconteceu para que perdesse sua memória, não que isso o incomode muito, mas a sensação de estar sendo observado as vezes ainda lhe dá arrepios.\n`
          );
          gameOver = true;
          break;
        } else {
          /////FINAL DA LUTA COM AERIN
          console.log(
            `\nAerin pega uma garrafa de vinho, bebe um longo gole e levanta da poltrona lentamente.`
          );
          sleep(5);
          console.log(
            `\n-Eu não sei o que fizeram com você velho amigo, mas pelo respeito que ainda guardo por você lhe darei uma morte honrada. EM GUARDA!!!`
          );
          sleep(2);
          console.log(
            `\nCom um movimento fluido, Aerin saca sua espada e parte para cima de você:`
          );
          mortalKombat(1, "aerin");

          if (personagens.jogador.vida > 0) {
            console.log(`\nRápido como começou tudo terminou.\n`);
            continuar();
            sleep(1);
            console.log(
              `\nAgindo por instinto, você se defendeu e com movimentos rápidos de um avenrureiro veterano você matou Aerin. Durante o combate suas memórias foram retornando. Você lembra de sua infancia pobre em uma fazenda, até começar a vida de aventureiro. Após perder o seu grupo para um esquema corrupto do império você e Aerin montam um grupo de resistência, com planos para derrubar os nobres corruptos de Erast.\n`
            );
            continuar();
            sleep(1);
            console.log(
              `\nAo mesmo tempo que o corpo de seu amigo caía inerte no chão, seus joelhos se dobravam e seus olhos começavam a encher de lágrimas. Uma avalanche de memórias começa a atrapalhar todos os seus sentidos, como a morte de Aerin libertasse todas elas de uma prisão. Uma voz rouca e suave ri no fundo de sua cabeça:`
            );
            sleep(8);
            console.log(`\n-Bom trabalho, muito bom trabalho. HAHAHAHA....`);
            gameOver = true;
            quebra = true;
            break;
          } else {
            continuar();
            sleep(1);
            console.log(
              `\nAgindo por instinto, você se defendeu e mesmo com movimentos rápidos de um aventureiro veterano você não conseguiu derrotar Aerin, ele foi mais rápido e mais forte que você. Junto com o golpe final, Aerin lhe segura e deposita gentilmente no chão:`
            );
            sleep(8);
            console.log(
              `\n-Vá em paz meu amigo. Irei atrás de quem fez isso com você, e juro pelo meu nome que irei vingá-lo. Descanse agora e nos reencontraremos na outra vida....`
            );
            quebra = true;
            gameOver = true;
            break;
          }
        }
      }
      if (gameOver == true) break;
    } while (true);
  }
  console.log(
    "==================================================================== FIM ===================================================================="
  );
  console.log(
    //JOGADOR QUESTIONADO SE QUER JOGAR NOVAMENTE. SE SIM SERÁ LEVADO PARA O INICIO DO JOGO, OS STAUS SERÃO RESETADOS E O JOGO COMEÇARÁ NOVAMENTE
    `\nDeseja jogar novamente, \x1b[33mSIM\x1b[0m ou \x1b[33mNAO\x1b[0m?\n`
  );

  resp = prompt().toUpperCase().replace(/\s/g, "");
  validacaoString(resp, "SIM", "NAO");
  console.log();

  if (resp == "NAO") {
    play = false;
  } else if (resp == "SIM") {
    play = true;
  }
  console.clear();
} while (play);
