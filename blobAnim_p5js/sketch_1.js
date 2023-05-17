let imageBackground;
let blobs;
let blobSmall;
let blobBig;
let w_m = 960;
let h_m = 540;
let tBlobs = Array(18);
let blobPos = Array[18];
let scaleFactor = 2;

function preload() {
  imageBackground = loadImage("animation_1_background.png");
  blobs = loadImage("animation_1_blobs.png");
  blobSmall = loadImage("blob_small.png");
  blobBig = loadImage("blob_big.png");
}


function positions(){
  // for(let i =0; i< 19; i ++){
  //  blobPos 
  // }

  let width = 3;
  let height = 6;

  for(let index = 0; index <= width * height; index++) {
      let y = index % width;
      let x = Math.floor(index / width);
      let freq = getRandomFloat(0.005,0.15);
      if(x % 2 !== 0 && x!==0){
        console.log('x = ' + x)

        let sW = blobSmall.width/scaleFactor*1.5;
        let sH = blobSmall.height/scaleFactor*1.5;
        let offsetX = (blobSmall.width/scaleFactor*0.65);
        let offsetY = blobSmall.height/scaleFactor *0.25;
        
        tBlobs[index] =new Blob(x*blobSmall.width/scaleFactor - offsetX , y*blobSmall.height/scaleFactor -offsetY, sW,sH,'small', freq)
      }else{
        tBlobs[index] =new Blob(x*blobSmall.width/scaleFactor, y*blobSmall.height/scaleFactor, blobSmall.width/scaleFactor, blobSmall.height/scaleFactor,'small', freq)
      }
      
      console.log(`index: ${index}, x: ${x}, y: ${y}`);
  }

}
function setup() {
  createCanvas(960, 540);
  positions();
  // let index=0;
  // for(let i = 0; i< 19;i++){
  //   tBlobs[i] = new Blob(i*20, 50, 20, 20);
  // }
  // for(let i = 0; i<3; i++){
  //   for(let j = 0; j<6;j++){
  //     tBlobs[index] = new Blob(j*blobSmall.width,i*blobSmall.height, blobSmall.width, blobSmall.height,"small");
  //     index++;
  //   }
  // }
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