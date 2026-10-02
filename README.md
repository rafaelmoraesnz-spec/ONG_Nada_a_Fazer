# ONG Nada a fazer

Site institucional da ONG **Nada a fazer** (Campinas/SP), feito como uma *Single Page Application* (SPA) em HTML, CSS e JavaScript puro, sem framework e sem etapa de build.

## Funcionalidades

- **Navegação sem recarregar a página:** roteamento por *hash* (`#/`, `#/missao`, `#/contato`, `#/cadastro`).
- **Páginas:**
  - *Quem somos:* apresentação da ONG, com imagem.
  - *Missão:* missão, visão e valores. Clicar em um bloco destaca o artigo.
  - *Contato:* endereço, telefone e e-mail. Antes de abrir o discador, o site pede confirmação.
  - *Cadastro:* formulário com validação nativa do HTML5 e mensagens de erro em cada campo.
- **Página 404** para rotas que não existem.
- **Persistência local:** o nome e a cor favorita informados no cadastro ficam no `localStorage` e aparecem numa mensagem de boas-vindas na página inicial.

## Tecnologias

| Tecnologia | Uso |
|---|---|
| HTML5 | Estrutura, elementos `<template>` para cada página e formulário com `pattern` |
| CSS3 | Estilos próprios em `style.css` |
| [Bootstrap 5.3](https://getbootstrap.com/) | Estilos base, carregados via CDN |
| JavaScript (ES6+) | Roteamento, manipulação do DOM, validação e `localStorage` |
| [Vite 8](https://vite.dev/) | Servidor de desenvolvimento e *build* de produção minificado |

## Pré-requisitos

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) 20 ou superior (já inclui o `npm`)
- Um navegador atualizado

## Instalação

```bash
git clone https://github.com/rafaelmoraesnz-spec/ONG_Nada_a_Fazer.git
cd ONG_Nada_a_Fazer
npm install
```

O `npm install` instala as dependências de desenvolvimento listadas no `package.json`: `vite` e `html-minifier-terser`.

## Como executar

| Comando | O que faz |
|---|---|
| `npm run dev` | Abre o site em modo de desenvolvimento em <http://localhost:8123>, recarregando a cada alteração |
| `npm run build` | Gera a versão de produção minificada na pasta `dist/` |
| `npm run preview` | Serve a pasta `dist/` em <http://localhost:8123> para conferir o *build* |

## Build de produção

O *bundler* é o **Vite**, configurado em `vite.config.js`:

- **JavaScript:** minificado pelo Vite (Oxc). Remove espaços, comentários e encurta nomes de variáveis.
- **CSS:** minificado pelo Vite (Lightning CSS).
- **HTML:** o Vite não minifica HTML. Um plugin próprio no `vite.config.js` usa o `html-minifier-terser` para remover espaços, quebras de linha e comentários do `index.html`.
- **Cache:** os arquivos gerados em `dist/assets/` recebem um *hash* no nome (`index-BJbRTBxG.js`), então o navegador sempre baixa a versão nova depois de um deploy.

Resultado do *build* da versão 1.2.0:

| Arquivo | Original | Minificado | Redução |
|---|---|---|---|
| `index.html` | 5,9 kB | 4,1 kB | 29% |
| `style.css` | 3,8 kB | 2,5 kB | 35% |
| `script.js` | 7,4 kB | 4,2 kB | 43% |

A pasta `dist/` não é versionada (está no `.gitignore`), porque é gerada a cada *build*.

### Testes

O projeto ainda não tem testes automatizados. Antes de cada merge, a verificação é manual, seguindo a checklist do [CONTRIBUTING.md](CONTRIBUTING.md#antes-de-mesclar).

## Estrutura do projeto

```
.
├── index.html        # Página única: cabeçalho, menu e templates das rotas
├── script.js         # Roteador, eventos e validação do cadastro
├── style.css         # Estilos do menu, da missão e do formulário
├── cadastro.html     # Versão isolada e anterior do formulário (referência)
├── imagens/
│   └── nada.jpg      # Imagem da página "Quem somos"
├── package.json      # Scripts (dev, build, preview) e dependências
├── vite.config.js    # Configuração do build e da minificação
├── dist/             # Build de produção (gerado, fora do Git)
├── README.md         # Este documento
├── CONTRIBUTING.md   # Fluxo de trabalho (GitFlow) e padrão de commits
└── CHANGELOG.md      # Histórico de versões
```

## Arquitetura

1. Cada página é um `<template id="tpl-...">` dentro de `index.html`.
2. O objeto `rotas` em `script.js` liga cada caminho ao template e ao título da página.
3. A função `render()` roda nos eventos `DOMContentLoaded` e `hashchange`. Ela:
   - clona o template da rota atual para dentro de `<main id="app">`;
   - atualiza o `document.title`;
   - marca o link ativo no menu com a classe `.ativo`.
4. Os eventos de clique e de envio usam **delegação** no elemento `#app`. Por isso continuam funcionando quando o conteúdo é trocado.

### Como adicionar uma página

1. Crie um `<template id="tpl-nova">` em `index.html`.
2. Inclua a rota em `rotas`, dentro de `script.js`: `'/nova': { template: 'tpl-nova', titulo: 'Nova' }`.
3. Adicione o link `<a href="#/nova">Nova</a>` no `<nav>`.

## Regras de validação do cadastro

| Campo | Regra |
|---|---|
| Nome completo | Obrigatório |
| E-mail | Formato `usuario@dominio.ext` |
| Telefone | `99-99999-9999` |
| CPF | `000.000.000-00` |

## Fluxo de branches (GitFlow)

| Branch | Função |
|---|---|
| `main` | Versão publicada. Cada versão recebe uma tag (`v1.0.0`, `v1.1.0`…). |
| `develop` | Desenvolvimento do dia a dia. Reúne as funcionalidades concluídas. |
| `feature/*` | Uma funcionalidade ou correção. Sai da `develop` e volta para ela por *pull request*. |
| `release/*` | Preparação de uma versão. Sai da `develop` e vai para a `main` e de volta para a `develop`. |
| `hotfix/*` | Correção urgente em produção. Sai da `main` e volta para a `main` e para a `develop`. |

```
main     ●──────────────────────●  v1.0.0 ──────────────●  v1.1.0
          \                    /  \                    /
develop    ●────●────●────●───●────●────●────●────●───●
                 \  /  \  /             \  /  \  /
feature           ●      ●               ●      ●
```

### Gestão do trabalho no GitHub

- **Issues:** cada bug ou tarefa é registrado como uma *issue* antes de começar.
- **Milestones:** as issues de uma mesma versão ficam agrupadas num *milestone* com o nome da versão (por exemplo, `v1.1.0`).
- **Pull requests:** toda branch entra na `develop` ou na `main` por *pull request*. A descrição do PR explica o motivo e a forma da alteração e fecha as issues relacionadas com `Closes #n`.

## Contribuindo

Leia o [CONTRIBUTING.md](CONTRIBUTING.md) antes de abrir uma branch. Ele traz os comandos de cada fluxo e o padrão de commits.

## Autor

Rafael Moraes. Projeto acadêmico, Prática 03.
