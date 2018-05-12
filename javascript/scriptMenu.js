//sample rankings variables
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

//instructions variables
var amountOfInstruction = 1;
var currentInstruction = 0;
var interval;
var racingSquarePosition = 0;
var direction = 0;
var topMargin;
var leftMargin;
var elementsAdded = new Array();

function getSampleRanksData()
{
	getSampleRanksLocalStorage();
	sortPlayers();
	loggedInPosition = getLoggedInUser();
	setView();
	setVolume();
	displayPlayersSampleRanks();
}

function getLoggedInUser()
{
	 
	for(i = 0; i < userLoggedIn.length; i++)
	{
		if(userLoggedIn[i] === true)
		{
			return i
			//bug getLoggedInUser
			//return 2
		}
	}
}

function setView()
{
	var changeView = userViewMode[loggedInPosition];
	
	var elementChange = document.getElementsByClassName("page-body");
	
	elementChange[0].setAttribute("style", "float : left; background-image:url(images/webdev-images/" + changeView + ".png); background-size: 1300px 700px; background-repeat: no-repeat; background-position: center top; width : 1300px; height : 700px;");
	//bug setView
	//elementChange[0].setAttribute("style", "float : left; background-image:url(images/webdev-images/night-mode.png); background-size: 1300px 700px; background-repeat: no-repeat; background-position: center top; width : 1300px; height : 700px;");
}

function setVolume()
{
	var audio = document.getElementById("audio-background");
	audio.volume = userVolume[loggedInPosition];
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
				
				swapped = true;
			}
		}
	}while(swapped == true);
	
	setSampleRanksLocalStorage();
}

function displayPlayersSampleRanks()
{
	var table = document.getElementById("rankings-result");
	var maxAmount;
	
	if(userName.length > 5)
	{
		maxAmount = 5;
	}
	else
	{
		maxAmount = userName.length;
	}
	
    for (var i = 0; i < maxAmount; i++) {
		var elementAdd = document.getElementById("sample-rankings-results");
		var newElement = document.createElement("div");
		newElement.setAttribute("class", "sample-result");
		
		var rankNumber = document.createElement("div");
		rankNumber.setAttribute("class", "sample-position");
		var position = document.createElement("span");
		var positionNumber = i + 1;
		position.innerHTML = positionNumber + ")";
		
		var rankName = document.createElement("div");
		rankName.setAttribute("class", "sample-username");
		var rName = document.createElement("span");
		rName.innerHTML = userName[i];
		
		var rankPoints = document.createElement("div");
		rankPoints.setAttribute("class", "sample-points");
		var rPoints = document.createElement("span");
		rPoints.innerHTML = userHighScore[i];
		
		rankNumber.appendChild(position);
		rankName.appendChild(rName);
		rankPoints.appendChild(rPoints);
		newElement.appendChild(rankNumber);
		newElement.appendChild(rankName);
		newElement.appendChild(rankPoints);
		elementAdd.appendChild(newElement);
    }
}

function getSampleRanksLocalStorage()
{
	
	//bug getSampleRanksLocalStorage
	//localStorage.names = JSON.stringify([])
	
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

function setSampleRanksLocalStorage()
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
	
	//bug setSampleRanksLocalStorage
	//localStorage.names = JSON.stringify([])
}

function startInstructions()
{
	newInstruction();
	setInterval(newInstruction, 10000);
}

function newInstruction()
{
	switch (currentInstruction)
	{
		case 0 : 
			firstInstruction();
			break;
		
		case 1 :
			secondInstruction();
			break;
		
		case 2 :
			thirdInstruction();
			break;
		
		case 3 :
			fourthInstruction();
			break;
	}
	
	currentInstruction++;
	
	if(currentInstruction == 4)
	{
		currentInstruction = 0;
	}
}

