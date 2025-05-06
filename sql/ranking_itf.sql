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
    ('Tommaso Giovannini', 1995, 'Itália', 13, 1881, 10);

CREATE TABLE ranking_fem (
	idAtleta int primary key auto_increment,
	nome varchar(100),
	anoNasc smallint,
	paisDeOrigem varchar(45),
	torneiosJogados int,
	pontos int,
	ranking_itf int,
	fkDupla int,
	constraint fkJogadoraDupla foreign key (fkDupla)
		references ranking_fem(idAtleta)
);

INSERT INTO ranking_fem (nome, anoNasc, paisDeOrigem, torneiosJogados, pontos, ranking_itf) VALUES
	('Giulia Gasparri', 1991, 'Itália', 22, 5492, 1),
	('Ninny Valentini', 1999, 'Itália', 22, 5492, 1),
	('Patricia Diaz', 1991, 'Venezuela', 19, 4248, 3),
	('Rafaella Miiller', 1993, 'Brasil', 19, 4248, 3),
	('Sophia Chow', 1997, 'Brasil', 21, 3940, 5),
	('Vitoria Marchezini', 2005, 'Brasil', 24, 3940, 5),
	('Flaminia Daina', 1993, 'Itália', 28, 2856, 7),
	('Nicole Nobile', 1995, 'Itália', 26, 2743, 8),
	('Veronica Casadei', 1998, 'Itália', 24, 2651, 9),
	('Elizaveta Kudinova', 2004, 'Rússia', 21, 2568, 10);

SELECT * FROM ranking_masc;

-- DUPLA BARAN E CAPPE
UPDATE ranking_masc SET fkDupla = 2 where idAtleta = 1;
UPDATE ranking_masc SET fkDupla = NULL where idAtleta = 2;

-- DUPLA SPOTO E GIANOTTI
UPDATE ranking_masc SET fkDupla = 4 where idAtleta = 3;
UPDATE ranking_masc SET fkDupla = NULL where idAtleta = 4;

-- MOSTRANDO OS JOGADORES QUE POSSUEM DUPLA FIXA E SUAS DUPLAS
SELECT ranking.nome, dupla.nome as 'Dupla Fixa'
	FROM ranking_masc as ranking
	JOIN ranking_masc as dupla
    ON ranking.fkDupla = dupla.idAtleta;

SELECT * FROM ranking_fem;

-- DUPLA GIULIA E NINNY
UPDATE ranking_fem SET fkDupla = 2 where idAtleta = 1;
UPDATE ranking_fem SET fkDupla = NULL where idAtleta = 2;

-- DUPLA DIAZ E MIILLER
UPDATE ranking_fem SET fkDupla = 4 where idAtleta = 3;
UPDATE ranking_fem SET fkDupla = NULL where idAtleta = 4;


-- MOSTRANDO AS JOGADORAS QUE POSSUEM DUPLA FIXA E SUAS DUPLAS
SELECT ranking.nome, dupla.nome as 'Dupla Fixa'
	FROM ranking_fem as ranking
	JOIN ranking_fem as dupla
    ON ranking.fkDupla = dupla.idAtleta;
