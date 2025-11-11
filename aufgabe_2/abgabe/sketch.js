let speedSlider;
let sizeASlider;
let sizeBSlider; // Neuer Slider für Dreieck B
let drehwinkel = 0;

let ax, ay, bx, by, cx, cy;
let baseRadius = 150;
let hoverA = 1;
let hoverB = 1; // Hover-State für Dreieck B


let posX, posY;
let xSpeed, ySpeed;
let radiusHighlight = 400;

// Zeichen-Layer
let ink;

function setup() {

  const cnv = createCanvas(windowWidth, windowHeight);

 
  ink = createGraphics(windowWidth, windowHeight);
  ink.clear();

  angleMode(DEGREES);
  rectMode(CENTER);

  // Slider
  speedSlider = createSlider(0, 100, 20, 1);
  speedSlider.position(50, 50);

  sizeASlider = createSlider(0, 100, 50, 1);
  sizeASlider.position(50, 100);

  sizeBSlider = createSlider(0, 100, 50, 1); // 
  sizeBSlider.position(50, 150);

  calculateTrianglePos();

  posX = width / 2;
  posY = height / 2;
  xSpeed = random(-3, 3);
  ySpeed = random(-3, 3);
}

function updateMover() {
  posX += xSpeed;
  posY += ySpeed;

  if (posX < 0 || posX > width) {
    xSpeed *= -1;
    radiusHighlight = random(250, 500);
  }
  if (posY < 0 || posY > height) {
    ySpeed *= -1;
    radiusHighlight = random(250, 500);
  }
}

function draw() {
 
  clear();

  updateMover();

  let size = 30;
  let h = size * Math.sqrt(3) / 2;
  let numCols = Math.ceil(windowWidth / size) + 200;
  let numRows = Math.ceil(windowHeight / h) + 200;

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      let x = col * size / 2;
      let y = row * h;
      if (row % 1 === 1) {
        x += size / 2;
      }

      let centerX = x;
      let centerY = y + h / 2.5;
      let distance = dist(posX, posY, centerX, centerY);

      let weight = 0.2;
      let lift = 0;
      let alpha = [255, 300, 255];

      if (distance < radiusHighlight) {
        weight = map(distance, 0, radiusHighlight, 3.0, 0.2);
        lift = map(distance, 0, radiusHighlight, 5, 0);
        alpha = [
          map(distance, 0, radiusHighlight, 200, 255),
          300,
          map(distance, 0, radiusHighlight, 200, 255),
        ];
      }

      stroke(85, 107, 47, alpha);
      strokeWeight(weight);
      noFill();

      if ((row + col) % 2 === 0) {
        triangle(
          x, y - lift,
          x - size / 2, y + h - lift,
          x + size / 2, y + h - lift
        );
      } else {
        triangle(
          x, y + h - lift,
          x - size / 2, y - lift,
          x + size / 2, y - lift
        );
      }
    }
  }

  // --- DREHENDES DREIECK MIT SLIDERN ---
  const speedVal = speedSlider.value();
  const aVal = sizeASlider.value();
  const bVal = sizeBSlider.value(); // Wert für Dreieck B

  const maxSize = min(width, height) * 0.40;
  const sizeA = map(aVal, 0, 100, 20, maxSize);
  const sizeB = map(bVal, 0, 100, 20, maxSize); // Grösse für Dreieck B
  drehwinkel += map(speedVal, 0, 100, 0, 1);

  const mx = mouseX - width / 2;
  const my = mouseY - height / 2;
  const baseScaleA = sizeA / baseRadius;
  const baseScaleB = sizeB / baseRadius; // Scale für Dreieck B
  const rotA = drehwinkel;
  const rotB = -drehwinkel; // Gegenrichtung für Dreieck B

  const hoveringA = isMouseOverTriangle(mx, my, rotA, baseScaleA);
  const hoveringB = isMouseOverTriangle(mx, my, rotB, baseScaleB); // Hover für Dreieck B

  // Hover-Animation für Dreieck A
  let targetA;
  if (hoveringA) {
    const pulse = 1 + 0.35 * Math.sin(millis() * 0.005);
    targetA = pulse;
  } else {
    targetA = 1;
  }
  hoverA = lerp(hoverA, targetA, 0.15);

  // Hover-Animation für Dreieck B (negativ pulsierend)
  let targetB;
  if (hoveringB) {
    const pulse = 1 - 0.35 * Math.sin(millis() * 0.005); // Minus statt Plus
    targetB = pulse;
  } else {
    targetB = 1;
  }
  hoverB = lerp(hoverB, targetB, 0.15);

  // Mittelpunkt des grossen Dreiecks
  const cxScreen = width / 2;
  const cyScreen = height / 2;

  // 1) DREIECK A - Sichtbares Dreieck auf dem Hauptcanvas
  push();
  translate(cxScreen, cyScreen);
  rotate(drehwinkel);
  fill(255, 255, 255, 120);
  stroke(85, 107, 47);
  scale(baseScaleA * hoverA);
  triangle(ax, ay, bx, by, cx, cy);
  pop();

  // 2) DREIECK A - Spur auf 'ink' zeichnen
  const sA = baseScaleA * hoverA;
  const cA = cos(rotA);
  const sNA = sin(rotA);

  const A_A = transformPoint(ax, ay, sA, cA, sNA, cxScreen, cyScreen);
  const B_A = transformPoint(bx, by, sA, cA, sNA, cxScreen, cyScreen);
  const C_A = transformPoint(cx, cy, sA, cA, sNA, cxScreen, cyScreen);

  ink.noFill();
  ink.stroke(85, 107, 47, 180);
  ink.strokeWeight(2);
  ink.triangle(A_A.x, A_A.y, B_A.x, B_A.y, C_A.x, C_A.y);

  // 3) DREIECK B - Sichtbares Dreieck (Gegenrichtung)
  push();
  translate(cxScreen, cyScreen);
  rotate(-drehwinkel); // Gegenrichtung
  fill(255, 255, 255, 120);
  stroke(85, 107, 47);
  scale(baseScaleB * hoverB);
  triangle(ax, ay, bx, by, cx, cy);
  pop();

  // 4) DREIECK B - Spur auf 'ink' zeichnen
  const sB = baseScaleB * hoverB;
  const cB = cos(rotB);
  const sNB = sin(rotB);

  const A_B = transformPoint(ax, ay, sB, cB, sNB, cxScreen, cyScreen);
  const B_B = transformPoint(bx, by, sB, cB, sNB, cxScreen, cyScreen);
  const C_B = transformPoint(cx, cy, sB, cB, sNB, cxScreen, cyScreen);

  ink.noFill();
  ink.stroke(85, 107, 47, 180);
  ink.strokeWeight(2);
  ink.triangle(A_B.x, A_B.y, B_B.x, B_B.y, C_B.x, C_B.y);

  // Ink-Layer auf das Hauptcanvas legen (obenauf)
  image(ink, 0, 0);

  // --- TEXTE ---
  noStroke();
  fill(0);
  text("Geschwindigkeit", 50, 45);
  text("Grösse A", 50, 95);
  text("Grösse B", 50, 145); // Neuer Text für Slider B
 
}

