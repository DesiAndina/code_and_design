function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0, 10); // Reduced opacity for trail effect
  noFill();
  stroke(255);

  let spacing = 100; // Reduced spacing for tighter pattern
  let baseSize = 40; // Base size for triangles
  
  for(let x = 0; x < width + spacing; x += spacing) {
    for(let y = 0; y < height + spacing; y += spacing * 0.866) { // Adjusted for honeycomb pattern
      // Calculate attraction to mouse
      let dx = mouseX - x;
      let dy = mouseY - y;
      let distanz = dist(mouseX, mouseY, x, y);
      let attraction = map(distanz, 0, 200, 20, 0);
      
      // Apply subtle attraction
      let drawX = x + dx * attraction * 0.01;
      let drawY = y + dy * attraction * 0.01;
      
      // Offset every second row
      if (floor(y / (spacing * 0.866)) % 2 === 0) {
        drawX += spacing / 2;
      }
      
      // Alternate triangle orientation
      let shouldInvert = (floor(x / spacing) + floor(y / (spacing * 0.866))) % 2 === 0;
      
      if (shouldInvert) {
        triangle(
          drawX, drawY + baseSize,
          drawX - baseSize, drawY - baseSize,
          drawX + baseSize, drawY - baseSize
        );
      } else {
        triangle(
          drawX, drawY - baseSize,
          drawX - baseSize, drawY + baseSize,
          drawX + baseSize, drawY + baseSize
        );
      }
    }
  }
}
 