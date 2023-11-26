const db = require('../../database');

exports.renderizarDashboard = (req, res) => {
    const page = [
        {
            name: 'Dashboard'
            , url: '/'
        }
    ];

    res.render('index', { page });
};