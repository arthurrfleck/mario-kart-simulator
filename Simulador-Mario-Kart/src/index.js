// Entrade do usuário
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Personagens
const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
    VIDAS: 3,
};

const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0,
    VIDAS: 3,
};

const player3 = {
    NOME: "Peach",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 2,
    PONTOS: 0,
    VIDAS: 3,
};

const player4 = {
    NOME: "Yoshi",
    VELOCIDADE: 2,
    MANOBRABILIDADE: 4,
    PODER: 3,
    PONTOS: 0,
    VIDAS: 3,
};

const player5 = {
    NOME: "Bowser",
    VELOCIDADE: 5,
    MANOBRABILIDADE: 2,
    PODER: 5,
    PONTOS: 0,
    VIDAS: 3,
};

const player6 = {
    NOME: "Donkey Kong",
    VELOCIDADE: 2,
    MANOBRABILIDADE: 2,
    PODER: 5,
    PONTOS: 0,
    VIDAS: 3,
};

const players = [player1, player2, player3, player4, player5, player6];

const ranking = {};


// Escolher os personagens
function listPlayers() {
  console.log("Escolha dois jogadores para a corrida:\n");

  players.forEach((player, index) => {
    console.log(
      `${index + 1} - ${player.NOME} | Velocidade: ${player.VELOCIDADE} | Manobrabilidade: ${player.MANOBRABILIDADE} | Poder: ${player.PODER}`
    );
  });

  console.log("\n");
}

// Função escolher
function askPlayer(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(parseInt(answer));
    });
  });
}

async function choosePlayers() {
  listPlayers();

  let firstIndex = await askPlayer("Digite o número do primeiro jogador: ");
  let secondIndex = await askPlayer("Digite o número do segundo jogador: ");

  if (
    firstIndex < 1 ||
    firstIndex > players.length ||
    secondIndex < 1 ||
    secondIndex > players.length ||
    firstIndex === secondIndex
  ) {
    console.log("\n❌ Escolha inválida! Tente novamente.\n");
    return choosePlayers();
  }

  return [players[firstIndex - 1], players[secondIndex - 1]];
}

// Resetar pontos
function resetPoints(character1, character2) {
  character1.PONTOS = 0;
  character2.PONTOS = 0;
  character1.VIDAS = 3;
  character2.VIDAS = 3;
}


async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
};

async function getRandomBlock() {
  let random = Math.random();
  let result;

  switch (true) {
    case random < 0.33:
      result = "RETA";
      break;
    case random < 0.66:
      result = "CURVA";
      break;
    default:
      result = "CONFRONTO";
  }

  return result;
}

async function logRollResult(characterName, block, diceResult, attribute) {
  console.log(
    `${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${
      diceResult + attribute
    }`
  );
}

// Sistema de itens
function getRandomItem() {
  const items = ["CASCO", "BANANA", "COGUMELO", "ESTRELA", "NADA"];
  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
}

// Modo automático
function getRandomPlayers() {
  let firstIndex = Math.floor(Math.random() * players.length);
  let secondIndex;

  do {
    secondIndex = Math.floor(Math.random() * players.length);
  } while (secondIndex === firstIndex);

  return [players[firstIndex], players[secondIndex]];
}

// Habilidade Especial
function applySpecialAbility(character, block, diceResult) {
  let bonus = 0;

  switch (character.NOME) {

    case "Mario":
      if (block === "RETA") bonus += 1;
      if (diceResult === 6) bonus += 1;
      break;

    case "Luigi":
      if (block === "CURVA") bonus += 2;
      break;

    case "Peach":
      // Tratado direto no confronto (empate vence)
      break;

    case "Yoshi":
      bonus += Math.floor(Math.random() * 3); // 0 a 2
      break;

    case "Bowser":
      if (block === "CONFRONTO") bonus += 2;
      break;

    case "Donkey Kong":
      if (diceResult >= 5) bonus += 2;
      break;
  }

  return bonus;
}

