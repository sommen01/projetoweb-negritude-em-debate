const { Router } = require('express');
const UsuarioController = require('../controllers/UsuarioController');
const auth = require('../middleware/auth');

//Iniciando o Router do express
const router = Router();
router.get('/login', (request, response) => {
    // response.sendFile(path.join(__dirname, '../../pages/html/album_form.html');
    response.render('login');
  });
router.get('/logado', (request, response) => {
    // response.sendFile(path.join(__dirname, '../../pages/html/album_form.html');
    response.render('relatorio');
});

router.get('/index', (request, response) => {
  // response.sendFile(path.join(__dirname, '../../pages/html/album_form.html');
  response.render('index');
});
router.get('/equipe', (request, response) => {
  // response.sendFile(path.join(__dirname, '../../pages/html/album_form.html');
  response.render('equipe');
});
router.get('/logout', (request, response) => {
  // response.sendFile(path.join(__dirname, '../../pages/html/album_form.html');
  router.post('/login',  UsuarioController.logout);
});
  

router.get('/usuarios', UsuarioController.pegaTodosOsUsuarios);
router.get('/usuarios/:id', UsuarioController.pegaUmUsuario);
router.post('/usuarios', UsuarioController.criaUsuario);
router.put('/usuarios/:id', UsuarioController.atualizaUsuario);
router.delete('/usuarios/:id', UsuarioController.apagarUsuario);
router.post('/login',  UsuarioController.login);


module.exports = router;