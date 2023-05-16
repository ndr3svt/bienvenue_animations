import processing.core.*; 
import processing.data.*; 
import processing.event.*; 
import processing.opengl.*; 

import java.util.HashMap; 
import java.util.ArrayList; 
import java.io.File; 
import java.io.BufferedReader; 
import java.io.PrintWriter; 
import java.io.InputStream; 
import java.io.OutputStream; 
import java.io.IOException; 

public class warping_adv_physics_19520 extends PApplet {

/* code written by ndr3svt */
/* zurich may 2020 */
/* purpose is to eliminate selected pixel regions on images and 
expanding the edges towards the borders of either neighbouring edges or
borders of the image */



// function that is generating an array list of an array of vectors
// if wanting to access this you need to take out the arraylist<PVector[]> strips out of the drawmesh function
// this function could be a class
// 1. try to build this function as a class  *** done
// 2. try to draw the points where the vertex's are *** done
// 3. make them interdependent so they move proportionally expanding 
// the edges towards the borders of either neighbouring edges or borders of the image *** done
// 4. all the other pixels that don't belong to the image go on to the borders accordingly their relation towards the edges  *** done
// of the image and the centroid of the edges
/* to do' s */
// 5. find edges automatically



PImage image;
PShader imageShader;



PGraphics graph;
PGraphics dots;
PVector viewer;
DStrip strips;
DStrip stripsCopy;
int w = 1680 ;
int h = 1050;
int saveIndex=0;
boolean shouldSave = false;
public void setup() {
  
  frameRate(60);
  viewer = new PVector(0,0,0);
  graph = createGraphics(w,h, P2D);
  dots = createGraphics(w,h, P2D);
  image = loadImage("img22.png");
  imageShader = loadShader("imageShader.glsl");
  imageShader.set("imageSampler", image);
  centroid = new PVector(width/2,height/2);
  initMesh(25,25);
  initPartSystem();
  // initLine();
  initEdge();
  
}

public void draw() {
  background(0);
  viewer = new PVector(mouseX,mouseY,0);
  graph.beginDraw();
  dots.beginDraw();
  dots.clear();
  drawMesh();
  dots.endDraw();
  graph.shader(imageShader);
  graph.endDraw();
  image(graph,0,0,w,h);
  image(dots,0,0,w,h);
  if(shouldSave){
    if(saveIndex%10==0){
      graph.save("data/"+year()+"_"+month()+"_"+day()+"_"+hour()+"_"+minute()+"/image_"+saveIndex+".jpg");
    }
    saveIndex++;
  }
  noStroke();
  fill(255, 0, 50);
  textSize(10);
  text(frameRate,50,50);
  text("mean distance: " + meanDist,50,100);
  strips.update();
  // displayPartSystem();
  displayPartSystem2();
  dipslayPhysics();
  // for(int i = 0;i<lineAmnt;i++){
  //   dispBLine(ppA[i],ppB[i]);    
  // }
  displayEdge();
  

}
public void keyPressed(){
  if(key == 'R' || key == 'r'){
    initMesh(25,25);
    initPartSystem();
    // initLine();
    initEdge();
  }
  if (key == 'm' || key  == 'M') {
    viewerInteraction=!viewerInteraction;
  }
  if( key == 'p' || key == 'P'){
    actPhysics = !actPhysics;
  }
  if( key == 's' || key == 'S'){
    shouldSave = !shouldSave;
  }
}
public void manualTest(){
    //  to manipulate the vectors  directly
  for(int h = 0; h < strips.stripList.length;h++){
    for(int i = 0; i< strips.stripList[0].length;i++){

      PVector t =  strips.stripList[h][i];
      if(viewer.dist(t)<50){
        strips.stripList[h][i] = new PVector(t.x +5,t.y+5,0);
      }else{
        strips.stripList[h][i] = stripsCopy.stripList[h][i];
      }
      
    }
  }
  strips.stripList[5][5] = new PVector(mouseX,mouseY,0);
}

public void dipslayPhysics(){
  if(actPhysics){
    for(int h = 0; h < strips.stripList.length;h++){
      for(int i = 0; i< strips.stripList[0].length;i++){
        strips.stripList[h][i] = ps[(i) + (h*strips.stripList.length)].p;
      }
    }
  }
}



public void initMesh(int x, int y) {
  strips = new DStrip(x,y);
  stripsCopy = new DStrip(x,y);

}
public void drawMesh() {

  // strips= drawStrip(x, y, a);
  for (int i = 0; i < strips.stripList.length-2; i++) {
    float v1 = 1.0f*i/(strips.stripList.length-2);
    float v2 = 1.0f*(i+1)/(strips.stripList.length-2);

    PVector[] list1=strips.stripList[i];    
    PVector[] list2=strips.stripList[i+1];

    graph.beginShape(QUAD_STRIP);


    for (int j = 0; j < list1.length; j++) {

      float u = 1.0f*j/(list1.length-1);
      PVector vec1 = list1[j];
      PVector vec2 = list2[j];

      graph.vertex(vec1.x, vec1.y, u, v1);
      graph.vertex(vec2.x, vec2.y, u, v2);
      dots.fill(0,255,0);
      dots.noStroke();
      dots.fill(0,255,255);
      dots.ellipse(vec1.x, vec1.y, 2, 2);
      // dots.text(j + "," + i,vec1.x,vec1.y);

    }

    graph.endShape();
  }
}

class DStrip {
  PVector [][] stripList;
  PVector [][] oldStripList;
  DStrip(int x, int y){
    stripList = new PVector[x+1][y+1];
    for (int j = 0; j < x+1; j++) {
      for (int i = 0; i < y+1; i++) {
        PVector tV= new PVector(width/y * i, height/(y-1) * j, 0);
        stripList[j][i] = tV;
      }
    }
    oldStripList = stripList;
  }
  public void update(){
    // randomPhysics();
  }

