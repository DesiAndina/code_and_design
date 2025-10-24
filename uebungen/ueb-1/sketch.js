let durchmesser;
durchmesser=30;

let rotwert = 0;
// let durchmesser = 10;

let blauwert = 200;

function setup() {
  createCanvas(windowWidth,windowHeight);

}

function draw() {
  background(255, 10);

  console.log(rotwert);

   //mouseX
   //mouseY



  fill(rotwert, 0, 0, 100);

  rect(30, 20, 500, 500);

  fill(0,0,255,100,);
  ellipse (200,200, blauwert,blauwert);
rectMode(CENTER);
  fill(0,0,255,100,);
  ellipse (400,400, rotwert,rotwert);

  durchmesser = durchmesser+1;

  //11 = 10 + 1
  //12 = 11 + 1

  rotwert = rotwert + 1;
}

function mouseClicked() {
  rotwert = rotwert +2;
}
