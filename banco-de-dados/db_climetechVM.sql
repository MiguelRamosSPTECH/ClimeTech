create database if not exists climetech;
use climetech;

create table empresa(
	idEmpresa int primary key auto_increment,
    nome varchar(50) not null,
    cnpj char(18) not null,
    email varchar(50) not null,
    senha varchar(20),
    acessoLiberado boolean default(false),
    unique unq_cnpj(cnpj),
    unique unq_email(email)
);

create table funcionarioEmpresa(
	idFuncionarioEmpresa int primary key auto_increment,
    nome varchar(35) not null,
    email varchar(50) not null,
    senha varchar(25) not null,
    dtCriacao datetime,
	tipoAcesso varchar(15) default('visualizador'),
	idEmpresa int, /* perguntar se vamos usar views, funcoes */
    unique unq_email(email),
    constraint chk_tipoAcesso check(tipoAcesso in('admin', 'visualizador')),
    constraint fkEmpresaFuncionario foreign key(idEmpresa) references empresa(idEmpresa)
);

/* se tiver banco no cadastro e login mudar primary key da empresa p cnpj dela */

create table estadio(
	idEstadio int primary key auto_increment,
    nome varchar(35),
    logradouro varchar(35),
    numLogradouro varchar(5),
    uf char(2),
    idEmpresa int,
    constraint fkEstadioEmpresa foreign key(idEmpresa) references empresa(idEmpresa)
);

create table shows(
	idEvento int primary key auto_increment,
    nome varchar(35),
    dtHoraComeco datetime,
    dtHoraFinal datetime,
    idEstadio int,
    constraint fkEstadioEvento foreign key(idEstadio) references estadio(idEstadio)
);

create table setor(
	idSetor int primary key auto_increment,
    ala varchar(35) not null,
	nivelAla varchar(15) not null,
    idEstadio int not null,
    constraint chk_nomeSetor check (ala in ('Norte','Leste','Oeste','Sul')),
    constraint chk_nivelSetor check (nivelAla in ('Inferior','Superior')),
    constraint fk_SetorEstadio foreign key(idEstadio) references estadio(idEstadio)
);

create table sensor(
	idSensor int primary key auto_increment,
    statusSensor varchar(20) not null,
    idSetor int not null,
    constraint fk_SensorSetorEstadio foreign key(idSetor) references setor(idSetor),
    constraint chk_statusSensor check(statusSensor in('Ativo','Inativo','Manutenção'))
);

create table dadosSensor(
	idDadosSensor int primary key auto_increment,
    temperatura decimal (5,2) not null,
	umidade int not null,
    dtHoraColeta datetime not null,
    idSensor int not null,
    constraint fkSensorDados foreign key(idSensor) references sensor(idSensor)
);

INSERT INTO empresa (nome, cnpj, email, senha) VALUES
('ClimeTech Ltda', '12.345.678/0001-90', 'climetech@gmail.com', 'Clime90_@$');

INSERT INTO funcionarioEmpresa (nome, email, senha, dtCriacao, idEmpresa, tipoAcesso) VALUES
('Miguel', 'miguel@climetech.com', 'm1Cl4@', '2025-05-20 15:00:00', 1, 'admin');

INSERT INTO estadio (nome, logradouro, numLogradouro, uf, idEmpresa) VALUES
('Arena Central', 'Av. das Nações', '1000', 'DF', 1);

insert into shows values(null, 'Justin Bieber', '2025-05-31 23:00:00', '2025-06-01 03:00:00', 1);


-- Criando setores (8 no total: 4 alas x 2 níveis).
INSERT INTO setor (ala, nivelAla, idEstadio) VALUES
('Norte', 'Inferior', 1),
( 'Sul' , 'Superior', 1),
('Leste', 'Inferior', 1),
('Oeste', 'Superior', 1);

