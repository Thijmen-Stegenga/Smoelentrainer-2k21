var score = localStorage.getItem("Score");
var tries = localStorage.getItem("Tries");
var timeleft = localStorage.getItem("TimeLeft");
var gametime = localStorage.getItem("TryTime");
var timeused = gametime-timeleft;


document.getElementById("scoreText").innerHTML = score;
document.getElementById("triesText").innerHTML = tries;
