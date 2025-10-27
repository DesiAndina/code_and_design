let strokeSlider;
let groesseSlider;

function setup() {
  createCanvas(windowWidth, windowHeight);
  strokeSlider = createSlider(1,10,5);
  strokeSlider.position(50,50);
  
  groesseSlider = createSlider(0,255,10);
  groesseSlider.position(50,100);
  background(168, 218, 255);
}

function draw() {
  
  
  //Werte auslesen
  let groesse = groesseSlider.value();
  let s=strokeSlider.value();
  
  //Werte benutzen um Attribute festzulegen
  strokeWeight(s);
  fill(27, 165, 245, 100);
  stroke(245, 27, 123);
  
  triangle(
    width/2, height/2 - groesse,      // oben
    width/2 - groesse, height/2 + groesse,  // links unten
    width/2 + groesse, height/2 + groesse   // rechts unten
  );
  
  // Zweites Dreieck – nach unten gerichtet (spiegelt das erste)
  triangle(
    width/2, height/2 + groesse,      // unten
    width/2 - groesse, height/2 - groesse,  // links oben
    width/2 + groesse, height/2 - groesse   // rechts oben
  );
  
  noStroke();
  fill(168, 218, 255);
  rect(0,0,200,200)
  //Beschriftung Slider
  fill(0);
  
  text("Strichdicke", 50, 35);
  text("Breite Ellipse", 50, 85);
}


function keyReleased() {
  if(key=='s'){
    saveCanvas('screenshot.jpg');
  }
}