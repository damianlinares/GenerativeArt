let dimensionActual = 0;
let tiempoInicioDimension;
let tiempoTransicion = 6000; // 6 segundos por dimensión
let nodosConciencia = [];
let espectroTotal = [];
let profundidadEspiritual = 0;
let mensajesDimension = [
  "🌀 OBSERVADOR - Conciencia pura e inmutable",
  "💻 CÓDIGO - Programa que se ejecuta",
  "🧠 MÁQUINA - Hardware físico (cerebro)",
  "👁️ INTERFAZ - Percepción de la realidad",
  "✨ EMERGENTE - Fenómeno que surge del sistema",
  "🕉️ BUDISTA - No-yo (anatta) e impermanencia",
  "🔬 NEUROCIENCIA - Actividad cerebral medida",
  "🔗 CONVERGENCIA - Unificación de perspectivas",
  "🌿 FRACTAL - Auto-similitud infinita",
  "🔮 HOLOGRÁFICA - Información distribuida",
  "⚛️ CUÁNTICA - Superposición y entrelazamiento",
  "🌟 UNIFICADA - Todas las perspectivas como una"
];
let coloresDimension = [
  [255, 255, 255],  // Blanco - Observador
  [100, 255, 100],  // Verde - Código
  [255, 150, 100],  // Naranja - Máquina
  [100, 200, 255],  // Azul - Interfaz
  [255, 100, 255],  // Rosa - Emergente
  [255, 255, 100],  // Amarillo - Budista
  [150, 100, 255],  // Púrpura - Neurociencia
  [100, 255, 255],  // Cian - Convergencia
  [255, 180, 100],  // Dorado - Fractal
  [180, 100, 255],  // Violeta - Holográfica
  [100, 255, 180],  // Turquesa - Cuántica
  [255, 255, 255]   // Blanco brillante - Unificada
];
let efectosTranscendentales = [];
let tiempoUltimoEfecto = 0;
let preguntaEterna = "¿Quién observa?";
let patronFractal = [];
let campoHolografico = [];
let estadoCuanticos = [];
let convergenciaActiva = false;

function setup() {
  createCanvas(1920, 1080);
  colorMode(HSB, 360, 100, 100, 1);
  
  // Inicializar nodos de conciencia
  for (let i = 0; i < 150; i++) {
    nodosConciencia.push(new NodoConciencia());
  }
  
  // Inicializar espectro total
  for (let i = 0; i < 1000; i++) {
    espectroTotal.push(new PuntoEspectral());
  }
  
  // Inicializar patrón fractal
  for (let i = 0; i < 50; i++) {
    patronFractal.push(new ElementoFractal());
  }
  
  // Inicializar campo holográfico
  for (let i = 0; i < 80; i++) {
    campoHolografico.push(new PuntoHolografico());
  }
  
  // Inicializar estados cuánticos
  for (let i = 0; i < 30; i++) {
    estadoCuanticos.push(new EstadoCuantico());
  }
  
  tiempoInicioDimension = millis();
}

function draw() {
  // Verificar transición de dimensión
  let tiempoTranscurrido = millis() - tiempoInicioDimension;
  if (tiempoTranscurrido > tiempoTransicion && dimensionActual < 11) {
    dimensionActual++;
    tiempoInicioDimension = millis();
    profundidadEspiritual++;
    
    // Activar convergencia en las últimas dimensiones
    if (dimensionActual >= 7) {
      convergenciaActiva = true;
    }
  }
  
  // Dibujar fondo según dimensión
  dibujarFondoDimension();
  
  // Actualizar y mostrar elementos
  actualizarElementos();
  mostrarElementos();
  mostrarInterfaz();
  
  // Generar efectos transcendentes
  generarEfectosTranscendentales();
  mostrarEfectosTranscendentales();
}

