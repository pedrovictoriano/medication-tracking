$(document).ready(function () {
  $('#btnUpdateMedicamento').on('click', function () {
    var medicamentoId = $(this).data('medicamento-id');
    openModalUpdateMedicamento(medicamentoId);
  });

  function openModalUpdateMedicamento(medicamentoId) {
    $.ajax({
      url: '/medicamentos/' + medicamentoId,
      method: 'GET',
      success: function (data) {
        var medicamento = data[0];
        $('#modalUpdateMedicamento #updateMedicamentoId').val(medicamento.id);
        $('#modalUpdateMedicamento #updateNomeComercial').val(medicamento.nome_comercial);
        $('#modalUpdateMedicamento #updateNomeGenerico').val(medicamento.nome_generico);
        $('#modalUpdateMedicamento #updateApresetacao').val(medicamento.apresentacao);
        $('#modalUpdateMedicamento #updateInstrucoes').val(medicamento.medicamento_nome_comercial);
        $('#modalUpdateMedicamento #updateObservacoes').val(medicamento.observacoes);

        // Abre o modal de edição
        $('#modalUpdateMedicamento').modal('show');
      },
      error: function (xhr, status, error) {
        toastr.error('Erro ao buscar informações do medicamento. ' + error);
      }
    });
  }

  $('#formUpdateMedicamento').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
      url: '/medicamentos',
      type: 'PUT',
      data: $(this).serialize(),
      success: function (response) {
        $('#modalUpdateMedicamento').modal('hide');

        toastr.success('Medicamento atualizado com sucesso!');
      },
      error: function (error) {
        toastr.error('Erro ao atualizar medicamento.');
      }
    });
  });
});
