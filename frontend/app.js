const API_URL = 'https://app-pet-ub14.onrender.com/api/manutencoes';
// const API_URL = 'http://localhost:5000/api/manutencoes'; // Use esta linha para testar localmente primeiro

const form = document.getElementById('form-manutencao');
const lista = document.getElementById('lista-manutencoes');

// Carregar Dados (Read)
async function carregarRegistros() {
    const res = await fetch(API_URL);
    const dados = await res.json();
    lista.innerHTML = '';
    dados.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${item.tipoServico}</strong> - ${item.quilometragem}km | R$ ${item.valorGasto} | ${item.data}
            <button onclick="editarRegistro('${item._id}', '${item.tipoServico}', ${item.quilometragem}, ${item.valorGasto}, '${item.data}')">Editar</button>
            <button onclick="deletarRegistro('${item._id}')">Excluir</button>
        `;
        lista.appendChild(li);
    });
}

// Salvar Dado (Create / Update)
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('edit-id').value;
    const registro = {
        tipoServico: document.getElementById('tipo').value,
        quilometragem: document.getElementById('km').value,
        valorGasto: document.getElementById('valor').value,
        data: document.getElementById('data').value
    };

    const metodo = id ? 'PUT' : 'POST';
    const url = id ? `${API_URL}/${id}` : API_URL;

    await fetch(url, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registro)
    });

    form.reset();
    document.getElementById('edit-id').value = '';
    carregarRegistros();
});

// Editar Dado
window.editarRegistro = (id, tipo, km, valor, data) => {
    document.getElementById('edit-id').value = id;
    document.getElementById('tipo').value = tipo;
    document.getElementById('km').value = km;
    document.getElementById('valor').value = valor;
    document.getElementById('data').value = data;
};

// Deletar Dado (Delete)
window.deletarRegistro = async (id) => {
    if(confirm('Tem certeza?')) {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        carregarRegistros();
    }
};

// Iniciar app
carregarRegistros();

// Registrar Service Worker para o PWA
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
      .then(() => console.log('Service Worker Registrado'));
}