# Guia de contribuição

Este repositório segue o modelo de ramificação **GitFlow**. O objetivo é que várias pessoas trabalhem ao mesmo tempo sem perder alterações nem sobrescrever o trabalho umas das outras.

## Branches

| Branch | Criada a partir de | É mesclada em | Para que serve |
|---|---|---|---|
| `main` | — | — | Código em produção. Cada commit é uma versão publicada e tem uma *tag* (`v1.0.0`). |
| `develop` | `main` | — | Integração. Contém o que vai entrar na próxima versão. |
| `feature/<nome>` | `develop` | `develop` | Uma funcionalidade ou documentação nova. |
| `release/<versão>` | `develop` | `main` e `develop` | Preparação de uma versão: CHANGELOG, número de versão e ajustes finais. |
| `hotfix/<versão>` | `main` | `main` e `develop` | Correção urgente de um problema em produção. |

Regras:

- Ninguém faz commit direto em `main` ou `develop`. Todo trabalho passa por uma branch de apoio.
- Os nomes ficam em minúsculas, com hífen: `feature/validacao-cpf`, `hotfix/1.0.1`.
- Os merges usam `--no-ff`, para o histórico mostrar onde cada branch começou e terminou.

## Fluxos

### Nova funcionalidade

```bash
git switch develop
git pull
git switch -c feature/minha-funcionalidade
# ... commits ...
git switch develop
git merge --no-ff feature/minha-funcionalidade
git branch -d feature/minha-funcionalidade
```

### Lançamento de versão

```bash
git switch -c release/1.1.0 develop
# atualizar o CHANGELOG.md e fazer o commit
git switch main
git merge --no-ff release/1.1.0
git tag -a v1.1.0 -m "Versão 1.1.0"
git switch develop
git merge --no-ff release/1.1.0
git branch -d release/1.1.0
```

### Correção urgente

```bash
git switch -c hotfix/1.0.1 main
# corrigir, atualizar o CHANGELOG.md e fazer o commit
git switch main
git merge --no-ff hotfix/1.0.1
git tag -a v1.0.1 -m "Versão 1.0.1"
git switch develop
git merge --no-ff hotfix/1.0.1
git branch -d hotfix/1.0.1
```

## Mensagens de commit

O projeto usa o padrão [Conventional Commits](https://www.conventionalcommits.org/pt-br/):

```
<tipo>: <descrição curta no imperativo>

<corpo opcional explicando o porquê>
```

| Tipo | Quando usar |
|---|---|
| `feat` | Nova funcionalidade |
| `fix` | Correção de bug |
| `docs` | Apenas documentação |
| `style` | Formatação ou CSS, sem mudar comportamento |
| `refactor` | Reestruturação de código sem mudar comportamento |
| `chore` | Configuração, `.gitignore`, manutenção |

Exemplos:

```
feat: adiciona validação de CPF no cadastro
fix: corrige link ativo do menu na página de contato
docs: documenta a estrutura de rotas no README
```

## Versionamento

As versões seguem o [Versionamento Semântico](https://semver.org/lang/pt-BR/), no formato `MAJOR.MINOR.PATCH`:

- **MAJOR:** mudança incompatível com a versão anterior.
- **MINOR:** funcionalidade nova, compatível.
- **PATCH:** correção de bug.

Toda versão é registrada no [CHANGELOG.md](CHANGELOG.md).

## Antes de mesclar

- [ ] O site abre no servidor local sem erros no console.
- [ ] Todas as rotas funcionam, inclusive a 404.
- [ ] O README foi atualizado, se a mudança afetar o uso ou a estrutura.
- [ ] As mensagens de commit seguem o padrão.
