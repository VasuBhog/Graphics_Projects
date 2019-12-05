// Vasu Bhog
// Copyright Fall 2019

// Javascript to create 2d imagemap on images
//Get and set 
var listVert = [];
var img = document.getElementById('face');
var canvas;
var context;
var btn = document.createElement("BUTTON")
var vert = [];
var w;
var h;

//WINDOW ONLOAD FIRST THING IT OUTPUTS IS JUST ASK USER FOR IMAGE
//Sets buttons to hidden
window.onload = function script() {
  x = document.getElementById("buttons")
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

//once user selects images allows all other functions
function imageBackground(file){
  var input = file.target;
  var reader = new FileReader();
  reader.onload = function(){
    img = document.getElementById('face');
    var dataURL = reader.result;
    img.addEventListener("load",function(){
      img.style.maxWidth = "1200px";
      img.style.maxHeight = "1200px";
      w = img.width;
      h = img.height;

      //set canvas
      console.log("w:" + w + " h:" + h)
      canvas = document.createElement('CANVAS');
      canvas.id = "mycanvas"
      canvas.width = w;
      canvas.height = h;
      canvas.style.position = 'absolute'
      canvas.style.left = '10px';
      canvas.style.top = '10px';
      // canvas.style.border = "20px solid";
      canvas.style.cursor = "crosshair";
      var body = document.getElementsByTagName("body")[0];
      body.appendChild(canvas);
      canvas = document.getElementById("mycanvas");
      // console.log(canvas)
      context = canvas.getContext('2d');

      //unhidestuff
      unhideStuff();

    });
    img.src = dataURL;
  };
  reader.readAsDataURL(input.files[0]);
};

function unhideStuff(){
  buttons = document.getElementById("buttons")
  if (buttons.style.display === "none") {
    buttons.style.display = "block";
  } else {
    buttons.style.display = "none";
  }
  secondPart();
}



//SECOND PART OF THE REFRESH AFTER IMAGE LOADS
function secondPart(){

  //START 
  //Initialize based on size of image
  img = document.getElementById('face');
  w = img.width;
  h = img.height;

  //DRAWS points based on clicks
  document.addEventListener('click',drawPoint,true);
  function drawPoint(event){
    var x = event.pageX;
    var y = event.pageY;
    console.log("x:" + x + "y:" + y);
    if (x < w && y < h){
      console.log("DRAW VERTICES");
      listVert.push(x);
      listVert.push(y);
      console.log(listVert)
      context.beginPath();
      context.arc(x,y,2,0,2 * Math.PI,false);
      context.fillStyle = 'blue';
      context.fill();
      context.lineWidth = 1;
      context.strokeStyle = 'red';
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
      context.strokeStyle = 'red';   
      context.stroke();
    }
  };

  //DONE FUNCTION
  document.getElementById('done').onclick = function lastPoint(){
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
    context.lineWidth = 1;
    context.strokeStyle = 'red'    
    context.stroke();
  };

  //SAVE FUNCTION
  document.getElementById('save').onclick = function saveList(){
    console.log("SAVE LIST");
    var blob = new Blob([listVert.toString()],{ type: "text/plain;charset=utf-8" });
    var inputName = prompt("Name of the file?");
    if (inputName){
      saveAs(blob,inputName);
    }else{
      window.alert("Please input a name for the file!")
    }
  };

  //CLEAR FUNCTION
  document.getElementById('clear').onclick = function clearPoints(){
    listVert=[]
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  //Removes Image 
  document.getElementById('remove').onclick = function removeImg(){
    img.style.visibility = 'hidden';
  };

  //Reads file given input
  document.getElementById('vertexFile').onchange = function readFile(event){
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



  window.onmousedown = function (event){   
    document.oncontextmenu = function() {
      return false;
    }
    if(event.button === 2){
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
    }
      // showCustomMenu();
      // return false;     // cancel default menu
  }
}