function firstInstruction()
{
	clearInterval(interval);
	removeElements();

	addElement("span", "instruction-label", "");
	addElement("div", "racing-square", "");
	
	
	document.getElementById("instruction-label").innerHTML = "Use W, A, S, D to move the square.";
	direction = 0;
	topMargin = 50;
	leftMargin = 150;
	
	interval = setInterval(function()
	{
		var racingSquare = document.getElementById("racing-square");
		
		switch(direction)
		{
			case 0 :
				leftMargin = leftMargin + 10;
				
				if(leftMargin == 650)
				{
					direction++
				}
				
				break;
			
			case 1 :
				topMargin = topMargin +10;
				
				if(topMargin == 250)
				{
					direction++;
				}
				
				break;
			
			case 2 :
				leftMargin = leftMargin - 10;
				
				if(leftMargin == 150)
				{
					direction++;
				}
				
				break;
				
			case 3 :
				topMargin = topMargin -10;
				
				if(topMargin == 50)
				{
					direction = 0;
				}
				
				break;
		}
		
		racingSquare.setAttribute("style", "background-color : red; width : 20px; height : 20px; margin-top : " + topMargin + "px; margin-left : " + leftMargin + "px;");
	},20);
}

function secondInstruction()
{
	clearInterval(interval);
	removeElements();
	
	addElement("span", "instruction-label", "");
	addElement("span", "high-score-label", "");
	addElement("span", "high-score", "");
	addElement("span", "current-score-label", "");
	addElement("span", "current-score", "");
	addElement("img", "wall-image", "images/webdev-images/game-wall.png");
	addElement("div", "racing-square", "");
	
	document.getElementById("instructions-title").innerHTML = "Instructions";
	document.getElementById("instruction-label").innerHTML = "Hitting the wall will deduct your highscore.";
	document.getElementById("high-score-label").innerHTML = "High Score";
	document.getElementById("high-score").innerHTML = 1500;
	document.getElementById("current-score-label").innerHTML = "Points";
	document.getElementById("current-score").innerHTML = 600;
	direction = 0;
	var counter = 0;
	topMargin = 350;
	leftMargin = 150;
	
	interval = setInterval(function()
	{
		var racingSquare = document.getElementById("racing-square");
		
		if(direction != 3)
		{
			var pointsLeft = document.getElementById("current-score").innerHTML;
			pointsLeft--;
			document.getElementById("current-score").innerHTML = pointsLeft;
		}
		
		switch(direction)
		{
			case 0 :
				leftMargin = leftMargin + 10;
				
				if(leftMargin == 650)
				{
					direction++
				}
				
				break;
			
			case 1 :
				topMargin = topMargin +10;
				
				if(topMargin == 550)
				{
					direction++;
				}
				
				break;
			
			case 2 :
				leftMargin = leftMargin - 10;
				
				if(leftMargin == 450)
				{
					direction++;
				}
				
				break;
				
			case 3 :
				document.getElementById("instruction-label").innerHTML = "GAME OVER - Highscore deducted with points left";
				
				if(counter == 0)
				{
					var pointsLeft = document.getElementById("current-score").innerHTML;
					var hScore = document.getElementById("high-score").innerHTML;
					
					hScore = hScore - pointsLeft;
					document.getElementById("high-score").innerHTML = hScore;
				}
				
				counter++;
				
				if(counter == 100)
				{
					document.getElementById("instruction-label").innerHTML = "Hitting the wall will deduct your highscore.";
					document.getElementById("high-score-label").innerHTML = "High Score";
					document.getElementById("high-score").innerHTML = 1500;
					document.getElementById("current-score-label").innerHTML = "Points";
					document.getElementById("current-score").innerHTML = 600;
					document.getElementById("instruction-label").innerHTML = "Hitting the wall will deduct your highscore.";
					topMargin = 350;
					leftMargin = 150;
					counter = 0;
					direction = 0;
				}
				break;
		}
		
		racingSquare.setAttribute("style", "position : absolute; background-color : red; width : 20px; height : 20px; top : " + topMargin + "px; left : " + leftMargin + "px;");
	}, 20);
}

function thirdInstruction()
{
	clearInterval(interval);
	removeElements();
	
	addElement("span", "instruction-label", "");
	addElement("img", "oil-image", "images/webdev-images/oil.png");
	addElement("div", "racing-square", "");
	
	document.getElementById("instruction-label").innerHTML = "Attention : Oil will slow you down";
	direction = 0;
	topMargin = 350;
	leftMargin = 50;
	
	interval = setInterval(function()
	{
		var racingSquare = document.getElementById("racing-square");
		
		switch(direction)
		{
			case 0 :
				leftMargin = leftMargin + 10;
				
				if(leftMargin == 650)
				{
					direction++
				}
				
				break;
			
			case 1 :
				topMargin = topMargin +10;
				
				if(topMargin == 550)
				{
					direction++;
				}
				
				break;
			
			case 2 :
				if(leftMargin == 160)
				{
					leftMargin = leftMargin - 10;
					direction++;
				}
				else if(leftMargin <= 350)
				{
					leftMargin = leftMargin - 10;
				}
				else if(leftMargin <= 450)
				{
					leftMargin = leftMargin - 2;
				}
				else
				{
					leftMargin = leftMargin - 10;
				}
				
				break;
				
			case 3 :
				topMargin = topMargin -10;
				
				if(topMargin == 350)
				{
					direction = 0;
				}
				
				break;
		}
		
		racingSquare.setAttribute("style", "position : absolute; background-color : red; width : 20px; height : 20px; top : " + topMargin + "px; left : " + leftMargin + "px;");
	}, 20);
}

