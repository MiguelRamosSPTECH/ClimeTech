use climetech;
 select ala, umidadeAtual, dtHoraColeta, idShow from dadosGrafico
        where ala = 'Leste'
        and idShow = 1;

-- teste

select * from funcionarioEmpresa;
    
    select * from setor;
    select * from dadosSensor;
    insert into dadosSensor values (null, 35.00, 80, '2025-06-07 20:00:00', 2);
    select * from sensor;
    select * from shows;


-- testando trazer mais de um alerta, ou seja, se os 4 setores estiverem em alerta, mostrar os 4


-- trazendo alertas para a dashboard
 select ala, sensacaoTermica, dtHoraColeta from view_conta_alertas
    where idShow = 1
    and sensacaoTermica > 38
    and linhaUnica = 1
    group by ala, sensacaoTermica, dtHoraColeta
    order by dtHoraColeta desc
    limit 4;
    
    select * from setor;
    select * from sensor;
    select * from dadosSensor;
    
	insert into dadosSensor values(null, 49.00, 75, current_timestamp(), 1);
                                    
                                    

-- testando alerta com insert
insert into dadosSensor values (null, 45.00, 75.00, '2025-06-07 23:00:00', 2);
select * from dadosSensor;


-- deixar salvo aqui
-- qtd de alertas de um setor especifico
select (select count((select round(
          truncate(temperaturaAtual, 2) + ((truncate(umidadeAtual, 2) / 100) * (truncate(umidadeAtual, 2) * 0.2)), 
          2
      ) as sensacaoTermica from vw_media_dados_setor
	where ala = 'Sul'
    and idShow = 1
      having sensacaoTermica > 38))) as qtdAlertas;
      
-- TRAZENDO ALERTA
    select ala, sensacaoTermica, dtHoraColeta from view_conta_alertas
    where idShow = 1
    and sensacaoTermica > 38
    and dtHoraColeta >= '2025-06-08 12:52:00';

--
INSERT INTO funcionarioEmpresa (idFuncionarioEmpresa, nome, email, senha, dtCriacao, idEmpresa, tipoAcesso) VALUES
(1, 'Miguel', 'miguel@climetech.com', 'm1Cl4@', '2025-05-20 15:00:00', 1, 'admin');

select * from funcionarioEmpresa;
-- limpar dados
truncate table dadosSensor;
select * from dadosSensor;
      