const db = require('../../database');
const moment = require('moment');

exports.listarLotes = (req, res) => {
    db.getLotes((err, results) => {
        if (err) {
            res.status(500).send('Erro ao obter os Lotes');
            return;
        }
        res.json({ data: results });
    });
};

exports.cadastrarLotes = (req, res) => {
    const lote = {
        numeroLote: req.body.numeroLote,
        dataFabricacao: moment(req.body.dataFabricacao, 'DD/MM/YYYY').format('YYYY-MM-DD'),
        dataValidade: moment(req.body.dataValidade, 'DD/MM/YYYY').format('YYYY-MM-DD'),
    };

    db.insertLotes(lote, (err) => {
        if (err) {
            res.status(500).send('Erro ao cadastrar lote');
            return;
        }
        res.send('Lote cadastrado com sucesso');
    });
}