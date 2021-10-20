const albuns = require('./albunsRoute');
const usuarios = require('./usuariosRoute');

/**
Sintaxe de uma função qualquer: function() {}
Sintaxe de uma arrow function: () => {}
 */
module.exports = app => {
    app.use(albuns),
    app.use(usuarios);
}