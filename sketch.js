/*
Authors: Hussain Attyah, Zaki Ilyas, Krishna Priya, & Amber Smith
Lead Art -> Amber Smith
Lead SFX -> Hussain Attyah
*/

//These are global variables that can be accessed across each file
let mgr;
let finalScore = 0;
let finalWordScore = 0;
let finalCoinScore = 0;
let gameType = 0;
let STEnotifText = "";
let volumeMultiplier = 1;
let tempVolumeMultiplier;

let backgroundPicture;
let saturnImg;
let marsImg;
let earthImg;
let uranusImg;
let titleImg;
let earthImage;
let asteroid;

let rocketShip;
let redFlame;
let yellowFlame;
let gasPic;
let coinPic;
let SVplanet1;

let settingsBG;
let credits2;
let creditsPage;

let instructionsSpaceCommand;
let spaceCmdBG;
let smallScreen;
let noLightImg;
let greenLightImg;
let redLightImg;
let rocketVertical;
let SCplanet;

let goodNoiseSFX;
let badNoiseSFX;

let dontFretSound;
let excellentWorkSound;
let keepOnTryingSound;
let tryAgainSound;
let wellDoneSound;
let itsAlrightSound;
let goodWorkCadetSound;
let goodJobSaveEarthSound;
let keepItTogetherSound;
let masterfulSkillSound;
let thatWasCloseSound;
let thoseAsteroids;
let wonderfulManeuveringSound;

let instructionsSaveEarth;

let bangSound;
let explosionSound;
let crackleSound;
let popSound;
let gasCollect;
let coinSound;
let buttonHover;

let instructionsSpaceVoyager;
let rocketFlyingSound;

let menuMusic;

let buttonCornerRadius;


//this function sets up the scene manager and wires up all the event handles
function setup() {
  //rounds the corner of buttons
  buttonCornerRadius = '15';
  
  //declares the scenemanager object
  //wires up all event functions
  mgr = new SceneManager();
  mgr.wire();
  mgr.showScene(menu);
  
  print('Last Updated: April 17 11:48 AM by Zaki');
}

