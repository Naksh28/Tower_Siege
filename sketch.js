const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;

var engine, world;
var box1, pig1;
var backgroundImg,platform;
var gameState = "start";
var score = 0;

function preload() {
    bgChange();
}

function setup(){
    var canvas = createCanvas(1200,600);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 505, 300, 250);

    p1 = new Pig(900, 550);
    p2 = new Pig(970, 550);
    p3 = new Pig(1040, 550);
    p4 = new Pig(1110, 550);
    p5 = new Pig(950, 480);
    p6 = new Pig(1020, 480);
    p7 = new Pig(1090, 480);
    p8 = new Pig(980, 410);
    p9 = new Pig(1050, 410);

    bird = new Bird(200,225);

    slingshot = new Slingshot(bird.body, {x:200, y:225});

}

function draw(){
    if (backgroundImg){
    background(backgroundImg);
    }
    Engine.update(engine);

    bgChange();

    stroke("white");
    textSize(30);
    text("Score= " + score, 1000, 50);


    p1.display();
    p2.display();
    p3.display();
    p4.display();
    p5.display();
    p6.display();
    p7.display();
    p8.display();
    p9.display();
    p1.score();
    p2.score();
    p3.score();
    p4.score();
    p5.score();
    p6.score();
    p7.score();
    p8.score();
    p9.score();

    slingshot.display();

    platform.display();
}

function mouseDragged (){
    if (gameState != "flying"){
    Matter.Body.setPosition(bird.body, {x:mouseX, y:mouseY});
    }
}

function mouseReleased (){
    slingshot.fly();
    gameState = "flying";
}

function keyPressed(){
    if (keyCode === 32 && gameState === "flying"){
    Matter.Body.setPosition(bird.body, {x:200, y:225});
    slingshot.attach(bird.body);
    bird.trajectory = [];
    gameState = "start";
    }
}

async function bgChange(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var rJSON = await response.json();
    var dateTime = rJSON.datetime;
    var hour = dateTime.slice(11, 13);
    console.log(hour);
    if (hour>5 && hour<19){
        bg = "sprites/bg.png";
    }
    else
        bg = "sprites/bg2.jpg";
backgroundImg = loadImage(bg);
}