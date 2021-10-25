/**
 * Requisições Get - Relatórios
 */
$(function () {
    $('#rel-albuns').on('click', submitAlbuns);
});

/*
function submitAlbuns() {

    alert(getCookie("token_ned"));

    $.get("http://localhost:8080/albuns", function (data) {
        
        //Imprimindo todo o JSON de retorno
        alert(JSON.stringify(data));

        // Exemplo para utilizar na páginas do proj com pug
        let todosOsAlbuns = data;
        alert(todosOsAlbuns[0].id + " - " + todosOsAlbuns[0].nome + "\n" +
              todosOsAlbuns[1].id + " - " + todosOsAlbuns[1].nome);

    }).fail(function (req, mensagemStatus, mensagemErro) {
        alert(req.status);
        alert(mensagemStatus);
        alert(mensagemErro);

        //TRATAR ERRO...
    });
}*/

function submitAlbuns() {

    const token = getCookie("token_ned");

    $.ajax({
        type: "GET",
        headers: { 'x-access-token': token },
        url: "http://localhost:8080/albuns"
    }).done(function (data) {
        //Imprimindo todo o JSON de retorno
        alert(JSON.stringify(data));

        // Exemplo para utilizar na páginas do proj com pug
        let todosOsAlbuns = data;
        alert(todosOsAlbuns[0].id + " - " + todosOsAlbuns[0].nome + "\n" +
            todosOsAlbuns[1].id + " - " + todosOsAlbuns[1].nome);
    }).fail(function (req, mensagemStatus, mensagemErro) {
        alert(req.status);
        alert(req.responseText);

        alert(mensagemStatus);
        alert(mensagemErro);

        //TRATAR ERRO...
    });
}

//https://www.w3schools.com/js/js_cookies.asp
//https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/Set-Cookie
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}