-- Supondo que cada setor tem 2 sensores.
INSERT INTO sensor (statusSensor, idSetor) VALUES
-- Norte 
('Ativo', 1),
-- Sul 
('Ativo', 2),
-- Leste 
('Ativo', 3),
-- Oeste 
('Ativo', 4);

-- Supondo que os sensores têm id de 1 a 16, e cada sensor tem 15 linhas.

INSERT INTO dadosSensor (temperatura, umidade, dtHoraColeta, idSensor) VALUES
-- Sensor 1:
(24.5, 60, '2025-05-27 14:00:00', 1),
(24.6, 61, '2025-05-27 14:10:00', 1),
(24.7, 61, '2025-05-27 14:20:00', 1),
(24.8, 62, '2025-05-27 14:30:00', 1),
(24.9, 63, '2025-05-27 14:40:00', 1),
(25.0, 63, '2025-05-27 14:50:00', 1),
(25.1, 64, '2025-05-27 15:00:00', 1),
(25.2, 65, '2025-05-27 15:10:00', 1),
(25.1, 65, '2025-05-27 15:20:00', 1),
(25.0, 64, '2025-05-27 15:30:00', 1),
(24.9, 63, '2025-05-27 15:40:00', 1),
(24.8, 62, '2025-05-27 15:50:00', 1),
(24.7, 61, '2025-05-27 16:00:00', 1),
(24.6, 60, '2025-05-27 16:10:00', 1),
(24.5, 60, '2025-05-27 16:20:00', 1),
-- Sensor 2:
(24.8, 59, '2025-05-27 14:00:00', 2),
(24.9, 60, '2025-05-27 14:10:00', 2),
(25.0, 61, '2025-05-27 14:20:00', 2),
(25.1, 61, '2025-05-27 14:30:00', 2),
(25.2, 62, '2025-05-27 14:40:00', 2),
(25.3, 63, '2025-05-27 14:50:00', 2),
(25.4, 64, '2025-05-27 15:00:00', 2),
(25.5, 65, '2025-05-27 15:10:00', 2),
(25.4, 65, '2025-05-27 15:20:00', 2),
(25.3, 64, '2025-05-27 15:30:00', 2),
(25.2, 63, '2025-05-27 15:40:00', 2),
(25.1, 62, '2025-05-27 15:50:00', 2),
(25.0, 61, '2025-05-27 16:00:00', 2),
(24.9, 60, '2025-05-27 16:10:00', 2),
(24.8, 59, '2025-05-27 16:20:00', 2),
-- Sensor 3:
(23.1, 55, '2025-05-27 14:00:00', 3),
(23.2, 56, '2025-05-27 14:10:00', 3),
(23.3, 56, '2025-05-27 14:20:00', 3),
(23.4, 57, '2025-05-27 14:30:00', 3),
(23.5, 58, '2025-05-27 14:40:00', 3),
(23.6, 59, '2025-05-27 14:50:00', 3),
(23.7, 60, '2025-05-27 15:00:00', 3),
(23.8, 60, '2025-05-27 15:10:00', 3),
(23.7, 59, '2025-05-27 15:20:00', 3),
(23.6, 58, '2025-05-27 15:30:00', 3),
(23.5, 57, '2025-05-27 15:40:00', 3),
(23.4, 56, '2025-05-27 15:50:00', 3),
(23.3, 55, '2025-05-27 16:00:00', 3),
(23.2, 55, '2025-05-27 16:10:00', 3),
(23.1, 54, '2025-05-27 16:20:00', 3),
-- Sensor 4:
(22.5, 57, '2025-05-27 14:00:00', 4),
(22.6, 58, '2025-05-27 14:10:00', 4),
(22.7, 59, '2025-05-27 14:20:00', 4),
(22.8, 60, '2025-05-27 14:30:00', 4),
(22.9, 60, '2025-05-27 14:40:00', 4),
(23.0, 61, '2025-05-27 14:50:00', 4),
(23.1, 62, '2025-05-27 15:00:00', 4),
(23.2, 63, '2025-05-27 15:10:00', 4),
(23.1, 63, '2025-05-27 15:20:00', 4),
(23.0, 62, '2025-05-27 15:30:00', 4),
(22.9, 61, '2025-05-27 15:40:00', 4),
(22.8, 60, '2025-05-27 15:50:00', 4),
(22.7, 59, '2025-05-27 16:00:00', 4),
(22.6, 58, '2025-05-27 16:10:00', 4),
(22.5, 57, '2025-05-27 16:20:00', 4);

