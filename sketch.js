var backImage,backgr;
var player, player_running;
var ground,ground_img;
var obstacle, obstacleImage, obstacleGroup;
var banana, bananaImage, bananaGroup;
var score= 0;
var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage= loadImage("banana.png");
  obstacleImage= loadImage("stone.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,350,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
  bananaGroup= new Group ();
  obstacleGroup= new Group ();
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    
    for (var i = 0; i < bananaGroup.length; i++) {
    if (bananaGroup.get(i).isTouching(player)){
    score= score+2;
    bananaGroup.get(i).destroy();
    player.scale +=0.01;
  }
}
    if (obstacleGroup.isTouching(player)){
      gameState=END;
    }
   spawnBananas();
   spawnObstacles();
  }
  drawSprites();
  if(gameState===END){
    backgr.velocityX=0;
    player.visible=false;

    obstacleGroup.destroyEach();
    bananaGroup.destroyEach();

    textSize(52);
    stroke("red");
    fill("red");
    text("Game Over!",300,220);
  }
  //displaying score
    fill(255);
    stroke("white");
    textSize (32);
    text ("Score: "+score,80,70);  
}
function spawnBananas () {
  if (frameCount%80===0) {
    banana= createSprite (800,120,10,10);  
    banana.addImage ("bananaimage", bananaImage);
    banana.scale= 0.06;
    banana.velocityX= -3;
    banana.y=Math.round(random(20,220));
    //adding lifetime to bananas
      banana.lifetime= 250;
    
    //adding banana to banana group
      bananaGroup.add(banana);
  }
}

//function for obstacles
function spawnObstacles () {
  if (frameCount%80===0) {
    obstacle= createSprite (800,370,10,10);
    obstacle.addImage ("obstacleimage", obstacleImage);
    obstacle.scale= 0.1;
    obstacle.velocityX= -4;
    
    //adding obstacle to obstacle group
      obstacleGroup.add(obstacle);
  }
}