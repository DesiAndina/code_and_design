function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  
  let size = 150;
  let h = size * Math.sqrt(3) / 2; // Höhe eines gleichseitigen Dreiecks
  
  // Berechne wie viele Dreiecke horizontal und vertikal passen
  let numCols = Math.ceil(windowWidth / size) + 20;
  let numRows = Math.ceil(windowHeight / h) + 20;
  
  noFill();
  stroke(255);
  strokeWeight(0.5);

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      let x = col * size / 2;
      let y = row * h;
      
      // Versetze jede zweite Reihe
      if (row % 1 === 1) {
        x += size / 1;
      }

      if ((row + col) % 2 === 0) {
        // Dreieck nach oben
        triangle(
          x, y,                    // obere Spitze
          x - size / 2, y + h,     // linke Ecke
          x + size / 2, y + h      // rechte Ecke
        );
      } else {
        // Dreieck nach unten
        triangle(
          x, y + h,                // untere Spitze
          x - size / 2, y,         // linke Ecke
          x + size / 2, y          // rechte Ecke
        );
      }
    }
  }
}
