#include <WiFi.h>
#include <WebServer.h>
#include <Wire.h>
#include <Adafruit_ENS160.h>

// ===============================
// CONFIGURAÇÕES DE REDE
// ===============================
const char* ssid = "SEU_WIFI";
const char* password = "SUA_SENHA";

// ===============================
// LIMITES RECOMENDADOS (NORMAIS)
// ===============================
const int LIMITE_MQ7   = 350;
const int LIMITE_AQI   = 4;
const int LIMITE_TVOC  = 400;
const int LIMITE_ECO2  = 1000;

// ===============================
// PINOS
// ===============================
#define MQ7_PIN 34   // Saída do divisor de tensão
#define BUZZER 15
#define LED_STATUS 2

// ===============================
// OBJETOS
// ===============================
Adafruit_ENS160 ens160;
WebServer server(80);

// Variáveis dos sensores
int mq7Valor = 0;
uint16_t aqi = 0;
uint16_t tvoc = 0;
uint16_t eco2 = 0;

// Variáveis filtradas (exponencial)
float mq7Filtrado = 0;

// Estados do sistema
String estado = "seguro";

// Timer
unsigned long ultimoTempoLeitura = 0;
const unsigned long intervaloLeitura = 1000; // 1s

// ===============================
// FUNÇÃO: LER MQ-7 COM FILTRO
// ===============================
int lerMQ7() {
  int leitura = analogRead(MQ7_PIN);
  mq7Filtrado = (mq7Filtrado * 0.7) + (leitura * 0.3);
  return mq7Filtrado;
}

// ===============================
// FUNÇÃO: LER ENS160
// ===============================
void lerENS160() {
  ens160.readGas();
  aqi  = ens160.getAQI();
  tvoc = ens160.getTVOC();
  eco2 = ens160.geteCO2();
}

// ===============================
// FUNÇÃO: AVALIAR ESTADO DO SISTEMA
// ===============================
void avaliarEstado() {
  bool alerta = false;

  if (mq7Valor >= LIMITE_MQ7) alerta = true;
  if (aqi >= LIMITE_AQI) alerta = true;
  if (tvoc >= LIMITE_TVOC) alerta = true;
  if (eco2 >= LIMITE_ECO2) alerta = true;

  if (alerta) {
    estado = "alerta";
    digitalWrite(BUZZER, HIGH);
  } else {
    estado = "seguro";
    digitalWrite(BUZZER, LOW);
  }
}

// ===============================
// API: ROTA /dados
// ===============================
void handleDados() {
  String json = "{";
  json += "\"mq7\":" + String(mq7Valor) + ",";
  json += "\"aqi\":" + String(aqi) + ",";
  json += "\"tvoc\":" + String(tvoc) + ",";
  json += "\"eco2\":" + String(eco2) + ",";
  json += "\"status\":\"" + estado + "\",";
  json += "\"timestamp\":" + String(millis());
  json += "}";

  server.send(200, "application/json", json);
}

// ===============================
// API: ROTA /status
// ===============================
void handleStatus() {
  server.send(200, "application/json", "{\"status\":\"" + estado + "\"}");
}

// ===============================
// API: ROTA /info
// ===============================
void handleInfo() {
  String json = "{";
  json += "\"device\":\"ESP32 Monitor de Gases\",";
  json += "\"uptime\":" + String(millis());
  json += "}";

  server.send(200, "application/json", json);
}

// ===============================
// SETUP
// ===============================
void setup() {
  Serial.begin(115200);

  pinMode(LED_STATUS, OUTPUT);
  pinMode(BUZZER, OUTPUT);
  digitalWrite(LED_STATUS, HIGH);

  // Iniciar ENS160
  Wire.begin();
  if (!ens160.begin()) {
    Serial.println("Falha ao iniciar ENS160");
    while (1);
  }
  ens160.setMode(ENS160_OPMODE_STANDARD);

  // Conectar ao WiFi
  WiFi.begin(ssid, password);
  Serial.print("Conectando ao WiFi");

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nConectado!");
  Serial.println("IP: " + WiFi.localIP().toString());

  // Rotas da API
  server.on("/dados", handleDados);
  server.on("/status", handleStatus);
  server.on("/info", handleInfo);

  server.begin();
}

// ===============================
// LOOP PRINCIPAL
// ===============================
void loop() {
  server.handleClient();

  if (millis() - ultimoTempoLeitura >= intervaloLeitura) {
    ultimoTempoLeitura = millis();

    mq7Valor = lerMQ7();
    lerENS160();
    avaliarEstado();

    Serial.println("MQ7: " + String(mq7Valor) +
                   " | AQI: " + String(aqi) +
                   " | TVOC: " + String(tvoc) +
                   " | eCO2: " + String(eco2) +
                   " | Estado: " + estado);
  }
}
