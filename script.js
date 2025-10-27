const dataAtual = new Date();
const opcoesData = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const dataFormatada = dataAtual.toLocaleDateString('pt-BR', opcoesData);

const dataDay = document.querySelector('.data-day');
dataDay.textContent = dataFormatada;

const dataHour = document.querySelector('.data-hour');

function atualizarHora() {
    const agora = new Date();
    const horaFormatada = agora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    dataHour.textContent = horaFormatada;
}

// Atualiza imediatamente ao carregar
atualizarHora();

// Atualiza a cada 1 minuto
setInterval(atualizarHora, 60000);

// Exibe o horario da ultima atualizacao no rodape
const footer = document.querySelector('.footer');
const horaFormatada = dataAtual.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
footer.textContent = `Dados meteorológicos em tempo real • Atualizado às ${horaFormatada}`;

// Busca na API
const buscarCidade = async () => {

    const cidade = document.getElementById('cidade').value;

    const api = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=49c7978f02c3bb628a4811d754ae8ccc&lang=pt_br&units=metric`;

    const resposta = await fetch(api);
    const dados = await resposta.json();

    if (dados.cod !== 200) {
        alert('Cidade não encontrada!');
        return;
    }

    return dados;
}

const exibirDados = (dados) => {
    console.log(dados);
    document.querySelector('.weather-info').classList.remove('hidden');

    document.querySelector('.descricao').textContent = dados.weather[0].description;
    document.querySelector('.cidade').textContent = `${dados.name}, ${dados.sys.country}`;
    document.querySelector('.temperatura').textContent = `${Math.round(dados.main.temp)}°C`;
    document.querySelector('.sensacao-termica').textContent = `${Math.round(dados.main.feels_like)}°C`;
    document.querySelector('.umidade').textContent = `${dados.main.humidity}%`;
    document.querySelector('.vento').textContent = `${Math.round(dados.wind.speed)} km/h`;
    document.querySelector('.visibilidade').textContent = `${(dados.visibility / 1000).toFixed(1)} km`;
    document.querySelector('.pressao').textContent = `${dados.main.pressure} hPa`;

    document.querySelector('.icone').src = `./assets/${dados.weather[0].icon}.png`;
}

document.getElementById('buscar').addEventListener('click', async () => {
    // mostra loader e esconde resultado
    const loadingEl = document.querySelector('.loading');
    const weatherEl = document.querySelector('.weather-info');
    loadingEl.classList.remove('hidden');
    weatherEl.classList.add('hidden');

    try {
        const dados = await buscarCidade();
        if (dados) {
            exibirDados(dados);
        }
    } catch (err) {
        console.error('Erro ao buscar cidade:', err);
        alert('Ocorreu um erro ao buscar os dados. Tente novamente.');
    } finally {
        // esconde loader e mostra resultado (se existir)
        loadingEl.classList.add('hidden');
        // se dados foram retornados, exibirDados já removeu a classe hidden
        if (!weatherEl.classList.contains('hidden')) return;
        weatherEl.classList.remove('hidden');
    }
});
