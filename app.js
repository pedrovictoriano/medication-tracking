const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cron = require('node-cron');

const db = require('./database'); // Importa o módulo do banco de dados
const app = express();
require('dotenv').config();

//Rotas
const dashboardRoutes = require('./routes/views/dashboard');
const apiFabricantesRoutes = require('./routes/api/fabricantes');
const apiFormasFarmaceuticasRoutes = require('./routes/api/formasFarmaceuticas');
const apiLotesRoutes = require('./routes/api/lotes');
const LotesRoutes = require('./routes/views/lotesRoutes');
const apiMedicamentosRoutes = require('./routes/api/medicamentos');
const medicamentosRoutes = require('./routes/views/medicamentos');
const apiNotificacoesRoutes = require('./routes/api/notificacoes');
const apiUnidadesRoutes = require('./routes/api/unidades');

// Define EJS como o mecanismo de visualização
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para analisar corpos de requisições em formato URL-encoded
app.use(bodyParser.urlencoded({ extended: true }));

// Servir arquivos estáticos do frontend
app.use(express.static('public'));

// Middleware para criar breadcrumbs
app.use((req, res, next) => {
  const pathParts = req.path.split('/').filter(Boolean);
  const breadcrumbNames = {
    '': 'Home',
    'medicamentos': 'Medicamentos',
    // outros mapeamentos conforme necessário
  };

  let breadcrumb = pathParts.map((part, index, arr) => {
    return {
      name: breadcrumbNames[part] || part.charAt(0).toUpperCase() + part.slice(1),
      url: '/' + arr.slice(0, index + 1).join('/')
    };
  });

  // Sempre incluir 'Home' no início, exceto se já estiver na página inicial
  if (req.path !== '/') {
    breadcrumb.unshift({ name: 'Home', url: '/' });
  }

  res.locals.breadcrumb = breadcrumb;
  next();
});

const verificarLotes = () => {
  console.log('Iniciando limpeza de Lotes');
  db.limparNotificacoesAntigas((err, results) => {
    if (err) {
      console.error('Erro ao limpar notificações antigas', err);
      return;
    }
    console.log('Notificações antigas limpas com sucesso.');
    console.log("Verificando Lotes");
    db.verificarLotesProximosDoVencimento((err, lotes) => {
      if (err) {
        console.error('Erro ao verificar lotes', err);
        return;
      }

      lotes.forEach(lote => {
        const mensagem = `Lote <strong>${lote.numero_lote}</strong> prestes a vencer em <strong>${lote.data_validade_formatada}</strong>`;
        db.inserirNotificacao(lote.numero_lote, mensagem, (err, results) => {
          if (err) {
            console.error('Erro ao inserir notificação', err);
          } else {
            console.log('Notificação inserida com sucesso para o lote:', lote.numero_lote);
          }
        });
      });
    });
  });
};

// Agendar a tarefa para ser executada todos os dias às 17h43
cron.schedule('50 23 * * *', verificarLotes);

// Usar rotas
app.use('/', dashboardRoutes);
app.use('/api/fabricantes', apiFabricantesRoutes);
app.use('/api/formas-farmaceuticas', apiFormasFarmaceuticasRoutes);
app.use('/api/lotes', apiLotesRoutes);
app.use('/lotes', LotesRoutes);
app.use('/api/medicamentos', apiMedicamentosRoutes);
app.use('/medicamentos', medicamentosRoutes);
app.use('/api/notificacoes', apiNotificacoesRoutes);
app.use('/api/unidades', apiUnidadesRoutes);

app.listen(process.env.NODE_PORT, () => {
  console.log(`Servidor rodando em http://localhost:${process.env.NODE_PORT}`);
});
