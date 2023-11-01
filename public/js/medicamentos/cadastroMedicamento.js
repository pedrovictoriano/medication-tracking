$(document).ready(function () {

  // Configurações padrão para Toastr (opcional)
  toastr.options = {
    "closeButton": true,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }

  $('#formCadastroMedicamento').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
      url: '/medicamentos',
      type: 'POST',
      data: $(this).serialize(),
      success: function (response) {
        $('#modalCadastroMedicamento').modal('hide');

        toastr.success('Medicamento cadastrado com sucesso!');

        // Recarregar a lista de medicamentos ou exibir uma mensagem
      },
      error: function (error) {
        toastr.error('Erro ao cadastrar medicamento.');
      }
    });
  });
});
