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
});