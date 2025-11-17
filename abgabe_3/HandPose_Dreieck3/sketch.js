// ------- Vordergrund 
let speedSlider;
let sizeASlider;
let drehwinkel = 0;

let ax, ay, bx, by, cx, cy;
let baseRadius = 150;
let hoverA = 1;

// ------- Handpose / Zeigefinger (ml5.js)
let handpose;
let video;
let hands = [];
let fingerX = null;
let fingerY = null;
let isModelReady = false;

function preload() {
  // HandPose-Modell laden (ml5.js)
  handpose = ml5.handPose();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  rectMode(CENTER);

  background(255);

  // Slider (DOM)
  speedSlider = createSlider(0, 100, 20, 1);
  speedSlider.position(50, 50);

  sizeASlider = createSlider(0, 100, 50, 1);
  sizeASlider.position(50, 100);

  calculateTrianglePos();


  video = createCapture(VIDEO);
  video.size(width, height);  // gleiche Grösse wie Canvas
  video.hide();               // kein Video anzeigen (Design wie erster Code)

  // Hand-Erkennung starten
  handpose.detectStart(video, gotHands);
}

function draw() {
  // KEIN background() -> alte Dreiecke bleiben als Zeichnung erhalten

  // 3) Vordergrund-Dreieck
  const speedVal = speedSlider.value();
  const aVal = sizeASlider.value();

  const maxSize = min(width, height) * 0.40;
  const sizeA = map(aVal, 0, 100, 20, maxSize);

  drehwinkel += map(speedVal, 0, 100, 0, 1);

  const baseScaleA = sizeA / baseRadius;
  const rotA = drehwinkel;

  // ---- Hover mit Zeigefinger statt Maus ----
  let hoveringA = false;

  if (fingerX !== null && fingerY !== null) {
    // Fingerposition relativ zum Canvas-Zentrum
    const mx = fingerX - width / 2;
    const my = fingerY - height / 2;

    hoveringA = isMouseOverTriangle(mx, my, rotA, baseScaleA);
  }

  let targetA;
  if (hoveringA) {
    const pulse = 1 + 0.35 * Math.sin(millis() * 0.005);
    targetA = pulse;
  } else {
    targetA = 1;  // zurück zur Normalgrösse
  }

  hoverA = lerp(hoverA, targetA, 0.15);

  // Dreieck zeichnen (wie in deinem ersten Code)
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

  // UI-Hintergrund, damit Text nicht in den Spuren „untergeht“
  push();
  rectMode(CORNER);
  noStroke();
  fill(255);                // deckend weiss
  rect(40, 30, 280, 120);   // Panel hinter den Texten
  rectMode(CENTER);
  pop();

  // UI-Beschriftungen
  noStroke();
  fill(0);
  text("Geschwindigkeit", 50, 45);
  text("Grösse A", 50, 95);
  text("Hover: Zeigefinger über dem Dreieck", 50, 135);
}

// =========================
// HANDPOSE CALLBACK
// =========================
function gotHands(results) {
  hands = results;

  if (hands.length > 0) {
    isModelReady = true;

    // erste Hand
    let hand = hands[0];

    // Zeigefinger-Spitze = Keypoint 8
    let indexTip = hand.keypoints[8];

    // Video == Canvas-Grösse -> 1:1 Mapping
    fingerX = indexTip.x;
    fingerY = indexTip.y;
  } else {
    isModelReady = false;
    fingerX = null;
    fingerY = null;
  }
}

// =========================
// TRIANGLE-HELFER (wie im ersten Code)
// =========================
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
  if (video) {
    video.size(width, height);
  }
  
  background(255);
}

// Optional: deine alte updateMover-Funktion kannst du entfernen oder lassen,
// solange sie nirgends aufgerufen wird.
