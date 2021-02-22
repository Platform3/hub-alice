//diable pinch zoom
document.addEventListener(
  "touchmove",
  function (event) {
    if (event.scale !== 1) {
      event.preventDefault();
    }
  },
  false
);

// correct sizing for mobie with ios style address bar
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);

// fraction sizes relative to width.
let ratio = 16 / 9;

// button relative sizes
let buttonSize = 0.12;
let accessButtonDefaultSize = 100;
let backButtonX = 0;
let backButtonY = 0;
let button1X = 0.43;
let button1Y = 0.3;
let button2X = 0.66;
let button2Y = 0.35;
let button3X = 0.43;
let button3Y = 0.7;
let button4X = 0.63;
let button4Y = 0.7;
let button5X = 0.55;
let button5Y = 0.18;
let buttonsOn = [];

let clickToStart = true;
let enableButtons = false;
let buttonHover1 = false;
let buttonHover2 = false;
let buttonHover3 = false;
let buttonHover4 = false;
let buttonHovers = [buttonHover1, buttonHover2, buttonHover3, buttonHover4];

let accessButtons = [];

// responsive sizing for 'cover' style positioning/sizing
let modX = 0;
let modY = 0;
let vidWidth;
let vidHeight;

let colour = "white";
// arrays for audio/video
let names;
let audio;
let videos;
// last video is the home screen
let homeVid = 5;
let currentVideo = homeVid;
let currentHover = null;
let vidFade = 0;
let vidFading = false;
let fontSize;

// variable for mobile/touch detection
let touch = false;
if ("ontouchstart" in document.documentElement) {
  touch = true;
}
// touch = true

function preload() {
  videoMain = createVideo([
    "https://res.cloudinary.com/the-hub/video/upload/v1606759311/hopes-and-aspirations/Inclusive_Futures_Tree_holding_shot_FADE_AUDIO_oedczu.mp4",
  ]);
  castro = createAudio(
    "https://res.cloudinary.com/the-hub/video/upload/v1606240744/hopes-and-aspirations/Castro_name_audio_trimmed_jtsa0r.m4a"
  );
  rajah = createAudio(
    "https://res.cloudinary.com/the-hub/video/upload/v1606240744/hopes-and-aspirations/Rajah_name_audio_trimmed_rcz9cc.m4a"
  );
  robyn = createAudio(
    "https://res.cloudinary.com/the-hub/video/upload/v1606240744/hopes-and-aspirations/Robyn_name_audio_trimmed_noxfqf.m4a"
  );
  thomas = createAudio(
    "https://res.cloudinary.com/the-hub/video/upload/v1606240744/hopes-and-aspirations/Thomas_name_audio_trimmed_igcesv.m4a"
  );
  aysen = createAudio(
    "https://res.cloudinary.com/the-hub/video/upload/v1606915082/hopes-and-aspirations/Aysen_name_audio_s9lrel.m4a"
  );
  videoCastro = createVideo([
    "https://res.cloudinary.com/the-hub/video/upload/v1606239878/hopes-and-aspirations/Castro_subs_gehkxc.mp4",
  ]);
  videoRajah = createVideo([
    "https://res.cloudinary.com/the-hub/video/upload/v1606239876/hopes-and-aspirations/Rajah_subs_a55dzf.mp4",
  ]);
  videoRobyn = createVideo([
    "https://res.cloudinary.com/the-hub/video/upload/v1606239874/hopes-and-aspirations/Robyn_subs_a17igr.mp4",
  ]);
  videoThomas = createVideo([
    "https://res.cloudinary.com/the-hub/video/upload/v1606239877/hopes-and-aspirations/Thomas_subs_z5njgt.mp4",
  ]);
  videoAysen = createVideo([
    "https://res.cloudinary.com/the-hub/video/upload/v1606239826/hopes-and-aspirations/Aysen_Al_VO_lgyxzs.mp4",
  ]);
  // videoMain.hide();
  // videoCastro.hide();
}

