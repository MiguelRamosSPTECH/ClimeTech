// importa os bibliotecas necessários
const serialport = require('serialport');
const express = require('express');
const mysql = require('mysql2');

// constantes para configurações
const SERIAL_BAUD_RATE = 9600;
const SERVIDOR_PORTA = 3300;

// habilita ou desabilita a inserção de dados no banco de dados
const HABILITAR_OPERACAO_INSERIR = true;

//data-hora atual p inserir no banco
const now = new Date().toISOString(); //ISOString é formato global de formatação de data-hora, sql usa ele
const dataFormatada = now.slice(0, -5).replace('T', ' ');


// função para comunicação serial
const serial = async (
    valoresTemperatura,
    valoresUmidade,
) => {
    // conexão com o banco de dados MySQL
    let poolBancoDados = mysql.createPool(
        {
            host: '10.18.33.25',
            user: 'aluno',
            password: 'Sptech#2024',
            database: 'climetech',
            port: 3307
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
        console.log(data);
        const valores = data.split(';');
        const temperatura = parseFloat(valores[0]);
        const umidade = parseInt(valores[1]);


        // armazena os valores dos sensores nos arrays correspondentes
        valoresTemperatura.push(temperatura);
        valoresUmidade.push(umidade);

        // insere os dados no banco de dados (se habilitado)
        if (HABILITAR_OPERACAO_INSERIR) {

            // este insert irá inserir os dados na tabela "medida"
            await poolBancoDados.execute(
                'insert into dadosSensor(temperatura, umidade, dtHoraColeta, idSensor) VALUES (?, ?, ?, ?)',
                [temperatura, umidade, dataFormatada, 1]
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