// ------- Vordergrund 
let speedSlider;
let sizeASlider;
let drehwinkel = 0;

let ax, ay, bx, by, cx, cy;
let baseRadius = 150;
let hoverA = 1;

// ------- Hintergrund 
let bgLayer;
let posX, posY;
let xSpeed, ySpeed;
let radiusHighlight = 400;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  rectMode(CENTER);

  // Layer für den Hintergrund
  bgLayer = createGraphics(windowWidth, windowHeight);

  // Slider (DOM)
  speedSlider = createSlider(0, 100, 20, 1);
  speedSlider.position(50, 50);

  sizeASlider = createSlider(0, 100, 50, 1);
  sizeASlider.position(50, 100);

  calculateTrianglePos();

  // Hintergrund
  posX = width / 1.5;
  posY = height / 1.5;
  xSpeed = random(-1.5, 1.5);
  ySpeed = random(-1, 1);


}

function draw() {
  // 1) Hintergrund 
  drawBackgroundPattern(bgLayer);

  // 2) Hintergrund-Layer 
  push();
  image(bgLayer, 0, 0);
  pop();

  // 3) Vordergrund-Dreieck
  const speedVal = speedSlider.value();
  const aVal = sizeASlider.value();

  const maxSize = min(width, height) * 0.40;
  const sizeA = map(aVal, 0, 100, 20, maxSize);

  drehwinkel += map(speedVal, 0, 100, 0, 1);

  const mx = mouseX - width / 2;
  const my = mouseY - height / 2;

  const baseScaleA = sizeA / baseRadius;
  const rotA = drehwinkel;

  const hoveringA = isMouseOverTriangle(mx, my, rotA, baseScaleA);

  let targetA;
  if (hoveringA) {
    const pulse = 1 + 0.35 * Math.sin(millis() * 0.005);
    targetA = pulse;
  } else {
    targetA = hoverA; // 
  }

  hoverA = lerp(hoverA, targetA, 0.15);

  push();
  translate(width / 2, height / 2);
  push();
  rotate(drehwinkel);
  fill(255, 255, 255, 180);    
  stroke(85, 107, 47);
  strokeWeight(1);
  scale(baseScaleA * hoverA);
  triangle(ax, ay, bx, by, cx, cy);
  pop();
  pop();

  // UI-Beschriftungen
  noStroke();
  fill(0);
  text("Geschwindigkeit", 50, 45);
  text("Grösse A", 50, 95);
}

// ------- Hintergrund als Funktion auf dem Layer -------
function drawBackgroundPattern(g) {
 
  g.clear();

  updateMover();

  let size = 50;
  let h = size * Math.sqrt(3) / 2;

  let numCols = Math.ceil(windowWidth / size) + 100;
  let numRows = Math.ceil(windowHeight / h) + 100;

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      let x = col * size / 2;
      let y = row * h;

    
      if (row % 1 === 1) x += size / 2;

      let centerX = x;
      let centerY = y + h / 1.5;
      let distance = dist(posX, posY, centerX, centerY);

      let weight = 0.1;
      let lift = 0;
      let alpha = 70; // passiv

      if (distance < radiusHighlight) {
        weight = map(distance, 0, radiusHighlight, 1.5, 0.1);
        lift = map(distance, 0, radiusHighlight, 3, 0);
        alpha = map(distance, 0, radiusHighlight, 130, 50);
      }

      g.stroke(85, 107, 47, alpha);
      g.strokeWeight(weight);
      g.noFill();

      if ((row + col) % 2 === 0) {
        g.triangle(
          x, y - lift,
          x - size / 2, y + h - lift,
          x + size / 2, y + h - lift
        );
      } else {
        g.triangle(
          x, y + h - lift,
          x - size / 2, y - lift,
          x + size / 2, y - lift
        );
      }
    }
  }
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
  const rad = radians(-rotationDeg);
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

  const newBg = createGraphics(windowWidth, windowHeight);
  newBg.image(bgLayer, 0, 0); // optional: alten Inhalt übernehmen
  bgLayer = newBg;
}