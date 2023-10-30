const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();
const port = 3000;

// Define EJS como o mecanismo de visualização
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Conexão com o banco de dados
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'seu_usuario',
  password: 'sua_senha',
  database: 'seu_banco_de_dados'
});

// Middleware para analisar corpos de requisições em formato URL-encoded
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware para criar breadcrumbs
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

// Servir arquivos estáticos do frontend
app.use(express.static('public'));

app.get('/', (req, res) => {
  const page = [
    {
      name: 'Dashboard'
      , url: '/'
    }
  ];

  // Renderiza a página 'index' e passa os dados do breadcrumb
  res.render('index', { page });
});

app.get('/medicamentos', (req, res) => {
  const page = [
    { name: 'Medicamentos', url: '/medicamentos' }
  ];

  res.render('medicamentos', { page });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
