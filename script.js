var prompt = require('prompt-sync')();

/*=================================================== DECLARAÇÃO DE VARIAVEIS E OBJETOS ===========================================================*/

//ARRAY DE MONSTROS PARA SER USADO NA FUNÇÃO CRIARMONSTRO
var gameOver;
let resp;
let dias = 0;
let vidaMAX;

// MONSTROS
const monstros = [
    {
        nome: 'Aranha Gigante',
        vida: 10,
        defesa: 1,
        dano: [
            { nome: 'teia', dano: 5 },
            { nome: 'mordida', dano: 3 },
        ],
        rota: 'floresta',
    },
    {
        nome: 'Lechen',
        vida: 14,
        defesa: 0,
        dano: [
            { nome: 'pancada', dano: 5 },
            { nome: 'armadilha de raízes', dano: 3 },
        ],
        rota: 'floresta',
    },
    {
        nome: 'Lobo Atroz',
        vida: 10,
        defesa: 2,
        dano: [
            { nome: 'garras', dano: 5 },
            { nome: 'mordida', dano: 3 },
        ],
        rota: 'floresta',
    },
    {
        nome: 'Urso Coruja',
        vida: 10,
        defesa: 3,
        dano: [
            { nome: 'garras', dano: 5 },
            { nome: 'bico', dano: 3 },
        ],
        rota: 'floresta',
    },
    {
        nome: 'Sleipnir',
        vida: 10,
        defesa: 2,
        ddano: [
            { nome: 'cascos', dano: 5 },
            { nome: 'mordida', dano: 3 },
        ],
        rota: 'montanhas',
    },
    {
        nome: 'Anão Bandido',
        vida: 10,
        defesa: 2,
        dano: [
            { nome: 'espada curta', dano: 5 },
            { nome: 'tiro de besta', dano: 3 },
        ],
        rota: 'montanhas',
    },
    {
        nome: 'Fenrir',
        vida: 10,
        defesa: 2,
        dano: [
            { nome: 'garras', dano: 5 },
            { nome: 'mordida', dano: 3 },
        ],
        rota: 'montanhas',
    },
    {
        nome: 'Draugr',
        vida: 10,
        defesa: 2,
        dano: [
            { nome: 'espada enferrujada', dano: 5 },
            { nome: 'pancada com escudo', dano: 3 },
        ],
        rota: 'montanhas',
    },
    {
        nome: 'Caçador de recompensas',
        vida: 10,
        defesa: 2,
        dano: [
            { nome: 'espadas curtas', dano: 5 },
            { nome: 'frasco de ácido', dano: 3 },
        ],
        rota: 'cidade',
    },
];

// PERSONAGENS
const personagens = {
    jogador: {
        nome: 'Jogador',
        vida: 0,
        equip: { nome: 'Ataque desarmado', dano: 4, defesa: 3 },
    },
    aerin: {
        nome: `Aerin`,
        vida: 20,
        defesa: 5,
        dano: random(6, 8),
    },
};
// EQUIPAMENTOS
const equipamentos = {
    machado: function () {
        personagens.jogador.equip.nome = 'Machado';
        personagens.jogador.equip.dano += 3;
        personagens.jogador.equip.defesa -= 3;
    },
    espadaEscudo: function () {
        personagens.jogador.equip.nome = 'Espada Escudo';
        personagens.jogador.equip.dano -= 1;
        personagens.jogador.equip.defesa += 2;
    },
    arco: function () {
        personagens.jogador.equip.nome = 'Arco';
        personagens.jogador.equip.dano += 2;
        personagens.jogador.equip.defesa -= 1;
    },
    armadura: function () {
        personagens.jogador.equip.defesa += 4;
    },
    mjolnir: function () {
        personagens.jogador.equip.dano += 4;
    },
};

/*======================================================= DECLARAÇÃO DAS FUNÇÕES ==================================================================*/
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

//FUNÇÃO PARA RETARDAR O JOGADOR
function continuar() {
    resp = prompt(`Pressione \x1b[33mENTER\x1b[0m para continuar...`);
    console.clear();
    console.log(
        '-----------------------------------------------------------------------------------------',
    );
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
        if (resposta == a || resposta == b || resposta == c || resposta == d) {
            return (resp = resposta);
        } else {
            console.log(`Escolha uma das opções: `);
            resposta = prompt(``).toUpperCase().replace(/\s/g, '');
        }
    }
}

//FUNÇAO DE COMBATE
function mortalKombat(qtd, rota) {
    const monstroLUTA = [];
    let bat;
    let dan;
    let bater;
    let danoMONSTRO = 0;
    let danoJOGADOR = 0;

    for (const m of monstros) {
        if (rota == m.rota) {
            monstroLUTA.push(m);
        }
    }

    for (let i = 0; i < qtd; i++) {
        bat = random(0, monstroLUTA.length - 1);
        sleep(2);
        console.log(`\nVocê encontrou um \x1b[31m${monstroLUTA[bat].nome}\x1b[0m`);
        sleep(3);
        console.log(`\nPrepare-se para a batalha`);
        sleep(4);

        while (personagens.jogador.vida > 0 && monstroLUTA[bat].vida > 0) {
            dan = random(0, monstroLUTA[bat].dano.length - 1);
            bater = random(personagens.jogador.equip.dano - 1, personagens.jogador.equip.dano + 2)

            if (bater > monstroLUTA[bat].defesa) {
                danoJOGADOR = bater - monstroLUTA[bat].defesa;
                monstroLUTA[bat].vida -=
                    bater - monstroLUTA[bat].defesa;
                console.log(
                    `\x1b[32m${personagens.jogador.nome}\x1b[0m usou \x1b[32m${personagens.jogador.equip.nome}\x1b[0m e tirou \x1b[32m${danoJOGADOR}\x1b[0m de dano`,
                );
            } else {
                danoJOGADOR = 0;
                console.log(
                    `\x1b[32m${personagens.jogador.nome}\x1b[0m usou \x1b[32m${personagens.jogador.equip.nome}\x1b[0m e tirou \x1b[32m${danoJOGADOR}\x1b[0m de dano`,
                );
            }
            if (monstroLUTA[bat].dano[dan].dano > personagens.jogador.equip.defesa) {
                danoMONSTRO =
                    monstroLUTA[bat].dano[dan].dano - personagens.jogador.equip.defesa;
                personagens.jogador.vida -=
                    monstroLUTA[bat].dano[dan].dano - personagens.jogador.equip.defesa;
                console.log(
                    `\x1b[31m${monstroLUTA[bat].nome}\x1b[0m usou \x1b[31m${monstroLUTA[bat].dano[dan].nome}\x1b[0m e tirou \x1b[31m${danoMONSTRO}\x1b[0m de dano`,
                );
            } else {
                danoMONSTRO = 0;
                console.log(
                    `\x1b[31m${monstroLUTA[bat].nome}\x1b[0m usou \x1b[31m${monstroLUTA[bat].dano[dan].nome}\x1b[0m e tirou \x1b[31m${danoMONSTRO}\x1b[0m de dano`,
                );
            }

            sleep(3);
            console.log(
                `Sua vida atual: \x1b[33m${personagens.jogador.vida}\x1b[0m:\nVida do monstro: \x1b[33m${monstroLUTA[bat].vida}\x1b[0m\n`,
            );
        }
        if (personagens.jogador.vida > 0) {
            console.log(
                `Parabéns \x1b[32m${personagens.jogador.nome}\x1b[0m, você conseguiu matar \x1b[31m${monstroLUTA[bat].nome}\x1b[0m`,
            );
            gameOver = false;
        } else {
            console.log(
                `\x1b[32m${personagens.jogador.nome}\x1b[0m morreu para um \x1b[31m${monstroLUTA[bat].nome}\x1b[0m`,
            );
            gameOver = true;
            break;
        }
    }
    if(gameOver == false){
        console.log('\nSua vida foi restaurada após a batalha');
        if (vidaMAX > personagens.jogador.vida) personagens.jogador.vida = vidaMAX;

    }
    
}

