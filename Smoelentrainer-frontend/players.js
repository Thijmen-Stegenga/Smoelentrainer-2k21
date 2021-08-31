var players = [{
	"name": "Ben Davies",
	"img": "img/davies.png"
},
{
	"name": "Steven Bergwijn",
	"img": "img/bergwijn.png"
},
{
	"name": "Toby Alderwereld",
	"img": "img/alderweireld.png"
},
{
	"name": "Harry Kane",
	"img": "img/kane.png"
},
{
	"name": "Hugo lloris",
	"img": "img/lloris.png"
},
{
	"name": "Heung Min Son",
	"img": "img/son.png"
},
{
	"name": "Harry Winks",
	"img": "img/winks.png"
},
{
	"name": "Moussa Sissoko",
	"img": "img/sissoko.png"
},
{
	"name": "Davison Sanchez",
	"img": "img/sanchez.png"
},
{
	"name": "Serge Reguilon",
	"img": "img/reguilon.png"
},
{
	"name": "Lucas Moura",
	"img": "img/moura.png"
},
];

var selectedimage;
var selectedName;
var checkimage;
var checkName;
var countimage = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var countname = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const player = document.querySelectorAll(".players");
const namePlayer = document.querySelectorAll(".namePlayer");

var playersT = 11;
if(localStorage.getItem("playerT")!= null){
	playersT = localStorage.getItem("playersT");
}


//geeft border aan de spelers
function selectimage(id){
	if (selectedimage == undefined) {
		//geeft witte border aan de speler
		document.getElementById(id).classList.add("borders");
		selectedimage = id;
		checkimage = document.getElementById(id).src;
	}else{
		//removes border when another player or name is selected
		document.getElementById(selectedimage).classList.remove("borders");
		document.getElementById(id).classList.add("borders");
		selectedimage = id;
		checkimage = document.getElementById(id).src;
	}
	checkimage = checkimage.substring(checkimage.indexOf("img"));
	console.log(checkimage);
	checkMatch();
}

player.forEach(player => {
	//onclick voor despeler
	player.onclick = function(){ selectimage(player.id); }
});

//Geeft border aan de namen
function selectName(id){
	if (selectedName == undefined) {
		document.getElementById(id).classList.add("borderName");
		selectedName = id;
	}else{
		document.getElementById(selectedName).classList.remove("borderName");
		document.getElementById(id).classList.add("borderName");
		selectedName = id;
	}
	checkName = document.getElementById(id).innerHTML;
	console.log(checkName);
	checkMatch();
}

namePlayer.forEach(namePlayer => {
	//onclick voor de spelersnamen
	namePlayer.onclick = function(){ selectName(namePlayer.id); }
});



//Random images
for (var i=0; i< localStorage.getItem("playersT"); i++){
	var random = countimage[Math.floor(Math.random() * countimage.length)];
	var countCheck = countimage.indexOf(random);
	countimage.splice(countCheck, 1);

	document.getElementById("img-"+i).src= players[random].img;
}
//Random names 
for (var i=0; i<players.length; i++){
	var random = countname[Math.floor(Math.random() * countname.length)];
	var countCheck = countname.indexOf(random);
	countname.splice(countCheck, 1);
	document.getElementById("btn-"+i).innerHTML= players[random].name;
}

//Check voor de images
var score = 0;
var tries = 0;
function checkMatch(){
	var checkNoMatch;

	if (checkimage != undefined && checkName != undefined) {

		tries++;
		document.getElementById("tries").innerHTML = tries;

		for (var i=0; i < players.length; i++){
			if(players[i].img === checkimage && players[i].name === checkName){
				//als het match word de border groen
				checkNoMatch = false;
				document.getElementById(selectedimage).classList.add("greenBorder");
				document.getElementById(selectedimage).onclick = null;

				document.getElementById(selectedName).classList.add("greenBorder");
				document.getElementById(selectedName).onclick = null;
				
				score++;
				document.getElementById("score").innerHTML = score;

				checkimage = undefined;
				checkName = undefined;
				console.log(localStorage.getItem("playersT"));
				if(score == localStorage.getItem("playersT")){

					gameEnding();
				}
				return;
			}else{
				checkNoMatch = true;
			}
		}
	}
	if (checkNoMatch == true){
		//geeft een rode border als het fout is
		document.getElementById(selectedimage).classList.add("redBorder");
		document.getElementById(selectedName).classList.add("redBorder");
		document.getElementById(selectedimage).classList.remove("borders");
		document.getElementById(selectedName).classList.remove("borderName");
		alert("This was a wrong move");
	}
}

// Timer
var timerTime = 120;
if(localStorage.getItem("tryTime") != null){
	timerTime = localStorage.getItem("tryTime");
}
var interval = 1000;
var width = 100;
var timer = setTimeout(countDown, interval);
document.getElementById("timer").innerHTML = "Timer: "+timerTime+"s";

function countDown() {
	timerTime--;
    document.getElementById("timer").innerHTML = "Timer: "+timerTime+"s";
    timer = setTimeout(countDown, interval);

    if(timerTime== 0){
    	clearTimeout(timer);
		gameEnding();
		return;
    }
}

// Changes the theme of the game
function changeTheme(){
	if (localStorage.getItem("Theme") == "horizontal") {
		alert("theme horizontal");
		document.getElementById("divImg").classList.remove("col-6");
		document.getElementById("divImg").classList.add("col-12");
		document.getElementById("divBtn").classList.remove("col-6");
		document.getElementById("divBtn").classList.add("col-12");

		for (var i = 0; i <= 10; i++) {
			document.getElementById("img-"+i).classList.add("col-2");
			document.getElementById("img-"+i).classList.add("p-0");
			document.getElementById("btn-"+i).classList.add("col-2");
			document.getElementById("btn-"+i).classList.add("p-5");
		}
	} else if (localStorage.getItem("Theme") == "vertical"){
		alert("theme vertical");
		for (var i = 0; i <= 10; i++) {
			document.getElementById("img-"+i).classList.add("col-4");
			document.getElementById("img-"+i).classList.add("p-0");
			document.getElementById("btn-"+i).classList.add("col-4");
		}
	}
}

changeTheme();

function gameEnding(){
	localStorage.setItem("Score",score);
	localStorage.setItem("Tries",tries);
	localStorage.setItem("TimeLeft", timerTime);
	setTimeout("location.href = 'ending.html';",500);
}



