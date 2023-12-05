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

    db.insertEstoque(estoque, (err, insertId) => {
        if (err) {
            res.status(500).send('Erro ao cadastrar Estoque');
            return;
        }
        res.json({ estoque_id: insertId }); // Retorna o ID do estoque
    });
};

exports.cadastrarEstoqueItens = (req, res) => {
    const estoqueItens = {
        estoque_id: req.body.estoque_id,
        lote_id: req.body.lote_id,
        medicamento_id: req.body.medicamento_id,
        qtd: req.body.qtd,
        localizacao_id: req.body.localizacao_id,
        observacoes: req.body.observacoes
    };

    db.insertItemEstoque(estoqueItens, (err) => {
        if (err) {
            res.status(500).send('Erro ao cadastrar Itens no estoque');
            return;
        }
        res.send('Itens do estoque cadastrado com sucesso');
    });
};
