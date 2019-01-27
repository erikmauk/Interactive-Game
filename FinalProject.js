// To start the animation click an option box

// Duck variables
   var loc, dir;
   var neckR, wingR, leftLegR, rightLegR, topBeakR, bottomBeakR, time;

   var neckDown = true;
   var wingDown = false;
   var animate = false;
   var LeftLegForward = true;
   var RightLegForward = false;
   var topBeakDown = true;
   var bottomBeakDown = false;
//mounatins
   var h=[];
   var d=[];
   var r=[];
//snow
   var snow;


var scene = 1;
var badChoice;

var barX = [];
var x = 50;

// Text constants
   const s0o1 = 'Tunnel'
   const s0o2 = 'Squeeze through window'
   const s0o3 = 'Steal key'
   const s1o1 = 'Rush him'
   const s1o2 = 'Pay him off'
   const s1o3 = 'Just keep walking'
   const s2o1='Climb mountains'
   const s2o2='Wait the storm out'
   const s2o3='Try to fly though snow'


   const fail = 'YOU WERE CAUGHT'

// normal set up
function setup() 
{
   createCanvas(600, 600);

   loc = createVector(width*.1, height*.65);
   dir = createVector(1, 0);

   // Initialize duck rotations
      neckR = 0;
      wingR = -PI/10;
      leftLegR = PI/6;
      rightLegR = -PI/6;
      topBeakR = 0;
      bottomBeakR = 0;

  
   //arrays for mountains
  
   for(var i=0;i<12;i++)
   {
      r[i]=random(70,150);
      h[i]=random(-150,-350);
      d[i]=random(100,150);
   }

   //snow particle system
   snow = new PSys(300, 0, 150, 1);
      
   scene = 0;
}

// normal draw
function draw() 
{
   background(130);


   if (animate) 
   {
      moveDuck();
   }

if (scene == 0)
{
      drawScene0();
      while (x < width -50)
      {
         barX.push(x);
         x += 70
      }
      drawDuck();
      for (var i = 0; i < barX.length; i++)
      {
         drawBar(barX[i]);
      }
      if (loc.x > 600)
      {
         if (badChoice)
         {
            scene = 3;
         }
         else
         {
            scene = 1;
            animate = !animate;
            loc = createVector(width*.1, height*.65);
         }
      } 
   }

   if (scene == 1)
   {
      drawScene1();
      drawDuck();

      if (loc.x > 600)
      {
         if (badChoice)
         {
            scene = 3;
         }
         else
         {
            scene = 2;
            animate = !animate;
            loc = createVector(width*.1, height*.65);
         }
      } 
   }
   if(scene==2)
   {
      drawScene2();
      drawDuck();
      if(loc.x>600)
      {
         if(badChoice)
         {
            scene=3;
         }
         else
         {
            scene=4;
            animate=!animate;
            loc=createVector(width*.1,height*.65);
         }
      }
   }

   if (scene == 3)
   {
      drawScene3();
   }
   if(scene==4)
   {
      drawScene4();
      drawDuck();
   }
  
   
}

// method to control starting the duck over again and 
// control animation on and off
function mousePressed() 
{
   //loc = createVector(width*.1, height*.65);

   //Scene 1 choice

   if (scene == 0)
   {
      if (mouseX > 20 && mouseX < 180 && mouseY > 520 && mouseY < 580)
      {
         animate = !animate;

      }

      if (mouseX > 220 && mouseX < 380 && mouseY > 520 && mouseY < 580)
      {
         animate = !animate;
         badChoice = true;
      }

      if (mouseX > 420 && mouseX < 580 && mouseY > 520 && mouseY < 580)
      {
         animate = !animate;
         badChoice = true; 
      }      
   }

   if (scene == 1)
   {
      if (mouseX > 20 && mouseX < 180 && mouseY > 520 && mouseY < 580)
      {
         animate = !animate;
         badChoice = true;
      }

      if (mouseX > 220 && mouseX < 380 && mouseY > 520 && mouseY < 580)
      {
         animate = !animate;
         badChoice = true;
      }

      if (mouseX > 420 && mouseX < 580 && mouseY > 520 && mouseY < 580)
      {
         animate = !animate;
      }      
   }
   if (scene == 2)
   {
      if (mouseX > 20 && mouseX < 180 && mouseY > 520 && mouseY < 580)
      {
         animate = !animate;
         badChoice = true;
      }

      if (mouseX > 220 && mouseX < 380 && mouseY > 520 && mouseY < 580)
      {
         animate = !animate;
      }

      if (mouseX > 420 && mouseX < 580 && mouseY > 520 && mouseY < 580)
      {
         animate = !animate;
         badChoice = true;
      }      
   }

}

