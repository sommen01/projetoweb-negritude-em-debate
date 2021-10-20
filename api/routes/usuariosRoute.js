const { Router } = require('express');
const UsuarioController = require('../controllers/UsuarioController');
const auth = require('../middleware/auth');

//Iniciando o Router do express
const router = Router();

router.get('/usuarios', UsuarioController.pegaTodosOsUsuarios);
router.get('/usuarios/:id', UsuarioController.pegaUmUsuario);
router.post('/usuarios', UsuarioController.criaUsuario);
router.put('/usuarios/:id', UsuarioController.atualizaUsuario);
router.delete('/usuarios/:id', UsuarioController.apagarUsuario);

router.post('/login', UsuarioController.login);

module.exports = router;