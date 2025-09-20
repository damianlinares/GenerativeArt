let estadoActual = 0;
let tiempoInicioEstado;
let tiempoTransicion = 10000; // 10 segundos
let particulas = [];
let buclesPensamiento = [];
let nucleoConciencia;
let nivelDepuracion = 0;
let mensajesEstado = [
  "🔍 IDENTIFICANDO ERRORES...",
  "🌀 ANALIZANDO BUCLES MENTALES...",
  "🧹 DEPURANDO CÓDIGO NEGATIVO...",
  "🔄 REESCRIBIENDO PATRONES...",
  "⚡ OPTIMIZANDO CONCIENCIA...",
  "🗑️ LIBERANDO MEMORIA EMOCIONAL...",
  "🔌 REINICIANDO CONEXIÓN PRESENTE...",
  "🎼 COMPILANDO PAZ INTERIOR...",
  "🔇 EJECUTANDO SILENCIO MENTAL...",
  "🌌 KERNEL PANIC MÍSTICO - SILENCIO ABSOLUTO"
];
let coloresEstado = [
  [255, 50, 50],    // Rojo - Identificación
  [255, 150, 50],   // Naranja - Análisis
  [255, 255, 50],   // Amarillo - Depuración
  [150, 255, 50],   // Verde claro - Reescritura
  [50, 255, 150],   // Verde - Optimización
  [50, 255, 255],   // Cian - Liberación
  [50, 150, 255],   // Azul - Reconexión
  [150, 50, 255],   // Púrpura - Compilación
  [255, 50, 255],   // Rosa - Silencio
  [255, 255, 255]   // Blanco - Kernel Panic
];
let efectosParticulas = [];
let tiempoUltimoEfecto = 0;
let modoKernelPanic = false;
let brilloKernel = 0;
let direccionBrillo = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Inicializar núcleo de conciencia
  nucleoConciencia = {
    x: width/2,
    y: height/2,
    radio: 50,
    energia: 100
  };
  
  // Crear bucles de pensamiento
  for (let i = 0; i < 50; i++) {
    buclesPensamiento.push(new BuclePensamiento());
  }
  
  // Crear partículas de código mental
  for (let i = 0; i < 200; i++) {
    particulas.push(new ParticulaCodigo());
  }
  
  tiempoInicioEstado = millis();
}

function draw() {
  // Verificar transición de estado
  if (millis() - tiempoInicioEstado > tiempoTransicion && estadoActual < 9) {
    estadoActual++;
    tiempoInicioEstado = millis();
    nivelDepuracion++;
    
    // Efectos especiales por estado
    if (estadoActual === 9) {
      modoKernelPanic = true;
    }
  }
  
  // Dibujar fondo según estado
  if (modoKernelPanic) {
    // Efecto de Kernel Panic místico
    brilloKernel += direccionBrillo * 2;
    if (brilloKernel > 255) {
      brilloKernel = 255;
      direccionBrillo = -1;
    } else if (brilloKernel < 0) {
      brilloKernel = 0;
      direccionBrillo = 1;
    }
    
    background(0, 0, brilloKernel * 0.1);
    dibujarEfectoKernelPanic();
  } else {
    // Degradado de fondo según progreso
    let progreso = estadoActual / 9;
    let r = lerp(10, 0, progreso);
    let g = lerp(10, 0, progreso);
    let b = lerp(20, 0, progreso);
    background(r, g, b);
  }
  
  // Actualizar y mostrar elementos
  actualizarElementos();
  mostrarElementos();
  mostrarInterfaz();
  
  // Generar efectos especiales
  generarEfectosEspeciales();
  mostrarEfectosEspeciales();
}

function actualizarElementos() {
  // Actualizar bucles de pensamiento
  for (let bucle of buclesPensamiento) {
    bucle.actualizar(estadoActual);
  }
  
  // Actualizar partículas de código
  for (let i = particulas.length - 1; i >= 0; i--) {
    particulas[i].actualizar(estadoActual);
    
    // Eliminar partículas en estados avanzados
    if (particulas[i].vida <= 0 && estadoActual >= 5) {
      particulas.splice(i, 1);
    }
  }
  
  // Actualizar núcleo de conciencia
  nucleoConciencia.energia = map(estadoActual, 0, 9, 100, 0);
  
  // Actualizar efectos de partículas
  for (let i = efectosParticulas.length - 1; i >= 0; i--) {
    efectosParticulas[i].actualizar();
    if (efectosParticulas[i].vida <= 0) {
      efectosParticulas.splice(i, 1);
    }
  }
}

