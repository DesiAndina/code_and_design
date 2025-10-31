let drehwinkel=0;

function setup() {
  createCanvas(windowWidth,windowHeight);
  angleMode(DEGREES); //umstellung in Grad 
  rectMode(CENTER) //quadrat im Zentrum 
}
function draw() {

  background (0);

  push(); //koordinatensystem verschoben 
  translate(width/2, height/2);
  //rotate (45) //winkl 
  rotate(drehwinkel);
  fill(0,0,255)
  
  rect (0, 0, 200 , 200);
  
  fill(255,0,0,);
  rotate(45);
  rotate(-2*drehwinkel);
  rect (0, 0, 100 , 100);

  pop();
  
  
  fill(255,0,0,);
  rect (0, 0, 200 , 200);



  drehwinkel = drehwinkel +1; //geschwindigkeit wie schnell es dreht 
}
