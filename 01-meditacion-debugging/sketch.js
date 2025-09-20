"// --- OBRA 01: MEDITACIÓN COMO DEBUGGING MENTAL ---
// Estilo Visionario inspirado en Alex Grey.

let chakras = [];
let pensamientos = [];
let tiempo = 0;
let claridad = 0; // 0 = Caos mental, 1 = Silencio

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
  
  // Creamos los ""pensamientos parásitos"" o ""código malicioso""
  for (let i = 0; i < 150; i++) {
    pensamientos.push({
      x: width / 2 + random(-150, 150),
      y: height * 0.2 + random(-150, 150),
      vx: random(-2, 2),
      vy: random(-2, 2),
      tam: random(2, 8),
      ruidoOffset: random(1000)
    });
  }
  
  textAlign(CENTER, CENTER);
  textFont('serif');
}

function draw() {
  background(240, 30, 5);
  tiempo += 0.01;
  
  // El proceso de meditación: la claridad aumenta con el tiempo
  claridad = min(1.0, claridad + 0.0003);

  // 1. DIBUJAR AURA
  // El aura se vuelve más grande y serena con la claridad
  let auraTam = lerp(width * 0.3, width * 0.45, claridad);
  let auraColor = lerpColor(color(0, 80, 60, 10), color(180, 50, 100, 15), claridad);
  noFill();
  stroke(auraColor);
  strokeWeight(2);
  ellipse(width/2, height/2, auraTam);

  // 2. DIBUJAR FIGURA CENTRAL Y CHAKRAS
  dibujarFiguraCentral();

  // 3. DIBUJAR Y ACTUALIZAR PENSAMIENTOS
  actualizarPensamientos();

  // 4. DIBUJAR INTERFAZ
  mostrarInterfaz();
}


function dibujarFiguraCentral() {
  // Columna de energía se fortalece con la claridad
  strokeWeight(lerp(2, 5, claridad));
  stroke(0, 0, 100, lerp(40, 80, claridad));
  line(width / 2, height, width / 2, 0);

  // Los chakras se estabilizan y brillan más
  for (let i = 0; i < chakras.length; i++) {
    let c = chakras[i];
    let pulso = sin(tiempo * 3 - i) * lerp(10, 3, claridad); // El pulso se calma
    let tamActual = c.tam + pulso;
    let brillo = lerp(70, 100, claridad);
    let saturacion = lerp(70, 100, claridad);
    
    // Aura del chakra
    noStroke();
    fill(c.color, saturacion, brillo, 20);
    ellipse(width / 2, c.y, tamActual * 3);
    
    // Núcleo del chakra
    fill(c.color, saturacion, brillo, 100);
    ellipse(width / 2, c.y, tamActual);
  }
}

function actualizarPensamientos() {
  let cabezaY = height * 0.2; // Centro de la mente

  for (let p of pensamientos) {
    // El ruido (movimiento caótico) disminuye con la claridad
    let fuerzaRuido = lerp(1, 0.1, claridad);
    p.vx += map(noise(p.ruidoOffset + tiempo), 0, 1, -0.1, 0.1) * fuerzaRuido;
    p.vy += map(noise(p.ruidoOffset + 100 + tiempo), 0, 1, -0.1, 0.1) * fuerzaRuido;

    p.x += p.vx;
    p.y += p.vy;
    
    // Los pensamientos son atraídos hacia la mente para ser ""procesados""
    p.x = lerp(p.x, width/2, 0.005);
    p.y = lerp(p.y, cabezaY, 0.005);
    
    // El movimiento general se ralentiza
    p.vx *= 0.98;
    p.vy *= 0.98;
    
    // Se desvanecen con la claridad
    let opacidad = lerp(80, 0, claridad);
    
    // Dibujo del pensamiento (forma angular, como un 'glitch')
    strokeWeight(1.5);
    stroke(0, 80, 80, opacidad); // Color rojizo discordante
    noFill();
    push();
    translate(p.x, p.y);
    rotate(p.ruidoOffset + tiempo * 10);
    rect(0, 0, p.tam, p.tam);
    pop();
  }
}

function mostrarInterfaz() {
  let estadoTexto = claridad < 0.5 ? ""DEBUGGING MENTAL..."" : ""SILENCIO INTERIOR"";
  
  fill(0, 0, 0, 50);
  rectMode(CENTER);
  noStroke();
  rect(width / 2, height - 60, 650, 80, 10);

  fill(0, 0, 100);
  textSize(24);
  text(""MEDITACIÓN COMO DEBUGGING MENTAL"", width / 2, height - 80);
  
  textSize(18);
  text(""ESTADO: "" + estadoTexto, width / 2, height - 45);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 7; i++) {
    chakras[i].y = (height * 0.85) - (i * height * 0.1);
  }
}"
