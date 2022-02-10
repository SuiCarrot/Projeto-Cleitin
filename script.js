var prompt = require("prompt-sync")();

/*-------------------------------------------- DECLARAÇÃO DAS FUNÇÕES--------------------------------------------------------------------*/
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
    "Sleipnir",
    "Fenrir",
    "Draugr",
  ];

  for (let i = 0; i < qtd; i++) {
    let nomeMonstro = listNomeMonstro[random(a, b)];
    let vidaMonstro = random(5, 10);
    let danoMonstro = random(3, 6);

    let monstro = {
      nome: nomeMonstro,
      vida: vidaMonstro,
      dano: danoMonstro,
      id: i,
    };
    monstros.push(monstro);
  }
  return monstros;
}

//FUNÇÃO COMBATE
function mortalKombat(a = 0) {
  do {
    personagens.jogador.vida =
      personagens.jogador.vida - monstros[a].dano + personagens.jogador.defesa;
    monstros[a].vida = monstros[a].vida - personagens.jogador.dano;
  } while (personagens.jogador.vida > 0 && monstros[a].vida > 0);

  if (personagens.jogador.vida > 0) {
    return (gameOver = false);
  } else {
    return (gameOver = true);
  }
}

//FUNÇÃO STATUS DO JOGADOR
function statusJogador() {
  console.log(`Status de ${personagens.jogador.nome}:`);
  console.log();
  console.log(
    `\x1b[33mVida\x1b[0m:\t\x1b[32m${personagens.jogador.vida}\x1b[0m\n\x1b[33mDefesa\x1b[0m:\t\x1b[32m${personagens.jogador.defesa}\x1b[0m\n\x1b[33mDano\x1b[0m:\t\x1b[32m${personagens.jogador.dano}\x1b[0m`
  );
}

//FUNÇÃO MERGE CRIAÇÃO, BATALHA E CONDIÇÃO
function ifGameOver(qtd, a, b) {
  criarMonstro(qtd, a, b);
  for (let i = 0; i < qtd; i++) {
    sleep(2);
    console.log(`Você encontrou um ${monstros[i].nome}`);
    sleep(5);
    console.log(`Prepare-se para a batalha`);
    sleep(5);
    mortalKombat(i);
    if (gameOver == true) {
      console.log(`Você morreu para um ${monstros[i].nome}`);
      break;
    } else {
      console.log(`Parabéns você conseguiu matar ${monstros[i].nome}`);
    }
  }
  sleep(3);
}

//FUNÇÃO STATUS JOGADOR

/*-----------------------------------------------DECLARAÇÃO DE VARIAVEIS E OBJETOS---------------------------------------------------------*/
//ARRAY DE MONSTROS PARA SER USADO NA FUNÇÃO CRIARMONSTRO
const monstros = [];

