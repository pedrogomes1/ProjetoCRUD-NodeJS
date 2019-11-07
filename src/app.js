//Responsável pelas configurações
//é um framework backend para node ele cria abstrações de rotas, middlewares e muitas outras funções para facilitar a criação tanto de API's
const express = require ('express'); //Chama, importa o módulo(biblioteca) o expres .. Pacotes para criação de rotas
const path = require('path'); //Unir diretorios
const morgan = require('morgan');
const mysql = require('mysql'); //Módulo
const myConnection = require('express-myconnection'); //Módulo

const app = express(); //Instancia do express


app.set('port', process.env.PORT || 3000 ); //Verifica se há uma porta no SO, se n seta a porta 3000
app.set('view engine', 'ejs') //Seta que a engine será a EJS que é um mecanismo de modelo a ser usado (existem vários outros como pug, Handlebars, etc), é uma maneira + fácil e simples transportar dados do back-end para o front-end
app.set('views', path.join(__dirname, 'views')); // Definir o diretório que vai ser inicializado .. Dirname é aonde se encontra o app.js Une as rotas dos arquivos que estão dentro da views, não sendo necessário colocar \ / , etc é util pois em Linux as vezes troca a maneira de usar \ / , etc


app.use(morgan('dev')) //Consigo ver no console do terminal o tipo, estado da requisição, se foi 404, 200 etc

app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'produtos'
    }, 'single'));

    
//Vai converter os dados do html em objetos para que possa inserir no banco depois
app.use(express.urlencoded ({ extended: false })) // Permite extender todos os dados que vem do formulário, está como falso pois nao vai enviar imagens ou dados codificados


//importanto os routes
const productsRoutes = require('./routes/productsRoutes')
app.use('/', productsRoutes);


//Definindo a porta
app.listen(app.get('port'), () =>{
    // console.log('Servidor na porta 3000')
})