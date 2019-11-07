//Responsável pelas configurações
const express = require ('express'); //Chama, importa o módulo(biblioteca) o expres .. Pacotes para criação de rotas
const path = require('path'); //Unir diretorios
const morgan = require('morgan');
const mysql = require('mysql'); //Módulo
const myConnection = require('express-myconnection'); //Módulo

const app = express(); //Instancia do express


app.set('port', process.env.PORT || 3000 ); //Verifica se há uma porta no SO, se n seta a porta 3000
app.set('view engine', 'ejs') //Mecanismo de modelo a ser utilizado
app.set('views', path.join(__dirname, 'views'));


app.use(morgan('dev'))

app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'produtos'
    }, 'single'));

app.use(express.urlencoded ({ extended: false }))

//importanto os routes
const productsRoutes = require('./routes/productsRoutes')
app.use('/', productsRoutes);


//Definindo a porta
app.listen(app.get('port'), () =>{
    
})