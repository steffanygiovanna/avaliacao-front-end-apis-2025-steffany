
# Desafio Front-end - Nível Jr

## Objetivo

O objetivo deste desafio é avaliar suas habilidades em desenvolvimento de páginas web front-end. Você deverá criar uma UI simples que consome uma API pública, exibe os dados em uma lista, permite a navegação para uma tela de detalhes e possui uma funcionalidade de busca.

## Requisitos

- **Plataforma:** Web (Front-end).
- **Linguagem:** O código principal do aplicativo deve ser escrito em HTML, CSS e JavaScript (ou TypeScript).
- **Framework:** Sem frameworks pesados, mas você pode usar bibliotecas leves como React ou Vue.js ou Bootstrap.
- **API:** Utilize a API pública [JSONPlaceholder](https://jsonplaceholder.typicode.com/) para obter os dados e a API [DummyJSON](https://dummyjson.com/docs/auth) para autenticação de usuários.

## Funcionalidades

### 1. Tela de Login

- Crie uma tela de login com campos para usuário e senha.
- Utilize a API [DummyJSON](https://dummyjson.com/docs/auth) para autenticar o usuário. A rota de autenticação é `https://dummyjson.com/auth/login`.
- As credenciais do usuário devem ser armazenadas de forma segura no dispositivo (por exemplo, usando LocalStorage) para que o usuário permaneça logado ao fesair e entrar na página junto com a estratégia de refreshtoken quando o token do usuário expirar.
- Adicione uma funcionalidade de logout.

### 2. Tela de Listagem de Posts

- Após o login, a primeira tela deve exibir uma lista de posts em forma de cards.
- Cada item da lista deve exibir o título do post.
- Os dados dos posts devem ser obtidos da rota `/posts` da API do JSONPlaceholder.

### 3. Tela de Detalhes do Post

- Ao tocar em um item da lista, o usuário deve ser redirecionado para um modal de detalhes do post.
- O modal de detalhes deve exibir o título e o corpo do post.
- Os dados do post podem ser passados da tela de listagem ou obtidos da rota `/posts/:id` da API.

### 4. Funcionalidade de Busca

- Na tela de listagem, adicione um campo de busca para filtrar os posts pelo título.
- A busca deve ser realizada em tempo real, à medida que o usuário digita.

### 5. Responsividade UX

- A interface deve ser responsiva e funcionar bem em dispositivos móveis e desktops.
- Utilize boas práticas de design responsivo, como media queries e flexbox ou grid layout.

## Estrutura do Projeto

- Organize o código-fonte em uma estrutura clara e coesa. Sugerimos a seguinte estrutura:

```
/index.html
/pages/
  /login.html
  /posts.html
/styles
  /main.css
/scripts
  /login.js
  /posts.js
```
- Os arquivos já estão criados, mas você pode reorganizar conforme necessário.
- A folha de estilos main.css já está vinculada as páginas HTML, mas você pode criar outras folhas de estilos se necessário.
  - Não é necessário utilizar as fontes, paleta de cores em main.css pode utilizar sua criatividade para criar uma UI agradável.

## Avaliação

Serão avaliados os seguintes pontos:

- **Qualidade do código:** Clareza, organização, manutenibilidade e boas práticas de programação.
- **Estilo e UI e UX:** A interface do usuário deve ser limpa, intuitiva e responsiva.
- **Funcionalidade:** O aplicativo deve atender a todos os requisitos funcionais descritos.

## Como Entregar

1. Crie um fork deste repositório.
2. Implemente a solução.
3. Faça commits frequentes e claros.
