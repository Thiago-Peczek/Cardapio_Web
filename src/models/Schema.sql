DROP DATABASE IF EXISTS cardapio;
CREATE DATABASE cardapio;
USE cardapio;

CREATE TABLE IF NOT EXISTS tipos(
	idTipo INT AUTO_INCREMENT PRIMARY KEY,
	nome VARCHAR(255) NOT NULL
);

INSERT INTO tipos(nome) VALUES 
('Prato principal'),
('Sobremesa'),
('Entrada'),
('Bebida');

CREATE TABLE IF NOT EXISTS pratos(
	id INT AUTO_INCREMENT PRIMARY KEY,
	nome VARCHAR(255) NOT NULL,
	descricao VARCHAR(255) NOT NULL,
	preco DECIMAL(10,2) NOT NULL,
	imagem VARCHAR(255),
	tipo INT NOT NULL,
	FOREIGN KEY (tipo) REFERENCES tipos(idTipo)
);

SHOW TABLES;
DESCRIBE tipos;
DESCRIBE pratos;