function mostrarElementos() {
  // Mostrar núcleo de conciencia
  push();
  translate(nucleoConciencia.x, nucleoConciencia.y);
  
  // Aura del núcleo según estado
  let [r, g, b] = coloresEstado[estadoActual];
  fill(r, g, b, 30);
  noStroke();
  ellipse(0, 0, nucleoConciencia.radio * 4);
  
  // Núcleo principal
  fill(r, g, b, 150);
  stroke(r, g, b);
  strokeWeight(2);
  ellipse(0, 0, nucleoConciencia.radio * 2);
  
  // Pulsación del núcleo
  let pulso = sin(frameCount * 0.1) * 5;
  fill(r, g, b, 100);
  ellipse(0, 0, nucleoConciencia.radio + pulso);
  
  pop();
  
  // Mostrar bucles de pensamiento
  for (let bucle of buclesPensamiento) {
    bucle.mostrar();
  }
  
  // Mostrar partículas de código
  for (let particula of particulas) {
    particula.mostrar();
  }
}

function mostrarInterfaz() {
  // Barra de progreso
  let progreso = (millis() - tiempoInicioEstado) / tiempoTransicion;
  progreso = constrain(progreso, 0, 1);
  
  push();
  rectMode(CORNER);
  noStroke();
  fill(50, 50, 70, 150);
  rect(50, 50, width - 100, 20);
  
  let [r, g, b] = coloresEstado[estadoActual];
  fill(r, g, b);
  rect(50, 50, (width - 100) * progreso, 20);
  
  // Texto del estado actual
  fill(255);
  textAlign(LEFT);
  textSize(16);
  text(mensajesEstado[estadoActual], 50, 40);
  
  // Nivel de depuración
  textAlign(RIGHT);
  text(`NIVEL DEPURACIÓN: ${nivelDepuracion}`, width - 50, 40);
  
  // Contador regresivo
  let tiempoRestante = tiempoTransicion - (millis() - tiempoInicioEstado);
  tiempoRestante = max(0, tiempoRestante);
  let segundos = floor(tiempoRestante / 1000);
  textAlign(CENTER);
  textSize(14);
  fill(200);
  text(`SIGUIENTE ESTADO: ${segundos}s`, width/2, height - 30);
  
  pop();
}

function generarEfectosEspeciales() {
  // Generar efectos según el estado
  if (millis() - tiempoUltimoEfecto > 200) {
    switch(estadoActual) {
      case 0: // Identificación de errores
        for (let i = 0; i < 3; i++) {
          efectosParticulas.push(new EfectoError());
        }
        break;
      case 2: // Depuración activa
        for (let i = 0; i < 5; i++) {
          efectosParticulas.push(new EfectoLimpieza());
        }
        break;
      case 4: // Optimización
        for (let i = 0; i < 2; i++) {
          efectosParticulas.push(new EfectoOptimizacion());
        }
        break;
      case 6: // Reconexión
        for (let i = 0; i < 4; i++) {
          efectosParticulas.push(new EfectoConexion());
        }
        break;
      case 8: // Silencio
        for (let i = 0; i < 6; i++) {
          efectosParticulas.push(new EfectoSilencio());
        }
        break;
    }
    tiempoUltimoEfecto = millis();
  }
}

function mostrarEfectosEspeciales() {
  for (let efecto of efectosParticulas) {
    efecto.mostrar();
  }
}

function dibujarEfectoKernelPanic() {
  // Efecto de distorsión visual
  push();
  blendMode(ADD);
  
  for (let i = 0; i < 5; i++) {
    let x = random(width);
    let y = random(height);
    let tam = random(50, 200);
    
    fill(255, 255, 255, random(5, 20));
    noStroke();
    ellipse(x, y, tam, tam * 0.3);
  }
  
  pop();
  
  // Líneas de interferencia
  stroke(255, 50);
  strokeWeight(1);
  for (let i = 0; i < 20; i++) {
    let y = (frameCount * 2 + i * 30) % height;
    line(0, y, width, y);
  }
}

// Clase para bucles de pensamiento
class BuclePensamiento {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.radio = random(10, 30);
    this.velocidad = random(0.5, 2);
    this.angulo = random(TWO_PI);
    this.tipo = floor(random(8)); // 8 tipos de errores mentales
    this.intensidad = random(50, 255);
  }
  
  actualizar(estado) {
    // Movimiento circular
    this.angulo += this.velocidad * 0.01;
    this.x = width/2 + cos(this.angulo) * 100;
    this.y = height/2 + sin(this.angulo) * 100;
    
    // Reducir intensidad en estados avanzados
    if (estado >= 2) {
      this.intensidad *= 0.98;
    }
    if (estado >= 5) {
      this.intensidad *= 0.95;
    }
  }
  
  mostrar() {
    let alpha = this.intensidad;
    let [r, g, b] = coloresEstado[estadoActual];
    
    push();
    translate(this.x, this.y);
    
    // Rotación para efecto dinámico
    rotate(frameCount * 0.02);
    
    // Dibujar según tipo de error
    stroke(r, g, b, alpha);
    strokeWeight(2);
    noFill();
    
    switch(this.tipo) {
      case 0: // Bucle infinito
        ellipse(0, 0, this.radio * 2);
        break;
      case 1: // Condición errónea
        rect(-this.radio, -this.radio, this.radio * 2, this.radio * 2);
        break;
      case 2: // Variable no definida
        triangle(0, -this.radio, -this.radio, this.radio, this.radio, this.radio);
        break;
      case 3: // Error de sintaxis
        beginShape();
        for (let i = 0; i < 8; i++) {
          let ang = map(i, 0, 8, 0, TWO_PI);
          let radio = this.radio + sin(frameCount * 0.1 + i) * 5;
          let x = cos(ang) * radio;
          let y = sin(ang) * radio;
          vertex(x, y);
        }
        endShape(CLOSE);
        break;
      default: // Error genérico
        ellipse(0, 0, this.radio * 1.5);
        line(-this.radio, -this.radio, this.radio, this.radio);
        line(this.radio, -this.radio, -this.radio, this.radio);
    }
    
    pop();
  }
}

