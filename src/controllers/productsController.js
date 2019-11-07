//Fica responsável por todas as funções das rotas que foram criadas no ProductsRoutes.js

let controller = []; //Variavel para armazenar todas as operações

//Renderiza a teal inicial
controller.telaInicial = (req, res) => {
        res.render('products');
        console.log(controller)
}

//Método get para listar
controller.listaProdutos = (req, res) => { //Função do express
    req.getConnection (( error, conn ) => { // Método responsável por pedir uma conexão ao MySQL
        conn.query('SELECT * FROM produto', (error, productsDB) => { //Posso tratar o erro ou os dados que vem do BD(productsDB)
        if(error) {
            res.json('Erro ao listar produtos' + error); //Mostra o erro no navegador
        }
        res.render('products_list', { //Renderiza a tela, o html da products_list.ejs dentro da view
            data: productsDB //Armazena os dados do banco(productsDB) dentro do data  
        })
      })
    })
};

//Método post para cadastar
controller.cadastraProdutos = (req, res) => {
    const data = req.body; //req.body recebe os valores dos inputs da tela de cadastro
   req.getConnection (( error, conn ) => {
       conn.query('INSERT INTO produto (nome, preco, quantidade) values(?, ?, ?)', [data.nome, data.preco, data.quantidade], (error, productsInsert) => {
            if(error) {
                res.json('Erro ao inserir produto ' + error)
            }
            res.redirect(303,'/')
            //303 redirecionamento de aplicações web para um novo URI, especialmente após um HTTP POST

       })
   })  
  
}

//Método GET do editar para buscar os dados do banco e preencher os inputs da pagina products_edit automatico
controller.editarProdutos = (req, res) => {

    const id = req.params.id; //Recebe o id do parâmetro da url

    req.getConnection (( error, conn ) =>{
        conn.query( 'Select * from produto WHERE codigo = ?', [id], ( error, productsDB ) => {
            if(error) {
                res.json(error)
            }
            //Renderiza a tela product_list e joga os respectivos valores dentro dos inputs através do objeto data
            res.render('products_edit' , {
                data: productsDB[0]
            })
        })
    })
}

//Método PUT do editar para atualizar um produto no banco
controller.atualizarProduto = (req, res) => {
    const id = req.params.id;
    const produtoNovo = req.body; //produtoNovo recebe os valores campos do data (que por sua vez recebe dos inputs) da função put do ajax

    req.getConnection (( error, conn ) =>{
            conn.query ( 'Update produto set ? where codigo = ?', [produtoNovo, id], (error, productsDB) =>{
                if (error) {
                    res.json('Erro ao atualizar produto ' + error)
                }
            })
        })
}

controller.deletarProdutos = (req, res) => {
    const id = req.params.id;
    req.getConnection (( error, conn ) => {

        conn.query('Delete from produto where codigo = ?', [id], (error, productsDB) => {
            if(error) {
                res.json('Erro ao deletar produto ' + error)
            }
        })
    })
}

module.exports = controller;