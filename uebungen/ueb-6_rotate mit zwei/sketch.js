let drehwinkel = 0;
//let bild;
 
//function preload() {
  bild = loadImage('images/kreis_beziehung.jpg');
//}
 
function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    rectMode(CENTER);
}
 
function draw() {
    // ratio, damit Bild nicht verzerrt wird
    // let ratio = width / bild.width;
    //image(bild, 0, 0, bild.width * ratio, bild.height * ratio);
 
    clear();
 
    push();
    // Rechteck rechts
    // Koordinatensystem verschieben
    translate(width/2 + 200, height/2);
    
    // rotieren
    rotate(drehwinkel);
 
    fill(0, 0, 255);
    rect(0, 0, 200, 200);
 
    pop();
 
    push();
    // Rechteck links
    // Koordinatensystem verschieben
    translate(width/2 - 200, height/2);
    // rotieren
    rotate(drehwinkel * -1);
 
    fill(0, 0, 255);
    rect(0, 0, 200, 200);
 
    pop();
 
    // Rotation
    drehwinkel = drehwinkel +1;
}
 
function keyPressed() {
    if (key === 's' || key === 'S') {
        saveCanvas('meinBild.png');
    }
}