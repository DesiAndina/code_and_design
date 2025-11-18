

// Globale Variablen
let handpose;           // Das ml5.js HandPose-Modell
let video;              // Die Webcam
let hands = [];         // Array mit allen erkannten Händen
let ratio;              // Skalierungsfaktor zwischen Video und Canvas
let isModelReady = false; // Flag, ob das Modell geladen und Hände erkannt wurden

/**
 * Lädt das HandPose-Modell vor dem Setup
 * Diese Funktion wird automatisch vor setup() ausgeführt
 */
function preload() {
  handpose = ml5.handPose();
}

/**
 * Initialisiert Canvas und Webcam
 */
function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1); // Performanceoptimierung
  angleMode(DEGREES); // Winkel in Grad für cos/sin
  

  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide(); // Versteckt das Standard-Video-Element
  
  ratio = width / video.width;
  
  // Starte Hand-Erkennung
  handpose.detectStart(video, gotHands);
}

/**
 * Hauptzeichnungs-Loop
 */
function draw() {
  background(0);

  push();
  translate(width, 0);
  scale(-1, 1);

  if (isModelReady) {
    // Festes Dreieck in der Mitte, Größe abhängig vom Abstand zur Kamera
    if (hands.length > 0) {
      const hand = hands[0]; // nur die erste Hand für die Größenbestimmung

      // Schätze Abstand über Handbreite (Keypoints 5 und 17)
      const p5 = hand.keypoints[5];
      const p17 = hand.keypoints[17];
      const palmWidth = dist(p5.x * ratio, p5.y * ratio, p17.x * ratio, p17.y * ratio);

      // Map: 
      const size = constrain(map(palmWidth, 40, 220, 80, 360), 60, 400);
      const baseRadius = size / 2;

      const t = calculateTrianglePos(baseRadius);
      fill(255, 0, 0, 150);
      noStroke();
      triangle(
        width / 2 + t.ax, height / 2 + t.ay,
        width / 2 + t.bx, height / 2 + t.by,
        width / 2 + t.cx, height / 2 + t.cy
      );
    } else {
      // Standardgröße, wenn keine Hand erkannt wird
      const baseRadius = 120 / 2;
      const t = calculateTrianglePos(baseRadius);
      fill(255, 0, 0, 150);
      noStroke();
      triangle(
        width / 2 + t.ax, height / 2 + t.ay,
        width / 2 + t.bx, height / 2 + t.by,
        width / 2 + t.cx, height / 2 + t.cy
      );
    }

    drawHandPoints();
    for (let i = 0; i < hands.length; i++) {
      let hand = hands[i];
      
      // Definiere die Verbindungen zwischen Keypoints (Knochen der Hand)
      const connections = [
        [0, 1], [1, 2], [2, 3], [3, 4],       // Daumen
        [0, 5], [5, 6], [6, 7], [7, 8],       // Zeigefinger
        [0, 9], [9, 10], [10, 11], [11, 12],  // Mittelfinger
        [0, 13], [13, 14], [14, 15], [15, 16],// Ringfinger
        [0, 17], [17, 18], [18, 19], [19, 20] // Kleiner Finger
      ];
      
      // Zeichne die Verbindungen zwischen Keypoints
      stroke(200, 200, 200); // Hellgraue Linien
      strokeWeight(2);
      for (let conn of connections) {
        let p1 = hand.keypoints[conn[0]];
        let p2 = hand.keypoints[conn[1]];
        line(p1.x * ratio, p1.y * ratio, p2.x * ratio, p2.y * ratio);
      }
      
      // Durchlaufe alle 21 Keypoints einer Hand
      for (let j = 0; j < hand.keypoints.length; j++) {
        let keypoint = hand.keypoints[j];
        
        // Fingerspitzen sind die Keypoints: 4, 8, 12, 16, 20
        let isFingertip = [4, 8, 12, 16, 20].includes(j);
        
  
        if (isFingertip) {
          // Fingerspitzen in rot
          fill(255, 0, 0);
          noStroke();
          circle(keypoint.x * ratio, keypoint.y * ratio, 20); // Größere Fingerspitzen
        } else {
          // Andere Keypoints in olivgrün
          fill(128, 128, 0);
          noStroke();
          circle(keypoint.x * ratio, keypoint.y * ratio, 10); // Normale Größe
        }
        
        noStroke();
    circle(keypoint.x * ratio, keypoint.y * ratio, 10);
  }
}
  // HIER KÖNNEN EIGENE/Andere ZEICHNUNGEN Oder Interaktionen HINZUGEFÜGT WERDEN
    
  }
  
  pop();
}

// Hilfsfunktion: Positionen eines gleichseitigen Dreiecks (relativ zu (0,0))
function calculateTrianglePos(baseRadius) {
  return {
    cx: cos(30) * baseRadius,
    cy: sin(30) * baseRadius,

    bx: cos(150) * baseRadius,
    by: sin(150) * baseRadius,

    ax: cos(270) * baseRadius,
    ay: sin(270) * baseRadius
  };
}

/**
 * Callback-Funktion für HandPose-Ergebnisse
 * Wird automatisch aufgerufen, wenn neue Hand-Daten verfügbar sind
 * 
 * @param {Array} results - Array mit erkannten Händen
 */
function gotHands(results) {
  hands = results;
  
  // Setze Flag, sobald erste Hand erkannt wurde
  if (hands.length > 0) {
    isModelReady = true;
  }
}

/**
 * Zeichnet alle erkannten Hand-Keypoints
 * Jede Hand hat 21 Keypoints (siehe Kommentar oben)
 */
function drawHandPoints() {
  // Durchlaufe alle erkannten Hände (normalerweise max. 2)
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    
    // Durchlaufe alle 21 Keypoints einer Hand
    for (let j = 0; j < hand.keypoints.length; j++) {
      let keypoint = hand.keypoints[j];
      
      // Zeichne Keypoint als grüner Kreis
      fill(0, 255, 0);
      noStroke();
      circle(keypoint.x * ratio, keypoint.y * ratio, 10);
    }
  }
}

