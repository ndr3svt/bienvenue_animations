/* https://sooft.studio */
/* Interaction Design and Cutting Edge Technology */
/* written by Andres Villa Torres aka ndr3svt */
/* Zurich/Venice May 2023 */
/* for Bienvenue Studios */
let imageBackground;
let blobSmall;
let w_m = 1920;
let h_m = 1080;
let tBlobs = Array(18);
let blobPos = Array[18];
let mainScaleFactor=1.5;
let scaleFactorBlob = 1.65;
let toggleDebug=false;
let toggleBckImg =true;
let toggleBckgrnd=true;
let toggleDispBlobs=true;
let toggleUpdatePlay=true;
// let capturer;
function preload() {
  // capturer  = new CCapture ({
  //   format: 'webm',
  //   framerate: 60,
  //   verbose: true
  // });
  imageBackground = loadImage("imgs/A/background.png");
  blobSmall = loadImage("imgs/A/blob_small.png");
  blobSmallMirr = loadImage("imgs/A/blob_small_mirrored.png");
}

function positions(){
  let width = cols = 3;
  let height = rows = 6;

  for(let index = 0; index <= (cols*rows)-1; index++) {
      let y = index % width;
      let x = Math.floor(index / width);
      
      let freq = getRandomFloat(0.01,0.015);
      // let freq = getRandomFloat(0.1,0.1);

      
      /* for top and bottom rows */
      if(y !== 1){ 
        if(x % 2 !== 0 && x!==0){
          let sW = blobSmall.width/scaleFactorBlob*1.5;
          let sH = blobSmall.height/scaleFactorBlob*1.45;
          let offsetX = (blobSmall.width/scaleFactorBlob*0.5);
          let offsetY = blobSmall.height/scaleFactorBlob *0.25;
          tBlobs[index] =new Blob(x*blobSmall.width/scaleFactorBlob - offsetX , y*blobSmall.height/scaleFactorBlob -offsetY, sW,sH,'small', freq)
        } 
        else{
          tBlobs[index] =new Blob(x*blobSmall.width/scaleFactorBlob, y*blobSmall.height/scaleFactorBlob, blobSmall.width/scaleFactorBlob, blobSmall.height/scaleFactorBlob,'small', freq)
        }
      }else{
        /* for middle row we need to use the objects mirrored and arrange them differently */
        if(x % 2 !== 0 && x!==0){
          /* 5-x reverses the order */
          let sW = blobSmall.width/scaleFactorBlob*1.5;
          let sH = blobSmall.height/scaleFactorBlob*1.45;
          let offsetY = blobSmall.height/scaleFactorBlob *0.25;
          tBlobs[index] =new Blob((5-x)*blobSmall.width/scaleFactorBlob , y*blobSmall.height/scaleFactorBlob -offsetY, sW,sH,'small_mirrored', freq)
          
        } 
        else{
          /* 5-x reverses the order */
          tBlobs[index] =new Blob((5-x)*blobSmall.width/scaleFactorBlob, y*blobSmall.height/scaleFactorBlob, blobSmall.width/scaleFactorBlob, blobSmall.height/scaleFactorBlob,'small_mirrored', freq)
        }
      }
      // console.log(`index: ${index}, x: ${x}, y: ${y}`);
  }

}
var can_vas;
// console.log(can_vas)
function setup() {
  w_m= w_m/mainScaleFactor;
  h_m = h_m/mainScaleFactor;
  createCanvas(w_m, h_m);
  positions();
 can_vas = document.getElementById("defaultCanvas0");

}

function draw() {
  // console.log(can_vas)
  // if(frameCount == 1){
  //   capturer.start();
  // }
  if(toggleBckgrnd){
    background(100,100,125);
  }
  if(toggleBckImg){
    tint(255,255);
    image(imageBackground, 0, 0,w_m,h_m);
  }
  
  push();
  translate(124/mainScaleFactor,124/mainScaleFactor);
  
  if(toggleDispBlobs){
    
    /* drawing third row */
    tBlobs.forEach( (el, i)=>{
      let y = i % 3;
      let x = Math.floor(i/6);
      if(y==2){
        el.display();
        // (_x, _y, _w, _h, _freq, _scale, _i)
        el.updateInput('A', i);
      }
    });
    /* drawing second row */
    tBlobs.forEach( (el, i)=>{
      let y = i % 3;
      let x = Math.floor(i/6);
      if(y==1){
        el.display();
        el.updateInput('A',i);
      }
    });

    /* drawing first row */
    tBlobs.forEach( (el, i)=>{
      let y = i % 3;
      let x = Math.floor(i/6);
      if(y==0){
        el.display();
        el.updateInput('A',i);
      }
    })
    
  }else{
    
    tBlobs.forEach( (el)=>{
      // el.update();
    });
    
  }
  debugAnchors();
  pop();
  printMouse();
  let paddedIndex = String(frameCount).padStart(7, '0');
  // console.log(paddedIndex)
  // saveCanvas('img_'+paddedIndex, 'png')
 
  if( frameCount < 3100){
    // to_image(paddedIndex)
    // console.log(canvas)
    // capturer.capture(canvas)
  }else if (frameCount === 3100){
    // capturer.save()
    // capturer.stop()
  }
}

function keyPressed() {
  if (key === 'd' || key === 'D') {
    toggleDebug=!toggleDebug;
  }
  if (key === 'b' || key === 'B') {
    toggleBckgrnd=!toggleBckgrnd;
  }
  if (key === 'i' || key === 'I') {
    toggleBckImg=!toggleBckImg;
  }

}

function getRandomFloat(min, max) { 
	return Math.random() * (max - min) + min; 
}


function printMouse(){
  let consola = document.querySelector('#output');
  consola.innerHTML = `mouseX: ${mouseX}, mouseY: ${mouseY} , frame: ${frameCount}`
}

function debugAnchors(){

  if(toggleDebug){
    /* draw anchors */
    tBlobs.forEach((el,i) =>{
      let y = i % 3;
      let x = Math.floor(i/6);
        el.displayAnchor();
    });  
  }
}

function toggleDebugAnchors() {
  if(document.getElementById("myCheckbox").checked) {
    toggleDebug=true;
  }else{
    toggleDebug=false;
  }
}

function toggleBackground(){
  if(document.getElementById("checkBoxBackground").checked) {
    toggleBckgrnd=true;
  }else{
    toggleBckgrnd=false;
  }
}
function toggleBackgroundImage(){
  if(document.getElementById("checkBoxBackgroundImg").checked) {
    toggleBckImg=true;
  }else{
    toggleBckImg=false;
  }
}

function toggleDisplayBlobs(){
  if(document.getElementById("checkBoxBlobs").checked) {
    toggleDispBlobs=true;
  }else{
    toggleDispBlobs=false;
  }
}


function togglePlay(){
  if(document.getElementById("checkBoxPlay").checked) {
    toggleUpdatePlay = true;
    tBlobs.forEach( el=>{
      el.pausePlay(toggleUpdatePlay);
    })
  }else{
    toggleUpdatePlay = false;
    tBlobs.forEach( el=>{
      el.pausePlay(toggleUpdatePlay);
    })
  }
}

function to_image(frameNr){

  // console.log(can_vas)
  document.getElementById("theimage").src = can_vas.toDataURL();
  Canvas2Image.saveAsPNG(can_vas,can_vas.width,can_vas.height,"img"+frameNr);
}
