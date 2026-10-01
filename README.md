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

## Como executar

O projeto não tem dependências para instalar. Como as páginas são montadas a partir de `<template>`, use um servidor HTTP local em vez de abrir o arquivo direto:

```bash
python -m http.server 8123
```

Depois acesse <http://localhost:8123>.

Outra opção é a extensão **Live Server** do VS Code.

## Estrutura do projeto

```
.
├── index.html        # Página única: cabeçalho, menu e templates das rotas
├── script.js         # Roteador, eventos e validação do cadastro
├── style.css         # Estilos do menu, da missão e do formulário
├── cadastro.html     # Versão isolada e anterior do formulário (referência)
├── imagens/
│   └── nada.jpg      # Imagem da página "Quem somos"
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
