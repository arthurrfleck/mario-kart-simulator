<h1>🏁 Desafio de Projeto: Mario Kart JS - Simulator 2.0</h1>

<p>
CLI racing simulator inspirado em Mario Kart, desenvolvido com Node.js.
Projeto focado em lógica de programação, estrutura de jogo, fluxo assíncrono e organização de código.
</p>

<table>
    <tr>
        <td>
            <img src="./docs/header.gif" alt="Mario Kart" width="200">
        </td>
        <td>
            <b>Objetivo:</b>
            <p>
                Desenvolver a lógica de um jogo de corrida inspirado no universo Mario Kart,
                utilizando JavaScript com Node.js.
                A versão 2.0 evolui o projeto original com sistema de vidas, itens,
                habilidades especiais, menu interativo e ranking dinâmico.
            </p>
        </td>
    </tr>
</table>

<h2>Players</h2>

<table style="border-collapse: collapse; width: 800px; margin: 0 auto;">

<tr>
<td style="border: 1px solid black; text-align: center;">
<p><b>Mario</b></p>
<img src="./docs/mario.gif" width="110">
</td>

<td style="border: 1px solid black; text-align: center;">
<p>Velocidade: 4</p>
<p>Manobrabilidade: 3</p>
<p>Poder: 3</p>
<p>Habilidade: +1 em RETA e +1 ao tirar 6</p>
</td>

<td style="border: 1px solid black; text-align: center;">
<p><b>Peach</b></p>
<img src="./docs/peach.gif" width="110">
</td>

<td style="border: 1px solid black; text-align: center;">
<p>Velocidade: 3</p>
<p>Manobrabilidade: 4</p>
<p>Poder: 2</p>
<p>Habilidade: vence empates em CONFRONTO</p>
</td>

<td style="border: 1px solid black; text-align: center;">
<p><b>Yoshi</b></p>
<img src="./docs/yoshi.gif" width="110">
</td>

<td style="border: 1px solid black; text-align: center;">
<p>Velocidade: 2</p>
<p>Manobrabilidade: 4</p>
<p>Poder: 3</p>
<p>Habilidade: bônus aleatório (0 a 2)</p>
</td>
</tr>

<tr>
<td style="border: 1px solid black; text-align: center;">
<p><b>Bowser</b></p>
<img src="./docs/bowser.gif" width="110">
</td>

<td style="border: 1px solid black; text-align: center;">
<p>Velocidade: 5</p>
<p>Manobrabilidade: 2</p>
<p>Poder: 5</p>
<p>Habilidade: +2 em CONFRONTO</p>
</td>

<td style="border: 1px solid black; text-align: center;">
<p><b>Luigi</b></p>
<img src="./docs/luigi.gif" width="110">
</td>

<td style="border: 1px solid black; text-align: center;">
<p>Velocidade: 3</p>
<p>Manobrabilidade: 4</p>
<p>Poder: 4</p>
<p>Habilidade: +2 em CURVA</p>
</td>

<td style="border: 1px solid black; text-align: center;">
<p><b>Donkey Kong</b></p>
<img src="./docs/dk.gif" width="110">
</td>

<td style="border: 1px solid black; text-align: center;">
<p>Velocidade: 2</p>
<p>Manobrabilidade: 2</p>
<p>Poder: 5</p>
<p>Habilidade: +2 ao tirar 5 ou 6 no dado</p>
</td>
</tr>

</table>

<h3>🕹️ Regras & Mecânicas</h3>

<b>Estrutura da Corrida:</b>

<ul>
<li>A corrida possui <b>5 rodadas</b></li>
<li>Cada jogador inicia com <b>3 vidas ❤️</b></li>
<li>A pontuação começa em 0</li>
<li>A cada rodada é sorteado um tipo de bloco da pista</li>
</ul>

<b>Tipos de Blocos:</b>

<ul>
<li><b>RETA</b> → Dado (1–6) + Velocidade → vencedor ganha 1 ponto</li>
<li><b>CURVA</b> → Dado (1–6) + Manobrabilidade → vencedor ganha 1 ponto</li>
<li><b>CONFRONTO</b> → Dado (1–6) + Poder → perdedor perde 1 vida ❤️</li>
</ul>

<b>Sistema de Itens (apenas no CONFRONTO):</b>

<ul>
<li>🐢 CASCO → +2 poder</li>
<li>🍄 COGUMELO → +1 poder</li>
<li>⭐ ESTRELA → +3 poder</li>
<li>🍌 BANANA → -1 poder do adversário</li>
<li>❌ NADA → sem efeito</li>
</ul>

<b>Condição de Vitória:</b>

<ul>
<li>Vence quem tiver mais pontos ao final das 5 rodadas</li>
<li>Ou caso o adversário perca todas as vidas</li>
</ul>

<h3>🎮 Sistema do Jogo</h3>

<ul>
<li>Menu interativo no terminal</li>
<li>Escolha manual de jogadores</li>
<li>Modo automático (seleção aleatória)</li>
<li>Ranking geral acumulado durante a execução</li>
<li>Exibição detalhada de cada rodada</li>
</ul>

<h3>🏆 Ranking</h3>

<p>
O jogo registra as vitórias durante a execução e exibe um ranking
ordenado por número de vitórias.
</p>

<h3>🛠️ Tecnologias Utilizadas</h3>

<ul>
<li>JavaScript</li>
<li>Node.js</li>
<li>Readline (CLI interaction)</li>
</ul>

<h3>🚀 Como Executar</h3>

<pre>
npm install
node index.js
</pre>