// PERSONAGENS
const personagens = {
  jogador: {
    nome: "Jogador",
    vida: 0,
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
// EQUIPAMENTOS
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
  armadura: function () {
    personagens.jogador.defesa += 3;
  },
};

let play = true;
let resp;
let gameOver = false;
let vidaMAX = 10;
personagens.jogador.vida = vidaMAX;
a = 0;

//ARRAY DE MONSTROS PARA SER USADO NA FUNÇÃO CRIARMONSTRO

//SCRIPT
do {
  console.clear();
  console.log();
  //jogar novamente
  //INICIO DO GAME NA CAVERNA
  console.log(
    "-----------------------------------------------------------------------------------------"
  );
  console.log(`Personagem acorda sem memórias em uma pequena caverna...`);
  sleep(3);
  console.log(`Ao analisar os arredores vê um pequeno acampamento montado.`);
  sleep(2);

  console.log();

  //LAÇO PARA TRAZER OPÇÕES DA CAVERNA
  do {
    //personagem na caverna
    console.log(
      `Uma fogueira, agora apenas em brasas, com \x1b[33mCOMIDA\x1b[0m, uma \x1b[33mMOCHILA\x1b[0m e algumas \x1b[33mEQUIPAMENTOS\x1b[0m espalhadas pelo acampamento. \x1b[33mSAIDA\x1b[0m caverna`
    );
    console.log("O que quer fazer?");
    resp = prompt().toUpperCase().replace(/\s/g, "");
    console.log();
    validacaoString(resp, "COMIDA", "MOCHILA", "EQUIPAMENTOS", "SAIDA");
    //CONDIÇÃO GAME OVER
    if (resp === "COMIDA") {
      console.log("A comida estava envenenada e \x1b[33mVOCÊ MORREU\x1b[0m");
      console.log(
        "-----------------------------------------------------------------------------------------"
      );
      gameOver = true;
      break;
      //CONDIÇÃO DA MOCHILA, MOMENTO IMPORTANTE DA HISTÓRIA PORÉM NÃO FAZ NADA
    } else if (resp == "MOCHILA" && a == 0) {
      console.log(
        `Na mochila há algumas roupas e equipamentos básicos de viagem. Junto de um bilhete pedindo para o personagens.jogador encontrar na cidade de Erast. Assinado como Aerin. personagens.jogador tomado por memorias de batalha, lembra de seu nome:`
      );
      personagens.jogador.nome = prompt();
      resp = prompt("Press ENTER para continuar");
      statusJogador();

      a = 1;
    } else if (resp == "MOCHILA" && a == 1) {
      console.log(
        `Você abre a mochila novamente, e vê os mesmos itens e um papel com o seu nome: ${personagens.jogador.nome}.`
      );
      statusJogador();
      //CONDIÇÃO IPORTANTE DE SELEÇÃO DE equipamentos, MAS AINDA NÃO SAI DA CAVERNA
    } else if (resp == "EQUIPAMENTOS") {
      console.log(
        "Existem 3 equipamentos dispostas:\nEspada escudo = + Defesa -Ataque\nMachado = ++Ataque -- Defesa\nArco = +Ataque - Defesa"
      );
      //LAÇO PARA USUÁRIO ENTREGAR O VALOR C0RRETO
      resp = prompt().toUpperCase().replace(/\s/g, "");
      validacaoString(resp, "ESPADAESCUDO", "MACHADO", "ARCO");

      if (resp == "ESPADAESCUDO") {
        equipamentos.espadaEscudo();
      } else if (resp == "MACHADO") {
        equipamentos.machado();
      } else {
        equipamentos.arco();
      }
      statusJogador();
      //CONDIÇÃO PARA SAIDA DA CAVERNA
    } else if (resp == "SAIDA") {
      console.log("Você saiu da caverna");
      console.clear();
      break;
    }
    //CONDIÇÃO DE GAME OVER
    if (gameOver == true) break;
  } while (play); ////// Saida da caverna

  while (play) {
    //CONDIÇÃO DE GAME OVER
    // if (gameOver == true) break;
    console.log(
      "-----------------------------------------------------------------------------------------"
    );
    console.log(
      `Blablablabal cenario bonito, blablabalbla, lembra de dois caminhos, blablablabla, floresta ou montanhas?`
    );
    resp = prompt(``).toUpperCase().replace(/\s/g, "");
    validacaoString(resp, "FLORESTA", "MONTANHAS");
    console.log();

    /*---------------------------------------------------------FLORESTA--------------------------------------------------------------------*/

    if (resp == "FLORESTA") {
      //Viagem
      for (i = 0; i < 3; i++) {
        //PRIMEIRO DIA NA FLOESTA
        if (i == 0) {
          sleep(3);
          console.log(
            "Ok, este é seu primeiro dia na floresta, aparentemente tudo parece calmo."
          );
          sleep(5);
          console.log(
            "A noite cai, o frio desce, mas aqui dentro predomina esse amor que me aquece"
          );
          sleep(2);
          console.log("Parece que encontramos algo...");
          resp = prompt(`Press Enter para continuar`);
          ifGameOver(1, 3, 5);
          statusJogador();
          resp = prompt(`Press Enter para continuar`);

          if (gameOver == true) {
            break;
          }
        } else if (i == 1) {
          console.log(
            `${personagens.jogador.nome} você conseguiu sobreviver ao primeiro dia na floresta, mantenha os olhos atentos.`
          );
          sleep(5);
          let rand = random(1, 2);
          if (rand == 1) {
            console.log("Parece que encontramos algo...");
            resp = prompt(`Press Enter para continuar`);
            ifGameOver(1, 3, 6);
            statusJogador();
            resp = prompt(`Press Enter para continuar`);
            equipamentos.armadura();
            statusJogador();
            sleep(3);
            console.log("Você encontrou uma armadura");
          } else {
            equipamentos.armadura();
            statusJogador();
            resp = prompt(`Press Enter para continuar`);
            sleep(3);
            console.log("Você encontrou uma armadura");
          }
        } else if (i == 2) {
          console.log(
            `${personagens.jogador.nome} vamos passar pela parte mais complicada da floresta, mas você está perto de chegar a cidade, não desiste.`
          );
          console.log("Parece que encontramos algo...");
          resp = prompt(`Press Enter para continuar`);
          ifGameOver(2, 3, 6);
          if (gameOver == true) {
            break;
          }
        }
      }

      /*---------------------------------------------------------Montanhas--------------------------------------------------------------------*/
    }else if (resp == `MONTANHAS`) {
      let dias = 5;
          console.clear()
      //PRÓLOGO DA MONTANHA
          console.log(
        `\nVocê começa a busca por si mesmo, assumindo que encontrar Aerin era o seu destino, mas antes, decide checar seus STATUS, para mensurar seu poder e evolução\n`
      );
          prompt(`Digite ENTER para prosseguir...`);
          console.clear();
          console.log();
  
          statusJogador()
          console.log();
          prompt(`Digite ENTER para prosseguir...`);
          console.clear();
          
          console.log(`\nViajar sobre As Montanhas Gélidas é o caminho mais longo, entretanto é mais seguro que as florestas, não há tantos monstros pelo caminho, mas a escassez de animais e alimentos torna a jornada igualmente complicada\n`);
  
          prompt(`Digite ENTER para prosseguir...`);
          
      for (i = 0; i < dias; i++) {
          //PRIMEIRO DIA
        if (i == 0) {
  
          console.clear();
  
          console.log(`\nLogo pela manhã do primeiro dia de viagem, Você chegou ao pé da montanha e percebeu que precisava estocar alimentos antes de continuar.\n
  Digite o que deseja procurar: FRUTA, ANIMAL OU MONSTRO\n`);
  
          //PRIMEIRA DECISÃO, PREPARAÇÃO PARA A JORNADA
          resp = prompt().toUpperCase().replace(/\s/g, "");
          validacaoString(resp, "FRUTA", "ANIMAL", "MONSTRO");
  
          if (resp === "FRUTA") {
              console.log(
              `\nVocê teve sorte e encontrou rapidamente algumas árvores frutíferas, agora já está alimentado e pronto para continuar com a aventura. Rumo a cidade de Erast`
            );
          } else if (resp === "ANIMAL") {
              console.log(`\nVocê encontrou algumas frutas e as recolheu, mas logo avistou um cervo! Prontamento o atacou para obter carne e usou sua pele para se proteger do frio, que viria mais tarde.\n`);
            
            console.log(`Confira seus STATUS atualizados`)
            personagens.jogador.defesa += 1;
            statusJogador();
  
          } else if (resp === "MONSTRO") {
  
            console.log(`\nVocê procura por um monstro para treinar com o equipamento recém escolhido, visando aumentar seu poder e se possível, se alimentar\n`);
            
              //PRIMEIRA BATALHA SE INICIA
              ifGameOver(1, 3, 5)
              if (gameOver == true) {
                  break;
              
              } else {
              
              console.log(`\nConfira seus STATUS atualizados: \n`);
              personagens.jogador.dano += 1;
              personagens.jogador.vida = vidaMAX;
              statusJogador()
             }
          }
  
          console.log();
          prompt(`Digite ENTER para prosseguir...`);
         
          
  
          //SEGUNDO DIA
           } else if (i == 1) {
              
              console.clear();
              console.log(`\nNa manhã do segundo dia, você se deparou com um tempo incívelmente frio, o sol parecia gelado, o terreno era íngreme e irregular. Apesar da forte neblina você conseguiu avistar uma caverna.\n
  Digite o que deseja fazer: "ENTRAR", "CONTINUAR"\n`);
  
          resp = prompt().toUpperCase().replace(/\s/g,"");
          validacaoString(resp, "ENTRAR", "CONTINUAR");
  
          if (resp === "ENTRAR") {
            
            console.log(`\nVocê entrou na caverna se alimentou do que tinha em sua bolsa e preferiu descansar até o amanhecer do próximo dia\n`);
          } 
          
          else if (resp === "CONTINUAR") {
              
              console.log();
              console.log(`\nVocê se deparou com uma criatura pavorosa, suas únicas opções eram lutar ou morrer!\n`)
              ifGameOver(1, 3, 5);
           
              if (gameOver == true) {
                  break;
  
            } else {
             
              console.log(`\nConfira seus STATUS atualizados: \n`);
              personagens.jogador.vida = vidaMAX;
              personagens.jogador.defesa += 1;
              statusJogador()
            
          }
      
            console.log(
            `\nVocê adentrou as entranhas do monstro derrotado, e esperou até o amanhecer\n`
          );
  
          }
      
          prompt(`Digite ENTER para prosseguir...`);
          console.clear()
       
          
          //TERCEIRO DIA
        } else if (i == 2) {
              
              console.clear();
              console.log(`\nMais um dia se inicia e você já não sabia mais diferenciar manhã, tarde e noite. O sol parecia congelado e a sensação de morte pairava sobre o ar.\n`);
              
              prompt(`Digite ENTER para prosseguir...`);
              console.clear();
              
              console.log(`\nA tarde chegou e você não aguentava mais caminhar, avistou um amontoado de pedras e..\n
  Digite o que deseja fazer: "DESCANSAR", "PERSISTIR"\n`);
  
          resp = prompt().toUpperCase().replace(/\s/g, "");
          validacaoString(resp, "DESCANSAR", "PERSISTIR");
  
          if (resp === "DESCANSAR") {
              
              console.log(
              `\nVocê se deitou sobre a neve se esgueirando entre as pedras. Naquele momento teve a certeza de que se não encontrasse nada no dia seguinte, você morreria de fome\n`
            );
  
            //BONÛS DE PERSISTÊNCIA - FACILITA PASSAR PELO DESAFIO
          } else if (resp === "PERSISTIR") {
              
              console.log(`\nVocê continua andando já cambaleando e com os pés dormentes, até encontrar Yggdrasil a árvore divina, com frutas douradas e imbuídas de magia. Ao recostar sobre a árvore é envolvido em uma aura de calor e plenitude, se tornando completamente resistente ao frio. Você acabou de ganhar 5 de vida máxima e 1 de defesa. Esses são seus STATUS atualizados: \n`);
              vidaMAX+=5
              personagens.jogador.vida=vidaMAX;
              personagens.jogador.defesa += 1;
              statusJogador()
          }
              console.log();
              prompt(`Digite ENTER para prosseguir...`);
             
          
  
          //QUARTO DIA
        } else if (i == 3) {
  
              console.clear()        
              console.log(`\nAo alvorecer do quarto dia de jornada, você avista DOIS monstros vagando livremente, entre as imensas pedras de gelo que haviam acima das montanhas, eles ainda não te viram e você tem a oportunidade de fugir.\n
  Digite o que deseja fazer: "LUTAR", "FUGIR" \n`); 
  
          resp = prompt().toUpperCase().replace(/\s/g, "");
          validacaoString(resp, "LUTAR", "FUGIR");      
  
          if(resp ==="LUTAR" ){
              console.log(`Você não resiste a uma batalha e parte para o ataque!!!\n`)
              ifGameOver(2, 3, 5)   
              
              if (gameOver == true) {
                  break;
  
               }else {
                  personagens.jogador.vida=vidaMAX
                  personagens.jogador.dano += 2;
                  console.log(`\nVocê acabou de adquirir Mjolnir, a arma lendária das Montanhas Gélidas\n
  Digite "SIM" se deseja equipar: `)
  
                  resp = prompt().toUpperCase().replace(/\s/g, "");
                  validacaoString(resp, "SIM"); 
                  
                  if(resp ==='SIM'){
                      
                      personagens.jogador.dano =+2
                      console.clear()
                      console.log(`Você equipou a Mjolnir e sente um poder imenso emanando de sua nova arma\n
  Confira seus STATUS atualizados: \n`)
                      statusJogador()
                  }else{
                  
                  console.log(`\nConfira seus STATUS atualizados: \n`);
                  statusJogador()
            }}
  
          } else if (resp === "FUGIR") {
              
              console.log(
              `\nVocê escapou dos monstros e continuou a caminhar, na esperança de encontrar comida`
            );
              
              console.log();
              prompt(`Digite ENTER para prosseguir...`);
              console.clear();
  
          
          }
  
          console.log();
          prompt(`Digite ENTER para prosseguir...`);
          console.clear();
  
          
          console.log(`\nAo entardecer você finalmente conseguia ver o final da montanha. A cidade de Erast se aproximava a cada passo. Descendo da montanha você encontrou um acampamento com frutas frescas e carne assada na fogueira, ainda acesa.\n
  Digite o que deseja fazer: "COMER", "IGNORAR"\n`);
  
          resp = prompt().toUpperCase().replace(/\s/g, "");
          validacaoString(resp, "COMER", "IGNORAR");
  
          if (resp == "COMER") {
            
            console.log(
              `\nVocê não pensou duas vezes, comeu tudo o que havia ali e fugiu antes que alguém chegasse, continuou a descer As Montanhas Gélidas sem olhar para trás. Até chegar a noite e descansar.`
            );
          } else if (resp == "IGNORAR") {
            
            console.log(`\nVocê estava fraco devido a fome e desmaiou poucos metros após o acampamento. Encontrado por um grupo de aventureiros, você acorda e percebe que essas, são as primeiras pessoas que você viu desde que acordou na caverna. Eles dividem sua comida, bebida e suas histórias com você.`);
          }
  
          console.log();
          prompt(`Digite ENTER para prosseguir...`);
          console.clear();
          
          //QUINTO DIA DA VIAGEM
        } else if (i == 4) {
            
            console.log(`\nÉ um novo dia! Você continua a caminhar e está muito próximo da entrada de Erast. Porém, você ouve o som de gritos pedindo por socorro, vindos do acampamento da última montanha.\n`)
            
          
          prompt(`Digite ENTER para prosseguir...`);
          console.clear()
  
          console.log(`\nVocê volta aé o pequeno acampamento e se depara com monstros furiosos, exterminando facilmente o grupo de aventureiros, você sabia que a culpa era sua, pois haviam seguido seu cheiro.\n
  Digite o que deseja fazer: "LUTAR", "FUGIR"\n`);
  
          resp = prompt().toUpperCase().replace(/\s/g, "");
          validacaoString(resp, "LUTAR", "FUGIR");
          if (resp == "LUTAR") {
  
            ifGameOver(3,3,5)
            if (gameOver == true) {
              break;
  
            } else {
              console.log(`\nConfira seus STATUS atualizados: \n`);
              personagens.jogador.vida = vidaMAX;
              personagens.jogador.dano += 2;
              personagens.jogador.defesa += 2;
              statusJogador()
            }
  
          } else if (resp == "FUGIR") {
            
            console.log(
              `\nVocê fugia enquanto ouvia os gritos de agonia dos jovens aventureiros, mas seguia sem olhar pra trás, porém, três monstros te alcaçam, e a única coisa que te separava do seu destino era essa batalha\n`
            );
  
            ifGameOver(3,3,5)        
            if (gameOver == true) {
              break;
  
            } else {
              console.log(`\nConfira seus STATUS atualizados: \n`);
              personagens.jogador.vida = vidaMAX;
              personagens.jogador.dano += 2;
              personagens.jogador.defesa += 2;
              statusJogador()
            
          }
  
          console.log()
          prompt(`Digite ENTER para prosseguir...`);
          console.clear()
          //FIM DA MONTANHA
        } 
        console.log(`\nVocê finalmente chega nas portas de Erast e apesar de ainda não se lembrar quem é, tem a plena consciência do quanto está mais forte e mais preparado para seguir sua jornada!\n`);
      }
    }
  }
    /*-----------------------------------------------------------------CIDADE--------------------------------------------------------------*/
    if (Cidade) {
      let respCorreta = 0;
      console.log(`Você chega aos portões da cidade de Erast. blablablabla`);
      do {
        //personagem na caverna
        while(true){
        console.log(
          "Diga o que quer fazer: \nDescansar na ESTALAGEM \nPROCURAR por Aerin \nDESISTIR de procurar por Aerin "
        );
        resp = prompt().toUpperCase().replace(/\s/g, "");
        validacaoString(resp, "ESTALAGEM", "PROCURAR", "DESISTIR");        
        if ((resp = "ESTALAGEM")) {
          console.log(
            `Você encontra a estalgem do Cervo Flamejante. A taverna lotada e animada é como música em seus ouvidos, atrás do balcão um meio orc sorridente lhe encara, esperando que você peça algo. Cansado de viagem, lhe resta escolher entre BEBER algo ou subir para a estalgem e DESCANSAR.`
          );
          validacaoString(resp, "BEBER", "DESCANSAR");
          if ((resp = "BEBER")) {
            console.log(
              `Nada melhor depois de uma longa viagem do que beber e comer. Principalmente quando ambos são bons como os de Erast. Enquanto sentava em sua mesa e aproveitava de sua alimentação, você ouviu rumores de um elfo misterioso que comprou uma das casas na cidade alta a pouco tempo, alguns dizem que para fazer experimentos demoníacos.`
            );
            console.log(
              `Após comer e beber, uma bela noite de sono em uma cama de palha lhe aguarda.`
            );
          } else {
            console.log(
              `Cansado de viagem, você não tem nem vontade de se alimentar e vai direto para seu quarto onde uma cama de palha extremamente confortável lhe aguarda.`
            );
          }
        } else if ((resp = "PROCURAR")) {
          console.log(
            `Você sai para procurar por Aerin, com as informações do taverneiro você possui duas opções: procurar na CIDADE ALTA ou na CIDADE BAIXA, para qual você vai?`
          );
          resp = prompt().toUpperCase().replace(/\s/g, "");
          validacaoString(resp, "CIDADEBAIXA", "CIDADEALTA");
          if ("CIDADEBAIXA") {
            console.log(
              `Você prefere procurar na cidade baixa primeiro.\nConforme você se aproxima do porto, o cheiro de peixe e agua salgada entra mais em suas narinas, atacando os seus sentidos. Uma discussão acalorada lhe faz olhar para o lado e enquanto fazia isso você sente algo sendo tirado de você. Uma criança correndo entre a multidão agora carrega sua algibeira de moedas. Sem pensar muito e talvez por puro reflexo você corre atrás dela entre as vielas até chegar em um beco. Sua algibeira no chão, ainda com as moedas lhe faz ter um pensamento repentino: "Armadilha". Tão rapido quanto você pensa isso, um movimento as suas costas já faz com que você saque sua arma, apenas para encontrar um bandido com uma adaga em punho.`
            );
            sleep(3);
            console.log(
              `- Parece que hoje é meu dia de sorte, encontrar um cara famoso como você, com uma recompensa alta e ainda com poucos equipamentos?!?! Parece que tirei a sorte grande!`
            );
            sleep(4);
            console.log(`Antes que você consiga falar algo, o ladrão ataca.`);
            ifGameOver(1, 7, 7);
          } else {
            console.log(
              `Ignorando a cidade baixa você vai para a região nobre da cidade. Casas cada vez maiores, algumas mansões e até guardas patrulhando algumas regiões. Você nao sabe o porque, mas algo lhe deixa desconfortável aqui, um embruho no estomago, como se tudo lhe deixasse enjoado. Quando você senta em um banco para retomar um ar e se recuperar da tontura uma figura se aproxima de você.`
            );
            sleep(5);
            console.log(
              `- Graças aos deuses você chegou, está alguns dias atrasado, comecei a ficar preocupado. Venha, vamos a minha casa para conversarmos com um pouco mais de privacidade.`
            );
            sleep(6);
            console.log(
              `Ao olhar para a figura que fala com você de forma casual você vê um elfo com cabelos avermelhados, trajando uma armadura de couro. Seu rosto genuinamente sorridente apenas potencializa o rosto angular e as orelhas pontudas. Subitamente você o reconhece....`
            );
            sleep(10);
            console.log(`Aerin`);
            sleep(5);
            console.log(
              `Aerin te leva até uma casa relativamente pequena em comparação com as casas a sua volta, mas ainda grande comparada com o resto da cidade. Ao entrarem ele lhe aponta para uma poltrona na sala, ao mesmo tempo que senta em outra diretamente a sua frente.\n-Meu amigo, é realmente muito bom lhe ver novamente, espero que tenha tido uma viagem tranquila - o sorriso em seu rosto se esvai, dando lugar a uma expressão séria - Infelizmente precisarei confirmar algumas coisas com você. Perguntas de rotina você já sabe. Vamos lá.`
            );
            sleep(6);
            console.log(
              `Quando você era criança e me encontrou na floresta pela primeira vez eu lhe dei um item. Era uma estátua de madeira de um animal, que animal era este?\nURSO\n CORUJA\nVACA.`
            );
            resp = prompt().toUpperCase().replace(/\s/g, "");
            validacaoString(resp, "URSO", "CORUJA", "VACA");
            if ((resp = "CORUJA")) {
              console.log(
                `Aerin sorri levemente\n-Fico comovido por você lembrar, muito bem, próxima pergunta.`
              );
              respCorreta++;
            } else {
              console.log(
                `O rosto de Aerin segue sério\n-Sinceramente achei que você lembraria, bem, próxima pergunta.`
              );
            }
            console.log(
              `Numa de suas primeiras batalhas, eu estava presente. Você ainda era um aventureiro iniciante, mas o seu grupo resolveu invadir um covil. O desafio se provou maior do que vocês podiam suportar e eu os resgatei. De que tipos de monstros era o covil? GOBLINS, KOBOLDS ou ORCS?`
            );
            if ((resp = "GOBLINS")) {
              console.log(
                `Um leve alívio aparece brevemente no rosto do elfo\n-Foi um combate complicado, ter que proteger vocês e ao mesmo tempo acabar com aquelas pestes.`
              );
              respCorreta++;
            } else {
              console.log(
                `Aerin suspira, seus olhos demonstram tristeza por alguns segundos e ele logo se recompõem.\n-Uma memória marcante dessas deveria estar gravada em sua mente, pelo que você passou meu amigo? para ter esquecido desse dia.`
              );
            }
            console.log(
              `Última pergunta, e esse interrogatório acabará. Qual das poções você quer tomar, a VERMELHA ou a AZUL?`
            );
            if ((resp = "VERMELHA")) {
              console.log(
                `Você bebe a poção vermelha, sua visão começa a ficar turva assim que você larga a poção de volta na mesa. Aos poucos sua visão fica embaçada enquanto Aerin permanece sentado na poltrona, com os dedos cruzados. Você pisca e ele subitamente é um humano negro e calvo, com óculos escuros. Você pisca novamente e ele volta a ser Aerin o elfo. Você pisca novamente e você está em sua casa, sentado em frente ao seu computador, vendo um RPG de texto se desenrolar em sua frente, talvez um pouco confuso, sem entender direito o que acabou de acontecer, mas com a certeza de que lembrará disso por algum tempo...`
              );
              break;
            } else {
              console.log(
                `Aerin senta novamente na poltrona, feliz por você ter escolhido a poção azul.`,
                respCorreta++
              );
            }
          }
          if (respCorreta >= 2) {
            console.log(
              `Após um momento de silêncio, Aerin abre um grande sorriso.\n-Eu sabia que você era você. Nunca que os espiões do império conseguiriam lhe pegar, muito menos quebrar a sua mente. Venha venha, vamos comemorar hoje, e botar em prática o plano para derrubar esse império maldito amanhã.`
            );
            sleep(6);
            console.log(
              `Vocês dois passam o dia relembrando de histórias do passado, e aos poucos suas memórias retornam, você lembra de sua infancia pobre em uma fazenda, até começar a vida de aventureiro. Após perder o seu grupo para um esquema corrupto do império você e Aerin montam um grupo de resistência, com planos para derrubar os nobres corruptos de Erast. Você não descobre o que aconteceu para que perdesse sua memória, não que isso o incomode muito, mas a sensação de estar sendo observado as vezes ainda lhe dá arrepios.`
            );
            break;
          } else {
            console.log(
              `Aerin pega uma garrafa de vinho, bebe um longo gole e levanta da poltrona lentamente.`
            );
            sleep(6);
            console.log(
              `-Eu não sei o que fizeramcom você velho amigo, mas pelo respeito que ainda guardo por você lhe darei uma morte honrada. EM GUARDA!!!`
            );
            sleep(3);
            console.log(
              `Com um movimento fluido, Aerin saca sua espada e parte para cima de você:`
            );
            do {
              personagens.jogador.vida =
                personagens.jogador.vida -
                personagens.aerin.dano +
                personagens.jogador.defesa;
              personagens.aerin.vida -= personagens.jogador.dano;
            } while (
              personagens.jogador.vida > 0 &&
              personagens.aerin.vida > 0
            );

            if (personagens.jogador.vida > 0) {
              console.log(`Rápido como começou tudo terminou.`);
              sleep(5);
              console.log(
                `Agindo por instinto, você se defendeu e com movimentos rápidos de um avenrureiro veterano você matou Aerin. Durante o combate suas memórias foram retornando. Você lembra de sua infancia pobre em uma fazenda, até começar a vida de aventureiro. Após perder o seu grupo para um esquema corrupto do império você e Aerin montam um grupo de resistência, com planos para derrubar os nobres corruptos de Erast.`
              );
              sleep(10);
              console.log(
                `Ao mesmo tempo que o corpo de seu amigo caía inerte no chão, seus joelhos se dobravam e seus olhos começavam a encher de lágrimas. Uma avalanche de memórias começa a atrapalhar todos os seus sentidos, como a morte de Aerin libertasse todas elas de uma prisão. Uma voz rouca e suave ri no fundo de sua cabeça:`
              );
              sleep(6);
              console.log(`-Bom trabalho, muito bom trabalho. HAHAHAHA....`);
              break;
            } else {
              sleep(5);
              console.log(
                `Agindo por instinto, você se defendeu e mesmo com movimentos rápidos de um aventureiro veterano você não conseguiu derrotar Aerin, ele foi mais rápido e mais forte que você. Junto com o golpe final, Aerin lhe segura e deposita gentilmente no chão:`
              );
              sleep(5);
              console.log(
                `-Vá em paz meu amigo. Irei atrás de quem fez isso com você, e juro pelo meu nome que irei vingá-lo. Descanse agora e nos reencontraremos na outra vida....`
              );
              return (gameOver = true);
            }
          }
        }
        ///////////////////////////////////////////////////////escolha de desistir aqui
      }
      } while (true);
    }
  }
  console.log(
    `Deseja jogar novamente, \x1b[33mSIM\x1b[0m ou \x1b[33mNAO\x1b[0m?`
  );
  resp = prompt().toUpperCase().replace(/\s/g, "");
  validacaoString(resp, "SIM", "NAO");
  if (resp == "NAO") {
    play = false;
  } else if (resp == "SIM") {
    play = true;
  }
  console.clear();
} while (play);
