const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/', productsController.telaInicial) //Rota necessária para apenas renderizar a tela prinicipal

router.get('/produtos/productslist', productsController.listaProdutos) //Rota para listar os produtos

router.post('/produtos/add', productsController.cadastraProdutos)
router.delete('/produtos/delete/:id', productsController.deletarProdutos) //Uso o :id pq quero deletar somente um cliente .. e esse ID é o que vem do parâmetro (mesmo conceito para o put)

router.get('/produtos/update/:id', productsController.editarProdutos)
router.put('/produtos/update/:id', productsController.atualizarProduto)


module.exports = router;