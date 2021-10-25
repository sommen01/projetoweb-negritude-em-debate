



const albuns = require('./albunsRoute');
const usuarios = require('./usuariosRoute');

module.exports = (app) => {
  app.get('/', (request, response) => {
    response.render('albuns');
  });

  app.use(albuns);
  app.use(usuarios);
};