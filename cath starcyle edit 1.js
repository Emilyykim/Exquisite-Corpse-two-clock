let counter = 0;
let imgs = [];
let currentIndex = 0;
let imgWidth;
let imgHeight;
let spacing = 50;
let totalWidth;
let blackhole, mss, nebula, supermassive, supernova;
let displayCounter = 0; // Counter to keep track of displayNextImage calls
let imgPositions = [];
let movementSpeed = 2;

function preload() {
  blackhole = loadImage('images/blackhole.png');
  mss = loadImage('images/mss.png');
  nebula = loadImage('images/nebula.png');
  supermassive = loadImage('images/supermassive.png');
  supernova = loadImage('images/supernova.png');

  imgs.push(nebula);
  imgs.push(mss);
  imgs.push(supermassive);
  imgs.push(blackhole);
  imgs.push(supernova);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);
  background(22, 12, 41);
  imageMode(CENTER);

  imgWidth = windowWidth / 6;  // Width of each image in relation to window size
  imgHeight = imgWidth; // Creates symmetrical images

  for (let i = 0; i < imgs.length; i++) {
    imgPositions.push({
      x: (windowWidth / 10) + i * (imgWidth + spacing),
      y: windowHeight / 2,
      direction: random([-1, 1])
    });
  }

  setInterval(displayNextImage, 2000);
}

function draw() {
  background(22, 12, 41, 25); // Slightly transparent background for a trailing effect

  // Draw moving stars
  if (frameCount % 2 === 0) {
    drawStar(random(windowWidth), random(windowHeight), 5, 4, 2, 0);
  }

  // Move and draw images
  for (let i = 0; i < imgs.length; i++) {
    let pos = imgPositions[i];
    pos.x += pos.direction * movementSpeed;

    // Reverse direction if the image hits the screen edge
    if (pos.x < imgWidth / 2 || pos.x > windowWidth - imgWidth / 2) {
      pos.direction *= -1;
    }

    image(imgs[i], pos.x, pos.y, imgWidth, imgHeight);
  }
}

function displayNextImage() {
  displayCounter++; // Increment the display counter (number of images on screen)

  if (displayCounter >= 5) { // Check if it has been called 5 times
    setTimeout(resetCanvas, 2000); // Reset the canvas after a delay of 2 seconds
    displayCounter = 0; // Reset the display counter
  }
}

function resetCanvas() {
  background(22, 12, 41);
  displayCounter = 0;
}

function drawStar(x, y, n, outerRadius, innerRadius, rotation) { // This will draw the stars randomly
  noStroke();
  fill(190);
  let theta = TAU / n;
  beginShape();
  for (let i = 0; i < n; i++) {
    let x1 = x + cos(i * theta + rotation) * outerRadius;
    let y1 = y + sin(i * theta + rotation) * outerRadius;
    vertex(x1, y1);
    let x2 = x + cos((i + 0.5) * theta + rotation) * innerRadius;
    let y2 = y + sin((i + 0.5) * theta + rotation) * innerRadius;
    vertex(x2, y2);
  }
  endShape(CLOSE);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(22, 12, 41);
}