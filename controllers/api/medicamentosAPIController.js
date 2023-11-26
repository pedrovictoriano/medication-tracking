const db = require('../../database');

exports.listarMedicamentos = (req, res) => {
    db.getMedicamentos((err, results) => {
        if (err) {
            res.status(500).send('Erro ao obter os Medicamentos');
            return;
        }
        res.json({ data: results });
    });
};

exports.cadastrarMedicamentos = (req, res) => {
    const medicamento = {
        fabricanteId: req.body.fabricanteId,
        nomeComercial: req.body.nomeComercial,
        nomeGenerico: req.body.nomeGenerico,
        formaFarmaceuticaId: req.body.formaFarmaceuticaId,
        unidadeId: req.body.unidadeId,
        apresentacao: req.body.apresentacao,
        instrucoes: req.body.instrucoes,
        observacoes: req.body.observacoes
    };

    db.insertMedicamentos(medicamento, (err) => {
        if (err) {
            res.status(500).send('Erro ao cadastrar medicamento');
            return;
        }
        res.send('Medicamento cadastrado com sucesso');
    });
}

exports.atualizarMedicamento = (req, res) => {
    const id = req.params.id;
    const medicamentoAtualizado = {
        fabricanteId: req.body.fabricanteId,
        nomeComercial: req.body.nomeComercial,
        nomeGenerico: req.body.nomeGenerico,
        formaFarmaceuticaId: req.body.formaFarmaceuticaId,
        unidadeId: req.body.unidadeId,
        apresentacao: req.body.apresentacao,
        instrucoes: req.body.instrucoes,
        observacoes: req.body.observacoes
    };

    db.updateMedicamento(id, medicamentoAtualizado, (err) => {
        if (err) {
            res.status(500).send('Erro ao atualizar medicamento');
            return;
        }
        res.send('Medicamento atualizado com sucesso');
    });
}

exports.obterMedicamento = (req, res) => {
    const medicamentoId = req.params.medicamentoId;

    db.getMedicamentoById(medicamentoId, (err, data) => {
        if (err) {
            res.status(500).send("Erro ao acessar o banco de dados");
            return;
        }
        if (data) {
            res.json(data);
        } else {
            res.status(404).send("Medicamento não encontrado");
        }
    });
}