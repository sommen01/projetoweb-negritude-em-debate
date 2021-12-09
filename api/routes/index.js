



const albuns = require('./albunsRoute');
const usuarios = require('./usuariosRoute');

module.exports = (app) => {
  app.get('/cadastro_foto', (request, response) => {
    response.render('albuns');
  });

  app.use(albuns);
  app.use(usuarios);
};