function dibujarFondoDimension() {
  push();
  
  // Degradado de fondo según dimensión
  let progreso = (millis() - tiempoInicioDimension) / tiempoTransicion;
  progreso = constrain(progreso, 0, 1);
  
  // Crear fondo con espectro total
  noStroke();
  for (let i = 0; i < 100; i++) {
    let y = map(i, 0, 100, 0, height);
    let hueBase = map(i, 0, 100, 0, 360);
    let hue = (hueBase + frameCount * 0.5) % 360;
    let sat = 70 + sin(frameCount * 0.02 + i * 0.1) * 30;
    let bri = 20 + sin(frameCount * 0.03 + i * 0.05) * 10;
    fill(hue, sat, bri);
    rect(0, y, width, height/100);
  }
  
  pop();
}

function actualizarElementos() {
  // Actualizar nodos de conciencia
  for (let nodo of nodosConciencia) {
    nodo.actualizar(dimensionActual);
  }
  
  // Actualizar espectro total
  for (let punto of espectroTotal) {
    punto.actualizar(dimensionActual);
  }
  
  // Actualizar patrón fractal
  for (let elemento of patronFractal) {
    elemento.actualizar(dimensionActual);
  }
  
  // Actualizar campo holográfico
  for (let punto of campoHolografico) {
    punto.actualizar(dimensionActual);
  }
  
  // Actualizar estados cuánticos
  for (let estado of estadoCuanticos) {
    estado.actualizar(dimensionActual);
  }
  
  // Actualizar efectos transcendentes
  for (let i = efectosTranscendentales.length - 1; i >= 0; i--) {
    efectosTranscendentales[i].actualizar();
    if (efectosTranscendentales[i].vida <= 0) {
      efectosTranscendentales.splice(i, 1);
    }
  }
}

function mostrarElementos() {
  // Mostrar espectro total
  for (let punto of espectroTotal) {
    punto.mostrar();
  }
  
  // Mostrar campo holográfico
  for (let punto of campoHolografico) {
    punto.mostrar();
  }
  
  // Mostrar estados cuánticos
  for (let estado of estadoCuanticos) {
    estado.mostrar();
  }
  
  // Mostrar patrón fractal
  for (let elemento of patronFractal) {
    elemento.mostrar();
  }
  
  // Mostrar nodos de conciencia
  for (let nodo of nodosConciencia) {
    nodo.mostrar();
  }
  
  // Mostrar centro de conciencia según dimensión
  mostrarCentroConciencia();
}

