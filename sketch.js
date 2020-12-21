//making a variable for ball and position
var ball ,database;
var position;

function setup(){

   //adding database
    database = firebase.database();
    //console.log(database);

    createCanvas(500,500);
    
    //creating ball sprite and giving it color
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    //reading data
    // step 1 : .ref() is used to refer to the location of the database value we care about.
    var ballPositionRef = database.ref('ball/position'); // {x : , y :}

    // step 2 : .on() creates a listener which keeps listening to the changes in the database
    // --> Everytime a change in the database values of position (reference) happens,
    // the readPosition function is called

    //If there is any error in reading the values in the database, 
    //the showError function is called
    ballPositionRef.on("value",readPosition,showError);

}

function draw(){
    background("white");

    if(position !== undefined){
        if(keyDown(LEFT_ARROW)){
            writePosition(-1,0);
          }
          else if(keyDown(RIGHT_ARROW)){
            writePosition(1,0);
          }
          else if(keyDown(UP_ARROW)){
            writePosition(0,-1);
          }
          else if(keyDown(DOWN_ARROW)){
            writePosition(0,+1);
          }
    
          drawSprites();
    }
 
}

// to update value in database .set({}) is used (curly bracket is inside the round bracket)
function writePosition(x,y){
    database.ref('ball/position').set({
       x : position.x + x,
       y : position.y + y
    })
}

function readPosition(data){
    position = data.val();
    console.log(position.x); //250
    console.log(position.y); //150

    ball.x = position.x;
    ball.y = position.y;

}

function showError(){
    console.log("Error in writing to the database");
}





