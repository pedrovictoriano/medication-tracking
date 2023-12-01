const db = require('../../database');

exports.listarLocalizacoes = (req, res) => {
    db.getLocalizacoes((err, results) => {
        if (err) {
            res.status(500).send('Erro ao obter Localizacoes');
            return;
        }
        res.json(results);
    });
};