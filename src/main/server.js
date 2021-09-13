const express = require("express"); //constantes express, utilização dos módulos
// import path from 'path';

const app = express(); //constante app recebe a função express
const multer = require('multer');
/**
 * Colocar o servidor no ar
 */

//rodar o servidor Node, função callback
/**app.listen(3000, function(){
    console.log("Servidor rodando porta 3000. Aplicação Node");
});
**/
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb){
        //primeiro parametro = erro
        //salvando com nome do input e data atual
        
        cb(null, file.originalname);
    }
});

//utiliza a storage para configurar a instância do multer
const upload = multer({ storage });

/**
 * configuração do parser para requisiçóes post
 */
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

const pool = require('./dao/conexaoBS');


//servidor no ar
const PORTA = process.env.PORTA || 8080;
app.listen(PORTA, function(){
    console.log("Servidor rodando na porta 8080");
})

/**
 * Arquivos estáticos
 */
app.use('/model', express.static(__dirname +'/model' ));
app.use('/jquery', express.static('./node_modules/jquery/dist'));

app.get('/album', function(req, resp){
    resp.sendFile(__dirname + '/view/forms-album.html');
});

//requisição - upload de arquivos
app.post('/uploadFoto', upload.single('nomeFoto'), function(req, resp){
    resp.sendFile(__dirname + '/view/forms-album.html');
});

app.post('/album-digital', function(req, resp){

    pool.query(`INSERT INTO album
                (nome, cpf, tel_whats, email, estado, cidade, data_nascimento, titulo_foto, nome_fotografo, nome_foto, nome_responsavel, cpf_responsavel)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
                [req.body.nome, req.body.cpf, req.body.telWhats, req.body.email,req.body.estado, req.body.cidade,req.body.dataNascimento, req.body.nome_responsavel, req.body.cpfResponsavel, req.body.tituloFoto, req.body.nomeFotografa, req.body.nomeFoto]
    )
    .then(res => console.log('ok'))
    .catch(err => console.log('erro' + err));

    resp.sendFile(__dirname + '/views/forms-album.html')
})