// code to draw the duck with animation parameters 
function drawDuck() 
{
   noStroke();

   push();
      //move the entire duck
      translate(loc.x, loc.y);
      scale(2.5); //scale the entire duck
      scale(-1, 1);

      //draw left leg and foot
      push();
         translate(-5, 14);
         rotate(leftLegR);
         stroke(255, 137, 32);
         strokeWeight(3);
         line(0, 0, 0, 10);
         fill(255, 137, 32);
         ellipse(-2, 10, 5, 2);
      pop();

      //draw right leg and foot
      push();
         translate(5, 14);
         rotate(rightLegR);
         stroke(255, 137, 32);
         strokeWeight(3);
         line(0, 0, 0, 10);
         fill(255, 137, 32);
         ellipse(-2, 10, 5, 2);                  
      pop();

      // draw body
      push();
         fill(240);
         ellipse(0, 0, 40, 30);
         stroke(0);
         strokeWeight(2);
         line(-10,-12.5, -10, 12.5);
         line(10, -12.5, 10, 12.5);
         line(0, -14, 0, 14);
         line(-18, -4, -18, 5);
         line(18, -4, 18, 5)

      pop();

      //draw neck and head with possible animation transforms
      push();
         fill(245, 226, 12);
         translate(-16, 0); //move into pivot position
         rotate(neckR);  //rotate by neckR parameter
         ellipse(0, -10, 10, 18); //neck
         ellipse(0, -17, 14, 14); //head
         fill(255);
         ellipse(0, -19, 4, 4);  //eye
         fill(0);
         ellipse(-1, -19, 2);
         push();
            translate(-4, -18);
            rotate(topBeakR);
            fill(155, 111, 16);
            triangle(-11, 0, 0, 3, 0, 0);
         pop();
         push();
            translate(-4, -18);
            rotate(bottomBeakR);
            fill(155, 111, 16);
            triangle(-11, 0, 0, -3, 0, 0); //beak
         pop();
      pop();

      //draw wing with possible animation transforms
      fill(227, 208, 66);
      push();
         translate(-8, -5); //move into pivot position
         rotate(wingR); //animtion parameter to control wing flap
         ellipse(14, 0, 30, 16); //wing
      pop();

   pop();
}

// function to update all animation parameters - very 
// simple scripted animation
function moveDuck() 
{
   // update the ducks global location
   loc.add(dir);

   // find out how much the neck is rotated to decide which way to rotate
   // these constrain how much the neck moves up and down
   if (neckR < -PI/3) 
   {
      neckDown = false;
   } 
   if (neckR > PI/10) 
   {
      neckDown = true;
   }

   // depending on which way we need to rotate, do so
   if (neckDown == true) 
   {
      neckR -= PI/100;
   } 
   else 
   {
      neckR += PI/100;
   }

   // find out how much the wing is rotated to decide which way to rotate
   // these constrain how much the wing moves up and down
   if (wingR < -2*PI/5) 
   {
      wingDown = true;
   } 
   if (wingR > -PI/20) 
   {
      wingDown = false;
   }

   // depending on which way we need to rotate, do so
   if (wingDown == false) 
   {
      wingR -= PI/100;
   } 
   else 
   {
      wingR += PI/100;
   }

   // find out how much the left leg is rotated to decide which way to rotate
   // these constrain how much the leg moves forward and backward
   if (leftLegR > PI/6)
   {
      LeftLegForward = true;
   }
   if (leftLegR < -PI/6)
   {
      LeftLegForward = false;
   }
   
   // depending on which way we need to rotate, do so
   if (LeftLegForward == false)
   {
      leftLegR += PI/150;
   }
   else
   {
      leftLegR -= PI/150; 
   }


   // find out how much the right leg is rotated to decide which way to rotate
   // these constrain how much the leg moves forward and backward
   if (rightLegR > PI/6)
   {
      RightLegForward = true;
   }
   if (rightLegR < -PI/6)
   {
      RightLegForward = false;
   }
   
   // depending on which way we need to rotate, do so
   if (RightLegForward == false)
   {
      rightLegR += PI/150;
   }
   else
   {
      rightLegR -= PI/150; 
   } 


      // find out how much the left leg is rotated to decide which way to rotate
   // these constrain how much the leg moves forward and backward
   if (topBeakR > 0)
   {
      topBeakDown = true;
   }
   if (topBeakR < -PI/12)
   {
      topBeakDown = false;
   }
   
   // depending on which way we need to rotate, do so
   if (topBeakDown == false)
   {
      topBeakR += PI/150;
   }
   else
   {
      topBeakR -= PI/150; 
   }


   // find out how much the right leg is rotated to decide which way to rotate
   // these constrain how much the leg moves forward and backward
   if (bottomBeakR > PI/12)
   {
      bottomBeakDown = true;
   }
   if (bottomBeakR < 0)
   {
      bottomBeakDown = false;
   }
   
   // depending on which way we need to rotate, do so
   if (bottomBeakDown == false)
   {
      bottomBeakR += PI/150;
   }
   else
   {
      bottomBeakR -= PI/150; 
   }  
}


