function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('MobileNet',modelLoaded);
}

function modelLoaded(){
  console.log("modelo carregado")
}

function draw() {
  image(video, 0, 0, 300, 300);  
  classifier.classify(video, gotResult);
}
var previR=''
function gotResult(error,results){
if(error){
  console.error(error)
}
else{
  if(results[0].confidence>0.5 && (previR!=results[0].label)){
    console.log(results)
    previR=results[0].label
    var synth = window.speechSynthesis
    speechdata = "o objeto detectado é -" + results[0].label
    utterThis =new SpeechSynthesisUtterance(speechdata)
    synth.speak(utterThis)
    document.getElementById("ro1").innerHTML=results[0].label
    document.getElementById("p1").innerHTML=results[0].confidence.toFixed(3)
  }
}
}

	
