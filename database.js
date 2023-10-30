const mysql = require('mysql');

// Conexão com o banco de dados
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'medication_tracking'
});

const getMedicamentos = (callback) => {
    const query = `
        SELECT 
            m.id AS medicamento_id,
            f.nome AS fabricante_nome,
            m.nome_comercial AS medicamento_nome_comercial,
            m.nome_generico AS medicamento_nome_generico,
            fm.descricao AS forma_farmaceutica_descricao,
            u.descricao AS unidade_descricao,
            CONCAT(m.apresentacao, " ", u.descricao) AS medicamento_apresentacao,
            m.instrucoes AS medicamento_instrucoes,
            m.observacoes AS medicamento_observacoes 
        FROM
            medicamentos m
                INNER JOIN fabricantes f ON m.fabricante_id = f.id
                INNER JOIN formas_farmaceuticas fm ON m.forma_farmaceutica_id = fm.id
                INNER JOIN unidades u ON m.unidade_id = u.id
    `;

    connection.query(query, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};

module.exports = {
    getMedicamentos,
};