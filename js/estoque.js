function carregarEstoque() {
  const container = document.getElementById('estoque-container');
  const remedios = JSON.parse(localStorage.getItem('remedios')) || [];

  container.innerHTML = ''; // Limpa o conteúdo antes de inserir

  if (remedios.length === 0) {
    container.innerHTML = "<p>Nenhum remédio cadastrado no momento.</p>";
    return;
  }

  remedios.forEach((remedio, index) => {
    const card = document.createElement('div');
    card.className = 'card-remedio';

    card.innerHTML = `
      <h3>${remedio.nome || 'Sem nome'}</h3>
      <p><strong>Marca:</strong> ${remedio.marca || 'Não informada'}</p>
      <p><strong>Quantidade:</strong> ${remedio.quantidade || 'Não informada'}</p>
      <p><strong>Comprado em:</strong> ${remedio.ondeComprou || 'Não informado'}</p>
      <p><strong>Preço:</strong> R$${typeof remedio.preco === 'number' ? remedio.preco.toFixed(2) : !isNaN(Number(remedio.preco)) ? Number(remedio.preco).toFixed(2) : 'Não informado'}</p>
      <p><strong>Validade:</strong> ${remedio.validade || 'Não informada'}</p>
      <div class="botoes">
        <button onclick="editarRemedio(${index})" class="btn-edit">✏️ Editar</button>
        <button onclick="excluirRemedio(${index})" class="btn-delete">🗑️ Excluir</button>
      </div>
    `;
    container.appendChild(card);
  });
}


function excluirRemedio(index) {
  const remedios = JSON.parse(localStorage.getItem('remedios')) || [];
  remedios.splice(index, 1);
  localStorage.setItem('remedios', JSON.stringify(remedios));
  location.reload(); // recarrega para atualizar a lista
}

function editarRemedio(index) {
  // Vai para a página de cadastro com o índice do item na URL
  window.location.href = `remedios.html?editar=${index}`;
}

carregarEstoque();
