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

  $.get('/api/lotes', function (lotes) {
    lotes.data.forEach(function (lote) {
      $('#insertLotes').append(new Option(lote.id + " - " + lote.numero_lote, lote.id));
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

  $('#insertMedicamento').on('change', function () {
    var apresentacao = $(this).find('option:selected').data('apresentacao');
    $('#insertApresetacao').val(apresentacao);
});

  $.get('/api/localizacoes', function (localizacoes) {
    localizacoes.forEach(function (localizacao) {
      $('#insertLocalizacao').append(new Option(localizacao.id + " - " + localizacao.descricao, localizacao.id));
    });
  });
});