function setup() {
  // frameRate(1);
  //   pixelDensity(1);
  createCanvas(window.innerWidth, window.innerHeight);
  // playsinline allows mobile to have the video on the canvas
  // otherwise it plays fullscreen in quicktime on ios
  videoMain.elt.setAttribute("playsinline", "");
  videoCastro.elt.setAttribute("playsinline", "");
  videoRajah.elt.setAttribute("playsinline", "");
  videoRobyn.elt.setAttribute("playsinline", "");
  videoThomas.elt.setAttribute("playsinline", "");
  videoAysen.elt.setAttribute("playsinline", "");
  castro.elt.setAttribute("playsinline", "");
  rajah.elt.setAttribute("playsinline", "");
  robyn.elt.setAttribute("playsinline", "");
  thomas.elt.setAttribute("playsinline", "");
  aysen.elt.setAttribute("playsinline", "");
  // playMain();
  videos = [
    videoRajah,
    videoCastro,
    videoThomas,
    videoAysen,
    videoRobyn,
    videoMain,
  ];
  audio = [rajah, castro, thomas, aysen, robyn];
  names = ["Rajah", "Castro", "Thomas", "Aysen", "Robyn"];
  positions = [
    [button1X, button1Y],
    [button2X, button2Y],
    [button3X, button3Y],
    [button4X, button4Y],
    [button5X, button5Y],
  ];
  background(0);

  rectMode(CENTER);
  textFont("Amatic SC");
  textStyle(BOLD);
  smooth();

  // make buttons
  makebuttons(
    0,
    accessButtonDefaultSize,
    accessButtonDefaultSize,
    positions[0][0],
    positions[0][1]
  );
  makebuttons(
    1,
    accessButtonDefaultSize,
    accessButtonDefaultSize,
    positions[1][0],
    positions[1][1]
  );
  makebuttons(
    2,
    accessButtonDefaultSize,
    accessButtonDefaultSize,
    positions[2][0],
    positions[2][1]
  );
  makebuttons(
    3,
    accessButtonDefaultSize,
    accessButtonDefaultSize,
    positions[3][0],
    positions[3][1]
  );
  makebuttons(
    4,
    accessButtonDefaultSize,
    accessButtonDefaultSize,
    positions[4][0],
    positions[4][1]
  );

  // back button
  let backbutton = createButton("go back");
  backbutton.addClass("sr-only");
  backbutton.id("back");
  backbutton.attribute("aria-label", `go back`);
  backbutton.size(100, 100);
  backbutton.position(0, 500);
  // button.mousePressed(() => buttonAction(id));
  document.getElementById("back").addEventListener("click", () => playMain());

  accessButtons.push(backbutton);
}

