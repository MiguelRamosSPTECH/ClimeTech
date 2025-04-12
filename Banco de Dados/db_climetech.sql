create database climetech;

use climetech;

create table empresa(
	idEmpresa int primary key auto_increment,
    nome varchar(50),
    cnpj char(18),
    email varchar(50),
    senha varchar(20),
    token varchar(100)
);

create table funcionarioEmpresa(
	idFuncionarioEmpresa int primary key auto_increment,
    nome varchar(35),
    email varchar(50),
    senha varchar(25),
	idEmpresa int, /* perguntar se vamos usar views, funcoes */
    constraint fk_FuncionarioEmpresa foreign key(idEmpresa) references empresa(idEmpresa)
);

/* se tiver banco no cadastro e login mudar primary key da empresa p cnpj dela */

create table estadio(
	idEstadio int primary key auto_increment,
    nome varchar(35),
    cidade varchar(50),
    idEmpresa int,
    constraint fkEstadioEmpresa foreign key(idEmpresa) references empresa(idEmpresa)
);

create table setor(
	idSetor int primary key auto_increment,
    nome varchar(35),
	nivel varchar(15), /* separa ou deixa junto? */
    idEstadio int,
    constraint chk_nomeSetor check (nome in ('Norte','Leste','Oeste','Sul')),
    constraint chk_nivelSetor check (nivel in ('Inferior','Superior')),
    constraint fk_SetorEstadio foreign key(idEstadio) references estadio(idEstadio)
);

create table sensor(
	idSensor int primary key auto_increment,
    statusSensor varchar(20),
    idSetor int,
    constraint fk_SensorSetorEstadio foreign key(idSetor) references setor(idSetor)
);

create table dadosSensor(
	idDadosSensor int primary key auto_increment,
    temperatura decimal (5,3),
	umidade decimal (5,2),
    dtHoraColeta datetime,
    idSensor int,
    constraint fkSensorDados foreign key(idSensor) references sensor(idSensor)
);
/*
	nivel de alerta vão vir caso temperatura a partir de 32ºC ou umidade acima de 70%
 */