  public void randomPhysics(){
    for(int i = 0; i < stripList.length; i ++){
      for(int j = 0; j < stripList[0].length; j ++){
        stripList[i][j]= new PVector(oldStripList[i][j].x + random(-5,5) , oldStripList[i][j].y + random(-5,5));
      }
    }

  }


}


Particle [] ps;
boolean viewerInteraction = false;
boolean actPhysics = false;

public void initPartSystem() {
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

public void displayPartSystem2(){
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


public void displayPartSystem() {
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
  float g = 0.001f;
  PVector p, s;
  int id;
  boolean onEdge=false;
  Particle(float _m, PVector _p, int _id) {
    m = _m;
    p = _p;
    s = new PVector(0, 0);
    id = _id;
  }

  public void update() {
    if(!onEdge){
      s.mult(0.98f);
      // boundaries();
      hardBoundaries();
      p = PVector.add(p, s);
    }
  }

  public void attract(Particle b) {
    float d = constrain(PVector.dist(p, b.p), 1, 400);
    PVector f = PVector.mult(PVector.sub(b.p, p), b.m * m * g / (d * d));
    PVector a = PVector.div(f, m);
    if (d>50) {
      s.add(a);
    } else {
      s.sub(a);
    }
  }
  public void reject(Particle b) {

    float d = constrain(PVector.dist(p, b.p), 1, 1700);
    PVector f = PVector.mult(PVector.sub(b.p, p), b.m * m * g / (d * d));
    PVector a = PVector.div(f, m);
    if (d>200) {
      s.sub(PVector.mult(a,map(d,200,1700,1,0)));
    } else {
      // s.sub(a);
    }
  }
  public void rejectS(Particle b){
    float d = constrain(PVector.dist(p, b.p), 1, 400);
    PVector f = PVector.mult(PVector.sub(b.p, p), b.m * m * g / (d * d));
    PVector a = PVector.div(f, m*10.0f);
    if (d>20 && d<400) {
      s.sub(PVector.mult(a,map(d,0,400,0,1)));
    } else {
      // onEdge=true;
      // s.sub(a);
    }

  }
  public void boundaries() {
    if (p.y > height || p.y < 0) {
      s.y *= -1;
    }
    if (p.x > width || p.x < 0) {
      s.x *= -1;
    }
  }
  public void hardBoundaries(){
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
  public void show() {
    fill(255, 0, 50);
    noStroke();
    ellipse(p.x, p.y, 5, 5);
    textSize(10);
    text(id, p.x+4, p.y+4);
  }
  public void show2() {
    fill(0, 255, 50);
    noStroke();
    ellipse(p.x, p.y, 5, 5);
    textSize(10);
    text(id, p.x+4, p.y+4);
  }
}


public int pnInPoly(int nvert, PVector [] vert, PVector test)
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




ArrayList<PVector> edge = new ArrayList<PVector>();
PVector centroid;
float meanDist;
public void initEdge(){
	 edge = new ArrayList<PVector>();
}
PVector oldViewer = new PVector(mouseX,mouseY);
public void displayEdge(){
	PVector oldPoint=new PVector(0,0);
	stroke(0,255,100);
	fill(0,255,150);
	strokeWeight(0.5f);
	if(edge.size()>0){
		int index=0;
		for (PVector point : edge){
			// PVector point = edge.get(i);
			if(index>0){
				ellipse(point.x,point.y,3,3);
				line(point.x,point.y,oldPoint.x,oldPoint.y);
			}
			oldPoint = point;
			index++;
		}
	}
	if(mousePressed){
		if(viewer.dist(oldViewer)>5){
			edge.add(viewer);
			oldViewer = viewer;
		}
	}
	calculateCentroid();
}

public void calculateCentroid(){
	if(edge.size()>0){
		PVector c=new PVector(0,0);
		for(PVector point : edge){
			c = new PVector(c.x + point.x, c.y + point.y);
		}
		c = new PVector(c.x/ edge.size(), c.y/edge.size());
		centroid = c;

		for(PVector point : edge){
			meanDist += centroid.dist(point);
		}
		meanDist = meanDist/edge.size();

		fill(100,0,255);
		noStroke();
		ellipse(c.x,c.y,10,10);
		text("centroid",c.x+10,c.y+10);
	}
}
// void 
public float distToEdge(PVector eP,PVector pOi){
	float smlstDst=eP.dist(pOi);
	return smlstDst;
}
PVector [] ppA;
PVector [] ppB;
int lineAmnt=8;
public void initLine(){
	ppA = new PVector[lineAmnt];
	ppB = new PVector[lineAmnt];
	for(int i = 0; i< lineAmnt; i ++){
		ppA[i] = new PVector(random(width),random(height));
		ppB[i] = new PVector(random(width),random(height));
	}
}

public float distToLine(PVector pA, PVector pB,PVector pOi){
	// float tDist =( ( (pB.y - pA.y) * pOi.x ) - ( (pB.x - pA.x) * pOi.y ) +(pB.x*pA.y) - (pB.y*pA.x) ) / ( ( (sq(pB.y-pA.y) ) + (sq(pB.x-pB.y ) ) ) );
	// with sqrt but this is slower operation
	float tDist =( ( (pB.y - pA.y) * pOi.x ) - ( (pB.x - pA.x) * pOi.y ) +(pB.x*pA.y) - (pB.y*pA.x) ) / ( sqrt( (sq(pB.y-pA.y) ) + (sq(pB.x-pB.y ) ) ) );
	return abs(tDist);
}
public void dispBLine(PVector pA, PVector pB){
	strokeWeight(3);
	stroke(0,150,255);
	line(pA.x,pA.y,pB.x,pB.y);
	fill(0,150,255);
	textSize(16);
	text(distToLine(pA,pB,new PVector(mouseX,mouseY)), pA.x,pA.y );
}
  public void settings() {  size(1680, 1050, P2D); }
  static public void main(String[] passedArgs) {
    String[] appletArgs = new String[] { "warping_adv_physics_19520" };
    if (passedArgs != null) {
      PApplet.main(concat(appletArgs, passedArgs));
    } else {
      PApplet.main(appletArgs);
    }
  }
}
