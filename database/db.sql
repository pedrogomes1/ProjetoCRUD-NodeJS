-- Criando a base de dados

create database IF NOT EXISTS produtos;
use produtos;

create table produto(
    codigo INT(4) AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    quantidade INT (10) NOT NULL,
    preco FLOAT (10,2) NOT NULL
);