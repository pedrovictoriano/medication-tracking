const db = require('../../database');

exports.renderizarEstoqe = (req, res) => {
    res.render('estoque/estoque', {
        page: [{ name: 'Estoque', url: '/estoque' }]
    });
}