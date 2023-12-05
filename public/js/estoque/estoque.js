var stepper; // Definindo como global

// Init bs-stepper
document.addEventListener('DOMContentLoaded', function () {
  var stepperElement = document.querySelector('.bs-stepper');
  stepper = new Stepper(stepperElement, {
    linear: false,
    animation: true
  });

  // Esquema para controlar botões no modal-footer
  stepperElement.addEventListener('show.bs-stepper', function (event) {
    var activeStep = event.detail.indexStep;
    var steps = stepperElement.querySelectorAll('.step');
    var totalSteps = steps.length - 1; // Ajuste se necessário

    // Controle dos botões
    document.getElementById('previous-btn').style.display = activeStep > 0 ? 'inline-block' : 'none';
    document.getElementById('next-btn').style.display = activeStep < totalSteps ? 'inline-block' : 'none';
    document.getElementById('submit-btn').style.display = activeStep === totalSteps ? 'inline-block' : 'none';
  });
});

$(document).ready(function () {
  $('.select2bs4').select2({
    theme: 'bootstrap4'
  })

  $.get('/api/tipos_movimentacoes', function (tipos_movimentacoes) {
    tipos_movimentacoes.forEach(function (movimentacao) {
      $('#insertTipoMovimentacao').append(new Option(movimentacao.id + " - " + movimentacao.descricao, movimentacao.id));
    });
  });

  $.get('/api/medicamentos', function (medicamentos) {
    medicamentos.data.forEach(medicamento => {
      $('#insertMedicamento').append(
        $('<option>', {
          value: medicamento.medicamento_id,
          text: medicamento.medicamento_id + " - " + medicamento.medicamento_nome_comercial,
          'data-apresentacao': medicamento.medicamento_apresentacao
        })
      );
    });
  });

  // Depois de selecionar medicamento mostra apresentação e busca lotes
  $('#insertMedicamento').on('change', function () {
      var apresentacao = $(this).find('option:selected').data('apresentacao');
      $('#insertApresetacao').val(apresentacao);

    var medicamentoId = $(this).find('option:selected').val();

    $.ajax({
      url: `/api/medicamentos/${medicamentoId}/lotes`,
      type: 'GET',
      success: function (lotes, textStatus, xhr) {
        $('#insertLotes').empty(); // Limpa opções anteriores antes de adicionar novas
        $('#insertLoteQtde').val("");
        $('#insertLotes').append($('<option>', {
          value: '',
          text: 'Selecione um Lote',
          selected: true,
          disabled: true
        }));

        if (xhr.status === 204) {
          toastr.info('Não há lotes disponiveis para o medicamento selecionado');
        } else {
          lotes.forEach(function (lote) {
            $('#insertLotes').append(
              $('<option>', {
                value: lote.id,
                text: lote.id + " - " + lote.numero_lote,
                'data-loteqtde': lote.quantidade_total
              })
            );
          });
        }
      },
      error: function (xhr, status, error) {
        $('#insertLotes').empty(); // Limpa opções anteriores antes de adicionar novas
        toastr.error('Erro ao buscar lotes');
      }
    });
  });

  // Mostrando qtde. do lote
  $('#insertLotes').on('change', function () {
    var qtde = $(this).find('option:selected').data('loteqtde');
    $('#insertLoteQtde').val(qtde); // Atribui o valor ao campo de quantidade
  });

  // Mostrando qtde. do lote
  $('#insertQuantidade').on('change', function () {
    let qtdeInformada = $('#insertQuantidade').val();
    let qtdeEstoque = $('#insertLoteQtde').val();

    if (qtdeInformada > qtdeEstoque) {
      toastr.warning('Informe um quantidade menor ou igual do que há em estoque');
      //Bloquear botão de inserir
      $('#btnAdicionarItem').hide();
    }else{
      $('#btnAdicionarItem').show();
    }    
  });

  $.get('/api/localizacoes', function (localizacoes) {
    localizacoes.forEach(function (localizacao) {
      $('#insertLocalizacao').append(new Option(localizacao.id + " - " + localizacao.descricao, localizacao.id));
    });
  });
});