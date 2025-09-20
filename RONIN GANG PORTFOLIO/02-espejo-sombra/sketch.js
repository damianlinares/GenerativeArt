let estadoActual = 0;
let tiempoInicioEstado;
let tiempoTransicion = 10000; // 10 segundos
let particulas = [];
let campoEnergia = [];
let nucleoIdentidad;
let nivelMetamorfosis = 0;
let momentoCritico = false;
let progresoTransformacion = 0;
let mensajesEstado = [
  "🌊 FLUIDO - Formas que flotan y fluyen",
  "💎 CRISTALINO - Geometría perfecta y precisa", 
  "☁ NEBULOSO - Etéreo y difuso",
  "🔺 GEOMÉTRICO SAGRADO - Patrones sagrados",
  "🌱 ORGÁNICO - Formas biológicas",
  "⚡ ENERGÉTICO - Rayos de poder puro",
  "🕳️ ABISAL - Profundidades oscuras",
  "✨ LUMINOSO - Explosión de luz brillante"
];
let coloresEstado = [
  [100, 180, 255],  // Azul fluido
  [200, 230, 255],  // Blanco cristalino
  [180, 180, 200],  // Gris nebuloso
  [255, 200, 100],  // Dorado sagrado
  [50, 200, 100],   // Verde orgánico
  [255, 100, 50],   // Naranja energético
  [50, 30, 80],     // Púrpura abisal
  [255, 255, 200]   // Amarillo luminoso
];
let efectosTransformacion = [];
let tiempoUltimoEfecto = 0;
let textoFilosofico = "";
let preguntasFilosoficas = [
  "¿Está tu identidad predeterminada?",
  "¿Qué hace que sigas siendo tú?",
  "¿El yo es una ilusión estable?",
  "¿Cambiar es morir y renacer?",
  "¿Quién observa el cambio de identidad?"
];
let indicePregunta = 0;

function setup() {
  createCanvas(1920, 1080);
  
  // Inicializar núcleo de identidad
  nucleoIdentidad = {
    x: width/2,
    y: height/2,
    radio: 80,
    energia: 100,
    rotacion: 0
  };
  
  // Crear partículas originales
  for (let i = 0; i < 300; i++) {
    particulas.push(new ParticulaIdentidad());
  }
  
  // Crear campo energético
  for (let i = 0; i < 200; i++) {
    campoEnergia.push(new PuntoEnergia());
  }
  
  tiempoInicioEstado = millis();
  
  // Inicializar primera pregunta filosófica
  textoFilosofico = preguntasFilosoficas[indicePregunta];
}

function draw() {
  // Verificar transición de estado
  let tiempoTranscurrido = millis() - tiempoInicioEstado;
  if (tiempoTranscurrido > tiempoTransicion && estadoActual < 7) {
    estadoActual++;
    tiempoInicioEstado = millis();
    nivelMetamorfosis++;
    
    // Cambiar pregunta filosófica cada 2 estados
    if (estadoActual % 2 === 0 && estadoActual > 0) {
      indicePregunta = (indicePregunta + 1) % preguntasFilosoficas.length;
      textoFilosofico = preguntasFilosoficas[indicePregunta];
    }
    
    // Momento crítico en 50%
    if (estadoActual === 3) {
      momentoCritico = true;
    } else {
      momentoCritico = false;
    }
  }
  
  // Calcular progreso de transformación
  progresoTransformacion = estadoActual / 7 + (tiempoTranscurrido / tiempoTransicion) / 7;
  progresoTransformacion = constrain(progresoTransformacion, 0, 1);
  
  // Dibujar fondo según estado
  dibujarFondoEstado();
  
  // Actualizar y mostrar elementos
  actualizarElementos();
  mostrarElementos();
  mostrarInterfaz();
  
  // Generar efectos de transformación
  generarEfectosTransformacion();
  mostrarEfectosTransformacion();
}

