/*
 * ESP32 Posture Monitor - Example Code
 * 
 * Este código muestra cómo enviar datos desde un ESP32 al dashboard
 * cuando se detecta un evento de mala postura.
 */

#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

// Configuración WiFi
const char* ssid = "TU_WIFI_SSID";
const char* password = "TU_WIFI_PASSWORD";

// URL del endpoint - REEMPLAZA CON TU URL DE LOVABLE CLOUD
// La URL será: https://ykxvfonbsajvaaqngrmn.supabase.co/functions/v1/posture-increment
const char* serverUrl = "https://ykxvfonbsajvaaqngrmn.supabase.co/functions/v1/posture-increment";

// Pin del sensor (ejemplo: MPU6050 interrupt pin)
const int SENSOR_PIN = 2;

// Variables de control
unsigned long lastEventTime = 0;
const unsigned long debounceDelay = 2000; // 2 segundos entre eventos

void setup() {
  Serial.begin(115200);
  pinMode(SENSOR_PIN, INPUT);
  
  // Conectar a WiFi
  Serial.println("Conectando a WiFi...");
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println("\nWiFi conectado!");
  Serial.print("Dirección IP: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  // Simula la detección de mala postura
  // En tu implementación real, aquí irían los datos del sensor MPU6050
  bool badPostureDetected = digitalRead(SENSOR_PIN) == HIGH;
  
  // Debounce: solo enviar si han pasado más de 2 segundos desde el último evento
  if (badPostureDetected && (millis() - lastEventTime > debounceDelay)) {
    sendPostureEvent();
    lastEventTime = millis();
  }
  
  delay(100); // Pequeño delay para no saturar el loop
}

void sendPostureEvent() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    
    Serial.println("Enviando evento de postura...");
    
    // Configurar la petición HTTP
    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");
    http.addHeader("apikey", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlreHZmb25ic2FqdmFhcW5ncm1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNzE4ODMsImV4cCI6MjA3Nzg0Nzg4M30.lOGIOLtdYt2e5JNqHnFGlEYU1E8tmmZzzc5KhYtz4B8");
    
    // Crear JSON body (puede estar vacío, el servidor usa timestamp automático)
    StaticJsonDocument<200> doc;
    String jsonBody;
    serializeJson(doc, jsonBody);
    
    // Enviar POST request
    int httpResponseCode = http.POST(jsonBody);
    
    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.print("Respuesta del servidor: ");
      Serial.println(response);
      Serial.print("Código HTTP: ");
      Serial.println(httpResponseCode);
      
      // LED de confirmación (opcional)
      digitalWrite(LED_BUILTIN, HIGH);
      delay(200);
      digitalWrite(LED_BUILTIN, LOW);
    } else {
      Serial.print("Error en la petición: ");
      Serial.println(httpResponseCode);
    }
    
    http.end();
  } else {
    Serial.println("WiFi desconectado");
  }
}

/*
 * INSTRUCCIONES DE USO:
 * 
 * 1. Instala las librerías necesarias en Arduino IDE:
 *    - WiFi (incluida con ESP32)
 *    - HTTPClient (incluida con ESP32)
 *    - ArduinoJson (buscar en Library Manager)
 * 
 * 2. Reemplaza las credenciales WiFi:
 *    - ssid: nombre de tu red WiFi
 *    - password: contraseña de tu red WiFi
 * 
 * 3. La URL del servidor ya está configurada correctamente
 * 
 * 4. Conecta tu sensor de postura (MPU6050, acelerómetro, etc.) al pin 2
 *    o modifica SENSOR_PIN según tu configuración
 * 
 * 5. Sube el código al ESP32
 * 
 * 6. Abre el Serial Monitor (115200 baud) para ver los logs
 * 
 * 7. Cada vez que se detecte mala postura, se enviará automáticamente
 *    al dashboard
 * 
 * NOTAS IMPORTANTES:
 * - El código incluye debounce de 2 segundos para evitar spam
 * - El LED integrado parpadeará cuando se envíe un evento
 * - Revisa el Serial Monitor para debugging
 * - La API key está incluida (anon key pública)
 */