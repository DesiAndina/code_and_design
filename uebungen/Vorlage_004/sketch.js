let groesseSlider;
let speedSlider;
let t = 0; // Zeit/Winkel für Rotation

function setup() {
  createCanvas(windowWidth, windowHeight);

  groesseSlider = createSlider(0, 100, 30, 1);
  groesseSlider.position(50, 50);

  speedSlider = createSlider(0, 100, 0, 1);
  speedSlider.position(50, 100);

  background(168, 218, 255);
}

function draw() {
  background(168, 218, 255);

  // Werte 
  let groesse = groesseSlider.value();  // 0..100
  let speed   = speedSlider.value();    // 0..100

  // Grössen
  let maxSize = min(width, height) * 0.55;
  let sizeA = map(groesse, 0, 100, 40, maxSize);  // A wächst
  let sizeB = map(groesse, 0, 100, maxSize, 40);  // B schrumpft

  // Rotations-Geschwindigkeit
  let rotSpeed = map(speed, 0, 100, 0, 0.05);
  t += rotSpeed;

  // Stil
  strokeWeight(3);

  // Dreieck A , rotiert mit +t
  fill(27, 165, 245, 120);
  stroke(245, 27, 123); // 
  drawEquilateralTriangle(width/2, height/2, sizeA, t);

  // Dreieck B, rotiert mit -t
  fill(245, 27, 123, 120);
  stroke(27, 165, 245);
  drawEquilateralTriangle(width/2, height/2, sizeB, -t);


  noStroke();
  fill(168, 218, 255);
  rect(0, 0, 220, 140);

  fill(0);
  text("Grösse", 50, 45);
  text("Geschwindigkeit", 50, 95);
}

// Hilfsfunktion: gleichseitiges Dreieck um Mittelpunkt (cx, cy)
// s - Grösse
function drawEquilateralTriangle(cx, cy, s, rot) {
  let r = s * 0.5; // Radius vom Mittelpunkt zu den Ecken (einfach gehalten)
  beginShape();
  for (let i = 0; i < 3; i++) {
    let ang = -HALF_PI + rot + i * TWO_PI / 3; // Start nach oben
    let x = cx + cos(ang) * r;
    let y = cy + sin(ang) * r;
    vertex(x, y);
  }
  endShape(CLOSE);
}

function keyReleased() {
  if (key == 's' || key == 'S') {
    saveCanvas('dreiecke-ueberlappend', 'png');
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}