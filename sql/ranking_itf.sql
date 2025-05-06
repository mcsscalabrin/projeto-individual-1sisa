CREATE DATABASE ranking_itf;
USE ranking_itf;

CREATE TABLE ranking_masc (
	idAtleta int primary key auto_increment,
	nome varchar(100),
	anoNasc smallint,
	paisDeOrigem varchar(45),
	torneiosJogados int,
	pontos int,
	ranking_itf int,
	fkDupla int,
	constraint fkJogadorDupla foreign key (fkDupla)
		references ranking_masc(idAtleta)
);

INSERT INTO ranking_masc (nome, anoNasc, paisDeOrigem, torneiosJogados, pontos, ranking_itf) VALUES
	('André Baran', 1991, 'Brasil', 22, 5800, 1),
    ('Michele Cappelletti', 1992, 'Itália', 23, 5800, 1),
    ('Nicolas Gianotti', 1998, 'França', 25, 5560, 3),
    ('Mattia Spoto', 1999, 'Itália', 28, 5560, 3),
    ('Daniel Mola', 2003, 'Brasil', 31, 2227, 5),
    ('Allan Oliveira', 1994, 'Brasil', 27, 2218, 6),
    ('Giovanni Cariani', 2003, 'Brasil', 22, 2165, 7),
    ('Antonio Miguel Ramos Vieira', 1993, 'Espanha', 30, 1970, 8),
    ('Leonardo Garrossino Branco', 2001, 'Brasil', 32, 1920, 9),
    ('Tommaso Giovannini', 1995, 'Itália', 13, 1881, 10),