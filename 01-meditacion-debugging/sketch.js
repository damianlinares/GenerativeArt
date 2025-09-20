<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meditación como Debugging Mental | Damian Linares</title>
    <script src="p5.js"></script>
    <style>
        body {
            margin: 0;
            padding: 0;
            overflow: hidden;
            background-color: #000;
            font-family: 'Courier New', monospace;
        }
        #info-panel {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.7);
            color: #fff;
            padding: 15px 25px;
            border-radius: 8px;
            text-align: center;
            z-index: 100;
            border: 1px solid #00ff00;
            max-width: 80%;
        }
        h1 {
            margin: 0 0 8px 0;
            font-size: 1.5em;
            color: #00ff00;
        }
        p {
            margin: 5px 0;
            font-size: 0.9em;
        }
        #back-button {
            position: fixed;
            top: 20px;
            left: 20px;
            background: rgba(0, 0, 0, 0.7);
            color: #00ff00;
            border: 1px solid #00ff00;
            padding: 8px 15px;
            border-radius: 5px;
            cursor: pointer;
            z-index: 100;
            font-family: 'Courier New', monospace;
            text-decoration: none;
            display: inline-block;
        }
        #back-button:hover {
            background: rgba(0, 255, 0, 0.2);
        }
    </style>
</head>
<body>
    <a id="back-button" href="../index.html">← Volver</a>
    
    <div id="info-panel">
        <h1>Meditación como Debugging Mental</h1>
        <p>SILENCIA EL RUIDO. ENCUENTRA TU CENTRO.</p>
        <p>Una exploración digital de la meditación como proceso de debugging mental.</p>
    </div>

    <script src="sketch.js"></script>
</body>
</html>
