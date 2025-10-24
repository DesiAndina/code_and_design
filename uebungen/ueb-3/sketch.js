function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  const gray = map(mouseX, 0, width, 0, 255, true);      // Grau über X
  const mix  = map(mouseY, 0, height, 0, 1, true);       // Mischanteil über Y
  
  const base   = color(gray, gray, gray);                // Ausgang: Grau
  const accent = color(0, 180, 255);                     // Ziel: z.B. Cyan/Blau
  const bg     = lerpColor(base, accent, mix);           // Mischung abhängig von Y
  
  background(bg);
}