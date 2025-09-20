// --- OBRA 02: EL ESPEJO DE SOMBRA INTERACTIVO ---
// Estilo Visionario. (VERSIÓN DEPURADA)

let chakras = [];
let sombra;
let tiempo = 0;
let integracion = 0; // 0 = Separación total, 1 = Integración máxima

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  
  // Definimos los 7 chakras
  let coloresChakra = [0, 30, 60, 120, 210, 240, 275];
  for (let i = 0; i < 7; i++) {
    chakras.push({
      y: (height * 0.85) - (i * height * 0.1),
      color: coloresChakra[i],
      tam: 20
    });
  }
  
  // Creamos la figura de la Sombra con puntos fluidos
  sombra = {
    puntos: [],
    x: width / 2,
    y: height / 2,
    radio: height * 0.4
  };
  for (let i = 0; i < 100; i++) {
    sombra.puntos.push({
      angulo: map(i, 0, 100, 0, TWO_PI),
      distancia: random(sombra.radio * 0.8, sombra.radio),
      ruidoOffset: random(1000)
    });
  }
  
  textAlign(CENTER, CENTER);
  textFont('serif');
}

function draw() {
  background(240, 50, 4); // Un azul más oscuro, casi negro
  tiempo += 0.01;
  
  // La integración aumenta cuanto más cerca está el ratón del centro de la sombra
  let distanciaMouse = dist(mouseX, mouseY, sombra.x, sombra.y);
  // <<-- ARREGLO AQUÍ -->>
  let distanciaMaxima = width / 2; // Se cambió "maxDist" por "distanciaMaxima"
  integracion = map(distanciaMouse, distanciaMaxima, 50, 0, 1, true); // Y se actualizó aquí también

  // 1. DIBUJAR AURA
  dibujarAura();

  // 2. DIBUJAR SOMBRA
  dibujarSombra();

  // 3. DIBUJAR FIGURA CENTRAL Y CHAKRAS
  dibujarFiguraCentral();
  
  // 4. DIBUJAR CONEXIÓN (La integración)
  dibujarConexion();

  // 5. DIBUJAR INTERFAZ
  mostrarInterfaz();
}


function dibujarAura() {
  let auraTam = width * 0.4 + integracion * 100;
  let auraColor = lerpColor(color(255, 10), color(300, 80, 50, 20), integracion);
  
  noFill();
  stroke(auraColor);
  strokeWeight(2);
  beginShape();
  for (let a = 0; a < TWO_PI; a += 0.1) {
    let r = auraTam + map(noise(cos(a) + tiempo, sin(a) + tiempo), 0, 1, -50, 50);
    let x = width / 2 + cos(a) * (r * 0.3); // Aura más vertical
    let y = height / 2 + sin(a) * r;
    curveVertex(x, y);
  }
  endShape(CLOSE);
}

function dibujarSombra() {
  push();
  translate(sombra.x, sombra.y);
  noStroke();
  
  // El cuerpo oscuro y fluido de la sombra
  fill(240, 30, 2, 80); // Negro casi transparente
  beginShape();
  for (let p of sombra.puntos) {
    let ruido = noise(p.ruidoOffset + tiempo * 0.5);
    let d = p.distancia + map(ruido, 0, 1, -40, 40);
    let x = cos(p.angulo) * d;
    let y = sin(p.angulo) * d;
    curveVertex(x, y);
  }
  endShape(CLOSE);
  
  // Patrones internos que se revelan con la integración
  if (integracion > 0.1) {
    for (let p of sombra.puntos) {
      if (p.angulo % 0.5 < 0.05) { // Algunos puntos brillan
        let x = cos(p.angulo) * p.distancia;
        let y = sin(p.angulo) * p.distancia;
        fill(275, 100, 100, integracion * 80); // Chispas violetas
        ellipse(x, y, 5, 5);
      }
    }
  }
  pop();
}


function dibujarFiguraCentral() {
  let figuraX = width / 2;
  
  // La columna de luz se intensifica con la integración
  strokeWeight(3 + integracion * 4);
  stroke(0, 0, 100, 50 + integracion * 50);
  line(figuraX, 0, figuraX, height);

  for (let i = 0; i < chakras.length; i++) {
    let c = chakras[i];
    let pulso = sin(tiempo * 5 - i) * 5;
    // Los chakras laten más fuerte durante la integración
    let tamActual = c.tam + pulso + integracion * 15;
    
    noStroke();
    fill(c.color, 90, 90, 30 + integracion * 50);
    ellipse(figuraX, c.y, tamActual * 3);
    fill(c.color, 90, 90, 100);
    ellipse(figuraX, c.y, tamActual);
  }
}

function dibujarConexion() {
  if (integracion > 0.1) {
    // Zarcillos de luz que conectan el Yo con la Sombra
    for (let c of chakras) {
      let sombraY = random(height * 0.2, height * 0.8);
      stroke(c.color, 80, 100, integracion * 40);
      strokeWeight(1.5);
      line(width / 2, c.y, sombra.x, sombraY);
    }
  }
}


function mostrarInterfaz() {
  let estadoTexto = integracion < 0.7 ? "CONFRONTACIÓN" : "INTEGRACIÓN";
  
  fill(0, 0, 0, 50);
  rectMode(CENTER);
  noStroke();
  rect(width / 2, height - 60, 650, 80, 10);

  fill(0, 0, 100);
  textSize(24);
  text("EL ESPEJO DE SOMBRA INTERACTIVO", width / 2, height - 80);
  
  textSize(18);
  text("ESTADO: " + estadoTexto, width / 2, height - 45);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  sombra.x = width/2;
  sombra.y = height/2;
  sombra.radio = height * 0.4;
  for (let i = 0; i < 7; i++) {
    chakras[i].y = (height * 0.85) - (i * height * 0.1);
  }
}
