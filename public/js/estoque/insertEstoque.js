
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

$('#next-btn').on('click', function () {
    // Valida o formulário manualmente
    if ($("#formEstoquePart").valid()) {
        // Se o formulário for válido, avança para a próxima etapa
        stepper.next();
        insertEstoque();
    }
});

$("#formEstoqueItensPart").validate({
    // Regras e mensagens para a segunda etapa
    // ...
    submitHandler: function (form) {
        // Executa a ação final, como enviar dados ao servidor
        insertEstoque();
    }
});

function insertEstoque() {
    const dadosFormEstoque = $("#formEstoquePart").serialize();

    $.ajax({
        url: '/api/estoque',
        type: 'POST',
        data: dadosFormEstoque,
        success: function (response) {
            $('#modalInsertEstoque').modal('hide');
            toastr.success('Estoque cadastrado com sucesso!');
            $('#formEstoquePart').trigger('reset');
            $('#formEstoqueItensPart').trigger('reset');
            $('#listEstoque').DataTable().ajax.reload();
        },
        error: function (xhr, status, error) {
            // Tratamento em caso de erro
            toastr.error('Erro ao cadastrar Estoque.');
        }
    });
}