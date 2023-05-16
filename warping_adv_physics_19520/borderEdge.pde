ArrayList<PVector> edge = new ArrayList<PVector>();
PVector centroid;
float meanDist;
void initEdge(){
	 edge = new ArrayList<PVector>();
}
PVector oldViewer = new PVector(mouseX,mouseY);
void displayEdge(){
	PVector oldPoint=new PVector(0,0);
	stroke(0,255,100);
	fill(0,255,150);
	strokeWeight(0.5);
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

void calculateCentroid(){
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
float distToEdge(PVector eP,PVector pOi){
	float smlstDst=eP.dist(pOi);
	return smlstDst;
}
