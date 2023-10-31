$(document).ready(function() {
    $('#formCadastroMedicamento').on('submit', function(e) {
      e.preventDefault();
  
      $.ajax({
        url: '/medicamentos',
        type: 'POST',
        data: $(this).serialize(),
        success: function(response) {
          // Trate a resposta aqui, por exemplo, fechar o modal
          $('#modalCadastroMedicamento').modal('hide');
          // Recarregar a lista de medicamentos ou exibir uma mensagem
        },
        error: function(error) {
          // Trate erros aqui
          alert('Erro ao cadastrar medicamento');
        }
      });
    });
  });
  