function dibujarFondoEstado() {
  // Degradado de fondo según estado
  let [r1, g1, b1] = coloresEstado[estadoActual];
  let [r2, g2, b2] = coloresEstado[(estadoActual + 1) % coloresEstado.length];
  
  // Interpolación suave entre estados
  let progreso = (millis() - tiempoInicioEstado) / tiempoTransicion;
  progreso = constrain(progreso, 0, 1);
  
  let r = lerp(r1, r2, progreso) * 0.1;
  let g = lerp(g1, g2, progreso) * 0.1;
  let b = lerp(b1, b2, progreso) * 0.15;
  
  // Fondo con degradado sutil
  for (let i = 0; i <= height; i++) {
    let inter = map(i, 0, height, 0, 1);
    let c = lerpColor(color(r*0.5, g*0.5, b*0.8), color(r, g, b), inter);
    stroke(c);
    line(0, i, width, i);
  }
}

function actualizarElementos() {
  // Actualizar partículas de identidad
  for (let particula of particulas) {
    particula.actualizar(estadoActual, progresoTransformacion);
  }
  
  // Actualizar campo energético
  for (let punto of campoEnergia) {
    punto.actualizar(estadoActual, progresoTransformacion);
  }
  
  // Actualizar núcleo de identidad
  nucleoIdentidad.rotacion += 0.01;
  nucleoIdentidad.energia = map(progresoTransformacion, 0, 1, 100, 30);
  
  // Actualizar efectos de transformación
  for (let i = efectosTransformacion.length - 1; i >= 0; i--) {
    efectosTransformacion[i].actualizar();
    if (efectosTransformacion[i].vida <= 0) {
      efectosTransformacion.splice(i, 1);
    }
  }
}

function mostrarElementos() {
  // Mostrar campo energético
  for (let punto of campoEnergia) {
    punto.mostrar();
  }
  
  // Mostrar núcleo de identidad
  mostrarNucleoIdentidad();
  
  // Mostrar partículas de identidad
  for (let particula of particulas) {
    particula.mostrar();
  }
}

