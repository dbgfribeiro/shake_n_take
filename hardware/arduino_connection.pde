import processing.serial.*;
import processing.video.*;
Capture cam;
Serial myPort;  // Cria objeto da classe Serial

String val = "0"; // Data enviada através da porta

// Temperatura
float temp;
float minTemp = 40;
float maxTemp = 2;

void setup() {
  size(600, 800);

  // Iniciar a camera
  cam = new Capture(this, 1600, 800, 30);
  cam.start();

  // Conectar à porta
  String portName = Serial.list()[2];
  myPort = new Serial(this, portName, 9600);

  myPort.bufferUntil('\n');
  myPort.clear();
}

void draw() {
  /*--------CAMERA----------*/
  if (cam.available()) {
    cam.read();
  }
  translate(width/2, height/2);
  imageMode(CENTER);
  image(cam, 0, 0, 1600, 800);

  /*---------FILTER---------*/
  // Transformar a String enviada pela porta em Float
  float intVal = Float.parseFloat(val.trim());

  // Incremento ao filtro
  temp = minTemp - intVal;
  println(temp);

  if (temp >= maxTemp) {
    filter(POSTERIZE, temp);
  } else {
    filter(POSTERIZE, maxTemp);
  }
}

void serialEvent(Serial myPort) {
  // Lê a string recebida pela porta e guarda-a numa variável
  val = myPort.readStringUntil('\n');
  //println(val);
}