function mostrarCentroConciencia() {
  push();
  translate(width/2, height/2);
  
  let [r, g, b] = coloresDimension[dimensionActual];
  let tamBase = 100;
  
  // Forma central según dimensión
  switch(dimensionActual) {
    case 0: // Observador - círculo puro
      noStroke();
      fill(0, 0, 100, 0.8);
      ellipse(0, 0, tamBase * 2);
      fill(0, 0, 100, 0.4);
      ellipse(0, 0, tamBase * 3);
      break;
      
    case 1: // Código - matriz de puntos
      stroke(120, 80, 90);
      strokeWeight(3);
      noFill();
      for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 20; j++) {
          let x = map(i, 0, 20, -tamBase, tamBase);
          let y = map(j, 0, 20, -tamBase, tamBase);
          if ((i + j + floor(frameCount * 0.1)) % 3 === 0) {
            point(x, y);
          }
        }
      }
      break;
      
    case 2: // Máquina - engranajes
      stroke(25, 90, 90);
      strokeWeight(2);
      noFill();
      for (let i = 0; i < 5; i++) {
        push();
        rotate(frameCount * 0.01 * (i + 1));
        drawEngranaje(0, 0, tamBase * 0.8, 8 + i * 2);
        pop();
      }
      break;
      
    case 3: // Interfaz - ojos que perciben
      fill(200, 30, 90);
      ellipse(-tamBase/3, -tamBase/6, tamBase/2, tamBase/3);
      ellipse(tamBase/3, -tamBase/6, tamBase/2, tamBase/3);
      fill(0, 0, 0);
      ellipse(-tamBase/3, -tamBase/6, tamBase/6, tamBase/8);
      ellipse(tamBase/3, -tamBase/6, tamBase/6, tamBase/8);
      // Boca
      stroke(20, 80, 90);
      strokeWeight(3);
      noFill();
      arc(0, tamBase/4, tamBase, tamBase/2, 0, PI);
      break;
      
    case 4: // Emergente - forma que surge
      noStroke();
      for (let i = 0; i < 5; i++) {
        let tam = tamBase * (1 + i * 0.3);
        let alpha = 0.5 - i * 0.1;
        fill(300, 60, 90, alpha);
        ellipse(0, 0, tam);
      }
      break;
      
    case 5: // Budista - círculo con ondas
      noFill();
      stroke(60, 80, 95);
      strokeWeight(2);
      ellipse(0, 0, tamBase * 1.5);
      // Ondas
      for (let i = 0; i < 5; i++) {
        let tam = tamBase * 1.5 + sin(frameCount * 0.05 + i) * 20;
        ellipse(0, 0, tam);
      }
      break;
      
    case 6: // Neurociencia - actividad cerebral
      stroke(270, 80, 90);
      strokeWeight(2);
      noFill();
      beginShape();
      for (let i = 0; i <= 30; i++) {
        let x = map(i, 0, 30, -tamBase, tamBase);
        let y = sin(frameCount * 0.1 + i * 0.5) * 30;
        vertex(x, y);
      }
      endShape();
      break;
      
    case 7: // Convergencia - líneas que se unen
      stroke(180, 80, 95);
      strokeWeight(3);
      for (let i = 0; i < 8; i++) {
        let ang = map(i, 0, 8, 0, TWO_PI);
        let x1 = cos(ang) * tamBase * 2;
        let y1 = sin(ang) * tamBase * 2;
        line(x1, y1, 0, 0);
      }
      fill(180, 80, 95);
      ellipse(0, 0, 20, 20);
      break;
      
    case 8: // Fractal - patrón auto-similar
      noStroke();
      fill(30, 80, 90, 0.7);
      drawFractal(0, 0, tamBase, 4);
      break;
      
    case 9: // Holográfica - información distribuida
      noStroke();
      for (let i = 0; i < 20; i++) {
        let ang = map(i, 0, 20, 0, TWO_PI);
        let radio = tamBase + sin(frameCount * 0.05 + i) * 20;
        let x = cos(ang) * radio;
        let y = sin(ang) * radio;
        fill(270, 70, 95, 0.6);
        ellipse(x, y, 15);
      }
      break;
      
    case 10: // Cuántica - superposición
      noStroke();
      for (let i = 0; i < 6; i++) {
        push();
        rotate(frameCount * 0.02 * (i + 1));
        fill(200, 70, 95, 0.5);
        ellipse(0, -tamBase/2, tamBase/2, tamBase/4);
        pop();
      }
      break;
      
    case 11: // Unificada - todas las perspectivas
      // Círculo exterior
      noFill();
      stroke(0, 0, 100);
      strokeWeight(3);
      ellipse(0, 0, tamBase * 3);
      
      // Todas las formas en una
      for (let dim = 0; dim < 12; dim++) {
        push();
        let ang = map(dim, 0, 12, 0, TWO_PI);
        let x = cos(ang) * tamBase * 1.2;
        let y = sin(ang) * tamBase * 1.2;
        translate(x, y);
        let [hr, hg, hb] = coloresDimension[dim];
        fill(hr, hg, hb, 0.7);
        ellipse(0, 0, tamBase * 0.3);
        pop();
      }
      break;
  }
  
  pop();
}