function draw() {
  clear();
  // cursorChange()

  // calculate x and y offset for elements
  // calculate 'cover' size width and height
  if (width / height < ratio) {
    vidWidth = width;
    vidHeight = (height * (width / height)) / ratio;
    modY = height / 2 - vidHeight / 2;
    // modY = 0;
    modX = 0;
  } else {
    vidWidth = width / (width / height / ratio);
    vidHeight = height;
    modX = width / 2 - vidWidth / 2;
    modY = 0;
  }

  fill(colour);

  // initial text
  if (clickToStart) {
    cursor(HAND);
    noStroke();
    // textSize(40);
    textAlign(CENTER);
    fontSize = width > height ? height / 10 : width / 10;
    textSize(fontSize);
    fill(255);
    let clickPadding = touch && width < height ? 50 : 0;
    touch
      ? text("click to start", width / 2, height / 2 - clickPadding)
      : text("click to start", width / 2, height / 3.5 - 50);

    if (touch && width < height) {
      text("you may want to", width / 2, height / 2 + 80);
      text("rotate your phone", width / 2, height / 2 + 170);
    }

    let thisTextSize = fontSize / 2;
    textSize(thisTextSize);
    if (!touch) {
      //["Rajah", "Castro", "Thomas", "Aysen", "Robyn"]
      text(
        "You can use a keyboard to control videos:",
        width / 2,
        height / 3.5 + thisTextSize
      );
      text("1 - Rajah", width / 2, height / 3.5 + thisTextSize * 2);
      text("2 - Castro", width / 2, height / 3.5 + thisTextSize * 3);
      text("3 - Thomas", width / 2, height / 3.5 + thisTextSize * 4);
      text("4 - Aysen", width / 2, height / 3.5 + thisTextSize * 5);
      text("5 - Robyn", width / 2, height / 3.5 + thisTextSize * 6);
      text(
        "Any other key - go back",
        width / 2,
        height / 3.5 + thisTextSize * 7
      );
    }

    textSize(fontSize);
  }

  // squares for button positions
  noFill();

  strokeWeight(4);
  stroke(255, 100);
  noStroke();

  // position the accessible buttons

  // set the button size
  let accessButtonSize = enableButtons ? vidWidth * buttonSize : 0;
  // move offscreen if not enbled
  let disableSize = enableButtons ? accessButtonDefaultSize : 0;
  accessButtons.forEach((accessButton) => {
    accessButton.position(
      vidWidth * accessButton.xPos + modX - accessButtonSize / 2,
      vidHeight * accessButton.yPos + modY - accessButtonSize / 2
    );
    accessButton.size(accessButtonSize, accessButtonSize);
  });
  if (!clickToStart) {
    noStroke();
    rect(
      vidWidth * backButtonX + modX,
      vidHeight * backButtonY + modY,
      width,
      height
    );
  }

  touchButtons();

  if (currentVideo === homeVid && !touch && currentHover !== null) {
    // showName(names[currentHover], mouseX, mouseY);

    let xPos = vidWidth * positions[currentHover][0] + modX;
    let yPos = vidHeight * positions[currentHover][1] + modY;
    showName(names[currentHover], xPos, yPos);
  }

  if (enableButtons) {
    cursor(ARROW);
  } else {
    cursor(HAND);
  }
}

function mousePressed() {
  // set the video to loop and start playing

  // hit detection on click/tap
  if (!enableButtons) {
    setTimeout(function () {
      backButton(
        vidWidth * backButtonX + modX,
        vidHeight * backButtonY + modY,
        width,
        height
      );
    }, 400);
  }
  if (clickToStart) {
    // make sure the playMain happens after button click
    setTimeout(function () {
      playMain();
    }, 400);
    clickToStart = false;
  }
}

function makebuttons(id, xSize, ySize, xPos, yPos) {
  let button = createButton(names[id]);
  // button.addClass('sr-only')
  button.id(id);
  button.attribute("aria-label", `play ${names[id]} video`);
  button.size(xSize, ySize);
  button.position(xPos, yPos);
  button.xPos = xPos;
  button.yPos = yPos;
  // button.mousePressed(() => buttonAction(id));
  document.getElementById(id).addEventListener("click", () => buttonClick(id));
  document
    .getElementById(id)
    .addEventListener("mouseenter", () => buttonsEnter(id));
  document
    .getElementById(id)
    .addEventListener("mouseleave", () => buttonsLeave(id));

  accessButtons.push(button);
}

function buttonClick(clip) {
  if (!clickToStart && enableButtons) {
    playNewVideo(currentVideo, clip);
    enableButtons = false;

    if (touch) playAudio(clip);
  }
}

function buttonsEnter(clip) {
  if (!clickToStart && enableButtons) {
    playAudio(clip);
    currentHover = clip;
  }
}

function buttonsLeave(clip) {
  currentHover = null;
}
// hit detection for audio and video clips
function isMouseInside(x, y, size, clip, click = false) {
  if (enableButtons && !clickToStart) {
    if (
      mouseX > x - size / 2 &&
      mouseX < x + size / 2 &&
      mouseY > y - size / 2 &&
      mouseY < y + size / 2
    ) {
      buttonsOn[clip] = true;
      currentHover = clip;
      if (touch && click && !buttonHovers[clip]) {
        playAudio(clip);
      }
      if (!buttonHovers[clip]) {
        playAudio(clip);
      }
      if (click) {
        playNewVideo(currentVideo, clip);
      }
      buttonHovers[clip] = true;
    } else {
      // colour = "red"
      buttonHovers[clip] = false;
      buttonsOn[clip] = false;
      // return false;
    }
  } else {
  }
}

