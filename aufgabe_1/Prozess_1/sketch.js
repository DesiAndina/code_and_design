let Transparenz = 120; // Alpha value for stroke
let lift = 0;          // Vertical offset

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255, 30); 
  
  let size = 100;
  let h = size * Math.sqrt(3) / 2; // Höhe eines gleichseitigen Dreiecks

  // Dreiecke horizontal und vertikal über den ganzen Bildschirm
  let numCols = Math.ceil(windowWidth / size) + 20;
  let numRows = Math.ceil(windowHeight / h) + 20;

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      let x = col * size / 2;
      let y = row * h;
      
      // Versetze jede zweite Reihe
      if (row % 1 === 1) {
        x += size / 2;
      }

      // Dunkelolivgrün (#556B2F)
      stroke(85, 107, 47, Transparenz);
      strokeWeight(0.5);
      noFill();

      if ((row + col) % 2 === 0) {
        // Dreieck nach oben
        triangle(
          x, y - lift,                    // obere Spitze
          x - size / 2, y + h - lift,     // linke Ecke
          x + size / 2, y + h - lift      // rechte Ecke
        );
      } else {
        // Dreieck nach unten
        triangle(
          x, y + h - lift,                // untere Spitze
          x - size / 2, y - lift,         // linke Ecke
          x + size / 2, y - lift          // rechte Ecke
        );
      }
    }
  }
}