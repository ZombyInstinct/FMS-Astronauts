/*
Authors: Hussain Attyah, Zaki Ilyas, Krishna Priya, & Amber Smith
*/

function SpaceVoyager () {
  
  //declares all 'class' variables
  let score;
  let asteroids;
  let gasTank;
  let smokeParticles;
  let coins;
  let difficulty = 1;
  let speed;
  let diffText = 'Easy';
  let targetFrame = 0;
  let gas = 300;
  let wave;
  let timer;
  let timeFrame;
  let SVscene;
  
  let gasSpawnTime;
  let coinSpawnTime;
  let gameCompletionTime;
  let endGame;
  let shipPosVector;
  let shipSizeVector;
  let gasPosVector;
  let gasSizeVector;
  
  let recentlyBeenHit;
  let asteroidsHit;
  let tempAsteroidsHit;
  
  let xfinal = 20;
  let yfinal = 300;
  let dx = 3;
  let xScale = 180;
  let yScale = 66;
  let dScale = 1.01;
  
  let SVcanvas;
  let onButton;
  let flyVolume;
  let showTimer;
  let showProgressBar;
  
  
  this.enter = function() {
    //creates canvas obj
    SVcanvas = createCanvas(1280, 720);
    
    //resets all values to game start values
    onButton = false;
    timeFrame = 0;
    endGame = false;
    wave = 1;
    speed = 1 * wave;
    score = 0;
    finalScore = 0;
    targetFrame = 0;
    SVscene = 1;
    gas = 300;
    asteroids = [];
    gasTank = [];
    smokeParticles = [];
    coins = [];
    gasSpawnTime = round(random(180,300));
    coinSpawnTime = round(random(200,400));
    gameCompletionTime = difficulty * 60 * 60;
    flyVolume = 0.3;
    recentlyBeenHit = false;
    asteroidsHit = 0;
    tempAsteroidsHit = 0;
    
    gameType = 1;
  }

  //draws the scene depending on which scene is active
  this.draw = function() {
    textFont(mainFont);
    
    if (SVscene == 1) {
      this.gameMenu();
    }
    if (SVscene == 2) {
      this.instructions();
    }
    if (SVscene == 3) {
      this.SpaceVoyagerGame();
    }
    if (SVscene == 4) {
      this.sceneManager.showScene(menu);
    }
    if (SVscene == 5) {
      finalCoinScore = round(score/difficulty);
      this.sceneManager.showScene(GameOver);
    }
  }
  
  //draws the game menu
  this.gameMenu = function() {
    
    removeElements();
    //resets the button audio if mouse over canvas
    SVcanvas.mouseOver(this.allowButtonAudio);
    
    //draws background image and spaceship
    image(backgroundPicture, 0, 0, width, height, 0, 0, backgroundPicture.width, backgroundPicture.height);
    image(redFlame, 100, 0, rocketShip.width, rocketShip.height);
    image(yellowFlame, 100, 0, rocketShip.width, rocketShip.height);
    image(rocketShip, 100, 0, rocketShip.width, rocketShip.height);

    //highlights the title
    fill(0);
    stroke("white");
    strokeWeight(2);
    rect(190, 250, 900, 140, 10);
    noStroke();
    fill(255);
    //text for title
    textSize(120);
    text("Space Voyagers", 200, 350);
    
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
    
    //back to main menu button
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

  //draws the instructions
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
    //text 'INSTRUCTIONS'
    fill("white");
    textSize(110);
    text("INSTRUCTIONS", 275, 100);
    
    //plays the instructions as audio
    if(!instructionsSpaceVoyager.isPlaying()) {
      instructionsSpaceVoyager.setVolume(1*volumeMultiplier);
      instructionsSpaceVoyager.play();
    }
    
    //the instructions are written as text as well
    let instructText = "Fly through space in search of a planet. Use your mouse to guide your ship around obstacles & debris, but don't forget to watch your fuel! Collect canisters on the way to your planet.";
    
    //highlights the instructions
    fill(0);
    stroke("white");
    strokeWeight(2);
    rect(100, 250, 1150, 260, 10);
    noStroke();
    //prints the instruction
    fill("white");
    textSize(50);
    textWrap(WORD);
    textAlign(CENTER);
    text(instructText, 100, 300, 1150);
    textAlign(LEFT);
    
    //play button -> draws the game
    playButton = createButton('Play');
    playButton.style('background-color', "gray");
    playButton.style('color', 'white');
    playButton.style('font-size', '26px');
    playButton.style('font-family', 'Chakra Petch');
    playButton.style('border-radius', buttonCornerRadius+'px');
    playButton.size(200,70);
    playButton.position(540, 550);
    playButton.mousePressed(this.goToSV);
    playButton.mouseOver(this.playButtonAudio);
  }
  
  //the actual space voyager game
  this.SpaceVoyagerGame = function() {
    
    //checks if the difficulty is 4 (Endless)
    //if endless, the timer is shown
    //if not, a progress bar is shown
    if (difficulty != 4){
      showTimer = false;
      showProgressBar = true;
      gameCompletionTime = difficulty * 60 * 60;
    }
    else {
      gameCompletionTime = -1;
      showTimer = true;
      showProgressBar = false;
    }
    
    removeElements();
    
    //draws the background
    image(backgroundPicture, 0, 0, width, height, 0, 0, backgroundPicture.width, backgroundPicture.height);
    
    //allows the player to affect the game
    if (!endGame) {
      //increments animation and time values
      targetFrame++;
      timeFrame++;
      
      //responsible for showing smoke particles
      for (let i = 0; i < smokeParticles.length; i++) {
        smokeParticles[i].display();
        smokeParticles[i].animate();
      }
      
      //grabs the vectors for the ships pos and size
      shipPosVector = createVector(mouseX-55, mouseY-20);
      shipSizeVector = createVector(102, 46);
      
      //plays the audio for the game
      rocketFlyingSound.setVolume((flyVolume) * volumeMultiplier);
      if(!rocketFlyingSound.isPlaying()) {
        rocketFlyingSound.loop();
        rocketFlyingSound.play();
      }
      
      //changes the spaceship noise based off the movement of the mouse
      if (pmouseX < mouseX && pmouseY > mouseY) {
        if (flyVolume < 0.95)
          flyVolume += 0.05;
        this.rocketAnimation();
      }
      else if (pmouseX > mouseX && pmouseY < mouseY) {       
        if(flyVolume > 0.2)
          flyVolume -= 0.05;
        this.rocketAnimation();
      }
      else {
        this.rocketAnimation();
      }
      
      //draws the image of the ship
      image(rocketShip, mouseX-130, mouseY-30, 180, 66);
      //hitbox
      //fill(255, 90);
      //rect(mouseX-55, mouseY-20, 102, 46)
      
      //prevents the user from going out of bounds
      if (mouseX < 55) {
        mouseX = 55;
      }
      if (mouseX > 1233) {
        mouseX = 1233;
      }
      if (mouseY < 20) {
        mouseY = 20;
      }
      if (mouseY > 694) {
        mouseY = 694;
      }
    }
    
    //every 12 seconds, the wave increases
    if (timer%12.0 == 0) {
      wave++;
      speed = wave * 1.0;
    }
    
    //checks if we have recently been hit every 6 seconds
    if (timer%6.0 == 0) {
      if (tempAsteroidsHit == asteroidsHit) {
        recentlyBeenHit = false;
      }
      else if (tempAsteroidsHit < asteroidsHit) {
        recentlyBeenHit = true;
        tempAsteroidsHit = asteroidsHit;
        playBadAudio(gameType);
      }
    }
    
    //plays audio based on code above
    if (!recentlyBeenHit && timer%6.0 == 0) {
      stopAllExcessNoise();
      playCelebratoryAudio(gameType);
    }

    
    //draws the coins and moves that a constant speed across the screen
    for (let i = 0; i < coins.length; i++) {
      coins[i].display();
      coins[i].moveX();
      
      //checks for collision
      let coinPosVector = createVector(coins[i].getCenterX(), coins[i].getCenterY());
      coinCollision = collideRectCircleVector(shipPosVector, shipSizeVector, coinPosVector, 30);
      
      //if collided, adds to score, plays audio, and removes the coin
      if (coinCollision) {
        score += 1;
        coinSound.setVolume(0.15*volumeMultiplier);
        coinSound.play();
        coins[i].remove();
      }
    }
    
    //draws the asteroids and moves them according to the wave number
    for (let i = 0; i < asteroids.length; i++) {
      asteroids[i].showAsteroid();
      asteroids[i].moveX();
      
      //checks for collision
      let asteroidPosVector = createVector(asteroids[i].getCenterX() , asteroids[i].getCenterY());
      asteroidCollision = false;
      asteroidCollision = collideRectCircleVector(shipPosVector, shipSizeVector, asteroidPosVector, 42.5);
      //if collided, removes from gas, plays audio, and removes asteroid
      if (asteroidCollision) {
        gas -= (60/difficulty);
        explosionSound.setVolume(1*volumeMultiplier);
        explosionSound.play();
        asteroids[i].remove();
        asteroidsHit += 1;
      }
    }
    
    //draws the gas tanks and moves them at a constant speed
    for (let i = 0; i < gasTank.length; i++) {
      
      gasTank[i].display();
      gasTank[i].moveX();
      
      //checks for collision
      gasPosVector = createVector(gasTank[i].getX(), gasTank[i].getY());
      gasSizeVector = createVector(gasPic.width/4, gasPic.height/4);
      gasCollision = false;
      gasCollision = collideRectRectVector(gasPosVector, gasSizeVector, shipPosVector, shipSizeVector);
      //if collided, adds to gas, plays audio, removes tank
      if (gasCollision) {
        gasCollect.setVolume(1*volumeMultiplier);
        gasCollect.play();
        gas += (60); 
        if (gas > 300) {
          gas = 300;
        }
        gasTank[i].remove();
      }
    }
    
    //draws the HUD
    this.displayHUD();
    
    //spawns asteroids depending on wave
    if(targetFrame%round(120/wave) == 0 && !endGame) {
      this.spawnAsteroids();
    }
    
    //spawns a gas tank randomly every 3 to 5 second
    if (targetFrame == gasSpawnTime && !endGame) {
      gasSpawnTime = targetFrame + round(random(180,300));
      this.spawnGas();
    }
    
    //spawns coins randomly every 3 to 5 seconds
    if (targetFrame == coinSpawnTime && !endGame) {
      coinSpawnTime = targetFrame + round(random(180,300));
      this.spawnCoins();
    } 
    
    //if not on endless, gas decays depending on difficulty
    if (targetFrame%10 == 0 && !endGame && difficulty != 4) {
      gas -= 1.5*(difficulty*0.5);
    }
    //if on endless, gas decays at a constant -2;
    else if (targetFrame%10 == 0 && !endGame && difficulty == 4){
      gas -= 2;
    }
    //checks if the game ends
    if (gas <= 0) {
      this.goToGameOver();
    }
    //if the user completes the game, end game happens
    if (targetFrame >= gameCompletionTime && difficulty != 4) {
      if (!endGame)
         a = this.bringPlanet();
      endGame = true;
      this.endGameSequence(a);
    }
    
  }
  
  //simply spams the fire on the back of the ship
  this.rocketAnimation = function() {
    image(redFlame, mouseX-130, mouseY-30, 180, 66);
    
    if(timeFrame%4==0) {
      image(yellowFlame, mouseX-130, mouseY-30, 180, 66);
      let a = new Smoke(mouseX-60, mouseY, 3);
      smokeParticles.push(a);
    }
  }
  
  //displays the hud
  this.displayHUD = function() {
    //calculates the progress bar and text percentage
    progressBarLength = (targetFrame/gameCompletionTime) * 390;
    percentage = round(targetFrame/gameCompletionTime*100);
    
    //shows the progress bar if true
    if (showProgressBar) {
      //progress bar
      fill(0, 120);
      rect(440, 10, 400, 20, 200);
      fill(10, 200, 10, 120);
      rect(445, 15, progressBarLength, 10, 200);
      
      fill(255);
      textFont(semiBoldFont);
      textSize(25);
      text(percentage + " %", 850, 25);
    }

    //shows the fuel
    fill(255, 0 ,0);
    rect(20, 650, 50, 50);
    fill('yellow');
    rect(70, 650, 250, 50);
    fill(10, 200, 10);
    rect(20, 650, gas, 50);
    fuelText = "Fuel";
    textSize(30);
    fill('white');
    text(fuelText, 25, 685);
    
    //calculates the timer
    timer = timeFrame/60
    timer = round(timer*100)/100;
    
    //shows timer if on endless
    if (showTimer) {
      textFont(semiBoldFont);
      textSize(30);
      text(""+timer+"s", 30, 90);
    }
    
    //display score
    textFont(semiBoldFont);
    textSize(30);
    text("Points: "+score, 30, 50);
    
    //quit button
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
  }
  
  //does an end game animation
  this.endGameSequence = function(p) {
    
    //stops all noise except for music
    stopAllExcessNoise();
    
    //a planet is declared and called
    //moves the planet to center of the screen
    p.display(3, 3);
    p.moveX(600);
    
    //removes all gameobjects
    for (let i = 0; i < asteroids.length; i++) {
      asteroids[i].remove()
    }
    for (let i = 0; i < gasTank.length; i++) {
      gasTank[i].remove()
    }
    for (let i = 0; i < coins.length; i++) {
      coins[i].remove()
    }
    
    //draws the ship
    image(rocketShip, xfinal, yfinal, xScale, yScale);
    
    //slowly decreases the size as the ship moves forward
    if (xfinal < 450){
        xfinal = xfinal + dx;
    }
    if (xfinal >= 450 && xfinal < 800 && yScale > 0) {
      dx = 1;
      xScale = xScale / dScale;
      yScale = yScale / dScale;
      xfinal = xfinal + dx;
    }
    if (yfinal < 340 && xfinal >= 450) {
      yfinal = yfinal + dx
    }
    //once the ship reaches a point, game goes to game over screen
    if (xfinal >= 800 && yfinal >= 340) {
      this.goToGameOver();
    }
  }
  
  //brings the planet to the center
  this.bringPlanet = function() {
    let a = new Planet (800, 220, 3, SVplanet1);
    return a;
  }
  
  //spawns asteroids at random y values
  this.spawnAsteroids = function() {
    y = round(random(-50, 680));
    let a = new Asteroid(1280, y, speed, 1, false);
    asteroids.push(a);
  }

  //spawns gas at random y values
  this.spawnGas = function() {
    let y = random(-50, 680);
    let a = new Gas(1280, y, 1);
    gasTank.push(a);
  }
  
  //spawns coins in clusters at random y values
  this.spawnCoins = function() {
    let x = 1280;
    let y = random(20, 700);
    let z = round(random()*15);
    for (let i = 0; i < z; i++) {
      let dy = random()*2;
      if (dy > 1) {
        let a = new Coin(x + i*32, y+15, 2);
        coins.push(a);
        y = y+15;
      }
      else {
        let a = new Coin(x + i*32, y-15, 2);
        y = y-15;
        coins.push(a);
      }
    }
  }
  
  //switches scene to main menu
  this.goBack = function() {
    SVscene = 1;
  }
  
  //switches scene to instructions
  this.goToInstructions = function() {
    SVscene = 2;
  }
  
  //switches scene to the game
  this.goToSV = function() {
    stopAllExcessNoise();
    SVscene = 3;
  }
  
  //switches scene to the main menu
  this.goToMainMenu = function() {
    SVscene = 4;
  }
  
  //switches scene to game over
  this.goToGameOver = function() {
    stopAllExcessNoise();
    SVscene = 5;
  }
  
  //changes the difficult when button is pressed
  this.changeDifficulty = function() {
    if (difficulty  == 1) {
      difficulty = 2;
      diffText = 'Medium';
    }
    else if (difficulty == 2){
      difficulty = 3;
      diffText = 'Hard';
    }
    else if (difficulty == 3){
      difficulty = 4;
      diffText = 'Endless';
    }
    else {
      difficulty = 1;
      diffText = "Easy";
    }
  }
  
  //plays button audio when over a button
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

//smoke class (for particles and animation off the ship)
class Smoke {
  //constructor
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.color = random(150, 220);
    this.alpha = random(100, 180);
    this.radius = random(20, 40);
    this.boundingBox();
  }
  //shows the smoke
  display() {
    fill(this.color, this.alpha);
    circle(this.x, this.y, this.radius);
  }
  //moves the 'smoke'
  animate() {
    if (this.maxX < this.x)
      this.x = this.x - this.speed;
    
    let y = random()*2;
    if (y > 1) {
      if(this.minY < this.y)
        this.y = this.y - this.speed*0.5;
    }
    else {
      if(this.maxY > this.y)
        this.y = this.y + this.speed*0.5;
    }
    
    if (this.x <= this.maxX) {
      this.remove();
    }
    
  }
  //hides after animation is completed
  remove() {
    this.x = -100;
    this.y = -100;
    this.speed = 0;
  }
  //bounding box is established based on location of ship
  boundingBox() {
    this.maxX = this.x-50;
    this.minY = this.y-10;
    this.maxY = this.y+10;
  }
}

