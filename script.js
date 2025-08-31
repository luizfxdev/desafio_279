// Classe principal para resolver o desafio do Programador Mago
class MagicProgrammerChallenge {
  constructor() {
    this.initializeEventListeners();
    this.hideResultSection();
  }

  // Inicializa os event listeners dos botões
  initializeEventListeners() {
    const calculateBtn = document.querySelector('.calculate-btn');
    const returnBtn = document.querySelector('.return-btn');
    const input = document.getElementById('magicStones');

    calculateBtn.addEventListener('click', () => this.handleCalculate());
    returnBtn.addEventListener('click', () => this.handleReturn());

    // Permite calcular ao pressionar Enter no input
    input.addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        this.handleCalculate();
      }
    });
  }

  // Processa a entrada e calcula o resultado
  handleCalculate() {
    const input = document.getElementById('magicStones').value.trim();

    if (!input) {
      this.showError('Por favor, insira os valores das pedras mágicas!');
      return;
    }

    try {
      // Converte a string de entrada em array de números
      const stones = this.parseInput(input);

      if (stones.length === 0) {
        this.showError('Insira pelo menos uma pedra mágica!');
        return;
      }

      // Valida se todos os valores são positivos
      if (!this.validateStones(stones)) {
        this.showError('Todas as pedras devem ter poder mágico positivo!');
        return;
      }

      // Calcula o resultado usando programação dinâmica
      const result = this.calculateMaxMagicPower(stones);
      this.showResult(stones, result);
    } catch (error) {
      this.showError('Formato inválido! Use números separados por vírgula.');
    }
  }

  // Converte string de entrada em array de números
  parseInput(input) {
    return input
      .split(',')
      .map(str => str.trim())
      .filter(str => str !== '')
      .map(str => {
        const num = parseInt(str);
        if (isNaN(num)) {
          throw new Error('Invalid number format');
        }
        return num;
      });
  }

  // Valida se todas as pedras têm poder positivo
  validateStones(stones) {
    return stones.every(stone => stone > 0);
  }

  // Algoritmo principal - resolve o problema considerando que não pode pegar pedras adjacentes
  calculateMaxMagicPower(stones) {
    const n = stones.length;
    if (n === 0) return 0;
    if (n === 1) return stones[0];
    if (n === 2) return Math.max(stones[0], stones[1]);

    const steps = []; // Para rastrear os passos do cálculo
    steps.push(`📊 Entrada: [${stones.join(', ')}]`);
    steps.push(`🧙‍♂️ Regra: O mago não pode pegar pedras adjacentes (deve pular pelo menos 1)`);
    steps.push(``);

    // Array para programação dinâmica
    // dp[i] = máximo poder que pode ser obtido considerando pedras de 0 até i
    const dp = new Array(n);

    // Casos base
    dp[0] = stones[0];
    dp[1] = Math.max(stones[0], stones[1]);

    steps.push(`Posição 0: ${stones[0]} (pedra inicial obrigatória)`);
    steps.push(`Posição 1: max(${stones[0]}, ${stones[1]}) = ${dp[1]} (melhor entre as duas primeiras)`);

    // Para cada posição a partir da terceira
    for (let i = 2; i < n; i++) {
      // Opção 1: não pegar a pedra atual (manter resultado anterior)
      const option1 = dp[i - 1];

      // Opção 2: pegar a pedra atual (somar com melhor resultado até i-2)
      const option2 = stones[i] + dp[i - 2];

      dp[i] = Math.max(option1, option2);

      steps.push(
        `Posição ${i}: max(não pegar: ${option1}, pegar: ${stones[i]} + ${dp[i - 2]} = ${option2}) = ${dp[i]}`
      );
    }

    steps.push(``);

    // Reconstrói o caminho ótimo
    const optimalPath = this.reconstructPath(stones, dp);
    const pathValues = optimalPath.map(pos => stones[pos]);

    steps.push(`🎯 Caminho ótimo: posições [${optimalPath.join(' → ')}]`);
    steps.push(`⚡ Pedras coletadas: [${pathValues.join(' + ')}] = ${dp[n - 1]}`);

    // Armazena os passos para exibição
    this.calculationSteps = steps;
    this.stonesArray = stones;

    return dp[n - 1];
  }

  // Reconstrói o caminho ótimo baseado no array dp
  reconstructPath(stones, dp) {
    const n = stones.length;
    const path = [];
    let i = n - 1;

    while (i >= 0) {
      if (i === 0) {
        path.unshift(0);
        break;
      } else if (i === 1) {
        if (dp[1] === stones[1]) {
          path.unshift(1);
        } else {
          path.unshift(0);
        }
        break;
      } else {
        // Verifica se a pedra atual foi escolhida
        if (dp[i] === stones[i] + dp[i - 2]) {
          path.unshift(i);
          i -= 2; // Pula para i-2 (não pode ser adjacente)
        } else {
          i -= 1; // Não foi escolhida, vai para anterior
        }
      }
    }

    return path;
  }

  // Exibe o resultado detalhado
  showResult(stones, maxPower) {
    const resultSection = document.getElementById('resultSection');
    const calculationSteps = document.getElementById('calculationSteps');
    const finalResult = document.getElementById('finalResult');

    // Mostra a seção de resultado
    resultSection.style.display = 'block';

    // Constrói o texto dos passos de cálculo
    let stepsText = `<div class="step-highlight">📊 Entrada:</div> [${stones.join(', ')}]<br><br>`;
    stepsText += `<div class="step-highlight">🔍 Cálculo Detalhado:</div><br>`;
    stepsText += `<em>Usamos programação dinâmica para encontrar o máximo poder:</em><br><br>`;

    this.calculationSteps.forEach((step, index) => {
      stepsText += `${step}<br>`;
    });

    stepsText += `<br><div class="step-highlight">✨ Explicação:</div><br>`;
    stepsText += `Para cada pedra, decidimos se é melhor pegá-la (somando com o melhor resultado até 2 posições atrás) ou pular ela (mantendo o melhor resultado da posição anterior).`;

    calculationSteps.innerHTML = stepsText;

    // Exibe o resultado final
    finalResult.innerHTML = `
            <div>🏆 <strong>Máximo Poder Mágico Acumulado:</strong></div>
            <div style="font-size: 1.5em; margin-top: 0.5rem;">${maxPower}</div>
        `;

    // Anima a entrada do resultado
    resultSection.style.animation = 'fadeInUp 0.6s ease-out';
  }

  // Exibe mensagem de erro
  showError(message) {
    const resultSection = document.getElementById('resultSection');
    const calculationSteps = document.getElementById('calculationSteps');
    const finalResult = document.getElementById('finalResult');

    resultSection.style.display = 'block';
    calculationSteps.innerHTML = `<div style="color: #ff6b6b; text-align: center;">⚠️ ${message}</div>`;
    finalResult.innerHTML = '';
  }

  // Reseta o formulário e esconde o resultado
  handleReturn() {
    document.getElementById('magicStones').value = '';
    this.hideResultSection();
    document.getElementById('magicStones').focus();
  }

  // Esconde a seção de resultado
  hideResultSection() {
    const resultSection = document.getElementById('resultSection');
    resultSection.style.display = 'none';
  }
}

// Inicializa a aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
  new MagicProgrammerChallenge();
});
