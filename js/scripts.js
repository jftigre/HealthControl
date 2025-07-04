let indiceEdicao = null; // Controla se estamos editando ou adicionando novo

const formulario = document.getElementById('form_remedio');
const botaoCancelar = document.getElementById('btn_cancelar_edicao'); // Pega o botão de cancelar
const mensagemEdicao = document.getElementById('mensagem_edicao');

document.addEventListener('DOMContentLoaded', function () {

    // Quando o formulário for enviado
    formulario.addEventListener('submit', function (evento) {
        evento.preventDefault(); // Evita o recarregamento da página

        // Captura os dados do formulário
        const nome = document.getElementById('input_nome_remedio').value;
        const marca = document.getElementById('input_marca_remedio').value;
        const quantidade = document.getElementById('input_quantidade_remedio').value;
        const ondeComprou = document.getElementById('input_onde_comprou').value;
        const preco = document.getElementById('input_preco_remedio').value;
        const validade = document.getElementById('input_validade_remedio').value;

        // Monta o objeto remédio
        const remedio = {
            nome: nome,
            marca: marca,
            quantidade: quantidade,
            ondeComprou: ondeComprou,
            preco: preco,
            validade: validade
        };

        // Mostra o objeto no console
        console.log(remedio);

        // Busca os remédios antigos salvos
        const remediosSalvos = JSON.parse(localStorage.getItem('remedios')) || [];

        if (indiceEdicao !== null) {
            // Está editando → substitui o item no índice correto
            remediosSalvos[indiceEdicao] = remedio;
            indiceEdicao = null; // Volta ao modo de cadastro normal
        } else {
            // Está adicionando novo remédio
            remediosSalvos.push(remedio);
        }

        // Salva novamente o array atualizado
        localStorage.setItem('remedios', JSON.stringify(remediosSalvos));

        // Limpa o formulário e esconde botão de cancelar
        formulario.reset();
        botaoCancelar.style.display = 'none';
        alert('Remédio salvo com sucesso!');
        exibirRemedios();
    });

    // Botão "Cancelar edição"
    botaoCancelar.addEventListener('click', function () {
        formulario.reset(); // Limpa os campos
        mensagemEdicao.style.display = 'none'; // Esconde a mensagem de edição
        indiceEdicao = null; // Volta ao modo de cadastro
        botaoCancelar.style.display = 'none'; // Esconde o botão
    });

    // Exibe os remédios salvos na inicialização
    exibirRemedios();
});


// Função para mostrar os remédios salvos na tela
function exibirRemedios() {
    const lista = document.getElementById('lista_itens');
    lista.innerHTML = ''; // Limpa o conteúdo antes de renderizar

    const remedios = JSON.parse(localStorage.getItem('remedios')) || [];

    remedios.forEach((remedio, index) => {
        const item = document.createElement('li');

        // Mostra as informações do remédio
        item.innerHTML = `
        <strong>${remedio.nome.toUpperCase()}</strong><br>
        Marca: ${remedio.marca}<br>
        Quantidade: ${remedio.quantidade}<br>
        Preço: R$${remedio.preco}<br>
        Validade: ${remedio.validade}
        `;

        // Botão de excluir
        const botaoExcluir = document.createElement('button');
        botaoExcluir.textContent = 'Excluir';
        botaoExcluir.style.marginLeft = '10px';

        botaoExcluir.addEventListener('click', function () {
            remedios.splice(index, 1); // Remove 1 item na posição index
            localStorage.setItem('remedios', JSON.stringify(remedios));
            exibirRemedios(); // Atualiza a lista
        });

        // Botão de editar
        const botaoEditar = document.createElement('button');
        botaoEditar.textContent = 'Editar';
        botaoEditar.style.marginLeft = '10px';

        botaoEditar.addEventListener('click', function () {
            document.getElementById('input_nome_remedio').value = remedio.nome;
            document.getElementById('input_marca_remedio').value = remedio.marca;
            document.getElementById('input_quantidade_remedio').value = remedio.quantidade;
            document.getElementById('input_onde_comprou').value = remedio.ondeComprou;
            document.getElementById('input_preco_remedio').value = remedio.preco;
            document.getElementById('input_validade_remedio').value = remedio.validade;

            indiceEdicao = index; // Marca que estamos editando esse índice
            document.getElementById('btn_cancelar_edicao').style.display = 'inline'; // Mostra botão de cancelar

            mensagemEdicao.style.display = 'block'; // Mostra a mensagem de edição
        });

        // Adiciona os dois botões ao item
        item.appendChild(botaoExcluir);
        item.appendChild(botaoEditar);

        // Adiciona o item completo à lista
        lista.appendChild(item);
    });
}