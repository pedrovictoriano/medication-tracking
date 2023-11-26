const db = require('../../database');

exports.listarUnidades = (req, res) => {
    db.getUnidades((err, results) => {
        if (err) {
            res.status(500).send('Erro ao obter Unidades');
            return;
        }
        res.json(results);
    });
};