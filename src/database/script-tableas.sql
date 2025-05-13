-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!
CREATE DATABASE db_beachtennis;
USE db_beachtennis;

CREATE TABLE beach_tenista (
    idAtleta INT PRIMARY KEY AUTO_INCREMENT,
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
    idTentativa INT,
    fkUsuario INT,
    dtHora DATETIME DEFAULT current_timestamp,
    qtdAcertos INT,
    qtdErros INT,
    PRIMARY KEY (idTentativa, fkUsuario),
    FOREIGN KEY (fkUsuario) REFERENCES usuario(id)
);

CREATE TABLE beach_tenista (
    idAtleta INT PRIMARY KEY AUTO_INCREMENT,
    genero VARCHAR(45),
    pontuacao VARCHAR(45),
    posicao VARCHAR(45)
);
