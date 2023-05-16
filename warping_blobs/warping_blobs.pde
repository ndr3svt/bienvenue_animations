/* code written by andres villa torres aka ndr3svt */
/* zurich may 2023 */

PImage imageBackground;
PImage blobs;
PImage blobSmall;
PImage blobBig;
int w= 960;
int h= 540;
Blob [] tBlobs = new Blob[18];
/*
blobcoordinates
float [] blobA= [492.9,343.3];

*/
float [] blobA= new float[2];
float [] blobB= new float[2];

int scaleFactor= 2;
void setup() {
  
  
  size(960, 540, P2D);

  blobA[0] = 492.9;
  blobA[1] = 343.3;
  blobB[0] = 703.1;
  blobB[1] = 363.5;

  imageBackground = loadImage("data/animation_1_background.png");
  blobs = loadImage("data/animation_1_blobs.png");
  blobSmall = loadImage("data/blob_small.png");
  blobBig = loadImage("data/blob_big.png");

  int index=0;
  for(int i = 0; i<3; i ++){
    for(int j = 0; j<6;j++){
      tBlobs[index] = new Blob(j*blobSmall.width,i*blobSmall.height,"small");
      index++;
    }
  }

  //imageBackground = createGraphics(w,h,P2D);
  //blobs = createGraphics(w,h, P2D);

  // println(blobs.width);
}

void draw() {
  background(0);
  tint(255,255);
  image(imageBackground, 0, 0, width, height);
  for(int i =0; i< tBlobs.length-1;i++){
    tBlobs[i].display();
   //println( tBlobs[17].x );
  }
  //image(blobs, 187.6/2, 108.9/2, blobs.width/2, blobs.height/2);
  // tint(255,100);
  // image(blobSmall, blobA[0]/scaleFactor  - blobSmall.width/scaleFactor, blobA[1]/scaleFactor - blobSmall.height/scaleFactor, blobSmall.width/scaleFactor, blobSmall.height/scaleFactor);
  // tint(255,100);
  // image(blobBig, blobB[0]/scaleFactor - blobBig.width/scaleFactor, blobB[1]/scaleFactor - blobBig.height/scaleFactor, blobBig.width/scaleFactor, blobBig.height/scaleFactor);
}



class Particle {
  float m;
  float g = 0.001;
  PVector p, s;
  int id;
  boolean onEdge=false;
  Particle(float _m, PVector _p, int _id) {
    m = _m;
    p = _p;
    s = new PVector(0, 0);
    id = _id;
  }

  void update() {
    if(!onEdge){
      s.mult(0.98);
      // boundaries();
      hardBoundaries();
      p = PVector.add(p, s);
    }
  }

  void attract(Particle b) {
    float d = constrain(PVector.dist(p, b.p), 1, 400);
    PVector f = PVector.mult(PVector.sub(b.p, p), b.m * m * g / (d * d));
    PVector a = PVector.div(f, m);
    if (d>50) {
      s.add(a);
    } else {
      s.sub(a);
    }
  }
  void reject(Particle b) {

    float d = constrain(PVector.dist(p, b.p), 1, 1700);
    PVector f = PVector.mult(PVector.sub(b.p, p), b.m * m * g / (d * d));
    PVector a = PVector.div(f, m);
    if (d>200) {
      s.sub(PVector.mult(a,map(d,200,1700,1,0)));
    } else {
      // s.sub(a);
    }
  }
  void rejectS(Particle b){
    float d = constrain(PVector.dist(p, b.p), 1, 400);
    PVector f = PVector.mult(PVector.sub(b.p, p), b.m * m * g / (d * d));
    PVector a = PVector.div(f, m*10.0);
    if (d>20 && d<400) {
      s.sub(PVector.mult(a,map(d,0,400,0,1)));
    } else {
      // onEdge=true;
      // s.sub(a);
    }

  }
  void boundaries() {
    if (p.y > height || p.y < 0) {
      s.y *= -1;
    }
    if (p.x > width || p.x < 0) {
      s.x *= -1;
    }
  }
  void hardBoundaries(){
    if (p.y > height ) {
      onEdge=true;
      p.y =height;
    }
    if (p.y < 0) {
      p.y =0;
      onEdge=true;
    }
    if (p.x > width ) {
      p.x = width;
      onEdge=true;
    }
    if(p.x < 0){
      p.x=0;
      onEdge=true;
    }
  }
  void show() {
    fill(255, 0, 50);
    noStroke();
    ellipse(p.x, p.y, 5, 5);
    textSize(10);
    text(id, p.x+4, p.y+4);
  }
  void show2() {
    fill(0, 255, 50);
    noStroke();
    ellipse(p.x, p.y, 5, 5);
    textSize(10);
    text(id, p.x+4, p.y+4);
  }
}


int pnInPoly(int nvert, PVector [] vert, PVector test)
{
  int i, j;
  int c = 1;
  for (i = 0, j = nvert-1; i < nvert; j = i++) {
   if ( ((vert[i].y>test.y) != (vert[j].y>test.y)) &&
   (test.x < (vert[j].x-vert[i].x) * (test.y-vert[i].y) / (vert[j].y-vert[i].y) + vert[i].x) )
    c = c * (-1);
  }
  return c;
}
