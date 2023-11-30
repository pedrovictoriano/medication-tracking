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

exports.atualizarLotes = (req, res) => {
    const id = req.params.id;
    const loteAtualizado = {
        numeroLote: req.body.numeroLote,
        dataFabricacao: moment(req.body.dataFabricacao, 'DD/MM/YYYY').format('YYYY-MM-DD'),
        dataValidade: moment(req.body.dataValidade, 'DD/MM/YYYY').format('YYYY-MM-DD'),
    };

    db.updateLote(id, loteAtualizado, (err) => {
        if (err) {
            res.status(500).send('Erro ao atualizar lote');
            return;
        }
        res.send('Lote atualizado com sucesso');
    });
}

exports.obterLote = (req, res) => {
    const loteId = req.params.loteId;

    db.getLoteById(loteId, (err, data) => {
        if (err) {
            res.status(500).send("Erro ao acessar o banco de dados");
            return;
        }
        if (data) {
            res.json(data);
        } else {
            res.status(404).send("Lote não encontrado");
        }
    });
}