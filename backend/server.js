const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Configuração de Middlewares
app.use(cors()); // Libera o acesso para o frontend na Vercel
app.use(express.json()); // Permite que o servidor entenda JSON enviado pelo app.js

// Importação das Rotas
const manutencaoRoutes = require('./routes/manutencaoRoutes');

// Definição das Rotas (O caminho deve bater com a API_URL do frontend)
app.use('/api/manutencoes', manutencaoRoutes);

// Conexão com o Banco de Dados
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Conectado com Sucesso!'))
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Inicialização do Servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});