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

function preload() {
  imageBackground = loadImage("animation_1_background.png");
  blobs = loadImage("animation_1_blobs.png");
  blobSmall = loadImage("blob_small.png");
  blobBig = loadImage("blob_big.png");
}

function positions(){
  let width = 3;
  let height = 6;

  for(let index = 0; index <= width * height; index++) {
      let y = index % width;
      let x = Math.floor(index / width);
      let freq = getRandomFloat(0.005,0.15);
      if(x % 2 !== 0 && x!==0){
        console.log('x = ' + x)
        let sW = blobSmall.width/scaleFactorBlob*1.5;
        let sH = blobSmall.height/scaleFactorBlob*1.5;
        let offsetX = (blobSmall.width/scaleFactorBlob*0.5);
        let offsetY = blobSmall.height/scaleFactorBlob *0.25;
        tBlobs[index] =new Blob(x*blobSmall.width/scaleFactorBlob - offsetX , y*blobSmall.height/scaleFactorBlob -offsetY, sW,sH,'big', freq)
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
  for(let i =0; i< tBlobs.length-1;i++){
    
    tBlobs[i].display();
  }
}

class Blob{
  constructor(_x, _y, _w,_h,_type, _freq){
    this.x = _x;
    this.y = _y;
    this.type = _type;
    if(_type == "small"){
      this.blobImg = blobSmall;
    }else{
      this.blobImg = blobBig;
    }
    this.w = _w;
    this.h = _h;
    this.oscOpacity=255;
    this.time = 0;
    this.freq= _freq;
  }

  display(){
    tint(255,this.oscOpacity);
    image(this.blobImg, this.x, this.y, this.w, this.h);
    this.update();
  }
  update(){
    this.time+=this.freq;
    this.oscOpacity=map(Math.sin(this.time), -1,1,155,255);
    console.log(this.oscOpacity)
  }
}


function getRandomFloat(min, max) { 
	return Math.random() * (max - min) + min; 
}