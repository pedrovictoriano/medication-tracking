$(document).ready(function () {
  $('#listLotes').on('click', '.btn-update-lote', function () {
    var loteId = $(this).data('lote-id');
    openModalUpdateLote(loteId);
  });

  function openModalUpdateLote(loteId) {
    $.ajax({
      url: 'api/lotes/' + loteId,
      method: 'GET',
      success: function (data) {
        $('#modalUpdateLote').modal('hide');
        var lote = data[0];
        $('#modalUpdateLote #updateloteId').val(lote.id);
        $('#modalUpdateLote #updateNumeroLote').val(lote.numero_lote);
        $('#modalUpdateLote #updateDataFabricacao').val(lote.data_fabricacao_formatada);
        $('#modalUpdateLote #updateDataValidade').val(lote.data_validade_formatada);

        // Abre o modal de edição
        $('#modalUpdateLote').modal('show');
      },
      error: function (xhr, status, error) {
        toastr.error('Erro ao buscar informações do lote. ' + error);
      }
    });
  }

  $('#formUpdateLote').on('submit', function (e) {
    e.preventDefault();
    var loteId = $('#updateloteId').val(); // Certifique-se de ter um input com o ID do lote
    $.ajax({
      url: 'api/lotes/' + loteId,
      type: 'PUT',
      data: $(this).serialize(),
      success: function (response) {
        $('#modalUpdateLote').modal('hide');
        toastr.success('Lote atualizado com sucesso!');
        $('#listLotes').DataTable().ajax.reload();
      },
      error: function (error) {
        toastr.error('Erro ao atualizar lote.');
      }
    });
  });

});
