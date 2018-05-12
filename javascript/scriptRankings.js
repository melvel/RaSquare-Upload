var userName = new Array();
var userUsername = new Array();
var userPassword = new Array();
var userSecurityQuestion = new Array();
var userSecurity = new Array();
var userLoggedIn = new Array();
var userGamesWon = new Array();
var userGamesLost = new Array();
var userHighScore = new Array();
var userColor = new Array();
var userViewMode = new Array();
var userVolume = new Array();

var loggedInPosition;

function getRankingsData()
{
	getRankingsLocalStorage();
	
	sortPlayers();
	loggedInPosition = getLoggedInUser();
	setView();	
	setVolume();
	
	displayPlayersRankings();
	displayCurrentPlayerRankings();
}

function getLoggedInUser()
{
	for(i = 0; i < userLoggedIn.length; i++)
	{
		if(userLoggedIn[i] == true)
		{
			return i
		}
	}
}

function setView()
{
	var changeView = userViewMode[loggedInPosition];
	
	var elementChange = document.getElementsByClassName("page-body");
	
	elementChange[0].setAttribute("style", "float : left; background-image:url(images/webdev-images/" + changeView + ".png); background-size: 1300px 700px; background-repeat: no-repeat; background-position: center top; width : 1300px; height : 700px;");
}


function sortPlayers()
{
	var swapped = false;
	var temp;
	
	do
	{
		swapped = false;
		
		for(i = 0; i < userName.length; i++)
		{
			if(userHighScore[i] < userHighScore[i + 1])
			{
				temp = userName[i];
				userName[i] = userName[i + 1];
				userName[i + 1] = temp;
				
				temp = userUsername[i];
				userUsername[i] = userUsername[i + 1];
				userUsername[i + 1] = temp;
				
				temp = userPassword[i];
				userPassword[i] = userPassword[i + 1];
				userPassword[i + 1] = temp;
				
				temp = userSecurityQuestion[i];
				userSecurityQuestion[i] = userSecurityQuestion[i + 1];
				userSecurityQuestion[i + 1] = temp;
				
				temp = userSecurity[i];
				userSecurity[i] = userSecurity[i + 1];
				userSecurity[i + 1] = temp;
				
				temp = userLoggedIn[i];
				userLoggedIn[i] = userLoggedIn[i + 1];
				userLoggedIn[i + 1] = temp;
				
				temp = userGamesLost[i];
				userGamesLost[i] = userGamesLost[i + 1];
				userGamesLost[i + 1] = temp;
				
				temp = userGamesWon[i];
				userGamesWon[i] = userGamesWon[i + 1];
				userGamesWon[i + 1] = temp;
				
				temp = userHighScore[i];
				userHighScore[i] = userHighScore[i + 1];
				userHighScore[i + 1] = temp;
				
				temp = userColor[i];
				userColor[i] = userColor[i + 1];
				userColor[i + 1] = temp;
				
				temp = userViewMode[i];
				userViewMode[i] = userViewMode[i + 1];
				userViewMode[i + 1] = temp;
				
				temp = userVolume[i];
				userVolume[i] = userVolume[i + 1];
				userVolume[i + 1] = temp; 
				
				swapped = true;
			}
		}
	}while(swapped == true);
	
	setRankingsLocalStorage();
}

function displayPlayersRankings()
{
	var table = document.getElementById("rankings-result");
    for (var i = 0; i < userName.length; i++) {
        var row = table.insertRow();
		
		var cellName = row.insertCell();
		cellName.appendChild(document.createTextNode(userName[i]));
		
		
		var cellGamesWon = row.insertCell();
		cellGamesWon.appendChild(document.createTextNode(userGamesWon[i]));
		
		var cellGamesLost = row.insertCell();
		cellGamesLost.appendChild(document.createTextNode(userGamesLost[i]));
		
		var cellHighScore = row.insertCell();
		cellHighScore.appendChild(document.createTextNode(userHighScore[i]));
    }
}

function displayCurrentPlayerRankings()
{
	document.getElementById("current-player-name").innerHTML = userName[loggedInPosition];
	document.getElementById("current-wins-lost").innerHTML = userGamesWon[loggedInPosition] + "/" + userGamesLost[loggedInPosition];
	document.getElementById("current-high-score").innerHTML = "/" + userHighScore[loggedInPosition];
}

function getRankingsLocalStorage()
{
	userName = JSON.parse(localStorage.names);
	userUsername = JSON.parse(localStorage.usernames);
	userPassword = JSON.parse(localStorage.passwords);
	userSecurityQuestion = JSON.parse(localStorage.securityquestions);
	userSecurity = JSON.parse(localStorage.securityanswers);
	userLoggedIn = JSON.parse(localStorage.loggedIn);
	userGamesWon = JSON.parse(localStorage.gamesWon);
	userGamesLost = JSON.parse(localStorage.gamesLost);
	userHighScore = JSON.parse(localStorage.highScore);
	userColor = JSON.parse(localStorage.playerColor);
	userViewMode = JSON.parse(localStorage.viewMode);
	userVolume = JSON.parse(localStorage.volume);
}

function setRankingsLocalStorage()
{
	saveItem("names", JSON.stringify(userName));
	saveItem("usernames", JSON.stringify(userUsername));
	saveItem("passwords", JSON.stringify(userPassword));
	saveItem("securityquestions", JSON.stringify(userSecurityQuestion));
	saveItem("securityanswers", JSON.stringify(userSecurity));
	saveItem("loggedIn", JSON.stringify(userLoggedIn));
	saveItem("gamesLost", JSON.stringify(userGamesLost));
	saveItem("gamesWon", JSON.stringify(userGamesWon));
	saveItem("highScore", JSON.stringify(userHighScore));
	saveItem("playerColor", JSON.stringify(userColor));
	saveItem("viewMode", JSON.stringify(userViewMode));
	saveItem("volume", JSON.stringify(userVolume));
	
	//bug setRankingsLocalStorage
	//localStorage.names = JSON.stringify([]);
}

function setVolume()
{
	var audio = document.getElementById("audio-background");
	audio.volume = userVolume[loggedInPosition];
}


function saveItem(location, item){
	localStorage.setItem(location, item)
}