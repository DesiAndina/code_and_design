// ------- Vordergrund 
let speedSlider;
let sizeASlider;
let drehwinkel = 0;

let ax, ay, bx, by, cx, cy;
let baseRadius = 150;
let hoverA = 1;



function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  rectMode(CENTER);

  // Slider (DOM)
  speedSlider = createSlider(0, 100, 20, 1);
  speedSlider.position(50, 50);

  sizeASlider = createSlider(0, 100, 50, 1);
  sizeASlider.position(50, 100);

  calculateTrianglePos();



}

function draw() {
 
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

}