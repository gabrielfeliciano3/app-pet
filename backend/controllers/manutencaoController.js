const Manutencao = require('../models/Manutencao');

exports.criar = async (req, res) => {
    try {
        const nova = await Manutencao.create(req.body);
        res.status(201).json(nova);
    } catch (err) { res.status(400).json({ erro: err.message }); }
};

exports.listar = async (req, res) => {
    try {
        const todas = await Manutencao.find();
        res.json(todas);
    } catch (err) { res.status(500).json({ erro: err.message }); }
};

exports.atualizar = async (req, res) => {
    try {
        const atualizada = await Manutencao.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(atualizada);
    } catch (err) { res.status(400).json({ erro: err.message }); }
};

exports.deletar = async (req, res) => {
    try {
        await Manutencao.findByIdAndDelete(req.params.id);
        res.json({ mensagem: 'Registro deletado com sucesso!' });
    } catch (err) { res.status(500).json({ erro: err.message }); }
};