# Changelog

Todas as mudanças relevantes do projeto ficam registradas aqui.

O formato segue o [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e as versões seguem o [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [Não lançado]

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

[Não lançado]: https://github.com/rafaelmoraesnz-spec/ONG_Nada_a_Fazer/compare/v1.1.0...develop
[1.1.0]: https://github.com/rafaelmoraesnz-spec/ONG_Nada_a_Fazer/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/rafaelmoraesnz-spec/ONG_Nada_a_Fazer/releases/tag/v1.0.0