function transformPoint(x, y, scaleFactor, cosR, sinR, tx, ty) {
  // Skaliere, rotiere (um 0/0) und verschiebe zum Canvas-Zentrum
  const sx = x * scaleFactor;
  const sy = y * scaleFactor;
  return {
    x: cosR * sx - sinR * sy + tx,
    y: sinR * sx + cosR * sy + ty
  };
}

function keyPressed() {
  if (key === 'c' || key === 'C') {
    ink.clear(); // alle Spuren löschen
  }
  if (key === 's' || key === 'S') {
    saveCanvas('transparent-dreieck', 'png');
  }
}

function calculateTrianglePos() {
  cx = cos(30) * baseRadius;
  cy = sin(30) * baseRadius;
  bx = cos(150) * baseRadius;
  by = sin(150) * baseRadius;
  ax = cos(270) * baseRadius;
  ay = sin(270) * baseRadius;
}

function isMouseOverTriangle(mx, my, rotationDeg, scaleFactor) {
  if (scaleFactor === 0) return false;

  const rad = -rotationDeg; // 
  const cosR = cos(rad);
  const sinR = sin(rad);

  const rx = cosR * mx - sinR * my;
  const ry = sinR * mx + cosR * my;

  const sx = rx / scaleFactor;
  const sy = ry / scaleFactor;

  return pointInTriangle(sx, sy, ax, ay, bx, by, cx, cy);
}

function pointInTriangle(px, py, x1, y1, x2, y2, x3, y3) {
  const d1 = sign(px, py, x1, y1, x2, y2);
  const d2 = sign(px, py, x2, y2, x3, y3);
  const d3 = sign(px, py, x3, y3, x1, y1);
  const hasNeg = (d1 < 0) || (d2 < 0) || (d3 < 0);
  const hasPos = (d1 > 0) || (d2 > 0) || (d3 > 0);
  return !(hasNeg && hasPos);
}

function sign(px, py, x1, y1, x2, y2) {
  return (px - x2) * (y1 - y2) - (x1 - x2) * (py - y2);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  clear();


  ink = createGraphics(windowWidth, windowHeight);
  ink.clear();
}
