function redirecionar() {
    let postosPesquisados = Number(document.getElementById("postosPesquisados").value);
    let divPostos = document.getElementById("postosInput");

    // Aterar para gerar um campo por vez
    if(verificarValor(postosPesquisados)) {
        return 0;
    } else if (!(postosPesquisados % 1 === 0)){
        return 0;
    }

    for (let i = 0; i < postosPesquisados; i++){
        let texto = document.createElement('p');
        let input = document.createElement('input');
        
        texto.textContent = `Digite o valor encontrado no posto ${i + 1}`;
        input.id = `posto${i + 1}`;
        input.type = 'number';
        input.placeholder = '5.13';
        
        divPostos.appendChild(texto);
        divPostos.appendChild(input);
    }

    let primeiroBotao = document.getElementById("primeiroBotao");
    primeiroBotao.remove();

    let segundoBotao = document.createElement("button");
    segundoBotao.textContent = "Continuar";
    segundoBotao.id = "segundoBotao";
    segundoBotao.setAttribute("onClick", "saida()");
    divPostos.appendChild(segundoBotao);

}

// colocar quantidade de numeros modulo 1 pra verificar se o numero é inteiro

function verificarValor(campo) {
    if (isNaN(campo)){
        alert("Preencha os campos com número.");
        return true;
    } else if (campo === ""){
        alert("Preencha todos os campos");
        return true;
    } else if (campo <= 0){
        alert("Preencha os campos com um valor maior que zero.");
        return true;
    }
}

function precosPostos() {

    let precoLista = [];
    
    for (i = 0; i < postosPesquisados.value; i++) {
        let precoPosto = parseFloat(document.getElementById(`posto${i + 1}`).value);
        
        precoLista.push(precoPosto);
    }
    
    return precoLista;
}

function calcularMedia(lista) {

    if (lista.length === 0) {
      return 0; 
    }
    let soma = 0;

    for (let i = 0; i < lista.length; i++) {
      soma += lista[i];
    }
  
    return soma / lista.length;
}

function consumoNecessario(distancia, consumo) {

    let consumoNecessario = distancia/consumo;

    return consumoNecessario;

}

function menorValor(lista) {
    
    let menorValor = Math.min(...lista);

    return menorValor;
}

function saida() {
    
    let precoDosPostos = precosPostos();

    if (precoDosPostos.length !== Number(postosPesquisados.value)){
        alert("Preencha todos os campos dos preços dos postos");
        return 0;
    } //else if (verificarValor()){
    //     alert("Preencha os campos com um valor maior que zero.");
    // } else if (isNaN(campo)){
    //     alert("Preencha os campos com número.");
    //     return true; 
    // }

    let distancia = parseFloat(document.getElementById("distancia").value);

    if (verificarValor(distancia)){
        return 0;
    }

    let consumoMedio = parseFloat(document.getElementById("consumoMedio").value);

    if(verificarValor(consumoMedio)){
        return 0;
    }

    let consumoNecessarioTexto = document.createElement("p");
    let menorValorTexto = document.createElement("p");
    let mediaValoresTexto = document.createElement("p");
    let gastoDiarioTexto = document.createElement("p");

    consumoNecessarioTexto.textContent = `O consumo necessário é ${(consumoNecessario(distancia, consumoMedio)).toFixed(2)} litros`;
    menorValorTexto.textContent = `O menor valor pesquisado é R$${(menorValor(precoDosPostos)).toFixed(2)}`;
    mediaValoresTexto.textContent = `A média dos valores pesquisados é R$${(calcularMedia(precoDosPostos)).toFixed(2)}`;
    gastoDiarioTexto.textContent = `O gasto diário (ida e volta) é R$${(2 * consumoNecessario(distancia, consumoMedio) * menorValor(precoDosPostos)).toFixed(2)}`;

    let divSaida = document.getElementById("saida");

    divSaida.innerHTML = "";

    divSaida.appendChild(consumoNecessarioTexto);
    divSaida.appendChild(menorValorTexto);
    divSaida.appendChild(mediaValoresTexto);
    divSaida.appendChild(gastoDiarioTexto);
    
}