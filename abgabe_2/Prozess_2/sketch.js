function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0,30);
  
  let size = 100;
  let h = size * Math.sqrt(3) / 2; // Höhe eines gleichseitigen Dreiecks
  
  // mehr Dreiecke horizontal und vertikal 
  let numCols = Math.ceil(windowWidth / size) + 20;
  let numRows = Math.ceil(windowHeight / h) + 20;

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      let x = col * size / 2;
      let y = row * h;
      
      // Versetze jede zweite Reihe
      if (row % 1 === 1) {
        x += size / 1;
      }

      // Distanz zur Maus
      let centerX = x;
      let centerY = y + h / 1.5;
      let distance = dist(mouseX, mouseY, centerX, centerY);
      let radius = 400; // Radius des Leucht-Effekts
      
      
      let weight;
      let lift = 0; // Wie viel das Dreieck angehoben wird
      let alpha = 255; // Transparenz
      
      if (distance < radius) {
        weight = map(distance, 0, radius, 3.0, 0.2);
        lift = map(distance, 0, radius, 5, 0); // Max 5px Anhebung
        alpha = map(distance, 0, radius, 200, 255); // Leichte Transparenz
      } else {
        weight = 0.2;
      }
      
      stroke(255, alpha);
      strokeWeight(weight);
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
