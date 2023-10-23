/*
Authors: Hussain Attyah, Zaki Ilyas, Krishna Priya, & Amber Smith
*/

function SaveTheEarth() {
  
  //these are the variables used in this file
  //they change the difficulty, wave, speed of the obj
  //some of them keep track of the frames and count a timer
  //and some are responsible for GUI checks
  let difficulty = 1;
  let diffText = 'Easy';
  let wave = 1;
  let speed = 1;
  let spawnObjTime;
  let timer;
  let health = 360;
  let currentAsteroid = 0;
  let asteroids;
  let score = 0;
  let onButton = false;
  let STEcanvas;
  let STEscene;
  let targetFrame;
  let timeFrame;
  let tempTime;
  
  //enter function is called each time the scene is run
  this.enter = function() {
    
    //creates canvas obj
    STEcanvas = createCanvas(1280, 720);
    background(220);
    
    // these variables are reset to the game beginning state.
    //some of these variables are also initialized here
    onButton = false;
    finalScore = 0;
    health = 360;
    score = 0;
    asteroids = [];
    currentAsteroid = 0;
    STEscene = 1;
    targetFrame = 0;
    timeFrame = 0;
    wave = 1;
    speed = round((wave * 0.5) * (difficulty * 0.75));
    spawnObjTime = round((60 * 3) / (wave * 0.5));
    tempTime = null;
    
    //responsible for showing a visual feedback as a notification
    //they change the y value of the text and box
    y = -101;
    dy = 0;
    showNotification = null;
    
    //tells the program we are in the save the earth
    gameType = 2;
  }

  this.draw = function() {
    
    //the main draw scene that determines what is shown on the screen
    textFont(mainFont);
    if (STEscene == 1) {
      this.gameMenu();
    }
    if (STEscene == 2) {
      this.instructions();
    }
    if (STEscene == 3) {
      this.saveEarthGame();
    }
    if (STEscene == 4) {
      this.sceneManager.showScene(menu);
    }
    if (STEscene == 5) {
      finalScore = score;
      this.sceneManager.showScene(GameOver);
    }

  }

  //draws the game menu
  this.gameMenu = function() {
    
    //removes any previous elements
    removeElements();
    STEcanvas.mouseOver(this.allowButtonAudio);
    
    //draws background
    image(backgroundPicture, 0, 0, width, height, 0, 0, backgroundPicture.width, backgroundPicture.height);
    image(earthImage, 385, 165, earthImage.width, earthImage.height);
    
    //a black box
    fill(0);
    stroke("white");
    strokeWeight(2);
    rect(230, 250, 830, 120, 10);
    noStroke();
    fill(255);
    
    //title
    textSize(120);
    text("Save The Earth", 240, 350);
    
    //play button
    playButton = createButton('Play');
    playButton.style('background-color', "gray");
    playButton.style('color', 'white');
    playButton.style('font-size', '26px');
    playButton.style('font-family', 'Chakra Petch');
    playButton.style('border-radius', buttonCornerRadius+'px');
    playButton.size(200,70);
    playButton.position(540, 400);
    playButton.mousePressed(this.goToInstructions);
    playButton.mouseOver(this.playButtonAudio);
    
    //difficulty button
    diffButton = createButton('Difficulty: '+diffText);
    diffButton.style('background-color', "gray");
    diffButton.style('color', 'white');
    diffButton.style('font-size', '26px');
    diffButton.style('font-family', 'Chakra Petch');
    diffButton.style('border-radius', buttonCornerRadius+'px');
    diffButton.size(200,70);
    diffButton.position(540, 480);
    diffButton.mousePressed(this.changeDifficulty);
    diffButton.mouseOver(this.playButtonAudio);

    //back button
    backButton = createButton('Back');
    backButton.style('background-color', "gray");
    backButton.style('color', 'white');
    backButton.style('font-size', '26px');
    backButton.style('font-family', 'Chakra Petch');
    backButton.style('border-radius', buttonCornerRadius+'px');
    backButton.size(200,70);
    backButton.position(540, 560);
    backButton.mousePressed(this.goToMainMenu);
    backButton.mouseOver(this.playButtonAudio);
  }
  
  //draws instructions
  this.instructions = function() {
    removeElements();
    
    //stops menu music
    if (menuMusic.isPlaying()) {
      menuMusic.stop();
    }
    
    //draws background
    image(backgroundPicture, 0, 0, width, height, 0, 0, backgroundPicture.width, backgroundPicture.height);
    
    //highlights the text 'INSTRUCTIONS'
    fill(0);
    stroke("white");
    strokeWeight(2);
    rect(230, 10, 830, 100, 10);
    noStroke();
    //text
    fill("white");
    textSize(110);
    text("INSTRUCTIONS", 275, 100);
    
    //plays the instructions as audio
    if(!instructionsSaveEarth.isPlaying()) {
      instructionsSaveEarth.setVolume(1*volumeMultiplier);
      instructionsSaveEarth.play();
    }
    
    //the instructions are written as text as well
    let instructText = "The Earth is in trouble! Asteroids are crashing down. Type the letter on the asteroid while your cursor hovers over them in order to save the Earth.";
    
    //highlights the instructions text
    fill(0);
    stroke("white");
    strokeWeight(2);
    rect(100, 250, 1150, 200, 10);
    noStroke();
    //text
    fill("white");
    textSize(50);
    textWrap(WORD);
    textAlign(CENTER);
    text(instructText, 100, 300, 1150);
    textAlign(LEFT);
    
    //the play button -> draws the game
    playButton = createButton('Play');
    playButton.style('background-color', "gray");
    playButton.style('color', 'white');
    playButton.style('font-size', '26px');
    playButton.style('font-family', 'Chakra Petch');
    playButton.style('border-radius', buttonCornerRadius+'px');
    playButton.size(200,70);
    playButton.position(540, 500);
    playButton.mousePressed(this.goToSTE);
    playButton.mouseOver(this.playButtonAudio);
  }
  
  //this is the actual game
  this.saveEarthGame = function() {
    
    //targetFrame is responsible for obj spawn
    //timeFrame is responsible for the timer
    targetFrame++;
    timeFrame++;
    removeElements();
    
    //caps the speed of objects at 3 and minimum being 0.5
    if (speed < 3) {
      speed = round((wave * 0.5) * (difficulty * 0.75))
      if (speed == 0) {
        speed = 0.5
      }
    }
    
    //prevents objects from spawning 1.5s> apart
    if (spawnObjTime >= 120)
      spawnObjTime = round((60 * 3) / (wave * 0.5));
    
    //paints bg
    image(backgroundPicture, 0, 0, width, height, 0, 0, backgroundPicture.width, backgroundPicture.height);
    image(earthImage, 435, 165, earthImage.width/1.25, earthImage.height/1.25);
    
    //display score
    textFont(boldFont);
    textSize(80);
    text("Points: "+score, 470, 80);
        
    //timer
    timer = timeFrame/60
    timer = round(timer*100)/100;
    textFont(semiBoldFont);
    textSize(30);
    text(""+timer+"s", 30, 50);
    
    //displays the wave
    text("Wave: "+wave, 1120, 50)
    //every 12 seconds, increase the wave
    if(timer%12.0 == 0) {
      wave++;
    }
    
    //health bar
    fill(255,0,0);
    rect(460, 630, 360, 50);
    fill(0, 255, 0);
    rect(460, 630, health, 50);
    fill(255);
    //health text
    textSize(30);
    textFont(boldFont);
    text("Health", 600, 665);
    
    //math that calculates earth img center
    earthCenterX = (432+earthImage.width/2.5);
    earthCenterY = (158+earthImage.height/2.5);
    
    
    //spawns asteroids
    if (targetFrame%spawnObjTime == 0) {
      targetFrame = 0;
      this.spawnAsteroid();
    }
    
    //displays the spawning asteroids
    for (let i = 0; i < asteroids.length; i++) {
      asteroids[i].display();
      
      //detects if asteroids crashes
      //removes health and plays a crash audio
      if(dist(asteroids[i].asteroidCenterX,asteroids[i].asteroidCenterY, earthCenterX, earthCenterY) < 155) {
        asteroids[i].remove();
        health = health - 120;
        explosionSound.setVolume(1*volumeMultiplier);
        explosionSound.play()
      }
      //detects if the mouse is on asteroids
      //if true, checks if the keyboard input matches the asteroid letter
      //removes the asteroid if all checks pass, plays pop audio
      if(dist(asteroids[i].asteroidCenterX, asteroids[i].asteroidCenterY, mouseX, mouseY) < 55) {
        //checks if the key is pressed and finds if the key matches
          if (isKeyPressed) {
          let charPressed;
      charPressed = String.fromCharCode(keyCode);
            //removes asteroid if correct key is pressed and if mouse is on it
          if(charPressed === asteroids[i].letterTag) {
            asteroids[i].remove();
            score++;
            popSound.setVolume(1*volumeMultiplier);
            popSound.play();
          }
        }
      }
    }
    
    //determines if the game ends
    if (health <= 0) {
      this.goToGameOver();
    }
    
    //draws the notification/visual feedback
    this.checkpoint();
    
    //determines when the notification is run
    if (score%5 == 0 && !showNotification && score != 0) {
      tempTime = timer;
      showNotification = true;
      dy = 2;
    }
    
    //removes the notification after 2 seconds
    if (tempTime + 2.0 == timer && tempTime != null) {
      showNotification = false;
      dy = -2;
    }
    
    //onscreen quit button (top right)
    backButton = createButton('Quit');
    backButton.style('background-color', "black");
    backButton.style('color', 'white');
    backButton.style('font-size', '12px');
    backButton.style('font-family', 'Chakra Petch');
    backButton.style('border-radius', buttonCornerRadius+'px');
    backButton.size(50, 20);
    backButton.position(1220, 10);
    backButton.mousePressed(this.goToGameOver);
    backButton.mouseOver(this.playButtonAudio);
    STEcanvas.mouseOver(this.allowButtonAudio);
  }
  
  //notification function
  this.checkpoint = function() {
    //moves the position of the box
    y = y + dy;
    
    if (y > 10) {
      dy = 0;
      }
    else if (y < -100) {
      dy = 0;
      }
    else if (y >= -100 && y <= 10 && showNotification) {
      dy = 2;
      
      //plays the audio from an assortment of audio that is game specific
      //depending on the audio, the notification is changed to match the audio
    if (!checkAudioIsPlaying())
      playCelebratoryAudio(gameType);
      
    }
    else if (y >= -100 && y <= 10 && !showNotification){
      dy = -2;
    }
    
    //highlights the text with 200 alpha value
    fill(0, 200);
    stroke("white");
    strokeWeight(2);
    rect(240, y, 800, 80, 10);
    noStroke();
    //prints the notification text
    fill(255, 200);
    textSize(30);
    textWrap(WORD);
    textAlign(CENTER, TOP);
    text(STEnotifText, 240, y, 800);
    textAlign(LEFT, BASELINE);
    fill("white");
    
  }
  
  //this spawns asteroids at a random position
  this.spawnAsteroid = function() {
    
    //determines spawn location
    //pacing takes screen size into account
    //obj's speed is slowed if spawned from the top or bottom (pacing boolean)
    let randomNum = round(random(0,4));
    let pacing; 
    
    if (randomNum == 0) {
      //left of the screen
      pacing = false;
      xPosA = random(-200,-50);
      yPosA = random(0,720);
    }
    else if (randomNum == 1 && !showNotification) {
      //top of the screen
      pacing = true;
      speed = speed * 0.5;
      xPosA = random(0,1280);
      yPosA = random(-200, -50);
    }
    else if (randomNum == 2) {
      //right of the screen
      pacing = false;
      xPosA = random(1280,1480);
      yPosA = random(0,720);
    }
    else{
      //bottom of the screen
      pacing = true;
      xPosA = random(0,1280);
      yPosA = random(720, 820);
    }
    
    //determines the letter
    letterTag = round(random(0,25));
    //creates the obj and appends to the asteroids array
    asteroids[currentAsteroid] = new Asteroid(xPosA, yPosA, speed, letterTag, pacing);
    asteroids[currentAsteroid].display();
    currentAsteroid++;
  }
  
  //sets the scene to call the game menu function
  this.goBack = function() {
    STEscene = 1;
  }
  //sets the scene to call the instructions function
  this.goToInstructions = function() {
    STEscene = 2;
  }
  
  //sets the scene to call the game function
  this.goToSTE = function() {
    stopAllExcessNoise();
    STEscene = 3;
  }
  
  //switches the scene to main menu file
  this.goToMainMenu = function() {
    STEscene = 4;
  }
  
  //switches the scene to the gameover file
  this.goToGameOver = function() {
    stopAllExcessNoise();
    STEscene = 5;
  }
  
  //this changes the difficulty 
  //when the difficulty button is pressed
  this.changeDifficulty = function() {
    if (difficulty  == 1) {
      difficulty = 2;
      diffText = 'Medium';
    }
    else if (difficulty == 2){
      difficulty = 3;
      diffText = 'Hard'
    }
    else {
      difficulty = 1;
      diffText = 'Easy'
    }
  }
  
  //this plays an audio cue when over the button
  this.playButtonAudio = function() {
    if(!onButton) {
      buttonHover.setVolume(1*volumeMultiplier);
      buttonHover.play();
      onButton = true;
    }
  }
  
  this.allowButtonAudio = function() {
    onButton = false;
  }
  
}


