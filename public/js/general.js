$(document).ready(function() {
  $('[data-widget="pushmenu"]').PushMenu('collapse');
  // Carregar notificações ao carregar a página
  carregarNotificacoes();
});

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

function carregarNotificacoes() {
  $.ajax({
      url: '/api/notificacoes',
      success: function (notificacoes) {
          atualizarHTMLNotificacoes(notificacoes);
      },
      error: function (error) {
          console.error('Erro ao buscar notificações', error);
      }
  });
}

function atualizarHTMLNotificacoes(notificacoes) {
  const containerNotificacoes = $('.dropdown-menu-right');
  containerNotificacoes.empty(); // Limpar conteúdo antigo

  // Adicionar a contagem de notificações
  $('.navbar-badge').text(notificacoes.length);
  containerNotificacoes.append(`<span class="dropdown-item dropdown-header">${notificacoes.length} Notificações</span>`);
  containerNotificacoes.append('<div class="dropdown-divider"></div>');

  // Adicionar cada notificação
  notificacoes.forEach(notificacao => {
      containerNotificacoes.append(`
          <a href="#" class="dropdown-item">
              <i class="fas fa-envelope mr-2"></i> ${notificacao.mensagem}
          </a>
      `);
  });
}


