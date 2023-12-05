$("#formEstoquePart").validate({
    rules: {
        documento: {
            required: true
        },
        movimentacao: {
            required: true
        },
        dataMovimentacao: {
            required: true
        }
    },
    messages: {
        documento: {
            required: "Informe o documento."
        },
        movimentacao: {
            required: "Selecione uma movimentação."
        },
        dataMovimentacao: {
            required: "Informe a data da movimentação."
        }
    },
    errorElement: 'span',
    errorPlacement: function (error, element) {
        error.addClass('invalid-feedback');
        element.closest('.form-group').append(error);
    },
    highlight: function (element, errorClass, validClass) {
        $(element).addClass('is-invalid');
    },
    unhighlight: function (element, errorClass, validClass) {
        $(element).removeClass('is-invalid');
    },
    submitHandler: function (form) {
        // Permite avançar para a próxima etapa
        stepper.next();
    }
});

$("#formEstoqueItensPart").validate({
    rules: {
        lote: {
            required: true
        },
        medicamento: {
            required: true
        },
        quantidade: {
            required: true
        },
        localizacao: {
            required: true
        }
    },
    messages: {
        lote: {
            required: "Selecione um Lote."
        },
        medicamento: {
            required: "Selecione um Medicamento."
        },
        quantidade: {
            required: "Informe uma quantidade."
        },
        localizacao: {
            required: "Selecione uma Localização."
        }
    },
    errorElement: 'span',
    errorPlacement: function (error, element) {
        error.addClass('invalid-feedback');
        element.closest('.form-group').append(error);
    },
    highlight: function (element, errorClass, validClass) {
        $(element).addClass('is-invalid');
    },
    unhighlight: function (element, errorClass, validClass) {
        $(element).removeClass('is-invalid');
    },
    submitHandler: function (form) {
    }
});

$('#next-btn').on('click', function () {
    // Valida o formulário manualmente
    if ($("#formEstoquePart").valid()) {
        // Se o formulário for válido, avança para a próxima etapa
        stepper.next();
    }
});

// Evento de clique para adicionar item
$('#btnAdicionarItem').on('click', function () {
    // Valida o formulário manualmente
    if ($("#formEstoqueItensPart").valid()) {
        // Se o formulário for válido
        inserirItemTable()
    }
});

let itensEstoque = []; // Array para armazenar os itens adicionados

function inserirItemTable() {
    // Coleta os dados do formulário de itens
    const dadosItem = {
        lote_id: $('#insertLotes').val(),
        lote_descricao: $('#insertLotes option:selected').text(), // Descrição do lote
        medicamento_id: $('#insertMedicamento').val(),
        medicamento_descricao: $('#insertMedicamento option:selected').text(), // Descrição do medicamento
        qtd: $('#insertQuantidade').val(),
        localizacao_id: $('#insertLocalizacao').val(),
        localizacao_descricao: $('#insertLocalizacao option:selected').text(), // Descrição da localização
        observacoes: $('#insertItemEstoqueObservacoes').val()
    };

    // Adiciona o item ao array
    itensEstoque.push(dadosItem);

    // Limpa o formulário de item
    $('#formEstoqueItensPart')[0].reset();

    // Limpa e reseta os campos Select2
    $('#insertLotes').val(null).trigger('change');
    $('#insertMedicamento').val(null).trigger('change');
    $('#insertLocalizacao').val(null).trigger('change');

    // Limpa manualmente os campos restantes
    $('#insertQuantidade').val('');
    $('#insertItemEstoqueObservacoes').val('');

    // Atualiza a visualização dos itens
    atualizarListaItens();
}

function atualizarListaItens() {
    var tbody = $('#listItensEstoque tbody');
    tbody.empty();
    itensEstoque.forEach(function (item, index) {
        tbody.append(`<tr>
            <td>${item.lote_descricao}</td>
            <td>${item.medicamento_descricao}</td>
            <td>${item.qtd}</td>
            <td>${item.localizacao_descricao}</td>
            <td>${item.observacoes}</td>
            <td><button type="button" class="btn btn-danger btn-sm btn-remover-item" data-index="${index}"><i class="fas fa-trash"></i></button></td>
        </tr>`);
    });
}

// Confirmar remoção de item e realizar remoção
$(document).on('click', '.btn-remover-item', function () {
    var index = $(this).data('index'); // Captura o índice do item

    // Mostra uma mensagem de confirmação antes da remoção
    Swal.fire({
        title: 'Tem certeza?',
        text: "Você não poderá reverter isso!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, remover!',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Se o usuário confirmar, remove o item
            itensEstoque.splice(index, 1);
            atualizarListaItens();
            toastr.success('Item removido com sucesso!');
        }
    });
});

$('#submit-btn').on('click', function () {
    // Verifica se há itens na lista
    if (itensEstoque.length > 0) {
        // Se houver itens, prossegue com o cadastro
        insertEstoque();
    } else {
        // Se não houver itens, exibe um alerta para o usuário
        toastr.warning('Você precisa adicionar ao menos um item antes de prosseguir!');
    }
});

function insertEstoque() {
    const dadosFormEstoque = $("#formEstoquePart").serialize();

    $.ajax({
        url: '/api/estoque',
        type: 'POST',
        data: dadosFormEstoque,
        success: function (response) {
            const estoqueId = response; // Captura o ID do estoque inserido
            inserirItensEstoque(estoqueId); // Chama a função para inserir os itens
        },
        error: function (xhr, status, error) {
            // Tratamento em caso de erro
            toastr.error('Erro ao cadastrar Estoque.');
        }
    });
}

function inserirItensEstoque(estoqueId) {
    let totalItens = itensEstoque.length;
    let itensInseridos = 0;

    // Verifica se há itens para inserir
    if (totalItens === 0) {
        // Não há itens para inserir, pode finalizar o processo
        finalizarInsercaoEstoque();
        return;
    }

    itensEstoque.forEach(function (item) {
        item.estoque_id = estoqueId.estoque_id; // Adiciona o ID do estoque ao item
        console.log(item);

        $.ajax({
            url: '/api/estoque/itens', // Substitua pela sua URL correta
            type: 'POST',
            data: item,
            success: function (response) {
                itensInseridos++;
                if (itensInseridos === totalItens) {
                    // Todos os itens foram inseridos
                    finalizarInsercaoEstoque();
                }
            },
            error: function (xhr, status, error) {
                toastr.error('Erro ao inserir item do estoque.');
                // Você pode adicionar mais tratamento de erro aqui, se necessário
            }
        });
    });
}

function finalizarInsercaoEstoque() {
    toastr.success('Estoque e itens cadastrados com sucesso!');
    $('#formEstoquePart').trigger('reset');
    $('#formEstoqueItensPart').trigger('reset');
    $('#listEstoque').DataTable().ajax.reload();
    itensEstoque = []; // Limpa o array de itens
    $('#listItensEstoque tbody').empty();

    // Resetar os campos Select2 (se estiver usando)
    $('#modalInsertEstoque').find('.select2bs4').val(null).trigger('change');

    // Resetar o BS Stepper para a primeira etapa
    stepper.to(1);

    // Limpar quaisquer mensagens de erro de validação
    $('#modalInsertEstoque').find('.is-invalid').removeClass('is-invalid');
    $('#modalInsertEstoque').find('.invalid-feedback').remove();

    // Fechar o modal
    $('#modalInsertEstoque').modal('hide');
}