// Race Engine
async function playRaceEngine(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`🏁 Rodada ${round}`);

    let block = await getRandomBlock();
    console.log(`Bloco: ${block}`);

    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;

    // ================= RETA =================
    if (block === "RETA") {

      totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
      totalTestSkill2 = diceResult2 + character2.VELOCIDADE;

      totalTestSkill1 += applySpecialAbility(character1, block, diceResult1);
      totalTestSkill2 += applySpecialAbility(character2, block, diceResult2);

      await logRollResult(character1.NOME, "velocidade", diceResult1, character1.VELOCIDADE);
      await logRollResult(character2.NOME, "velocidade", diceResult2, character2.VELOCIDADE);
    }

    // ================= CURVA =================
    if (block === "CURVA") {

      totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
      totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;

      totalTestSkill1 += applySpecialAbility(character1, block, diceResult1);
      totalTestSkill2 += applySpecialAbility(character2, block, diceResult2);

      await logRollResult(character1.NOME, "manobrabilidade", diceResult1, character1.MANOBRABILIDADE);
      await logRollResult(character2.NOME, "manobrabilidade", diceResult2, character2.MANOBRABILIDADE);
    }

    // ================= CONFRONTO =================
    if (block === "CONFRONTO") {
      console.log(`${character1.NOME} confrontou com ${character2.NOME}! 🥊`);
    
      await logRollResult(character1.NOME, "poder", diceResult1, character1.PODER);
      await logRollResult(character2.NOME, "poder", diceResult2, character2.PODER);
    
      let powerResult1 = diceResult1 + character1.PODER;
      let powerResult2 = diceResult2 + character2.PODER;
    
      powerResult1 += applySpecialAbility(character1, block, diceResult1);
      powerResult2 += applySpecialAbility(character2, block, diceResult2);
    
      let item1 = getRandomItem();
      let item2 = getRandomItem();
    
      console.log(`${character1.NOME} pegou ${item1}`);
      console.log(`${character2.NOME} pegou ${item2}`);
    
      if (item1 === "CASCO") powerResult1 += 2;
      if (item1 === "COGUMELO") powerResult1 += 1;
      if (item1 === "ESTRELA") powerResult1 += 3;
      if (item1 === "BANANA") powerResult2 -= 1;
    
      if (item2 === "CASCO") powerResult2 += 2;
      if (item2 === "COGUMELO") powerResult2 += 1;
      if (item2 === "ESTRELA") powerResult2 += 3;
      if (item2 === "BANANA") powerResult1 -= 1;
    
      console.log(`${character1.NOME} total: ${powerResult1}`);
      console.log(`${character2.NOME} total: ${powerResult2}`);
    
      if (
        powerResult1 > powerResult2 ||
        (powerResult1 === powerResult2 && character1.NOME === "Peach")
      ) {
        console.log(`${character1.NOME} venceu o confronto! ${character2.NOME} perdeu 1 vida ❤️`);
        character2.VIDAS = Math.max(0, character2.VIDAS - 1);
    
      } else if (
        powerResult2 > powerResult1 ||
        (powerResult2 === powerResult1 && character2.NOME === "Peach")
      ) {
        console.log(`${character2.NOME} venceu o confronto! ${character1.NOME} perdeu 1 vida ❤️`);
        character1.VIDAS = Math.max(0, character1.VIDAS - 1);
    
      } else {
        console.log("Confronto empatado!");
      }
    
      console.log(`❤️ ${character1.NOME}: ${character1.VIDAS} | ${character2.NOME}: ${character2.VIDAS}`);
    
      if (character1.VIDAS <= 0 || character2.VIDAS <= 0) {
        console.log("💀 Um jogador ficou sem vidas!");
        break;
      }
    
      console.log("-----------------------------");
      continue;
    }

    // ================= PONTUAÇÃO NORMAL =================
    if (totalTestSkill1 > totalTestSkill2) {
      console.log(`${character1.NOME} marcou um ponto!`);
      character1.PONTOS++;
    } else if (totalTestSkill2 > totalTestSkill1) {
      console.log(`${character2.NOME} marcou um ponto!`);
      character2.PONTOS++;
    }

      console.log("-----------------------------");
        }
    }

    // Determinar vencedor da rodada
    async function declareWinner(character1, character2) {
      console.log("Resultado final:");
      console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`);
      console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`);

  let winner = null;

  if (character1.PONTOS > character2.PONTOS) {
    winner = character1;
    console.log(`\n${character1.NOME} venceu a corrida! Parabéns! 🏆`);
  } else if (character2.PONTOS > character1.PONTOS) {
    winner = character2;
    console.log(`\n${character2.NOME} venceu a corrida! Parabéns! 🏆`);
  } else {
    console.log("A corrida terminou em empate");
  }

  if (winner) {
    ranking[winner.NOME] = (ranking[winner.NOME] || 0) + 1;
  }
}

// Mostar Ranking
function showRanking() {
  console.log("\n🏆 Ranking Geral:");

  if (Object.keys(ranking).length === 0) {
    console.log("Nenhuma vitória registrada ainda.");
    return;
  }

  Object.entries(ranking)
    .sort((a, b) => b[1] - a[1])
    .forEach(([name, wins], index) => {
      console.log(`${index + 1}º - ${name}: ${wins} vitória(s)`);
    });
}


async function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

// Main Menu
async function main() {
  let playAgain = true;

  while (playAgain) {
    console.log("\n🎮 ===== MARIO KART SIMULATOR 2.0 =====");
    console.log("1 - Escolher jogadores manualmente");
    console.log("2 - Modo automático (aleatório)");
    console.log("3 - Ver ranking");
    console.log("4 - Sair\n");

    const option = await ask("Escolha uma opção: ");

    let playerA;
    let playerB;

    switch (option) {
      case "1":
        [playerA, playerB] = await choosePlayers();
        break;

      case "2":
        [playerA, playerB] = getRandomPlayers();
        console.log(
          `\n🤖 Seleção automática: ${playerA.NOME} vs ${playerB.NOME}\n`
        );
        break;

      case "3":
        showRanking();
        continue;

      case "4":
        playAgain = false;
        break;

      default:
        console.log("❌ Opção inválida!");
        continue;
    }

    if (!playAgain) break;

    resetPoints(playerA, playerB);

    console.log(
      `\n🏁🚨 Corrida entre ${playerA.NOME} e ${playerB.NOME} começando...\n`
    );

    await playRaceEngine(playerA, playerB);
    await declareWinner(playerA, playerB);
  }

  console.log("\n👋 Encerrando o jogo...");
  rl.close();
}

main();