var manoIzquierdaX = 0;
var manoIzquierdaY = 0;
var manoDerechaX = 0;
var manoDerechaY = 0;
var puntuacionManoIzquierda = 0;
var puntuacionManoDerecha = 0;
var cancion="";
var velocidad = 1;
var volumen = 1;
function preload(){
cancion = loadSound("coffin_dance.mp3")
}
function reproducir(){
  cancion.play()
  //ah pero no hemos declarado nuestro sonido por lo cual no le podemos poner play no hemos puestoel botton pense que ya lo habiamos puesto la clase pasada(estoy tomando nota de todo lo que dice)
}
function setup(){
  canvas = createCanvas(600,500);
  video = createCapture(VIDEO);
  video.hide();
  canvas.center();
  posenet = ml5.poseNet(video, modelolisto)
  posenet.on("pose", gotposes)
}
  function modelolisto(){
   console.log("modelo listo") 
  }
  function gotposes(resultados){
    if(resultados.length > 0){
      manoIzquierdaX = resultados[0].pose.leftWrist.x;
      manoIzquierdaY = resultados[0].pose.leftWrist.y;
      manoDerechaX = resultados[0].pose.rightWrist.x;
      manoDerechaY = resultados[0].pose.rightWrist.y;
      puntuacionManoDerecha = resultados[0].pose.keypoints[10].score;
      puntuacionManoIzquierda = resultados[0].pose.keypoints[9].score;
    }
  }
function draw(){
    image(video, 0, 0, 600, 500);
  fill("orange")
  if(puntuacionManoDerecha > 0.2){
    circle(manoDerechaX, manoDerechaY, 20);
        if(manoDerechaY > 400){
          velocity = 2.5;
        }else if(manoDerechaY > 300){
          velocity = 2
        }else if(manoDerechaY > 200){
            velocity = 1.5
        }else if(manoDerechaY > 100){
            velocity = 1
        }else if(manoDerechaY > 0){
            velocity = 100000000000000.5
        }
      cancion.rate(velocity);
    document.getElementById("velocidad").innerHTML = "velocidad: " + velocity;
  }
  if(puntuacionManoIzquierda > 0.2){
   circle(manoIzquierdaX, manoIzquierdaY, 20); 
    volumen = (manoIzquierdaY * 2) / 500;
    volumen = Math.round(volumen*10)/10;
    cancion.setVolume(volumen)
    document.getElementById("voluman").innerHTML = "voluman" + volumen;
  }
}