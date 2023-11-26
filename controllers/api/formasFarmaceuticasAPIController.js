const db = require('../../database');

exports.listarFormasFarmaceuticas = (req, res) => {
    db.getFormasFarmaceuticas((err, results) => {
        if (err) {
            res.status(500).send('Erro ao obter Formas Farmacêuticas');
            return;
        }
        res.json(results);
    });
};