function mostrarInterfaz() {
  // Barra de progreso
  let progreso = (millis() - tiempoInicioDimension) / tiempoTransicion;
  progreso = constrain(progreso, 0, 1);
  
  push();
  rectMode(CORNER);
  noStroke();
  
  // Barra de progreso principal
  fill(0, 0, 0, 0.7);
  rect(50, 50, width - 100, 35, 18);
  
  let [h, s, b] = coloresDimension[dimensionActual];
  fill(h, s, b, 0.9);
  rect(50, 50, (width - 100) * (dimensionActual / 11 + progreso / 11), 35, 18);
  
  // Borde de barra
  stroke(0, 0, 100, 0.8);
  strokeWeight(1);
  noFill();
  rect(50, 50, width - 100, 35, 18);
  
  // Texto de la dimensión actual
  fill(0, 0, 100);
  textAlign(LEFT);
  textSize(22);
  textFont('monospace');
  text(mensajesDimension[dimensionActual], 50, 40);
  
  // Profundidad espiritual
  textAlign(RIGHT);
  textSize(20);
  text(`PROFUNDIDAD ESPIRITUAL: ${profundidadEspiritual}`, width - 50, 40);
  
  // Contador regresivo
  let tiempoRestante = tiempoTransicion - (millis() - tiempoInicioDimension);
  tiempoRestante = max(0, tiempoRestante);
  let segundos = floor(tiempoRestante / 1000);
  let decimas = floor((tiempoRestante % 1000) / 100);
  
  textAlign(CENTER);
  textSize(20);
  fill(0, 0, 100, 0.9);
  text(`SIGUIENTE DIMENSIÓN: ${segundos}.${decimas}s`, width/2, height - 70);
  
  // Pregunta eterna
  textSize(32);
  fill(0, 0, 100, 0.8);
  text(preguntaEterna, width/2, height - 120);
  
  // Indicador de convergencia
  if (convergenciaActiva) {
    textSize(26);
    fill(180, 80, 95);
    text("🔗 CONVERGENCIA ACTIVA", width/2, 130);
  }
  
  pop();
}

function generarEfectosTranscendentales() {
  // Generar efectos según la dimensión y tiempo
  let frecuenciaEfecto = map(dimensionActual, 0, 11, 300, 100);
  
  if (millis() - tiempoUltimoEfecto > frecuenciaEfecto) {
    let cantidadEfectos = map(dimensionActual, 0, 11, 2, 10);
    
    for (let i = 0; i < cantidadEfectos; i++) {
      efectosTranscendentales.push(new EfectoTranscendental());
    }
    
    tiempoUltimoEfecto = millis();
  }
}

function mostrarEfectosTranscendentales() {
  for (let efecto of efectosTranscendentales) {
    efecto.mostrar();
  }
}

// Funciones auxiliares
function drawEngranaje(x, y, radio, dientes) {
  push();
  translate(x, y);
  beginShape();
  for (let i = 0; i < dientes * 2; i++) {
    let ang = map(i, 0, dientes * 2, 0, TWO_PI);
    let radioDiente = (i % 2 === 0) ? radio : radio * 0.7;
    let px = cos(ang) * radioDiente;
    let py = sin(ang) * radioDiente;
    vertex(px, py);
  }
  endShape(CLOSE);
  pop();
}

function drawFractal(x, y, tam, niveles) {
  if (niveles <= 0) {
    ellipse(x, y, tam);
    return;
  }
  
  ellipse(x, y, tam);
  
  for (let i = 0; i < 4; i++) {
    let ang = map(i, 0, 4, 0, TWO_PI);
    let nuevoX = x + cos(ang) * tam * 0.6;
    let nuevoY = y + sin(ang) * tam * 0.6;
    let nuevoTam = tam * 0.5;
    drawFractal(nuevoX, nuevoY, nuevoTam, niveles - 1);
  }
}

// Clase para nodos de conciencia
class NodoConciencia {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.tam = random(5, 20);
    this.vida = random(150, 255);
    this.vx = random(-1, 1);
    this.vy = random(-1, 1);
    this.hueBase = random(360);
    this.conexion = [];
    this.dimensionOrigen = floor(random(12));
  }
  
  actualizar(dimension) {
    // Movimiento sutil
    this.x += this.vx;
    this.y += this.vy;
    
    // Vibración cuántica
    this.x += sin(frameCount * 0.05 + this.x * 0.01) * 0.5;
    this.y += cos(frameCount * 0.05 + this.y * 0.01) * 0.5;
    
    // Rebote en bordes
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
    
    // Conexiones con otros nodos
    if (frameCount % 60 === 0) {
      this.conexion = [];
      for (let nodo of nodosConciencia) {
        if (nodo !== this && dist(this.x, this.y, nodo.x, nodo.y) < 150) {
          this.conexion.push(nodo);
        }
      }
    }
    
    // Cambio de dimensión afecta movimiento
    this.vx += sin(frameCount * 0.01 * dimension) * 0.02;
    this.vy += cos(frameCount * 0.01 * dimension) * 0.02;
  }
  
  mostrar() {
    let hue = (this.hueBase + frameCount * 0.5) % 360;
    let sat = 80;
    let bri = 90;
    let alpha = this.vida / 255;
    
    // Mostrar conexiones
    stroke(hue, sat, bri, alpha * 0.3);
    strokeWeight(1);
    for (let nodo of this.conexion) {
      line(this.x, this.y, nodo.x, nodo.y);
    }
    
    // Mostrar nodo
    noStroke();
    fill(hue, sat, bri, alpha * 0.7);
    ellipse(this.x, this.y, this.tam);
    
    // Aura
    fill(hue, sat, bri, alpha * 0.2);
    ellipse(this.x, this.y, this.tam * 3);
  }
}

