var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

var feed,lastFed


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feedthedog=createButton("Feed Dog");
  feedthedog.position(900,95);
  feedthedog.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  fedTime= database.ref('FeedTime');
  fedTime.on("value", function(data)
  {
    lastFed=data.val();
  })

  
 
  if(lastFed>=12)
  {fill("black")
    textSize(30)
    text("Last Feed: "+ lastFed%12 + "PM", 300,30)
  }
  else if(lastFed==0)
  {textSize(30)
    fill("black")
    text("Last Feed: 12 AM", 300,30);
  }
  else
  {textSize(30)
    fill("black")
    text("Last Feed: " +lastFed +"AM", 300,30);
  }


 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update(
    {
      Food:foodObj.getFoodStock(),
      FeedTime:hour()
    }
  )

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
