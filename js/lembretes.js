document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-lembrete");
  const container = document.getElementById("lembretes-container");

  // Carrega lembretes salvos no localStorage
  const lembretes = JSON.parse(localStorage.getItem("lembretes")) || [];
  renderizarLembretes();

  // Evento de envio do formulário
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const horario = document.getElementById("horario").value;
    const dias = document.getElementById("dias").value;
    const quantidade = document.getElementById("quantidade").value;
    const observacoes = document.getElementById("observacoes").value;

    const lembrete = {
      nome,
      horario,
      dias,
      quantidade,
      observacoes
    };

    lembretes.push(lembrete);
    localStorage.setItem("lembretes", JSON.stringify(lembretes));
    renderizarLembretes();
    form.reset();
  });

  // Função para renderizar os lembretes
  function renderizarLembretes() {
    container.innerHTML = "";

    if (lembretes.length === 0) {
      container.innerHTML = "<p>Nenhum lembrete cadastrado ainda.</p>";
      return;
    }

    lembretes.forEach((lembrete, index) => {
      const card = document.createElement("div");
      card.className = "card-lembrete";

      card.innerHTML = `
        <h3>${lembrete.nome}</h3>
        <p><strong>Horário:</strong> ${lembrete.horario}</p>
        <p><strong>Dias:</strong> ${lembrete.dias}</p>
        <p><strong>Quantidade:</strong> ${lembrete.quantidade}</p>
        ${lembrete.observacoes ? `<p><strong>Obs:</strong> ${lembrete.observacoes}</p>` : ""}
        <button class="excluir" data-index="${index}">Excluir</button>
      `;

      container.appendChild(card);
    });

    // Evento de exclusão
    document.querySelectorAll(".excluir").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const i = e.target.dataset.index;
        lembretes.splice(i, 1);
        localStorage.setItem("lembretes", JSON.stringify(lembretes));
        renderizarLembretes();
      });
    });
  }
});