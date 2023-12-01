const db = require('../../database');

exports.listarTiposMovimentacoes = (req, res) => {
    db.getTiposMovimentacoes((err, results) => {
        if (err) {
            res.status(500).send('Erro ao obter Tipos de Movimentações');
            return;
        }
        res.json(results);
    });
};