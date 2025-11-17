// ------------------------
// GLOBALE VARIABLEN
// ------------------------
let posX, posY;
let radiusHighlight = 400;

// HandPose / ml5
let handpose;
let video;
let hands = [];
let ratio;
let isModelReady = false;

// ------------------------
// ml5 HANDPOSE LADEN
// ------------------------
function preload() {
  handpose = ml5.handPose();
}

// ------------------------
// SETUP
// ------------------------
function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);

  // Startposition in der Mitte
  posX = width / 2;
  posY = height / 2;

  // Webcam
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  ratio = width / video.width;

  // Hand-Erkennung starten
  handpose.detectStart(video, gotHands);
}

// ------------------------
// DRAW
// ------------------------
function draw() {
  background(255);

  // Wenn Hand erkannt: Mover durch Hand steuern
  if (isModelReady && hands.length > 0) {
    let hand = hands[0];

    // Zentrum: Mittelfinger-Basis (Keypoint 9)
    let center = hand.keypoints[9];

    
    posX = width - center.x * ratio;
    posY = center.y * ratio;

    // Radius über Abstand zwischen Daumen- (4) und Zeigefinger-Spitze (8)
    let thumbTip = hand.keypoints[4];
    let indexTip = hand.keypoints[8];

    let d = dist(thumbTip.x, thumbTip.y, indexTip.x, indexTip.y);
    // d ist im Videokoordinatensystem; reicht hier so als Steuerwert

    radiusHighlight = map(d, 10, 150, 150, 500);
    radiusHighlight = constrain(radiusHighlight, 150, 500);
  }




  // ------------------------
  // TRIANGEL-MUSTER
  // ------------------------
  let size = 50;
  let h = (size * Math.sqrt(3)) / 2;

  let numCols = Math.ceil(width / size) + 120;
  let numRows = Math.ceil(height / h) + 120;

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      let x = (col * size) / 2;
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
          x,
          y - lift,
          x - size / 2,
          y + h - lift,
          x + size / 2,
          y + h - lift
        );
      } else {
        triangle(
          x,
          y + h - lift,
          x - size / 2,
          y - lift,
          x + size / 2,
          y - lift
        );
      }
    }
  }

  // OPTIONAL: Hand-Keypoints & Skelett extra anzeigen
  if (isModelReady && hands.length > 0) {
    drawHandOverlay();
  }
}

// ------------------------
// HAND-OVERLAY (KEYPOINTS + KNOCHEN)
// ------------------------
function drawHandOverlay() {
  push();
  // Spiegelung wie vorher, damit Hand intuitiv ist
  translate(width, 0);
  scale(-1, 1);

  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];

    // Knochen-Verbindungen
    const connections = [
      [0, 1], [1, 2], [2, 3], [3, 4],       // Daumen
      [0, 5], [5, 6], [6, 7], [7, 8],       // Zeigefinger
      [0, 9], [9, 10], [10, 11], [11, 12],  // Mittelfinger
      [0, 13], [13, 14], [14, 15], [15, 16],// Ringfinger
      [0, 17], [17, 18], [18, 19], [19, 20] // kleiner Finger
    ];

    noStroke();
   ;
    for (let conn of connections) {
      let p1 = hand.keypoints[conn[0]];
      let p2 = hand.keypoints[conn[1]];
      line(p1.x * ratio, p1.y * ratio, p2.x * ratio, p2.y * ratio);
    }

    for (let j = 0; j < hand.keypoints.length; j++) {
      let keypoint = hand.keypoints[j];
      let isFingertip = [4, 8, 12, 16, 20].includes(j);

      if (isFingertip) {
        noFill();
        noStroke();
        circle(keypoint.x * ratio, keypoint.y * ratio, 20);
      } else {
        noFill();
        noStroke();
        circle(keypoint.x * ratio, keypoint.y * ratio, 10);
      }
    }
  }

  pop();
}

// ------------------------
// HANDPOSE CALLBACK
// ------------------------
function gotHands(results) {
  hands = results;
  if (hands.length > 0) {
    isModelReady = true;
  }
}

// ------------------------
// FENSTER-RESIZE
// ------------------------
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  ratio = width / video.width;
}
