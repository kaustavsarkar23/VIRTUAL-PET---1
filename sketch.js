var dog, dogImage;
var dogImage1;
var database;
var foodStock, foodS;

function preload()
{
  dogImage1 = loadImage("images/dogImg1.png");
  dogImage = loadImage("images/dogImg.png")
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  
  dog = createSprite(250, 300, 10, 10);
  dog.addImage(dogImage);
  dog.scale = 0.15;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  textSize(20);
}


function draw() {  
  background(46, 139, 87);



  if(keyWentDown(UP_ARROW)) {
    writeStock(foodStock);
    dog.addImage(dogImage1);
  }

  drawSprites();
  fill(255, 255, 254);
  stroke("black");
  text("Food remaining : "+foodStock, 170, 200);
  textSize(13);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!", 70, 30);

}
function readStock(data) {
  foodStock = data.val();
}

function writeStock(x) {

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}