function cursorChange() {
  let checker = (arr) => arr.every((v) => v === false);
  if (checker(buttonsOn)) {
    cursor(ARROW);
  } else {
    cursor(HAND);
    // noFill()
    // stroke(255)
    // strokeWeight(10)
    // let circleDiameter = width / 8
    // circle(mouseX, mouseY, circleDiameter)
    if (currentVideo === homeVid && !touch) {
      showName(names[currentHover], mouseX, mouseY);
    }
  }
}

function touchButtons() {
  //["Rajah", "Castro", "Thomas", "Aysen", "Robyn"]
  if (touch && !clickToStart && currentVideo === homeVid) {
    showName(
      names[0],
      vidWidth * button1X + modX,
      vidHeight * button1Y + modY + fontSize * 0.2,
      0.6
    );
    showName(
      names[1],
      vidWidth * button2X + modX,
      vidHeight * button2Y + modY + fontSize * 0.2,
      0.6
    );
    showName(
      names[2],
      vidWidth * (button3X - 0.03) + modX,
      vidHeight * button3Y + modY + fontSize * 0.25,
      0.6
    );
    showName(
      names[3],
      vidWidth * (button4X + 0.03) + modX,
      vidHeight * button4Y + modY + fontSize * 0.25,
      0.6
    );
    showName(
      names[4],
      vidWidth * button5X + modX,
      vidHeight * (button5Y + 0.1) + modY - fontSize * 0.45,
      0.6
    );
  }
}

function showName(name, x, y, scale = 1) {
  let thisScale = width < height ? scale * 1.6 : scale;
  let thisYAdd = width < height ? 20 : 0;

  fill(0);
  noStroke();
  textSize(fontSize * thisScale);
  textAlign(CENTER);
  text(name, x + 2, y + fontSize / 3 + 2 + thisYAdd);
  fill(255);
  noStroke();
  textSize(fontSize * thisScale);
  text(name, x, y + fontSize / 3 + thisYAdd);
}

// hit detection for back button
function backButton(x, y, width, height) {
  if (!enableButtons && !clickToStart) {
    if (mouseX > x && mouseX < x + width && mouseY > y && mouseY < y + height) {
      enableButtons = false;
      playMain();
    }
  }
}

// play the home page video and clean up
function playMain() {
  vidFade = 0;
  vidFading = true;
  enableButtons = true;
  currentVideo = homeVid;
  videos.map((clip) => {
    setTimeout(function () {
      stopVideo(clip);
    }, 700);
    clip.addClass("out");
    clip.removeClass("in");
  });
  videos[homeVid].removeClass("out");
  videos[homeVid].addClass("in");
  videos[homeVid].loop();
}

function stopVideo(clip) {
  clip.stop();
}

function playNewVideo(oldClip, newClip) {
  enableButtons = false;
  vidFade = 0;
  videos.map((clip) => {
    clip.addClass("out");
    clip.removeClass("in");
  });
  videos[newClip].removeClass("out");
  videos[newClip].addClass("in");
  videos[newClip].stop();
  videos[newClip].play();
  if (newClip !== oldClip) videos[oldClip].stop();
  currentVideo = newClip;
  videos[newClip].onended(playMain);
  vidFading = true;
}

// play audio clip and stop others
function playAudio(clip) {
  showName(names[clip], mouseX, mouseY);
  currentHover = clip;
  audio.forEach((clip) => {
    clip.stop();
  });
  audio[clip].play();
}

function keyPressed() {
  if (clickToStart) {
    playMain();
    clickToStart = false;
  }
  //names = ["Rajah", "Castro", "Thomas", "Aysen", "Robyn"]
  if (key == "1") {
    playNewVideo(currentVideo, 0);
  } else if (key == "2") {
    playNewVideo(currentVideo, 1);
  } else if (key == "3") {
    playNewVideo(currentVideo, 2);
  } else if (key == "4") {
    playNewVideo(currentVideo, 3);
  } else if (key == "5") {
    playNewVide1o(currentVideo, 4);
  } else {
    playMain();
  }
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

if (window.DeviceOrientationEvent) {
  window.addEventListener(
    "orientationchange",
    function () {
      location.reload();
    },
    false
  );
}