function optionBox(x, y)
{
   push();
      translate(x, y);
      //blue outline
      fill(0, 0, 255);
      rect(-90, -30, 160, 60);
      //grey fill
      fill(100);
      rect(-88, -28, 156, 56);
   pop();

}

function drawBar(x){
   push();
      stroke(0);
      strokeWeight(10);
      line(x, 0, x, 500);
   pop();
}

function drawScene0()
{
   //option selection
      push();
         translate(0, 500);
         fill(0);
         rect(0, 0, width, 100);
      pop();
      optionBox(110, 550);
      optionBox(310, 550);
      optionBox(510, 550);
      //text
         push();
            fill(255);
            textSize(12);
            textAlign(CENTER);
            textFont('helvetica');
            text(s0o1, 100, 550);
            text(s0o2, 300, 550);
            text(s0o3, 500, 550);
         pop();

   //window
      push();
         translate(300, 50);
         fill(155, 216, 255);
         stroke(0);
         strokeWeight(3);
         rect(-40, 0, 80, 80);
         push();
            noStroke();
            fill(249, 241, 9);
            ellipse(25, 15, 20);
         pop();
         fill(0);
         rect(-27, 0, 3, 80);
         rect(-9, 0, 3, 80);
         rect(9, 0, 3, 80);
         rect(25, 0, 3, 80);
      pop();

   //corners
      push();
         stroke(80);
         strokeWeight(1);
         line(25, .4*height, 575, .4*height);
         line(25, 0, 25, .4*height);
         line(575, 0, 575, .4*height);
         line(25, .4*height, -100, .9*height);
         line(575, .4*height, width+100, .9*height);
      pop();

   //bed
      push();
         translate(425, 300);
         //legs
         fill(94, 57, 22);
         rect(-45, 100, 5, 7);
         rect(38, 100, 5, 7);
         rect(117, -43, 5, 10);
         //frame
         fill(190);
         quad(25, -50, 125, -50, 50, 100, -50, 100);
         //blanket
         fill(17, 35, 99);
         quad(7.5, -15, 107.5, -15, 50, 100, -50, 100);
         //pillow
         fill(255);
         quad(40, -45, 100, -45, 90, -25, 30, -25);
      pop();
}

