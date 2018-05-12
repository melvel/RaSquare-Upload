//user details
var level;
var loggedInPosition;
var userLoggedIn = new Array();
var userGamesWon = new Array();
var userGamesLost = new Array();
var userHighScore = new Array();
var userColor = new Array();
var userViewMode = new Array();
var userVolume = new Array();

//car movement
var squarePositionX = 0;
var squarePositionY = 0;
var originalSquareSpeed = 10;
var squareSpeed = originalSquareSpeed;
var movementAllowed = false;
var moveX = false;
var moveY = false;
var Keys = {
	up: false,
	down: false,
	left: false,
	right: false
};
var keyActivated;
var startActivated = false;

//track building
var borderX = 0;
var borderY = 0;
var currentArea;
var trackBorder;
var amountOfBoxesX = [5, 5, 6, 6, 7, 8, 10, 10, 11, 12, 13, 13, 15, 16, 17, 17, 18, 19, 20, 20];
var amountOfBoxesY = [2, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11];
var buildingDone = false;
var movementPossible = false;
var repetitionsX;
var repetitionsY;
var randomDirection;
var previousCheck = false;
var firstBuild = false;
var sizeX;
var sizeY;
var x;
var y;
var arrayCheckerX;
var arrayCheckerY;
var moveAxisEnabled = true;

//Collision variables
var idName;
var boxArea;
var xAxis;
var yAxis;
var colorSet;

//Obstacles variables
var wallSet = [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 5, 7, 9, 10, 13, 15];
var oilSet = [1, 1, 1, 2, 1, 2, 2, 3, 5, 6, 7, 9, 9, 9, 10, 11, 12, 12, 12, 15];
var xySettled = new Array();
var obstacleSet;
var notOnTrack;
var moveObstacle;

//Ranks variables
var timeSet = [10, 10, 10, 12, 12, 14, 15, 15, 16, 16, 16, 17, 17, 17, 18, 18, 18, 19, 19, 20];
var pointsSet = [1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 8, 10];
var points;
var time;
var panelInterval;

//Game Over animation
var carPosition = 0;
var carRotate = 0;
var carTop = 510;
var clockPoistion = 0;
var clockRotate = 0;
var clockRotations = 0;
var interval;
var gameOverType;

//Game Ending variables
var movingDisabled = false;

