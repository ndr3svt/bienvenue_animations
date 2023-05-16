let imageBackground;
let blobs;
let blobSmall;
let blobBig;
let w = 960;
let h = 540;
let tBlobs = Array(18);
let blobA = new Array(2);
let blobB = new Array(2);
let scaleFactor = 2;

function preload() {
  imageBackground = loadImage("data/animation_1_background.png");
  blobs = loadImage("data/animation_1_blobs.png");
  blobSmall = loadImage("data/blob_small.png");
  blobBig = loadImage("data/blob_big.png");
}

function setup() {
  createCanvas(960, 540, WEBGL);

  blobA[0] = 492.9;
  blobA[1] = 343.3;
  blobB[0] = 703.1;
  blobB[1] = 363.5;

  let index=0;
  for(let i = 0; i<3; i++){
    for(let j = 0; j<6;j++){
      tBlobs[index] = new Blob(j*blobSmall.width,i*blobSmall.height,"small");
      index++;
    }
  }
}

function draw() {
  background(0);
  tint(255,255);
  image(imageBackground, 0, 0, width, height);
  for(let i =0; i< tBlobs.length-1;i++){
    tBlobs[i].display();
  }
}

class Blob{
  constructor(_x, _y, _type){
    this.x = _x;
    this.y = _y;
    this.type = _type;
    if(_type == "small"){
      this.blobImg = blobSmall;
    }else{
      this.blobImg = blobBig;
    }
    this.w = this.blobImg.width;
    this.h = this.blobImg.height;
  }

  display(){
    image(this.blobImg, this.x, this.y, this.w, this.h);
  }
}
