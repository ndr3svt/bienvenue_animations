PVector [] ppA;
PVector [] ppB;
int lineAmnt=8;
void initLine(){
	ppA = new PVector[lineAmnt];
	ppB = new PVector[lineAmnt];
	for(int i = 0; i< lineAmnt; i ++){
		ppA[i] = new PVector(random(width),random(height));
		ppB[i] = new PVector(random(width),random(height));
	}
}

float distToLine(PVector pA, PVector pB,PVector pOi){
	// float tDist =( ( (pB.y - pA.y) * pOi.x ) - ( (pB.x - pA.x) * pOi.y ) +(pB.x*pA.y) - (pB.y*pA.x) ) / ( ( (sq(pB.y-pA.y) ) + (sq(pB.x-pB.y ) ) ) );
	// with sqrt but this is slower operation
	float tDist =( ( (pB.y - pA.y) * pOi.x ) - ( (pB.x - pA.x) * pOi.y ) +(pB.x*pA.y) - (pB.y*pA.x) ) / ( sqrt( (sq(pB.y-pA.y) ) + (sq(pB.x-pB.y ) ) ) );
	return abs(tDist);
}
void dispBLine(PVector pA, PVector pB){
	strokeWeight(3);
	stroke(0,150,255);
	line(pA.x,pA.y,pB.x,pB.y);
	fill(0,150,255);
	textSize(16);
	text(distToLine(pA,pB,new PVector(mouseX,mouseY)), pA.x,pA.y );
}
