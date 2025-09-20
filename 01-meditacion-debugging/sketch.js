<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meditación como Debugging Mental</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.min.js"></script>
    <style>
        body {
            margin: 0;
            padding: 0;
            background: #0a0a0a;
            overflow: hidden;
            font-family: serif;
        }
    </style>
</head>
<body>
    <script>
        // --- OBRA 01: MEDITACIÓN COMO DEBUGGING MENTAL ---
        // Estilo Visionario inspirado en Alex Grey.

        let chakras = [];
        let pensamientos = [];
        let tiempo = 0;
        let claridad = 0; // 0 = Caos mental, 1 = Silencio
        let canvas;

        function setup() {
            canvas = createCanvas(windowWidth, windowHeight);
            colorMode(HSB, 360, 100, 100, 100);
            
            // Definimos los 7 chakras
            let coloresChakra = [0, 30, 60, 120, 210, 240, 275];
            chakras = []; // Limpiar array por si acaso
            for (let i = 0; i < 7; i++) {
                chakras.push({
                    y: (height * 0.85) - (i * height * 0.1),
                    color: coloresChakra[i],
                    tam: 20,
                    id: i
                });
            }
            
            // Creamos los "pensamientos parásitos" o "código malicioso"
            pensamientos = []; // Limpiar array
            for (let i = 0; i < 150; i++) {
                pensamientos.push({
                    x: width / 2 + random(-150, 150),
                    y: height * 0.2 + random(-150, 150),
                    vx: random(-2, 2),
                    vy: random(-2, 2),
                    tam: random(2, 8),
                    ruidoOffset: random(1000),
                    alpha: 80
                });
            }
            
            textAlign(CENTER, CENTER);
        }

        function draw() {
            background(240, 30, 5);
            tiempo += 0.01;
            
            // El proceso de meditación: la claridad aumenta con el tiempo
            claridad = min(1.0, claridad + 0.0003);

            // 1. DIBUJAR AURA
            dibujarAura();

            // 2. DIBUJAR FIGURA CENTRAL Y CHAKRAS
            dibujarFiguraCentral();

            // 3. DIBUJAR Y ACTUALIZAR PENSAMIENTOS
            actualizarPensamientos();

            // 4. DIBUJAR INTERFAZ
            mostrarInterfaz();
            
            // 5. EFECTOS ADICIONALES
            dibujarPatronesSagrados();
        }

        function dibujarAura() {
            // El aura se vuelve más grande y serena con la claridad
            let auraTam = lerp(width * 0.3, width * 0.45, claridad);
            
            // Múltiples capas de aura
            for(let i = 3; i >= 0; i--) {
                let factor = 1 + (i * 0.2);
                let alpha = lerp(15, 25, claridad) / (i + 1);
                
                noFill();
                stroke(lerp(0, 180, claridad), 50, 100, alpha);
                strokeWeight(2 - i * 0.3);
                ellipse(width/2, height/2, auraTam * factor);
            }
        }

        function dibujarFiguraCentral() {
            // Columna de energía se fortalece con la claridad
            strokeWeight(lerp(2, 8, claridad));
            stroke(0, 0, 100, lerp(40, 90, claridad));
            line(width / 2, height * 0.9, width / 2, height * 0.1);

            // Los chakras se estabilizan y brillan más
            for (let i = 0; i < chakras.length; i++) {
                let c = chakras[i];
                let pulso = sin(tiempo * 3 - i) * lerp(10, 3, claridad);
                let tamActual = c.tam + pulso;
                let brillo = lerp(70, 100, claridad);
                let saturacion = lerp(70, 100, claridad);
                
                // Aura del chakra con múltiples capas
                for(let j = 2; j >= 0; j--) {
                    noStroke();
                    let alphaAura = lerp(10, 25, claridad) / (j + 1);
                    fill(c.color, saturacion * 0.8, brillo, alphaAura);
                    ellipse(width / 2, c.y, tamActual * (3 + j));
                }
                
                // Núcleo del chakra
                fill(c.color, saturacion, brillo, 100);
                ellipse(width / 2, c.y, tamActual);
                
                // Símbolo interno del chakra
                fill(0, 0, 100, 80);
                textSize(8);
                text((i + 1), width / 2, c.y);
            }
        }

        function actualizarPensamientos() {
            let cabezaY = height * 0.2; // Centro de la mente

            for (let i = pensamientos.length - 1; i >= 0; i--) {
                let p = pensamientos[i];
                
                // El ruido (movimiento caótico) disminuye con la claridad
                let fuerzaRuido = lerp(1, 0.1, claridad);
                p.vx += map(noise(p.ruidoOffset + tiempo), 0, 1, -0.1, 0.1) * fuerzaRuido;
                p.vy += map(noise(p.ruidoOffset + 100 + tiempo), 0, 1, -0.1, 0.1) * fuerzaRuido;

                p.x += p.vx;
                p.y += p.vy;
                
                // Los pensamientos son atraídos hacia la mente para ser "procesados"
                p.x = lerp(p.x, width/2, 0.008);
                p.y = lerp(p.y, cabezaY, 0.008);
                
                // El movimiento general se ralentiza
                p.vx *= 0.98;
                p.vy *= 0.98;
                
                // Se desvanecen con la claridad
                p.alpha = lerp(80, 0, claridad);
                
                // Remover pensamientos que están muy cerca del centro
                let distancia = dist(p.x, p.y, width/2, cabezaY);
                if(distancia < 20 && claridad > 0.3) {
                    pensamientos.splice(i, 1);
                    continue;
                }
                
                // Dibujo del pensamiento mejorado
                push();
                translate(p.x, p.y);
                rotate(p.ruidoOffset + tiempo * 5);
                
                // Forma más compleja
                strokeWeight(1.5);
                stroke(0, 80, 80, p.alpha);
                noFill();
                
                // Alternar entre diferentes formas
                if(i % 3 === 0) {
                    rect(-p.tam/2, -p.tam/2, p.tam, p.tam);
                } else if(i % 3 === 1) {
                    ellipse(0, 0, p.tam);
                } else {
                    triangle(-p.tam/2, p.tam/2, p.tam/2, p.tam/2, 0, -p.tam/2);
                }
                
                pop();
            }
        }

        function dibujarPatronesSagrados() {
            // Mandala de fondo que aparece con la claridad
            if(claridad > 0.2) {
                push();
                translate(width/2, height/2);
                
                let alphaMandala = (claridad - 0.2) * 20;
                stroke(180, 30, 90, alphaMandala);
                strokeWeight(1);
                noFill();
                
                let numRayos = 12;
                for(let i = 0; i < numRayos; i++) {
                    let angulo = map(i, 0, numRayos, 0, TWO_PI);
                    let x1 = cos(angulo) * 100;
                    let y1 = sin(angulo) * 100;
                    let x2 = cos(angulo) * 200;
                    let y2 = sin(angulo) * 200;
                    line(x1, y1, x2, y2);
                }
                
                // Círculos concéntricos
                for(let r = 50; r < 300; r += 50) {
                    ellipse(0, 0, r * 2);
                }
                
                pop();
            }
        }

        function mostrarInterfaz() {
            let porcentaje = Math.round(claridad * 100);
            let estadoTexto = "";
            
            if(claridad < 0.2) {
                estadoTexto = "INICIANDO DEBUGGING...";
            } else if(claridad < 0.5) {
                estadoTexto = "PROCESANDO PENSAMIENTOS...";
            } else if(claridad < 0.8) {
                estadoTexto = "LIBERANDO CÓDIGO MALICIOSO...";
            } else {
                estadoTexto = "SILENCIO INTERIOR ALCANZADO";
            }
            
            // Fondo de la interfaz
            fill(0, 0, 0, 60);
            rectMode(CENTER);
            noStroke();
            rect(width / 2, height - 80, 700, 100, 15);

            // Texto principal
            fill(0, 0, 100);
            textSize(28);
            text("MEDITACIÓN COMO DEBUGGING MENTAL", width / 2, height - 105);
            
            textSize(18);
            text("ESTADO: " + estadoTexto, width / 2, height - 75);
            
            textSize(14);
            text("CLARIDAD MENTAL: " + porcentaje + "%", width / 2, height - 50);
            text("PENSAMIENTOS RESTANTES: " + pensamientos.length, width / 2, height - 30);
            
            // Barra de progreso
            stroke(0, 0, 100, 50);
            strokeWeight(2);
            fill(120, 70, 90, 80);
            rect(width/2, height - 15, claridad * 300, 8, 4);
            
            noFill();
            rect(width/2, height - 15, 300, 8, 4);
        }

        function windowResized() {
            resizeCanvas(windowWidth, windowHeight);
            
            // Reposicionar chakras
            for (let i = 0; i < chakras.length; i++) {
                chakras[i].y = (height * 0.85) - (i * height * 0.1);
            }
            
            // Recentrar pensamientos
            for(let p of pensamientos) {
                if(p.x < 0 || p.x > width) p.x = width/2;
                if(p.y < 0 || p.y > height) p.y = height * 0.2;
            }
        }

        // Funciones de interacción
        function mousePressed() {
            // Reset al hacer clic
            claridad = 0;
            
            // Regenerar pensamientos
            pensamientos = [];
            for (let i = 0; i < 150; i++) {
                pensamientos.push({
                    x: width / 2 + random(-150, 150),
                    y: height * 0.2 + random(-150, 150),
                    vx: random(-2, 2),
                    vy: random(-2, 2),
                    tam: random(2, 8),
                    ruidoOffset: random(1000),
                    alpha: 80
                });
            }
        }

        function keyPressed() {
            if(key === ' ') {
                // Acelerar el proceso de claridad
                claridad = min(1.0, claridad + 0.1);
            }
        }
    </script>
</body>
</html>
