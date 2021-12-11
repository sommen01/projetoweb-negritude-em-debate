const database = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const CHAVE_JWT="a/KeyBW7JqD++rTxKjX0hobwsH0GZpG2fsUDcvBrSRooLZbpIsxbCErAwFCStgZydGCRuYLiLFGRaBM6GM/FaRmSaAVw0yEeAyH1j0qoYdMh/BukSKKjvyLV9poMg7tD5tx7E8QI/7Fuf8uOS04kTMMavDBfNQUywhaF9c1jByIR9CAh6LHMf6G1OXCpUjlcVd+GwRc9qC20mAIA2MgD0PmN8w2AkMKm3WwMpOuQ/EgFTHQTSq1/1lrnjE4OTNHtmiadYoc7CWgMmoGW2dKFdw/GNNkJ7ZkYaMHe1HTOJ3xjB/jC4q/tiJcjbhdadscsQPa7br/evDcGGezmQX9pnQ==";

class UsuarioController {

    static async pegaTodosOsUsuarios(req, res) {
        try {
            const todosOsUsuarios = await database.Usuarios.findAll();
            return res.status(200).json(todosOsUsuarios);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    
    static async pegaUmUsuario(req, res) {
        const { id } = req.params;
        try{
            const umUsuario = await database.Usuarios.findOne( { 
                where: { 
                    id: Number(id) 
                } 
            });
            return res.status(200).json(umUsuario);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async gerarSenhaHash(senha){
        const custoHash = 12;
        return bcrypt.hash(senha, custoHash);
    }

    static validaSenha(senha){
        return true;
        //throw new Error("Senha inválida");
    }

    static async criaUsuario(req, res) {
        const novoUsuario = req.body;
        try{

            UsuarioController.validaSenha(novoUsuario.senha);
            const senhaHash = await UsuarioController.gerarSenhaHash(novoUsuario.senha);
            delete novoUsuario.senha;
            novoUsuario["senha_hash"] = senhaHash;
            const novoUsuarioCriado = await database.Usuarios.create(novoUsuario);

            return res.status(200).json(novoUsuarioCriado);
        } catch (error) {
            return res.status(500).json(error.message);
        }

    }

    static async atualizaUsuario(req, res) {
        const novasInfosUsuario = req.body;
        const { id } = req.params;
        try{
            await database.Usuarios.update(novasInfosUsuario, { where: { id: Number(id) } });
            const usuarioAtualizado = await database.Usuarios.findOne( { where: { id: Number(id) } });
            return res.status(200).json(usuarioAtualizado);
            
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async apagarUsuario(req, res) {
        const { id } = req.params;
        try{
            await database.Usuarios.destroy({ where: { id: Number(id) } });
            return res.status(200).json( { mensagem: `id ${id} deletado`} );
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }  

    static async pegaUmUsuarioPorEmail(email) {
        try{
            const usuario = await database.Usuarios.findOne( { 
                where: { 
                    email: email
                } 
            });
            return usuario;
        } catch (error) {
            throw error;
        }
    }

    static verificaUsuario(usuario){
        if (!usuario){
            throw new Error("Usuário não encontrado");
        }
    }

    static async verificaSenha(senha, senhaHash){
        
        var MD5 = require("crypto-js/md5");
        const hash = MD5(senha).toString()
        console.log(hash);
        let senhaValida = false;
        console.log(senhaHash);
        if(hash === senhaHash){
             senhaValida = true;
        }
       
        console.log(hash);
        console.log(senhaHash);
        console.log(senhaValida);
      
      
        if (!senhaValida)
            throw new Error("Senha inválida!");
    }

    static async login(req, res) {
        const { email } = req.body;
        const { senha } = req.body;
        
        try{
            const usuario = await UsuarioController.pegaUmUsuarioPorEmail(email);
            UsuarioController.verificaUsuario(usuario);
            await UsuarioController.verificaSenha(senha, usuario.senha_hash);       
            console.log(CHAVE_JWT);
            const token = jwt.sign({ id: usuario.id }, CHAVE_JWT, { expiresIn: '15m' });    
            res.set('Authorization', token);  
            return  res.redirect('/logado'); 
            
        } catch (error) {
            return res.status(401).json(error.message);
        }
    }
    static async logout(req, res) {
        
        }

}

module.exports = UsuarioController