const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.save();
//images
const bir = new Image();
const uppPipe = new Image();
const btmPipe = new Image();
const gap=300;
//will add clock
let topHeight1=Math.random()*200+100;
let topHeight2=Math.random()*200+100;
let topHeight3=Math.random()*200+100//randm top height of the pipe
let imagesLoaded=0;
function imageLoaded(){
    imagesLoaded++;

    if(imagesLoaded===3){

        main();
    }
}
bir.onload = imageLoaded;
btmPipe.onload =imageLoaded;
uppPipe.onload =imageLoaded;
btmPipe.src = "bottompipe.png";
uppPipe.src = "toppipe.png";
bir.src = "flappybird.png";
bir.setAttribute('z-index','-1');
let scre=0;
let gameState=1;
let bird = {
  x: 40,
  y: 100,
  vy: 0,
  vx: 0,
  draw() {
    ctx.drawImage(bir, bird.x, bird.y, 50, 50);
  },
};
let pipe = {
  x: 400,
  y: 0,
  vx: 2,
  topheight:topHeight1,
};
let pipe2 = {
  x: 650,
  y: 0,
  vx: 2,
  topheight:topHeight2,
};
let pipe3 = {
  x: 880,
  y: 0,
  vx: 2,
  topheight:topHeight3,
};
let bpipe = {
  x: pipe.x,
  y:topHeight1+gap,
  vx: 2,
};
let bpipe2 = {
  x: pipe2.x,
  y:topHeight2+gap,
  vx: 2,
};
let bpipe3 = {
  x: pipe3.x,
  y:topHeight3+gap,
  vx: 2,
};
function reset() {
  scre=0;
  bird.x = 10;
  bird.y = 100;
  bird.vy = 0;
  bird.vx = 0;
  //for pipe
  pipe.x=400;
  pipe.topheight=topHeight1;
  pipe2.x=650;
  pipe2.topheight=topHeight2;
  pipe3.x=880;
  pipe3.topheight=topHeight3;
  bpipe.x=pipe.x;
  bpipe.y=topHeight1+gap;
  bpipe2.x=pipe2.x;
  bpipe2.y=topHeight2+gap;
  bpipe3.x=pipe3.x;
  bpipe3.y=topHeight3+gap;


}
function score(){
  console.log(scre);
  scre++;
}
setInterval(score,1000);
function flap() {
  bird.vy = -bird.vy;
}
function resetPipe(pipe,bpipe,x){
    pipe.x=x+300;
    pipe.topheight=Math.random()*200+100;
    bpipe.x=pipe.x;
    bpipe.y=pipe.topheight+gap
    // pipe2.x=canvas.width-200;
    // pipe2.topheight=topHeight2;
    // bpipe2.x=pipe2.x;
    // pipe2.x=canvas.width-200;
    // pipe3.topheight=topHeight3;
    // bpipe3.x=pipe3.x;
}
//collision logic


function pipes() {
  ctx.drawImage(uppPipe, pipe.x, 0, 100,pipe.topheight);
  ctx.drawImage(uppPipe, pipe2.x, 0, 100,pipe2.topheight);
  ctx.drawImage(uppPipe, pipe3.x, 0, 100,pipe3.topheight);
  ctx.drawImage(btmPipe, bpipe.x, bpipe.y, 100,canvas.height-bpipe.y);
  ctx.drawImage(btmPipe, bpipe2.x, bpipe2.y, 100, canvas.height-bpipe2.y);
  ctx.drawImage(btmPipe, bpipe3.x, bpipe3.y, 100, canvas.height-bpipe3.y);
}
function mover() {
  pipe.x -= pipe.vx;
  pipe2.x -= pipe2.vx;
  pipe3.x -= pipe3.vx;
  bpipe.x -= bpipe.vx;
  bpipe2.x -= bpipe2.vx;
  bpipe3.x -= bpipe3.vx;
}
function main() {
  if(gameState==1){

    let raf;
    const g = 0.2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pipes();
    ctx.font="bold 25px Poppins"
    ctx.fillStyle='grey'

    ctx.fillText("SCORE:"+scre,10,80)
    bird.draw();//puts bird on top
    mover();
    ctx.beginPath();
    bird.vy += g;
  
    if (bird.vy > 8) bird.vy = 8;
    bird.y += bird.vy;
    ctx.fill();
  
    if (bird.y > canvas.height || bird.y < -50) {
      reset();
    }
    if(pipe.x<0-100){
      resetPipe(pipe,bpipe,pipe3.x);
    }
    if(pipe2.x<0-100){
      resetPipe(pipe2,bpipe2,pipe.x)
    }
    if(pipe3.x<0-100){
      resetPipe(pipe3,bpipe3,pipe2.x)
    }
    if(bird.x+43>pipe.x &&bird.x+43<pipe.x+100&&bird.y<pipe.y+pipe.topheight){
      reset();
    }if(bird.x+43>pipe2.x &&bird.x+43<pipe2.x+100&&bird.y<pipe2.y+pipe2.topheight){
      reset();
    }if(bird.x+43>pipe3.x &&bird.x+43<pipe3.x+100&&bird.y<pipe3.y+pipe3.topheight){
      reset();
    }
    if(bird.x+43>bpipe.x&&bird.x+43<bpipe.x+100&&bird.y>bpipe.y-50){
      reset();
    }if(bird.x+43>bpipe2.x&&bird.x+43<bpipe2.x+100&&bird.y>bpipe2.y-50){
      reset();
    }if(bird.x+43>bpipe3.x&&bird.x+43<bpipe3.x+100&&bird.y>bpipe3.y-50){
      reset();
    }
    // }if(bird.x+43>pipe3.x &&bird.x+43<pipe.x+100&&bird.y<pipe.y+pipe.topheight){
    //   gameState=0;
    // }if(bird.x+43>pipe.x &&bird.x+43<pipe.x+100&&bird.y<pipe.y+pipe.topheight){
    //   gameState=0;
    // }if(bird.x+43>pipe.x &&bird.x+43<pipe.x+100&&bird.y<pipe.y+pipe.topheight){
    //   gameState=0;
    // }
      raf = window.requestAnimationFrame(main);
  }
  else{
    
    gameState=1; 
  }
//collision logic
}
document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    bird.vy = -5;
    // flap();
  }
});