function drawScene1()
{
   //ground

      fill(54,41,12);
      quad(150,0,450,0,320,130,280,130);
      fill(178,145,95);
      quad(200,0,400,0,310,130,290,130);
      fill(187,166,120);
      quad(0,600,280,200,320,200,600,600,0,600);
      quad(0,600,0,450,280,200,320,200,600,450,600,600);
      quad(600,600,600,450,320,200,280,600);
   
   //green for floor 
      fill(54,41,12);
      quad(0,450,0,400,280,180,280,200);
      quad(600,450,600,400,320,180,320,200);
   
   //doors (front to back left)
      quad(20,400,60,380,60,110,20,90);
      quad(140,300,160,290,160,150,140,140);
      quad(230,240,240,220,240,180,230,170);
   
   //doors (right side)
      quad(580,400,540,380,540,110,580,90);
      quad(460,300,440,290,440,150,460,140);
      quad(370,240,360,220,360,180,370,170);
   
   push();
      stroke(54,41,12);
      strokeWeight(3);
   
      line(280,200,280,130);
      line(320,200,320,130);
      fill(150);
   pop();  
   
   noStroke();
   fill(30);
   
   //hall light
   push();
      stroke(0);
      strokeWeight(8);
      line(300,30,300,50);
   pop();
   noStroke();
   fill(230,210,64,200);
   ellipse(300,70,30,20);
   fill(90,125,255,200);
   arc(300,70,70,40,PI,0);

   //draw the warden
   drawWarden(450, 375);

   push();
      translate(310,270);
      fill(255);
      ellipse(5,0,105,60);
      triangle(0,15,10,0,55,30);
      fill(0);
      textSize(10);
      textAlign(CENTER);
      textStyle(BOLD);
      textFont('helvetica');
      text("DUCK, WHAT ARE",5,0);
      text("YOU DOING OUT?!",5,9);
   pop();

   //option selection
      push();
         translate(0, 500);
         fill(0);
         rect(0, 0, width, 100);
      pop();
      optionBox(110, 550);
      optionBox(310, 550);
      optionBox(510, 550);
         push();
            fill(255);
            textSize(11);
            textAlign(CENTER);
            textFont('helvetica');
            text(s1o1, 100, 550);
            text(s1o2, 300, 550);
            text(s1o3, 500, 550);
         pop();

}

function drawScene2()
{
   fill(170,226,255);
   rect(0,0,width,height);
  
   push();
      noStroke();
      translate(0,600);
      scale(1);
     
      for(var i=0;i<600;i+=50)
      {
         var hold=i/50;
         var w=(r[hold]+2*i)/2;
         
         fill(116,142,204);
         triangle(i,-100,i+r[hold],-100,w,h[hold]-130);
         fill(75,105,178);
         triangle(w, h[hold]-130,i+r[hold],-100,w,-100);
         fill(152,161,178);
      }
   pop();
   fill(255);
   rect(0,400,width,height);
   snow.run();

   //option selection
      push();
         translate(0, 500);
         fill(0);
         rect(0, 0, width, 100);
      pop();
      optionBox(110, 550);
      optionBox(310, 550);
      optionBox(510, 550);
      //text
         push();
            fill(255);
            textSize(12);
            textAlign(CENTER);
            textFont('helvetica');
            text(s2o1, 100, 550);
            text(s2o2, 300, 550);
            text(s2o3, 500, 550);
         pop();
   
}

function drawScene3()
{
   fill(0);
   rect(0,0, width, height);
   fill(255, 0, 0);
   textSize(64);
   textAlign(CENTER);
   textFont('impact');
   text(fail, width/2, height/2);
}

function drawScene4()
{
   //sky
      fill(12, 245, 216);
      rect(0,0,width,height);
      fill(230,220,0);
      ellipse(600,0,200);
   //foreground
      fill(78, 155, 16);
      rect(0, height/2, width, 600);
   
   //add in barn house
   fill(245, 0,0);
   rect(50,150,150,150);
   triangle(125,100,50,150,200,150);
   fill(0);
   beginShape();
      vertex(45,165);
      vertex(125,105);
      vertex(125,95);
      vertex(45,145);
   endShape(CLOSE);
   beginShape();
      vertex(125,105);
      vertex(125,95);
      vertex(205,145);
      vertex(205,165);
   endShape(CLOSE);
   fill(255);
   rect(90,150,70,40);
   fill(0);
   rect(95,155,60,30);
   fill(180,30,25);
   rect(90,200,70,60);
   stroke(255);
   strokeWeight(4);
   line(92,200,158,260);
   line(92,260,158,200);
   //fence
   strokeWeight(5);
   line(203,220,400,220);
   line(203,250,400,250);
   line(0,220,48,220);
   line(0,250,48,250);
   line(10,210,10,height/2);
   line(30,210,30,height/2);
   for(var i=0;i<10;i++)
   {
      line(220+20*i,210,220+20*i,height/2);
   }
   noStroke();
   fill(245,220,10);
   //hay
   beginShape();
      vertex(95,185);
      vertex(105,180);
      vertex(110,182);
      vertex(117,178);
      vertex(124,170);
      vertex(130,177);
      vertex(137,173);
      vertex(155,185);
   endShape(CLOSE);


   fill(255);
   textFont("Helvetica");
   textAlign(CENTER);
   textSize(30);
   text("You escaped ", 350, 400);
   text("the prison!!", 350, 440);
}


