let speedSlider;
let sizeASlider;
let sizeBSlider;
let t = 0; // Zeit/Winkel

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Slider 
  speedSlider = createSlider(0, 100, 20, 1);
  speedSlider.position(50, 50);

  sizeASlider = createSlider(0, 100, 50, 1); // Grösse A
  sizeASlider.position(50, 100);

  sizeBSlider = createSlider(0, 100, 50, 1); // Grösse B
  sizeBSlider.position(50, 150);

  background(255);
}

function draw() {
  // Werte 
  const speed = speedSlider.value();
  const aVal  = sizeASlider.value();
  const bVal  = sizeBSlider.value();

  // Grössen 
  const maxSize = min(width, height) * 0.75;
  const sizeA = map(aVal, 0, 100, 20, maxSize);
  const sizeB = map(bVal, 0, 100, 20, maxSize);

  // Rotation
  const rotSpeed = map(speed, 0, 100, 0.0, 0.05);
  t += rotSpeed;

  // Strichdicke
  strokeWeight(1);

  // Dreieck A (weiss), rotiert mit +t
  fill(255, 255, 255, 120);
  stroke(85, 107, 47);
  drawTriangle(width/2, height/2, sizeA, t);

  // Dreieck B (oliv), rotiert mit -t für gegenrichtung
  fill(85, 107, 47, 120);
  stroke(85, 107, 47);
  drawTriangle(width/2, height/2, sizeB, -t);

  // Hintergrund Slider
  noStroke();
  fill(255, 255, 255, 220);
  rect(16, 16, 260, 160, 10);

  // Texte
  fill(0);
  text("Geschwindigkeit", 50, 45);
  text("Grösse A",        50, 95);
  text("Grösse B",        50, 145);
  
}

// Gleichseitiges Dreieck um Mittelpunkt (cx, cy)
function drawTriangle(cx, cy, s, rot) {
  const r = s * 0.5; // Radius vom Mittelpunkt zu den Ecken
  beginShape();
  for (let i = 0; i < 3; i++) {
    const ang = -HALF_PI + rot + i * TWO_PI / 3; // Spitze nach oben
    const x = cx + cos(ang) * r;
    const y = cy + sin(ang) * r;
    vertex(x, y);
  }
  endShape(CLOSE);
}

// Screenshot
function keyReleased() {
  if (key === 's' || key === 'S') {
    saveCanvas('dreiecke_separat', 'png');
  }
}

// Responsiv
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}