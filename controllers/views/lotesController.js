const db = require('../../database');

exports.renderizarLotes = (req, res) => {
    res.render('lotes/lotes', {
        page: [{ name: 'Lotes', url: '/lotes' }]
    });
}