function Particle(x , y)
{
   this.accelY = 0.05; //gravity
   this.velY = random(.5, 1.3);
   this.maxVelY = 5;
   this.pcolorB = random(255);
   this.locX = x;
   this.locY = y;
   this.r = 8.0;
   this.life = 100;
 
   // a function to update the particle each frame

   this.updateP = function()
   {
      if (this.velY < this.maxVelY)
      {
         this.velY += this.accelY;        
      }
      this.locY += this.velY;
      this.life -= 1.0;
   };

 

   // function to draw a particle

   this.renderP = function()
   {
      noStroke();
      push();
         fill(255, 150);
         translate(this.locX, this.locY);
         ellipse(0, 0, 8);
      pop();
   };
}



function PSys(sX, sY, num, spawnRate)
{

   this.maxP = num;
   this.numP = 0;
   // the data - lots of particles
   this.particles = [];
   this.spawnRate = spawnRate;
 
   // function defining what to do each frame
   this.run = function()
   {
      for (var i=0; i < this.particles.length; i++)
      {
         //update each particle per frame
         this.particles[i].updateP();
         this.particles[i].renderP();
         if (this.particles[i].locY > height)
         {
            this.particles[i].locX = random(width);
            this.particles[i].locY = sY;
         }
      }
      if (this.numP < this.maxP)
      {
         this.spawn(min(this.spawnRate, this.maxP-this.numP));
      }
   }
   this.spawn = function(num_to_spawn)
   {
      for (var i=0; i < num_to_spawn; i++)
      {
         this.particles.push(new Particle(random(width), sY));
      }
      this.numP += num_to_spawn;
   }
}


function drawWarden(x,y) 
{
   push();
   stroke(100);
   strokeWeight(.5);

      //move the entire duck
      translate(x, y);
      scale(2.8); //scale the entire duck
      
      //draw neck and head with possible animation transforms
      push();
         fill(169,210,255);
         translate(-16, 0); //move into pivot position
         ellipse(2, -5, 6, 30); //neck
         fill(255);
         rect(-1,-8,6,3);

         push();
            fill(169,210,255);
            translate(0,0);
            fill(253, 245, 146);   
            triangle(-14, -15, -4, -21, -4, -15);
            triangle(-14, -18, -4, -21, -4, -15); //beak
         pop();
         
         fill(169,210,255);
         ellipse(0, -17, 16, 15); //head
         fill(255);
         ellipse(0, -18, 8, 8);  //eye
         fill(0);
         ellipse(-1,-17,4,4);
            //eyebrow
            push();
               stroke(0);
               strokeWeight(1.3);
               line(-3,-21,3,-23);
            pop();
      pop();
 
    //leg 
      push();
         translate(-3, 15);
         stroke(60);
         strokeWeight(1);
         line(0, 0, 0, 15);
            noStroke();
         fill(60);
         ellipse(-2, 16, 10, 1.4);
      pop();

   //draw right leg and foot
      push();
         translate(3, 15);
         stroke(60);
         strokeWeight(1);
         line(0, 0, 0, 15);
             noStroke();
         fill(60);
         ellipse(-2, 16, 10, 1.4);  
      pop();

   //body of warden
      fill(169,210,255);
      arc(-0.5,2,33,35,0,PI);
      fill(7,36,61);
      arc(-0.5,2,33,35,PI/2.5,PI);

   //badge
      fill(230,200,30);
      ellipse(-10,8,3,5);
            
  //wing
      fill(169,200,255);
      push();
         translate(-8, -5); //move into pivot position
         ellipse(10, 10, 30, 12); //wing

         fill(7,36,61);
         arc(10,10,30,12,PI/2,3*PI/2);
      pop();
 
   //hat
      push();
         translate(0,0);
         fill(255);
         rect(-22,-26,12,3);
         fill(7,36,61);
         arc(-16,-26,10,9,PI,0);
      pop();
         
   pop();
}
