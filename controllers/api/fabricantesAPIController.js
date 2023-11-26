const db = require('../../database');

exports.listarFabricantes = (req, res) => {
    db.getFabricantes((err, results) => {
        if (err) {
          res.status(500).send('Erro ao obter fabricantes');
          return;
        }
        res.json(results);
      });
};