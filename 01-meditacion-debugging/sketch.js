let estado = 0;
let tiempoEstado;
let particulas = [];
let mensajes = [
  "IDENTIFICANDO ERRORES...",
  "DEPURANDO MENTE...", 
  "OPTIMIZANDO CONCIENCIA...",
  "PAZ INTERIOR COMPILADA"
];
let colores = [[255,50,50], [255,255,50], [50,255,150], [255,255,255]];

function setup() {
  createCanvas(windowWidth, windowHeight);
  tiempoEstado = millis();
  
  // Crear pocas partículas
  for (let i = 0; i < 20; i++) {
    particulas.push({
      x: random(width),
      y: random(height),
      angulo: random(TWO_PI),
      radio: random(50, 150),
      velocidad: random(0.01, 0.03)
    });
  }
}

function draw() {
  background(0, 20);
  
  // Cambiar estado cada 8 segundos
  if (millis() - tiempoEstado > 8000 && estado < 3) {
    estado++;
    tiempoEstado = millis();
  }
  
  // Núcleo central pulsante
  let [r, g, b] = colores[estado];
  let pulso = sin(frameCount * 0.1) * 30;
  
  // Aura
  fill(r, g, b, 30);
  noStroke();
  ellipse(width/2, height/2, 200 + pulso);
  
  // Núcleo
  fill(r, g, b, 150);
  stroke(r, g, b);
  strokeWeight(2);
  ellipse(width/2, height/2, 80 + pulso * 0.5);
  
  // Partículas orbitando (bucles de pensamiento)
  for (let p of particulas) {
    p.angulo += p.velocidad;
    let x = width/2 + cos(p.angulo) * p.radio;
    let y = height/2 + sin(p.angulo) * p.radio;
    
    // Se desvanecen en estados avanzados
    let alpha = estado < 2 ? 150 : 150 - (estado - 1) * 50;
    fill(r, g, b, alpha);
    noStroke();
    ellipse(x, y, 6);
    
    // Líneas conectoras
    if (alpha > 0) {
      stroke(r, g, b, alpha * 0.3);
      strokeWeight(1);
      line(width/2, height/2, x, y);
    }
  }
  
  // Mensaje del estado
  fill(255);
  textAlign(CENTER);
  textSize(20);
  text(mensajes[estado], width/2, height/2 + 150);
  
  // Progreso
  let progreso = (millis() - tiempoEstado) / 8000;
  progreso = constrain(progreso, 0, 1);
  
  fill(50);
  rect(width/2 - 100, height - 50, 200, 10);
  fill(r, g, b);
  rect(width/2 - 100, height - 50, 200 * progreso, 10);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}