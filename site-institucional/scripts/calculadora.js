function calcularLucro() {
    var estadio = ipt_nomeEstadio.value
    var capacidade = ipt_capacidade.value
    var lucroIngressoAnual = Number(ipt_lucro_ingresso.value)
    var lucroParceriaAnual = Number(ipt_lucro_parcerias.value)


    var porcentagemIngressoAnual = (lucroIngressoAnual * 1.1).toFixed(2)
    var porcentagemParceriaAnual = (lucroParceriaAnual * 1.3).toFixed(2)

    var perdaEstimada = (porcentagemIngressoAnual * 0.27).toFixed(2)
    var recuperadoClimetech = (perdaEstimada * 0.80).toFixed(2)


    if (lucroIngressoAnual == "" || lucroParceriaAnual == "" || estadio == "" || capacidade == "") {
        div_resposta.innerHTML = "<h2>Por favor, é <span>necessário</span> preencher todos os campos.</h2>"
    }
    else {
        div_resposta.innerHTML =
        ` 
            <div class="div_resposta_simulador">
                <div>
                    <p>
                    1. O <span>${ipt_nomeEstadio.value}</span> recebe em média um público estimado de ${capacidade} pessoas por evento.
                    </p>
                
                    <p>
                        2. Isso gera uma <span>receita média de R$${(lucroIngressoAnual + lucroParceriaAnual).toFixed(2)}</span> por ano com ingressos e parcerias comerciais.
                    </p>
                </div>
                
                <div>
                    <p>
                        3. No entanto, estudos mostram que estádios com <span style="color:red;">má gestão térmica perdem até 27%</span> do lucro anual, resultando na queda da compra dos ingressos: R$${perdaEstimada}
                    </p>                
                
                    <p>
                        4. É possível <span>evitar até 
                        80% dessas perdas</span>, resultando em uma recuperação de aproximadamente <span>R$${recuperadoClimetech}</span> por ano. 
                    </p>  
                </div>        
            </div>
        `;

        explicacao_simulador.innerHTML = 
        `
        <div class="explicacao-simulador">
            <h2>Fontes de  <span>Informação</span></h2>
                <div class="explicacoes">
                    
                        <div>
                            <h3>Evitar Retorno ao Local (até 12%)</h3>
                            <p>
                                Pessoas expostas a calor extremo relatam até 12% menos intenção de retornar ao local.
                            </p>
                            <p>
                                Fontes: Harvard T.H. Chan School of Public Health, estudo
                                “<em>Stadium
                                    Design and Fan Experience</em>” – University of Michigan, 2021.
                            </p>
                        </div>
                        <div>
                            <h3>Redução de Permanência e Consumo Interno (até 15%)</h3>
                            <p>Calor excessivo reduz a permanência média e o consumo em até 15%.</p>

                            <p>
                                Fontes: ASHRAE – padrões de conforto térmico, Journal of Environmental Psychology, 2020 – “Thermal Discomfort and its Influence on Consumer Behavior in Public Venues”.
                            </p>
                        </div>
                    
                        <div>
                            <h3>Percepção de Marca e Renovação de Contratos</h3>
                            <p>
                                Ambientes desconfortáveis prejudicam a associação da marca ao bem-estar, impactando
                                contratos futuros. Eventos com baixa qualidade ambiental reduzem a percepção positiva da marca
                                parceira em até 20%.
                            </p>
                            <p>Fontes: Forbes Insights & EY – “Brand Experience in Live Events” (2020), Nielsen Sports Study – “Fan Experience and Sponsorship Value”, 2021.</p>
                        </div>
                        <div>
                            <h3>Perda Estimada de até 27% no Lucro Anual</h3>
                            <p>
                                A soma de menor frequência, consumo e patrocínios pode representar perdas de até 27% do lucro anual.
                            </p>
                            <p>Fontes: PwC Sports Outlook (2022), FIFA Stadium Guidelines.</p>
                        </div>
                </div>
                <p class="fontes">
                    Fontes: Harvard T.H. Chan School of Public Health, ASHRAE, PwC Sports Outlook 2022, Nielsen Sports Study, Journal of Environmental Psychology (2020), Forbes Insights & EY (2020).
                </p>
            </div>
        `;

        div_sistema_climetech.innerHTML =
        `
            <div class="sistema-climetech">
                <div class="sem-climetech">
                    <h3>Sem um sistema como a <span>ClimeTech</span>, ocorre:</h3>
                    <ul>
                        <li>Queda na presença do público em dias muito quentes.</li>
                        <li> Menor tempo de permanência e consumo interno.</li>
                        <li>Diminuição do interesse de marcas em patrocinar eventos.</li>
                        <li>Sobrecarga de sistemas de climatização e equipamentos.</li>
                    </ul>
                </div>
                <div class="com-climetech">
                    <h3>Com o sistema <span>ClimeTech</span> fornecemos:</h3>
                    <ul>
                        <li>Monitoramento ambiental em tempo real.</li>
                        <li>Alertas automáticos de risco térmico.</li>
                        <li>Dados para tomada de decisão preventiva.</li>
                        <li>Público em um local mais prazeroso.</li>
                    </ul>
                </div>   
            </div>
        `;
    }
}