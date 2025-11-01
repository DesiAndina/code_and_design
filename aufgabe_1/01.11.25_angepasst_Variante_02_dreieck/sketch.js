let speedSlider;
let sizeASlider;
let sizeBSlider;
let drehwinkel = 0;

let ax,ay,bx,by,cx,cy;

let baseRadius = 150;



function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES); // Umstellung in Grad 
  rectMode(CENTER);   // Quadrat im Zentrum 

  // Slider 
  speedSlider = createSlider(0, 100, 20, 1);
  speedSlider.position(50, 50);

  sizeASlider = createSlider(0, 100, 50, 1); // Grösse A
  sizeASlider.position(50, 100);

  sizeBSlider = createSlider(0, 100, 50, 1); // Grösse B
  sizeBSlider.position(50, 150);

  calculateTrianglePos()

  background(255,20);
}

function draw() {
  

  // Werte für Slider
  const speedVal = speedSlider.value();
  const aVal = sizeASlider.value();
  const bVal = sizeBSlider.value();

  // Mapping 
  const maxSize = min(width, height) * 0.40;
  const sizeA = map(aVal, 0, 100, 20, maxSize);
  const sizeB = map(bVal, 0, 100, 20, maxSize);


  // Drehwinkel 
  drehwinkel += map(speedVal, 0, 100, 0, 1);


  push(); // Koordinatensystem verschoben 
  translate(width / 2, height / 2);


  // B
  push();
  rotate(45);
  rotate(-2 * drehwinkel);
  fill(85, 107, 47, 120);
  stroke(85, 107, 47);
  scale(sizeB / baseRadius);
 // ellipse(0, 0, sizeB*2, sizeB*0.5);
  triangle(ax, ay, bx, by, cx, cy);
  pop();


  // A
  push();
  rotate(drehwinkel);
  fill(255, 255, 255, 120);
  stroke(85, 107, 47);
  //ellipse(0, 0, sizeA*2, sizeA*0.5);
  scale(sizeA / baseRadius);
  triangle(ax, ay, bx, by, cx, cy);
  pop();



  pop();


  

  //Texte
  fill(0);
  text("Geschwindigkeit", 50, 45);
  text("Grösse A",        50, 95);
  text("Grösse B",        50, 145);
}


function calculateTrianglePos(){
  cx = cos(30) * baseRadius;
  cy = sin(30) * baseRadius;

  bx = cos(150) * baseRadius;
  by = sin(150) * baseRadius;

  ax = cos(270) * baseRadius;
  ay = sin(270) * baseRadius;
}