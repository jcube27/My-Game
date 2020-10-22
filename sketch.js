
//give behavior to player(left and right)

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var player;
var track, trackImage;
var playerImg;
var mudImg;
var bottleImg;
var boxImg;
var plasticBagimg;

var mudGroup, litterGroup;

var score = 0;

function preload(){
    trackImage = loadImage("track.jpg");
    playerImg = loadImage("player.png");
    mudImg = loadImage("mud.png");
    bottleImg = loadImage("water bottle.png");
    boxImg = loadImage("cardboard box.png");
    plasticBagimg = loadImage("plastic bag.png");
}

function setup(){
    createCanvas(400,400);

    track = createSprite(200,200,400,800);
    track.addImage("track", trackImage);
    //  track.y = track.height/2
    track.velocityY = 5;

    player = createSprite(200,360,20,40);
    player.addImage("player", playerImg);
    player.scale = 0.02;

    mudGroup = new Group();
    litterGroup = new Group();
}

function draw(){
    background(224,255,255);

    if(gameState === PLAY){
        track.velocityY = 5+(score/10)*2;
        if(track.y > 400){
            track.y = 200;
        }
        if(keyDown(RIGHT_ARROW)){
            player.x = player.x+120;
        }
        if(keyDown(LEFT_ARROW)){
            player.x = player.x-120;
        }
        if(player.x >= 400){
            player.x = 320;
        }
        if(player.x <= 0){
            player.x = 80;
        } 
        spawnObstacles(); 
        spawnMud();

        if(litterGroup.isTouching(player)){
            litterGroup.destroyEach();
            score = score + 1;
        }


        
        if(mudGroup.isTouching(player)){
            gameState = END;
        }
    }
    else if(gameState === END){
        track.velocityY = 0;
        litterGroup.setVelocityYEach(0);
        mudGroup.setVelocityYEach(0);

        litterGroup.setLifetimeEach(-1);
        mudGroup.setLifetimeEach(-1);

        if(keyDown("space")){
            gameState = PLAY;

            litterGroup.destroyEach();
            mudGroup.destroyEach();

            score = 0;
        }
    }

    drawSprites();
    textSize(20);
    fill("white");
    text("Score: " + score, 310, 20); 
    
    if(gameState === END){
        textSize(20)
        text("Game Over", 170,200);
        text("Please do not litter \n and remember to recycle", 120, 230)
        text("Press Space to Restart", 130, 290)
    }  
    console.log(track.velocityY);
}

function spawnObstacles(){
    if(World.frameCount%100 === 0){
        var litter = createSprite(200,0,50,50);
        var positions = [80,200,320];
        var random_index = Math.floor(Math.random()*positions.length);
        litter.x = positions[random_index];
        litter.velocityY = 5+(score/10)*2;
        litter.lifetime = 80;

        litter.scale = 0.1;

        var rand = Math.round(random(1,3));

        switch(rand){
            case 1: litter.addImage(plasticBagimg);
                    litter.scale = 0.02;
                    break;
            case 2: litter.addImage(bottleImg);
                    break;
            case 3: litter.addImage(boxImg);
                    break;
            default: break;
        } 
        litterGroup.add(litter); 
    }
}
function spawnMud() {
    if(World.frameCount%60 === 0){
        var mud = createSprite(200,0,50,50);
        mud.addImage("mud", mudImg);
        mud.x = Math.round(random(80,320));
        mud.velocityY = 5+(score/10)*2;
        mud.lifetime = 80;
        mud.scale = 0.1;
        mudGroup.add(mud);    
    }
}