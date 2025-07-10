function redirecionar() {
    let postosPesquisados = Number(document.getElementById("postosPesquisados").value);
    let divPostos = document.getElementById("postosInput");

    if (isNaN(postosPesquisados) || postosPesquisados <= 0){
        alert("Preencha o campo de postos pesquisados com um valor maior que zero para prosseguir.")
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

let precoLista = [];

function precosPostos() {
    
    
    
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
    if (precoDosPostos.length !== postosPesquisados.value){
        precoLista = [];
        alert("1");
        return 0;
    }
    let distancia = parseFloat(document.getElementById("distancia").value);
    let consumoMedio = parseFloat(document.getElementById("consumoMedio").value);

    let consumoNecessarioTexto = document.createElement("p");
    let menorValorTexto = document.createElement("p");
    let mediaValoresTexto = document.createElement("p");
    let gastoDiarioTexto = document.createElement("p");

    consumoNecessarioTexto.textContent = `O consumo necessário é ${consumoNecessario(distancia, consumoMedio)} litros`;
    menorValorTexto.textContent = `O menor valor pesquisado é R$${menorValor(precoDosPostos)}`;
    mediaValoresTexto.textContent = `A média dos valores pesquisados é R$${calcularMedia(precoDosPostos)}`;
    gastoDiarioTexto.textContent = `O gasto diário (ida e volta) é R$${2 * consumoNecessario(distancia, consumoMedio) * menorValor(precoDosPostos)}`;

    let divSaida = document.getElementById("saida");

    divSaida.appendChild(consumoNecessarioTexto);
    divSaida.appendChild(menorValorTexto);
    divSaida.appendChild(mediaValoresTexto);
    divSaida.appendChild(gastoDiarioTexto);
    
}