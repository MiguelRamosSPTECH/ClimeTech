void setup() {
  Serial.begin(9600);
  randomSeed(analogRead(0)); // Inicializa a semente do gerador aleatório
}

void loop() {
  // Gera temperatura aleatória entre 25 e 30
  float temperatura = random(250, 281) / 10.0; // Ex: de 25.0 até 30.0
  float umidade = random(500, 550) / 10.0;     // Ex: de 50.0% até 80.0%

  Serial.print(temperatura);
  Serial.print(";");
  Serial.println(umidade);

  delay(5000); // Espera 2 segundos
}
