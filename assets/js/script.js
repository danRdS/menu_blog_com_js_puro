const fundoMenu = document.querySelector('.fundo-menu');
const menuLateral = document.querySelector('.menu-lateral');

const abrirFecharMenu = () => {
    fundoMenu.classList.add('fundo-menu-visivel');
    menuLateral.classList.add('menu-lateral-aberto');
}

const fecharMenu = () => {
    fundoMenu.classList.remove('fundo-menu-visivel');
    menuLateral.classList.remove('menu-lateral-aberto');
}

const body = document.querySelector('body');
const valorTamanhoFonte = document.getElementById('valorTamanhoFonte');
let tamanhoProvisorioFonte, tamanhoFonte = 16;
const modalConfig = document.getElementById('modalConfig');
let modoClaro = false;
let modoClaroProvisorio = false;

const abrirFecharModalConfig = () => {
    modalConfig.classList.toggle('aberto');
}

const fecharModalConfig = evento => {
    evento.target == modalConfig ? cancelarConfiguracao() : null;
}

const selecao_fontes = document.getElementById('selecao_fontes');
let fonteAtual = 'Segoe UI';
let fonteProvisoria = 'Segoe UI';

selecao_fontes.addEventListener('change', () => {
    fonteProvisoria = selecao_fontes.value;
});

const obterValorRange = valorRange => {
    body.style.setProperty('--porcentagem', `calc(${valorRange*2}% - 10%)`);
    tamanhoProvisorioFonte = valorRange;
    valorTamanhoFonte.innerText = valorRange;
}

const mudarTema = valorBtnMudarTema => {
    const imagemMenu = document.getElementById('imagemMenu');
    modoClaroProvisorio = valorBtnMudarTema;
    if(valorBtnMudarTema) {
        body.style.setProperty('--corFundoPrincipal', 'rgb(241, 241, 241)');
        body.style.setProperty('--corDeFundoHeader', '#fbfbfb');
        body.style.setProperty('--corBoxShadowHeader', 'rgb(51, 175, 175)');
        body.style.setProperty('--corPrimaria', '#21212a')
        body.style.setProperty('--corBtnMenuClicado', 'rgb(180, 199, 206)');
        body.style.setProperty('--corPrimariaMenuLateral', '#ebeffd');
        body.style.setProperty('--corSecundariaMenuLateral', '#b0c0f9');

        body.style.setProperty('--corPrimariaHoverOpcaoMenuLateral', '#dcd6f1');
        body.style.setProperty('--corSecundariaHoverOpcaoMenuLateral', '#a296f1');
        body.style.setProperty('--corBoxShadowOpcaoMenuLateral', '#09f');        

        body.style.setProperty('--corPrimariaFundoModalConfig', '#e7e7e7');
        body.style.setProperty('--corSecundariaFundoModalConfig', 'rgb(75, 75, 94)');
        body.style.setProperty('--corLetrasModalConfig', 'rgb(89, 43, 226)');
        body.style.setProperty('--corBarraRolagem', 'rgb(51, 175, 175)');
        imagemMenu.setAttribute('src', 'assets/images/imagem5.jpeg');
    } else {
        body.style.setProperty('--corFundoPrincipal', '#181818');
        body.style.setProperty('--corDeFundoHeader', '#21212a');
        body.style.setProperty('--corBoxShadowHeader', 'rgb(0, 0, 0)');
        body.style.setProperty('--corPrimaria', '#e7e7e7');
        body.style.setProperty('--corBtnMenuClicado', '#2e3230');
        body.style.setProperty('--corPrimariaMenuLateral', '#403f44');
        
        body.style.setProperty('--corPrimariaHoverOpcaoMenuLateral', '#403f44');
        body.style.setProperty('--corSecundariaHoverOpcaoMenuLateral', '#181818');
        body.style.setProperty('--corBoxShadowOpcaoMenuLateral', '#000');
        
        body.style.setProperty('--corSecundariaMenuLateral', '#1e1b32');
        body.style.setProperty('--corPrimariaFundoModalConfig', 'rgb(75,75,94)');
        body.style.setProperty('--corSecundariaFundoModalConfig', 'rgb(44, 44, 55)');
        body.style.setProperty('--corLetrasModalConfig', '#e7e7e7');
        body.style.setProperty('--corBarraRolagem', '#48474a');
        imagemMenu.setAttribute('src', 'assets/images/imagem6.jpeg');
    }
}

const cancelarConfiguracao = () => {
    abrirFecharModalConfig();
    const range = document.getElementById('range');
    const btn__mudaTema = document.getElementById('btn__mudaTema');
    modoClaro != modoClaroProvisorio ? mudarTema(modoClaro) : null;
    fonteProvisoria = fonteAtual;
    
    setTimeout(() => {
        obterValorRange(tamanhoFonte);
        range.value = tamanhoFonte;
        btn__mudaTema.checked = modoClaro;
        Object.values(selecao_fontes.children).forEach((option, index) => {
            if(option.value === fonteAtual) {
                selecao_fontes.selectedIndex = index;
                return;
            }
        })
    }, 500);
}

const salvarConfiguracao = () => {
    abrirFecharModalConfig();
    tamanhoProvisorioFonte ? tamanhoFonte = tamanhoProvisorioFonte : null;

    fonteAtual != fonteProvisoria ? fonteAtual = fonteProvisoria : null;
    body.style.setProperty('--fontFamily', `${fonteAtual}`);

    body.style.setProperty('--tamanhoFonte', `${tamanhoFonte}px`);
    modoClaro = modoClaroProvisorio;
}

// área conteúdo principal do site
const lista = document.getElementById('lista');
const opcoesLista = lista.children;

const mudarCor = evento => {
    const listaOpcoes = document.querySelectorAll('#lista li');
    Object.values(listaOpcoes).forEach(elemento => {
        elemento.classList.remove('mudar-cor-li');
    });
    const elemento = evento.target;
    elemento.classList.add('mudar-cor-li');
}

const segundaLista = document.getElementById('segundaLista').children;

Object.values(segundaLista).forEach((elemento, index) => {
    elemento.innerText =  opcoesLista[index].outerHTML;
});

// Footer
const texto__animado = document.getElementById('texto__animado');
const palavras = ['por Daniel Ribeiro', 'em HTML 5', 'com CSS 3', 'com Javascript'];
let intervaloDigita, intervaloApaga, indexCaractere, indexPalavra = 0;

function animarTexto() {
    indexCaractere = 0;
    const palavraAtual = palavras[indexPalavra];
    intervaloDigita = setInterval(() => {
        if(indexCaractere < palavraAtual.length) {
            texto__animado.innerText += palavraAtual.charAt(indexCaractere);
            indexCaractere++;
        } else {
            clearInterval(intervaloDigita);
            setTimeout(() => {
                intervaloApaga = setInterval(() => {
                    if(indexCaractere >= 0) {
                        texto__animado.innerText = palavraAtual.slice(0, indexCaractere);
                        indexCaractere--;
                    } else {
                        indexPalavra = (indexPalavra + 1) % palavras.length;
                        clearInterval(intervaloApaga);
                        animarTexto();
                    }
                }, 50)
            }, 1000)
        }
    }, 100);
}

animarTexto();