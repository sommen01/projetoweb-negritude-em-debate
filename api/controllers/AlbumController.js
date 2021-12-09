//Automaticamente ele encontra o arquivo index.js dentro da pasta
const { render } = require('..');
const database = require('../models');

/**
 * CRUD
 */
 class AlbumController {
    //async: espera resolver tudo dentro do método antes do envio da resposta
    static async pegaTodosOsAlbuns(req, res) {
        try {
            //await: aguarda até receber a resposta do BD
            const todosOsAlbuns = await database.Albuns.findAll();
            return res.status(200).json(todosOsAlbuns);
            //res.render('AlbunsView', { todosOsAlbuns });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegaUmAlbum(req, res) {
        const { id } = req.params;
        try{
            const umAlbum = await database.Albuns.findOne( { 
                where: { 
                    id: Number(id) 
                } 
            });
            return res.status(200).json(umAlbum);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async criaAlbum(req, res) {
        const novoAlbum = req.body;
        
        console.log(req.body);
        try{
            const novoAlbumCriado = await database.Albuns.create(novoAlbum);
            return res.render('albuns');
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async atualizaAlbum(req, res) {
        const novasInfosAlbum = req.body;
        const { id } = req.params;
        try{
            await database.Albuns.update(novasInfosAlbum, { where: { id: Number(id) } });
            const AlbumAtualizado = await database.Albuns.findOne( { where: { id: Number(id) } });
            return res.status(200).json(AlbumAtualizado);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async apagarAlbum(req, res) {
        const { id } = req.params;
        try{
            await database.Albuns.destroy({ where: { id: Number(id) } });
            return res.status(200).json( { mensagem: `id ${id} deletado`} );
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }  

}

module.exports = AlbumController