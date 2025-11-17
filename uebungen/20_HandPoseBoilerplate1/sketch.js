/**
 * HandPose Boilerplate mit ml5.js
 * 
 * Dieses Sketch erkennt Hände über die Webcam und zeichnet die erkannten Keypoints.
 * Es dient als Ausgangspunkt für eigene Hand-Tracking-Projekte.
 * 
 * Dokumentation: https://docs.ml5js.org/#/reference/handpose
 * 
 * Jede Hand hat 21 Keypoints (0-20):
 * - 0: Handgelenk
 * - 1-4: Daumen
 * - 5-8: Zeigefinger
 * - 9-12: Mittelfinger
 * - 13-16: Ringfinger
 * - 17-20: Kleiner Finger
 */

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
  
  // Webcam einrichten
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide(); // Versteckt das Standard-Video-Element
  
  // Berechne Skalierungsfaktor für Video-zu-Canvas-Anpassung
  ratio = width / video.width;
  
  // Starte Hand-Erkennung
  handpose.detectStart(video, gotHands);
}

/**
 * Hauptzeichnungs-Loop
 */
function draw() {
  background(0);

  // Spiegle die Darstellung horizontal (für intuitivere Interaktion)
  push();
  translate(width, 0);
  scale(-1, 1);

  //Zeige das Video (optional)
  //image(video, 0, 0, video.width * ratio, video.height * ratio);
  
  // Zeichne nur, wenn das Modell bereit ist und Hände erkannt wurden
  if (isModelReady) {
    
    // ROTE ELLIPSE DIE DER HAND FOLGT
    for (let i = 0; i < hands.length; i++) {
      let hand = hands[i];
      
      // Zentrum der Hand (Mittelfinger-Basis - Keypoint 9)
      let center = hand.keypoints[9];

      // Schätze Abstand zur Kamera über Handbreite (Palmbasis: Keypoints 5 und 17)
      const p5 = hand.keypoints[5];
      const p17 = hand.keypoints[17];
      const palmWidth = dist(p5.x * ratio, p5.y * ratio, p17.x * ratio, p17.y * ratio);

      // Map: größere Handbreite => größere Ellipse
      const size = constrain(map(palmWidth, 40, 220, 80, 360), 60, 400);

      // Zeichne rote Ellipse mit dynamischer Größe
      fill(255, 0, 0, 150);
      noStroke();
      ellipse(center.x * ratio, center.y * ratio, size, size);
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

