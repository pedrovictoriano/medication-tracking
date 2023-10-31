$(document).ready(function () {
    //Initialize Select2 Elements
    $('.select2bs4').select2({
        theme: 'bootstrap4'
    })

    $.get('/fabricantes', function (fabricantes) {
        fabricantes.forEach(function (fabricante) {
            $('#fabricante-select').append(new Option(fabricante.id + " - " + fabricante.nome, fabricante.id));
        });
    });

    $.get('/formas-farmaceuticas', function (formas_farmaceuticas) {
        formas_farmaceuticas.forEach(function (forma_farmaceutica) {
            $('#forma-farmaceutica-select').append(new Option(forma_farmaceutica.id + " - " + forma_farmaceutica.descricao, forma_farmaceutica.id));
        });
    });

    $.get('/unidades', function (unidades) {
        unidades.forEach(unidade => {
            $('#unidade-select').append(
                $('<option>', {
                    value: unidade.id,
                    text: unidade.id + " - " + unidade.descricao,
                    'data-abreviatura': unidade.abreviatura
                })
            );
        });
    });


    $('#unidade-select').on('change', function () {
        var abreviatura = $(this).find('option:selected').data('abreviatura');
        $('#apresetacao-input').inputmask({
            alias: 'numeric',
            rightAlign: false,
            suffix: ' ' + abreviatura
        });
    });

});
