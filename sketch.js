const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

var engine, world;
var canvas,islandimage,launcherimage;
var backgroundImg;
var island;
var launcher,launcherAngle;
var rock,rockImage;
var rocks = [];
var numberOfRocks = 15;
var target1,target2;



var score=0;

function preload() {  
  backgroundImg=loadImage("background.png");
  launcherimage=loadImage("launcher.png");
  rockImage=loadImage("rock.png");
}

function setup() {
  createCanvas(1900,900);

  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES)
  angle = 15

  var options = {
    isStatic:true
  };
  
  launcher=new Launcher(250,300,150,150,angle);

  rock=new Rock(340,300,90,90,90);


  target1=new Target(width-300,335,50,200);
  target2=new Target(width-550,height-300,50,210);
}


function draw() {

  background(backgroundImg);;

  Engine.update(engine);

  rock.display();

  target1.display();
  target2.display();

  launcher.display();

  for (var i = 0; i < rocks.length; i++) {
    if (rocks[i] !== undefined) {
      rocks[i].display();

      d1 = dist(rocks[i].body.position.x,rocks[i].body.position.y, target1.body.position.x,target1.body.position.y)
      if(d1<=100)
      {
        console.log("collision");
      }

      var target1Collision = Matter.SAT.collides(
        target1.body,
        rocks[i].body
      );

      var target2Collision = Matter.SAT.collides(
        target2.body,
        rocks[i].body
      );

      if (target1Collision.collided || target2Collision.collided) {
        console.log("yes");
      }

      if(target1Collision.collided||target2Collision.collided) {
        score+=5;
      }
    }
  }
    fill("#FFFF");
    textAlign("center");
    textSize(35);
    text("ROCK TOSS", width / 2, 100);
  
    fill("#FFFF");
    textAlign("center");
    textSize(30);
    text("Rocks Remaining : " + numberOfRocks, 200, 100);
  
    fill("#FFFF");
    textAlign("center");
    textSize(30);
    text("Score:" +score,350,390) 
    
    if (numberOfRocks == 0) {
      gameOver();
    }
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    if (numberOfRocks > 0) {
      var posX = launcher.body.position.x;
      var posY = launcher.body.position.y;
      var angle = launcher.body.angle;

      var rock = new Rock(posX, posY, 100, 20, angle);

      rock.trajectory = [];
      Matter.Body.setAngle(rock.body, angle);
      rocks.push(rock);
      numberOfRocks -= 1;
    }
  }
}

function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    if (rocks.length) {
      var angle = launcher.body.angle;
      rocks[rocks.length - 1].shoot(angle);
    }
  }
}

function gameOver() {
  swal(
    {
      title: 'Game Over',
      text:"Thank You For Playing!",
      imageUrl:
        "https://raw.githubusercontent.com/vishalgaddam873/PiratesInvision/main/assets/board.png",
      imageSize:"150x150",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if(isConfirm) {
        location.reload();
      }
    }
  );
}