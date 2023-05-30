const CHAVE_API = "chave aqui"; // Chave da api

const inputPesquisar = document.getElementById("inputPesquisar");
const btnPesquisar = document.getElementById("btnPesquisar");
const cidadeNome = document.querySelector("#cidadeNome");
const temperatura = document.querySelector("#temperatura span");
const temperaturaMin = document.querySelector("#temperaturaMin span");
const temperaturaMax = document.querySelector("#temperaturaMax span");
const descricao = document.querySelector("#descricao");
const iconeClima = document.querySelector("#iconeClima");
const umidade = document.querySelector("#umidade span");
const vento = document.querySelector("#vento span");
const dadosClima = document.querySelector("#dadosClima");

const pegarDadosClima = async (cidade) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${CHAVE_API}&lang=pt_br`;

    const resposta = await fetch(apiUrl);
    const dados = await resposta.json();

    if (dados.cod === "404" || dados.cod === "400") {
        alert(`O local ${inputPesquisar.value} não foi encontrado!`); // Menssagem caso o usuario digite errado
    } else {
        return dados;
    }
};

const mostrarDadosClima = async (cidade) => {
    const dados = await pegarDadosClima(cidade);

    cidadeNome.innerText = dados.name;
    temperatura.innerText = `${parseInt(dados.main.temp)}°c`;
    temperaturaMin.innerText = `Max ${parseInt(dados.main.temp_max)}°c`;
    temperaturaMax.innerText = `Min ${parseInt(dados.main.temp_min)}°c`;
    descricao.innerText = dados.weather[0].description;
    iconeClima.setAttribute("src", `http://openweathermap.org/img/wn/${dados.weather[0].icon}.png`); // Imagens
    umidade.innerText = `${dados.main.humidity}%`;
    vento.innerText = `${dados.wind.speed}km/h`;

    dadosClima.classList.remove("esconder")
};

btnPesquisar.addEventListener("click", () => {
    let cidade = inputPesquisar.value;
    
    mostrarDadosClima(cidade);
});

inputPesquisar.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        
        let cidade = inputPesquisar.value;

        mostrarDadosClima(cidade);
    }
});