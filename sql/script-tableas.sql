-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!
/*
 comandos para mysql server
 */
CREATE DATABASE db_beachtennis;
USE db_beachtennis;
/*
 CREATE TABLE empresa (
 id INT PRIMARY KEY AUTO_INCREMENT,
 razao_social VARCHAR(50),
 cnpj CHAR(14),
 codigo_ativacao VARCHAR(50)
 );
 */
CREATE TABLE usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50),
    email VARCHAR(50),
    senha VARCHAR(50),
    categoria VARCHAR(50) constraint chkCategoria check (categoria in ('PRO', 'D', 'C', 'B', 'A'))
);
create table registro_quiz (
    idTentativa INT PRIMARY KEY AUTO_INCREMENT,
    dtHora DATETIME DEFAULT CURRENTTIMESTAMP(),
    qtdAcertos INT,
    qtdErros INT,
    qtdAcertos INT,
    fkUsuario INT,
    FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario)
);
