// script.js - ONG Nada a fazer (SPA com roteamento por hash)
console.log('script carregado');

const app = document.getElementById('app');
const linksMenu = document.querySelectorAll('nav a');

const rotas = {
    '/': { template: 'tpl-sobre', titulo: 'Quem somos' },
    '/missao': { template: 'tpl-missao', titulo: 'Missão' },
    '/contato': { template: 'tpl-contato', titulo: 'Contato' },
    '/cadastro': { template: 'tpl-cadastro', titulo: 'Cadastro' },
};


// Evita roubar o foco no primeiro carregamento da página
let navegou = false;

function rotaAtual() {
    return location.hash.slice(1) || '/';
}

function render() {
    const caminho = rotaAtual();
    const rota = rotas[caminho];
    const tpl = document.getElementById(rota ? rota.template : 'tpl-404');

    app.replaceChildren(tpl.content.cloneNode(true));
    document.title = `ONG Nada a fazer – ${rota ? rota.titulo : 'Não encontrada'}`;

    linksMenu.forEach(link => {
        const ativo = link.getAttribute('href') === `#${caminho}`;
        link.classList.toggle('ativo', ativo);
        // Informa ao leitor de tela qual é a página atual
        if (ativo) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
    });

    // Ao trocar de página, leva o foco para o novo conteúdo
    if (navegou) app.focus();
    navegou = true;

    // if (caminho === '/teste') {
    //     const nome = 'Rafa';
    //     app.innerHTML = `<h2>Teste do innerHTML</h2><p>Olá, ${nome}!</p>`;

    if (caminho === '/') {
        const titulo = app.querySelector('h2');
        const paragrafo = app.querySelector('p');
        const imagem = app.querySelector('img');

        // Modificando conteúdo
        titulo.textContent = 'Quem somos nós';
        paragrafo.innerHTML = '<strong>A ONG Nada a fazer alimenta você a cada 6 meses</strong>';

        // Modificando atributos
        imagem.setAttribute('alt', 'Foto da ONG');
        titulo.classList.add('titulo-destaque');

        // Recuperando dados
        const usuario = localStorage.getItem('usuario');
        const preferencias = JSON.parse(localStorage.getItem('preferencias'));

        if (usuario) {
            const boasVindas = document.createElement('p');
            boasVindas.textContent = `Bem-vindo(a) de volta, ${usuario}!`;
            boasVindas.style.color = preferencias.cor;
            titulo.after(boasVindas);
        }

    }

    if (caminho === '/missao') {
        const valores = app.querySelectorAll('#missao li');
        console.log(`A ONG tem ${valores.length} valores:`);
        valores.forEach((item, i) => console.log(`${i + 1}. ${item.textContent}`));
    }
}


window.addEventListener('hashchange', render);
window.addEventListener('DOMContentLoaded', render);

// ===== Tema de cores (claro, escuro e alto contraste) =====
const botoesTema = document.querySelectorAll('.temas button');
const sistemaEscuro = window.matchMedia('(prefers-color-scheme: dark)');

// Sem escolha salva, o tema segue o sistema operacional
function temaAtual() {
    return document.documentElement.dataset.tema || (sistemaEscuro.matches ? 'escuro' : 'claro');
}

// aria-pressed informa ao leitor de tela qual botão está ativo
function atualizarBotoesTema() {
    const tema = temaAtual();
    botoesTema.forEach(botao => {
        botao.setAttribute('aria-pressed', String(botao.dataset.tema === tema));
    });
}

botoesTema.forEach(botao => {
    botao.addEventListener('click', () => {
        document.documentElement.dataset.tema = botao.dataset.tema;
        try { localStorage.setItem('tema', botao.dataset.tema); } catch (e) { }
        atualizarBotoesTema();
    });
});

sistemaEscuro.addEventListener('change', atualizarBotoesTema);
atualizarBotoesTema();

// "Pular para o conteúdo": foca o <main> sem alterar a rota do hash
document.querySelector('.pular-conteudo').addEventListener('click', (evento) => {
    evento.preventDefault();
    app.focus();
});


// Destaca o artigo escolhido e informa o estado ao leitor de tela
function destacarArtigo(artigo) {
    app.querySelectorAll('#missao article').forEach(a => {
        a.classList.remove('ativo');
        a.setAttribute('aria-current', 'false');
    });
    artigo.classList.add('ativo');
    artigo.setAttribute('aria-current', 'true');
}

// Permite destacar o artigo pelo teclado (Enter ou Espaço)
app.addEventListener('keydown', (evento) => {
    const artigo = evento.target.closest('#missao article');
    if (artigo && (evento.key === 'Enter' || evento.key === ' ')) {
        evento.preventDefault();
        destacarArtigo(artigo);
    }
});

app.addEventListener('click', (evento) => {
    // Destacar o artigo clicado
    const artigo = evento.target.closest('#missao article');
    if (artigo) destacarArtigo(artigo);

    const tel = evento.target.closest('a[href^="tel:"]');
    if (tel && !confirm('Deseja ligar para a ONG?')) {
        evento.preventDefault();
    }
});

// app.addEventListener('submit', (evento) => {
//     evento.preventDefault();
//     const dados = Object.fromEntries(new FormData(evento.target));
//     console.log('Cadastro enviado:', dados);

//     const aviso = document.createElement('p');
//     aviso.textContent = `Obrigado, ${dados.nome}! Cadastro recebido.`;
//     evento.target.replaceWith(aviso);
// });
app.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const form = evento.target;

    // Apaga as mensagens de erro antigas
    form.querySelectorAll('.erro').forEach(msg => msg.remove());

    let primeiroErro = null;

    // Confere cada campo
    form.querySelectorAll('input').forEach(campo => {
        // Descrição original do campo (dica de formato), sem erros anteriores
        const dica = campo.dataset.dica ?? campo.getAttribute('aria-describedby') ?? '';
        campo.dataset.dica = dica;

        if (!campo.checkValidity()) {
            primeiroErro ??= campo;

            // Cor e borda do erro vêm do CSS (.erro e [aria-invalid]), conforme o tema
            const msg = document.createElement('small');
            msg.className = 'erro';
            msg.id = `erro-${campo.id}`;
            msg.textContent = campo.value === '' ? 'Campo obrigatório' : 'Formato inválido';
            campo.after(msg);

            // Marca o campo como inválido e liga a mensagem de erro a ele
            campo.setAttribute('aria-invalid', 'true');
            campo.setAttribute('aria-describedby', `${msg.id} ${dica}`.trim());
        } else {
            campo.removeAttribute('aria-invalid');
            if (dica) campo.setAttribute('aria-describedby', dica);
            else campo.removeAttribute('aria-describedby');
        }
    });


    // Leva o foco ao primeiro campo com erro; o leitor de tela lê a mensagem ligada a ele
    if (primeiroErro) {
        primeiroErro.focus();
        return;
    }

    const dados = Object.fromEntries(new FormData(form));
    console.log('Cadastro enviado:', dados);

    // Armazenando dados
    localStorage.setItem('usuario', dados.nome);
    localStorage.setItem('preferencias', JSON.stringify({ cor: dados.cor }));

    // role="status" faz o leitor de tela anunciar a confirmação
    const aviso = document.createElement('p');
    aviso.setAttribute('role', 'status');
    aviso.textContent = `Obrigado, ${dados.nome}! Cadastro recebido.`;
    form.replaceWith(aviso);
});