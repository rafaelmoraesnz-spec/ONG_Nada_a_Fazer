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
        link.classList.toggle('ativo', link.getAttribute('href') === `#${caminho}`);
    });

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
        titulo.style.backgroundColor = 'lightblue';

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


app.addEventListener('click', (evento) => {
    // Destacar o artigo clicado
    const artigo = evento.target.closest('#missao article');
    if (artigo) {
        app.querySelectorAll('#missao article').forEach(a => a.classList.remove('ativo'));
        artigo.classList.add('ativo');
    }

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

    let temErro = false;

    // Confere cada campo
    form.querySelectorAll('input').forEach(campo => {
        if (!campo.checkValidity()) {
            temErro = true;
            campo.style.border = '2px solid red';

            const msg = document.createElement('small');
            msg.className = 'erro';
            msg.style.color = 'red';
            msg.textContent = campo.value === '' ? 'Campo obrigatório' : 'Formato inválido';
            campo.after(msg);
        } else {
            campo.style.border = '';
        }
    });


    if (temErro) return;

    const dados = Object.fromEntries(new FormData(form));
    console.log('Cadastro enviado:', dados);

    // Armazenando dados
    localStorage.setItem('usuario', dados.nome);
    localStorage.setItem('preferencias', JSON.stringify({ cor: dados.cor }));

    const aviso = document.createElement('p');
    aviso.textContent = `Obrigado, ${dados.nome}! Cadastro recebido.`;
    form.replaceWith(aviso);
});