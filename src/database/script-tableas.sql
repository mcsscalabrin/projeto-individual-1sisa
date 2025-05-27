-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!
CREATE DATABASE db_beachtennis;
USE db_beachtennis;
CREATE TABLE beach_tenista (
    idAtleta INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    genero VARCHAR(45),
    pontuacao VARCHAR(45),
    posicao VARCHAR(45)
);

CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50),
    email VARCHAR(50),
    senha VARCHAR(50),
    fkAtletaFavorito INT,
    FOREIGN KEY (fkAtletaFavorito) REFERENCES beach_tenista(idAtleta),
    categoria VARCHAR(50) constraint chkCategoria check (categoria in ('PRO', 'D', 'C', 'B', 'A'))
);

CREATE TABLE registro_quiz (
    idTentativa INT auto_increment,
    fkUsuario INT,
    dtHora DATETIME DEFAULT current_timestamp,
    qtdAcertos INT,
    qtdErros INT,
    PRIMARY KEY (idTentativa, fkUsuario),
    FOREIGN KEY (fkUsuario) REFERENCES usuario(id)
);

CREATE TABLE video (
  idVideo INT NOT NULL,
  titulo VARCHAR(45) NOT NULL,
  descricao VARCHAR(200) NULL,
  video LONGBLOB NOT NULL,
  fkUsuario INT NOT NULL,
  dtHora DATETIME NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (idVideo, fkUsuario),
  CONSTRAINT fkVideoUsuario
    FOREIGN KEY (fkUsuario)
    REFERENCES usuario (id)
);

SELECT * FROM usuario;
SELECT * FROM registro_quiz;

SELECT * FROM registro_quiz as registro
	JOIN usuario
    ON registro.fkUsuario = usuario.id;

/*
INSERT INTO beach_tenista (nome, genero, pais, pontuacao, posicao) VALUES
	/* Ranking Masculino */
/*
    ('André Baran', 'Masculino', 'Brasil', 5800, 1),
    ('Michele Cappelletti', 'Masculino', 'Itália', 5800, 1),
    ('Nicolas Gianotti', 'Masculino', 'França', 5560, 3),
    ('Mattia Spoto', 'Masculino', 'Itália', 5560, 3),
    ('Daniel Mola', 'Masculino', 'Brasil', 2227, 5),
    ('Allan Oliveira', 'Masculino', 'Brasil', 2218, 6),
    ('Giovanni Cariani', 'Masculino', 'Brasil', 2165, 7),
    ('Antonio Miguel Ramos Vieira', 'Masculino', 'Espanha', 1970, 8),
    ('Leonardo Garrossino Branco', 'Masculino', 'Brasil', 1920, 9),
    ('Tommaso Giovannini', 'Masculino', 'Itália', 1881, 10),
*/
    /* Ranking Feminino */
/*
    ('Giulia Gasparri', 'Feminino', 'Itália', 5492, 1),
	('Ninny Valentini', 'Feminino', 'Itália', 5492, 1),
	('Patricia Diaz', 'Feminino', 'Venezuela', 4248, 3),
	('Rafaella Miiller', 'Feminino', 'Brasil', 4248, 3),
	('Sophia Chow', 'Feminino', 'Brasil', 3940, 5),
	('Vitoria Marchezini', 'Feminino', 'Brasil', 3940, 5),
	('Flaminia Daina', 'Feminino', 'Itália', 2856, 7),
	('Nicole Nobile', 'Feminino', 'Itália', 2743, 8),
	('Veronica Casadei', 'Feminino', 'Itália', 2651, 9),
	('Elizaveta Kudinova', 'Feminino', 'Rússia', 2568, 10);
*/
-- Modificação na tabela video para armazenar URL em vez de BLOB
ALTER TABLE video MODIFY COLUMN video VARCHAR(255) NOT NULL;