//asteroid class
class Asteroid{
  //constructor of an asteroid
  constructor(x, y, speed, letterTag, pacing){
    let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N','O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    
    this.xPosA = x;
    this.yPosA = y;
    if(!pacing || speed < 1)
      this.speed = speed;
    else
      this.speed = speed * 0.75;
    
    this.letterTag = letters[letterTag];
  }
  
  //displays the asteroid and moves it toward the earth center (FOR SAVE THE EARTH)
  display(){
    image(asteroid, this.xPosA, this.yPosA, asteroid.width/3, asteroid.height/3);
    this.asteroidCenterX = this.xPosA + asteroid.width/6;
    this.asteroidCenterY = this.yPosA + asteroid.height/6;
    textSize(50);
    text(this.letterTag, this.asteroidCenterX-20, this.asteroidCenterY+20);
    
    let m = createVector(this.asteroidCenterX - earthCenterX, this.asteroidCenterY - earthCenterY);
    m.normalize();
    
    this.xPosA -= m.x * this.speed;
    this.yPosA -= m.y * this.speed;
  }
  
  //similar to the display() function, shows the asteroid but does nothing
  showAsteroid() {
    image(asteroid, this.xPosA, this.yPosA, asteroid.width/4, asteroid.height/4);
  }
  
  //moves the x position of the asteroid to the left
  moveX() {
    this.xPosA = this.xPosA - this.speed;
  }
  
  //since hide and remove doesn't work, this function puts all unneeded gameobjects off the screen
  remove() {
    this.xPosA = -100;
    this.yPosA = -100;
    this.speed = 0;
  }
  //get X position
  getX() {
    return this.xPosA;
  }
  //get Y position
  getY() {
    return this.yPosA;
  }
  //gets center x (for SPACE VOYAGER)
  getCenterX() {
    return (this.xPosA + asteroid.width/8);
  }
  //gets center y (for SPACE VOYAGER)
  getCenterY() {
    return (this.yPosA + asteroid.height/8);
  }
}
  