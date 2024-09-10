Particle [] ps;
boolean viewerInteraction = false;
boolean actPhysics = false;

void initPartSystem() {
  int amnt = strips.stripList.length * strips.stripList[0].length;
  int sWidth = strips.stripList.length;
  // println(amnt);
  ps = new Particle[amnt];
  // strips.stripList[5][5]
  for (int i = 0; i < (amnt); i++) {
    int x = i%sWidth;
    int y = i/sWidth;
    ps[i] = new Particle(100, strips.stripList[y][x], i);
  }
}

void displayPartSystem2(){
  Particle centroidParticle = new Particle(10000, new PVector(centroid.x, centroid.y), 1000);
  PVector[] polyVerts = edge.toArray(new PVector[edge.size()]);
  int indx=0;
  for (Particle b : ps) {

    if(indx>0){
    
      int inOut=pnInPoly(edge.size(), polyVerts, b.p);
      if(inOut<0){
        // Particle c = ps[indx-1];
         // c.reject(b);
         b.rejectS(centroidParticle);
         b.show();
      }else{
        b.show2();
        b.reject(centroidParticle);
      }
    }

    if (viewerInteraction) {
      if(actPhysics){
        b.attract(centroidParticle);        
      }
    }
    if(actPhysics){
      b.update();
    }
    indx++;
  }
}


void displayPartSystem() {
  int step=8;
  Particle viewer = new Particle(500, new PVector(mouseX, mouseY), 1000);


  for (Particle b : ps) {
    // b.show();

    // if distance from point b to line then attract to each other *** test
    
    for (Particle c : ps) {
      if(actPhysics){
        if(edge.size()>step){
          for(int i = 0; i < edge.size()-step; i+=step){
            if(
              c.p.dist(edge.get(i))< 100
              // (c.p.x > edge.get(i).x && c.p.x >centroid.x) || (c.p.x < edge.get(i).x && c.p.x <centroid.x)
                // c.p.dist(centroid) > 250
              // distToEdge(edge.get(i),c.p)<50 && distToEdge(edge.get(i),c.p)<50

              ){
              c.reject(b);
            }
          }
        }
        // for(int i=0;i<lineAmnt;i++){
        //   if(distToLine(ppA[i],ppB[i],b.p)<60 && distToLine(ppA[i],ppB[i],c.p)<60){
        //     c.attract(b);
        //   }  

        // }
              
      }
    }
    
    if (viewerInteraction) {
      if(actPhysics){
        b.attract(viewer);        
      }
    }
    if(actPhysics){
      b.update();
    }
  }
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

/* 



// algorithm in C to find points within a convex or concave polygon

int pnpoly(int nvert, float *vertx, float *verty, float testx, float testy)
{
  int i, j, c = 0;
  for (i = 0, j = nvert-1; i < nvert; j = i++) {
    if ( ((verty[i]>testy) != (verty[j]>testy)) &&
     (testx < (vertx[j]-vertx[i]) * (testy-verty[i]) / (verty[j]-verty[i]) + vertx[i]) )
       c = !c;
  }
  return c;
}


the same written in js



vertx = []; verty = [];

function pnpoly(var nvert, var vertx, var verty, var testx, var testy).
{
  int i, j, c = 0;
  for (i = 0, j = nvert-1; i < nvert; j = i++) {
   if ( ((verty[i]>testy) != (verty[j]>testy)) &&
   (testx < (vertx[j]-vertx[i]) * (testy-verty[i]) / (verty[j]-verty[i]) + vertx[i]) )
    c = !c;
}

nvert: Number of vertices in the polygon. Whether to repeat the first vertex at the end.
vertx, verty: Arrays containing the x- and y-coordinates of the polygon's vertices.
testx, testy: X- and y-coordinate of the test point.


*/
