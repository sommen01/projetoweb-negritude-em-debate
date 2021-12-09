const express = require("express")
const app = express()
const path = require('path')

require('dotenv').config()
//http://expressjs.com/en/resources/middleware/cors.html
const cors = require('cors');
const routes = require('./routes/index');

var corsOptions = {
    exposedHeaders: 'Authorization'
}

app.use(cors(corsOptions));

/**
 * Configuração do parser para requisições post
 */
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

/**
* Colocar servidor no ar
*/
const PORTA = process.env.PORT || 8080;
app.listen(PORTA, function () {
    console.log(`Servidor rodando na porta ${PORTA}`)
})

/**
  * Configurações das páginas
  */
 app.set('views', path.join(__dirname,'views'))
 app.set('view engine','pug')
 app.use(express.static(path.join(__dirname, 'static')));
 app.use('/uploads', express.static(path.join(__dirname, '../uploads/')));

/**
 * Rotas
 */
 routes(app);


 

// app.set('views', path.join(__dirname, './views'));
// app.set('view engine','ejs');
// app.engine('html', require('ejs').renderFile);
module.exports = app;
