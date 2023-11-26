$(document).ready(function () {
    //Initialize Select2 Elements
    $('.select2bs4').select2({
        theme: 'bootstrap4'
    })

    $.get('/api/fabricantes', function (fabricantes) {
        fabricantes.forEach(function (fabricante) {
            $('#cadastro-fabricante').append(new Option(fabricante.id + " - " + fabricante.nome, fabricante.id));
        });
    });

    $.get('/api/formas-farmaceuticas', function (formas_farmaceuticas) {
        formas_farmaceuticas.forEach(function (forma_farmaceutica) {
            $('#cadastro-forma-farmaceutica').append(new Option(forma_farmaceutica.id + " - " + forma_farmaceutica.descricao, forma_farmaceutica.id));
        });
    });

    $.get('/api/unidades', function (unidades) {
        unidades.forEach(unidade => {
            $('#cadastro-unidade').append(
                $('<option>', {
                    value: unidade.id,
                    text: unidade.id + " - " + unidade.descricao,
                    'data-abreviatura': unidade.abreviatura
                })
            );
        });
    });

    $('#cadastro-unidade').on('change', function () {
        var abreviatura = $(this).find('option:selected').data('abreviatura');
        $('#cadastro-apresetacao').inputmask({
            alias: 'numeric',
            rightAlign: false,
            suffix: ' ' + abreviatura
        });
    });
});
