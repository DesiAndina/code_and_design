let groesseSlider;
let speedSlider;
let t = 0; // Zeit/Winkel für Rotation

function setup() {
  createCanvas(windowWidth, windowHeight);
  groesseSlider = createSlider(0, 100,);
  groesseSlider.position(50, 50);

  speedSlider = createSlider(0, 100, 20, 1);
  speedSlider.position(50, 100);
  background(255, 255, 255, 120);
}

function draw() {

  // Werte 
  let groesse = groesseSlider.value();  
  let speed   = speedSlider.value();    

  // Grössen
  let maxSize = min(width, height) * 0.75;
  let sizeA = map(groesse, 0, 100, 40, maxSize);  // A wächst
  let sizeB = map(groesse, 0, 100, maxSize, 40);  // B schrumpft

  // Rotations-Geschwindigkeit 
  let rotSpeed = map(speed, 0, 100, 0, 0.05);
  t += rotSpeed;

  // Strichstärke 
  strokeWeight(1);

  // Dreieck A (weiss), rotiert mit +t
  fill(255, 255, 255, 120);
  stroke(85, 107, 47,); //
  drawTriangle(width/2, height/2, sizeA, t);

  // Dreieck B (oliv), rotiert mit -t
  fill(85, 107, 47, 120);
  stroke(85, 107, 47);
  drawTriangle(width/2, height/2, sizeB, -t);

  noStroke();
fill(255, 255, 255, 200);

  fill(0);
  text("Grösse", 50, 45);
  text("Geschwindigkeit", 50, 95);
}

// Hilfsfunktion: gleichseitiges Dreieck um Mittelpunkt (cx, cy)
// s - Grösse, r ist einfach ein Faktor 
function drawTriangle(cx, cy, s, rot) {
  let r = s * 0.5; // Radius vom Mittelpunkt 
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