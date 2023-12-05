const mysql = require('mysql');
require('dotenv').config();

// Conexão com o banco de dados
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
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
            CONCAT(m.apresentacao, " ", u.abreviatura) AS medicamento_apresentacao,
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

const getMedicamentoById = (medicamentoId, callback) => {
    const query = `
        SELECT * FROM medicamentos
        WHERE id = ?
    `;

    connection.query(query, [medicamentoId], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};

const getMedicamentoLotes = (medicamentoId, callback) => {
    //Lista lotes disponiveis e sua quantidade para o medicamento fornecido, onde estoque maior que 0 e ordena pelos mais proximos do vencimento
    const query = `
        SELECT 
            l.id,
            l.numero_lote,
            SUM(CASE WHEN tm.operacao = 'entrada' THEN ei.qtd ELSE 0 END) - 
            SUM(CASE WHEN tm.operacao = 'saida' THEN ei.qtd ELSE 0 END) AS quantidade_total
        FROM
            lotes l
            JOIN estoque_itens ei ON ei.lote_id = l.id
            JOIN estoque e ON ei.estoque_id = e.id
            JOIN tipos_movimentacoes tm ON e.tipo_movimentacao_id = tm.id
        WHERE
            ei.medicamento_id = ? AND (tm.operacao = 'entrada' OR tm.operacao = 'saida')
        GROUP BY
            l.id, l.numero_lote
        ORDER BY
            l.data_validade ASC;
    `;

    connection.query(query, [medicamentoId], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};

const updateMedicamento = (medicamentoId, medicamento, callback) => {
    const query = `
        UPDATE medicamentos
        SET
            fabricante_id = ?,
            nome_comercial = ?,
            nome_generico = ?,
            forma_farmaceutica_id = ?,
            unidade_id = ?,
            apresentacao = ?,
            instrucoes = ?,
            observacoes = ?
        WHERE
            id = ?
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
        medicamentoId
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

const getLotes = (callback) => {
    const query = `
        SELECT 
            id,
            numero_lote,
            data_fabricacao,
            data_validade,
            data_criacao,
            data_atualizacao,
            DATEDIFF(data_validade, CURDATE()) AS dias_para_vencer
        FROM
            lotes
    `;
    // Tem que ajustar esse select para trazer apenas lotes há vencer e que tem quantidade no estoque
    // Seria uma melhoria trazer lotes vencidos, filtros

    connection.query(query, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};

const insertLotes = (lote, callback) => {
    const query = `
        INSERT INTO lotes 
            (numero_lote, data_fabricacao, data_validade)
        VALUES 
            (?, ?, ?)
    `;

    const params = [
        lote.numeroLote,
        lote.dataFabricacao,
        lote.dataValidade
    ];

    connection.query(query, params, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
};

const getLoteById = (loteId, callback) => {
    const query = `
        SELECT
            id,
            numero_lote,
            DATE_FORMAT(data_fabricacao, '%d/%m/%Y') AS data_fabricacao_formatada,
            DATE_FORMAT(data_validade, '%d/%m/%Y') AS data_validade_formatada,
            DATE_FORMAT(data_atualizacao, '%d/%m/%Y %H:%i') AS data_atualizacao_formatada
        FROM
            lotes
        WHERE
            id = ?
        `;

    connection.query(query, [loteId], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};

const updateLote = (loteId, lote, callback) => {
    const query = `
        UPDATE lotes
        SET
            numero_lote = ?,
            data_fabricacao = ?,
            data_validade = ?
        WHERE
            id = ?
    `;

    const params = [
        lote.numeroLote,
        lote.dataFabricacao,
        lote.dataValidade,
        loteId
    ];

    connection.query(query, params, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
};

const verificarLotesProximosDoVencimento = (callback) => {
    const query = `
        SELECT 
            numero_lote,
            DATE_FORMAT(data_validade, '%d/%m/%Y') AS data_validade_formatada
        FROM
            lotes
        WHERE
            data_validade BETWEEN CURDATE()
            AND DATE_ADD(CURDATE(), INTERVAL 90 DAY);
    `;

    connection.query(query, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};

const inserirNotificacao = (numeroLote, mensagem, callback) => {
    const query = `
        INSERT INTO notificacoes (numero_lote, mensagem)
        VALUES (?, ?)
    `;

    connection.query(query, [numeroLote, mensagem], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
};

const limparNotificacoesAntigas = (callback) => {
    // Por exemplo, excluir notificações com mais de 90 dias
    const query = `DELETE FROM notificacoes`;

    connection.query(query, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
};

const buscarNotificacoes = (callback) => {
    const query = `
        SELECT
            *
        FROM
            notificacoes
        WHERE
            visualizada = FALSE
        ORDER BY data_criacao DESC
    `;

    connection.query(query, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};

const marcarComoVisualizada = (notificacaoId, callback) => {
    const query = `
        UPDATE notificacoes
        SET visualizada = TRUE
        WHERE id = ?
    `;

    connection.query(query, [notificacaoId], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
};

const getEstoque = (callback) => {
    const query = `
        SELECT 
            e.id,
            tm.descricao as tipo_movimentacao_descricao,
            e.documento,
            DATE_FORMAT(e.data_movimentacao, '%d/%m/%Y %h:%m') AS data_movimentacao_formatada
        FROM
            estoque e
                INNER JOIN tipos_movimentacoes	tm ON e.tipo_movimentacao_id = tm.id
    `;

    connection.query(query, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};

const insertEstoque = (estoque, callback) => {
    const query = `
        INSERT INTO estoque 
            (tipo_movimentacao_id, documento, data_movimentacao, observacoes)
        VALUES 
            (?, ?, ?, ?)
    `;

    const params = [
        estoque.movimentacao,
        estoque.documento,
        estoque.dataMovimentacao,
        estoque.estoqueObservacoes
    ];

    connection.query(query, params, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results.insertId); // retorna id do registro
    });
};

// Função para inserir um item do estoque
const insertItemEstoque = (item, callback) => {
    const query = `
        INSERT INTO estoque_itens 
            (estoque_id, lote_id, medicamento_id, qtd, localizacao_id, observacoes)
        VALUES 
            (?, ?, ?, ?, ?, ?);
    `;

    const params = [
        item.estoque_id,
        item.lote_id,
        item.medicamento_id,
        item.qtd,
        item.localizacao_id,
        item.observacoes
    ];

    connection.query(query, params, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results); // Retorna o ID do item inserido
    });
};

const getLocalizacoes = (callback) => {
    const query = `
        SELECT 
            *
        FROM
            localizacoes
    `;

    connection.query(query, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};

const getTiposMovimentacoes = (callback) => {
    const query = `
        SELECT 
            *
        FROM
            tipos_movimentacoes
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
    insertMedicamentos,
    getFabricantes,
    getFormasFarmaceuticas,
    getUnidades,
    getMedicamentoById,
    getMedicamentoLotes,
    updateMedicamento,
    getLotes,
    insertLotes,
    getLoteById,
    updateLote,
    verificarLotesProximosDoVencimento,
    inserirNotificacao,
    limparNotificacoesAntigas,
    buscarNotificacoes,
    marcarComoVisualizada,
    getEstoque,
    insertEstoque,
    insertItemEstoque,
    getLocalizacoes,
    getTiposMovimentacoes,
};