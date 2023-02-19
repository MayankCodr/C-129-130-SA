song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;

song1_status = "";
song2_status = ""; 
function preload(){
    song1 = loadSound("harry_porter.mp3");
    song2 = loadSound("peter_pan.mp3");
}
function setup(){
    canvas = createCanvas(600, 500);
    canvas.position(470, 240);

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);

}
function modelLoaded(){
    console.log("Pose net is intialised");
}
function gotPoses(results){
    if (results.length > 0) {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("score for right wrist = "+ scoreRightWrist +"score for left wrist = " + scoreLeftWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left wrist x:" + leftWristX + "y :" + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right wrist x:" + rightWristX + "y :" + rightWristY);

    }
}
function draw(){
    image(video, 0, 0, 600, 500);
    fill("red");
    stroke("red");
    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();
    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY , 20);
        song1.stop();
        if (song2_status = false) {
            song2.play();
            document.getElementById("playing_song").innerHTML = "Peter pan music";

        }
    }
    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        song2.stop();
        if (song1_status = false) {
            song1.play();
            document.getElementById("playing_song").innerHTML = "Harry porter theme song";
        }
    }
   
   
   
}

function play(){
    song1.play();
    song1.setVolume(1);
    song1.rate(1);
}
