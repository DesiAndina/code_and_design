let valueSlider; 




function setup() {
  createCanvas(400,400);
  
  valueSlider=createSlider(-10,38,9);
  valueSlider.position(10,10);

}



function draw() {

let inputValue= valueSlider.value();

let inputMin=-10;
let inputMax=38;

let outputMin=0;
let outputMax=255;

let outputValue =map(inputValue, inputMin, inputMax, outputMin, outputMax);





  background(outputValue);
 
 
 
  //background 0, kreis 255
  //background 255, kreis 0
  //background 125, kreis 125
  //background 100, kreis 155



  fill(255-outputValue);
  ellipse(200,200,400,400);

}
