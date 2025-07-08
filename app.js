let distancia;
let consumo;
let postosPesquisados;

function redirecionar() {
    distancia = document.getElementById("distancia").value;
    consumo = document.getElementById("consumo").value;
    postosPesquisados = Number(document.getElementById("postosPesquisados").value);
    let divPostos = document.getElementById("postosInput");

    for (let i = 0; i < postosPesquisados; i++){
        let texto = document.createElement('p');
        let input = document.createElement('input');
        
        texto.textContent = `Digite o valor encontrado no posto ${i + 1}`;
        input.id = `posto${i + 1}`;
        input.type = 'number';
        input.placeholder = '5.13'
        
        divPostos.appendChild(texto);
        divPostos.appendChild(input);
    }

    let primeiroBotao = document.getElementById("primeiroBotao");
    primeiroBotao.remove();

    let segundoBotao = document.createElement("button");
    segundoBotao.textContent = "Continuar";
    segundoBotao.id = "segundoBotao";
    segundoBotao.setAttribute("onClick", "calcularMedia()");
    divPostos.appendChild(segundoBotao);

}

function calcularMedia() {
    let soma = 0;
    for (let i = 0; i < postosPesquisados; i++) {
        let precoPosto = parseFloat(document.getElementById(`posto${i + 1}`).value);
        soma = soma + precoPosto;
    }
    let media = soma/postosPesquisados;

}