function startMovementReading()
{
	getGameLocalStorage();
	loggedInPosition = getLoggedInUser();
	getColor();
	setView();
	
	time = timeSet[level - 1];
	points = time * pointsSet[level - 1];
	updatePanel();
	
	var  carColor = document.getElementById("racing-square");
	carColor.setAttribute("style", "position : absolute; background-color : " + colorSet + "; width : 20px; height : 20px; margin-top : 0px; margin-left : 0px;}");
	
	var pX = amountOfBoxesX[level - 1] - 1;
	var pY = amountOfBoxesY[level - 1] - 1;
	
	addImage(0, 0, "img", "start-area", "images/webdev-images/start.png", false, "");
	addImage(pX, pY, "img", "finish-area", "images/webdev-images/finish.png", false, "float : right;");
	
	window.onkeydown = function(e) {
		var kc = e.keyCode;
		
		if(kc === 65)
		{
			Keys.left = true;
			keyActivated = "left";
			xAxis = squarePositionX - squareSpeed;
			moveX = true;
			runSquare();
		}
		else if(kc === 87)
		{
			Keys.up = true;
			keyActivated = "top";
			yAxis = squarePositionY - squareSpeed;
			moveY = true;
			runSquare();
		}			
		else if(kc === 68)
		{
			Keys.right = true;
			keyActivated = "right";
			xAxis = squarePositionX + squareSpeed;
			moveX = true;
			runSquare();
		}
		else if(kc === 83)
		{
			Keys.down = true;
			keyActivated = "bottom";
			yAxis = squarePositionY + squareSpeed;
			moveY = true;
			runSquare();
		}
	};

	window.onkeyup = function(e) {
		var kc = e.keyCode;
			
		if(kc === 65)
		{
			Keys.left = false;
		}
		else if(kc === 87)
		{
			Keys.up = false;
		}			
		else if(kc === 68)
		{
			Keys.right = false;
		}
		else if(kc === 83)
		{
			Keys.down = false;
		}
		
		moveX = false;
		moveY = false;
		keyActivated = "";
	};
	
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

function runSquare()
{	
	if(startActivated == false)
	{
		panelInterval = setInterval(setPanel, 1000);
		startActivated = true;
		changeAudio("sounds/game-background.mp3", false);
	}
	
	if(movingDisabled == false)
	{
		checkPossibleMove();
		
		if(movementAllowed == true)
		{		
			document.getElementById("racing-square").setAttribute("style", "margin-left : " + squarePositionX + "px; margin-top : " + squarePositionY + "px; background-color : " + colorSet);
		}
		squareSpeed = originalSquareSpeed;
	}
}

function checkPossibleMove()
{
	if(keyActivated == "left" || keyActivated == "right")
	{
		checkXaxis();
	}
	else if(keyActivated == "top" || keyActivated == "bottom")
	{
		checkYaxis();
	}
	
	if(movementAllowed == true)
	{
		checkCollision();
	}
	
}

function checkXaxis()
{
	if(xAxis > 1030 || xAxis < 0)
	{
		if(xAxis < 0)
		{
			squarePositionX = 0;
		}
		else
		{
			squarePositionX = 1030;
		}
		
		document.getElementById("racing-square").setAttribute("style", "margin-left : " + squarePositionX + "px; margin-top : " + squarePositionY + "px; background-color : " + colorSet);
		
		movementAllowed = false;
	}
	else
	{
		movementAllowed = true;
	}
}

function checkYaxis()
{
	if(yAxis < 0 || yAxis > 380)
	{
		if(yAxis < 0)
		{
			squarePositionY = 0;
		}
		else
		{
			squarePositionY = 380;
		}
		
		document.getElementById("racing-square").setAttribute("style", "margin-left : " + squarePositionX + "px; margin-top : " + squarePositionY + "px;  background-color : " + colorSet);
		movementAllowed = false;
	}
	else
	{
		movementAllowed = true;
	}
}

function checkCollision()
{
	var gamePanel = document.getElementById("game-panel").getBoundingClientRect();
	var box = document.getElementById("racing-square").getBoundingClientRect();
	var leftGamePanel = gamePanel.left;
	var leftBoxPanel = box.left;
	var topGamePanel = gamePanel.top;
	var topBoxPanel = box.top;
	var marginBoxTop = (topBoxPanel - topGamePanel) ;
	var marginBoxLeft = (leftBoxPanel - leftGamePanel);
	var nextMoveX;
	var nextMoveY;
	var boxSize = box.width;
	
	switch(keyActivated)
	{
		case "left" : 
			nextMoveX = squarePositionX - squareSpeed;
			nextMoveY = squarePositionY;
			break;
		
		case "right" :
			nextMoveX = squarePositionX + squareSpeed;
			nextMoveY = squarePositionY;
			nextMoveX = nextMoveX + boxSize;
			break;
		
		case "top" :
			nextMoveX = squarePositionX;
			nextMoveY = squarePositionY - squareSpeed;
			break;
		
		case "bottom" :
			nextMoveX = squarePositionX;
			nextMoveY = squarePositionY + squareSpeed;
			nextMoveY = nextMoveY + boxSize;
			break;
	}
	
	var addPageX = nextMoveX + leftGamePanel;
	var addPageY = nextMoveY + topGamePanel;
	
	boxArea = document.elementFromPoint(addPageX, addPageY);
	idName = boxArea.getAttribute("id");
	
	if(idName == "non-track")
	{

		squareSpeed = squareSpeed / 2;

	}
	else if(idName == "finish-area")
	{
		if(nextMoveX >= 1040)
		{
			gameOverType = "win";
			runGameOver();
		}
	}
	else if(idName == "oil-area")
	{
		nonTrackDetected = false;
		squareSpeed = squareSpeed / 4;
	}
	else if(idName == "wall-area")
	{
		changeAudio("sounds/game-crash.mp3", false);
		gameOverType = "crash";
		runGameOver();
	}
	else
	{
		nonTrackDetected = false;
	}

	switch(keyActivated)
	{
		case "right" :
			nextMoveX = nextMoveX - originalSquareSpeed;
			break;
		
		case "bottom" :
			nextMoveY = nextMoveY - originalSquareSpeed;
			break;
		
		case "left" : 
			nextMoveX = nextMoveX + originalSquareSpeed;
			break;
			
		case "top" : 
			nextMoveY = nextMoveY + originalSquareSpeed;
			break;
	}
	
	switch(keyActivated)
	{
		case "right" :
			nextMoveX = nextMoveX - boxSize;
			nextMoveX = nextMoveX + squareSpeed;
			break;
		
		case "bottom" :
			nextMoveY = nextMoveY - boxSize;
			nextMoveY = nextMoveY + squareSpeed;
			break;
		
		case "left" : 
			nextMoveX = nextMoveX - squareSpeed;
			break;
			
		case "top" : 
			nextMoveY = nextMoveY - squareSpeed;
			break;
	}
	
	
	squarePositionX = nextMoveX;
	squarePositionY = nextMoveY;
}

function buildTrack()
{
	buildSections();
	generateTrack();
	setObstacles();
}

function buildSections()
{
	x = amountOfBoxesX[level - 1];
	y = amountOfBoxesY[level - 1];
	sizeX = 1050 / x;
	sizeY = 400 / y;
	
	arrayCheckerX = x - 1;
	arrayCheckerY = y - 1;
	
	for(i = 0; i < y; i++)
	{
		for(j = 0; j < x; j++)
		{
			currentArea = document.getElementById("game-panel");
			trackBorder = document.createElement("div");
			trackBorder.setAttribute("class", j + "," + i);
			trackBorder.setAttribute("id", "non-track");
			trackBorder.setAttribute("style", "width : " + sizeX + "px; height : " + sizeY + "px; background-color : green; border : hidden;");
			currentArea.appendChild(trackBorder);
		}
	}
}

function generateTrack()
{
	borderX = 0;
	borderY = 0;
	
	do
	{		
		removeBorders();
		
		var removal = getValueOfRemoval();
		var changeElement = document.getElementsByClassName(borderX + "," + borderY);
		changeElement[0].setAttribute("id", "track");
		changeElement[0].setAttribute("style", "width : " + sizeX + "px; height : " + sizeY + "px; " + removal + " border : hidden;");
		
		if(moveAxisEnabled == true)
		{
			moveAxis();
		}
	}while(buildingDone == false)
}

function removeBorders()
{	
	movementPossible = false;
	previousCheck == false;
	do
	{
		getDirection();
		
	}while(movementPossible == false);
}

function getDirection()
{
	randomDirection = Math.floor(Math.random() * 2);
	
	if(borderX == 0)
	{
		if(borderY == arrayCheckerY)
		{
			if(randomDirection != 0)
			{
				movementPossible = true;
			}
			else
			{
				movementPossible = false;
			}
		}
		else
		{
			movementPossible = true;
		}
	}
	else if(borderY == 0)
	{
		if(borderX == arrayCheckerX)
		{
			if(randomDirection != 1)
			{
				movementPossible = true;
			}
			else
			{
				movementPossible = false;
			}
		}
		else
		{
			movementPossible = true;
		}
	}
	else if(borderX == arrayCheckerX)
	{
		if(borderY == arrayCheckerY)
		{
			movementPossible = true;
			buildingDone = true;
		}
		else
		{
			if(randomDirection != 1)
			{
				movementPossible = true;
			}
			else
			{
				movementPossible = false;
			}
		}
	}
	else if(borderY == arrayCheckerY)
	{
		if(randomDirection != 0)
		{
			movementPossible = true;
		}
		else
		{
			movementPossible = false;
		}
	}
	else
	{
		movementPossible = true;
	}
}

function getValueOfRemoval()
{
	switch(randomDirection)
	{
		case 0 : 
				 return "border-bottom : none;";
				 break;
		
		case 1 : 
				 return "border-right : none;";
				 break;
	}
}

function moveAxis()
{
	switch(randomDirection)
	{
		case 1 : borderX = borderX + 1
				 break;
		case 0 : borderY = borderY + 1;
				 break;
	}
}

function setView()
{
	var changeView = userViewMode[loggedInPosition];
	
	var elementChange = document.getElementsByClassName("page-body");
	
	elementChange[0].setAttribute("style", "float : left; background-image:url(images/webdev-images/" + changeView + ".png); background-size: 1300px 700px; background-repeat: no-repeat; background-position: center top; width : 1300px; height : 700px;");
}

function getColor()
{
	colorSet = userColor[loggedInPosition];
}

function getGameLocalStorage()
{
	userLoggedIn = JSON.parse(localStorage.loggedIn);
	userGamesWon = JSON.parse(localStorage.gamesWon);
	userGamesLost = JSON.parse(localStorage.gamesLost);
	userHighScore = JSON.parse(localStorage.highScore);
	userColor = JSON.parse(localStorage.playerColor);
	userViewMode = JSON.parse(localStorage.viewMode);
	userVolume = JSON.parse(localStorage.volume);
}

function addImage(pX, pY, type, id, source, replaceStyle, addStyle)
{	
	var getDiv = document.getElementsByClassName(pX + "," + pY);
	var addImg = document.createElement(type);
	addImg.setAttribute("id", id);
	addImg.setAttribute("src", source);
	
	if(replaceStyle == false)
	{
		addImg.setAttribute("style", "width : " + getDiv[0].offsetWidth + "px; height : " + getDiv[0].offsetHeight + "px; " + addStyle);
	}
	else
	{
		addImg.setAttribute("style", addStyle);
	}
	
	getDiv[0].appendChild(addImg);
}

function setObstacles()
{
	var counter = 0;
	obstacleSet = false;
	notOnTrack = false;
	
	do
	{
		generateObstacleSide();
		
		do
		{
			notOnTrack = false;
			
			do
			{
				obstacleSet = false;
				x = Math.floor(Math.random() * amountOfBoxesX[level - 1]);
				
				y = Math.floor(Math.random() * amountOfBoxesY[level - 1]);
				
				checkObstacle();
			}while(obstacleSet == true);
			
			checkOnTrack();
		}while(notOnTrack == true);
		
		addImage(x, y, "img", "wall-area", "images/webdev-images/game-wall.png", true, "width : 35%; height : 35%; " + moveObstacle);

		xySettled.push(x + "," + y);
		counter++;
		
	}while(counter < wallSet[level - 1]);
	
	counter = 0;
	obstacleSet = false;
	notOnTrack = false;
	
	do
	{
		generateObstacleSide();
		
		do
		{
			notOnTrack = false;
			
			do
			{
				obstacleSet = false;
				x = Math.floor(Math.random() * amountOfBoxesX[level - 1]);
				
				y = Math.floor(Math.random() * amountOfBoxesY[level - 1]);
				
				checkObstacle();
			}while(obstacleSet == true);
			
			checkOnTrack();
		}while(notOnTrack == true);
		
		addImage(x, y, "img", "oil-area", "images/webdev-images/oil.png", true, "width : 35%; height : 35%; " + moveObstacle);
		xySettled.push(x + "," + y);
		counter++;
		
	}while(counter < oilSet[level - 1]);

}

function generateObstacleSide()
{
	var side = Math.floor(Math.random() * 4);
		
	if(side == 0)
	{
		moveObstacle = "float: left;";
	}
	else if(side == 1)
	{
		moveObstacle = "float: right;";
	}
	else if(side == 2)
	{
		moveObstacle = "float: left; margin-top : 25%";
	}
	else
	{
		moveObstacle = "float: right; margin-top : 25%";
	}
}

function checkObstacle()
{
	for(i = 0; i < xySettled.length; i++)
	{
		if(x + "," + y == xySettled[i])
		{
			obstacleSet = true;
			break;
		}
	}
}

function checkOnTrack()
{
	var trackElement = document.getElementsByClassName(x + "," + y);
	var idName = trackElement[0].getAttribute("id");
	
	if(x == 0)
	{
		if(y == 0)
		{
			notOnTrack = true;
		}
	}
	else if(x == amountOfBoxesX[level - 1] - 1)
	{
		if(y == amountOfBoxesY[level - 1] - 1)
		{
			notOnTrack = true;
		}
	}
	
	if(notOnTrack == false)
	{
		if(idName != "track")
		{
			notOnTrack = true;
		}
	}
}

function runGameOver()
{
	movingDisabled = true;
	
	if(gameOverType == "crash")
	{
		addGameOverImage("wall-image", "images/webdev-images/wall.png");
		addGameOverImage("car-image", "images/webdev-images/game-over-car.png");
		userHighScore[loggedInPosition] = userHighScore[loggedInPosition] - points;
		userGamesLost[loggedInPosition]++;
		if(userHighScore[loggedInPosition] < 0)
		{
			userHighScore[loggedInPosition] = 0;
		}
		sessionStorage.clear();
	}
	else if(gameOverType == "time")
	{
		changeAudio("sounds/game-time.mp3", false);
		addGameOverImage("time-image", "images/webdev-images/clock.png");
		addGameOverImage("car-image", "images/webdev-images/game-over-car.png");
		userGamesLost[loggedInPosition]++;
		sessionStorage.clear();
	}
	else if(gameOverType == "win")
	{
		addGameOverImage("wall-won-image", "images/webdev-images/wall.png");
		addGameOverImage("time-image", "images/webdev-images/clock.png");
		addGameOverImage("car-won-image", "images/webdev-images/car.png");
		userHighScore[loggedInPosition] = userHighScore[loggedInPosition] + points;
		userGamesWon[loggedInPosition]++;
	}
	
	
	storeGameLocalStorage();
	
	interval = setInterval(moveImage, 20);
}

function moveImage()
{
	if(gameOverType == "crash")
	{
		carPosition = carPosition + 10;
	
		if(carPosition + 441 > 1075)
		{
			clearInterval(interval);
			displayCrash();
			flashGameTag();
		}
		else
		{
			document.getElementById("car-image").setAttribute("style" , "position : absolute; top : 435px; width : 482px; height : 87px; left : " + carPosition + "px;");
		}
	}
	else if(gameOverType == "time")
	{
		if(clockPoistion + 131 > 1300)
		{
			location.href = "game-rankings.php";
			clearInterval(interval);
		}
		else
		{
			if(clockRotations < 150)
			{
				clockRotate = clockRotate + 90;
				clockRotations++;
			}
			else
			{
				clockRotate = clockRotate + 50;
				clockPoistion = clockPoistion + 20;
				carPosition = carPosition + 10;
			}
			
			document.getElementById("time-image").setAttribute("style" , "position : absolute; top : 290px; width : 131px; height : 131px; left : " + clockPoistion + "px; transform : rotate(" + clockRotate + "deg) ");
			document.getElementById("car-image").setAttribute("style" , "position : absolute; top : 435px; width : 482px; height : 87px; left : " + carPosition + "px;");
		}
	}
	else if(gameOverType == "win")
	{
		if(carPosition + 215 > 1350)
		{
			clearInterval(interval);
			if(level < 19)
			{
				level++;
				sessionStorage.setItem("level", level);
			}
			
			location.reload();
		}
		else
		{
			if(clockRotations < 100)
			{
				clockRotate = clockRotate + 90;
				clockRotations++;
			}
			else
			{
				if(carPosition == 0)
				{
					changeAudio("sounds/game-win.mp3", false);
				}
				
				if(time <= 5)
				{
					clockPoistion = clockPoistion + 8;
					clockRotate = clockRotate + 70;
				}
				else
				{
					clockPoistion = clockPoistion + 5;
					clockRotate = clockRotate + 20;
				}
				
				carPosition = carPosition + 10;
				
				if(carPosition >= 650)
				{
					if(carTop != 510)
					{
						carRotate = 30;
						carTop = carTop + 10;
					}
					else
					{
						carRotate = 0;
					}
				}
				else if(carPosition >= 500)
				{
					carRotate = 345;
					carTop = carTop - 10;
				}			
			}
			
			document.getElementById("time-image").setAttribute("style" , "position : absolute; top : 290px; width : 131px; height : 131px; left : " + clockPoistion + "px; transform : rotate(" + clockRotate + "deg) ");
			document.getElementById("car-won-image").setAttribute("style" , "position : absolute; top : " + carTop + "px; width : 215px; height : 87px; left : " + carPosition + "px; transform : rotate(" + carRotate + "deg) translateY(-100%);");
		}
	}
}

function displayCrash()
{
	addGameOverImage("car-wall-crash", "images/webdev-images/car-crash.png");
	document.getElementById("car-image").remove();
	document.getElementById("wall-image").remove();
}

function addGameOverImage(id, source)
{
	var img = document.createElement("img");
	img.setAttribute("id", id);
    img.src = source;

    document.body.appendChild(img);
}

function setSessionStorage()
{	
	if("level" in sessionStorage)
	{
		level = sessionStorage.getItem("level");
	}
	else
	{
		level = 1;
		sessionStorage.setItem("level" , level);
	}
}

function setPanel()
{
	if(movingDisabled == true)
	{
		clearInterval(panelInterval);
	}
	else
	{
		time--;
		points = time * pointsSet[level - 1];
		updatePanel();
		
		if(time == 0)
		{
			gameOverType = "time";
			runGameOver();
		}
	}
}

function updatePanel()
{
	document.getElementById("rank-time").innerHTML = time;
	document.getElementById("rank-points").innerHTML = points;
	document.getElementById("rank-level").innerHTML = level;
}

function storeGameLocalStorage()
{	
	saveItem("gamesWon", JSON.stringify(userGamesWon));
	saveItem("gamesLost", JSON.stringify(userGamesLost));
	saveItem("highScore", JSON.stringify(userHighScore));
}

function flashGameTag()
{
	var tagColor = "black";
	
	setInterval(function()
	{	
		if(tagColor != "yellow")
		{
			tagColor = "yellow";
		}
		else
		{
			tagColor = "black";
		}
		
		document.getElementById("start-game-tag").setAttribute("style", "display : block; text-decoration : none; color : " + tagColor + "; font-weight : bold; font-family : Calibri;");
	}, 300);
}

function changeAudio(source, loopable)
{
	var aSource = document.getElementById("audio-source");
	aSource.setAttribute("src", source);
	aSource.setAttribute("type", "audio/mpeg");
	var audio = document.getElementById("audio-background");
	audio.load();
	audio.play();
	audio.volume = userVolume[loggedInPosition];
	audio.loop = loopable;
}

function saveItem(location, item){
	localStorage.setItem(location, item)
}