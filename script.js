let dataInscri = [
    { id: "1", prog: "01", nome: "Raul Plassmann ",  campus: "Paranavaí",        funcao: "Goleiro",      dt: "14/08/2025" },
    { id: "2", prog: "02", nome: "Cantareli",        campus: "Paranaguá",        funcao: "Goleiro",     dt: "14/08/2025" },
    { id: "3", prog: "03", nome: "Figueiredo",       campus: "União da Vitória", funcao: "Zagueiro",     dt: "14/08/2025" },
    { id: "4", prog: "04", nome: "Carlos Mozer",     campus: "União da Vitória", funcao: "Zagueiro",     dt: "14/08/2025" },
    { id: "5", prog: "05", nome: "Marinho",          campus: "Apucarana",        funcao: "Zagueiro",     dt: "14/08/2025" },
    { id: "6", prog: "06", nome: "Junior",           campus: "Apucarana",        funcao: "Lateral Esq.", dt: "14/08/2025" },
    { id: "7", prog: "07", nome: "Leandro",          campus: "Apucarana",        funcao: "Lateral Dir.", dt: "14/08/2025" },
    { id: "8", prog: "08", nome: "Andrade",          campus: "Apucarana",        funcao: "Volante",      dt: "14/08/2025" }
];

// Apaga lista antes de recriar
function deleteListarInscricoes() {
    const elementoPai = document.getElementById("listaInscricoes");
    if (elementoPai) elementoPai.innerHTML = "";
}

// Mostra/esconde botões conforme posição
function atualizarBotoes() {
    const divs = document.querySelectorAll("#listaInscricoes .alert");
    divs.forEach((div, index) => {
        div.querySelector(".btn-first").style.display = index === 0 ? "none" : "";
        div.querySelector(".btn-up").style.display    = index === 0 ? "none" : "";
        div.querySelector(".btn-down").style.display  = index === divs.length - 1 ? "none" : "";
        div.querySelector(".btn-last").style.display  = index === divs.length - 1 ? "none" : "";
    });
}

// Move para posição exata
function moverDiv(div, novaPosicao) {
    const lista = document.getElementById("listaInscricoes");
    const divs = Array.from(lista.children);
    lista.insertBefore(div, divs[novaPosicao] || null);
    atualizarBotoes();
}

// Move uma posição para baixo
function moverParaBaixo(div) {
    const lista = document.getElementById("listaInscricoes");
    const divs = Array.from(lista.children);
    const pos = divs.indexOf(div);

    if (pos < divs.length - 1) {
        lista.insertBefore(div, divs[pos + 2] || null);
    }
    atualizarBotoes();
}

// Move para última posição
function moverParaUltima(div) {
    const lista = document.getElementById("listaInscricoes");
    lista.appendChild(div);
    atualizarBotoes();
}

// Cria botão
function criarBotao(classe, simbolo, acao) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `btn btn-sm btn-light ${classe}`;
    btn.innerHTML = simbolo;
    btn.onclick = acao;
    return btn;
}

function cores(cor) {
    switch (cor) {
        case 'Goleiro':
            return 'success';
            break;
        case 'Zagueiro':
            return 'info';
            break;
        default :
            return 'secondary';
    }
}

// Monta a lista
function listarInscricoes() {
    const elementoPaiDiv = document.getElementById("listaInscricoes");
    deleteListarInscricoes();

    dataInscri.forEach(e => {
        const div = document.createElement("div");
        let cor = cores(e.funcao);

        div.className = `alert alert-${cor} alert-dismissible fade show d-flex justify-content-between align-items-center`;
        div.id = e.id;

        const info = document.createElement("div");

        info.innerHTML = `
            <strong>${e.prog}</strong> ${e.nome} 
            <span class="badge badge-secondary">${e.campus}</span> ${e.funcao}.
            <span class="badge badge-secondary">${e.dt}</span>
        `;

        const botoes = document.createElement("div");
        botoes.appendChild(criarBotao("btn-first", "⏫", () => moverDiv(div, 0)));
        botoes.appendChild(criarBotao("btn-up", "🔼", () => {
            const pos = Array.from(elementoPaiDiv.children).indexOf(div);
            moverDiv(div, pos - 1);
        }));
        botoes.appendChild(criarBotao("btn-down", "🔽", () => moverParaBaixo(div)));
        botoes.appendChild(criarBotao("btn-last", "⏬", () => moverParaUltima(div)));

        const btnFechar = document.createElement("button");
        btnFechar.type = "button";
        btnFechar.className = "fechar close";
        btnFechar.setAttribute("aria-label", "Close");
        btnFechar.innerHTML = `<span aria-hidden="true">&times;</span>`;
        btnFechar.onclick = () => {
            div.remove();
            atualizarBotoes();
        };
        botoes.appendChild(btnFechar);

        div.appendChild(info);
        div.appendChild(botoes);
        elementoPaiDiv.appendChild(div);
    });

    atualizarBotoes();
}

// Caso fosse buscar da API, bastaria trocar por getDataInscri()
listarInscricoes();
