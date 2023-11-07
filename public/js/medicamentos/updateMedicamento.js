$(document).ready(function () {
  $('.btn-update-medicamento').on('click', function () {
    var medicamentoId = $(this).data('medicamento-id');
    openModalUpdateMedicamento(medicamentoId);
  });

  function carregarFabricantes(fabricanteIdSelecionado) {
    $.get('/fabricantes', function (fabricantes) {
      var selectFabricante = $('#updateFabricante');
      selectFabricante.empty(); // Limpar o select para não duplicar os fabricantes
      selectFabricante.append('<option></option>'); // Adicionar o placeholder

      fabricantes.forEach(function (fabricante) {
        var option = new Option(fabricante.id + " - " + fabricante.nome, fabricante.id);
        // Verificar se é o fabricante selecionado anteriormente
        if (fabricante.id === fabricanteIdSelecionado) {
          option.selected = true;
        }
        selectFabricante.append(option);
      });

      // Atualizar o select2 para exibir corretamente o item selecionado
      selectFabricante.trigger('change');
    });
  }

  function carregarFormasFarmaceuticas(formaFarmaceuticaIdSelecionado) {
    $.get('/formas-farmaceuticas', function (formas_farmaceuticas) {
      var select = $('#updateFormaFarmaceutica');
      select.empty();
      select.append('<option></option>');

      formas_farmaceuticas.forEach(function (forma_farmaceutica) {
        var option = new Option(forma_farmaceutica.id + " - " + forma_farmaceutica.descricao, forma_farmaceutica.id);
        if (forma_farmaceutica.id === formaFarmaceuticaIdSelecionado) {
          option.selected = true;
        }
        select.append(option);
      });

      select.trigger('change');
    });
  }

  function carregarUnidades(unidadeIdSelecionado) {
    $.get('/unidades', function (unidades) {
      var select = $('#updateUnidade');
      select.empty();
      select.append('<option></option>');

      unidades.forEach(function (unidade) {
        var option = $('<option>', {
          value: unidade.id,
          text: unidade.id + " - " + unidade.descricao,
          'data-abreviatura': unidade.abreviatura
        });

        if (String(unidade.id) === String(unidadeIdSelecionado)) {
          option.prop('selected', true);
        }

        select.append(option);
      });

      select.trigger('change');
    });
  }

  $('#updateUnidade').on('change', function () {
    var abreviatura = $(this).find('option:selected').data('abreviatura');
    $('#updateApresentacao').inputmask('remove');
    $('#updateApresentacao').inputmask({
      alias: 'numeric',
      rightAlign: false,
      suffix: ' ' + abreviatura
    });
  });


  function openModalUpdateMedicamento(medicamentoId) {
    $.ajax({
      url: '/medicamentos/' + medicamentoId,
      method: 'GET',
      success: function (data) {
        $('#modalUpdateMedicamento').modal('hide');
        var medicamento = data[0];
        $('#modalUpdateMedicamento #updateMedicamentoId').val(medicamento.id);
        $('#modalUpdateMedicamento #updateNomeComercial').val(medicamento.nome_comercial);
        $('#modalUpdateMedicamento #updateNomeGenerico').val(medicamento.nome_generico);
        carregarFabricantes(medicamento.fabricante_id);
        carregarFormasFarmaceuticas(medicamento.forma_farmaceutica_id);
        carregarUnidades(medicamento.unidade_id);
        // Inicialize a máscara para o campo de apresentação baseado na unidade selecionada
        var abreviaturaSelecionada = $('#updateUnidade').find('option:selected').data('abreviatura');
        $('#updateApresentacao').inputmask({
          alias: 'numeric',
          rightAlign: false,
          suffix: ' ' + abreviaturaSelecionada
        });
        $('#modalUpdateMedicamento #updateApresentacao').val(medicamento.apresentacao);
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