//preloads all audio and images to minimize any lag
function preload() {
  //load font
  mainFont = loadFont('Assets/Fonts/ChakraPetch-Light.ttf');
  boldFont = loadFont('Assets/Fonts/ChakraPetch-Bold.ttf');
  semiBoldFont = loadFont('Assets/Fonts/ChakraPetch-SemiBold.ttf');
  
  soundFormats('wav','mp3');
  
  backgroundPicture = loadImage('Assets/backgroundSTE.png');
  saturnImg = loadImage('Assets/saturn.png');
  marsImg = loadImage('Assets/planet.png');
  earthImg = loadImage('Assets/planet2.png');
  uranusImg = loadImage('Assets/planet3.png');
  titleImg = loadImage('Assets/title.png');
  
  
  earthImage = loadImage('Assets/earth.png');
  asteroid = loadImage('Assets/asteroid.png');
  
  rocketShip = loadImage('Assets/rocket.png');
  gasPic = loadImage("Assets/gas.png");
  SVplanet1 = loadImage("Assets/SVplanet1.png");
  
  dontFretSound = loadSound('Assets/Audio/DontFret!.mp3');
  excellentWorkSound = loadSound('Assets/Audio/ExcellentWork!.mp3');
  keepOnTryingSound = loadSound('Assets/Audio/KeepOnTrying.mp3');
  tryAgainSound = loadSound('Assets/Audio/TryAgain.mp3');
  wellDoneSound = loadSound('Assets/Audio/WellDone!.mp3');
  instructionsSaveEarth = loadSound('Assets/Audio/INSTRUCTIONS_SAVEEARTH.mp3');
  goodJobSaveEarthSound = loadSound('Assets/Audio/GoodJobSaveEarth.mp3');
  
  redFlame = loadImage('Assets/rocketRedFlame.png');
  yellowFlame = loadImage('Assets/rocketYellowFlame.png');
  coinPic = loadImage('Assets/coin.png');
  settingsBG = loadImage('Assets/SettingsBg.png');
  credits2 = loadImage('Assets/CreditsMusics.png');
  creditsPage = loadImage('Assets/Credits.png');
  
  spaceCmdBG = loadImage('Assets/SpaceCommandBG.jpg');
  smallScreen = loadImage('Assets/smallScreen.png');
  noLightImg = loadImage('Assets/noLight.png');
  redLightImg = loadImage('Assets/redLight.png');
  greenLightImg = loadImage('Assets/greenLight.png');
  rocketVertical = loadImage('Assets/rocketVertical.png');
  SCplanet = loadImage('Assets/bluePlanet.png');
  
  goodNoiseSFX = loadSound('Assets/Audio/good noise.mp3');
  badNoiseSFX = loadSound('Assets/Audio/bad noise.mp3');
  
  itsAlrightSound = loadSound('Assets/Audio/ItsAlright.mp3');
  goodWorkCadetSound = loadSound('Assets/Audio/GoodWorkCadet.mp3');
  keepItTogetherSound = loadSound('Assets/Audio/KeepItTogether.mp3');
  masterfulSkillSound = loadSound('Assets/Audio/MasterfulSkill.mp3');
  thatWasCloseSound = loadSound('Assets/Audio/ThatWasACloseOne.mp3');
  thoseAsteroids = loadSound('Assets/Audio/ThoseAsteroids.mp3');
  wonderfulManeuveringSound = loadSound('Assets/Audio/WonderfulManoovering.mp3');
  
  instructionsSpaceCommand = loadSound('Assets/Audio/SpaceCommandInstructions.mp3');
  
  bangSound = loadSound('Assets/Audio/bang.mp3');
  explosionSound = loadSound('Assets/Audio/explosion.wav');
  crackleSound = loadSound('Assets/Audio/firework.wav');
  popSound = loadSound('Assets/Audio/pop.wav');
  gasCollect = loadSound('Assets/Audio/GasCollect.mp3');
  coinSound = loadSound('Assets/Audio/CoinSFX.mp3');
  
  instructionsSpaceVoyager = loadSound('Assets/Audio/VoyagersInstructions.mp3');
  rocketFlyingSound = loadSound('Assets/Audio/RocketFlying.mp3');
  
  menuMusic = loadSound('Assets/Audio/Chronometry.mp3');
  buttonHover = loadSound('Assets/Audio/ButtonHover.mp3');
}

//allows each file to have their own draw function
function draw() {
  mgr.draw();
}

//stops all the noises including dialogue
function stopAllExcessNoise() {
  
  dontFretSound.stop();
  excellentWorkSound.stop();
  keepOnTryingSound.stop()
  tryAgainSound.stop();
  wellDoneSound.stop();
  goodJobSaveEarthSound.stop();
  instructionsSaveEarth.stop();
  instructionsSpaceVoyager.stop();
  instructionsSpaceCommand.stop();
  
  bangSound.stop();
  explosionSound.stop();
  crackleSound.stop();
  popSound.stop();
  gasCollect.stop();
  rocketFlyingSound.stop();
  coinSound.stop();
  goodNoiseSFX.stop();
  badNoiseSFX.stop();
  
  itsAlrightSound.stop();
  goodWorkCadetSound.stop();
  keepItTogetherSound.stop();
  masterfulSkillSound.stop();
  thatWasCloseSound.stop();
  thoseAsteroids.stop();
  wonderfulManeuveringSound.stop();
}

//checks if any dialogue is playing
function checkAudioIsPlaying() {
  let audioCheck = false;
  
  if (dontFretSound.isPlaying() || excellentWorkSound.isPlaying() || keepOnTryingSound.isPlaying() || tryAgainSound.isPlaying() || wellDoneSound.isPlaying() || goodJobSaveEarthSound.isPlaying() || instructionsSaveEarth.isPlaying() || instructionsSpaceVoyager.isPlaying() || instructionsSpaceCommand.isPlaying() || itsAlrightSound.isPlaying() || goodWorkCadetSound.isPlaying() || keepItTogetherSound.isPlaying() || masterfulSkillSound.isPlaying() || thatWasCloseSound.isPlaying() || thoseAsteroids.isPlaying() || wonderfulManeuveringSound.isPlaying()) {
    audioCheck = true;
  }
  return audioCheck;
}

