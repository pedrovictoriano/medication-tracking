const db = require('../../database');

exports.renderizarMedicamentos = (req, res) => {
    res.render('medicamentos/medicamentos', {
        page: [{ name: 'Medicamentos', url: '/Medicamentos' }]
    });
}