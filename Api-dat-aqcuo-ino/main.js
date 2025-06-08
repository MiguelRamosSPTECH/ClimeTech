// importa os bibliotecas necessários
const serialport = require('serialport');
const express = require('express');
const mysql = require('mysql2');

// constantes para configurações
const SERIAL_BAUD_RATE = 9600;
const SERVIDOR_PORTA = 3300;

// habilita ou desabilita a inserção de dados no banco de dados
const HABILITAR_OPERACAO_INSERIR = true;
let dataFormatada;
//data-hora atual p inserir no banco
function tratandoData() {
    let now = new Date().toISOString(); //ISOString é formato global de formatação de data-hora, sql usa ele
    dataFormatada = now.slice(0, -5).replace('T', ' ');
}


// função para comunicação serial
const serial = async (
    valoresTemperatura,
    valoresUmidade,
) => {
    // conexão com o banco de dados MySQL
    let poolBancoDados = mysql.createPool(
        {

            host: '10.18.32.115',
            user: 'aluno',
            password: 'Sptech#2024',
            database: 'climetech',
            port: 3307



            // host: '10.18.33.25',
            // user: 'aluno',
            // password: 'Sptech#2024',
            // database: 'climetech',
            // port: 3307
        }
    ).promise();


    // lista as portas seriais disponíveis e procura pelo Arduino
    const portas = await serialport.SerialPort.list();
    const portaArduino = portas.find((porta) => porta.vendorId == 2341 && porta.productId == 43);
    if (!portaArduino) {
        throw new Error('O arduino não foi encontrado em nenhuma porta serial');
    }

    // configura a porta serial com o baud rate especificado
    const arduino = new serialport.SerialPort(
        {
            path: portaArduino.path,
            baudRate: SERIAL_BAUD_RATE
        }
    );

    // evento quando a porta serial é aberta
    arduino.on('open', () => {
        console.log(`A leitura do arduino foi iniciada na porta ${portaArduino.path} utilizando Baud Rate de ${SERIAL_BAUD_RATE}`);
    });

    // processa os dados recebidos do Arduino
    arduino.pipe(new serialport.ReadlineParser({ delimiter: '\r\n' })).on('data', async (data) => {
        
        const valores = data.split(';');
        // norte
        const temperatura = parseFloat(valores[0]);
        const umidade = parseInt(valores[1]);

        // Gera variação de até ±9 graus para temperatura
        function variarTemperatura(base) {
            const variacao = (Math.random() * 19) - 8; // de -4 a +13
            return (base + variacao).toFixed(2);
        }


        // Gera variação aleatória de umidade (exemplo com até ±30%)
        function variarUmidade(base) {
            const variacao = (Math.random() * 0.3) - 0.3; // -30% a +30%
            return (base * (1 + variacao)).toFixed(2);
        }

        // Sul
        const umidade2 = variarUmidade(umidade);
        const temperatura2 = variarTemperatura(temperatura);

        // Leste
        const umidade3 = variarUmidade(umidade);
        const temperatura3 = variarTemperatura(temperatura);

        // Oeste
        const umidade4 = variarUmidade(umidade);
        const temperatura4 = variarTemperatura(temperatura);


        console.log("\n","\n",
            "Norte:", temperatura, "\n",
            "Sul:", temperatura2,"\n",
            'Leste:', temperatura3,"\n",
            'Oste:', temperatura4)

        // armazena os valores dos sensores nos arrays correspondentes
        valoresTemperatura.push(temperatura);
        valoresUmidade.push(umidade);

        // insere os dados no banco de dados (se habilitado)
        if (HABILITAR_OPERACAO_INSERIR) {
            tratandoData()
            // este insert irá inserir os dados na tabela "medida"
            await poolBancoDados.execute(
                'insert into dadosSensor(temperatura, umidade, dtHoraColeta, idSensor) VALUES (?, ?, ?, ?)',
                [temperatura, umidade, dataFormatada, 1]
            );
            await poolBancoDados.execute(
                'insert into dadosSensor(temperatura, umidade, dtHoraColeta, idSensor) VALUES (?, ?, ?, ?)',
                [temperatura2, umidade2, dataFormatada, 2]
            );
            await poolBancoDados.execute(
                'insert into dadosSensor(temperatura, umidade, dtHoraColeta, idSensor) VALUES (?, ?, ?, ?)',
                [temperatura3, umidade3, dataFormatada, 3]
            );
            await poolBancoDados.execute(
                'insert into dadosSensor(temperatura, umidade, dtHoraColeta, idSensor) VALUES (?, ?, ?, ?)',
                [temperatura4, umidade4, dataFormatada, 4]
            );
        }

    });



    // evento para lidar com erros na comunicação serial
    arduino.on('error', (mensagem) => {
        console.error(`Erro no arduino (Mensagem: ${mensagem}`)
    });
}

// função para criar e configurar o servidor web
const servidor = (
    valoresTemperatura,
    valoresUmidade
) => {
    const app = express();

    // configurações de requisição e resposta
    app.use((request, response, next) => {
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        next();
    });

    // inicia o servidor na porta especificada
    app.listen(SERVIDOR_PORTA, () => {
        console.log(`API executada com sucesso na porta ${SERVIDOR_PORTA}`);
    });

    // define os endpoints da API para cada tipo de sensor
    app.get('/sensores/temperatura', (_, response) => {
        return response.json(valoresTemperatura);
    });
    app.get('/sensores/umidade', (_, response) => {
        return response.json(valoresUmidade);
    });
}

// função principal assíncrona para iniciar a comunicação serial e o servidor web
(async () => {
    // arrays para armazenar os valores dos sensores
    const valoresTemperatura = [];
    const valoresUmidade = [];

    // inicia a comunicação serial
    await serial(
        valoresTemperatura,
        valoresUmidade
    );

    // inicia o servidor web
    servidor(
        valoresTemperatura,
        valoresUmidade
    );
})();