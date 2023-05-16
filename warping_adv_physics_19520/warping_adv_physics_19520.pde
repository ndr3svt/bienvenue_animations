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
void setup() {
  size(1680, 1050, P2D);
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

void draw() {
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
void keyPressed(){
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
void manualTest(){
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

void dipslayPhysics(){
  if(actPhysics){
    for(int h = 0; h < strips.stripList.length;h++){
      for(int i = 0; i< strips.stripList[0].length;i++){
        strips.stripList[h][i] = ps[(i) + (h*strips.stripList.length)].p;
      }
    }
  }
}



void initMesh(int x, int y) {
  strips = new DStrip(x,y);
  stripsCopy = new DStrip(x,y);

}
void drawMesh() {

  // strips= drawStrip(x, y, a);
  for (int i = 0; i < strips.stripList.length-2; i++) {
    float v1 = 1.0*i/(strips.stripList.length-2);
    float v2 = 1.0*(i+1)/(strips.stripList.length-2);

    PVector[] list1=strips.stripList[i];    
    PVector[] list2=strips.stripList[i+1];

    graph.beginShape(QUAD_STRIP);


    for (int j = 0; j < list1.length; j++) {

      float u = 1.0*j/(list1.length-1);
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
  void update(){
    // randomPhysics();
  }

  void randomPhysics(){
    for(int i = 0; i < stripList.length; i ++){
      for(int j = 0; j < stripList[0].length; j ++){
        stripList[i][j]= new PVector(oldStripList[i][j].x + random(-5,5) , oldStripList[i][j].y + random(-5,5));
      }
    }

  }


}


