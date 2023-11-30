$(document).ready(function () {
    // Adicionar método personalizado para validação de data
    jQuery.validator.addMethod("greaterThanToday", function (value, element) {
        if (value.length === 0) {
            return true; // Se o campo estiver vazio, não aplicar esta validação
        }

        const dataInserida = moment(value, "DD/MM/YYYY");
        const hoje = moment().startOf('day'); // Ignorar horário atual
        return dataInserida.isAfter(hoje);
    }, "Por favor, insira uma data maior que hoje.");

    // Aplicar validação no formulário
    $("#formInsertLotes").validate({
        rules: {
            dataValidade: {
                greaterThanToday: true
            }
        },
        messages: {
            dataValidade: {
                greaterThanToday: "A data de validade deve ser maior que a data atual."
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
        submitHandler: function(form) {
            // A chamada AJAX será feita aqui
            insertLotes();
        }
    });

    function insertLotes() {
        const dadosFormulario = $("#formInsertLotes").serialize(); // Pega os dados do formulário
    
        $.ajax({
            url: '/api/lotes',
            type: 'POST',
            data: dadosFormulario,
            success: function(response) {
                $('#modalInsertLote').modal('hide');
                toastr.success('Medicamento cadastrado com sucesso!');
                $('#formInsertLotes').trigger('reset'); // Resetar o formulário
                $('#listLotes').DataTable().ajax.reload();
            },
            error: function(xhr, status, error) {
                // Tratamento em caso de erro
                toastr.error('Erro ao cadastrar medicamento.');
            }
        });
    }
    
});
