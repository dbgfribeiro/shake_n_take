int tiltsensor = 10;
float shakes = 0;

void setup() {
  Serial.begin(9600);
  pinMode(tiltsensor, INPUT);
}

void loop() {
  // Se o sensor for movido, a variável 'shakes' é incrementada
  if (digitalRead(tiltsensor) == 1) {
    shakes += 0.5;
    Serial.println(shakes);
  }
  // Se o sensor for movido, a variável 'shakes' é incrementada
  else {
    shakes = 0;
  }
  delay(100);
}
