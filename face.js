// Javascript to create 2d imagemap on images

//Get and set 
var listVert = [];
var img = document.getElementById('face');
var canvas = document.getElementById('mycanvas');
canvas.style.position = 'absolute'
canvas.style.left = 0;
canvas.style.right = 0;
var context = canvas.getContext('2d');
var btn = document.createElement("BUTTON")
var vert = [];

//Initialize based on size of image
function setup() {
  wid = img.width
  h = img.height
  createCanvas(wid,h);
}

//DRAWS points based on clicks
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
    context.lineWidth = 1;
    context.strokeStyle = 'red'
    context.stroke();
    drawLine();
  }
};

//DRAWS LINE based on TWO Vertices
function drawLine(){
  // console.log("DRAWLINE");
  lenVert = listVert.length;
  if (lenVert > 3){
    context.moveTo(listVert[lenVert - 4],listVert[lenVert-3]);
    // for (var i = 2; i <= listVert.length - 1; i = i+2){
    context.lineTo(listVert[lenVert-2],listVert[lenVert-1]);
    context.lineWidth = 1;
    context.strokeStyle = 'red'    
    context.stroke();
  }
};

//DONE FUNCTION
function lastPoint(event){
  console.log("LAST POINT CONNECT")
  lenVert = listVert.length;
  lPointy = listVert[lenVert]
  lPointx = listVert[lenVert-1]
  fPointy = listVert[1]
  fPointx = listVert[0]
  listVert.push(fPointx)
  listVert.push(fPointy)

  context.moveTo(lPointx,lPointy);
  context.lineTo(fPointx,fPointy);
  context.lineWidth = 2;
  context.strokeStyle = 'red'    
  context.stroke();
};

//SAVE FUNCTION
function saveList(event){
  console.log("SAVE LIST");
  var blob = new Blob([listVert.toString()],{ type: "text/plain;charset=utf-8" });
  saveAs(blob,"vertex.txt");
  // listVert=[]
};

//CLEAR FUNCTION
function clearPoints(event){
  listVert=[]
  context.clearRect(0, 0, canvas.width, canvas.height);
};

//Removes Image 
function removeImg(event){
  img.style.visibility = 'hidden';
};

//Reads file given input
function readFile(event){
  var files = event.target.files;
  for (var i = 0, f; f = files[i]; i++){
    // console.log(f);
    var reader = new FileReader();
    reader.onload = function(e) {
        var content = e.target.result;
        console.log(f)
        vert = []; 
        vert.push(content.split(","));
        drawVertex();
      };
    reader.readAsText(f);
    };
};

//DRAW VERTEXS AFTER FILE
function drawVertex(){
  if (typeof(vert) == 'undefined'){
    vert = vert[0]
  }
  Nvert = vert[0]
  context.moveTo(Nvert[0],Nvert[1]);
  vlen = Nvert.length;
  if (vlen > 3){
    for (var i = 4; i <= vlen - 1; i = i+2){
      context.lineTo(Nvert[i],Nvert[i+1]); 
    }
    context.lineWidth = 2;
    context.strokeStyle = 'red'    
    context.stroke();
  }
}


window.oncontextmenu = function ()
{   
    console.log("RIGHT CLICK")
    lenVert = listVert.length;
    x = listVert[lenVert - 4];
    y = listVert[lenVert - 3];
    x2 = listVert[lenVert - 2];
    y2 = listVert[lenVert - 1];

    listVert.pop();
    listVert.pop();
    console.log(listVert);
    //(0,0) is top left corner 
    //As you go down Y increases
    //As you go right X increases

    //Q2
    if (x2 < x && y2 < y){
      console.log("Regular clear for Q2");
      context.clearRect(x,y-2,-x2,-y2);
    //Q3
    }else if (x2 < x && y2 > y){
      console.log("Regular clear for Q3");
      context.clearRect(x,y-2,-x2,y2);
    //Q1 
    }else if (y2 < y){
      console.log("y2 is less");
      context.clearRect(x, y, x2, -y2);
    //Q4
    }else{
      console.log("Regular clear for Q4");
      context.clearRect(x, y-2, x2, y2);
    }
    if(lenVert == 2){
      context.clearRect(0, 0, canvas.width, canvas.height);
      console.log("Clear ALL POINTS");
    }
    
    // showCustomMenu();
    // return false;     // cancel default menu
}
