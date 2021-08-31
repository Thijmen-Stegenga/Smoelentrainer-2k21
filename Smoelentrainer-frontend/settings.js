const button = document.querySelector('.submit');
button.onclick = submit

function submit(){
	var formValue = document.forms.timers;
	var formData = new FormData(formValue);
	var time = formData.get("timer");
	var players = formData.get("players");
	var theme = formData.get("themeselect");
	localStorage.setItem('tryTime', time);	
	localStorage.setItem('playersT', players);
	localStorage.setItem("Theme",theme);
	window.location.assign('smoelentrainer.html');
}