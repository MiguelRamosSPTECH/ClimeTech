// Inclusão de biblioteca.
#include "DHT.h"

// Definição de entradas da placa Arduino.
#define TIPO_SENSOR DHT11
const int PINO_SENSOR_DHT11 = A0;

// Definição de parâmetros da biblioteca DHT11.
DHT sensorDHT(PINO_SENSOR_DHT11, TIPO_SENSOR);

int ler;

// Definição da frequência da entrada USB.
void setup () {
  Serial.begin(9600);
  sensorDHT.begin();
  pinMode(PINO_SENSOR_DHT11, INPUT);
  }

// Função que se repete até o progama ser parado, recebendo os dados da placa para
// o terminal e os exibindo.
void loop() {

  // Criação de variaveis decimais
  float umidade = sensorDHT.readHumidity();
  float temperatura = sensorDHT.readTemperature();

  // Estrutura de condição para recepção de temperatura e humidade.
  if (isnan(temperatura) || isnan(umidade)) {
    Serial.println("Erro ao ler os dados do sensor");
   
  } else {
    // Nomeia os valores no gráfico e realiza a print dos dados desejados.
    Serial.print(temperatura); Serial.print(", ");
    Serial.print(umidade);
    Serial.println();
  }

// Atraso da função de repetição, sendo em milisegundos.
    delay(2000);
  }