//coin class
class Coin {
  //constructor
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
  }
  //draws the coin
  display() {
    //fill(255)
    //circle(this.x + 15, this.y + 15, 30)
    image(coinPic, this.x, this.y, coinPic.width/64, coinPic.height/64);
  }
  //moves the x position to the left
  moveX() {
    this.x = this.x - this.speed;
  }
  
  //hides the coin
  remove() {
    this.x = -100;
    this.y = -100;
    this.speed = 0;
  }
  //getter for center of coin sprite x
  getCenterX() {
    return this.x + 15;
  }
  //getter for center of coin sprite y
  getCenterY() {
    return this.y + 15;
  }
}

//gas class
class Gas {
  //constructor
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
  }
  //draws the gastank
  display() {
    image(gasPic, this.x, this.y, gasPic.width/4, gasPic.height/4);
  }
  //moves the gas tank's x pos to the left
  moveX() {
    this.x = this.x - this.speed;
  }
  //hides the gas tank
  remove() {
    this.x = -100;
    this.y = -100;
    this.speed = 0;
  }
  //getter for x pos
  getX() {
    return this.x;
  }
  //get for y pos
  getY() {
    return this.y;
  }
}

//planet class
class Planet {
  //constructor
  constructor(x, y, speed, planet) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.planet = planet
  }
  //draws the planet
  display(x, y) {
    image(this.planet, this.x, this.y, this.planet.width/x, this.planet.height/y);
  }
  //moves the planet until it reaches the desired value
  moveX(p) {
    if (this.x > p)
      this.x = this.x - this.speed;
  }
  //hides the planet
  remove() {
    this.x = -100;
    this.y = -100;
    this.speed = 0;
  }
  //gets the x pos
  getX() {
    return this.x;
  }
  //gets the y pos
  getY() {
    return this.y;
  }
  
}