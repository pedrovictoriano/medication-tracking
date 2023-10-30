CREATE TABLE medicamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fabricante VARCHAR(255) NOT NULL,
    nome_comercial VARCHAR(255) NOT NULL,
    nome_generico VARCHAR(255) NOT NULL,
    forma_farmaceutica VARCHAR(100),
    dosagem VARCHAR(100),
    instrucoes TEXT
);
