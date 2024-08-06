
function obterParametrosURL() {
    var parametros = {};
    var url = window.location.href;
    var partes = url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, chave, valor) {
        parametros[chave] = decodeURIComponent(valor);
    });
    return parametros;
}

function definirCookies(parametros) {
    for (var chave in parametros) {
        if (chave.startsWith("utm_")) { // Apenas salvar UTMs como cookies
            document.cookie = chave + "=" + parametros[chave] + ";path=/";
        }
    }
}

function obterCookies() {
    var cookies = {};
    var pares = document.cookie.split(';');
    for (var i = 0; i < pares.length; i++) {
        var par = pares[i].split('=');
        cookies[par[0].trim()] = par[1];
    }
    return cookies;
}

function redirecionarComParametros(parametros) {
    var querystring = "";
    for (var chave in parametros) {
        querystring += (querystring === "" ? "?" : "&") + chave + "=" + encodeURIComponent(parametros[chave]);
    }
    window.location.href = window.location.pathname + querystring;
}

function main() {
    var parametrosURL = obterParametrosURL();
    if (Object.keys(parametrosURL).length > 0) {
        definirCookies(parametrosURL);
    } else {
        var cookies = obterCookies();
        var parametrosUTM = {};
        for (var chave in cookies) {
            if (chave.startsWith("utm_")) {
                parametrosUTM[chave] = cookies[chave];
            }
        }
        if (Object.keys(parametrosUTM).length > 0) {
            redirecionarComParametros(parametrosUTM);
        }
    }
}

main();