//FUNÇÃO STATUS DO JOGADOR
function statusJogador() {
    console.log('--------------');
    console.log(`Status de \x1b[32m${personagens.jogador.nome}\x1b[0m:`);
    console.log();
    console.log(
        `\x1b[33mVida\x1b[0m:\t\x1b[32m${personagens.jogador.vida}\x1b[0m\n\x1b[33mDefesa\x1b[0m:\t\x1b[32m${personagens.jogador.equip.defesa}\x1b[0m\n\x1b[33mDano\x1b[0m:\t\x1b[32m${personagens.jogador.equip.dano}\x1b[0m`,
    );
    console.log('--------------');
}

/*================================================================= START GAME ========================================================================*/
do {
    var play = true;
    gameOver = false;
    vidaMAX = 10;
    personagens.jogador.vida = vidaMAX;
    let a = 0;
    let respCorreta = 0;

    console.clear();

    //jogar novamente
    /*============================================================== CAVERNA ==========================================================================*/
    console.log(
        '-----------------------------------------------------------------------------------------',
    );
    sleep(1);
    console.log(
        `O gotejar na caverna te acorda subitamente. Ao abrir lentamente os olhos você sente uma dor de cabeça lancinante, com seus olhos acostumandos a luz baixa da caverna vinda de algum lugar a sua direita, seus pensamentos te levam a um local um pouco aterrorizante...Quem é você?\n`,
    );
    continuar();
    sleep(1);
    console.log(
        `Enquanto tenta vasculhar suas memórias atrás de algo, nada lhe retorna, você abre a boca e consegue falar, boas noticias. Você checa seu corpo e ele está inteiro, mais boas noticias. Ainda sem entender muita coisa você checa seus arredores, percebe que está numa caverna com estalactites acima de você.`,
    );
    sleep(4);

    //LAÇO PARA TRAZER OPÇÕES DA CAVERNA
    do {
        //personagem na caverna
        console.log(
            `Há uma fogueira, agora apenas em brasas, com \x1b[33mCOMIDA\x1b[0m, próximo a ela uma \x1b[33mMOCHILA\x1b[0m e alguns \x1b[33mEQUIPAMENTOS\x1b[0m espalhados. Além é claro, da \x1b[33mSAIDA\x1b[0m da caverna.`,
        );
        console.log('\nO que você quer fazer?');

        resp = prompt().toUpperCase().replace(/\s/g, '');

        validacaoString(resp, 'COMIDA', 'MOCHILA', 'EQUIPAMENTOS', 'SAIDA');
        // console.clear()
        //CONDIÇÃO GAME OVER
        if (resp === 'COMIDA') {
            sleep(1);
            console.log(
                '\nVocê avança até a fogueira e pega alguns pedaços de carnes já quase queimados, pão e um pedaço de queijo que estavam ao lado. Sentindo seu estomago roncar você devora a comida sem pensar duas vezes. Após alguns minutos você começa a sentir sua visão embaçar, a dor de cabeça piorar e logo tudo vai ficando preto, enquanto seu corpo cai em direção ao chão... \x1b[33mVOCÊ MORREU\x1b[0m',
            );
            console.log(
                '-----------------------------------------------------------------------------------------',
            );
            gameOver = true;
            break;
            //CONDIÇÃO DA MOCHILA, MOMENTO IMPORTANTE DA HISTÓRIA PORÉM NÃO FAZ NADA
        } else if (resp === 'MOCHILA' && a == 0) {
            sleep(1);
            console.log(
                `\nNa mochila há algumas roupas e equipamentos básicos de viagem. Junto de um bilhete pedindo para você o encontrar na cidade de Erast. Assinado como Aerin. Tomado por memorias de quando era criança, você lembra de algo:\n\n\x1b[33mQual o seu nome?\x1b[0m`,
            );

            personagens.jogador.nome = prompt();
            console.log();
            continuar();
            a = 1;
        } else if (resp === 'MOCHILA' && a == 1) {
            sleep(1);
            console.log(
                `\nVocê abre a mochila novamente, e vê os mesmos itens e um papel com o seu nome: \x1b[33m${personagens.jogador.nome}\x1b[0m.`,
            );
            continuar();
            //CONDIÇÃO IPORTANTE DE SELEÇÃO DE equipamentos, MAS AINDA NÃO SAI DA CAVERNA
        } else if (resp == 'EQUIPAMENTOS') {
            personagens.jogador.vida = vidaMAX;
            personagens.jogador.dano = random(4, 6);
            personagens.jogador.defesa = 4;
            sleep(1);
            console.log(
                '\nExistem 3 armas dispostas:\n\n\x1b[33mEspada escudo\x1b[0m = \x1b[31m-1\x1b[0m Ataque / \x1b[32m+2\x1b[0m Defesa\n\x1b[33mMachado\x1b[0m = \x1b[32m+3\x1b[0m Ataque / \x1b[31m-3\x1b[0m Defesa\n\x1b[33mArco\x1b[0m = \x1b[32m+2\x1b[0m Ataque / \x1b[31m-1\x1b[0m Defesa',
            );
            //LAÇO PARA USUÁRIO ENTREGAR O VALOR C0RRETO
            console.log();
            resp = prompt().toUpperCase().replace(/\s/g, '');
            validacaoString(resp, 'ESPADAESCUDO', 'MACHADO', 'ARCO');

            if (resp == 'ESPADAESCUDO') {
                equipamentos.espadaEscudo();
            } else if (resp == 'MACHADO') {
                equipamentos.machado();
            } else {
                equipamentos.arco();
            }
            console.log();
            sleep(1);
            statusJogador();
            continuar();
            //CONDIÇÃO PARA SAIDA DA CAVERNA
        } else if (resp == 'SAIDA') {
            sleep(1);
            console.log('\nVocê saiu da caverna');
            sleep(3);
            console.clear();
            break;
        }
        //CONDIÇÃO DE GAME OVER
        if (gameOver == true) break;
    } while (play); ////// Saida da caverna

    while (play) {
        //CONDIÇÃO DE GAME OVER
        if (gameOver == true) break;
        console.log(
            '-----------------------------------------------------------------------------------------',
        );
        sleep(1);
        console.log(
            `Ao sair da caverna, seus olhos demoram alguns segundos para se acostumarem com a luz. O sol brilha alto no céu e o som de passaros e animais rasteiros chega aos seus ouvidos. Andando pela pequena trilha que sai da caverna você chega até uma estrada maior, esta logo se divide em dois caminhos.\n`,
        );

        sleep(4);
        console.log(
            `O caminho da esquerda adentra mais na \x1b[33mFLORESTA\x1b[0m que aos poucos vai ficando mais densa com as copas das arvores competindo com os raios de sol pra ver quem vence.`,
        );

        sleep(3);
        console.log(
            `A segunda trilha começa a subir as \x1b[33mMONTANHAS\x1b[0m com seus picos nevados e cavernas escuras escondendo perigos. Sem conhecer direito do que é capaz, você decide ir por qual caminho?`,
        );

        resp = prompt().toUpperCase().replace(/\s/g, '');
        validacaoString(resp, 'FLORESTA', 'MONTANHAS');

        /*================================================================ FLORESTA =============================================================================*/

        if (resp == 'FLORESTA') {
            dias = 3;
            //Viagem
            console.log(`Sem pensar muito você avança pela floresta, conforme você avança os sons de pequenos animais começa a aumentar. Olhando em volta você até consegue ver alguns coelhos e pássaros seguindo com sua vida em meio as árvores.`)
            sleep(5)
            console.log(`Conforme adentra na floresta, a copa das árvores vão ficando mais altas, o sol vai iluminando o caminho com pequenos feixes de luz que passam por entre as folhas, as vezes enganando sua percepção conforme o vento faz as arvores balançarem. Atento aos seus arredores você se mantém preparado para qualquer coisa.`)
            continuar()
            for (i = 0; i < dias; i++) {
                //PRIMEIRO DIA NA FLOESTA
                if (i == 0) {
                    sleep(2);
                    console.log('Conforme a noite vai caindo, você acha prudente montar um pequeno acampamento para descansar. Sem muita dificuldade você encontra uma pequena clareira, um local perfeito para passar a noite. Seu corpo trabalha mais rápido do que sua mente consegue acompanhar, quando percebe está montando o que parece ser uma armadilha de som ao redor do acampamento, apenas uma corda esticada com utensilhos barulhentos para lhe acordar. Quando percebe o que está fazendo, sua cabeça começa a doer, você fecha os olhos brevemente para suportar a dor...');
                    continuar();
                    console.log(`Ao abrir os seus olhos, você vê uma figura ainda meio disforme lhe explicando como fazer essa armadilha.\n- Se você fizer desta forma, mesmo que esteja dormindo você conseguirá acordar a tempo casao algum animal selvagem resolva visitar seu acampamento. Mantenha-se sempre atento, como as corujas.\nAo dizer isto a figura misteriosa lhe entrega uma pequena estátua de madeira, na forma de uma coruja.\n-Pegue isso como um amuleto de sorte, leve sempre com você e nunca será pego desprevenido.`);
                    continuar();
                    console.log(`Você fecha os olhos novamente com uma pontada de dor novamente. Quando abre os olhos novamente você está novamente montando a armadilha no seu acampamento. Seme ntender direito o que está acontecendo você lembra o nome dessa figura misteriosa.`)
                    sleep(5)
                    console.log(`Aerin`)
                    continuar()
                    console.log(`Você termina de montar a armadilha e re recosta contra uma arvore proximo a fogueira para tentar dormir um pouco. não demora muito para ouvir o som de uma das armadilhas, com um longo suspiro você levanta e se prepara para descobrir o que está se aproximando.`)/*
                    console.log(
                        'A noite cai, o frio desce, mas aqui dentro predomina esse amor que me aquece',
                    ); */
                    sleep(2);
                    mortalKombat(1, 'floresta');
                    if (gameOver == true) break;

                    continuar();
                } else if (i == 1) {
                    sleep(1);
                    console.log(`Após uma noite de descanso, com um pequeno incidente, você monta acampamento e segue pela trilha floresta adentro.\nA floresta vai ficando mais densa conforme você avança. Entre as árvores você nota as vezes algumas teias de aranha enormes, talvez aranhas gigantes habitem aqui.`);
                    sleep(5);
                    let rand = random(1, 2);
                    if (rand == 1) {
                        console.log('Sons de movimento se aproximando chamam sua atenção, parece que algo grande está vindo. Parece que a própria floresta está lhe desafiando...');
                        mortalKombat(random(1, 2), 'floresta');

                        if (gameOver == true) break;

                        sleep(1);
                        console.log('\nApós a batalha você percebe um certo brilho próximo a trilha. Ao se aproximar você encontra o esqueleto do que uma vez foi uma pessoa adulta vestindo uma armadura ainda polida, como se tivesse saído do ferreiro ainda hoje.\n-Mortos não precisam de armaduras - você sussurra antes que consiga pensar.\nSeguindo seu próprio comentário você veste a armadura e continua seguindo a trilha.\nVocê encontrou uma \x1b[33mArmadura de Mitral\x1b[0m');
                        vidaMAX += 5;
                        personagens.jogador.vida = vidaMAX;
                        equipamentos.armadura();
                        statusJogador();
                        continuar();
                    } else {
                        sleep(1);
                        console.log('\nConforme avança na trilha você percebe um brilho entre as arvores, um brilho metálico. Ao se aproximar você encontra o esqueleto do que uma vez foi uma pessoa adulta vestindo uma armadura ainda polida, como se tivesse saído do ferreiro ainda hoje.\n-Mortos não precisam de armaduras - você sussurra antes que consiga pensar.\nSeguindo seu próprio comentário você veste a armadura e continua seguindo a trilha.\nVocê encontrou uma \x1b[33mArmadura de Mitral\x1b[0m');
                        equipamentos.armadura();
                        statusJogador();
                        continuar();
                    }
                } else if (i == 2) {
                    sleep(3);
                    console.log(`\nNo terceiro dia de viagem, você começa realmente a achar que a floresta não lhe quer aqui. O som de animais pequenos correndo pela floresta agora não existe mais, aquelas teias que antes eram esparsas começam a ficar mais comuns e você começa a ouvir uivos distantes. Após algumas horas seguindo a trilha um silêncio incomodo começa a te incomodar.`);
                    continuar();
                    console.log(`Após um tempo quase interminável o silêncio finalmente é quebrado pelo som de algo se aproximando....`)                    
                    sleep(1);
                    console.log('Parece que encontramos algo...');
                    mortalKombat(random(1, 4), 'floresta');
                    if (gameOver == true) break;
                    continuar();
                    console.log(`Ao final do terceiro dia avançando pela trilha, a floresta começa a ficar menos densa, os sons de animais começam a retornar aos poucos e você já consegue ver pedaços do que seria uma cidade ao longe.\n Com o sol quase se pondo você sai da floresta, a sua frente uma grande cidade murada que você reconhece como sendo a cidade de Erast.`)
                }                
            }

            /*================================================================= Montanhas ====================================================================*/
        } else if (resp == `MONTANHAS`) {
            let dias = 5;
            console.clear();
            //PRÓLOGO DA MONTANHA
            sleep(1);
            console.log(
                `Você começa a jornada, a trilha que vai em direção a montanha começa sem dificuldades, conforme você avança a temperatura vai caindo, os ventos vão ficando mais gélidos e seu corpo vai começando a sentir. Quando chega ao pé da montanha você começa a entender melhor o seu corpo e suas capacidades.\n`,
            );

            sleep(3);
            statusJogador();

            continuar();

            sleep(1);
            console.log(
                `Viajar pelas montanhas é um desafio por si só, a temperatura e o terreno são inimigos por si só, além de monstros e outros desafios que lhe aguardam. A escassez de animais e alimentos torna a jornada ainda mais complicada.\n`,
            );

            for (i = 0; i < dias; i++) {
                //PRIMEIRO DIA
                if (i == 0) {
                    sleep(1);
                    console.log(
                        `Pela manhã do primeiro dia de viagem, você chegou ao pé da montanha e se deu conta que precisava estocar alimentos antes de continuar. Olhando em volta rapidamente você percebe algumas arvores com \x1b[33mFRUTAS\x1b[0m, além disso você vê rastros de \x1b[33mANIMAIS\x1b[0m e de pequenos \x1b[33mMONSTROS\x1b[0m, ambos dariam um belo jantar.\n`,
                    );

                    //PRIMEIRA DECISÃO, PREPARAÇÃO PARA A JORNADA
                    resp = prompt().toUpperCase().replace(/\s/g, '');
                    validacaoString(resp, 'FRUTAS', 'ANIMAIS', 'MONSTROS');
                    console.clear();

                    //NÃO GANHA NADA
                    if (resp === 'FRUTAS') {
                        sleep(1);
                        console.log(
                            `\nEncontrando algumas árvores frutíferas você aproveita para consumir algumas e guardar uma boa quantidade para alguns dias de viagem, tendo preparado seus mantimentos, você segue a trilha sinuosa que começa a subir a montanha.`,
                        );
                        continuar();

                        //GANHA DEFESA
                    } else if (resp === 'ANIMAIS') {
                        sleep(1);
                        console.log(
                            `\nSeguindo entre as árvores você encontrou rastros de cervo. Seguir os rastros se mostrou algo fácil e logo você havia abatido o animal, obtendo carnes, gordura e peles, todos uteis para uma viagem pelas montanhas.`,
                        );
                        sleep(2);
                        console.log(
                            `Você ganhou 1 de defesa, confira seus STATUS atualizados\n`,
                        );
                        personagens.jogador.defesa += 1;
                        statusJogador();
                        continuar();

                        //GANHA DANO
                    } else if (resp === 'MONSTROS') {
                        sleep(1);
                        console.log(
                            `\nMais preocupado com a sua segurança, você procura por rastros de monstros para testar seus equipamentos e habilidade. Não demora muito ao encontrar um desafio a altura.`,
                        );

                        //PRIMEIRA BATALHA
                        mortalKombat(1, 'montanhas');
                        if (gameOver == true) break;
                        sleep(2);
                        console.log(
                            `\nVocê ganhou 1 de dano, confira seus STATUS atualizados: \n`,
                        );
                        personagens.jogador.dano += 1;
                        personagens.jogador.vida = vidaMAX;
                        statusJogador();
                        continuar();
                        console.log(`Após o combate você analisa os arredores e percebe um pequeno acampamento, agora sem dono. Sem epnsar duas vezes você reoclhe os mantimentos e se prepara para seguir viagem.`)
                    }

                    //SEGUNDO DIA
                } else if (i == 1) {
                    console.clear();
                    sleep(1);
                    console.log(
                        `\nConforme você avançava pela trilha uma forte nevasca começou a cair, a temperatura começou a cair vertiginosamente e você não conseguia ver muito a sua frente. A trilha segue íngreme e irregular. Pensando rapidamente no que fazer, você pensa em prucurar por uma \x1b[33mCAVERNA\x1b[0m para se abrigar da tempestade ou pode \x1b[33mENFRENTAR\x1b[0m a nevasca e tentar seguir pela trilha.\n`,
                    );

                    resp = prompt().toUpperCase().replace(/\s/g, '');
                    validacaoString(resp, 'CAVERNA', 'ENFRENTAR');
                    console.clear();

                    //SEM RECOMPENSA
                    if (resp === 'CAVERNA') {
                        sleep(1);
                        console.log(
                            `\nVocê preferiu procurar por refugio, sem muita dificuldade encontrou uma pequena caverna não muito longe da trilha. A salvo da nevasca você aproveita para descansar e se alimentar. Subitamente uma dor de cabeça muito forte faz com que você feche os olhos brevemente.`)
                            continuar()
                            console.log(`Ao abrir os seus olhos, você vê uma figura ainda meio disforme lhe explicando os perigos de uma nevasca em meio as montanhas.\n- Sempre qe estiver numa situação dessas, é prudente procurar por abrigo. Nunca se sabe o que se pode encontrar numa nevasca, desde monstros até armadilhas naturais. Seja sábio como as corujas.\nAo dizer isto a figura misteriosa lhe entrega uma pequena estátua de madeira, na forma de uma coruja.\n-Pegue isso como um amuleto de sorte, leve sempre com você e a decisão mais sábia sempre ficará clara.`);
                            continuar();
                            console.log(`Você fecha os olhos novamente com uma pontada de dor novamente. Quando abre os olhos novamente você está sentado na caverna, terminando de organizar seus equipamentos para seguir viagem. Sem entender direito o que está acontecendo você lembra o nome dessa figura misteriosa.`)
                            sleep(5)
                            console.log(`Aerin`)
                            continuar();

                        //ENCONTRA MONSTRO E GANHA STATUS
                    } else if (resp === 'ENFRENTAR') {
                        sleep(2);
                        console.log(
                            `\nEm meio a nevasca uma sombra parece começar a lhe seguir, sem saber direito pra onde conseguiria fugir, sua uníca opção é lutar!`);
                        mortalKombat(1, 'montanhas');

                        if (gameOver == true) break;
                        sleep(1);
                        console.log(
                            `\nVocê ganhou 1 de defesa, confira seus STATUS atualizados: \n`,
                        );
                        personagens.jogador.vida = vidaMAX;
                        personagens.jogador.defesa += 1;
                        statusJogador();

                        sleep(2);
                        console.log(
                            `\nApós derrotar seu inimigo você decide procurar uma caverna para se recompor. Sem muita dificuldade encontrou uma pequena caverna não muito longe da trilha. A salvo da nevasca você aproveita para descansar e se alimentar. Subitamente uma dor de cabeça muito forte faz com que você feche os olhos brevemente.`)
                            continuar()
                            console.log(`Ao abrir os seus olhos, você vê uma figura ainda meio disforme lhe explicando os perigos de uma nevasca em meio as montanhas.\n- Sempre qe estiver numa situação dessas, é prudente procurar por abrigo. Nunca se sabe o que se pode encontrar numa nevasca, desde monstros até armadilhas naturais. Seja sábio como as corujas.\nAo dizer isto a figura misteriosa lhe entrega uma pequena estátua de madeira, na forma de uma coruja.\n-Pegue isso como um amuleto de sorte, leve sempre com você e a decisão mais sábia sempre ficará clara.`);
                            continuar();
                            console.log(`Você fecha os olhos novamente com uma pontada de dor novamente. Quando abre os olhos novamente você está sentado na caverna, terminando de organizar seus equipamentos para seguir viagem. Sem entender direito o que está acontecendo você lembra o nome dessa figura misteriosa.`)
                            sleep(5)
                            console.log(`Aerin`)
                            continuar();
                    }

                    continuar();

                    //TERCEIRO DIA
                } else if (i == 2) {
                    console.clear();
                    sleep(1);
                    console.log(
                        `O terceiro dia começou mais calmo, pelo menos é o que indica o fraco sol que não consegue vencer o frio. Após seguir pela trilha durante o dia todo você começa a sentir a fadiga da viagem. O clima daqui cobra um preço alto de seus viajantes.`);
                    sleep(5);
                    console.log(`Com o final do dia chegando, você avista uma formação de rochas que daria um local muito bom para um acampamento. Com seu corpo cansado mas ao mesmo tempo querendo sair logo da montanha você precisa decidir entre \x1b[33mDESCANSAR\x1b[0m ou \x1b[33mSEGUIR\x1b[0m viagem por mais algumas horas.`);
                    resp = prompt().toUpperCase().replace(/\s/g, '');
                    validacaoString(resp, 'DESCANSAR', 'SEGUIR');
                    console.clear();

                    //PERDE O BONÛS
                    if (resp === 'DESCANSAR') {
                        sleep(1);
                        console.log(
                            `Aproveitando a formação rochosa para se proteger dos ventos, voce monta um pequeno acampamento e acende uma pequena fogueira para se manter aquecido.`,
                        );

                        //BONÛS DE PERSISTÊNCIA - FACILITA PASSAR PELO DESAFIO
                    } else if (resp === 'SEGUIR') {
                        sleep(1);
                        console.log(
                            `Você continuava a caminhar, mal conseguindo permanecer em linha reta, já sem sentir direito suas pernas. Até que você se depara com uma grande árvore próxima a trilha, com frutas douradas e suculentas. Com seu estomago roncando você avança entre a neve em direção a arvore e rapidamente come um dos frutos. Calor se espalha pelo seu corpo, retirando todo o cansaço, lhe revigorando e dando mais força.`);
                            sleep(5)
                            console.log(`Subitamente você acorda no seu acampamento, sem entender quando você montou acampamento você olha em volta procurando pela árvore, apenas para ver grandes rochas lhe protegendo dos ventos.`)
                        sleep(4);
                        console.log(
                            `Você acabou de ganhar 5 de vida máxima e 1 de defesa.\nEsses são seus STATUS atualizados:\n `,
                        );
                        vidaMAX += 5;
                        personagens.jogador.vida = vidaMAX;
                        personagens.jogador.defesa += 1;
                        statusJogador();
                    }

                    continuar();

                    //QUARTO DIA
                } else if (i == 3) {
                    console.log(
                        `Durante o quarto dia de jornada, você avista duas figuras entre as imensas pedras de gelo que haviam acima das montanhas. Eles parecem não ter lhe notado. Pensando nas suas possibilidades você pode tentar passar \x1b[33mESCONDIDO\x1b[0m ou \x1b[33mLUTAR\x1b[0m com as duas figuras para conseguir seguir pela trilha.`,
                    );

                    resp = prompt().toUpperCase().replace(/\s/g, '');
                    validacaoString(resp, 'LUTAR', 'ESCONDIDO');
                    console.clear();

                    //DROP DE ITEM
                    if (resp === 'LUTAR') {
                        sleep(1);
                        console.log(
                            `A vontade de lutar vence e você parte para cima delas com arma em punho.`,
                        );
                        mortalKombat(2, 'montanhas');

                        if (gameOver == true) break;

                        personagens.jogador.vida = vidaMAX;
                        equipamentos.mjolnir();
                        sleep(1);
                        console.log(
                            `Ainda ofegante após a batalha você percebe que uma das figuras carregava consigo um martelo de uma metal fosco com algumas runas nele. Reconhecendo que o item é no mínimo interessante você pode \x1b[33mEQUIPAR\x1b[0m o novo equipamento, ou apenas \x1b[33mGUARDA-LO\x1b[0m para depois tentar vendê-lo\n`,
                        );

                        resp = prompt().toUpperCase().replace(/\s/g, '');
                        validacaoString(resp, 'EQUIPAR', 'GUARDA-LO');
                        console.clear();

                        if (resp === 'EQUIPAR') {
                            sleep(2);
                            personagens.jogador.dano += 2;
                            console.clear();
                            console.log(
                                `Você segura o martelo e dá alguns golpes no ar para senti-lo, é uma arma pesada porém muito bem equilibrada. Por vim decide usá-lo em seus próximos combates.\nVocê ganhou 2 de dano, confira seus STATUS atualizados: \n`,
                            );
                            statusJogador();
                            continuar();
                        } else if (resp === 'GUARDA-LO') {
                            sleep(2);
                            console.log(`Você segura o martelo e dá alguns golpes no ar para senti-lo, é uma arma pesada porém muito bem equilibrada. Decidindo por fim que ela não faz muito seu estilo você a guarda para depois talvez negociá-la com algum mercador.\n`);
                            continuar();
                        }

                        //PERDE O ITEM SAGRADO
                    } else if (resp === 'ESCONDIDO') {
                        console.clear();
                        sleep(1);
                        console.log(
                            `Você passa agaixado pelas pedras a alguns metros da trilha, as duas figuras seguem pela trilha na direção de onde você veio. Ao voltar para a trilha você ainda dá algumas olhada para trás para garantir que não estão lhe seguindo.`,
                        );
                    }

                    sleep(2);
                    console.log(
                        `\nCom o dia quase terminando você chegou ao outro lado da montanha, a partir daqui a trilha começa a descer. Você avista ao longe, aos pés da montanha uma grande cidade murada, que você reconhece como sendo a cidade de Erast. Enquanto desce pela trilha você avista um acampamento recém montado, porém vazio.`)
                        continuar()
                        console.log(`Olhando em volta você não percebe nenhum movimento estranho, a fogueira do acampamento ainda está acesa, inclusive com um pouco de comida sendo preparada. Com seu estômago roncando você decide \x1b[33mINVESTIGAR\x1b[0m o acampamento e no processo comer a comida ou apenas \x1b[33mIGNORAR\x1b[0m o acampamento e seguir pela trilha?\n`);

                    //HISTÓRIA
                    resp = prompt().toUpperCase().replace(/\s/g, '');
                    validacaoString(resp, 'INVESTIGAR', 'IGNORAR');
                    console.clear();

                    if (resp === 'INVESTIGAR') {
                        sleep(1);
                        console.log(
                            `O estomago ronca uma segunda vez e seu instinto é mais rapido do que a logica. Você vai até a fogueira e começa a comer ainda atento a qualquer movimentação. Tendo matado sua fome você vasculha o acampamento e encontra mais algumas rações de viagem, aparentemente o suficiente para chegar até a cidade.`);
                        continuar()
                        console.log(`Algumas dezenas de metros adiante na trillha você cruza com um grupo de aventureiros subindo pela trilha, eles estão com alguns ferimentos mas lhe convidam para se juntar a eles em seu acampamento um pouco acima na trilha.`)
                        sleep(5)
                        console.log(`Entendendo que voc6e acabou de roubar deles, você educadamente recusa o convite, dizendo que precisa chegar rápido a cidade.\n Assim que você sai da visão deles você caminha mais rápido para evitar que lhe sigam.`)
                    } else if (resp === 'IGNORAR') {
                        sleep(1);
                        console.log(
                            `Mesmo com o estômago roncando você não se rende a algo desonroso. Engolindo em seco você segue viagem, comendo os restos dos seus suprimentos e torcendo para encontrar algo para comer no caminho. Após algumas dezenas de metros você encontra com um grupo de aventureiros subindo a trilha. Após ume breve conversa eles lhe convidam para o acampamento deles e dividem seus mantimentos assim como algumas histórias.\nApós algumas horas você segue sua viagem, não querendo atrapalhar mais o grupo de aventureiros.`);
                    }

                    continuar();

                    //QUINTO DIA DA VIAGEM
                } else if (i == 4) {
                    console.clear();
                    sleep(1);
                    console.log(
                        `Amanhece e o frio começa a dar uma trégua, talvez por você estar quase chegando ao final da montanha. Você checa seus equipamentos e segue viagem, com animo renovado. Após algumas horas de caminhada você ouve o som de gritos e som de batalha, vindos da direção do acampamento do dia anterior.\n`,
                    );
                    continuar()
                    /* console.log(
                        `Você volta rapidamente para ver o que havia ali e se depara com monstros, exterminando facilmente o grupo de aventureiros, você sabia que a culpa era sua, pois haviam seguido seu cheiro.\n`,
                    );

                    sleep(6); */
                    console.log(
                        `Imaginando que algumas criaturas tenham descido a montanha seguindo seus rastros você se ve dividido entre ajudar os jovens aventureiros e \x1b[33mLUTAR\x1b[0m ou ignorar completamente e \x1b[33mSEGUIR\x1b[0m viagem.\n`,
                    );

                    resp = prompt().toUpperCase().replace(/\s/g, '');
                    validacaoString(resp, 'LUTAR', 'SEGUIR');
                    console.clear();

                    //DESAFIO FINAL DA MONTANHA
                    if (resp == 'LUTAR') {
                        console.log(`Você decide ajudar e sobe a trilha rapidamente apenas para ver os aventureiros perdendo a luta. Com sua arma em mãos você avança gritando para chamar atenção das criaturas.`)
                        mortalKombat(3, 'montanhas');
                        if (gameOver == true) break;
                        sleep(1);
                        console.log(
                            `\nVocê ganhou 2 de defesa e 2 de dano, confira seus STATUS atualizados: \n`,
                        );
                        personagens.jogador.vida = vidaMAX;
                        personagens.jogador.dano += 2;
                        personagens.jogador.defesa += 2;
                        statusJogador();
                        continuar();

                        //DESAFIO FINAL, IMPOSSÍVEL FUGIR
                    } else if (resp === 'SEGUIR') {
                        sleep(1);
                        console.log(
                            `\nVocê segue a trilha enquanto os sons de batalha e gritos chegam aos seus ouvidos, porém, o som de galhos quebrando e criaturas se aproximando lhe fazem olhar para trás a tempo de ver algumas vindo em sua direção. Suspirando você prepara sua arma e se prepara para lutar.`,
                        );

                        mortalKombat(3, 'montanhas');
                        if (gameOver == true) break;
                        sleep(3);
                        //RECOMPENSA COM BONUS DE STATUS
                        console.log(
                            `\nVocê ganhou 2 de defesa e 2 de dano, confira seus STATUS atualizados: \n`,
                        );
                        personagens.jogador.vida = vidaMAX;
                        personagens.jogador.dano += 2;
                        personagens.jogador.defesa += 2;
                        statusJogador();
                        continuar();
                    } //FIM DA MONTANHA
                }
            }
        }

        if (gameOver == true) break;

        /*=================================================================== CIDADE ===================================================================*/
        console.clear();
        sleep(1);
        console.log(
            `\nVocê se aproxima dos grandes muros que protegem a cidade de Erast, os portões de ferro, agora abertos apra permitir a passagem dos aldeões, é vigiado por guardas no chão e nas duas torres da entrada. Com um pouco de apreensão você passa pelo portão, os guardas nem olham para você.`,
        );
        sleep(3);
        console.log(
            `\nAo caminhar pelas ruas largas da cidade, em meio ao burburinho da multidão você se sente renovado por estar de volta a civilização, longe das terras devastadas onde vivem os goblins selvagens.`,
        );
        sleep(3);
        console.log(
            `\nA passos largos você avança até a praça central, olhando em volta você vê mercadores, trabalhadores e todo tipo de pessoas e raças. Ao ver todas essas pessoas uma dor de cabeça lancinante lhe deixa levemente tonto, você lembra de Aerin, na sua infância lhe dando algo. Tão rápido quanto veio a dor ela sumiu, mas a memória permanece.`,
        );
        continuar();

        do {
            ///CIDADE TODA
            sleep(1);
            console.log(
                '\nApós aproveitar brevemente a cidade você começa a pensar no que fazer. \nvocê encontra uma \x1b[33mESTALAGEM\x1b[0m próxima a praça central, pelos barulhos uma das mais movimentas. Você pode \x1b[33mPROCURAR\x1b[0m por Aerin na cidade. Parando para pensar, você poderia voltar pelo portão e \x1b[33mDESISTIR\x1b[0m de encontrar a pessoa de suas memórias também.\n',
            );
            resp = prompt().toUpperCase().replace(/\s/g, '');
            validacaoString(resp, 'ESTALAGEM', 'PROCURAR', 'DESISTIR');
            console.clear();

            if (resp === 'DESISTIR') {
                sleep(1);
                console.log(
                    `\nAo olhar para os grandes portões da cidade e ver toda aquela vida ali dentro subitamente uma idéia passa pela sua cabeça:`,
                );
                continuar();
                sleep(1);
                console.log(
                    `\nSe você não lembra do seu passado, é quase como se você não tivesse um.\n- Nada melhor do que começar uma vida nova em outro lugar - você fala para si mesmo, em um sussurro.`,
                );
                continuar();
                sleep(1);
                console.log(
                    `\nSem olhar para trás você parte para a próxima cidade, indo para longe de Erast, pronto para iniciar uma nova vida. O que o futuro lhe reserva? Ninguém sabe. Mas isso não irá lhe impedir de tentar...`,
                );
                quebra = true;
                gameOver = true;
                break;
            } else if (resp === 'ESTALAGEM') {
                sleep(1);
                console.log(
                    `\nVocê encontra a estalagem do Cervo Flamejante. A taverna lotada e animada é como música em seus ouvidos, atrás do balcão um meio orc sorridente lhe encara, esperando que você peça algo. Cansado de viagem, lhe resta escolher entre \x1b[33mBEBER\x1b[0m algo ou subir para a estalgem e \x1b[33mDESCANSAR\x1b[0m.`,
                );

                validacaoString(resp, 'BEBER', 'DESCANSAR');
                console.clear();

                if (resp === 'BEBER') {
                    sleep(1);
                    console.log(
                        `\nNada melhor depois de uma longa viagem do que beber e comer. Principalmente quando ambos são bons como os de Erast. Enquanto sentava em sua mesa e aproveitava de sua alimentação, você ouviu rumores de um elfo misterioso que comprou uma das casas na cidade alta a pouco tempo, alguns dizem que para fazer experimentos demoníacos.`,
                    );
                    sleep(4);
                    console.log(
                        `\nApós comer e beber, uma bela noite de sono em uma cama de palha lhe aguarda.`,
                    );
                    continuar();
                } else {
                    sleep(1);
                    console.log(
                        `\nCansado de viagem, você não tem nem vontade de se alimentar e vai direto para seu quarto onde uma cama de palha extremamente confortável lhe aguarda.`,
                    );
                    continuar();
                }
            } else if (resp === 'PROCURAR') {
                while (true) {
                    sleep(1);
                    console.log(
                        `\nVocê sai para procurar por Aerin, com as informações do taverneiro você possui duas opções: procurar na \x1b[33mCIDADE ALTA\x1b[0m ou na \x1b[33mCIDADE BAIXA\x1b[0m, para qual você vai?\n`,
                    );
                    resp = prompt().toUpperCase().replace(/\s/g, '');
                    validacaoString(resp, 'CIDADEBAIXA', 'CIDADEALTA');
                    console.clear();

                    if (resp == 'CIDADEBAIXA') {
                        sleep(1);
                        console.log(
                            `\nVocê prefere procurar na cidade baixa primeiro.\nConforme você se aproxima do porto, o cheiro de peixe e agua salgada entra mais em suas narinas, atacando os seus sentidos. Uma discussão acalorada lhe faz olhar para o lado e enquanto fazia isso você sente algo sendo tirado de você. Uma criança correndo entre a multidão agora carrega sua algibeira de moedas. Sem pensar muito e talvez por puro reflexo você corre atrás dela entre as vielas até chegar em um beco. Sua algibeira no chão, ainda com as moedas lhe faz ter um pensamento repentino: "Armadilha". Tão rapido quanto você pensa isso, um movimento as suas costas já faz com que você saque sua arma, apenas para encontrar um bandido com uma adaga em punho.`,
                        );
                        continuar();
                        sleep(1);
                        console.log(
                            `\n- Parece que hoje é meu dia de sorte, encontrar um cara famoso como você, com uma recompensa alta e ainda com poucos equipamentos?!?! Parece que tirei a sorte grande!`,
                        );
                        sleep(10);
                        console.log(
                            `\nAntes que você consiga falar algo, o ladrão ataca.`,
                        );
                        mortalKombat(1, 'cidade');
                        if (gameOver == true) break;
                    } else {
                        let aerinEncontro = 1;
                        sleep(1);
                        console.log(
                            `\nIgnorando a cidade baixa você vai para a região nobre da cidade. Casas cada vez maiores, algumas mansões e até guardas patrulhando algumas regiões. Você nao sabe o porque, mas algo lhe deixa desconfortável aqui, um embruho no estomago, como se tudo lhe deixasse enjoado. Quando você senta em um banco para retomar um ar e se recuperar da tontura uma figura se aproxima de você.`,
                        );
                        continuar();
                        sleep(1);
                        console.log(
                            `\n- Graças aos deuses você chegou, está alguns dias atrasado, comecei a ficar preocupado. Venha, vamos a minha casa para conversarmos com um pouco mais de privacidade.`,
                        );
                        continuar();
                        sleep(1);
                        console.log(
                            `\nAo olhar para a figura que fala com você de forma casual você vê um elfo com cabelos prateados, trajando uma armadura de couro. Seu rosto genuinamente sorridente apenas potencializa o rosto angular e as orelhas pontudas. Subitamente você o reconhece....`,
                        );
                        sleep(10);
                        console.log(`Aerin`);
                        break;
                    }
                }
                if ((aerinEncontro = 1)) {
                    continuar();
                    sleep(1);
                    console.log(
                        `\nAerin te leva até uma casa relativamente pequena em comparação com as casas a sua volta, mas ainda grande comparada com o resto da cidade. Ao entrarem ele lhe aponta para uma poltrona na sala, ao mesmo tempo que senta em outra diretamente a sua frente.\n-Meu amigo, é realmente muito bom lhe ver novamente, espero que tenha tido uma viagem tranquila - o sorriso em seu rosto se esvai, dando lugar a uma expressão séria - Infelizmente precisarei confirmar algumas coisas com você. Perguntas de rotina você já sabe. Vamos lá.`,
                    );
                    continuar();
                    sleep(1);
                    console.log(
                        `\nQuando você era criança e me encontrou na floresta pela primeira vez eu lhe dei um item. Era uma estátua de madeira de um animal, que animal era este?\n\x1b[33mURSO\x1b[0m\n\x1b[33mCORUJA\x1b[0m\n\x1b[33mVACA\x1b[0m.\n`,
                    );
                    resp = prompt().toUpperCase().replace(/\s/g, '');
                    validacaoString(resp, 'URSO', 'CORUJA', 'VACA');

                    if (resp === 'CORUJA') {
                        sleep(1);
                        console.log(
                            `\nAerin sorri levemente\n-Fico comovido por você lembrar, muito bem, próxima pergunta.`,
                        );
                        continuar();
                        respCorreta++;
                    } else {
                        sleep(1);
                        console.log(
                            `\nO rosto de Aerin segue sério\n-Sinceramente achei que você lembraria, bem, próxima pergunta.`,
                        );
                        continuar();
                    }
                    sleep(1);
                    console.log(
                        `\nNuma de suas primeiras batalhas, eu estava presente. Você ainda era um aventureiro iniciante, mas o seu grupo resolveu invadir um covil. O desafio se provou maior do que vocês podiam suportar e eu os resgatei. De que tipos de monstros era o covil? \x1b[33mGOBLINS\x1b[0m, \x1b[33mKOBOLDS\x1b[0m ou \x1b[33mORCS\x1b[0m?\n`,
                    );
                    resp = prompt().toUpperCase().replace(/\s/g, '');
                    validacaoString(resp, 'GOBLINS', 'KOBOLDS', 'ORCS');

                    if (resp == 'GOBLINS') {
                        sleep(1);
                        console.log(
                            `\nUm leve alívio aparece brevemente no rosto do elfo\n-Foi um combate complicado, ter que proteger vocês e ao mesmo tempo acabar com aquelas pestes.`,
                        );
                        continuar();
                        respCorreta++;
                    } else {
                        sleep(1);
                        console.log(
                            `\nAerin suspira, seus olhos demonstram tristeza por alguns segundos e ele logo se recompõem.\n-Uma memória marcante dessas deveria estar gravada em sua mente, pelo que você passou meu amigo? para ter esquecido desse dia.`,
                        );
                        continuar();
                    }
                    sleep(1);
                    console.log(
                        `\nÚltima pergunta, e esse interrogatório acabará. Qual das poções você quer tomar, a  \x1b[33mVERMELHA\x1b[0m ou a \x1b[33mAZUL\x1b[0m?\n`,
                    );
                    resp = prompt().toUpperCase().replace(/\s/g, '');
                    validacaoString(resp, 'VERMELHA', 'AZUL');
                    if (resp === 'VERMELHA') {
                        sleep(2);
                        console.log(
                            `\nVocê bebe a poção vermelha, sua visão começa a ficar turva assim que você larga a poção de volta na mesa. Aos poucos sua visão fica embaçada enquanto Aerin permanece sentado na poltrona, com os dedos cruzados. Você pisca e ele subitamente é um humano negro e calvo, com óculos escuros. Você pisca novamente e ele volta a ser Aerin o elfo. Você pisca novamente e você está em sua casa, sentado em frente ao seu computador, vendo um RPG de texto se desenrolar em sua frente, talvez um pouco confuso, sem entender direito o que acabou de acontecer, mas com a certeza de que lembrará disso por algum tempo...`,
                        );
                        continuar();
                        gameOver = true;
                        break;
                    } else {
                        sleep(1);
                        console.log(
                            `\nAerin senta novamente na poltrona, feliz por você ter escolhido a poção azul.`,
                            respCorreta++,
                        );
                    }
                }
                continuar();
                if (respCorreta > 2) {
                    /////FINAL DA CAMARADAGEM
                    sleep(1);
                    console.log(
                        `\nApós um momento de silêncio, Aerin abre um grande sorriso.\n-Eu sabia que você era você. Nunca que os espiões do império conseguiriam lhe pegar, muito menos quebrar a sua mente. Venha venha, vamos comemorar hoje, e botar em prática o plano para derrubar esse império maldito de Constant amanhã.`,
                    );
                    continuar();

                    sleep(1);
                    console.log(
                        `\nVocês dois passam o dia relembrando de histórias do passado, e aos poucos suas memórias retornam, você lembra de sua infancia pobre em uma fazenda, até começar a vida de aventureiro. Após perder o seu grupo para um esquema corrupto do império você e Aerin montam um grupo de resistência, com planos para derrubar os nobres corruptos de Erast. Você não descobre o que aconteceu para que perdesse sua memória, não que isso o incomode muito, mas a sensação de estar sendo observado as vezes ainda lhe dá arrepios.`,
                    );
                    gameOver = true;
                    break;
                } else {
                    console.log(
                        `\nAerin pega uma garrafa de vinho, bebe um longo gole e levanta da poltrona lentamente.`,
                    );
                    sleep(5);
                    console.log(
                        `\n-Eu não sei o que fizeram com você velho amigo, mas pelo respeito que ainda guardo por você lhe darei uma morte honrada. EM GUARDA!!!`,
                    );
                    sleep(2);
                    console.log(
                        `\nCom um movimento fluido, Aerin saca sua espada e parte para cima de você:`,
                    );
                    do {
                        if (personagens.aerin.dano > personagens.jogador.defesa) {
                            personagens.jogador.vida -=
                                personagens.aerin.dano + personagens.jogador.defesa;
                            personagens.aerin.vida -=
                                personagens.jogador.dano + personagens.aerin.defesa;
                        } else {
                            personagens.aerin.vida -= personagens.jogador.dano;
                        }
                        console.log(
                            `Sua vida atual: \x1b[31m${personagens.jogador.vida}\x1b[0m:\nVida de Aerin: \x1b[31m${monstros[a].vida}\x1b[0m\n`,
                        );
                    } while (personagens.jogador.vida > 0 && personagens.aerin.vida > 0);

                    if (personagens.jogador.vida > 0) {
                        console.log(`\nRápido como começou tudo terminou.`);
                        continuar();
                        sleep(1);
                        console.log(
                            `\nAgindo por instinto, você se defendeu e com movimentos rápidos de um avenrureiro veterano você matou Aerin. Durante o combate suas memórias foram retornando. Você lembra de sua infancia pobre em uma fazenda, até começar a vida de aventureiro. Após perder o seu grupo para um esquema corrupto do império você e Aerin montam um grupo de resistência, com planos para derrubar os nobres corruptos de Erast.`,
                        );
                        continuar();
                        sleep(1);
                        console.log(
                            `\nAo mesmo tempo que o corpo de seu amigo caía inerte no chão, seus joelhos se dobravam e seus olhos começavam a encher de lágrimas. Uma avalanche de memórias começa a atrapalhar todos os seus sentidos, como a morte de Aerin libertasse todas elas de uma prisão. Uma voz rouca e suave ri no fundo de sua cabeça:`,
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
                            `\nAgindo por instinto, você se defendeu e mesmo com movimentos rápidos de um aventureiro veterano você não conseguiu derrotar Aerin, ele foi mais rápido e mais forte que você. Junto com o golpe final, Aerin lhe segura e deposita gentilmente no chão:`,
                        );
                        sleep(8);
                        console.log(
                            `\n-Vá em paz meu amigo. Irei atrás de quem fez isso com você, e juro pelo meu nome que irei vingá-lo. Descanse agora e nos reencontraremos na outra vida....`,
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
    console.log(`\nDeseja jogar novamente, \x1b[33mSIM\x1b[0m ou \x1b[33mNAO\x1b[0m?\n`);

    resp = prompt().toUpperCase().replace(/\s/g, '');
    validacaoString(resp, 'SIM', 'NAO');
    console.log();

    if (resp == 'NAO') {
        play = false;
    } else if (resp == 'SIM') {
        play = true;
    }
    console.clear();
} while (play);
