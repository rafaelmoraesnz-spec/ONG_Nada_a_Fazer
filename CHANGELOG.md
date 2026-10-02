# Changelog

Todas as mudanças relevantes do projeto ficam registradas aqui.

O formato segue o [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e as versões seguem o [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [Não lançado]

## [1.2.0] - 2026-10-01

### Adicionado

- Landmark `<footer>`, `<nav>` rotulado, link "Pular para o conteúdo" e `aria-current` no menu (#7, PR #11).
- Formulário acessível: `aria-required`, `aria-describedby`, `aria-invalid`, foco no primeiro erro e `role="status"` (#7, PR #11).
- Blocos da página Missão acessíveis pelo teclado e foco visível em todos os elementos (#7, PR #11).
- Temas claro, escuro (automático ou manual) e alto contraste (#7, PR #11).
- Build de produção com Vite e minificação de HTML, CSS e JS (#8, PR #12).
- Deploy automático no GitHub Pages a cada push na `main` (#10, PR #14).

### Alterado

- Imagem convertida para WebP, com JPEG como alternativa e versões de 320 e 640 px por `srcset` (#9, PR #13).
- A imagem passa a ser exibida no tamanho real (640x360), não mais ampliada.

### Corrigido

- Contraste da mensagem de erro: de 3.99:1 para 7.32:1 (#7, PR #11).
- O arquivo `nada.jpg` era um PNG de 265,8 kB com extensão errada (#9, PR #13).

## [1.1.0] - 2026-10-01

### Corrigido

- O rótulo do CPF no `cadastro.html` apontava para o campo de nascimento. O campo de CPF ganhou `id` e `name` (#1, PR #4).
- O campo de e-mail do `cadastro.html` não tinha `id` nem `name` (#2, PR #4).

### Adicionado

- Seção sobre o fluxo de branches (GitFlow) e o uso de issues, milestones e pull requests no README (#3, PR #5).

## [1.0.0] - 2026-10-01

### Adicionado

- SPA com roteamento por hash e as páginas *Quem somos*, *Missão*, *Contato*, *Cadastro* e 404.
- Destaque do link ativo no menu e do artigo clicado na página *Missão*.
- Confirmação antes de abrir o discador pelo link de telefone.
- Formulário de cadastro com validação e mensagens de erro em cada campo.
- Mensagem de boas-vindas personalizada, com nome e cor favorita salvos no `localStorage`.
- `.gitignore` para arquivos de editor e do sistema operacional.
- Documentação: `README.md`, `CONTRIBUTING.md` (GitFlow e Conventional Commits) e este `CHANGELOG.md`.

[Não lançado]: https://github.com/rafaelmoraesnz-spec/ONG_Nada_a_Fazer/compare/v1.2.0...develop
[1.2.0]: https://github.com/rafaelmoraesnz-spec/ONG_Nada_a_Fazer/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/rafaelmoraesnz-spec/ONG_Nada_a_Fazer/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/rafaelmoraesnz-spec/ONG_Nada_a_Fazer/releases/tag/v1.0.0