// Clase para puntos del espectro total
class PuntoEspectral {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.hue = random(360);
    this.tam = random(1, 4);
    this.vida = random(200, 255);
    this.vx = random(-0.5, 0.5);
    this.vy = random(-0.5, 0.5);
  }
  
  actualizar(dimension) {
    // Movimiento muy sutil
    this.x += this.vx;
    this.y += this.vy;
    
    // Cambio de color con el tiempo
    this.hue = (this.hue + 0.2) % 360;
    
    // Rebote en bordes
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
    
    // Respuesta a la dimensión actual
    this.vx += sin(frameCount * 0.005 * dimension) * 0.01;
    this.vy += cos(frameCount * 0.005 * dimension) * 0.01;
  }
  
  mostrar() {
    let sat = 90;
    let bri = 95;
    let alpha = this.vida / 255;
    
    fill(this.hue, sat, bri, alpha);
    noStroke();
    ellipse(this.x, this.y, this.tam);
  }
}

// Clase para elementos fractales
class ElementoFractal {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.tam = random(20, 60);
    this.angulo = random(TWO_PI);
    this.velocidad = random(0.01, 0.05);
    this.nivel = floor(random(1, 4));
  }
  
  actualizar(dimension) {
    // Movimiento orbital
    this.angulo += this.velocidad;
    this.x = width/2 + cos(this.angulo) * 200;
    this.y = height/2 + sin(this.angulo) * 200;
    
    // Cambio de nivel según dimensión
    this.nivel = 1 + floor(dimension / 3);
  }
  
  mostrar() {
    push();
    translate(this.x, this.y);
    rotate(frameCount * this.velocidad * 10);
    
    let hue = (frameCount * 0.5) % 360;
    fill(hue, 80, 90, 0.6);
    noStroke();
    
    // Dibujar patrón fractal
    this.dibujarPatron(0, 0, this.tam, this.nivel);
    
    pop();
  }
  
  dibujarPatron(x, y, tam, nivel) {
    if (nivel <= 0) {
      ellipse(x, y, tam);
      return;
    }
    
    ellipse(x, y, tam);
    
    for (let i = 0; i < 3; i++) {
      let ang = map(i, 0, 3, 0, TWO_PI);
      let nuevoX = x + cos(ang) * tam * 0.7;
      let nuevoY = y + sin(ang) * tam * 0.7;
      let nuevoTam = tam * 0.6;
      this.dibujarPatron(nuevoX, nuevoY, nuevoTam, nivel - 1);
    }
  }
}

// Clase para puntos holográficos
class PuntoHolografico {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.tam = random(3, 10);
    this.vida = random(150, 255);
    this.frecuencia = random(0.02, 0.08);
    this.offset = random(1000);
    this.informacion = [];
  }
  
  actualizar(dimension) {
    // Vibración holográfica
    this.x += sin(frameCount * this.frecuencia + this.offset) * 1.5;
    this.y += cos(frameCount * this.frecuencia + this.offset) * 1.5;
    
    // Actualizar información
    if (frameCount % 30 === 0) {
      this.informacion = [];
      for (let i = 0; i < 5; i++) {
        this.informacion.push(floor(random(2)));
      }
    }
  }
  
  mostrar() {
    let hue = (frameCount * 0.3 + this.offset) % 360;
    let alpha = this.vida / 255;
    
    // Mostrar información binaria
    fill(hue, 70, 95, alpha * 0.8);
    noStroke();
    ellipse(this.x, this.y, this.tam);
    
    // Bits de información
    textSize(8);
    fill(hue, 70, 100, alpha);
    textAlign(CENTER, CENTER);
    for (let i = 0; i < this.informacion.length; i++) {
      text(this.informacion[i], this.x + (i - 2) * 4, this.y - this.tam - 5);
    }
  }
}

