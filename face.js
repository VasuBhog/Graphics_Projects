// Javascript to create 2d imagemap on images

// const fs = require('fs')

function setup() {
  createCanvas(986,1288);
}

var listVert = [];
var img = document.getElementById('face');
var canvas = document.getElementById('mycanvas');
canvas.style.position = 'absolute'
canvas.style.left = 0;
canvas.style.right = 0;
var context = canvas.getContext('2d');
var btn = document.createElement("BUTTON")




document.addEventListener('click',printVertex,true);
function printVertex(event){
  var x = event.pageX;
  var y = event.pageY;
  if (x < 986 && y < 1288){
    listVert.push(x,y);
    print(listVert);
    context.beginPath();
    context.arc(x,y,2,0,2 * Math.PI,false);
    context.fillStyle = 'blue';
    context.fill();
    context.lineWidth = 3;
    context.strokeStyle = 'red'
    context.stroke();
    drawLine();
  }
};

function drawLine(){
  console.log("DRAWLINE");
  lenVert = listVert.length;
  if (lenVert > 3){
    console.log("TRUE");
    context.moveTo(listVert[lenVert - 4],listVert[lenVert-3]);
    // for (var i = 2; i <= listVert.length - 1; i = i+2){
    context.lineTo(listVert[lenVert-2],listVert[lenVert-1]);
    context.lineWidth = 3;
    context.strokeStyle = 'black'    
    context.stroke();
  }
};

function lastPoint(event){
  console.log("LAST POINT CONNECT")
  lenVert = listVert.length;
  lPointy = listVert[lenVert]
  lPointx = listVert[lenVert-1]
  fPointy = listVert[1]
  fPointx = listVert[0]
  context.moveTo(lPointx,lPointy);
  context.lineTo(fPointx,fPointy);
  context.lineWidth = 3;
  context.strokeStyle = 'black'    
  context.stroke();
};

function saveList(event){
  console.log("SAVE LIST");
  var blob = new Blob([listVert.toString()],{ type: "text/plain;charset=utf-8" });
  saveAs(blob,"vertex.txt");
  // listVert=[]
};

function clearPoints(event){
  listVert=[]
  // context.clearRect(0, 0, canvas.width, canvas.height);
};

function removeImg(event){
  img.style.display = 'none';
};

