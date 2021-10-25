const { Router, response } = require('express');
const AlbumController = require('../controllers/AlbumController');
const auth = require('../middleware/auth');

const router = Router();
router.get('/albuns', (request, response) => {
    // response.sendFile(path.join(__dirname, '../../pages/html/album_form.html');
    response.render('album_form');
  });
  
router.get('/albuns', auth, AlbumController.pegaTodosOsAlbuns);
router.get('/albuns/:id', AlbumController.pegaUmAlbum);
router.post('/albuns', AlbumController.criaAlbum);
router.put('/albuns/:id', AlbumController.atualizaAlbum);
router.delete('/albuns/:id', AlbumController.apagarAlbum);

module.exports = router;