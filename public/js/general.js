$(document).ready(function () {
  // Carregando data-mask para inputs
  $("[data-mask]").inputmask();

  $('[data-toggle="tooltip"]').tooltip();

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
  if (notificacoes.length > 0) {
    $('.navbar-badge').text(notificacoes.length);
  }
  containerNotificacoes.append(`<span class="dropdown-item dropdown-header">${notificacoes.length} Notificações</span>`);
  containerNotificacoes.append('<div class="dropdown-divider"></div>');

  // Adicionar cada notificação
  notificacoes.forEach(notificacao => {
    containerNotificacoes.append(`
          <a href="#" class="dropdown-item" id="notificacao-${notificacao.id}" data-id="${notificacao.id}">
              <i class="fas fa-envelope mr-2"></i> ${notificacao.mensagem}
          </a>
      `);
  });
}

// Supondo que '.dropdown-menu-right' é o container que já existe no carregamento da página
$('.dropdown-menu-right').on('click', '.dropdown-item', function () {
  const notificacaoId = $(this).data('id');
  marcarNotificacaoComoVisualizada(notificacaoId);
});

// Função para marcar uma notificação como visualizada
function marcarNotificacaoComoVisualizada(notificacaoId) {
  $.post(`/api/notificacoes/visualizar/${notificacaoId}`, function () {
    // Atualizar a interface do usuário após a notificação ser marcada como visualizada
    // Por exemplo, remover a notificação da lista ou alterar sua aparência
    $(`#notificacao-${notificacaoId}`).remove();

    // Atualizar a contagem de notificações
    const contagemAtual = parseInt($('.navbar-badge').text()) || 0;
    if (contagemAtual > 0) {
      $('.navbar-badge').text(contagemAtual - 1);
      $('.dropdown-header').text((contagemAtual - 1) + ' Notificações');
    }
  });
}