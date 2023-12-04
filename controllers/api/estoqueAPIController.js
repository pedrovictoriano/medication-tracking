const db = require('../../database');
const moment = require('moment');

exports.listarEstoque = (req, res) => {
    db.getEstoque((err, results) => {
        if (err) {
            res.status(500).send('Erro ao obter Estoque');
            return;
        }
        res.json({ data: results });
    });
};

exports.cadastrarEstoque = (req, res) => {
    const estoque = {
        documento: req.body.documento,
        movimentacao: req.body.movimentacao,
        dataMovimentacao: moment(req.body.dataMovimentacao, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DD HH:mm:ss'),
        estoqueObservacoes: req.body.estoqueObservacoes
    };

    db.insertEstoque(estoque, (err) => {
        if (err) {
            res.status(500).send('Erro ao cadastrar Estoque');
            return;
        }
        res.send('Estoque cadastrado com sucesso');
    });
}