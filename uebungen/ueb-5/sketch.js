let posX = 0; 
let posY = 0;
let threshold = 120;
frameRate(30);





function setup() {
  createCanvas(400,400);
}

function draw() {

  background(220, 4); //zweite zahl deckend 

  if(posX < threshold){
//farbe vor der Position 120
  fill(225,0,0);
  }else {
    //farbe nach der Position 120 
    fill(0,0,225);
  }


//zufallswert für y Position
//if(frameCount % 10 == 0){

posY = random(-150,20);
rect (posX, height / 1.5 + posY, 50, 50);

//}


  if (posX < 350){
//falls die Bedingung zutrifft 
posX = posX + 1; //posX++ zahl ist die geschwindigkeit 
  }

}

/* 
exakt gleich          posX  ==  350
kleiner als           posX  <   350
grösser als           posX  >   350
kleiner oder gleich   posX  <=  350 (wahr, falls posX 350 ist)
grösser oder gleich   posX  >=  350
ungleich              posY  !=  350 (trifft immer zum ,ausser posX hat den Wert von 350)
*/
//var gleich wie let 