// Clase para partículas de código mental
class ParticulaCodigo {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.vx = random(-2, 2);
    this.vy = random(-2, 2);
    this.tam = random(2, 6);
    this.vida = 255;
    this.tipo = floor(random(9)); // 9 funciones de limpieza
  }
  
  actualizar(estado) {
    this.x += this.vx;
    this.y += this.vy;
    
    // Rebote en bordes
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
    
    // Reducir vida en estados avanzados
    if (estado >= 3) {
      this.vida -= 2;
    }
    if (estado >= 6) {
      this.vida -= 5;
    }
  }
  
  mostrar() {
    let [r, g, b] = coloresEstado[estadoActual];
    fill(r, g, b, this.vida);
    noStroke();
    
    // Dibujar según tipo de función
    switch(this.tipo) {
      case 0: // Comentario
        rect(this.x, this.y, this.tam * 2, this.tam);
        break;
      case 1: // Variable
        ellipse(this.x, this.y, this.tam);
        break;
      case 2: // Función
        triangle(this.x, this.y - this.tam, 
                 this.x - this.tam, this.y + this.tam,
                 this.x + this.tam, this.y + this.tam);
        break;
      case 3: // Condición
        rect(this.x - this.tam, this.y - this.tam, this.tam * 2, this.tam * 2);
        break;
      case 4: // Bucle
        ellipse(this.x, this.y, this.tam * 1.5);
        break;
      case 5: // Retorno
        line(this.x - this.tam, this.y, this.x + this.tam, this.y);
        line(this.x + this.tam * 0.5, this.y - this.tam * 0.5, this.x + this.tam, this.y);
        line(this.x + this.tam * 0.5, this.y + this.tam * 0.5, this.x + this.tam, this.y);
        break;
      default: // Código genérico
        rect(this.x, this.y, this.tam, this.tam);
    }
  }
}

// Clases para efectos especiales
class EfectoBase {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.vx = random(-3, 3);
    this.vy = random(-3, 3);
    this.tam = random(5, 15);
    this.vida = 255;
    this.alpha = 255;
  }
  
  actualizar() {
    this.x += this.vx;
    this.y += this.vy;
    this.vida -= 5;
    this.alpha = this.vida;
  }
}

class EfectoError extends EfectoBase {
  mostrar() {
    stroke(255, 50, 50, this.alpha);
    strokeWeight(2);
    noFill();
    line(this.x - this.tam, this.y - this.tam, this.x + this.tam, this.y + this.tam);
    line(this.x + this.tam, this.y - this.tam, this.x - this.tam, this.y + this.tam);
  }
}

class EfectoLimpieza extends EfectoBase {
  mostrar() {
    let [r, g, b] = coloresEstado[estadoActual];
    fill(r, g, b, this.alpha * 0.5);
    noStroke();
    ellipse(this.x, this.y, this.tam * 2);
  }
}

class EfectoOptimizacion extends EfectoBase {
  mostrar() {
    stroke(50, 255, 150, this.alpha);
    strokeWeight(3);
    noFill();
    beginShape();
    for (let i = 0; i < 5; i++) {
      let ang = map(i, 0, 5, 0, TWO_PI);
      let radio = this.tam + sin(frameCount * 0.1 + i) * 3;
      let x = this.x + cos(ang) * radio;
      let y = this.y + sin(ang) * radio;
      vertex(x, y);
    }
    endShape(CLOSE);
  }
}

class EfectoConexion extends EfectoBase {
  mostrar() {
    stroke(50, 150, 255, this.alpha);
    strokeWeight(2);
    noFill();
    ellipse(this.x, this.y, this.tam * 1.5);
    line(this.x, this.y - this.tam, this.x, this.y + this.tam);
    line(this.x - this.tam, this.y, this.x + this.tam, this.y);
  }
}

class EfectoSilencio extends EfectoBase {
  mostrar() {
    fill(255, 255, 255, this.alpha * 0.3);
    noStroke();
    ellipse(this.x, this.y, this.tam);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}