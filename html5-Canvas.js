// target the canvas and select 2d content
const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// button functionality targeting
const clear = document.querySelector('.clear');
const bounce = document.querySelector('.bounce');
const dance = document.querySelector('.dance');

// give some style to begin the stroke
ctx.strokeStyle = 'red';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 1;

// set location to draw and parameters 
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let bouncing = false;
let dancing = false;
let direction = true;

//main drawing function
function draw(param){
    //console.log(param)
    if(!isDrawing) return; //return and stop if mouse is not pressed
    ctx.beginPath();
    // start from
    ctx.moveTo(lastX, lastY);
    // go to
    ctx.lineTo(param.offsetX, param.offsetY);
    ctx.stroke();
    [lastX, lastY] = [param.offsetX, param.offsetY];

    //color dancing section ------------------------------------------
    if(dancing){
        hue++;
        if(hue > 360){
            hue = 0;
        }
    }
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    //color dancing section ------------------------------------------

    
    //width bouncing section -----------------------------------------
    if(bouncing){
        if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
            direction = !direction;
          }
        
          if(direction) {
            ctx.lineWidth++;
          } else {
            ctx.lineWidth--;
          }
        
    }
    //width bouncing section -----------------------------------------
}

//set and fix the origin problem
function update(){
    isDrawing = true;
    [lastX, lastY] = [this.offsetX, this.offsetY];
}

//clear the canvas
function clearTheCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

//color dance function
function colorDance(){

}








//play the function to draw 
canvas.addEventListener('mousedown', update);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', () => {isDrawing = true;});
canvas.addEventListener('mouseup', () => {isDrawing = false;});

//play the buttons
clear.addEventListener('click',clearTheCanvas);
bounce.addEventListener('change', function() {
    if (this.checked) {
      bouncing = true;
    } else {
        bouncing = false;
    }
  });

dance.addEventListener('change', function() {
    if (this.checked) {
      dancing = true;
    } else {
        dancing = false;
    }
  });