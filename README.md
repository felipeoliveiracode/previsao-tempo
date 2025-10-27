# Clima — Previsão do Tempo

Um projeto simples de front-end que exibe a previsão do tempo para uma cidade usando a API do OpenWeatherMap.

## Recursos

- Busca por cidade (nome) usando a API Current Weather (OpenWeatherMap)
- Exibição de: descrição, cidade/país, temperatura, sensação térmica, umidade, vento, visibilidade, pressão e ícone do clima
- Loader (spinner) agradável enquanto a requisição é processada (mínimo 2s de exibição)
- Design moderno com gradiente e blur
- Responsivo para dispositivos móveis (media queries)
- Acessibilidade básica (label oculto para leitores de tela, aria-live na seção de carregamento)

## Estrutura do projeto

- `index.html` — HTML principal
- `styles.css` — estilos (desktop + mobile)
- `script.js` — lógica JavaScript para buscar e exibir dados
- `assets/` — imagens e ícones locais

## Pré-requisitos

- Navegador moderno (Chrome, Firefox, Edge, Safari)
- Chave de API do OpenWeatherMap (gratuita com cadastro)

## Obter uma chave API

1. Crie uma conta em https://home.openweathermap.org/users/sign_up
2. Vá até "API keys" e copie sua chave (ex.: `YOUR_API_KEY`)

## Configurar a chave da API

Por simplicidade o projeto atualmente usa a chave no `script.js`. Procure a linha:

```js
const api = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=49c7978f02c3bb628a4811d754ae8ccc&lang=pt_br&units=metric`;
```

Substitua a chave embutida por sua chave (ou use uma variável/camada de servidor para protegê-la):

```js
const apiKey = 'SUA_CHAVE_AQUI';
const api = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&lang=pt_br&units=metric`;
```

Observação de segurança: nunca exponha chaves sensíveis em repositórios públicos. Para produção, coloque a chave em um backend ou use rotas serverless que façam a chamada à API.

## Rodar localmente

A forma mais simples é abrir `index.html` diretamente no navegador. Entretanto, algumas APIs (ou extensões) podem exigir servidor HTTP para evitar problemas de CORS com arquivos locais. Recomendo rodar um servidor estático simples:

Com Python 3 (diretório do projeto):

```bash
python -m http.server 8000
# depois abra http://localhost:8000
```

Com Node (servir com `npx serve`):

```bash
npx serve .
# ou instalar globalmente: npm i -g serve
```

## Uso

1. Abra a página
2. Digite o nome da cidade no campo de busca
3. Clique em "Buscar"
4. O spinner será exibido por pelo menos 2 segundos; ao receber a resposta, os dados serão mostrados

## Personalização e melhorias sugeridas

- Autocomplete de cidades usando a Geocoding API do OpenWeatherMap para sugerir cidades enquanto o usuário digita.
- Usar One Call API para previsões horárias e diárias (requer chave e plano apropriado).
- Substituir `alert()` por mensagens UI-friendly (toast ou área de erro dentro do layout).
- Implementar cache/localStorage para evitar chamadas repetidas ao pesquisar a mesma cidade em curto período.
- Melhorar a proteção da API: mover chamadas para um backend simples ou usar um proxy que esconda a chave.
- Adicionar testes automatizados simples (unitários) para funções utilitárias.

## Acessibilidade

- Label do input foi adicionado como `.sr-only` para leitores de tela.
- A seção de carregamento tem `role="status"` e `aria-live="polite"`.
- Considere verificar contraste de cores para usuários com baixa visão.

## Licença

Sinta-se à vontade para usar e adaptar o código. Não inclui dependências externas além de Font Awesome e Google Fonts. Se quiser, adiciono uma licença explicita (MIT/Apache) ao repositório.

## Contato

Se precisar que eu implemente alguma das melhorias (autocomplete, proteção da API, toasts, transições) — diga qual e eu aplico no projeto.

Links úteis:

- Deploy (GitHub Pages): https://felipeoliveiracode.github.io/previsao-tempo/
- LinkedIn: https://www.linkedin.com/in/felipeoliveiracode/
