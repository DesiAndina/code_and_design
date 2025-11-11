let posX, posY;
let xSpeed, ySpeed;
let radiusHighlight = 400;

function setup() {
  createCanvas(windowWidth, windowHeight);
  posX = width / 2;
  posY = height / 2;
  xSpeed = random(-3, 3);
  ySpeed = random(-3, 3);
}

function updateMover() {
  posX += xSpeed;
  posY += ySpeed;

  if (posX < 0 || posX > width) {
    xSpeed *= -1;
    radiusHighlight = random(250, 500);
  }
  if (posY < 0 || posY > height) {
    ySpeed *= -1;
    radiusHighlight = random(250, 500);
  }
}

function draw() {
  background(255);
  updateMover();


  noStroke();
  noFill();
  ellipse(posX, posY, 20, 20);

  let size = 100;
  let h = size * Math.sqrt(3) / 2;

  let numCols = Math.ceil(windowWidth / size) + 20;
  let numRows = Math.ceil(windowHeight / h) + 20;

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      let x = col * size / 2;
      let y = row * h;

      // Versatz jede zweite Reihe
      if (row % 1 === 1) {
        x += size / 2;
      }

      let centerX = x;
      let centerY = y + h / 1.5;
      let distance = dist(posX, posY, centerX, centerY);

      let weight = 0.2;
      let lift = 0;
      let alpha = 255;

      if (distance < radiusHighlight) {
        weight = map(distance, 0, radiusHighlight, 3.0, 0.2);
        lift = map(distance, 0, radiusHighlight, 5, 0);
        alpha = map(distance, 0, radiusHighlight, 200, 255);
      }

      stroke(85, 107, 47, alpha);
      strokeWeight(weight);
      noFill();

      if ((row + col) % 2 === 0) {
        triangle(
          x, y - lift,
          x - size / 2, y + h - lift,
          x + size / 2, y + h - lift
        );
      } else {
        triangle(
          x, y + h - lift,
          x - size / 2, y - lift,
          x + size / 2, y - lift
        );
      }
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
