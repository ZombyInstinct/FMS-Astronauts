/*
Authors: Hussain Attyah, Zaki Ilyas, Krishna Priya, & Amber Smith
*/

function menu() {

  //these variables are for determining the Center of the planet sprites
  let saturnCenterX;
  let saturnCenterY;
  let planetCenterX;
  let planetCenterY;
  let planet2CenterX;
  let planet2CenterY;
  let planet3CenterX;
  let planet3CenterY;
  
  //boolean var to determine if the mouse is over the button
  let onButton;

  this.enter = function() {
    //creates canvas and keeps fps at 60
    //the enter function is also called each time the scene entered
    createCanvas(1280, 720);
    frameRate(60);
    onButton = false;
  }

  this.draw = function() {
    //removes any underlying elements
    removeElements();
    
    //this plays the menu music
    menuMusic.setVolume(0.6 * volumeMultiplier);
    if (!menuMusic.isPlaying()) {
      menuMusic.loop();
      menuMusic.play();
    }
    
    //draws the background and title image for the main menu
    image(backgroundPicture, 0, 0, width, height, 0, 0, backgroundPicture.width, backgroundPicture.height);
    image(titleImg, 450,130);

    //draws and scales the organe planet
    image(saturnImg, 140, 160, saturnImg.width/5, saturnImg.height/5);

    //grabs the center of the png
    saturnCenterX = (140+saturnImg.width/10);
    saturnCenterY = (160+saturnImg.height/10);

    //draws and scales the brown planet
    image(marsImg, 500, 275, marsImg.width/7, marsImg.height/7);

    //grabs the center of the png
    planetCenterX = (505+marsImg.width/14);
    planetCenterY = (280+marsImg.height/14);


    //draws and scales the blue planet
    image(uranusImg, 900, 450, uranusImg.width/12, uranusImg.height/12);

    planet2CenterX = (900+uranusImg.width/24);
    planet2CenterY = (450+uranusImg.height/24);

    //draws and scales the earth
    image(earthImg, 176, 550, earthImg.width/5, earthImg.height/5)

    //grabs center of png
    planet3CenterX = 176 + earthImg.width/10;
    planet3CenterY = 550 + earthImg.height/10;
    
    //highlights the planet when mouse is hovering the planet
    if (dist(saturnCenterX,saturnCenterY, mouseX, mouseY) <= 73)   {
      fill(255,255,0,130);
      circle(saturnCenterX,saturnCenterY, 146);
      this.playButtonAudio();
    }
        //highlights the planet when mouse is hovering the planet
    else if (dist(planetCenterX,planetCenterY, mouseX, mouseY) <= 129)   {
      fill(255,255,0,130);
      circle(planetCenterX,planetCenterY, 258);
      this.playButtonAudio();
    }
        //highlights the planet when mouse is hovering the planet
    else if (dist(planet2CenterX,planet2CenterY, mouseX, mouseY) <= 120)   {
      fill(255,255,0,130);
      circle(planet2CenterX,planet2CenterY, 240);
     this.playButtonAudio();
    }
       //highlights the planet when mouse is hovering the planet
    else if (dist(planet3CenterX, planet3CenterY, mouseX, mouseY) <= 50) {
      fill(255,255,0,130);
      circle(planet3CenterX,planet3CenterY, 100);
      this.playButtonAudio();
    } else {
      onButton = false;
    }

  }

    this.mousePressed = function() {

    //opens Space voyagers when clicked on orange planet
    if (dist(saturnCenterX,saturnCenterY, mouseX, mouseY) <= 73)   {
      menuMusic.setVolume(0.4 * volumeMultiplier);
      this.game1();
    }  

    //opens Save the Earth when clicked on brown planet
    if (dist(planetCenterX,planetCenterY, mouseX, mouseY) <= 129)   {
      menuMusic.setVolume(0.4 * volumeMultiplier);
      this.game2();
    }

    //opens Space Command when clicked on blue planet
    if (dist(planet2CenterX,planet2CenterY, mouseX, mouseY) <= 120)   {
      menuMusic.setVolume(0.4 * volumeMultiplier);
      this.game3();
    }

    //opens the settings page when clicked on the earth
    if (dist(planet3CenterX, planet3CenterY, mouseX, mouseY) <= 50) {
        this.launchSettings();
    }
  }

  this.launchSettings = function(){
    //switches to the settings file
    this.sceneManager.showScene(settings);

  }

  this.game1 = function(){
    //switches to the SpaceVoyager file
    this.sceneManager.showScene(SpaceVoyager);
  }

  this.game2 = function(){
    //switches to the SaveTheEarth file
    this.sceneManager.showScene(SaveTheEarth);
  }

  this.game3 = function(){
    //switches to the SpaceCommand file
    this.sceneManager.showScene(SpaceCommand);
  }
  
  //this functions plays an audio cue when the mouse is over the button
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