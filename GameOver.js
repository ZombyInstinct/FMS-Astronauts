/*
Authors: Hussain Attyah, Zaki Ilyas, Krishna Priya, & Amber Smith
*/

function GameOver() {
  let scoreText;
  let GOscene;
  let GOcavas;
  let onButton;
  
  this.enter = function () {
    removeElements();
    GOcanvas = createCanvas(1280, 720);
    background(35);
    onButton = false;
    gameOverImg = loadImage("Assets/gameover.png");
    
    if (gameType == 1) {
      scoreText = "Profit from Travel: $"+finalCoinScore
    }
    else if (gameType == 2) {
      scoreText = "Asteroids Destroyed: "+finalScore;
    }
    else if (gameType == 3) {
      scoreText = "Words Per Minute: "+finalWordScore;
    }
    
    GOscene = 1;
  }

  this.draw = function () {
    removeElements();
    
    if (GOscene == 1) {
      this.gameOver();
    }
    if (GOscene == 2) {
      this.sceneManager.showScene(menu);
    }
  }
  
  this.gameOver = function() {
    
    GOcanvas.mouseOver(this.allowButtonAudio);
    
    image(gameOverImg, 250, 100, gameOverImg.width*1.5, gameOverImg.height*1.5);
    
    fill(255);
    textSize(80);
    textAlign(CENTER);
    text(scoreText, 640, 70);
    textAlign(LEFT);

    backButton = createButton("Return to Main Menu");
    backButton.style("background-color", "red");
    backButton.style('font-family', 'Chakra Petch');
    backButton.style('border-radius', buttonCornerRadius+'px');
    backButton.size(400, 50);
    backButton.position(450, 630);
    backButton.mousePressed(this.goBackToMenu);
    backButton.mouseOver(this.playButtonAudio);
  }
  
  this.goBackToMenu = function() {
    GOscene = 2;
  }
  
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
