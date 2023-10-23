/*
Authors: Hussain Attyah, Zaki Ilyas, Krishna Priya, & Amber Smith
*/

function settings() {

  let scene;
  let showSlider;
  let x = 1; 
  let onButton;
  let SettingsCanvas;

  this.enter = function() {
    SettingsCanvas = createCanvas(1280, 720);
    
    textFont(semiBoldFont);
    scene = 1;
    showSlider = true;
    onButton = false;
    
    image(settingsBG, 0 ,0, width, height, 0, 0, settingsBG.width, settingsBG.height);
    
    //adds a back to main menu button
    backButton = createButton('Back to Menu');
    backButton.style('font-size', '26px');
    backButton.style('background-color', 'rgba(217, 216, 234, .9)');
    backButton.style('font-family', 'Chakra Petch');
    backButton.style('border-radius', buttonCornerRadius+'px');
    backButton.size(200, 70);
    backButton.position(750,550);
    backButton.mousePressed(this.goBackToMenu);
    backButton.mouseOver(this.playButtonAudio);

    //adds a toggle fullscreen button
    fullscreenButton = createButton('Toggle Focus Mode');
    fullscreenButton.style('font-family', 'Chakra Petch');
    fullscreenButton.style('font-size', '26px');
    fullscreenButton.style('background-color', 'rgba(217, 216, 234, .9)');
    fullscreenButton.style('border-radius', buttonCornerRadius+'px');
    fullscreenButton.size(200, 70);
    fullscreenButton.position(300, 200);
    fullscreenButton.mousePressed(this.toggleFullscreen);
    fullscreenButton.mouseOver(this.playButtonAudio);

    //adds a credits button to switch to credits
    credits = createButton('Credits');
    credits.style('font-size', '26px');
    credits.style('background-color', 'rgba(217, 216, 234, .9)');
    credits.style('font-family', 'Chakra Petch');
    credits.style('border-radius', buttonCornerRadius+'px');
    credits.size(200, 70);
    credits.position(300, 550);
    credits.mousePressed(this.changeToCredits);
    credits.mouseOver(this.playButtonAudio);

    fill(217, 216, 234, 230);
    rect(750, 200, 200, 70, 15);

    fill("black");
    textSize(26);
    textWrap(WORD);
    textAlign(CENTER);
    text("Volume", 850, 230);
    textAlign(LEFT);
    
    
    volumeSlider = createSlider(0, 2, x, 0.01);
    volumeSlider.position(755, 250);
    volumeSlider.style('width', '185px');

  }

  this.draw = function() {
    //checks if scene should display settings
    SettingsCanvas.mouseOver(this.allowButtonAudio);
    
    if (scene == 1) {
      if (!showSlider) {
        this.enter();
      }
      this.drawSettings();
    }
    //checks if scene should display credits
    if (scene == 2) {
      this.showCredits();
    }
    if (scene == 3) {
      this.sceneManager.showScene(menu);
    }
  }


  //draws the settings page INCOMPLETE
  this.drawSettings = function() {
    
    if (collidePointRect(mouseX, mouseY, 750, 200, 200, 70)) {
      fill(217, 216, 234, 180);
      rect(750, 280, 200, 70, 15);

      fill("black");
      textSize(15);
      textWrap(WORD);
      textAlign(CENTER);
      text("Volume changes will take effect when you return to the menu.", 755, 300, 190);
      textAlign(LEFT);
    }
    
    volumeMultiplier = volumeSlider.value();
    x = volumeSlider.value();
    volumeSlider.mouseOver(this.playButtonAudio);

  }

  //sends you to the main menu
  this.goBackToMenu = function() {
    scene = 3;
  }

  //draws the credits page INCOMPLETE
  this.showCredits = function() {

    removeElements();
    background(255);

    image(creditsPage, 0, 0, width, height, 0, 0, creditsPage.width, creditsPage.height);
    
    backButton = createButton('Back to Menu');
    backButton.style('font-size', '26px');
    backButton.style('background-color', 'yellow');
    backButton.style('font-family', 'Chakra Petch');
    backButton.style('border-radius', buttonCornerRadius+'px');
    backButton.size(200, 70);
    backButton.position(750,550);
    backButton.mousePressed(this.goBackToMenu);
    backButton.mouseOver(this.playButtonAudio);

    settingsButton = createButton('Settings');
    settingsButton.style('font-size', '26px');
    settingsButton.style('background-color', 'yellow');
    settingsButton.style('font-family', 'Chakra Petch');
    settingsButton.style('border-radius', buttonCornerRadius+'px');
    settingsButton.size(200, 70);
    settingsButton.position(300, 550);
    settingsButton.mousePressed(this.changeToSettings);
    settingsButton.mouseOver(this.playButtonAudio);

  }

  //changes scene value to credits
  this.changeToCredits = function() {
    scene = 2;
  }

  //changes scene value to settings
  this.changeToSettings = function() {
    removeElements();
    showSlider = false;
    scene = 1;
  }

  //toggles fullscreen
  this.toggleFullscreen = function() {
    let fs = fullscreen();
    fullscreen(!fs);
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