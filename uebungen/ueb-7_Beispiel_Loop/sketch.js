 
function setup() {
  createCanvas(windowWidth, windowHeight);
 
}
 
function draw() {
  background(0, 50);
  noFill();
  stroke(255);
 
 
  for(let i = 0; i < 10; i++) {

    //plan: y position und der Durchmesser ist abhängig von Distanz von Maus zu Mitte der Ellipse
  
    let distanz = dist(mouseX, mouseY, i * 200, height/2);
    let yPos = map(distanz, 0, width, -100, 300);

    ellipse(i * 400, height / 2 -yPos, distanz, distanz);
  }
}
 
 