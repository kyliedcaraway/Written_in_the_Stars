/*
Emma Brito and Kylie Caraway
Digital Futures 2017
Creation and Computation Course

-Resources-
Referenced Star Field: https://codepen.io/maxpowa/pen/VKXmrW
Gyroscope Code: http://coursescript.com/notes/interactivecomputing/mobile/gyroscope/
Referenced p5js.org for assistance with other portions of code
 */



// Variables //
var stars = [],
    WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight,
    FPS = 24, // Frames per second
    NUM_STARS = WIDTH; // Number of stars

var apha, beta, gamma; //// for gyroscope
var xpos, ypos; /// for gyroscope

var img; //// constellation image variable


// SETUP //

function setup() {
  createCanvas(WIDTH, HEIGHT);
img =loadImage("assets/Libraphoto.jpg");


  // Push stars to array
  for (var i = 0; i < NUM_STARS; i++) {
    stars.push({
      x: 0,
      y: 0,
      offset: Math.random() * 360,

      // Weight orbit a little to be outside origin
      orbit: (Math.random()+0.015) * max(WIDTH, HEIGHT),
      radius: Math.random() * 2,
      vx: Math.floor(Math.random() * 20) - 5,
      vy: Math.floor(Math.random() * 20) - 5
    });
  }

  frameRate(FPS);
  loop();

  // default values for gyroscope
 xpos = 200;
 ypos = 200;
 apha = 0;
 beta = 0;
 gamma = 0;


}



// DRAW //

function draw() {
  background(0);// background color

  if (beta >= 80){ ///if phone is rotated on X axis

  imageMode(CENTER);
  image(img, (WIDTH/2), (HEIGHT/2), (img.width/2), (img.height/2)); // create constellation. Center and resize

  }



  push();
  noFill();
  colorMode(RGB, 255, 255, 255, 1); /// background color
  stroke(223,223,223, 1); /// stars color
  strokeCap(ROUND);
  strokeWeight(2);
  for (var i = 0, x = stars.length; i < x; i++) {
    var s = stars[i];
    ellipse(s.x, s.y, 3, 3); //// draw starfield & size
  }
  pop();
  update();


}



// Function Update for Star Field //

function update() {
  var originX = WIDTH / 2; /// centers star rotations to middle
  var originY = HEIGHT / 2;

  for (var i = 0, x = stars.length; i < x; i++) {
    var s = stars[i];


    var rad = (frameCount * (1/(s.orbit*2 + s.offset)) + s.offset) % TAU;
    s.x = (originX + cos(rad)*(s.orbit*2));
    s.y = (originY + sin(rad)*(s.orbit));
  }
}



// Accelerometer Data //
window.addEventListener('deviceorientation', function(e)
{
  apha = e.alpha;
  beta = e.beta;
  gamma = e.gamma;
});




//Resizing to fit various screens//
function windowResized() {
    WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight,
    resizeCanvas(WIDTH, HEIGHT);
}
