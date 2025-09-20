let sombras = [];
let reflejos = [];
let tiempoInicio;
let fase = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  tiempoInicio = millis();
  
  // Crear sombras ocultas
  for (let i = 0; i < 15; i++) {
    sombras.push({
      x: random(width * 0.1, width * 0.4),
      y: random(height),
      tam: random(20, 60),
      opacidad: random(30, 80),
      velocidad: random(0.5, 1.5),
      tipo: floor(random(4))
    });
  }
  
  // Crear reflejos conscientes
  for (let i = 0; i < 15; i++) {
    reflejos.push({
      x: random(width * 0.6, width * 0.9),
      y: random(height),
      tam: random(20, 60),
      brillo: random(100, 200),
      velocidad: random(0.3, 1),
      tipo: floor(random(4))
    });
  }
}

function draw() {
  background(5, 5, 15);
  
  // Línea divisoria central (espejo)
  stroke(80, 80, 120, 100);
  strokeWeight(3);
  line(width/2, 0, width/2, height);
  
  // Efecto de espejo brillante
  for (let i = 0; i < 5; i++) {
    stroke(150, 150, 200, 20 - i * 3);
    strokeWeight(1);
    line(width/2 - i, 0, width/2 - i, height);
    line(width/2 + i, 0, width/2 + i, height);
  }
  
  // Actualizar fase cada 6 segundos
  if (millis() - tiempoInicio > 6000 && fase < 3) {
    fase++;
    tiempoInicio = millis();
  }
  
  // Mostrar sombras (lado izquierdo - inconsciente)
  push();
  for (let sombra of sombras) {
    sombra.y += sin(frameCount * 0.01 + sombra.x * 0.01) * sombra.velocidad;
    
    // Mantener en pantalla
    if (sombra.y > height + 50) sombra.y = -50;
    if (sombra.y < -50) sombra.y = height + 50;
    
    let alpha = sombra.opacidad * (fase < 2 ? 1 : 0.3);
    fill(20, 10, 30, alpha);
    noStroke();
    
    // Diferentes formas de sombra según tipo
    switch(sombra.tipo) {
      case 0: // Miedo circular
        ellipse(sombra.x, sombra.y, sombra.tam);
        break;
      case 1: // Ira angular
        rectMode(CENTER);
        rect(sombra.x, sombra.y, sombra.tam * 0.8, sombra.tam * 0.8);
        break;
      case 2: // Tristeza ondulante
        beginShape();
        for (let a = 0; a < TWO_PI; a += 0.2) {
          let r = sombra.tam * 0.5 + sin(a * 3 + frameCount * 0.05) * 5;
          let x = sombra.x + cos(a) * r;
          let y = sombra.y + sin(a) * r;
          vertex(x, y);
        }
        endShape(CLOSE);
        break;
      default: // Confusión irregular
        for (let j = 0; j < 6; j++) {
          let ang = j * PI/3 + frameCount * 0.02;
          let x = sombra.x + cos(ang) * sombra.tam * 0.3;
          let y = sombra.y + sin(ang) * sombra.tam * 0.3;
          ellipse(x, y, 8);
        }
    }
  }
  pop();
  
  // Mostrar reflejos (lado derecho - consciente)
  push();
  for (let reflejo of reflejos) {
    reflejo.y += sin(frameCount * 0.01 + reflejo.x * 0.01) * reflejo.velocidad;
    
    // Mantener en pantalla
    if (reflejo.y > height + 50) reflejo.y = -50;
    if (reflejo.y < -50) reflejo.y = height + 50;
    
    let intensidad = reflejo.brillo * (fase >= 1 ? 1 : 0.4);
    
    // Aura luminosa
    fill(100, 150, 255, intensidad * 0.2);
    noStroke();
    ellipse(reflejo.x, reflejo.y, reflejo.tam * 2);
    
    fill(200, 220, 255, intensidad);
    stroke(255, 255, 255, intensidad * 0.8);
    strokeWeight(1);
    
    // Diferentes formas conscientes según tipo
    switch(reflejo.tipo) {
      case 0: // Amor radiante
        for (let r = 0; r < 3; r++) {
          noFill();
          ellipse(reflejo.x, reflejo.y, reflejo.tam + r * 8);
        }
        break;
      case 1: // Sabiduría estructurada
        rectMode(CENTER);
        rect(reflejo.x, reflejo.y, reflejo.tam * 0.6, reflejo.tam * 0.6);
        line(reflejo.x - reflejo.tam * 0.4, reflejo.y, reflejo.x + reflejo.tam * 0.4, reflejo.y);
        line(reflejo.x, reflejo.y - reflejo.tam * 0.4, reflejo.x, reflejo.y + reflejo.tam * 0.4);
        break;
      case 2: // Compasión fluida
        noFill();
        beginShape();
        for (let a = 0; a < TWO_PI; a += 0.1) {
          let r = reflejo.tam * 0.4 + sin(a * 2 + frameCount * 0.03) * 8;
          let x = reflejo.x + cos(a) * r;
          let y = reflejo.y + sin(a) * r;
          vertex(x, y);
        }
        endShape(CLOSE);
        break;
      default: // Claridad estelar
        for (let j = 0; j < 8; j++) {
          let ang = j * PI/4;
          let x1 = reflejo.x + cos(ang) * reflejo.tam * 0.2;
          let y1 = reflejo.y + sin(ang) * reflejo.tam * 0.2;
          let x2 = reflejo.x + cos(ang) * reflejo.tam * 0.4;
          let y2 = reflejo.y + sin(ang) * reflejo.tam * 0.4;
          line(x1, y1, x2, y2);
        }
    }
  }
  pop();
  
  // Conexiones entre sombra y reflejo (integración)
  if (fase >= 2) {
    stroke(120, 80, 200, 60);
    strokeWeight(1);
    for (let i = 0; i < min(sombras.length, reflejos.length); i++) {
      let conexion = sin(frameCount * 0.02 + i) * 0.5 + 0.5;
      if (conexion > 0.3) {
        line(sombras[i].x, sombras[i].y, reflejos[i].x, reflejos[i].y);
      }
    }
  }
  
  // Texto informativo
  fill(200);
  textAlign(CENTER);
  textSize(16);
  let mensajes = [
    "EXPLORANDO ASPECTOS OCULTOS",
    "RECONOCIENDO PATRONES SOMBRA", 
    "INTEGRANDO POLARIDADES",
    "UNIDAD CONSCIENTE LOGRADA"
  ];
  text(mensajes[fase], width/2, height - 30);
  
  // Etiquetas laterales
  textAlign(LEFT);
  textSize(12);
  fill(150, 100, 200);
  text("SOMBRA\nINCONSCIENTE", 20, 40);
  
  textAlign(RIGHT);
  fill(200, 220, 255);
  text("REFLEJO\nCONSCIENTE", width - 20, 40);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}