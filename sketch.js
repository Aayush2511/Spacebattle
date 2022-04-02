var PLAY = 1;
var END = 0;
var gameState = PLAY;
var bow , arrow,  background, redB, pinkB, greenB ,blueB ,arrowGroup;
var bowImage, arrowImage, green_balloonImage, red_balloonImage, pink_balloonImage ,blue_balloonImage, backgroundImage;
var inviblock
var score =0;
var reimg, re
var gameo, gameoimg
function preload(){
  
  backgroundImage = loadImage("pngegg.png");
  
  arrowImage = loadImage("1bul.png");
  bowImage = loadImage("ob1.png");
  red_balloonImage = loadImage("ob2.png");
  green_balloonImage = loadImage("hero.png");
  pink_balloonImage = loadImage("ob3.png");
  blue_balloonImage = loadImage("ob4.png");
  reimg = loadImage("re1.png")
  gameoimg = loadImage("gameo.png")
}



function setup() {
  createCanvas(400, 400);
  
  //creating background
  scene = createSprite(300,00,300,409);
  scene.addImage(backgroundImage);
  scene.scale = 0.5
  
  // creating bow to shoot arrow
  bow = createSprite(200,370,20,50);
  bow.addImage(bowImage); 
  bow.scale = 0.3;

  //restart
  re = createSprite(200,250,10,10)
  re.addImage(reimg);
  re.scale= 0.03
  re.visible=false

  //gameover
  gameo= createSprite(200,150,10,10)
  gameo.addImage(gameoimg)
  gameo.scale=0.5
  gameo.visible=false

  //invisible block
  inviblock = createSprite(200,407,400,30)
  inviblock.visible=false;
  
  score = 0  
  redB= new Group();
  greenB= new Group();
  blueB= new Group();
  pinkB= new Group();
  arrowGroup= new Group();
 
  bow.setCollider("circle",0,0,30);
}

function draw() {
  bow.debug = false
 
 background(0);
 if(gameState === PLAY){

  // moving ground
    scene.velocityY = 3

    if (scene.y > 409){
      scene.y = 30;
    }
  
  //moving bow
  if(keyDown("left")){
    bow.x = bow.x-(6*1+score/2)
  }
  if(keyDown("right")){
    bow.x = bow.x+(6*1+score/2)
  }
  
   // release arrow when space key is pressed
  if (keyDown("space")) {
    createArrow();
    bull1();
    }
  
  
  //creating continous enemies
  var select_balloon = Math.round(random(1,4));
  
  if (World.frameCount % 100 == 0) {
    switch(select_balloon ){
      case 1: redBalloon();
      break;
      case 2:blueBalloon();
      break;
      case 3:pinkBalloon();
      break;
      case 4:greenBalloon();
      break;
      default:break;
    }
  }

 
  if (redB.isTouching(inviblock) || redB.isTouching(bow)) 
  {
    redB.destroyEach();
    gameState=END; 
   }
   if (greenB.isTouching(inviblock) || greenB.isTouching(bow)) 
  {
    greenB.destroyEach();
    gameState=END; 
   }
   if (pinkB.isTouching(inviblock) || pinkB.isTouching(bow)) 
  {
    pinkB.destroyEach();
    gameState=END; 
   }
   if (blueB.isTouching(inviblock) || blueB.isTouching(bow)) 
  {
    blueB.destroyEach();
    gameState=END; 
   }
 
  if (gameState === END) {
    
  bow.destroy();
  scene.velocityY = 0;
  gameo.visible = true
  re.visible=true
  }

 

  
//score incrementation
if (arrowGroup.isTouching(redB)) {
  redB.destroyEach();
  arrowGroup.destroyEach();
  score=score+3;
}

 if (arrowGroup.isTouching(greenB)) {
  greenB.destroyEach();
  arrowGroup.destroyEach();
  score=score+2;
}



  if (arrowGroup.isTouching(blueB)) {
   blueB.destroyEach();
   arrowGroup.destroyEach();
   score=score+1;
 }

  if (arrowGroup.isTouching(pinkB)) {
  pinkB.destroyEach();
  arrowGroup.destroyEach();
  score=score+1;
}
 }
  
//if(mousePressedOver(re))
//{
//reset()
//}

  drawSprites();
  textSize(15)
  text("Score: "+ score, 300,50);
}


function redBalloon() {
  var red = createSprite(Math.round(random(30, 390)),0, 10, 10);
  red.addImage(red_balloonImage);
  red.velocityY = (4*1+score/2);
  red.lifetime = 150;
  red.scale = 0.3;
  redB.add(red);
}

function blueBalloon() {
  var blue = createSprite(Math.round(random(30, 390)),0, 10, 10);
  blue.addImage(blue_balloonImage);
  blue.velocityY = (4*1+score/2);
  blue.lifetime = 150;
  blue.scale = 0.3;
  blueB.add(blue);
}

function greenBalloon() {
  var green = createSprite(Math.round(random(30, 390)),10, 10, 10);
  green.addImage(green_balloonImage);
  green.velocityY = (4*1+score/2);
  green.lifetime = 150;
  green.scale = 0.3;
  greenB.add(green);
}

function pinkBalloon() {
  var pink = createSprite(Math.round(random(30, 390)),0, 10, 10);
  pink.addImage(pink_balloonImage);
  pink.velocityY = (4*1+score/2);
  pink.lifetime = 150;
  pink.scale = 0.3
  pinkB.add(pink);
}


// Creating  arrows for bow
 function createArrow() {
  var arrow= createSprite(60, 100, 60, 10);
  arrow.addImage(arrowImage);
  arrow.y = 350;
  arrow.x=bow.x-30;
  arrow.velocityY = -4;
  arrow.lifetime = 100;
  arrow.scale = 0.3;
  arrowGroup.add(arrow);
   
}
function bull1() {
  var arrow= createSprite(60, 100, 60, 10);
  arrow.addImage(arrowImage);
  arrow.y = 350;
  arrow.x=bow.x+20;
  arrow.velocityY = -4;
  arrow.lifetime = 100;
  arrow.scale = 0.3;
  arrowGroup.add(arrow);
   
}

function reset(){
  re.visible = false
  gameo.visible = false
  score = 0
  gameState = PLAY
  bow.visible = true


}

