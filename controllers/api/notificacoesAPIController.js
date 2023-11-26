const db = require('../../database');

exports.listarNotificacoes = (req, res) => {
    // Supondo que a função 'buscarNotificacoes' esteja definida em database.js
    db.buscarNotificacoes((err, notificacoes) => {
        if (err) {
            res.status(500).send('Erro ao buscar notificações');
            return;
        }
        res.json(notificacoes);
    });
};

exports.atualizarNotificacoes = (req, res) => {
    const notificacaoId = req.params.id;

    db.marcarComoVisualizada(notificacaoId, (err, result) => {
        if (err) {
            res.status(500).send('Erro ao atualizar a notificação');
            return;
        }
        res.send('Notificação atualizada com sucesso');
    });
}