select * from estadio;
select * from shows;
select * from setor;
select * from sensor;
select * from dadosSensor;
/* select * from dadosGrafico; */ -- Esta view é criada mais para baixo no código.


-- CRIAÇÃO DE VIEWS --

-- View média para filtrar todos os setores + setor especifico
create view vw_media_dados_setor as
		select s.ala, sh.idEvento as idShow, e.idEstadio as idEstadio,
			   truncate(ds.temperatura,2) temperaturaAtual,
			   truncate(ds.umidade,2) umidadeAtual,
			   ds.dtHoraColeta,
               row_number() over (PARTITION BY s.ala ORDER BY ds.dtHoraColeta desc) as linhaUnica -- novo, nao sei se pode usar
               	from setor s 
				inner join sensor se
						on s.idSetor = se.idSetor
				inner join dadosSensor ds
						on se.idSensor = ds.idSensor
				inner join estadio e 
					on e.idEstadio = s.idEstadio
				inner join shows sh 
					on sh.idEstadio = e.idEstadio;
                    
-- select para retornar de um setor especifico
select * from vw_media_dados_setor
where linhaUnica = 1 
and ala = "Norte"
and idShow = 1
and idEstadio = 1;

-- sensacao termica de todos os setores
create view vw_sensacao_geral
as
select
    round(
        truncate(avg(temperaturaAtual), 2) + ((truncate(avg(umidadeAtual), 2) / 100) * (truncate(avg(umidadeAtual), 2) * 0.2)), 
        2
    ) as sensacaoTermica, idShow
from vw_media_dados_setor
where linhaUnica = 1
group by idShow;

-- trazer a sensacao geral do show
select * from vw_sensacao_geral
where idShow = 1;
   
-- view que conta os alertas, depois podemos filtrar por setor ou geral
create view view_conta_alertas
as
  select ala, idShow, dtHoraColeta, linhaUnica, round(
          truncate(temperaturaAtual, 2) + ((truncate(umidadeAtual, 2) / 100) * (truncate(umidadeAtual, 2) * 0.2)), 
          2
      ) as sensacaoTermica
      from vw_media_dados_setor
      group by ala, idShow, sensacaoTermica, dtHoraColeta, linhaUnica;
      

 -- aqui filtramos (no caso aqui são todos os alertas
 select count(*) as qtdAlertas from view_conta_alertas
	where ala = 'Sul'
    and idShow = 1
    and sensacaoTermica > 38;
    
-- trazendo alertas para a dashboard
    select ala, sensacaoTermica, dtHoraColeta from view_conta_alertas
    where idShow = 1
    and sensacaoTermica > 38
    and dtHoraColeta >= '2025-06-07 19:06:15';
    -- antigo
select ala, sensacaoTermica, dtHoraColeta from view_conta_alertas
    where idShow = 1
    and sensacaoTermica > 38
    order by dtHoraColeta desc
    limit 1;    
  
-- trazendo setor mais quente
    select ala, sensacaoTermica, linhaUnica from view_conta_alertas
    where idShow = 1
    and linhaUnica = 1
    having sensacaoTermica = (select max(sensacaoTermica) from view_conta_alertas where linhaUnica = 1);
    
-- dados dos graficos
create view dadosGrafico
as
select ala, temperaturaAtual, umidadeAtual, dtHoraColeta, idShow
from vw_media_dados_setor
where linhaUnica between 1 and 5
order by dtHoraColeta asc;

-- filtrando as alas
select * from dadosGrafico
where ala = "Norte"
and idShow = 1;
