

function setup() {
  createCanvas(windowWidth,windowHeight);

}

function draw() {
  background(220);

  //initialisierung; bedinunf; uodatefor
for(let i = 0; i < 15 ; i++){

  //anweisung
console.log(i);

//80 abstand wo gezeichnet wird, heigt wo und 50 grösse 
ellipse(80 * i, height/2, 50 ,50);

}

}

