function SpaceCommand() {
  
  //'class' variables
  let difficulty = 1;
  let diffText = 'Easy';
  let questionsAnswered = 1;
  let timeToAnswer = 1;
  let timer;
  let score;
  let onButton = false;
  let SCcanvas;
  let SCscene;
  
  let targetFrame;
  let timeFrame;
  let tempTime;
  let questionTime;
  let totalTimeSpent;
  let stopwatch;
  let wordsPerMinute;
  let scoreToWin;
  let progressBarLength;
  let beginGame;
  
  let opacity = 255; 
  let deltaOpacity = -5;
  
  let showGreenArrow;
  let cmdEntered;
  let completedCMD;
  let cmdLine = 0;
  let currentCmd;
  let charIndex;
  let needNewCmd;
  let startCmd;
  let cmd;
  let correctness;
  let count;
  let wordCount;
  let clockTime;
  let clockFrame;
  let timerAngle;
  
  let showGreenLight;
  let showRedLight;
  let fade = true;
  
  this.enter = function() {
    //creates canvas obj
    SCcanvas = createCanvas(1280, 720);
    SCscene = 1;
    
    //these variables are reset to the game beginning state.
    onButton = false;
    finalScore = 0;
    questionsAnswered = 0;
    questionTime = 0;
    totalTimeSpent = 1;
    wordsPerMinute = 0;
    targetFrame = 0;
    timeFrame = 0;
    scoreToWin = 0;
    tempTime = null;
    progressBarLength = 0;
    score = 0;
    beginGame = false;
    
    showGreenArrow = true;
    cmdEntered = "";
    completedCMD = true;
    cmdLine = 0;
    currentCmd = "";
    charIndex = 0;
    needNewCmd = false;
    startCmd = true;
    cmd = "";
    count = 0;
    wordCount = 0;
    clockTime = 0;
    clockFrame = 0;
    timerAngle = 3/2*PI;
    
    showGreenLight = false;
    showRedLight = false;
    correctness = false;
    
    //tells the program that we are in Space Command
    gameType = 3;
  }
  
  this.draw = function() {
    
    //the main draw scene that determines what is shown on the screen
    textFont(mainFont);
    if (SCscene == 1) {
      this.gameMenu();
    }
    if (SCscene == 2) {
      this.instructions();
    }
    if (SCscene == 3) {
      this.spaceCommandGame();
    }
    if (SCscene == 4) {
      this.showVictoryScreen();
    }
    if (SCscene == 5) {
      this.sceneManager.showScene(menu);
    }
    if (SCscene == 6) {
      //displays the score as wpm
      wordsPerMinute = round(wordCount/ (totalTimeSpent/60/60),2);
      finalWordScore = wordsPerMinute;
      this.sceneManager.showScene(GameOver);
    }
  }
  
  this.gameMenu = function() {
    //if mouse is on the canvas, button audio resets
    removeElements();
    SCcanvas.mouseOver(this.allowButtonAudio);
      
    //draws image background and monitor
    image(backgroundPicture, 0, 0, width, height, 0, 0, backgroundPicture.width, backgroundPicture.height);
    image(smallScreen, 245, 80, smallScreen.width*1.75, smallScreen.height*1.75);
    
    //text for '>'
    fill(10, 240, 10);
    textSize(26);
    textFont(boldFont);
    text(">", 275, 115);
    
    //adds a highlight
    textFont(mainFont)
    fill(0);
    stroke("white");
    strokeWeight(2);
    rect(190, 250, 925, 140, 10);
    noStroke();
    fill(255);
    
    //text for title
    textSize(120);
    text("Space Command", 200, 350);

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
  
  this.instructions = function() {
    
    removeElements();
    
    //stops menu music
    if (menuMusic.isPlaying()) {
      menuMusic.stop();
    }
    
    //draws background
    image(backgroundPicture, 0, 0, width, height, 0, 0, backgroundPicture.width, backgroundPicture.height);
    
    //hightlights the instructions text
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
    if(!instructionsSpaceCommand.isPlaying()) {
      instructionsSpaceCommand.setVolume(1*volumeMultiplier);
      instructionsSpaceCommand.play();
    }
    
    //the instructions are written as text as well
    let instructText = "Houston is counting on you to guide the ship. Type in the commands using your keyboard, but every second counts! Make sure you finish the command before the timer runs out.";
    
    //highlights the text
    fill(0);
    stroke("white");
    strokeWeight(2);
    rect(100, 250, 1150, 260, 10);
    noStroke();
    //prints instuctions
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
    playButton.mousePressed(this.goToSC);
    playButton.mouseOver(this.playButtonAudio);
  }
  
  this.spaceCommandGame = function() {
    //responsible for when things should happen
    targetFrame++;
    //responsible for timer
    timeFrame++;
    
    //changes the score to win depending on the difficulty
    if (difficulty == 1) {
      timeToAnswer = 60 * 60;
      scoreToWin = 5;
    }
    else if (difficulty == 2) {
      timeToAnswer = 60 * 40;
      scoreToWin = 7;
    }
    else if (difficulty == 3) {
      timeToAnswer = 60 * 25;
      scoreToWin = 10;
    }
    
    //sets the timer
    timer = timeFrame/60
    timer = round(timer*100)/100;
    
    removeElements();
    
    //draws the background
    //draws the monitor
    image(spaceCmdBG, 0, 0, width, height, 0, 0, spaceCmdBG.width, spaceCmdBG.height);
    image(smallScreen, 245, 80, smallScreen.width*1.75, smallScreen.height*1.75);
    
    //draws the green-red light sprite (off)
    image(noLightImg, 30, 30, noLightImg.width/1.25, noLightImg.height/1.25);
    
    //if the user gets the text correct, green light img is shown
    if (showGreenLight) {
      image(greenLightImg, 30, 30, greenLightImg.width/1.25, greenLightImg.height/1.25);
    }
    //if the user gets the text wrong, red light img is show
    if (showRedLight) {
      image(redLightImg, 30, 30, redLightImg.width/1.25, redLightImg.height/1.25);
    }
    
    //after two seconds, the red/green light turns off, feedback audio is also played 
    if (tempTime + 2.0 == timer && tempTime != null) {
      if (showGreenLight) {
        showGreenLight = false;
        playCelebratoryAudio(gameType);
      }
      if (showRedLight) {
        showRedLight = false;
        playBadAudio(gameType);
      }
    }
    
    //separates the monitor screen
    fill('green');
    textSize(26);
    textFont(boldFont);
    text("-----------------------------------------------------------------", 275, 300);

        //blinking command arrow text
    if (showGreenArrow) {
      fill(10, 240, 10);
      textSize(26);
      textFont(boldFont);
      text(">", 275, 115);
    }
    
    //every 45 frames,the cmd arrow if statement to true or false
    if (targetFrame%45 == 0) {
      if (showGreenArrow)
        showGreenArrow = false;
      else
        showGreenArrow = true;
    }
    
    //grabs a new cmd when needed (after enter key is pressed)
    if (needNewCmd) {
      cmd = "";
      timer = timeToAnswer;
      this.getCommand();
    }
    
    //runs when the user begins the game
    if (startCmd) {
      cmd = "";
      this.getCommand();
      startCmd = false;
    }
    
    
    //prints the command to the monitor
    //does so with an animation
    fill(240, 0, 15);
    textSize(26);
    textFont(semiBoldFont);
    textWrap(WORD);
    text(this.writeOutCmd(currentCmd), 275, 320, 720);
    
    //determines if the user is writing correctly
    for (let i = 0; i < cmdEntered.length; i++) {
      let strSize = cmdEntered.length;
      //checks each letter
      if (cmdEntered.charAt(i) == currentCmd.charAt(i)) {
        count++
      }
      //if each letter is correct then green else red
      if (count == strSize) {
        correctness = true;
      }else {
        correctness = false;
      }
    }
    //resets the count index
    count = 0;
    
    
    //depending on the boolean and code above, changes the user's text color
    if (correctness) {
      fill(10, 240, 10);
    }else {
      fill(240, 0, 15);
    }
    
    if (showGreenArrow) {
      textSize(26);
      textFont(semiBoldFont);
      textWrap(WORD);
      text(cmdEntered + "|", 300, 115, 720)
    }
    
    //prints the user's text to the monitor
    textSize(26);
    textFont(semiBoldFont);
    textWrap(WORD);
    text(cmdEntered, 300, 115, 720);
    

    
    //draws the hud
    this.displayHUD();
    
    //determines when the game ends
    if (score == scoreToWin) {
      targetFrame = 0;
      this.goToVictoryScreen();
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
    SCcanvas.mouseOver(this.allowButtonAudio);
  }
  
    this.displayHUD = function() {
      
      //this is responsible for the timer 
      //shows the green slowly decreasing for the timer
      stroke("black")
      fill(0)
      circle(1160, 150, 100);
      noStroke();
      fill("yellow");
      arc(1160, 150, 100, 100, PI+HALF_PI, PI, PIE);
      fill("red");
      arc(1160, 150, 100, 100, PI, PI+HALF_PI, PIE);
      fill("green");
      arc(1160, 150, 100, 100, timerAngle, -PI/2, PIE);
      
      //makes the stopwatch timer
      stopwatch = clockTime/60;
      stopwatch = round(stopwatch);
      
      //prints the time to the center of the PIE
      textFont(semiBoldFont);
      textSize(40);
      textAlign(CENTER);
      stroke("black");
      strokeWeight(4);
      fill(255)
      text(""+stopwatch, 1160, 162);
      textAlign(LEFT);
      noStroke();
      
      //clockTime, questionTime and clockFrame are responsible for the timer
      //they check how long a user has spent answering each question
      //resets when the question is completed
      if (!completedCMD && beginGame) {
        questionTime++;
        clockTime--;
        clockFrame++;
        timerAngle = -PI/2 + (clockFrame/timeToAnswer)*2*PI;
      }else {
        clockFrame = 0;
        timerAngle = 3/2*PI;
        clockTime = timeToAnswer;
        totalTimeSpent += questionTime;
        questionTime = 0;
      }
      
      //when the user spends too much time on a question
      //the question locks out and checks the user's text
      //checks user text to the cmd
      if (clockFrame == timeToAnswer) {
        completedCMD = true;
        wordCount++;
        
        //returns true if the user is correct
        if (cmdEntered == currentCmd) {
          //checks if we are in the beginning
          if (beginGame) {
            questionsAnswered ++;
            score++;
          }
          if (questionsAnswered == 0) {
            beginGame = true;
          }
          //gets new cmd and triggers the green light function
          needNewCmd = true;
          this.triggerGreenLight();
        }
        //returns true if the user is wrong
        else if (cmdEntered != currentCmd) {
          //if the user gets it wrong, retrieve start cmd again
          //else progress
          if (questionsAnswered == 0) {
            startCmd = true;
          }
          else {
            questionsAnswered++;
            score--;
            needNewCmd = true;
          }
          //triggers the red light function
          this.triggerRedLight();
        }
        cmdEntered = "";
      }
      
      //prints the rocket and planet
      fill(0);
      rect(1050, 250, 210, 450, 20);
      image(rocketVertical, 1123, 600, 66, 124);
      image(SCplanet, 1070, 260, SCplanet.width/30, SCplanet.height/30);
      
      //display score
      if (beginGame) {
        textFont(mainFont);
        fill(240, 0, 15);
        textSize(45);
        text("Commands: "+score+"/"+scoreToWin, 670, 500);
      }
      
      //changes the progressbar based on score
      progressBarLength = (score/scoreToWin) * -240;
    
      //progress bar shows rocket's journey to the destination
      stroke(255)
      strokeWeight(1);
      fill(255, 120);
      rect(1145, 600, 20, -240, 200);
      fill(0);
      rect(1145, 600, 20, progressBarLength, 200);
      fill(20, 20, 255, 120);
      rect(1145, 600, 20, progressBarLength, 200);
      noStroke();
    
  }
  
  this.showVictoryScreen = function() {
    //this draws a new screen, therefore targetFrame has to be incremented
    //for animation purposes.
    targetFrame++;
    removeElements();
    
    //decreases the opacity every 5 frames
    if(targetFrame%5 == 0) {
        opacity += deltaOpacity;
      }
    
    //when the opacity is zero, show victory text
    //after 9 seconds, go to the game over screen
    if (opacity <= 0) {
      fade = false;
      tint(255);
      fill(15, 255, 15);
      textSize(200);
      textFont(boldFont);
      text("VICTORY", 250, 400);
      textFont(mainFont)
      if (targetFrame%540 == 0) {
        this.goToGameOver();
      }
    }
    
    //fades the game out of view using the opacity
    if (fade) {
      tint(opacity);
      image(spaceCmdBG, 0, 0, width, height, 0, 0, spaceCmdBG.width, spaceCmdBG.height);
    }
  }
  
  //key event, adds the typed key to the user's text
  this.keyTyped = function() {
    if (!completedCMD && keyCode != ENTER) {
      cmdEntered += key;
    }
  }  
  
  //key event for when key is released
  this.keyReleased = function() {
    //removes a letter from the user's text
    if (keyCode == BACKSPACE && !completedCMD) {
      cmdEntered = cmdEntered.substring(0, cmdEntered.length -1);
    }
    //if the user pressed enter, stops the user from typing and checks if their text is correct
    if (keyCode == ENTER && !completedCMD) {
      completedCMD = true;
      wordCount++;
      if (cmdEntered == currentCmd) {
        if (beginGame) {
          questionsAnswered ++;
          score++;
        }
        if (questionsAnswered == 0 && !beginGame) {
          beginGame = true;
        }
        needNewCmd = true;
        this.triggerGreenLight();
      }
      else if (cmdEntered != currentCmd) {
        if (questionsAnswered == 0) {
          startCmd = true;
        }
        else {
          questionsAnswered++;
          score--;
          needNewCmd = true;
        }
        this.triggerRedLight();
      }
    cmdEntered = "";
    }
    //increments word count every time space is pressed
    if (keyCode == '32' && !completedCMD && beginGame) {
        wordCount ++;
    }
  }
  
  //triggers the green light and plays noise
  this.triggerGreenLight = function() {
    tempTime = timer;
    showGreenLight = true;
    goodNoiseSFX.setVolume(1*volumeMultiplier);
    goodNoiseSFX.play();
  }
  
  //triggers the red light and plays noise
  this.triggerRedLight = function() {
    tempTime = timer;
    showRedLight = true;
    badNoiseSFX.setVolume(1*volumeMultiplier);
    badNoiseSFX.play();
  }
  
  //sets the scene to call the game menu function
  this.goBack = function() {
    SCscene = 1;
  }
  //sets the scene to call the instructions function
  this.goToInstructions = function() {
    SCscene = 2;
  }
  
  //sets the scene to call the game function
  this.goToSC = function() {
    stopAllExcessNoise();
    SCscene = 3;
  }
  
  //switches the scene to victory screen
  this.goToVictoryScreen = function() {
    SCscene = 4;
  }
  
  //switches the scene to main menu file
  this.goToMainMenu = function() {
    SCscene = 5;
  }
  
  //switches the scene to the gameover file
  this.goToGameOver = function() {
    stopAllExcessNoise();
    SCscene = 6;
  }
  
  //animations for writing out the command
  this.writeOutCmd = function(str) {
    if (targetFrame%3 == 0 && completedCMD) {
      cmd += str.charAt(charIndex);
      charIndex++;
    }
    if (cmd == str && completedCMD) {
      completedCMD = false;
      charIndex = 0;
    }
    return cmd;
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
  
  //gets a random command
  this.getCommand = function() {
    currentCmd = "";
    cmdLine = round(random()*9);
    
    //gets the start command
    if (startCmd) {
      let password = round(random()*8999+1000);
      currentCmd = "Password: "+password;
    }
    
    if (cmdLine == 0 && needNewCmd && !startCmd) {
      let distance = round(random()*5, 2);
      let speed = round(random()*6, 2);
      let angle = round(random()*2*PI, 2);
      currentCmd = "Travel "+distance+" lightyears @ "+speed+" lighthours per second @ an angle "+angle+" radians.";
    } 
    else if (cmdLine == 1 && needNewCmd && !startCmd) {
      currentCmd = "Deploy Emergency Countermeasures! Action# 7723";
    }
    else if (cmdLine == 2 && needNewCmd && !startCmd) {
      let directionNum = round(random()*3);
      let directions = ["North", "East", "South", "West"];
      currentCmd = "Initiate Manual Piloting. Proceed "+directions[directionNum]+" at current speed.";
    }
    else if (cmdLine == 3 && needNewCmd && !startCmd) {
      let GRAV = 6.67e-11;
      let mass = round(random()*12, 2);
      let radius = round(random()*10000+1000, 1);
      let escapeV = round(sqrt(2*GRAV*(mass*1e21)/radius), 1);
      currentCmd = "Calculating escape velocity... Planet Mass: "+mass+" Yg, Radius: "+radius+" m. Escape Velocity: "+escapeV+" m/s"
    }
    else if (cmdLine == 4 && needNewCmd && !startCmd) {
      currentCmd = "Reset all communications and establish a fresh connection to the crew.";
    }
    else if (cmdLine == 5 && needNewCmd && !startCmd) {
      let code = round(random()*8999+1000)
      currentCmd = "Prepare for possible course changes or trajectory calculations. Enter Code: "+code;
    }
    else if (cmdLine == 6 && needNewCmd && !startCmd) {
      currentCmd = "Open solar tarp -> Directive: replenish solar cells.";
    }
    else if (cmdLine == 7 && needNewCmd && !startCmd) {
      currentCmd = "Perform Gravity-Assist Maneuver on nearest black-hole.";
    }
    else if (cmdLine == 8 && needNewCmd && !startCmd) {
      currentCmd = "Warning Notice: Suspicious personnel onboard. PA Announcement: Check all crewmates.";
    }
    else if (cmdLine == 9 && needNewCmd && !startCmd) {
      let distance = round(random()*5, 2);
      let speed = round(random()*6, 2);
      let angle = round(random()*2*PI, 3)
      currentCmd = "Travel "+distance+" lightyears @ "+speed+" lighthours per second @ an angle "+angle+" radians.";
    }
    needNewCmd = false;
   }
  
  //this plays an audio cue when over the button
  this.playButtonAudio = function() {
    if(!onButton) {
      buttonHover.setVolume(1*volumeMultiplier);
      buttonHover.play();
      onButton = true;
    }
  }
  //resets button audio check
  this.allowButtonAudio = function() {
    onButton = false;
  }
  
}