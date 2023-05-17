let imageBackground;
let blobs;
let blobSmall;
let blobBig;
let w_m = 1920;
let h_m = 1080;
let tBlobs = Array(18);
let blobPos = Array[18];
let mainScaleFactor=2;
let scaleFactorBlob = 2.2;
let toggleDebug=false;
function preload() {
  imageBackground = loadImage("animation_1_background.png");
  blobs = loadImage("animation_1_blobs.png");
  blobSmall = loadImage("blob_small.png");
  blobBig = loadImage("blob_big.png");
  blobSmallMirr = loadImage("blob_small_mirrored.png");
}

function positions(){
  let width = 3;
  let height = 6;

  for(let index = 0; index <= width * height; index++) {
      let y = index % width;
      let x = Math.floor(index / width);
      
      let freq = getRandomFloat(0.005,0.15);
      if(x % 2 !== 0 && x!==0){
        
        let sW = blobSmall.width/scaleFactorBlob*1.5;
        let sH = blobSmall.height/scaleFactorBlob*1.45;
        let offsetX = (blobSmall.width/scaleFactorBlob*0.5);
        let offsetY = blobSmall.height/scaleFactorBlob *0.25;
        tBlobs[index] =new Blob(x*blobSmall.width/scaleFactorBlob - offsetX , y*blobSmall.height/scaleFactorBlob -offsetY, sW,sH,'small', freq)
      }else{
        tBlobs[index] =new Blob(x*blobSmall.width/scaleFactorBlob, y*blobSmall.height/scaleFactorBlob, blobSmall.width/scaleFactorBlob, blobSmall.height/scaleFactorBlob,'small', freq)
      }
      console.log(`index: ${index}, x: ${x}, y: ${y}`);
  }

}
function setup() {
  w_m= w_m/mainScaleFactor;
  h_m = h_m/mainScaleFactor;
  createCanvas(w_m, h_m);
  positions();

}

function draw() {
  background(0);
  tint(255,255);
  image(imageBackground, 0, 0,w_m,h_m);
  push();


  translate(124/mainScaleFactor,124/mainScaleFactor);
  for(let i =0; i< tBlobs.length-1;i++){
    let y = i % 3;
    let x = Math.floor(i/6);
    
    if(y % 2 !== 0 ){
      push();
      rotate(radians(180));
      translate(-1672/mainScaleFactor,- 586/mainScaleFactor )
      tBlobs[i].display();
      pop();
    }else{
      tBlobs[i].display();
    }

  }
  debugAnchors();
  pop();
  printMouse();
 
}

class Blob{
  constructor(_x, _y, _w,_h,_type, _freq){
    this.x = _x;
    this.y = _y;
    this.ox = 0;
    this.oy = 0;
    this.type = _type;
    if(_type == "small"){
      this.blobImg = blobSmall;
    }else if(_type =="small_mirrored"){
      this.blobImg = blobSmallMirr;
    }
    this.w = _w;
    this.h = _h;
    this.oscOpacity=255;
    this.time = 0;
    this.freq= _freq;
    this.time2=0;
    this.freq2 = _freq*getRandomFloat(0.5,1.5);
  }

  display(){
    tint(255,this.oscOpacity);
    image(this.blobImg, this.x+this.ox, this.y + this.oy, this.w, this.h);
   
    this.update();
  }

  displayAnchor(){
    let x = this.x + this.ox;
    let y = this.y + this.oy;
    tint(255,255);
    noStroke();
    fill(255,0,0);
    ellipse(x,y,2,2);
    stroke(0,255,0);
    strokeWeight(0.5);
    noFill();
    line(x-15,y,x+15,y)
    line(x,y-15,x,y+15)
    strokeWeight(0.5);
    stroke(255,255,0);
    rect(x,y,this.w,this.h)
  }
  update(){
    this.time+=this.freq;
    this.time2+=this.freq2;
    this.oscOpacity=map(Math.sin(this.time), -1,1,155,255);
    this.ox = map(Math.sin(this.time2), -1,1,-8,8);
    this.oy = map(Math.sin(this.time), -1,1,-10,10);

  }
}

function keyPressed() {
  if (key === 'a' || key === 'A') {
    toggleDebug=!toggleDebug;
  }
}

function getRandomFloat(min, max) { 
	return Math.random() * (max - min) + min; 
}


function printMouse(){
  let consola = document.querySelector('#output');
  consola.innerHTML = `mx: ${mouseX}, my: ${mouseY}`
}

function debugAnchors(){

  if(toggleDebug){
    /* draw anchors */
    for(let i =0; i< tBlobs.length-1;i++){
      let y = i % 3;
      let x = Math.floor(i/6);
      
      if(y % 2 !== 0 ){
        push();
        rotate(radians(180));
        translate(-1670/mainScaleFactor,- 586/mainScaleFactor )
          tBlobs[i].displayAnchor();
          
        pop();
      }else{
        tBlobs[i].displayAnchor();
      }
    }  
  }
}

