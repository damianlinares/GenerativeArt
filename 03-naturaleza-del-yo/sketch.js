let fragmentos = [];
let nucleoYo;
let ondas = [];
let tiempo = 0;
let modoFluidez = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Núcleo central del yo
  nucleoYo = {
    x: width/2,
    y: height/2,
    radioBase: 40,
    estabilidad: 1.0,
    fragmentacion: 0
  };
  
  // Fragmentos de identidad
  for (let i = 0; i < 12; i++) {
    let angulo = (i / 12) * TWO_PI;
    fragmentos.push({
      x: width/2 + cos(angulo) * 100,
      y: height/2 + sin(angulo) * 100,
      anguloOriginal: angulo,
      distanciaBase: 100,
      tamaño: random(15, 25),
      tipo: i % 4, // 4 tipos de fragmentos identitarios
      deriva: random(-0.01, 0.01),
      fase: random(TWO_PI),
      conectado: true
    });
  }
  
  // Ondas de transformación
  for (let i = 0; i < 6; i++) {
    ondas.push({
      radio: 0,
      maxRadio: random(200, 400),
      velocidad: random(0.5, 1.5),
      grosor: random(1, 3),
      opacidad: random(100, 200)
    });
  }
}

function draw() {
  background(8, 12, 25);
  tiempo += 0.01;
  
  // Evolución temporal de la fluidez
  if (frameCount % 600 === 0) { // Cada 10 segundos
    modoFluidez = !modoFluidez;
    nucleoYo.estabilidad = modoFluidez ? 0.3 : 1.0;
  }
  
  // Actualizar núcleo del yo
  nucleoYo.fragmentacion = sin(tiempo * 2) * 0.3 + 0.7;
  let radioActual = nucleoYo.radioBase * nucleoYo.fragmentacion * nucleoYo.estabilidad;
  
  // Ondas expansivas de transformación
  for (let onda of ondas) {
    onda.radio += onda.velocidad;
    if (onda.radio > onda.maxRadio) {
      onda.radio = 0;
    }
    
    // Dibujar onda
    stroke(100, 150, 255, onda.opacidad * (1 - onda.radio/onda.maxRadio));
    strokeWeight(onda.grosor);
    noFill();
    ellipse(nucleoYo.x, nucleoYo.y, onda.radio * 2);
  }
  
  // Conexiones entre fragmentos y núcleo
  stroke(80, 120, 200, 60);
  strokeWeight(1);
  for (let fragmento of fragmentos) {
    if (fragmento.conectado || !modoFluidez) {
      let alpha = modoFluidez ? 30 : 80;
      stroke(80, 120, 200, alpha);
      line(nucleoYo.x, nucleoYo.y, fragmento.x, fragmento.y);
    }
  }
  
  // Actualizar y dibujar fragmentos de identidad
  for (let i = 0; i < fragmentos.length; i++) {
    let fragmento = fragmentos[i];
    
    // Movimiento orbital con deriva
    fragmento.anguloOriginal += 0.005 + fragmento.deriva;
    fragmento.fase += 0.02;
    
    // Distancia fluctuante del núcleo
    let fluctuacion = sin(fragmento.fase) * 30;
    let distancia = fragmento.distanciaBase + fluctuacion;
    
    if (modoFluidez) {
      // En modo fluidez, fragmentos se dispersan
      distancia *= 1.5 + sin(tiempo + i) * 0.5;
      fragmento.conectado = random() > 0.3;
    } else {
      fragmento.conectado = true;
    }
    
    fragmento.x = nucleoYo.x + cos(fragmento.anguloOriginal) * distancia;
    fragmento.y = nucleoYo.y + sin(fragmento.anguloOriginal) * distancia;
    
    // Dibujar fragmento según tipo
    let intensidad = modoFluidez ? 150 : 200;
    
    switch(fragmento.tipo) {
      case 0: // Memoria (círculos concéntricos)
        fill(255, 150, 100, intensidad);
        noStroke();
        ellipse(fragmento.x, fragmento.y, fragmento.tamaño);
        fill(255, 200, 150, intensidad * 0.6);
        ellipse(fragmento.x, fragmento.y, fragmento.tamaño * 0.6);
        break;
        
      case 1: // Personalidad (formas angulares)
        fill(150, 255, 150, intensidad);
        noStroke();
        rectMode(CENTER);
        push();
        translate(fragmento.x, fragmento.y);
        rotate(fragmento.fase);
        rect(0, 0, fragmento.tamaño, fragmento.tamaño);
        pop();
        break;
        
      case 2: // Emociones (formas fluidas)
        fill(255, 150, 255, intensidad);
        noStroke();
        beginShape();
        for (let a = 0; a < TWO_PI; a += PI/6) {
          let r = fragmento.tamaño * 0.5 + sin(a * 3 + fragmento.fase) * 5;
          let x = fragmento.x + cos(a) * r;
          let y = fragmento.y + sin(a) * r;
          vertex(x, y);
        }
        endShape(CLOSE);
        break;
        
      default: // Creencias (estrellas)
        fill(150, 200, 255, intensidad);
        noStroke();
        push();
        translate(fragmento.x, fragmento.y);
        rotate(fragmento.fase * 0.5);
        for (let j = 0; j < 6; j++) {
          let ang = j * PI/3;
          let x1 = cos(ang) * fragmento.tamaño * 0.3;
          let y1 = sin(ang) * fragmento.tamaño * 0.3;
          let x2 = cos(ang) * fragmento.tamaño * 0.6;
          let y2 = sin(ang) * fragmento.tamaño * 0.6;
          strokeWeight(3);
          stroke(150, 200, 255, intensidad);
          line(x1, y1, x2, y2);
        }
        pop();
    }
  }
  
  // Dibujar núcleo central del yo
  push();
  translate(nucleoYo.x, nucleoYo.y);
  
  // Aura exterior
  fill(255, 255, 100, 40);
  noStroke();
  ellipse(0, 0, radioActual * 4);
  
  // Anillos internos
  for (let r = 3; r > 0; r--) {
    let alpha = 100 + r * 30;
    fill(255, 255, 150, alpha);
    ellipse(0, 0, radioActual * r * 0.8);
  }
  
  // Núcleo brillante
  fill(255, 255, 200, 200);
  ellipse(0, 0, radioActual);
  
  // Patrones internos según estabilidad
  if (nucleoYo.estabilidad < 0.7) {
    stroke(255, 100, 100, 150);
    strokeWeight(2);
    noFill();
    for (let i = 0; i < 8; i++) {
      let ang = i * PI/4 + tiempo * 2;
      let r1 = radioActual * 0.3;
      let r2 = radioActual * 0.7;
      line(cos(ang) * r1, sin(ang) * r1, cos(ang) * r2, sin(ang) * r2);
    }
  }
  
  pop();
  
  // Partículas de transformación
  if (modoFluidez) {
    fill(255, 255, 255, 100);
    noStroke();
    for (let i = 0; i < 20; i++) {
      let x = width/2 + cos(tiempo * 3 + i * 0.5) * 200;
      let y = height/2 + sin(tiempo * 2 + i * 0.3) * 150;
      ellipse(x, y, 3);
    }
  }
  
  // Interfaz informativa
  fill(200);
  textAlign(CENTER);
  textSize(18);
  let estado = modoFluidez ? "IDENTIDAD EN FLUJO" : "IDENTIDAD ESTABLE";
  text(estado, width/2, height - 60);
  
  textSize(12);
  fill(150);
  text("La naturaleza del yo se transforma constantemente", width/2, height - 30);
  
  // Leyenda de fragmentos
  textAlign(LEFT);
  textSize(10);
  fill(255, 150, 100); text("● MEMORIAS", 20, height - 100);
  fill(150, 255, 150); text("● PERSONALIDAD", 20, height - 80);
  fill(255, 150, 255); text("● EMOCIONES", 20, height - 60);
  fill(150, 200, 255); text("● CREENCIAS", 20, height - 40);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}