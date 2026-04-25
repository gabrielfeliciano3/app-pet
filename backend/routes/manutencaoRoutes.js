const express = require('express');
const router = express.Router();
const controller = require('../controllers/manutencaoController');

router.post('/', controller.criar);
router.get('/', controller.listar);
router.put('/:id', controller.atualizar);
router.delete('/:id', controller.deletar);

module.exports = router;