//plays positive feedback depending on the game
function playCelebratoryAudio(gameTypeNum) {
  
  
  if (gameTypeNum == 1) {
    let randomNum = round(random()*4+1);
    if (randomNum == 1) {
      excellentWorkSound.setVolume(2*volumeMultiplier);
      excellentWorkSound.play();
    }
    else if (randomNum == 2) {
      wellDoneSound.setVolume(2*volumeMultiplier);
      wellDoneSound.play();
    }
    else if (randomNum == 3) {
      wellDoneSound.setVolume(2*volumeMultiplier);
      masterfulSkillSound.play();
    }
    else if (randomNum == 4) {
      wellDoneSound.setVolume(2*volumeMultiplier);
      thoseAsteroids.play();
    }
    else if (randomNum == 5) {
      wonderfulManeuveringSound.setVolume(2*volumeMultiplier);
      wonderfulManeuveringSound.play();
    }
  }
  
  if (gameTypeNum == 2) {
    let randomNum = round(random()*3+1);
    if (randomNum == 1 && !excellentWorkSound.isPlaying()) {
      excellentWorkSound.setVolume(2*volumeMultiplier);
      excellentWorkSound.play();
      STEnotifText = "Excellent Work!"
    }
    else if (randomNum == 2 && !wellDoneSound.isPlaying()) {
      wellDoneSound.setVolume(2*volumeMultiplier);
      wellDoneSound.play();
      STEnotifText = "Well Done!";
    }
    else if (randomNum == 3 && !goodJobSaveEarthSound.isPlaying()) {
      goodJobSaveEarthSound.setVolume(2*volumeMultiplier);
      goodJobSaveEarthSound.play();
      STEnotifText = "Good job on those asteroids. Perhaps you're ready for a challenge?";
    }
    else if (randomNum == 4 && !thoseAsteroids.isPlaying()) {
      thoseAsteroids.setVolume(2*volumeMultiplier);
      thoseAsteroids.play();
      STEnotifText = "Those asteroids are too slow for you!";
    }
  }
  
  if (gameTypeNum == 3) {
    let randomNum = round(random()*2+1);
    if (randomNum == 1) {
      excellentWorkSound.setVolume(2*volumeMultiplier);
      excellentWorkSound.play();
    }
    else if (randomNum == 2) {
      wellDoneSound.setVolume(2*volumeMultiplier);
      wellDoneSound.play();
    }
    else if (randomNum == 3) {
      goodWorkCadetSound.setVolume(2*volumeMultiplier);
      goodWorkCadetSound.play();
    }
  }
  
}

//plays the bad audio depending on game
function playBadAudio(gameTypeNum) {
  
  
  if (gameTypeNum == 1) {
    let randomNum = round(random()*2+1);
    if (randomNum == 1) {
      dontFretSound.setVolume(2*volumeMultiplier);
      dontFretSound.play();
    }
    else if (randomNum == 2) {
      keepOnTryingSound.setVolume(2*volumeMultiplier);
      keepOnTryingSound.play();
    }
    else if (randomNum == 3) {
      keepItTogetherSound.setVolume(2*volumeMultiplier);
      keepItTogetherSound.play();
    }
  }
  
  if (gameTypeNum == 3) {
    let randomNum = round(random()*2+1);
    if (randomNum == 1) {
      dontFretSound.setVolume(2*volumeMultiplier);
      dontFretSound.play();
    }
    else if (randomNum == 2) {
      keepOnTryingSound.setVolume(2*volumeMultiplier);
      keepOnTryingSound.play();
    }
    else if (randomNum == 3) {
      itsAlrightSound.setVolume(2*volumeMultiplier);
      itsAlrightSound.play();
    }
  }
}