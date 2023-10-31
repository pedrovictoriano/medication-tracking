$(document).ready(function() {
    //Initialize Select2 Elements
    $('.select2bs4').select2({
        theme: 'bootstrap4'
      })

    $.get('/fabricantes', function(fabricantes) {
        fabricantes.forEach(function(fabricante) {
            $('#fabricante-select').append(new Option(fabricante.id + " - " + fabricante.nome , fabricante.id));
        });
    });
});
