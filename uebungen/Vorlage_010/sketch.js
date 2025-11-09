function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  stroke(255);
  strokeWeight(0.2);
}

function draw() {
  background(0, 10);

  let a = 90; // Seitenlänge der gleichseitigen Dreiecke (Hex-Radius)
  let hexW = a * 2;
  let hexH = Math.sqrt(3) * a;

  // Abstände der Hex-Zentren
  let horiz = 1.5 * a;
  let vert = hexH; // Math.sqrt(3) * a

  // zusätzliche Puffer, damit das Gitter über alle Ränder hinaus reicht
  let padCols = 30;
  let padRows = 30;

  // Anzahl Spalten/Zeilen grob berechnen (inkl. Puffer)
  let approxCols = Math.ceil(width / horiz);
  let approxRows = Math.ceil(height / vert);

  // Iterationsbereiche (mit Puffer) — stellt sicher, dass das Gitter den ganzen Bildschirm abdeckt
  let startQ = -padCols;
  let endQ = approxCols + padCols;
  let startR = -padRows;
  let endR = approxRows + padRows;

  // Kein zentrieren: grid beginnt so, dass es den gesamten Bildschirm füllt
  let offsetX = 0;
  let offsetY = 0;

  for (let q = startQ; q <= endQ; q++) {
    for (let r = startR; r <= endR; r++) {
      // flat-top hex grid center
      let cx = q * horiz + offsetX + horiz / 2;
      let cy = vert * (r + q / 2) + offsetY + hexH / 2;

      // Mausaniehung (subtil)
      let dx = mouseX - cx;
      let dy = mouseY - cy;
      let d = Math.sqrt(dx * dx + dy * dy);
      let attraction = map(d, 0, max(width, height), 1, 0); // skaliert über Bildschirmgröße
      let drawX = cx + dx * attraction * 0.02;
      let drawY = cy + dy * attraction * 0.02;

      // Zeichne 6 gleichseitige Dreiecke um die Mitte -> bildet ein Hexagon aus 6 Dreiecken
      for (let k = 0; k < 6; k++) {
        let a1 = (TWO_PI / 6) * k;
        let a2 = (TWO_PI / 6) * (k + 1);
        let x1 = drawX + a * Math.cos(a1);
        let y1 = drawY + a * Math.sin(a1);
        let x2 = drawX + a * Math.cos(a2);
        let y2 = drawY + a * Math.sin(a2);

        triangle(drawX, drawY, x1, y1, x2, y2);
      }
    }
  }  }
