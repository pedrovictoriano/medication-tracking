const mysql = require('mysql');
require('dotenv').config();

// Conexão com o banco de dados
const connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME
});

const getCountMedicamentos = (callback) => {
    const query = 'SELECT COUNT(*) AS total FROM medicamentos';
    connection.query(query, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results[0].total);
    });
};

const getMedicamentos = (limit, offset, callback) => {
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
        ORDER BY 1 ASC
        LIMIT ? OFFSET ?
    `;

    connection.query(query, [limit, offset], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};

// database.js

const insertMedicamentos = (medicamento, callback) => {
    const query = `
        INSERT INTO medicamentos 
            (fabricante_id, nome_comercial, nome_generico, forma_farmaceutica_id, unidade_id, apresentacao, instrucoes, observacoes)
        VALUES 
            (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
        medicamento.fabricanteId,
        medicamento.nomeComercial,
        medicamento.nomeGenerico,
        medicamento.formaFarmaceuticaId,
        medicamento.unidadeId,
        medicamento.apresentacao,
        medicamento.instrucoes,
        medicamento.observacoes,
    ];

    connection.query(query, params, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
};

const getFabricantes = (callback) => {
    const query = 'SELECT id, nome FROM fabricantes';
    connection.query(query, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};

const getFormasFarmaceuticas = (callback) => {
    const query = 'SELECT id, descricao FROM formas_farmaceuticas';
    connection.query(query, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};

const getUnidades = (callback) => {
    const query = 'SELECT id, descricao, abreviatura FROM unidades';
    connection.query(query, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};


module.exports = {
    getMedicamentos,
    getCountMedicamentos,
    insertMedicamentos,
    getFabricantes,
    getFormasFarmaceuticas,
    getUnidades,
};