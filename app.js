const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();
const port = 3000;

// Define EJS como o mecanismo de visualização
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para analisar corpos de requisições em formato URL-encoded
app.use(bodyParser.urlencoded({ extended: true }));

// Servir arquivos estáticos do frontend
app.use(express.static('public'));

// Conexão com o banco de dados
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'medication_tracking'
});

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

  const query = 'SELECT * FROM medicamentos';

  connection.query(query, (err, results) => {
    if (err) throw err;

    // 'results' contém os dados da tabela
    res.render('medicamentos', { page, dados: results });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