function mostrarNucleoIdentidad() {
  push();
  translate(nucleoIdentidad.x, nucleoIdentidad.y);
  rotate(nucleoIdentidad.rotacion);
  
  let [r, g, b] = coloresEstado[estadoActual];
  
  // Aura del núcleo
  for (let i = 0; i < 3; i++) {
    let tam = nucleoIdentidad.radio * (2 + i * 0.5);
    let alpha = 30 - i * 10;
    fill(r, g, b, alpha);
    noStroke();
    ellipse(0, 0, tam);
  }
  
  // Núcleo principal con forma según estado
  switch(estadoActual) {
    case 0: // Fluido - círculo ondulado
      stroke(r, g, b, 200);
      strokeWeight(3);
      noFill();
      beginShape();
      for (let i = 0; i <= 36; i++) {
        let ang = map(i, 0, 36, 0, TWO_PI);
        let radio = nucleoIdentidad.radio + sin(ang * 4 + frameCount * 0.1) * 10;
        let x = cos(ang) * radio;
        let y = sin(ang) * radio;
        vertex(x, y);
      }
      endShape(CLOSE);
      break;
      
    case 1: // Cristalino - hexágono perfecto
      stroke(r, g, b, 220);
      strokeWeight(4);
      noFill();
      beginShape();
      for (let i = 0; i < 6; i++) {
        let ang = map(i, 0, 6, 0, TWO_PI);
        let x = cos(ang) * nucleoIdentidad.radio;
        let y = sin(ang) * nucleoIdentidad.radio;
        vertex(x, y);
      }
      endShape(CLOSE);
      break;
      
    case 2: // Nebuloso - forma difusa
      noStroke();
      for (let i = 0; i < 5; i++) {
        let tam = nucleoIdentidad.radio * (1 + i * 0.3);
        let alpha = 80 - i * 15;
        fill(r, g, b, alpha);
        ellipse(0, 0, tam);
      }
      break;
      
    case 3: // Geométrico sagrado - flor de la vida
      stroke(r, g, b, 180);
      strokeWeight(2);
      noFill();
      let radioFlor = nucleoIdentidad.radio * 0.5;
      for (let i = 0; i < 6; i++) {
        let ang = map(i, 0, 6, 0, TWO_PI);
        let x = cos(ang) * radioFlor;
        let y = sin(ang) * radioFlor;
        ellipse(x, y, radioFlor * 2);
      }
      ellipse(0, 0, radioFlor * 2);
      break;
      
    case 4: // Orgánico - forma celular
      noStroke();
      fill(r, g, b, 150);
      ellipse(0, 0, nucleoIdentidad.radio * 1.5);
      // Núcleo celular
      fill(255, 200);
      ellipse(0, 0, nucleoIdentidad.radio * 0.6);
      break;
      
    case 5: // Energético - rayos
      stroke(r, g, b, 200);
      strokeWeight(3);
      for (let i = 0; i < 8; i++) {
        let ang = map(i, 0, 8, 0, TWO_PI);
        let x1 = cos(ang) * nucleoIdentidad.radio * 0.5;
        let y1 = sin(ang) * nucleoIdentidad.radio * 0.5;
        let x2 = cos(ang) * nucleoIdentidad.radio * 1.5;
        let y2 = sin(ang) * nucleoIdentidad.radio * 1.5;
        line(x1, y1, x2, y2);
      }
      fill(r, g, b, 200);
      ellipse(0, 0, nucleoIdentidad.radio);
      break;
      
    case 6: // Abisal - forma oscura
      noStroke();
      for (let i = 0; i < 4; i++) {
        let tam = nucleoIdentidad.radio * (1.5 - i * 0.2);
        let alpha = 100 - i * 20;
        fill(255 - r, 255 - g, 255 - b, alpha);
        ellipse(0, 0, tam);
      }
      break;
      
    case 7: // Luminoso - explosión de luz
      noStroke();
      for (let i = 0; i < 6; i++) {
        let tam = nucleoIdentidad.radio * (2 + i * 0.8);
        let alpha = 60 - i * 10;
        fill(r, g, b, alpha);
        ellipse(0, 0, tam);
      }
      // Rayos de luz
      stroke(r, g, b, 150);
      strokeWeight(2);
      for (let i = 0; i < 12; i++) {
        let ang = map(i, 0, 12, 0, TWO_PI);
        let x1 = cos(ang) * nucleoIdentidad.radio;
        let y1 = sin(ang) * nucleoIdentidad.radio;
        let x2 = cos(ang) * nucleoIdentidad.radio * 3;
        let y2 = sin(ang) * nucleoIdentidad.radio * 3;
        line(x1, y1, x2, y2);
      }
      break;
  }
  
  pop();
}

function mostrarInterfaz() {
  // Barra de progreso
  let progreso = (millis() - tiempoInicioEstado) / tiempoTransicion;
  progreso = constrain(progreso, 0, 1);
  
  push();
  rectMode(CORNER);
  noStroke();
  
  // Barra de progreso principal
  fill(30, 30, 50, 200);
  rect(50, 50, width - 100, 30, 15);
  
  let [r, g, b] = coloresEstado[estadoActual];
  fill(r, g, b, 220);
  rect(50, 50, (width - 100) * progresoTransformacion, 30, 15);
  
  // Borde de barra
  stroke(255, 120);
  strokeWeight(1);
  noFill();
  rect(50, 50, width - 100, 30, 15);
  
  // Texto del estado actual
  fill(255);
  textAlign(LEFT);
  textSize(20);
  textFont('monospace');
  text(mensajesEstado[estadoActual], 50, 40);
  
  // Nivel de metamorfosis
  textAlign(RIGHT);
  textSize(18);
  text(`NIVEL METAMORFOSIS: ${nivelMetamorfosis}`, width - 50, 40);
  
  // Contador regresivo
  let tiempoRestante = tiempoTransicion - (millis() - tiempoInicioEstado);
  tiempoRestante = max(0, tiempoRestante);
  let segundos = floor(tiempoRestante / 1000);
  let decimas = floor((tiempoRestante % 1000) / 100);
  
  textAlign(CENTER);
  textSize(18);
  fill(220, 220, 255);
  text(`SIGUIENTE ESTADO: ${segundos}.${decimas}s`, width/2, height - 60);
  
  // Porcentaje de transformación
  let porcentaje = floor(progresoTransformacion * 100);
  textSize(16);
  fill(200);
  text(`TRANSFORMACIÓN: ${porcentaje}%`, width/2, height - 90);
  
  // Pregunta filosófica
  if (textoFilosofico) {
    textAlign(CENTER);
    textSize(24);
    fill(255, 200);
    text(textoFilosofico, width/2, height - 140);
  }
  
  // Indicador de momento crítico
  if (momentoCritico) {
    textSize(28);
    fill(255, 100, 100);
    text("⚠ MOMENTO CRÍTICO - 50% TRANSFORMACIÓN", width/2, 120);
    
    // Efecto de pulso
    let pulso = sin(frameCount * 0.2) * 20 + 20;
    noFill();
    stroke(255, 100, 100, 150);
    strokeWeight(3);
    ellipse(width/2, 120, 400 + pulso, 60);
  }
  
  pop();
}

