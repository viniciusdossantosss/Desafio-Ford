/**
 * Função principal que é chamada quando o primeiro botão é clicado.
 * Ela cria dinamicamente os campos de entrada para os preços dos postos
 * com base na quantidade informada pelo utilizador.
 */
function redirecionar() {
    // Obtém o elemento de input onde o utilizador digitou a quantidade de postos.
    let postosPesquisadosInput = document.getElementById("postosPesquisados");
    // Converte o valor do input para um número.
    let postosPesquisados = Number(postosPesquisadosInput.value);
    // Obtém a div onde os novos inputs de preço serão inseridos.
    let divPostos = document.getElementById("postosInput");

    // Valida a quantidade de postos inserida. Se for inválida, a função para.
    if (postosPesquisadosQuantidade(postosPesquisados)) {
        return 0; // Retorna 0 para indicar que houve um erro e interrompe a execução.
    }

    // Loop para criar um campo de texto e um campo de input para cada posto pesquisado.
    for (let i = 0; i < postosPesquisados; i++){
        // Cria um elemento de parágrafo (<p>).
        let texto = document.createElement('p');
        // Cria um elemento de input (<input>).
        let input = document.createElement('input');
        
        // Define o texto do parágrafo.
        texto.textContent = `Digite o valor encontrado no posto ${i + 1}`;
        // Define um ID único para o campo de input (ex: "posto1", "posto2").
        input.id = `posto${i + 1}`;
        // Define o tipo do input para 'number', para facilitar a entrada de números.
        input.type = 'number';
        // Define um texto de exemplo (placeholder).
        input.placeholder = '5.13';
        
        // Adiciona o parágrafo e o input à div "postosInput".
        divPostos.appendChild(texto);
        divPostos.appendChild(input);
    }

    // Remove o botão inicial que chamou esta função.
    let primeiroBotao = document.getElementById("primeiroBotao");
    primeiroBotao.remove();

    // Cria um novo botão ("Continuar") para calcular os resultados.
    let segundoBotao = document.createElement("button");
    segundoBotao.textContent = "Continuar";
    segundoBotao.id = "segundoBotao";
    // Define que a função saida() será chamada quando este botão for clicado.
    segundoBotao.setAttribute("onClick", "saida()");
    // Adiciona o novo botão à div.
    divPostos.appendChild(segundoBotao);

    // Torna o campo de quantidade de postos somente leitura para evitar alterações.
    postosPesquisadosInput.readOnly = true;
}

/**
 * Verifica se um valor fornecido é válido.
 * @param {any} campo - O valor a ser verificado.
 * @returns {boolean} Retorna 'true' se o valor for inválido, caso contrário não retorna nada.
 */
function verificarValor(campo) {
    // Verifica se o campo não é um número.
    if (isNaN(campo)){
        alert("Preencha os campos com um número.");
        return true;
    // Verifica se o campo está vazio.
    } else if (campo === ""){
        alert("Preencha todos os campos");
        return true;
    // Verifica se o campo tem um valor menor ou igual a zero.
    } else if (campo <= 0){
        alert("Preencha os campos com um valor maior que zero.");
        return true;
    }
}

/**
 * Coleta os preços dos combustíveis dos inputs criados dinamicamente.
 * @returns {number[]|true} Retorna uma lista com os preços ou 'true' se houver um erro de validação.
 */
function precosPostos() {
    // Cria uma lista (array) vazia para armazenar os preços.
    let precoLista = [];
    // Obtém a quantidade de postos pesquisados.
    let postosPesquisados = Number(document.getElementById("postosPesquisados").value);

    // Loop para ler o valor de cada posto.
    for (let i = 0; i < postosPesquisados; i++) {
        // Obtém o valor de cada input de preço e converte para número decimal (float).
        let precoPosto = parseFloat(document.getElementById(`posto${i + 1}`).value);

        // Valida o preço. Se for inválido, a função para.
        if (verificarValor(precoPosto)) {
            return true; // Retorna 'true' para sinalizar o erro.
        }
        
        // Adiciona o preço validado à lista.
        precoLista.push(precoPosto);
    }
    
    // Retorna a lista completa de preços.
    return precoLista;
}

/**
 * Calcula a média de uma lista de números.
 * @param {number[]} lista - A lista de números para calcular a média.
 * @returns {number} A média dos valores da lista.
 */
