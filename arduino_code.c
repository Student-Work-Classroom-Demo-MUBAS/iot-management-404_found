#include "DHT.h"
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>


// Define the GPIO pin where the DHT11 data pin is connected
#define DHTPIN 4  // You can change this to any digital pin

#define mq3Pin 8
// Define the type of DHT sensor
#define DHTTYPE DHT11



// Initialize the DHT sensor
DHT dht(4, DHTTYPE);
const char* ssid = "iPhone 13";
const char* password = "fyabupim";
const char* serverUrl = "http://172.20.10.4:3000/api/sensor"; 

// Assign unique IDs to each sensor
const char* dhtId = "sensor-dht-001";
const char* airQualityId = "sensor-air-002";


void setup() {

  Serial.begin(115200);
  dht.begin();
  Serial.println("DHT11 sensor reading started...");
  pinMode(7, INPUT);
  pinMode(8, INPUT);


  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("WiFi connected");

  // HTTPClient http;
  // http.begin("http://your-server-ip/api/sensor"); // Nginx will proxy this
  // http.addHeader("Content-Type", "application/json");

  // String payload = "{\"temperature\": 25.3}";
  // int httpResponseCode = http.POST(payload);
  // http.end();
  

}

void loop() {
  // Wait a few seconds between measurements
  delay(5000);

  // Read humidity and temperature
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature(); // Celsius by default

  // Check if any reads failed
  if (isnan(humidity) || isnan(temperature)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  // Print the results
  Serial.print("Humidity: ");
  Serial.print(humidity);
  Serial.print(" %\t");
  Serial.print("Temperature: ");
  Serial.print(temperature);
  Serial.println(" °C");

  int mq3Value = digitalRead(7);
  
  // Convert raw ADC value into voltage
  float voltage = mq3Value * (3.3 / 4095.0);

  Serial.print("MQ-3 Raw Value: ");
  Serial.print(mq3Value);
  Serial.print(" | Voltage: ");
  Serial.print(voltage);
  Serial.println(" V");

  if (mq3Value > 2000) {
    Serial.println("⚠️ High Gas/Alcohol Detected!");
  } else {
    Serial.println("✅ Normal Air Quality");
  }

  int value = analogRead(8);

  Serial.print("Analog reading: ");
  Serial.print(value); 



  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
      http.begin(serverUrl);
      http.addHeader("Content-Type", "application/json");
      long timestamp = millis();


    //   Replace with your actual sensor data
    String payload = "{";
    payload += "\"reading_value\": " + String(temperature) + ",";
    payload += "\"sensor_id\": \"temperature-sensor-001\",";
    payload += "\"timestamp\": " + String(timestamp);
    payload += "}";

      int httpResponseCode = http.POST(payload);
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);

    // Replace with your actual sensor data
    // http.end();

    // HTTPClient http2;
    //   http2.begin(serverUrl);
    //   http2.addHeader("Content-Type", "application/json");
    payload = "{";
    payload += "\"reading_value\": " + String(humidity) + ",";
    payload += "\"sensor_id\": \"humidity-sensor-002\",";
    payload += "\"timestamp\": " + String(timestamp);
    payload += "}";

//  String payload2 = "{";
//       payload2 += "\"humidity\": " + String(humidity) + ",";
//       payload2 += "\"deviceId\": \"humidity-sensor-002\",";
//       payload2 += "\"timestamp\": " + (timestamp) ;
//       payload2 += "}";
      
      httpResponseCode = http.POST(payload);
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);


      payload = "{";
    payload += "\"reading_value\": " + String(mq3Value) + ",";
    payload += "\"sensor_id\": \"AirQuality-sensor-002\",";
    payload += "\"timestamp\": " + String(timestamp);
    payload += "}";

//  String payload2 = "{";
//       payload2 += "\"humidity\": " + String(humidity) + ",";
//       payload2 += "\"deviceId\": \"humidity-sensor-002\",";
//       payload2 += "\"timestamp\": " + (timestamp) ;
//       payload2 += "}";
      
      httpResponseCode = http.POST(payload);
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
      http.end();


      

      
    // Serial.println("--------------");
  //   HTTPClient http;
  //   http.begin(serverUrl);
  //   http.addHeader("Content-Type", "application/json");

  //   // Replace with your actual sensor data
  //   StaticJsonDocument<256> doc;
  //   doc["timestamp"] = millis();

  // JsonArray sensors = doc.createNestedArray("sensors");

  // JsonObject dhtSensor = sensors.createNestedObject();
  // dhtSensor["id"] = dhtId;
  // dhtSensor["type"] = "DHT22";
  // dhtSensor["temperature"] = temperature;
  // dhtSensor["humidity"] = humidity;

  // JsonObject airSensor = sensors.createNestedObject();
  // airSensor["id"] = airQualityId;
  // airSensor["type"] = "MQ135";
  // airSensor["air_quality"] = mq3Value;

  // String payload;
  // serializeJson(doc, payload);

  // int httpResponseCode = http.POST(payload);
  // Serial.println(httpResponseCode);
  // http.end();
  

  } else {
    Serial.println("WiFi not connected");
    WiFi.begin(ssid, password);
  }

}