function generarEfectosTransformacion() {
  // Generar efectos según el estado y tiempo
  let frecuenciaEfecto = map(estadoActual, 0, 7, 200, 80);
  
  if (millis() - tiempoUltimoEfecto > frecuenciaEfecto) {
    let cantidadEfectos = map(estadoActual, 0, 7, 3, 8);
    
    for (let i = 0; i < cantidadEfectos; i++) {
      efectosTransformacion.push(new EfectoTransformacion());
    }
    
    tiempoUltimoEfecto = millis();
  }
}

function mostrarEfectosTransformacion() {
  for (let efecto of efectosTransformacion) {
    efecto.mostrar();
  }
}

// Clase para partículas de identidad
class ParticulaIdentidad {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.vx = random(-2, 2);
    this.vy = random(-2, 2);
    this.tam = random(5, 15);
    this.vida = 255;
    this.tipoOriginal = floor(random(6));
    this.tipoActual = this.tipoOriginal;
    this.rotacion = 0;
    this.id = random(1000);
  }
  
  actualizar(estado, progreso) {
    // Movimiento básico
    this.x += this.vx;
    this.y += this.vy;
    this.rotacion += 0.05;
    
    // Rebote en bordes
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
    
    // Transformación progresiva según estado
    this.transformarForma(estado, progreso);
    
    // Variación de vida según progreso
    this.vida = 255 * (1 - progreso * 0.7);
  }
  
  transformarForma(estado, progreso) {
    // Calcular tipo de transformación según estado
    this.tipoActual = estado;
  }
  
  mostrar() {
    let [r, g, b] = coloresEstado[this.tipoActual];
    let alpha = this.vida;
    
    push();
    translate(this.x, this.y);
    rotate(this.rotacion);
    
    // Dibujar forma según tipo actual
    fill(r, g, b, alpha * 0.7);
    stroke(r, g, b, alpha);
    strokeWeight(1);
    
    switch(this.tipoActual) {
      case 0: // Fluido - círculo ondulado
        beginShape();
        for (let i = 0; i <= 20; i++) {
          let ang = map(i, 0, 20, 0, TWO_PI);
          let radio = this.tam + sin(ang * 4 + this.id + frameCount * 0.05) * 3;
          let x = cos(ang) * radio;
          let y = sin(ang) * radio;
          vertex(x, y);
        }
        endShape(CLOSE);
        break;
      case 1: // Cristalino - hexágono
        beginShape();
        for (let i = 0; i < 6; i++) {
          let ang = map(i, 0, 6, 0, TWO_PI);
          let x = cos(ang) * this.tam;
          let y = sin(ang) * this.tam;
          vertex(x, y);
        }
        endShape(CLOSE);
        break;
      case 2: // Nebuloso - forma difusa
        for (let i = 0; i < 3; i++) {
          let tam = this.tam * (1 + i * 0.3);
          let alphaLocal = alpha * (0.7 - i * 0.2);
          fill(r, g, b, alphaLocal);
          ellipse(0, 0, tam);
        }
        break;
      case 3: // Geométrico sagrado - triángulo
        beginShape();
        for (let i = 0; i < 3; i++) {
          let ang = map(i, 0, 3, 0, TWO_PI);
          let x = cos(ang) * this.tam;
          let y = sin(ang) * this.tam;
          vertex(x, y);
        }
        endShape(CLOSE);
        break;
      case 4: // Orgánico - forma orgánica
        beginShape();
        for (let i = 0; i < 12; i++) {
          let ang = map(i, 0, 12, 0, TWO_PI);
          let radio = this.tam + sin(ang * 5 + this.id) * this.tam * 0.3;
          let x = cos(ang) * radio;
          let y = sin(ang) * radio;
          vertex(x, y);
        }
        endShape(CLOSE);
        break;
      case 5: // Energético - línea
        line(-this.tam, -this.tam, this.tam, this.tam);
        line(this.tam, -this.tam, -this.tam, this.tam);
        break;
      case 6: // Abisal - forma oscura
        fill(255 - r, 255 - g, 255 - b, alpha * 0.8);
        ellipse(0, 0, this.tam * 1.5);
        break;
      case 7: // Luminoso - estrella
        beginShape();
        for (let i = 0; i < 8; i++) {
          let ang = map(i, 0, 8, 0, TWO_PI);
          let radio = (i % 2 === 0) ? this.tam : this.tam * 0.5;
          let x = cos(ang) * radio;
          let y = sin(ang) * radio;
          vertex(x, y);
        }
        endShape(CLOSE);
        break;
    }
    
    pop();
  }
}

