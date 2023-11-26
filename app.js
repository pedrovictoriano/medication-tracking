const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cron = require('node-cron');
const moment = require('moment');


const db = require('./database'); // Importa o módulo do banco de dados

const app = express();
const port = 3000;

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

// Rotas
// Dashboard
app.get('/', (req, res) => {
  const page = [
    {
      name: 'Dashboard'
      , url: '/'
    }
  ];

  res.render('index', { page });
});

// Medicamentos
app.get('/medicamentos', (req, res) => {
  let currentPage = parseInt(req.query.currentPage) || 1; // Página atual
  let limit = parseInt(req.query.limit) || 10; // Registros por página
  let offset = (currentPage - 1) * limit;

  db.getCountMedicamentos((err, total) => {
    if (err) {
      res.status(500).send("Erro ao acessar o banco de dados");
      return;
    }

    let totalPages = Math.ceil(total / limit);

    db.getMedicamentos(limit, offset, (err, data) => {
      if (err) {
        res.status(500).send("Erro ao acessar o banco de dados");
        return;
      }

      res.render('medicamentos/medicamentos', {
        page: [{ name: 'Medicamentos', url: '/medicamentos' }],
        currentPage,
        totalPages,
        dados: data
      });
    });
  });
});

app.post('/medicamentos', (req, res) => {
  const medicamento = {
    fabricanteId: req.body.fabricanteId,
    nomeComercial: req.body.nomeComercial,
    nomeGenerico: req.body.nomeGenerico,
    formaFarmaceuticaId: req.body.formaFarmaceuticaId,
    unidadeId: req.body.unidadeId,
    apresentacao: req.body.apresentacao,
    instrucoes: req.body.instrucoes,
    observacoes: req.body.observacoes
  };

  db.insertMedicamentos(medicamento, (err) => {
    if (err) {
      res.status(500).send('Erro ao cadastrar medicamento');
      return;
    }
    res.send('Medicamento cadastrado com sucesso');
  });
});

app.put('/medicamentos/:id', (req, res) => {
  const id = req.params.id;
  const medicamentoAtualizado = {
    fabricanteId: req.body.fabricanteId,
    nomeComercial: req.body.nomeComercial,
    nomeGenerico: req.body.nomeGenerico,
    formaFarmaceuticaId: req.body.formaFarmaceuticaId,
    unidadeId: req.body.unidadeId,
    apresentacao: req.body.apresentacao,
    instrucoes: req.body.instrucoes,
    observacoes: req.body.observacoes
  };

  db.updateMedicamento(id, medicamentoAtualizado, (err) => {
    if (err) {
      res.status(500).send('Erro ao atualizar medicamento');
      return;
    }
    res.send('Medicamento atualizado com sucesso');
  });
});


app.get('/medicamentos/:medicamentoId', (req, res) => {
  const medicamentoId = req.params.medicamentoId;

  db.getMedicamentoById(medicamentoId, (err, data) => {
    if (err) {
      res.status(500).send("Erro ao acessar o banco de dados");
      return;
    }
    if (data) {
      res.json(data);
    } else {
      res.status(404).send("Medicamento não encontrado");
    }
  });
});

app.get('/fabricantes', (req, res) => {
  db.getFabricantes((err, results) => {
    if (err) {
      res.status(500).send('Erro ao obter fabricantes');
      return;
    }
    res.json(results);
  });
});

app.get('/formas-farmaceuticas', (req, res) => {
  db.getFormasFarmaceuticas((err, results) => {
    if (err) {
      res.status(500).send('Erro ao obter Formas Farmacêuticas');
      return;
    }
    res.json(results);
  });
});

app.get('/unidades', (req, res) => {
  db.getUnidades((err, results) => {
    if (err) {
      res.status(500).send('Erro ao obter Unidades');
      return;
    }
    res.json(results);
  });
});

app.get('/lotes', (req, res) => {
  res.render('lotes/lotes', {
    page: [{ name: 'Lotes', url: '/lotes' }]
  });
});

app.get('/api/lotes', (req, res) => {
  db.getLotes((err, results) => {
    if (err) {
      res.status(500).send('Erro ao obter os Lotes');
      return;
    }
    res.json({ data: results });
  });
});

app.post('/api/lotes', (req, res) => {
  const lote = {
    numeroLote: req.body.numeroLote,
    dataFabricacao: moment(req.body.dataFabricacao, 'DD/MM/YYYY').format('YYYY-MM-DD'),
    dataValidade: moment(req.body.dataValidade, 'DD/MM/YYYY').format('YYYY-MM-DD'),
  };

  db.insertLotes(lote, (err) => {
    if (err) {
      res.status(500).send('Erro ao cadastrar lote');
      return;
    }
    res.send('Lote cadastrado com sucesso');
  });
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

app.get('/api/notificacoes', (req, res) => {
  // Supondo que a função 'buscarNotificacoes' esteja definida em database.js
  db.buscarNotificacoes((err, notificacoes) => {
    if (err) {
      res.status(500).send('Erro ao buscar notificações');
      return;
    }
    res.json(notificacoes);
  });
});

app.post('/api/notificacoes/visualizar/:id', (req, res) => {
  const notificacaoId = req.params.id;

  db.marcarComoVisualizada(notificacaoId, (err, result) => {
    if (err) {
      res.status(500).send('Erro ao atualizar a notificação');
      return;
    }
    res.send('Notificação atualizada com sucesso');
  });
});


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
