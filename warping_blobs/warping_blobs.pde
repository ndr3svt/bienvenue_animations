/* code written by andres villa torres aka ndr3svt */
/* zurich may 2023 */

PImage imageBackground;
PImage blobs;
PImage blobSmall;
PImage blobBig;
int w= 960;
int h= 540;
/*
blobcoordinates
float [] blobA= [492.9,343.3];

*/
float [] blobA= new float[2];
float [] blobB= new float[2];

int scaleFactor= 2;
void setup() {
  blobA[0] = 492.9;
  blobA[1] = 343.3;
  blobB[0] = 703.1;
  blobB[1] = 363.5;
  
  size(960, 540, P2D);
  //imageBackground = createGraphics(w,h,P2D);
  //blobs = createGraphics(w,h, P2D);
  imageBackground = loadImage("data/animation_1_background.png");
  blobs = loadImage("data/animation_1_blobs.png");
  blobSmall = loadImage("data/blob_small.png");
  blobBig = loadImage("data/blob_big.png");
  println(blobs.width);
}

void draw() {
  background(0);
  tint(255,255);
  image(imageBackground, 0, 0, width, height);
  //image(blobs, 187.6/2, 108.9/2, blobs.width/2, blobs.height/2);
  tint(255,100);
  image(blobSmall, blobB[0], blobB[1], blobSmall.width/scaleFactor, blobSmall.height/scaleFactor);
  tint(255,100);
  image(blobBig, blobB[0], blobB[1], blobBig.width/scaleFactor, blobBig.height/scaleFactor);
}
