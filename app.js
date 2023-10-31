const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

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
      observacoes: req.body.observacoes,
      status: req.body.status
  };

  db.insertMedicamentos(medicamento, (err) => {
      if (err) {
          res.status(500).send('Erro ao cadastrar medicamento');
          return;
      }
      res.send('Medicamento cadastrado com sucesso');
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

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
