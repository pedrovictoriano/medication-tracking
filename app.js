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
  const page = [
    { name: 'Medicamentos', url: '/medicamentos' }
  ];

  db.getMedicamentos((err, data) => {
    if (err) {
      // Trate o erro como achar melhor
      res.status(500).send("Erro ao acessar o banco de dados");
      return;
    }

    // 'results' contém os dados da tabela
    res.render('medicamentos', { page, dados: data });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
