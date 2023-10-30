CREATE TABLE fabricantes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    status BOOLEAN NOT NULL,
    data_criacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	data_atualizacao DATETIME ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO fabricantes (nome, status) VALUES ('Laboratórios Teuto', TRUE);
INSERT INTO fabricantes (nome, status) VALUES ('Pfizer', TRUE);
INSERT INTO fabricantes (nome, status) VALUES ('Roche', TRUE);
INSERT INTO fabricantes (nome, status) VALUES ('Novartis', TRUE);
INSERT INTO fabricantes (nome, status) VALUES ('Sanofi', TRUE);
INSERT INTO fabricantes (nome, status) VALUES ('Bayer', TRUE);
INSERT INTO fabricantes (nome, status) VALUES ('AstraZeneca', TRUE);
INSERT INTO fabricantes (nome, status) VALUES ('Johnson & Johnson', TRUE);
INSERT INTO fabricantes (nome, status) VALUES ('Merck', TRUE);
INSERT INTO fabricantes (nome, status) VALUES ('Gilead Sciences', TRUE);


CREATE TABLE formas_farmaceuticas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(100) NOT NULL,
    abreviatura VARCHAR(100) NOT NULL,
    diluida BOOLEAN NOT NULL,
    data_criacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	data_atualizacao DATETIME ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO formas_farmaceuticas (descricao, abreviatura, diluida) VALUES ('Comprimido(s)', 'Comp', FALSE);
INSERT INTO formas_farmaceuticas (descricao, abreviatura, diluida) VALUES ('Ampola(s)', 'Amp', FALSE);
INSERT INTO formas_farmaceuticas (descricao, abreviatura, diluida) VALUES ('Frasco(s)', 'Fras', FALSE);
INSERT INTO formas_farmaceuticas (descricao, abreviatura, diluida) VALUES ('Cápsula(s)', 'Caps', FALSE);
INSERT INTO formas_farmaceuticas (descricao, abreviatura, diluida) VALUES ('Bisnaga(s)', 'Bis', FALSE);
INSERT INTO formas_farmaceuticas (descricao, abreviatura, diluida) VALUES ('Caixa(s)', 'Cx', FALSE);
INSERT INTO formas_farmaceuticas (descricao, abreviatura, diluida) VALUES ('Pacote(s)', 'Pac', FALSE);


CREATE TABLE unidades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(100) NOT NULL,
    abreviatura VARCHAR(100) NOT NULL,
    data_criacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	data_atualizacao DATETIME ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO unidades (descricao, abreviatura) VALUES ('Miligrama', 'mg');
INSERT INTO unidades (descricao, abreviatura) VALUES ('Mililitro', 'mL');
INSERT INTO unidades (descricao, abreviatura) VALUES ('Quilograma', 'kg');
INSERT INTO unidades (descricao, abreviatura) VALUES ('Gramas', 'g');
INSERT INTO unidades (descricao, abreviatura) VALUES ('Litros', 'L');

CREATE TABLE medicamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fabricante_id INT NOT NULL,
    nome_comercial VARCHAR(255) NOT NULL,
    nome_generico VARCHAR(255) NOT NULL,
    forma_farmaceutica_id INT NOT NULL,
    unidade_id INT NOT NULL,
    apresentacao VARCHAR(100) NOT NULL,
    instrucoes TEXT,
    observacoes TEXT,
    status BOOLEAN NOT NULL,
    data_criacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	data_atualizacao DATETIME ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE medicamentos
ADD FOREIGN KEY (fabricante_id) REFERENCES fabricantes(id),
ADD FOREIGN KEY (forma_farmaceutica_id) REFERENCES formas_farmaceuticas(id),
ADD FOREIGN KEY (unidade_id) REFERENCES unidades(id)

INSERT INTO medicamentos (fabricante_id, nome_comercial, nome_generico, forma_farmaceutica_id, unidade_id, apresentacao, instrucoes, observacoes, status) 
VALUES (1, 'Paracetamol', 'Acetaminofeno', 2, 1, '500mg', 'Tomar uma cápsula a cada 6 horas', 'Não usar com álcool', true);

INSERT INTO medicamentos (fabricante_id, nome_comercial, nome_generico, forma_farmaceutica_id, unidade_id, apresentacao, instrucoes, observacoes, status) 
VALUES (2, 'Amoxilina', 'Amoxicilina', 3, 2, '250mg/5mL', 'Tomar 5 mL a cada 8 horas por 7 dias', 'Agitar antes de usar', true);

INSERT INTO medicamentos (fabricante_id, nome_comercial, nome_generico, forma_farmaceutica_id, unidade_id, apresentacao, instrucoes, observacoes, status) 
VALUES (3, 'Aspirina', 'Ácido acetilsalicílico', 1, 1, '100mg', 'Tomar uma cápsula por dia', 'Evitar em caso de úlceras', true);

INSERT INTO medicamentos (fabricante_id, nome_comercial, nome_generico, forma_farmaceutica_id, unidade_id, apresentacao, instrucoes, observacoes, status) 
VALUES (4, 'Losartana', 'Losartan Potássico', 2, 1, '50mg', 'Tomar uma cápsula por dia', 'Monitorar a pressão arterial', true);

INSERT INTO medicamentos (fabricante_id, nome_comercial, nome_generico, forma_farmaceutica_id, unidade_id, apresentacao, instrucoes, observacoes, status) 
VALUES (5, 'Omeprazol', 'Omeprazol', 2, 1, '20mg', 'Tomar uma cápsula em jejum', 'Não mastigar a cápsula', true);

INSERT INTO medicamentos (fabricante_id, nome_comercial, nome_generico, forma_farmaceutica_id, unidade_id, apresentacao, instrucoes, observacoes, status) 
VALUES (1, 'Dipirona', 'Metamizol Sódico', 4, 2, '500mg/10mL', 'Tomar 10 mL a cada 6 horas', 'Não usar por mais de 5 dias', true);

INSERT INTO medicamentos (fabricante_id, nome_comercial, nome_generico, forma_farmaceutica_id, unidade_id, apresentacao, instrucoes, observacoes, status) 
VALUES (2, 'Captopril', 'Captopril', 2, 1, '25mg', 'Tomar uma cápsula duas vezes ao dia', 'Não interromper abruptamente', true);

INSERT INTO medicamentos (fabricante_id, nome_comercial, nome_generico, forma_farmaceutica_id, unidade_id, apresentacao, instrucoes, observacoes, status) 
VALUES (3, 'Amlodipina', 'Besilato de Amlodipina', 2, 1, '5mg', 'Tomar uma cápsula por dia', 'Monitorar a pressão arterial', true);

INSERT INTO medicamentos (fabricante_id, nome_comercial, nome_generico, forma_farmaceutica_id, unidade_id, apresentacao, instrucoes, observacoes, status) 
VALUES (4, 'Sertralina', 'Sertralina', 2, 1, '50mg', 'Tomar uma cápsula pela manhã', 'Pode causar sonolência', true);

INSERT INTO medicamentos (fabricante_id, nome_comercial, nome_generico, forma_farmaceutica_id, unidade_id, apresentacao, instrucoes, observacoes, status) 
VALUES (5, 'Metformina', 'Cloridrato de Metformina', 2, 1, '500mg', 'Tomar uma cápsula duas vezes ao dia', 'Monitorar níveis de glicose', true);