function calcularMedia(lista) {
    // Se a lista estiver vazia, retorna 0 para evitar divisão por zero.
    if (lista.length === 0) {
      return 0; 
    }
    let soma = 0;

    // Soma todos os itens da lista.
    for (let i = 0; i < lista.length; i++) {
      soma += lista[i];
    }
    
    // Retorna a soma dividida pelo número de itens.
    return soma / lista.length;
}

/**
 * Calcula a quantidade de combustível necessária para uma certa distância e consumo.
 * @param {number} distancia - A distância a ser percorrida.
 * @param {number} consumo - O consumo do veículo (km/l).
 * @returns {number} A quantidade de litros de combustível necessária.
 */
function consumoNecessario(distancia, consumo) {
    let consumoNecessario = distancia / consumo;
    return consumoNecessario;
}

/**
 * Encontra o menor valor numa lista de números.
 * @param {number[]} lista - A lista de preços.
 * @returns {number} O menor valor encontrado na lista.
 */
function menorValor(lista) {
    // Usa a função Math.min com o operador spread (...) para encontrar o menor valor na lista.
    let menorValor = Math.min(...lista);
    return menorValor;
}

/**
 * Valida a quantidade de postos informada pelo utilizador.
 * @param {number} quantidadePostos - O número de postos a verificar.
 * @returns {boolean} Retorna 'true' se a quantidade for inválida.
 */
function postosPesquisadosQuantidade(quantidadePostos) {
    // Reutiliza a função de verificação geral.
    if(verificarValor(quantidadePostos)) {
        return true;
    // Verifica se o número não é inteiro (tem casas decimais).
    } else if (!(quantidadePostos % 1 === 0)){
        alert("O campo de postos pesquisados não pode receber um numero flutuante.")
        return true;
    // Verifica se o número de postos é maior ou igual a 15.
    } else if (quantidadePostos >= 15){
        alert("O numero de postos tem que ser menor ou igual a 15.")
        return true;
    }
}

/**
 * Função final, chamada pelo botão "Continuar".
 * Orquestra a coleta de dados, os cálculos e a exibição dos resultados.
 */
function saida() {
    // Pega a lista de preços dos postos.
    let precoDosPostos = precosPostos();
    
    // Se a função precosPostos() retornou 'true', significa que houve um erro de validação.
    if (precoDosPostos === true) {
        return 0; // Interrompe a execução.
    }

    // Pega o valor da distância do input e converte para número.
    let distancia = parseFloat(document.getElementById("distancia").value);
    // Valida o valor da distância.
    if (verificarValor(distancia)){
        return 0; // Interrompe se for inválido.
    }

    // Pega o valor do consumo médio do input e converte para número.
    let consumoMedio = parseFloat(document.getElementById("consumoMedio").value);
    // Valida o valor do consumo.
    if(verificarValor(consumoMedio)){
        return 0; // Interrompe se for inválido.
    }

    // Cria os elementos de parágrafo que exibirão os resultados.
    let consumoNecessarioTexto = document.createElement("p");
    let menorValorTexto = document.createElement("p");
    let mediaValoresTexto = document.createElement("p");
    let gastoDiarioTexto = document.createElement("p");

    // Calcula e define o texto de cada resultado, formatando para duas casas decimais.
    consumoNecessarioTexto.textContent = `O consumo necessário é ${(consumoNecessario(distancia, consumoMedio)).toFixed(2)} litros`;
    menorValorTexto.textContent = `O menor valor pesquisado é R$${(menorValor(precoDosPostos)).toFixed(2)}`;
    mediaValoresTexto.textContent = `A média dos valores pesquisados é R$${(calcularMedia(precoDosPostos)).toFixed(2)}`;
    // Calcula o gasto diário considerando ida e volta (por isso o '2 *').
    gastoDiarioTexto.textContent = `O gasto diário (ida e volta) é R$${(2 * consumoNecessario(distancia, consumoMedio) * menorValor(precoDosPostos)).toFixed(2)}`;

    // Obtém a div onde os resultados serão mostrados.
    let divSaida = document.getElementById("saida");

    // Limpa qualquer conteúdo anterior da div de saída.
    divSaida.innerHTML = "";

    // Adiciona os novos parágrafos com os resultados na div.
    divSaida.appendChild(consumoNecessarioTexto);
    divSaida.appendChild(menorValorTexto);
    divSaida.appendChild(mediaValoresTexto);
    divSaida.appendChild(gastoDiarioTexto);
}