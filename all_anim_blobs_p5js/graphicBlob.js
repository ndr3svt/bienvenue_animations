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
      this.wait = 0;
      this.wait_2=0;
      this.dir = 0.01;
      this.dirD = 0.001;
      this.py = 50;
      this.fy = this.py/2;
      this.lw = 205;
      this.lh = 130;
      this.pg = createGraphics(this.lw,this.lh+this.py);
      if(_type == "small"){
        this.blobImg = blobSmall;
      }else if(_type =="small_mirrored"){
        this.blobImg = blobSmallMirr;
      }else if (_type == "small_custom"){
        this.blobImg = this.customShape('normal');
      }else if(_type == "small_custom_mirrored"){
        this.blobImg = this.customShape('mirrored');
      }
      this.ow = _w;
      this.oh = _h;
      this.w = _w;
      this.h = _h;
      this.scale =1;
      this.horScale=1;
      this.vertScale=1;
      this.oscOpacity=255;
      this.time = 0;
      this.stop =false
      this.triggered=false;
      // this.freq= _freq*getRandomFloat(0.45,0.55);
      this.time2=0;
      // this.freq2 = _freq*getRandomFloat(0.75,0.95);
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
      rotate(radians(this.rot));
      // translate(-this.w/2,-this.h/2)
      imageMode(CENTER)
      scale(this.horScale,this.vertScale);
      image(this.blobImg,0 , 0, this.w, this.h);
      pop();
     
      // this.update();
      
    }
  
    displayAnchor(){
      let x = this.pos.x + this.ox +this.offsetx;
      let y = this.pos.y + this.oy +this.offsety;
      push();
      translate(x,y)
      rotate(radians(this.rot));
      scale(this.horScale,1);
      tint(255,255);
      noStroke();
      fill(255,0,0);
      ellipse(0,0,3,3);
      if(toggleBckgrnd){
        stroke(0,255,0);
        strokeWeight(0.5);
        noFill();
        line(0-15,0,0+15,0)
        line(0,0-15,0,0+15)
        strokeWeight(0.5);
        stroke(255,255,0);
        rectMode(CENTER)
        rect(0,0,this.w,this.h)
      }
      pop()
    }
    updateInput(type, _i){
      
      switch (type){

        case 'A':
          let indexesA = new Map([
            [0,1],
            [3,2],
            [6,1],
            [9,2],
            [12,1],
            [15,2],
            [1,1],
            [4,2],
            [7,1],
            [10,2],
            [13,1],
            [16,2],
            [2,1],
            [5,2],
            [8,1],
            [11,2],
            [14,1],
            [17,2],
          ]);
          if(this.time<=2 && this.time>=0){
            if(this.wait<0.5 && this.dir>0){
              // this.time=0;
              this.wait+=0.01;
            }else{
                
              
              if(this.dir>0){
                this.dir=map(this.time,0,2,0.002,0.03 )
              }else{
                this.dir=map(this.time,2,0,-0.03,-0.002)
              }
              
              this.time +=this.dir; 
              this.time2 += this.dir*1.15;
            }
          }else{
            this.wait=0
              this.dir*=-1;
              this.time +=this.dir; 
              this.time2 += this.dir*1.15;
          }
          if(indexesA.get(_i) == 1){
            this.scale= map(this.time,0,2,1,1.4)
            this.w = this.ow*this.scale;
            this.h = this.oh*this.scale;
          }else{
            this.scale= map(this.time,0,2,1,0.65)
            this.w = this.ow*this.scale;
            this.h = this.oh*this.scale;
          }

          if(_i == 0 || _i == 3 ||_i == 6 || _i == 9 || _i == 12 || _i == 15){
            if(indexesA.get(_i) == 1){
              this.ox = map(this.time,0,2,0,35);
            }            
          }
          if(_i == 16 || _i == 13 || _i == 10 || _i == 7 || _i == 4 || _i == 1 ){
            if(indexesA.get(_i) == 1){
              this.ox = -map(this.time,0,2,0,35);
            }
          }
          if(_i == 2 || _i == 5 || _i == 8 || _i == 11 || _i == 14 || _i == 17 ){
            if(indexesA.get(_i) == 1){
              this.ox = map(this.time,0,2,0,35);
            }
          }
      

          break;
        case 'B':
          let indexesB = new Map([
            [0,1],
            [3,2],
            [6,3],
            [9,4],
            [12,1],
            [15,2],
            [18,3],
            [21,4],
            [13,1],
            [16,2],
            [19,3],
            [22,4],
            [1,1],
            [4,2],
            [7,3],
            [10,4],
            [2,1],
            [5,2],
            [8,3],
            [11,4],
            [14,1],
            [17,2],
            [20,3],
            [23,4],
          ]);
          // this.time +=0.001 +0.002*(indexes.get(_i));
          
     
            if(this.time<=2 && this.time>=0){
              if(this.wait<1.5 && this.dir>0){
                this.wait+=0.01;
              }else{
                  
                
                if(this.dir>0){
                  this.dir=map(this.time,0,2,0.01,0.08 + 0.005*indexesB.get(_i))
                }else{
                  this.dir=map(this.time,2,0,-0.08 -0.005*indexesB.get(_i),-0.01)
                }
                
                this.time +=this.dir; 
              }
            }else{
              this.wait=0
                this.dir*=-1;
                this.time +=this.dir; 
            }
          this.w = map(this.time,0,2,1,0.0)*this.ow

          if(_i == 0 || _i == 3 ||_i == 6 || _i == 9 ){
            this.rot= map(this.time,0,2,0,-40)
          }
          if(_i == 21 || _i == 18 ||_i == 15 || _i == 12 ){
            this.rot= map(this.time,0,2,0,40)
          }
         
          // if(_i == 1 || _i == 4 ||_i == 7 || _i == 10 ){
          //   this.time += 0.01 + 0.002*(indexes.get(_i));
          //   this.w = map(Math.sin(this.time),-1,1,-1,1) * this.ow;
          // }
          if(_i == 2 || _i == 5 ||_i == 8 || _i == 11 ){
            this.rot= map(this.time,0,2,0,40)
          }
          if(_i == 23 || _i == 20 ||_i == 17 || _i == 14 ){
            this.rot= map(this.time,0,2,0,-40)
          }
          // fill(255,0,0);
          // textSize(12)
          // text(_i, this.pos.x+this.offsetx+this.ox +25 , this.pos.y+this.offsety + this.oy)
          break;
        case 'C':
          let indexesC = new Map([
            [0,1],
            [3,2],
            [6,3],
            [9,4],
            [12,5],
            [15,6],
            [16,1],
            [13,2],
            [10,3],
            [7,4],
            [4,5],
            [1,6],
            [2,1],
            [5,2],
            [8,3],
            [11,4],
            [14,5],
            [17,6],
          ]);
          let indexesC_2 = new Map([
            [0,6],
            [3,5],
            [6,4],
            [9,3],
            [12,2],
            [15,1],
            [16,7],
            [13,8],
            [10,9],
            [7,10],
            [4,11],
            [1,12],
            [2,18],
            [5,17],
            [8,16],
            [11,15],
            [14,14],
            [17,13],
          ]);
          if(this.wait<(1* indexesC_2.get(_i)) ){
            this.wait+=0.1;
          }else{
            if(!this.triggered ){
              this.triggered=true
            }
          }
          if(this.triggered && this.time<=4 && this.time>=0 && !this.stop){
            if(this.dir>0){
              this.dir=map(this.time, 0, 4, 0.01, 0.2)
            }else{
              this.dir=map(this.time, 4, 0, -0.2, -0.01)
              if(this.time<0.025){
                this.stop = true
                this.time = 0
              }
            }
            this.time +=this.dir; 
          }else{
            this.dir*=-1;
            this.time +=this.dir; 
          }
          if( _i== 2 || _i== 5  || _i== 8 || _i== 11 || _i== 14 || _i== 17){
            this.rot= map(this.time,0,4,0,-25)
            this.oy = map(Math.sin(this.time),-1,1,-10, 10)
          }else{
            this.rot= map(this.time,0,4,0,-25)
            this.oy = map(Math.sin(this.time),-1,1,-10,10)
          }
          
         
         
          break;
        case 'D':
          let indexesD = new Map([
            [15,1],
            [12,2],
            [9,3],
            [6,4],
            [3,5],
            [0,6],
            [1,1],
            [4,2],
            [7,3],
            [10,4],
            [13,5],
            [16,6],
            [17,1],
            [14,2],
            [11,3],
            [8,4],
            [5,5],
            [2,6],
          ]);
          if(this.time<=4 && this.time>=0){
            if(this.wait<1.0 && this.dirD>0){
              // this.time=0;
              this.wait+=0.01;
            }else{
                
              
              if(this.dirD>0){
                this.dirD=map(this.time,0,2,0.001,0.08 + 0.005*indexesD.get(_i))
              }else{
                this.dirD=map(this.time,2,0,-0.08 -0.005*indexesD.get(_i),-0.001)
              }
              
              this.time +=this.dirD; 
              // this.time2 += this.dir*3.5;
            }
          }else{
            this.wait=0
              this.dirD*=-1;
              this.time +=this.dirD; 
              // this.time2 += this.dir*3.5;
          }
          if(_i == 16 || _i==13 || _i==10 || _i==7 || _i==4 || _i==1){
            this.oy = map(this.time,2,4,25,50);
            this.rot = map(this.time,0,4,0,-20);
          }else{
            this.oy = map(this.time,0,4,0,50);
            this.rot = map(this.time,0,4,0,-20);
          }
         
    
          /* play with the scale */
          // this.scale =map(Math.sin(this.time2), -1,1,0.85,1.15);
          // this.w = this.ow*this.scale;
          // this.h = this.oh*this.scale;

          
          break;
        case 'E':
          let indexesE = new Map([
            [0,1],
            [3,2],
            [6,3],
            [9,4],
            [12,5],
            [15,6],
            [16,1],
            [13,2],
            [10,3],
            [7,4],
            [4,5],
            [1,6],
            [2,1],
            [5,2],
            [8,3],
            [11,4],
            [14,5],
            [17,6],
          ]);
          if(this.time<=8 && this.time>=0){
            if(this.wait<1.0 && this.dirD>0){
              // this.time=0;
              this.wait+=0.01;
            }else{
                
              
              if(this.dirD>0){
                this.dirD=map(this.time,0,4,0.005,0.08 + 0.01*indexesE.get(_i))
              }else{
                this.dirD=map(this.time,4,0,-0.08 -0.01*indexesE.get(_i),-0.005)
              }
              
              this.time +=this.dirD; 
              // this.time2 += this.dir*3.5;
            }
          }else{
            this.wait=0
              this.dirD*=-1;
              this.time +=this.dirD; 
              // this.time2 += this.dir*3.5;
          }
          // this.vertScale = map(this.time, 0, 8, 1, -1)
          if(_i == 15 || _i == 12 || _i ==9 || _i ==6 || _i ==3 || _i ==0 ){
            // this.oy = map(this.time,0,4,0,120);
            
          }else{
            // this.oy = map(this.time,0,4,0,50);
          }
          if(_i == 16 || _i == 13 || _i == 10 || _i == 7 || _i == 4 || _i == 1 ){
            this.updateShape('mirrored', map(this.time,0,8,50,-25));
          }else{
            // this.updateShape('normal', map(this.time,0,8,-50,50));
          }
          /** reproducing the A animation  */
          // if(_i == 0 || _i == 3 ||_i == 6 || _i == 9 || _i == 12 || _i == 15){
          //   // this.scale =map(Math.sin(this.time2),0,1,1.125,1.25) * map(_i, 0,15, 1,1.1);
          //   this.scale= map(this.time,0,8,1,1.3)
          //   this.w = this.ow*this.scale;
          //   this.h = this.oh*this.scale;
          //   // this.oy = -map(Math.sin(this.time2), -1,1,0,15);
          // }
          // if(_i == 16 || _i == 13 || _i == 10 || _i == 7 || _i == 4 || _i == 1 ){
          //   // this.scale =map(Math.sin(this.time),0,1,1.125,1.25) * map(_i, 16,1, 1,1.1);
          //   this.scale= map(this.time,0,8,1,1.5)
          //   this.w = this.ow*this.scale;
          //   this.h = this.oh*this.scale;
          // }
          // if(_i == 2 || _i == 5 || _i == 8 || _i == 11 || _i == 14 || _i == 17 ){
          //   // this.oy = map(Math.sin(this.time2), -1,1,0,15);
          //   this.scale= map(this.time,0,8,1,1.3)
          //   this.w = this.ow*this.scale;
          //   this.h = this.oh*this.scale;
          // }
         
          fill(255,0,0);
          textSize(12)
          // text(_i, this.pos.x+this.offsetx+this.ox  , this.pos.y+this.offsety + this.oy);
          break;
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
    updateShape(_type,_val){
      if(_type == 'mirrored'){
        // console.log(this.blobImg)
        let shift_y = map(_val, 50,-50,0,50);
        this.pg.clear()
        // let gradient = drawingContext.createLinearGradient(0, 0, this.lw,0);
        // gradient.addColorStop(1, color(255, 255, 255, 255)); 
        // gradient.addColorStop(0, color(255, 107, 93, 255));
        // this.pg.drawingContext.fillStyle = gradient;
        // this.pg.drawingContext.save();
        // this.pg.stroke(0,255,0)
        this.pg.noStroke();
        this.pg.beginShape()
        this.pg.vertex(0,shift_y/2)
        this.pg.quadraticVertex(this.lw/2, _val , this.lw, shift_y/2);
        this.pg.vertex(this.lw,shift_y/2)
        this.pg.vertex(this.lw,this.lh+this.fy + shift_y/2)
        this.pg.quadraticVertex(this.lw/2, this.lh+_val+this.fy , 0, this.lh+this.fy+ shift_y/2);
        this.pg.vertex(0,this.fy+this.lh + shift_y/2)
        this.pg.endShape()
        // this.pg.noFill()
        // this.pg.rectMode(CORNER)
        // this.pg.stroke(255,0,0)
        // this.pg.rect(0,0,this.lw,this.lh+this.fy*2)
        // this.pg.fill(255,0,0)
        // this.pg.noStroke()
        // this.pg.text(_val, 50,50)
        this.blobImg = this.pg
        // return this.pg;
      }else{
        let shift_y = map(_val, 50,-50,0,50);
        this.pg.clear()
        this.pg.noStroke();
        this.pg.beginShape()
        this.pg.vertex(0,shift_y)
        this.pg.quadraticVertex(this.lw/2, _val , this.lw, shift_y);
        this.pg.vertex(this.lw,shift_y/2)
        this.pg.vertex(this.lw,this.lh+this.fy + shift_y/2)
        this.pg.quadraticVertex(this.lw/2, this.lh+_val+this.fy , 0, this.lh+this.fy+ shift_y/2);
        this.pg.vertex(0,this.fy+this.lh + shift_y/2)
        this.pg.endShape()
      }
    }
    customShape(_type){
      if(_type == 'mirrored'){
        
        let gradient = drawingContext.createLinearGradient(0, 0, this.lw,0);
        gradient.addColorStop(1, color(255, 255, 255, 255)); 
        gradient.addColorStop(0, color(255, 107, 93, 255));
        this.pg.drawingContext.fillStyle = gradient;
        this.pg.beginShape()
        this.pg.vertex(0,0)
        this.pg.noStroke()
        this.pg.quadraticVertex(this.lw/2, 50 , this.lw, 0);
        this.pg.vertex(this.lw,0)
        this.pg.vertex(this.lw,this.lh+this.fy)
        this.pg.quadraticVertex(this.lw/2, this.lh+50+this.fy , 0, this.lh+this.fy);
        this.pg.vertex(0,this.fy+this.lh)
        this.pg.endShape()
        // this.pg.noFill()
        // this.pg.rectMode(CORNER)
        // this.pg.stroke(255,0,0)
        // this.pg.rect(0,0,this.lw,this.lh+this.fy*2)
        return this.pg;
      }else{
        let gradient = drawingContext.createLinearGradient(0, 0, this.lw,0);
        gradient.addColorStop(0, color(255, 255, 255, 255)); 
        gradient.addColorStop(1, color(255, 107, 93, 255));
        this.pg.drawingContext.fillStyle = gradient;
        this.pg.noStroke()
        this.pg.beginShape()
        this.pg.vertex(0,this.fy)
        this.pg.quadraticVertex(this.lw/2, this.fy-50 , this.lw, this.fy);
        this.pg.vertex(this.lw,this.fy)
        this.pg.vertex(this.lw,this.fy*2+this.lh)
        this.pg.quadraticVertex(this.lw/2, this.fy*2+this.lh-50 , 0, this.fy*2+this.lh);
        this.pg.vertex(0,this.fy*2+this.lh)
        this.pg.endShape()
        return this.pg;
      }
      // drawingContext.save();
        // drawingContext.restore();
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