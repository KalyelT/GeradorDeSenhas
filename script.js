document.addEventListener('DOMContentLoaded', () => {
    const entradaTamanho = document.getElementById('tamanho');
    const caixaMaiusculas = document.getElementById('maiusculas');
    const caixaMinusculas = document.getElementById('minusculas');
    const caixaNumeros = document.getElementById('numeros');
    const caixaSimbolos = document.getElementById('simbolos');
    const botaoGerar = document.getElementById('gerarsenha');
    const resultadoEl = document.getElementById('resultado');

    const MAIUSCULAS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const MINUSCULAS = 'abcdefghijklmnopqrstuvwxyz';
    const NUMEROS = '0123456789';
    const SIMBOLOS = '!@#$%¨&*()-_=+[]{};:,.<>?/|\\~`';

    function caractereAleatorioDe(str) {
        return str.charAt(Math.floor(Math.random() * str.length));
    }

    function embaralharArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    function gerarSenha() {
        const tamanhoSolicitado = parseInt(entradaTamanho.value, 10) || 8;

        const conjuntos = [];
        if (caixaMaiusculas.checked) conjuntos.push(MAIUSCULAS);
        if (caixaMinusculas.checked) conjuntos.push(MINUSCULAS);
        if (caixaNumeros.checked) conjuntos.push(NUMEROS);
        if (caixaSimbolos.checked) conjuntos.push(SIMBOLOS);

        if (conjuntos.length === 0) {
            resultadoEl.textContent = 'Selecione pelo menos um tipo de caractere.';
            return;
        }

        const tamanhoMinimo = conjuntos.length;
        let tamanho = tamanhoSolicitado;
        if (tamanho < tamanhoMinimo) {
            tamanho = tamanhoMinimo;
        }

        const caracteres = conjuntos.map(conj => caractereAleatorioDe(conj));

        while (caracteres.length < tamanho) {
            const conj = conjuntos[Math.floor(Math.random() * conjuntos.length)];
            caracteres.push(caractereAleatorioDe(conj));
        }

        const senha = embaralharArray(caracteres).join('');
        resultadoEl.textContent = senha;
    }

    botaoGerar.addEventListener('click', gerarSenha);

    resultadoEl.addEventListener('click', () => {
        const txt = resultadoEl.textContent && resultadoEl.textContent.trim();
        if (!txt) return;
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(txt).then(() => {
                const anterior = resultadoEl.textContent;
                resultadoEl.textContent = 'Senha copiada!';
                setTimeout(() => (resultadoEl.textContent = anterior), 1200);
            }, () => {
                // falha silenciosa
            });
        }
    });
});