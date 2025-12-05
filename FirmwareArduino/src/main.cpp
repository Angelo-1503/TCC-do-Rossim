#include <WiFi.h>
#include <WebServer.h>
#include <Adafruit_AHTX0.h>

// =============================
// CONFIG WIFI
// =============================
const char *ssid = "SOC_BEN_SAO_JOSE";
const char *password = "97531dcba";

// =============================
// PINOS
// =============================
#define MQ_PIN 34       // ADC seguro
#define BUZZER 15
#define LED_STATUS 2

// =============================
// OBJETOS
// =============================
Adafruit_AHTX0 aht;
WebServer server(80);

// =============================
// VARIÁVEIS
// =============================
float temperatura = 0;
float umidade = 0;
int gasVal = 0;

String estado = "seguro";

// =============================
// LIMITES
// Ajuste depois conforme o sensor
// =============================
int GAS_LIMITE = 1800;    // Para MQ com divisor
float TEMP_LIMITE = 50.0; // Temperatura máxima
float UMID_LIMITE = 90.0; // Umidade crítica

// =============================
void avaliarEstado() {
  bool alerta = false;

  if (gasVal > GAS_LIMITE) alerta = true;
  if (temperatura > TEMP_LIMITE) alerta = true;
  if (umidade > UMID_LIMITE) alerta = true;

  if (alerta) {
    estado = "alerta";
    digitalWrite(BUZZER, HIGH);
  } else {
    estado = "seguro";
    digitalWrite(BUZZER, LOW);
  }
}

// =============================
void handleDados() {
  String json = "{";

  json += "\"temperatura\":" + String(temperatura) + ",";
  json += "\"umidade\":" + String(umidade) + ",";
  json += "\"gas\":" + String(gasVal) + ",";
  json += "\"estado\":\"" + estado + "\"";

  json += "}";

  server.send(200, "application/json", json);
}

// =============================
void setup() {
  Serial.begin(115200);

  pinMode(BUZZER, OUTPUT);
  pinMode(LED_STATUS, OUTPUT);
  digitalWrite(LED_STATUS, HIGH);

  // Inicia AHT21
  if (!aht.begin()) {
    Serial.println("ERRO AHT21!");
    while (1);
  }
  Serial.println("AHT21 OK.");

  // Conecta WiFi
  WiFi.begin(ssid, password);
  Serial.print("Conectando ao WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println("\nWiFi conectado!");
  Serial.println(WiFi.localIP());

  server.on("/dados", handleDados);
  server.begin();
}

// =============================
void loop() {
  server.handleClient();

  // AHT21
  sensors_event_t hum, temp;
  aht.getEvent(&hum, &temp);

  temperatura = temp.temperature;
  umidade = hum.relative_humidity;

  // MQ via ADC
  gasVal = analogRead(MQ_PIN);

  avaliarEstado();

  Serial.print("Temp: ");
  Serial.print(temperatura);
  Serial.print(" | Umid: ");
  Serial.print(umidade);
  Serial.print(" | Gas: ");
  Serial.print(gasVal);
  Serial.print(" | Estado: ");
  Serial.println(estado);

  delay(500);
}
