const mongoose = require('mongoose');

const ManutencaoSchema = new mongoose.Schema({
    tipoServico: { type: String, required: true },
    quilometragem: { type: Number, required: true },
    valorGasto: { type: Number, required: true },
    data: { type: String, required: true }
});

module.exports = mongoose.model('Manutencao', ManutencaoSchema);