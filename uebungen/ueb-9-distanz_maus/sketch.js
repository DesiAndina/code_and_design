function setup() {
  createCanvas(windowWidth, windowHeight);
}
 
function draw() {
  background(0);
 
  // Plan: Durchmesser der Ellipse abhängig von Distanz der Maus
  let durchmesser;
  
  // Distanz des Zentrums des Ellipse zur Maus messen
  let distanz = dist(mouseX, mouseY, width / 2, height / 2);
  
  // console.log(distanz);
  durchmesser = map(distanz, 0, width / 2, 10, 500);
 
  
  ellipse(width / 2, height / 2, durchmesser, durchmesser);
}
 
 