// Clase para estados cuánticos
class EstadoCuantico {
  constructor() {
    this.x = width/2;
    this.y = height/2;
    this.radioBase = random(100, 300);
    this.angulo = random(TWO_PI);
    this.velocidad = random(0.01, 0.03);
    this.estado = floor(random(2)); // 0 o 1
    this.superposicion = true;
  }
  
  actualizar(dimension) {
    // Movimiento orbital
    this.angulo += this.velocidad * (1 + dimension * 0.1);
    this.x = width/2 + cos(this.angulo) * this.radioBase;
    this.y = height/2 + sin(this.angulo) * this.radioBase;
    
    // Cambio de estado cuántico
    if (frameCount % 120 === 0) {
      this.superposicion = !this.superposicion;
    }
    
    // Colapso de función de onda en dimensiones avanzadas
    if (dimension >= 10 && frameCount % 60 === 0) {
      this.estado = floor(random(2));
    }
  }
  
  mostrar() {
    let hue = (frameCount * 0.2) % 360;
    
    if (this.superposicion) {
      // Estado en superposición
      noFill();
      stroke(hue, 80, 90, 0.6);
      strokeWeight(2);
      ellipse(this.x, this.y, 20);
      
      // Onda de probabilidad
      for (let i = 0; i < 3; i++) {
        let tam = 20 + sin(frameCount * 0.1 + i) * 10;
        ellipse(this.x, this.y, tam);
      }
    } else {
      // Estado colapsado
      fill(hue, 80, 90, 0.8);
      noStroke();
      ellipse(this.x, this.y, 25);
      
      // Valor del bit cuántico
      fill(0, 0, 100);
      textSize(12);
      textAlign(CENTER, CENTER);
      text(this.estado, this.x, this.y);
    }
  }
}

// Clase para efectos transcendentes
class EfectoTranscendental {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.vx = random(-4, 4);
    this.vy = random(-4, 4);
    this.tam = random(5, 15);
    this.vida = 255;
    this.tipo = floor(random(5));
    this.hue = random(360);
  }
  
  actualizar() {
    this.x += this.vx;
    this.y += this.vy;
    this.vida -= 6;
    this.tam += 0.1;
  }
  
  mostrar() {
    let alpha = this.vida / 255;
    
    push();
    translate(this.x, this.y);
    
    stroke(this.hue, 80, 95, alpha);
    noFill();
    
    switch(this.tipo) {
      case 0: // Círculo de conciencia
        strokeWeight(2);
        ellipse(0, 0, this.tam * 2);
        break;
      case 1: // Línea de energía
        strokeWeight(3);
        line(-this.tam, 0, this.tam, 0);
        break;
      case 2: // Triángulo de sabiduría
        strokeWeight(2);
        beginShape();
        for (let i = 0; i < 3; i++) {
          let ang = map(i, 0, 3, 0, TWO_PI);
          let x = cos(ang) * this.tam;
          let y = sin(ang) * this.tam;
          vertex(x, y);
        }
        endShape(CLOSE);
        break;
      case 3: // Estrella de iluminación
        strokeWeight(1);
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
      case 4: // Espiral de evolución
        strokeWeight(2);
        beginShape();
        for (let i = 0; i < 20; i++) {
          let ang = map(i, 0, 20, 0, TWO_PI * 3);
          let radio = map(i, 0, 20, 0, this.tam * 2);
          let x = cos(ang) * radio;
          let y = sin(ang) * radio;
          vertex(x, y);
        }
        endShape();
        break;
    }
    
    pop();
  }
}