requirejs.config({
    "baseUrl": "../js/modules",
    urlArgs: "bust=" + (new Date()).getTime(),
    "paths": {
        "main": "../main"
    }
});

// Chamando módulo principal para iniciar a aplicação
requirejs(["main"]);