function fourthInstruction()
{
	clearInterval(interval);
	removeElements();
	
	addElement("span", "instruction-label", "");	
	addElement("img", "wall-image", "images/webdev-images/game-wall.png");
	addElement("img", "oil-image", "images/webdev-images/oil.png");
	addElement("div", "racing-square", "");
	
	var label = document.getElementById("instruction-label");
	label.innerHTML = "GOOD LUCK";
	label.setAttribute("style", "font-size : 250%; font-family : Calibri; font-weight : bold; color : green; margin-top : 50px; margin-left :400px;");
	
	var wallSet = document.getElementById("wall-image");
	wallSet.setAttribute("style", "width : 100px; height : 100px; margin-top : 0px; margin-left : 450px; display : block;")
	direction = 0;
	
	var oilSet = document.getElementById("oil-image");
	oilSet.setAttribute("style", "width : 100px; height : 100px; margin-top : 100px; margin-left : 450px; display : block;")
	
	topMargin = 350;
	leftMargin = 250;
	
	interval = setInterval(function()
	{
		var racingSquare = document.getElementById("racing-square");
		
		switch(direction)
		{
			case 0 :
				leftMargin = leftMargin + 10;
				
				if(leftMargin == 430)
				{
					direction++;
				}
				
				break;
			
			case 1 :
				topMargin = topMargin +10;
				
				if(topMargin == 420)
				{
					direction++;
				}
				
				break;
			
			case 2 :
				leftMargin = leftMargin + 10;
				
				if(leftMargin == 550)
				{
					direction++;
				}
				break;
			case 3 :
				topMargin = topMargin - 10;
				
				if(topMargin == 300)
				{
					direction++;
				}
				break;
			case 4 :
				leftMargin = leftMargin + 10;
				
				if(leftMargin == 730)
				{
					direction++;
				}
				break;
			
			case 5 :
				topMargin = topMargin + 10;
				
				if(topMargin == 550)
				{
					direction++;
				}
				break;
			
			case 6 :
				leftMargin = leftMargin - 10;
				
				if(leftMargin == 550)
				{
					direction++;
				}
				break;
			
			case 7 :
				topMargin = topMargin - 10;
				
				if(topMargin == 500)
				{
					direction++;
				}
				break;
			
			case 8 :
				leftMargin = leftMargin - 10;
				
				if(leftMargin == 450)
				{
					direction++;
				}
				break;
				
			case 9:
				topMargin = topMargin + 10;
				
				if(topMargin == 550)
				{
					direction++;
				}
				break;
				
			case 10 :
				leftMargin = leftMargin - 10;
				
				if(leftMargin == 250)
				{
					direction++;
				}
				break;
				
			case 11 :
				topMargin = topMargin - 10;
				
				if(topMargin == 350)
				{
					direction = 0;
				}
				break;
		}
		
		racingSquare.setAttribute("style", "position : absolute; background-color : red; width : 20px; height : 20px; top : " + topMargin + "px; left : " + leftMargin + "px;");
	}, 20);
}

function addElement(type, id, source)
{
	var el = document.createElement(type);
	el.setAttribute("id", id);
	
	if(type == "img")
	{
		el.src = source;
	}

    document.getElementById("instructions-panel").appendChild(el);
	elementsAdded.push(id);
}

function removeElements()
{
	for(i = 0; i < elementsAdded.length; i++)
	{
		document.getElementById(elementsAdded[i]).remove();
	}
	
	elementsAdded.splice(0, elementsAdded.length);
}


function saveItem(location, item){
	 
	localStorage.setItem(location, item)
}