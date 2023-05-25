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

function preload() {
  imageBackground = loadImage("imgs/E/background.png");
  blobSmall = loadImage("imgs/E/blob.png");
  blobSmallMirr = loadImage("imgs/E/blob_rotated.png");
}

function positions(){
  let width = rows = 3;
  let height = cols = 6;

  for(let index = 0; index <= (cols*rows)-1; index++) {
    let y = index % width;
    let x = Math.floor(index / width);
    
    let freq = getRandomFloat(0.01,0.015);

    /* for top and bottom rows */
    if(y !== 1){ 
      
      if(x % 2 !== 0 && x!==0){
        
        let sW = blobSmall.width/scaleFactorBlob;
        let sH = blobSmall.height/scaleFactorBlob;
        let offsetX = (blobSmall.width/scaleFactorBlob*0.40);
       
        tBlobs[index] =new Blob( (x-1)*blobSmall.width/scaleFactorBlob *0.80 + ( blobSmall.width/scaleFactorBlob - offsetX),y*blobSmall.height/scaleFactorBlob  , sW,sH,'small', freq)
      } else{
        let sW = blobSmall.width/scaleFactorBlob;
        let sH = blobSmall.height/scaleFactorBlob;
        
        tBlobs[index] =new Blob(x*blobSmall.width/scaleFactorBlob *0.80 ,y*blobSmall.height/scaleFactorBlob , sW,sH,'small', freq)
      }
    }else{
      /* for middle row we need to use the objects mirrored and arrange them differently */
      let rev_x = 5 - x;
      if(rev_x % 2 !== 0 && rev_x!==0){
        let sW = blobSmall.width/scaleFactorBlob;
        let sH = blobSmall.height/scaleFactorBlob;
        let offsetX = (blobSmall.width/scaleFactorBlob*0.40);
     
        tBlobs[index] =new Blob( (rev_x-1)*blobSmall.width/scaleFactorBlob *0.80 + ( blobSmall.width/scaleFactorBlob - offsetX),y*blobSmall.height/scaleFactorBlob  , sW,sH,'small_mirrored', freq)
      } else{
        let sW = blobSmall.width/scaleFactorBlob;
        let sH = blobSmall.height/scaleFactorBlob;
        
        tBlobs[index] =new Blob(rev_x*blobSmall.width/scaleFactorBlob *0.80 ,y*blobSmall.height/scaleFactorBlob , sW,sH,'small_mirrored', freq)
      }
    }
  }
    // console.log(`index: ${index}, x: ${x}, y: ${y}`);
}


function setup() {
  w_m= w_m/mainScaleFactor;
  h_m = h_m/mainScaleFactor;
  createCanvas(w_m, h_m);
  positions();

}

function draw() {
  if(toggleBckgrnd){
    background(100,100,125);
  }
  if(toggleBckImg){
    tint(255,255);
    image(imageBackground, 0, 0,w_m,h_m);
  }
  
  push();
  translate(215/mainScaleFactor,124/mainScaleFactor);
  
  if(toggleDispBlobs){


    let remapX = new Map([
      [0,1],
      [16,1],
      [2,1],
      [3,2],
      [13,2],
      [5,2],
      [6,3],
      [10,3],
      [8,3],
      [9,4],
      [7,4],
      [11,4],
      [12,5],
      [4,5],
      [14,5],
      [15,6],
      [1,6],
      [17,6],
    ]);
    let remapI = new Map([
      [0,0],
      [16,1],
      [2,2],
      [3,3],
      [13,4],
      [5,5],
      [6,6],
      [10,7],
      [8,8],
      [9,9],
      [7,10],
      [11,11],
      [12,12],
      [4,13],
      [14,14],
      [15,15],
      [1,16],
      [17,17],
    ]);

   
    // /* drawing second row */
    tBlobs.forEach( (el, i)=>{
      let y = i % 3;
      let x = Math.floor(i/3);
      
      if(y==1){
        el.display();
        el.updateInput('E',i);
      }
    });
    for(let i = 0; i< 18; i ++){
      let y = i % 3;
      let x = Math.floor(i/3);
      if(y!==1){
        let remI = remapI.get(i);
        tBlobs[remI].display()
        tBlobs[remI].updateInput('E',i) 
      }
    }
    // // // /* drawing third row */
    // tBlobs.forEach( (el, i)=>{
    //   let y = i % 3;
    //   let x = Math.floor(i/3);
    //   if(y==2){
    //     el.display();
    //     el.updateInput('E',i);
    //   }
    // });


    // // // /* drawing first row */
    // tBlobs.forEach( (el, i)=>{
    //   let y = i % 3;
    //   let x = Math.floor(i/3);
    //   if(y==0){
    //     el.display();
    //     el.updateInput('E',i);
    //   }
    // })
    
  }else{
    
    tBlobs.forEach( (el)=>{
      el.update();
    });
    
  }
  debugAnchors();
  pop();
  printMouse();
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


