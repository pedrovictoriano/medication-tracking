const db = require('../../database');

exports.listarEstoque = (req, res) => {
    db.getEstoque((err, results) => {
        if (err) {
            res.status(500).send('Erro ao obter Estoque');
            return;
        }
        res.json(results);
    });
};