
console.clear();
console.log();

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
function mortalKombat(a = 0) {
    do {
        personagens.jogador.vida = personagens.jogador.vida - monstros[a].dano + personagens.jogador.defesa;
        monstros[a].vida = monstros[a].vida - personagens.jogador.dano;
    } while (personagens.jogador.vida > 0 && monstros[a].vida > 0);

    if (personagens.jogador.vida > 0) {
        return gameOver = false;
    } else {
        return gameOver = true;
    }
}

//VIAGEM
const journey = 'MONTANHA'

if (journey == `MONTANHA`) {
    let resp;
    const dias = 5;

    //VIAGEM
    console.log(`**** partiu em sua jornada em busca de si mesmo, e assumiu que encontrar Aerin era o o seu destino, mas antes decide checar os seus STATUS, para mensurar o seu poder e evolução`)
    console.log()
    prompt(`Digite ENTER para prosseguir...`)
    console.clear();
    console.log();

    console.table(personagens.jogador)
    prompt(`Digite ENTER para prosseguir...`)
    console.clear();
    console.log();

    console.log(`Caminhar sobre As Montanhas Gélidas é o caminho mais longo, apesar de ser mais seguro que a Floresta **** ,
pois não há tantos monstros pelo caminho. Porém, a escassez de animais e alimentos torna a jornada igualmente complicada`)

    console.log()
    prompt(`Digite ENTER para prosseguir...`)
    console.clear();
    console.log();


    for (i = 0; i < dias; i++) {
        if (i == 0) {
            console.log(`Logo pela manhã, do primeiro dia de viagem, ****  chegou ao pé da montanha e percebeu que precisava estocar alimentos antes de continuar.
Digite o que deseja procurar: FRUTA, ANIMAL OU MONSTRO\n`);

            resp = prompt().toUpperCase().replace(/\s/g, "");
            validacaoString(resp, 'FRUTA', 'ANIMAL', 'MONSTRO');

            if (resp === 'FRUTA') {                
                console.log();
                console.log(`Você teve sorte e encontrou rapidamente algumas árvores frutíferas, agora já está alimentado e pronto para continuar com a aventura. Romo a cidade de Erast`)

            } else if (resp === 'ANIMAL') {
                console.log();
                console.log(`Você encontrou algumas frutas e as recolheu, mas logo avistou um cervo!
prontamento o atacou para obter carne e usou sua pele para se proteger do frio que viria. O dia se encerra com **** pronto para finalmente subir As Montanhas Gélidas`)

            } else if (resp === 'MONSTRO') {
                console.log();
                console.log(`Você procura por um monstro para treinar com o equipamento recém escolhido em busca 
de aumentar seu poder, proeficiencia e se alimentar de sua carne`);
                criarMonstro(1, 3, 5)
                mortalKombat();

                if (gameOver == true) {
                    console.log();
                    console.log(`GAME OVER - Você morreu para um ${monstros[0].nome}`);
                    break

                } else {
                    personagens.jogador.vida = 10
                    console.log();
                    console.log(`Parabéns você lutou por uma tarde inteira e derrotou um ${monstros[0].nome}. 
Sua vida foi recuperada após a batalha, esses são seus STATUS atualizados: \n`);
                    personagens.jogador.dano += 1
                    personagens.jogador.defesa += 1
                    personagens.jogador.vida = 10;
                    console.table(personagens.jogador)
                }
    
            }   console.log()
                prompt(`Digite ENTER para prosseguir...`)
                console.clear();
                console.log();

        } else if(i==1){
            console.log(`Na manhã do segundo dia, **** se deparou com um tempo incívelmente frio, já em cima da montanha, o sol parecia gelado, o terreno era íngreme e irregular, *** se sentia cada vez mais pesado, mas segue caminhando. Apesar da forte neblina **** conseguiu avistar uma caverna.
Digite o que deseja fazer: "ENTRAR", "CONTINUAR"\n`)

            resp = prompt().toUpperCase().replace(/\s/g, "");
            validacaoString(resp, 'ENTRAR', 'CONTINUAR');

            if(resp=== 'ENTRAR'){
                console.log();
                console.log(`você entrou na caverna se alimentou do que tinha em sua bolsa e preferiu descansar até o amanhecer do próximo dia`)
           
            }else if(resp==='CONTINUAR'){
                criarMonstro(1,3,5)
                console.log();
                console.log(`Você seguiu caminhando até que encontra um ${monstros[0].nome} e suas únicas opções são lutar ou morrer!`)
                mortalKombat()
           
            if (gameOver == true){
                console.log();
                console.log(`GAME OVER - Você morreu para um ${monstros[0].nome}`);
                break
                
            } else{
                console.log();
                console.log(`Parabéns você derrotou um ${monstros[0].nome}.
Sua vida foi recuperada após a batalha e esses são seus STATUS atualizados: \n`);
                personagens.jogador.vida = 10
                personagens.jogador.dano+= 1
                personagens.jogador.defesa+= 1
                console.table(personagens.jogador)
            
            } }  console.log(`Você adentrou as entranhas do monstro derrotado, e esperou até o amanhecer\n`);
                prompt(`Digite ENTER para prosseguir...`)
                console.clear();
                console.log()
        
            }  else if(i == 2){

                console.log(`Mais um dia se inicia e **** já não sabia mais diferenciar manhã, tarde e noite, nesse ponto infernal da jornada.
O sol parecia congelado no pico daquela montanha, no horizonte havia o branco e o nada, a pele do cervo já não o aquecia mais`)
                console.log()
                prompt(`Digite ENTER para prosseguir...`)
                console.clear();
                console.log()
                console.log(`A tarde chegou e você não aguentava mais caminhar, avistou um amontoado de pedras e:
Digite o que deseja fazer: "DESCANSAR", "PERSISTIR"\n`)

            resp = prompt().toUpperCase().replace(/\s/g, "");
            validacaoString(resp, "DESCANSAR", "PERSISTIR");
           
            if(resp === "DESCANSAR"){
                console.log();
                console.log(`Você se deitou sobre a neve esgueirado entre as pedras e naquele momento teve a certeza de que se não encontrasse nada no dia seguinte, você morreria`)
            
            }else if(resp==="PERSISTIR"){
                console.log();
                console.log(`Você continua andando já canbaleando e com os pés dormentes, até encontrar Ygdrassil a árvore divina, com frutas douradas e imbuídas de magia. 
Ao comer do fruto mágico e recostar sobre a árvore é envolvido de calor e plenitude, se tornando completamente resistente ao frio.
**** acabou de ganhar 5 de vida máxima e 1 de defesa. Esses são seus STATUS atualizados: \n`)
                personagens.jogador.vida +=5
                personagens.jogador.defesa+= 1
                console.table(personagens.jogador)

            }   console.log()
                prompt(`Digite ENTER para prosseguir...`)
                console.clear();
                console.log()
        

            }else if(i==3){
                console.log(`Ao ao alvorecer do quarto dia de jornada, **** se deparou com um urso polar, o primeiro animal que você havia visto desde que caminhava sobre as monstanhas.
Digite o que deseja fazer: "ATACAR", "IGNORAR"\n`)
                resp = prompt().toUpperCase().replace(/\s/g, "");
                validacaoString(resp, "ATACAR", "IGNORAR");
                
                if(resp ==="ATACAR"){
                    console.log();
                    console.log(`**** atacou o animal e o matou sem grandes dificuldades, se alimentou de sua carne e trocou sua capa de cervo pela pele grossa do urso polar, que o torna quase imperceptível na névoa incessante das Montanhas Gélidas`)
                }else if (resp ==="IGNORAR"){
                    console.log();
                    console.log(`**** ignorou o urso polar e continuou a caminhar, na esperança de encontrar outros animais`);

                }   console.log()
                    prompt(`Digite ENTER para prosseguir...`)
                    console.clear();
                    console.log()
                    console.log(`Ao entardecer **** finalmente conseguia ver o final da montanha, ao leste você via o Império de Constant, em frente a Cidade de Erast e ao sul a Floresta Oculta, lugar onde Aerin havia nascido.
**** correu em direção ao pé da montanha e antes de chegar ao final, encontrou um acampamento com comida fresca, frutas e carne assada na fogueira, ainda acesa.
Digite o que deseja fazer: "COMER", "IGNORAR"\n`)
                   
                    resp = prompt().toUpperCase().replace(/\s/g, "");
                    validacaoString(resp, "COMER", "IGNORAR");
                if(resp =="COMER"){
                    console.log()
                    console.log(`Você não pensou duas vezes, comeu tudo o que havia ali e fugiu antes que alguém chegasse, continuou a dercer As Montanhas Gélidas sem olhar para trás.`)
                }else if(resp =="IGNORAR"){
                    console.log()
                    console.log(`**** estava fraco e desmaiou, poucos metros após o acampamento, foi encontrado e acolhido por um grupo de aventureiros
são as primeiras pessoas que você viu desde a caverna, eles dividem sua comida e bebida com você.
Após a refeição, você se lembra do que é a amizade e a gratidão e dorme com seus novos companheiros.`)

                }   console.log()
                    prompt(`Digite ENTER para prosseguir...`)
                    console.clear();
                    console.log()
            }else if(i==4){
                console.log(`É um novo dia! Você fez amigos e está prestes a adentrar a cidade de Erast. Porém, ao acordar você vê monstros atacando e matando facilmente seus novos companheiros, pois haviam seguido seu cheiro.
Digite o que deseja fazer: "LUTAR", "FUGIR"\n`)
                
                    resp = prompt().toUpperCase().replace(/\s/g, "");
                    validacaoString(resp, "LUTAR", "FUGIR");
                    if(resp=="LUTAR"){
                        criarMonstro(3,5,5)
                        mortalKombat()
                
                        if (gameOver == true){
                            console.log();
                            console.log(`GAME OVER - Você morreu para os monstros ${monstros[0].nome}`);
                            break
                
                            } else{
                                console.log(`**** lutou bravamente e vingou a morte de seus aliados, em um rompante de fúria você conseguiu
destruir os três monstros sozinho. Após derrotar os três ${monstros[0].nome}, **** fica profundamente abalado por não ter sido capaz de proteger seus amigos.
Esses são seus STATUS atualizados: \n`)
                                personagens.jogador.vida = 15
                                personagens.jogador.dano += 4
                                console.table(personagens.jogador)
                   
                            }}else if (resp=="FUGIR"){
                                console.log();
                                console.log(`**** fogia enquanto houvia os gritos de agonia de seus amigos, mas seguia sem olhar pra trás`)
                    }
                    
                        console.log()
                        prompt(`Digite ENTER para prosseguir...`)
                        console.clear();
                        console.log()
                        
            }
    
    }
    console.log(`Você finalmente termina a descida pelas monstanhas se depara com a entrada da cidade de Erast\n`)
}


