class Blob{
    constructor(_x, _y, _w,_h,_type, _freq){
      this.offsetx=0;
      this.play=true;
      this.offsety=0;
      this.x = _x;
      this.y = _y;
      this.ox = 0;
      this.oy = 0;
      this.type = _type;
      if(_type == "small"){
        this.blobImg = blobSmall;
      }else if(_type =="small_mirrored"){
        this.blobImg = blobSmallMirr;
      }
      this.ow = _w;
      this.oh = _h;
      this.w = _w;
      this.h = _h;
      this.scale =1;
      this.oscOpacity=255;
      this.time = 0;
      this.freq= _freq*getRandomFloat(0.45,0.55);
      this.time2=0;
      this.freq2 = _freq*getRandomFloat(0.75,0.95);
      this.rot=0;

      this.pos = createVector(_x +this.w/2 , _y+this.h/2);
      this.vel = createVector(0, 0);
      this.acc = createVector(0, 0);
    }
  
    display(){
      // tint(255,this.oscOpacity);
     
      tint(255,255);
      push();
      translate(this.pos.x+this.offsetx+this.ox, this.pos.y+this.offsety + this.oy);
      // rotate(this.rot);
      // translate(-this.w/2,-this.h/2)
      imageMode(CENTER)
      image(this.blobImg,0 , 0, this.w, this.h);
      pop();
     
      // this.update();
      
    }
  
    displayAnchor(){
      let x = this.pos.x + this.ox +this.offsetx;
      let y = this.pos.y + this.oy +this.offsety;
      tint(255,255);
      noStroke();
      fill(255,0,0);
      ellipse(x,y,3,3);
      if(toggleBckgrnd){
        stroke(0,255,0);
        strokeWeight(0.5);
        noFill();
        line(x-15,y,x+15,y)
        line(x,y-15,x,y+15)
        strokeWeight(0.5);
        stroke(255,255,0);
        rectMode(CENTER)
        rect(x,y,this.w,this.h)
      }
    }
    update(){
      if(this.play){
        /* Oscillating time functions */
        if(this.time<=10 && this.time>=0){
          this.time+=this.freq;
        }else{
          this.freq= this.freq*(-1);
          this.time+=this.freq;
        }
        if(this.time2<=10 && this.time2>=0){
          this.time2+=this.freq2;
        }else{
          this.freq2= this.freq2*(-1);
          this.time2+=this.freq2;
        }
        /* opacity oscillation */
        this.oscOpacity=map(Math.sin(this.time), -1,1,155,255);
    
        /* play with x y movement*/
        this.ox = map(Math.sin(this.time2), -1,1,-20,20);
        this.oy = map(Math.sin(this.time), -1,1,-20,20);
    
        /* play with the scale */
        this.scale =map(Math.sin(this.time2), -1,1,0.85,1.15);
        this.w = this.ow*this.scale;
        this.h = this.oh*this.scale;
        this.offsetx = (this.ow-this.w)/2;
        this.offsety = (this.ow-this.w)/2;
        // this.h = map(Math.sin(this.time2), -1,1, this.oh-10,this.oh+10);
        /* play with rotation */
        this.rot =radians(mouseX)
      }
    }

    updatePhysics(){
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
      this.vel.set(constrain(this.vel.x,-5,5),constrain(this.vel.y,-5,5));

     
      // push()
      // translate(this.pos.x, this.pos.y);
      // fill(0,255,0);
      // // ellipse(0,0,10,10)
      // noStroke()
      // pop()
    }
    pausePlay(_play){
      this.play=_play;
    }
    // Add an attraction force to the particle
    attract() {
      let self = createVector(this.x,this.y)
      let other = createVector(mouseX,mouseY)
      let force = p5.Vector.sub(this.pos, self);
      let distance = force.mag();

      if(distance<200){
        distance = constrain(distance, 1, 200);
        force.normalize();
        let strength = (1 - distance / 25) * 2.5;
        force.mult(strength);
        return force;
      }else{
        return 0;
      }
    }

    // Add a repulsion force to the particle
    repel(other) {
      let force = p5.Vector.sub(this.pos, other);
      let distance = force.mag();
      if(distance<200){
      
        distance = constrain(distance, 1, 200);
        force.normalize();
        let strength = (1 - distance / 2) * (-0.09);
        force.mult(strength);
      
        return force;
      }else{
        return 0;
      }
    }
}


function repelMouse(){
  let other = createVector(mouseX, mouseY);
  fill(255,0,100)
  ellipse(other.x,other.y,20,20)
  tBlobs.forEach( element=>{
    let repulsion = element.repel(other);
    let attraction = element.attract();
    element.acc.add(attraction);
    element.acc.add(repulsion);
    element.updatePhysics()
  })
        
}