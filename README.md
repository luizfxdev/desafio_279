# 🧙‍♂️ A Jornada do Programador Mago

Uma aplicação web interativa para resolver o desafio mágico de programação dinâmica, onde um Programador Mago deve encontrar o caminho com maior poder mágico através de pedras encantadas.

## 📖 Descrição do Desafio

Em uma terra distante e mágica, existe um lendário Programador Mago que deve completar uma série de desafios para alcançar o nível de Arquimago do Código. 
O mago está numa floresta onde existem n pedras mágicas dispostas em uma linha reta, cada uma contendo um número positivo que representa seu poder mágico.

## 🎯 Objetivo
Encontrar o caminho que resulta na maior quantidade de poder mágico total acumulado.

## 📋 Regras

✅ O Programador Mago sempre começa na primeira pedra
✅ Ele pode escolher pular para a pedra imediatamente à frente ou para a seguinte (até duas posições à frente)
✅ O Programador Mago termina sua jornada ao alcançar ou ultrapassar a última pedra
⛔ Não pode voltar para pedras anteriores

## 💡 Exemplo
```
Entrada: [4, 5, 8, 11, 3]
Saída Esperada: 16
```
## 🏗️Estrutura do Projeto
```
📂 desafio_279/
📂images/
└── 🖼️ background.png
├── 📄 index.html
├── 🎨 styles.css
└── ⚙️ script.js
```
### 🖥️ Instalação e Execução

Clone ou baixe todos os arquivos para uma pasta
Adicione sua imagem de background (opcional):

Coloque uma imagem chamada background.png na pasta
No arquivo styles.css, descomente a linha 11 e comente a linha 14


Abra o arquivo index.html em qualquer navegador moderno
Digite os valores das pedras mágicas separados por vírgula
Clique em CALCULAR para ver a mágica acontecer! ✨

### 📱 Exemplo de Uso
```
Input: 4, 5, 8, 11, 3
Output: Máximo Poder Mágico = 16
```
## 🛠️ Tecnologias Utilizadas

HTML5 - Estrutura semântica e acessível
CSS3 - Design responsivo com animações mágicas
JavaScript ES6+ - Lógica de programação dinâmica
Flexbox - Layout responsivo moderno

## ✨ Características

### 🎨 Design

Tema mágico com cores fantásticas e efeitos de glassmorfismo
Animações rainbow glow nos botões interativos
Layout responsivo que se adapta a diferentes tamanhos de tela
Container posicionado à esquerda conforme especificado
Suporte a background personalizado para imagens

### 🧮 Funcionalidades

Entrada intuitiva com números separados por vírgula
Validação robusta de dados de entrada
Algoritmo otimizado usando programação dinâmica
Resultado detalhado com explicação passo a passo
Navegação por teclado (Tab e Enter)
Botão de retorno para limpar e reiniciar

### 📱 Responsividade

Desktop: Container fixo à esquerda
Tablet: Container centralizado com botões horizontais
Mobile: Stack vertical dos botões e layout otimizado

### 🧠 Algoritmo
O problema é resolvido usando programação dinâmica, uma variação do clássico "House Robber":
Lógica Principal

javascript
```
// Para cada pedra, decide se é melhor:
// 1. Pegá-la (soma com melhor resultado até 2 posições atrás)
// 2. Pulá-la (mantém melhor resultado da posição anterior)
dp[i] = Math.max(dp[i-1], stones[i] + dp[i-2])
```
### Complexidade

**Tempo:** O(n) - linear

**Espaço:** O(n) - para armazenar resultados intermediários

### 🎮 Controles

AçãoComandoCalcularClique no botão "⚡ CALCULAR" ou pressione EnterLimparClique no botão "🔄 RETORNAR"NavegaçãoUse Tab para navegar entre elementos

## 🔧 Personalização

Adicionando Background Personalizado

Coloque sua imagem na pasta do projeto
No styles.css, edite as linhas 11-14:
```
css
/* Descomente e ajuste o nome da sua imagem: */
background: url('sua-imagem.png') center/cover no-repeat, linear-gradient(...);

/* Comente o background padrão: */
/* background: linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 25%...); */
Opções de Background

center/cover - Cobre toda a tela mantendo proporção
center/contain - Mostra imagem completa
repeat - Repete como padrão
no-repeat - Imagem única
```

### 🐛 Solução de Problemas

**Problemas Comuns**

Arquivos não carregam: Verifique se todos estão na mesma pasta
Estilos não aplicam: Confirme o nome styles.css
JavaScript não funciona: Confirme o nome script.js
Background não aparece: Verifique nome e formato da imagem

**Navegadores Suportados**

✅ Chrome 60+

✅ Firefox 55+

✅ Safari 12+

✅ Edge 79+

## 📄 Licença
Este projeto é open source e está disponível sob a licença MIT.

## 🤝 Contribuições
Sinta-se à vontade para sugerir melhorias, correções ou novas funcionalidades!

*Desenvolvido com 💜 para ajudar o Programador Mago em sua jornada épica!* 🧙‍♂️⚡✨