// Clase para puntos del campo energético
class PuntoEnergia {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.tam = random(1, 4);
    this.vida = random(100, 255);
    this.vx = random(-0.5, 0.5);
    this.vy = random(-0.5, 0.5);
    this.frecuencia = random(0.01, 0.05);
    this.offset = random(1000);
  }
  
  actualizar(estado, progreso) {
    // Movimiento sutil
    this.x += this.vx;
    this.y += this.vy;
    
    // Vibración según estado
    this.x += sin(frameCount * this.frecuencia + this.offset) * 0.5;
    this.y += cos(frameCount * this.frecuencia + this.offset) * 0.5;
    
    // Rebote en bordes
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
    
    // Variación de vida según progreso
    this.vida = 200 + sin(frameCount * 0.02 + this.offset) * 55;
  }
  
  mostrar() {
    let [r, g, b] = coloresEstado[estadoActual];
    let alpha = this.vida;
    
    // Tamaño pulsante
    let tamPulsante = this.tam + sin(frameCount * 0.1 + this.offset) * 1;
    
    fill(r, g, b, alpha);
    noStroke();
    ellipse(this.x, this.y, tamPulsante);
  }
}

// Clase para efectos de transformación
class EfectoTransformacion {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.vx = random(-3, 3);
    this.vy = random(-3, 3);
    this.tam = random(3, 10);
    this.vida = 255;
    this.tipo = floor(random(4));
    this.rotacion = 0;
  }
  
  actualizar() {
    this.x += this.vx;
    this.y += this.vy;
    this.rotacion += 0.1;
    this.vida -= 8;
  }
  
  mostrar() {
    let [r, g, b] = coloresEstado[estadoActual];
    let alpha = this.vida;
    
    push();
    translate(this.x, this.y);
    rotate(this.rotacion);
    
    stroke(r, g, b, alpha);
    noFill();
    
    switch(this.tipo) {
      case 0: // Círculo de transformación
        strokeWeight(2);
        ellipse(0, 0, this.tam * 2);
        break;
      case 1: // Línea de energía
        strokeWeight(3);
        line(-this.tam, -this.tam, this.tam, this.tam);
        break;
      case 2: // Triángulo de cambio
        strokeWeight(2);
        triangle(0, -this.tam, -this.tam, this.tam, this.tam, this.tam);
        break;
      case 3: // Estrella de metamorfosis
        strokeWeight(1);
        beginShape();
        for (let i = 0; i < 5; i++) {
          let ang = map(i, 0, 5, 0, TWO_PI);
          let radio = (i % 2 === 0) ? this.tam : this.tam * 0.5;
          let x = cos(ang) * radio;
          let y = sin(ang) * radio;
          vertex(x, y);
        }
        endShape(CLOSE);
        break;
    }
    
    pop();
  }
}