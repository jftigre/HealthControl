let indiceEdicao = null; //controla se estamos editando ou adicionando novo

document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.getElementById('form_remedio');

    formulario.addEventListener('submit', function (evento) {
        evento.preventDefault();

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

        // Salva no localStorage
        const remediosSalvos = JSON.parse(localStorage.getItem('remedios')) || []; //Busca os remédios antigos salvos

        if (indiceEdicao !== null) {
            // Está editando → substitui o item no índice correto
            remediosSalvos[indiceEdicao] = remedio;
            indiceEdicao = null; // volta ao modo de cadastro normal
        } else {
            // Está adicionando novo remédio
            remediosSalvos.push(remedio);
        }

        localStorage.setItem('remedios', JSON.stringify(remediosSalvos)); //Salva novamente o array atualizado

        // Limpa o formulário e avisa
        formulario.reset();
        alert('Remédio salvo com sucesso!');
        exibirRemedios();
    });
    exibirRemedios();
});

//Lê os remédios que estão salvos no localStorage
function exibirRemedios() {
    const lista = document.getElementById('lista_itens');
    lista.innerHTML = ''; //Limpa o conteúdo antes de renderizar

    const remedios = JSON.parse(localStorage.getItem('remedios')) || []; //Busca os remédios salvos no localStorage. //Usa JSON.parse para transformar de string para array de objetos. //Se não existir nada salvo ainda, usa array vazio para evitar erro.

    remedios.forEach((remedio, index) => {
        const item = document.createElement('li');

        //Mostra as informações do remédio
        item.textContent = `${remedio.nome} (${remedio.quantidade} unidades) - Marca: ${remedio.marca}, Preço: R$${remedio.preco}, Validade: ${remedio.validade}`;

        //Cria o botão de excluir
        const botaoExcluir = document.createElement('button');
        botaoExcluir.textContent = 'Excluir';
        botaoExcluir.style.marginLeft = '10px';

        //Adiciona o comportamento de remover o remédio
        botaoExcluir.addEventListener('click', function () {
            remedios.splice(index, 1); // remove 1 item na posição index
            localStorage.setItem('remedios', JSON.stringify(remedios));
            exibirRemedios(); // atualiza a lista na tela
        });

        // Cria botão de editar
        const botaoEditar = document.createElement('button');
        botaoEditar.textContent = 'Editar';
        botaoEditar.style.marginLeft = '10px';

        // Ação ao clicar em Editar
        botaoEditar.addEventListener('click', function () {
            document.getElementById('input_nome_remedio').value = remedio.nome;
            document.getElementById('input_marca_remedio').value = remedio.marca;
            document.getElementById('input_quantidade_remedio').value = remedio.quantidade;
            document.getElementById('input_onde_comprou').value = remedio.ondeComprou;
            document.getElementById('input_preco_remedio').value = remedio.preco;
            document.getElementById('input_validade_remedio').value = remedio.validade;

            indiceEdicao = index; // Marca que estamos editando esse índice
        });

        // Adiciona os dois botões ao item
        item.appendChild(botaoExcluir);
        item.appendChild(botaoEditar);

        //Adiciona o item completo à lista
        lista.appendChild(item);
    }); //fecha o forEach
} //fecha a função exibirRemedios